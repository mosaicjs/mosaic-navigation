(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("promise"));
	else if(typeof define === 'function' && define.amd)
		define(["promise"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("promise")) : factory(root["promise"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _libNavigation = __webpack_require__(1);

	var _libNavigation2 = _interopRequireDefault(_libNavigation);

	exports['default'] = {
	    Navigation: _libNavigation2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _promise = __webpack_require__(2);

	var _promise2 = _interopRequireDefault(_promise);

	var _events = __webpack_require__(3);

	var _mosaicDependencies = __webpack_require__(4);

	var _mosaicPathmapper = __webpack_require__(7);

	var Nav = (function () {
	    function Nav() {
	        _classCallCheck(this, Nav);

	        this.mapper = new _mosaicPathmapper.PathMapper();
	        this.activeHandler = null;
	    }

	    _createClass(Nav, [{
	        key: 'register',
	        value: function register(pathMask, handler) {
	            this.mapper.add(pathMask, handler);
	        }
	    }, {
	        key: 'activate',
	        value: function activate(path) {
	            var _this = this;

	            var slot = this.mapper.find(path);
	            var promise = _promise2['default'].resolve();
	            if (slot) {
	                (function () {
	                    var params = slot.params;
	                    var handler = slot.obj;
	                    if (_this.activeSlot) {
	                        (function () {
	                            var prevHandler = _this.activeSlot.obj;
	                            var prevParams = _this.activeSlot.params;
	                            if (handler === prevHandler) {
	                                promise = promise.then(function () {
	                                    return prevHandler.update(params, prevParams);
	                                });
	                            } else {
	                                promise = promise.then(function () {
	                                    return prevHandler.deactivate(prevParams);
	                                }).then((function () {
	                                    return handler.activate(params);
	                                }).bind(_this));
	                            }
	                        })();
	                    } else {
	                        promise = promise.then((function () {
	                            return handler.activate(params);
	                        }).bind(_this));
	                    }
	                    _this.activeSlot = slot;
	                })();
	            }
	            return promise;
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            var _this2 = this;

	            var promise = _promise2['default'].resolve();
	            if (this.activeSlot) {
	                (function () {
	                    var handler = _this2.activeSlot.obj;
	                    var params = _this2.activeSlot.params;
	                    promise = promise.then(function () {
	                        return handler.update(params, params);
	                    });
	                })();
	            }
	            return promise;
	        }
	    }]);

	    return Nav;
	})();

	// type => navigation module
	// dependencies between types
	// re-activate/start

	var typeCounter = 0;
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

	var Navigation = (function (_EventEmitter) {
	    function Navigation() {
	        _classCallCheck(this, Navigation);

	        _get(Object.getPrototypeOf(Navigation.prototype), 'constructor', this).call(this);
	        _events.EventEmitter.call(this);
	        this._index = {};
	        this._dependencies = new _mosaicDependencies.Dependencies();
	    }

	    _inherits(Navigation, _EventEmitter);

	    _createClass(Navigation, [{
	        key: 'register',

	        /**
	         * Registers a new handler corresponding to the specified type and path
	         * mask.
	         */
	        value: function register(type, pathMask, handler) {
	            var nav = this._index[type];
	            if (!nav) {
	                nav = this._index[type] = new Nav();
	            }
	            nav.register(pathMask, handler);
	        }
	    }, {
	        key: 'setState',

	        /**
	         * Activates all handlers of the specified types and paths.
	         * 
	         * @param state
	         *            this object contains types and the corresponding paths.
	         */
	        value: function setState(state) {
	            var types = Object.keys(state);
	            var that = this;
	            return (0, _mosaicDependencies.callDependents)(this._dependencies, types, {
	                end: function end(params) {
	                    var type = params.key;
	                    var nav = that._index[type];
	                    if (!nav) return;
	                    var path = state[type];
	                    if (path === undefined) {
	                        return nav.update();
	                    } else {
	                        return nav.activate(path);
	                    }
	                }
	            }).then(function () {
	                that.notify();
	            });
	        }
	    }, {
	        key: 'setDependencies',

	        /**
	         * Sets dependencies for the specified type.
	         * 
	         * @param dependencies
	         *            a map where keys are module types and values are their dependencies 
	         */
	        value: function setDependencies(dependencies) {
	            this._dependencies.setDependencies(dependencies);
	        }
	    }, {
	        key: 'setDependency',

	        /**
	         * Sets dependencies for the specified type.
	         * 
	         * @param type
	         *            type of the navigation modules
	         * @param dependencies
	         *            a list of other types
	         */
	        value: function setDependency(type, dependencies) {
	            this._dependencies.setDependency(type, dependencies);
	        }
	    }, {
	        key: 'notify',

	        // -----------------------------------------------------------------------

	        value: function notify() {
	            this.emit('change');
	        }
	    }, {
	        key: 'addChangeListener',
	        value: function addChangeListener(listener, context) {
	            this.on('change', listener, context);
	        }
	    }, {
	        key: 'removeChangeListener',
	        value: function removeChangeListener(listener, context) {
	            this.off('change', listener, context);
	        }

	        // -----------------------------------------------------------------------

	    }]);

	    return Navigation;
	})(_events.EventEmitter);

	exports['default'] = Navigation;

	Object.keys(_events.EventEmitter.prototype).forEach(function (key) {
	    if (!_events.EventEmitter.prototype.hasOwnProperty(key)) return;
	    Navigation.prototype[key] = _events.EventEmitter.prototype[key];
	});
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function (n) {
	  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function (type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events) this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler)) return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++) args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++) args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++) listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function (type, listener) {
	  var m;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events) this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function (type, listener) {
	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function (type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type]) return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener || isFunction(list.listener) && list.listener === listener) {
	    delete this._events[type];
	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0) return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function (type) {
	  var key, listeners;

	  if (!this._events) return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function (type) {
	  var ret;
	  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type]) ret = 0;else if (isFunction(emitter._events[type])) ret = 1;else ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _libDependencies = __webpack_require__(5);

	var _libDependencies2 = _interopRequireDefault(_libDependencies);

	var _libDependenciesCaller = __webpack_require__(6);

	exports['default'] = {
	    Dependencies: _libDependencies2['default'],
	    callDependencies: _libDependenciesCaller.callDependencies,
	    callDependents: _libDependenciesCaller.callDependents
	};
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * This is a simple class used to manage dependencies between entities.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Dependencies = (function () {
	    function Dependencies() {
	        _classCallCheck(this, Dependencies);
	    }

	    _createClass(Dependencies, [{
	        key: 'setDependencies',

	        /**
	         * Sets dependencies between modules using a map where keys are module names
	         * and values are lists of dependencies. This method rises an exception if
	         * user tries to set circular dependencies.
	         * 
	         * @param dependencies
	         *            a map containing modules with the corresponding arrays of
	         *            dependencies
	         */
	        value: function setDependencies(dependencies) {
	            if (!dependencies) return;
	            for (var _module2 in dependencies) {
	                var deps = dependencies[_module2];
	                this.setDependency(_module2, deps);
	            }
	        }
	    }, {
	        key: 'setDependency',

	        /**
	         * Sets new dependency for the specified module. This method rises an
	         * exception if user tries to set circular dependencies.
	         * 
	         * @param key
	         *            the key of the module
	         * @param dependencies
	         *            an array of dependencies for the specified module
	         */
	        value: function setDependency(key, dependencies) {
	            var that = this;
	            if (!that._checkDependencies(key, dependencies)) {
	                throw new Error('Circular dependencies');
	            }
	            that._setDependencies(key, dependencies);
	        }
	    }, {
	        key: 'visit',

	        /**
	         * Visits dependencies and notifies the given listener when the visitor
	         * enters and exists from an entry.
	         * 
	         * @param key
	         *            the key of an entry to visit
	         */
	        value: function visit(key, listener) {
	            return this._visit(this._direct, key, listener);
	        }
	    }, {
	        key: 'visitDependent',

	        /**
	         * Visits all elements depending on the specified one.
	         * 
	         * @param key
	         *            the key of an entry to visit
	         */
	        value: function visitDependent(key, listener) {
	            return this._visit(this._inverse, key, listener);
	        }
	    }, {
	        key: '_visit',

	        /**
	         * Visits dependencies using the specified index and notifies a listener
	         * when the visitor enters and exists from an entry.
	         * 
	         * @param key
	         *            the key of an entry to visit
	         */
	        value: function _visit(index, key, listener) {
	            if (listener.begin) {
	                listener.begin(key);
	            }
	            if (index) {
	                var deps = index[key] || [];
	                deps.forEach(function (k) {
	                    this._visit(index, k, listener);
	                }, this);
	            }
	            if (listener.end) {
	                listener.end(key);
	            }
	        }
	    }, {
	        key: 'getDependencies',

	        /**
	         * Returns all dependencies of an element with the specified key.
	         */
	        value: function getDependencies(key) {
	            if (!this._direct) return [];
	            return this._direct[key] || [];
	        }
	    }, {
	        key: 'getDependents',

	        /**
	         * Returns key of all elements depending on the specified one.
	         */
	        value: function getDependents(key) {
	            if (!this._inverse) return [];
	            return this._inverse[key] || [];
	        }
	    }, {
	        key: 'getAllDependents',

	        /**
	         * Returns key of all elements depending on the specified one.
	         */
	        value: function getAllDependents(key) {
	            return this._collect(this._inverse, key);
	        }
	    }, {
	        key: 'getAllDependencies',

	        /**
	         * A list of all dependencies for the specified key in the order of their
	         * resolving.
	         */
	        value: function getAllDependencies(key) {
	            return this._collect(this._direct, key);
	        }
	    }, {
	        key: '_collect',

	        /**
	         * Collects all keys depending on the specified one.
	         */
	        value: function _collect(index, key) {
	            var deps = [];
	            this._visit(index, key, {
	                end: function end(k) {
	                    if (k !== key) {
	                        deps.push(k);
	                    }
	                }
	            });
	            return deps;
	        }
	    }, {
	        key: '_checkDependencies',

	        /**
	         * Returns true if the specified dependencies could be set for the given
	         * key.
	         * 
	         * @param key
	         *            the key to check
	         * @param dependencies
	         *            a list of dependencies to check
	         */
	        value: function _checkDependencies(key, dependencies) {
	            var that = this;
	            var deps = Array.isArray(dependencies) ? dependencies : [dependencies];
	            return Dependencies.check(key, function (k) {
	                if (k === key) {
	                    return deps;
	                } else {
	                    return that.getDependencies(k);
	                }
	            });
	        }
	    }, {
	        key: '_setDependencies',

	        /**
	         * Really sets dependencies for a module with the specified key. This method
	         * could be overloaded in subclasses.
	         * 
	         * @param key
	         *            for this key a list dependencies should be set
	         * @param deps
	         *            a list of dependencies
	         */
	        value: function _setDependencies(key, deps) {
	            if (!this._direct) {
	                this._direct = {};
	            }
	            if (!this._inverse) {
	                this._inverse = {};
	            }
	            this._direct[key] = deps;
	            deps.forEach((function (dep) {
	                var array = this._inverse[dep] = this._inverse[dep] || [];
	                var add = true;
	                array.forEach(function (d) {
	                    add &= d !== dep;
	                });
	                if (add) {
	                    array.push(key);
	                }
	            }).bind(this));
	        }
	    }], [{
	        key: 'check',

	        /**
	         * This static method checks that there is no circular dependencies between
	         * entities.
	         * 
	         * @param key
	         *            the key of the initial dependency
	         * @param provider
	         *            a function returning an array of all dependencies for the
	         *            specified key
	         */
	        value: function check(key, provider) {
	            var index = {};
	            function isIndexed(k) {
	                if (index[k]) return true;
	                try {
	                    index[k] = true;
	                    var list = provider(k) || [];
	                    return !!list.find(isIndexed);
	                } finally {
	                    delete index[k];
	                }
	            }
	            return !isIndexed(key);
	        }
	    }]);

	    return Dependencies;
	})();

	exports['default'] = Dependencies;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _promise = __webpack_require__(2);

	var _promise2 = _interopRequireDefault(_promise);

	function callDeps(context, index, key, listener) {
	    var promises = {};
	    return _promise2['default'].resolve().then(function () {
	        var keys = Array.isArray(key) ? key : [key];
	        return _promise2['default'].all(keys.map(visit.bind(context, null)));
	    });
	    function visit(parentKey, k, pos) {
	        if (!promises[k]) {
	            var params = {
	                parentKey: parentKey,
	                key: k,
	                pos: pos
	            };
	            promises[k] = _promise2['default'].resolve().then(function () {
	                if (listener.begin) return listener.begin(params);
	            }).then(function () {
	                var deps = index ? index[k] : [];
	                if (!deps || !deps.length) return;
	                return _promise2['default'].all(deps.map(visit.bind(context, k)));
	            }).then(function (result) {
	                params.result = result;
	                if (listener.end) return listener.end(params);else return result;
	            }, function (err) {
	                params.error = err;
	                if (listener.end) return listener.end(params);else throw err;
	            });
	        }
	        return promises[k];
	    }
	}

	exports['default'] = {

	    /**
	     * This method asynchronously executes "begin" and "end" actions in the
	     * specified listener on the given key with all dependencies and return a
	     * promise with the results of the execution.
	     * 
	     * @param dependencies
	     *            a Dependencies object
	     * @param key
	     *            the key of the action to launch; if this parameter is an array
	     *            then all keys from this array will be executed
	     * @param listener
	     *            a listener object containing two methods: "begin" and "end"
	     * @param listener.begin
	     *            this method takes the dependency context - a) key - key of the
	     *            current dependency b) parentKey - key of the parent dependency
	     *            c) pos - position of the key in the parent execution chain
	     * @param listener.end
	     *            this method takes the same context as the "begin" method; this
	     *            context is completed with the "result" or "error" fields
	     *            containing execution results for child actions
	     */
	    callDependencies: function callDependencies(dependencies, key, listener) {
	        if (arguments.length < 3) {
	            key = arguments[0];
	            listener = arguments[1];
	            dependencies = this;
	        }
	        return callDeps(this, dependencies._direct, key, listener);
	    },

	    /**
	      * This method asynchronously executes "begin" and "end" actions in the
	      * specified listener on each element depending on the given key and return
	      * a promise with the results of the execution.
	      * 
	      * @param dependencies
	      *            a Dependencies object
	      * @param key
	      *            the key of the action to launch
	      * @param listener
	      *            a listener object containing two methods: "begin" and "end"
	      * @param listener.begin
	      *            this method takes the dependency context - a) key - key of the
	      *            current dependency b) parentKey - key of the parent dependency
	      *            c) pos - position of the key in the parent execution chain
	      * @param listener.end
	      *            this method takes the same context as the "begin" method; this
	      *            context is completed with the "result" or "error" fields
	      *            containing execution results for child actions
	      */
	    callDependents: function callDependents(dependencies, key, listener) {
	        if (arguments.length < 3) {
	            key = arguments[0];
	            listener = arguments[1];
	            dependencies = this;
	        }
	        var index = {};
	        key = Array.isArray(key) ? key : [key];
	        key.forEach(function (k) {
	            var list = dependencies.getAllDependents(k);
	            index[k] = true;
	            list.forEach(function (d) {
	                index[d] = true;
	            });
	        });
	        return callDeps(this, dependencies._direct, Object.keys(index), listener);
	    } };
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _libPathMapper = __webpack_require__(8);

	var _libPathMapper2 = _interopRequireDefault(_libPathMapper);

	var _libPathFormatter = __webpack_require__(9);

	var _libPathFormatter2 = _interopRequireDefault(_libPathFormatter);

	exports['default'] = {
	    PathMapper: _libPathMapper2['default'],
	    PathFormatter: _libPathFormatter2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * This class is used to map path masks to objects. It allows to find nearest
	 * object matching to the given path. This class is useful to implement call
	 * routers.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var PathMapper = (function () {
	    function PathMapper() {
	        _classCallCheck(this, PathMapper);
	    }

	    _createClass(PathMapper, [{
	        key: 'add',

	        /**
	         * Adds a new object to this mapper.
	         * 
	         * @param mask
	         *            path mask used to dispatch to this object
	         * @param obj
	         *            the object to add
	         */
	        value: function add(mask, obj) {
	            var chunks = [];
	            var names = [];
	            var a = false;
	            var segments = mask.split('*');
	            segments.forEach(function (segment) {
	                var b = false;
	                var array = segment.split(':');
	                array.forEach(function (str) {
	                    if (!a && !b) {
	                        chunks.push(esc(str));
	                    } else if (a || b) {
	                        var idx = str.indexOf('/');
	                        var r = b ? '[^/]+' : '.*?';
	                        if (idx >= 0) {
	                            chunks.push(wrap(r));
	                            names.push(str.substring(0, idx));
	                            chunks.push(esc(str.substring(idx)));
	                        } else {
	                            chunks.push(wrap(r));
	                            names.push(str);
	                        }
	                    }
	                    b = true;
	                });
	                a = true;
	            });
	            var str = chunks.join('');
	            var regexp = new RegExp('^' + str + '$');
	            this._handlers = this._handlers || [];
	            this._handlers.push({
	                mask: mask,
	                regexp: regexp,
	                names: names,
	                obj: obj
	            });
	        }
	    }, {
	        key: 'find',

	        /**
	         * Finds and returns a nearest object corresponding to the given path. This
	         * method returns an object with two fields: 1) The 'obj' field contains the
	         * found object 2) The 'params' field contains all found path parameters
	         * (defined in the initial path mask used to register this object).
	         */
	        value: function find(path) {
	            var _this = this;

	            var result = null;
	            this._handlers = this._handlers || [];

	            var _loop = function (i, len) {
	                var handler = _this._handlers[i];
	                if (!handler.regexp.test(path)) return 'continue';
	                var params = {};
	                var regexp = handler.regexp.exec(path);
	                var array = regexp.slice(1);
	                var idx = 0;
	                array.forEach(function (param) {
	                    var name = handler.names[idx++];
	                    var value = param ? decodeURIComponent(param) : null;
	                    params[name] = value;
	                });
	                result = {
	                    params: params,
	                    obj: handler.obj
	                };
	            };

	            for (var i = 0, len = this._handlers.length; !result && i < len; i++) {
	                var _ret = _loop(i, len);

	                if (_ret === 'continue') continue;
	            }
	            return result;
	        }
	    }, {
	        key: 'remove',

	        /**
	         * Removes and returns the mapped object corresponding to the specified path
	         * mask.
	         */
	        value: function remove(mask) {
	            var result = null;
	            var removed = null;
	            var handlers = this._handlers || [];
	            this._handlers = [];
	            handlers.forEach(function (handler) {
	                var keep = true;
	                if (handler.mask === mask) {
	                    removed = handler.obj;
	                } else {
	                    this._handlers.push(handler);
	                }
	            }, this);
	            return removed;
	        }
	    }]);

	    return PathMapper;
	})();

	exports['default'] = PathMapper;

	/** Regular expression used to find and replace special symbols. */
	var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	/** Escapes the specified string */
	function esc(str) {
	    return str.replace(escapeRegExp, '\\$&');
	}
	/** Transforms the given string in a Regexp group. */
	function wrap(str) {
	    return '(' + str + ')';
	}
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var PathMapper = (function () {
	    function PathMapper() {
	        _classCallCheck(this, PathMapper);
	    }

	    _createClass(PathMapper, null, [{
	        key: 'formatPath',

	        /**
	         * A static method used to format a string based on the given path mask and
	         * specified parameters.
	         */
	        value: function formatPath(mask, params) {
	            params = params || {};
	            var array = mask.split(/[:\*]/gim);
	            var path = [];
	            for (var i = 0; i < array.length; i++) {
	                var segment = array[i];
	                if (i === 0) {
	                    if (segment !== '') {
	                        path.push(segment);
	                    }
	                } else {
	                    var _name = null;
	                    var idx = segment.indexOf('/');
	                    if (idx >= 0) {
	                        _name = segment.substring(0, idx);
	                        segment = segment.substring(idx);
	                    } else {
	                        _name = segment;
	                        segment = null;
	                    }
	                    var value = params[_name];
	                    if (!value) {
	                        var msg = 'Required parameter "' + _name + '" not defined.';
	                        var err = new Error(msg);
	                        err._code = 400;
	                        throw err;
	                    }
	                    delete params[_name];
	                    path.push(value);
	                    if (segment && segment !== '') {
	                        path.push(segment);
	                    }
	                }
	            }
	            return path.join('');
	        }
	    }]);

	    return PathMapper;
	})();

	exports['default'] = PathMapper;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;