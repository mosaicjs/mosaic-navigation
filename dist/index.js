(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("promise"), require("mosaic-dependencies"), require("mosaic-pathmapper"));
	else if(typeof define === 'function' && define.amd)
		define(["promise", "mosaic-dependencies", "mosaic-pathmapper"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("promise"), require("mosaic-dependencies"), require("mosaic-pathmapper")) : factory(root["promise"], root["mosaic-dependencies"], root["mosaic-pathmapper"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
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

	var _mosaicPathmapper = __webpack_require__(5);

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
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }
/******/ ])
});
;