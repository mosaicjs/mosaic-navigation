import Promise from 'promise';
import { EventEmitter } from 'events';
import { Dependencies, callDependents } from 'mosaic-dependencies';
import { PathMapper } from 'mosaic-pathmapper';

class Nav {
    
    constructor(){
        this.mapper = new PathMapper();
        this.activeHandler = null;
    }
    
    register(pathMask, handler){
        this.mapper.add(pathMask, handler);
    }
    
    activate(path) {
        let slot = this.mapper.find(path);
        let promise = Promise.resolve(); 
        if (slot) {
            let params = slot.params;
            let handler = slot.obj;
            if (this.activeSlot) {
                let prevHandler = this.activeSlot.obj;
                let prevParams = this.activeSlot.params;
                if (handler === prevHandler){
                    promise = promise.then(function(){
                        return prevHandler.update(params, prevParams); 
                    });
                } else {
                    promise = promise.then(function(){
                        return prevHandler.deactivate(prevParams);
                    }).then(function(){
                        return handler.activate(params); 
                    }.bind(this));
                }
            } else {
                promise = promise.then(function(){
                    return handler.activate(params); 
                }.bind(this));
            }
            this.activeSlot = slot;
            this.activeSlot.path = path;
        }
        return promise;
    }
    
    update(){
        let promise = Promise.resolve();
        if (this.activeSlot){
            let handler = this.activeSlot.obj;
            let params = this.activeSlot.params; 
            promise = promise.then(function(){
                return handler.update(params, params);
            });
        }
        return promise;
    }
}

// type => navigation module
// dependencies between types
// re-activate/start

let typeCounter = 0;
/**
 * Navigation class activates/deactivates/updates NavigationHandlers when user
 * changes paths. Each NavigationHandler is responsible for managing of one
 * aspect of application. For example it can manage currently active screen of
 * the application, application localization, layout or a UI theme.
 * <p>
 * Example:
 * </p>
 * 
 * <pre>
 *  let app = ...
 *  class LocalizationHandler extends NavigationHandler {
 *      constructor(app){ this.app = app; }
 *      activate(params){ this.update(params); }
 *      update(params){
 *          // Gets the current language from parameters  
 *          // and sets it in the application.
 *          let lang = params.lang || 'en';
 *          this.app.setLanguage(lang);
 *      }
 *  }
 *  class LayoutHandler extends NavigationHandler { ... }
 *  class DashboardHandler extends NavigationHandler { ... }
 *  class ProjectHandler extends NavigationHandler { ... }
 *  app.nav = new Navigation();
 *  app.nav.register('lang', '/:lang', new DashboardHandler(app));
 *  app.nav.register('screen', '/:projectId/*path', new ProjectHandler(app));
 *  app.nav.register('screen', '/', new DashboardHandler(app));
 *  app.nav.register('layout', '/:layoutType', new LayoutHandler(app));
 *  // If language or a layout changes then the currently active screen 
 *  // should be redrawn. 
 *  app.nav.setDependecies('screen', ['lang', 'layout']);
 *  
 * </pre>
 */
export default class Navigation extends EventEmitter {

    constructor() {
        super();
        EventEmitter.call(this);
        this._index = {};
        this._dependencies = new Dependencies();
    }

    /**
     * Registers a new handler corresponding to the specified type and path
     * mask.
     */
    register(type, pathMask, handler) {
        let nav = this._index[type];
        if (!nav){
            nav = this._index[type] = new Nav();
        }
        nav.register(pathMask, handler);
    }
    
    /**
     * Returns an active element for the specified type or <code>null</code>
     * if there is no active modules of the specified type. The returned value
     * contains the following fields: a) path - the current active path of the
     * specified type b) obj - active object c) params - parameters for the
     * active object
     * 
     * @return an object with the "path", "obj" and "params" fields
     */
    getActive(type) {
        let nav = this._index[type];
        return nav ? nav.activeSlot : null;  
    }

    /**
     * Activates all handlers of the specified types and paths.
     * 
     * @param state
     *            this object contains types and the corresponding paths.
     */
    setState(state){
        let types = Object.keys(state);
        let that = this;
        return callDependents(this._dependencies, types, {
            end : function(params){
                let type = params.key;
                let nav = that._index[type];
                if (!nav)
                    return ;
                let path = state[type];
                if (path === undefined){
                    return nav.update();
                } else {
                    return nav.activate(path);
                }
            }
        }).then(function(){
            that.notify();
        });
    }
    
    /**
     * Sets dependencies for the specified type.
     * 
     * @param dependencies
     *            a map where keys are module types and values are their
     *            dependencies
     */
    setDependencies(dependencies) {
        this._dependencies.setDependencies(dependencies);
    }

    /**
     * Sets dependencies for the specified type.
     * 
     * @param type
     *            type of the navigation modules
     * @param dependencies
     *            a list of other types
     */
    setDependency(type, dependencies) {
        this._dependencies.setDependency(type, dependencies);
    }

    // -----------------------------------------------------------------------
    
    notify() {
        this.emit('change');
    }

    addChangeListener(listener, context) {
        this.on('change', listener, context);
    }

    removeChangeListener(listener, context) {
        this.off('change', listener, context);
    }    
    
    // -----------------------------------------------------------------------

}

Object.keys(EventEmitter.prototype).forEach(function(key){
    if (!EventEmitter.prototype.hasOwnProperty(key))
        return;
    Navigation.prototype[key] = EventEmitter.prototype[key]; 
});
