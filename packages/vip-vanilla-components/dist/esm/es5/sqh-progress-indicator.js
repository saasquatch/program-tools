var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*! Built with http://stenciljs.com */
import { h } from './widget-components.core.js';
import { a as commonjsGlobal, c as createCommonjsModule } from './chunk-7081a6f1.js';
import { a as API } from './chunk-eeb26f85.js';
import { a as css } from './chunk-06494afc.js';
import { a as FormatJS } from './chunk-2b5ffdc4.js';
var shifty = createCommonjsModule(function (module, exports) {
    (function () {
        var root = this || Function('return this')();
        /**
         * Shifty Core
         * By Jeremy Kahn - jeremyckahn@gmail.com
         */
        var Tweenable = (function () {
            // Aliases that get defined later in this function
            var formula;
            // CONSTANTS
            var DEFAULT_SCHEDULE_FUNCTION;
            var DEFAULT_EASING = 'linear';
            var DEFAULT_DURATION = 500;
            var UPDATE_TIME = 1000 / 60;
            var _now = Date.now
                ? Date.now
                : function () { return +new Date(); };
            var now = typeof SHIFTY_DEBUG_NOW !== 'undefined' ? SHIFTY_DEBUG_NOW : _now;
            if (typeof window !== 'undefined') {
                // requestAnimationFrame() shim by Paul Irish (modified for Shifty)
                // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
                DEFAULT_SCHEDULE_FUNCTION = window.requestAnimationFrame
                    || window.webkitRequestAnimationFrame
                    || window.oRequestAnimationFrame
                    || window.msRequestAnimationFrame
                    || (window.mozCancelRequestAnimationFrame
                        && window.mozRequestAnimationFrame)
                    || setTimeout;
            }
            else {
                DEFAULT_SCHEDULE_FUNCTION = setTimeout;
            }
            function noop() {
                // NOOP!
            }
            /**
             * Handy shortcut for doing a for-in loop. This is not a "normal" each
             * function, it is optimized for Shifty.  The iterator function only receives
             * the property name, not the value.
             * @param {Object} obj
             * @param {Function(string)} fn
             * @private
             */
            function each(obj, fn) {
                var key;
                for (key in obj) {
                    if (Object.hasOwnProperty.call(obj, key)) {
                        fn(key);
                    }
                }
            }
            /**
             * Perform a shallow copy of Object properties.
             * @param {Object} targetObject The object to copy into
             * @param {Object} srcObject The object to copy from
             * @return {Object} A reference to the augmented `targetObj` Object
             * @private
             */
            function shallowCopy(targetObj, srcObj) {
                each(srcObj, function (prop) {
                    targetObj[prop] = srcObj[prop];
                });
                return targetObj;
            }
            /**
             * Copies each property from src onto target, but only if the property to
             * copy to target is undefined.
             * @param {Object} target Missing properties in this Object are filled in
             * @param {Object} src
             * @private
             */
            function defaults(target, src) {
                each(src, function (prop) {
                    if (typeof target[prop] === 'undefined') {
                        target[prop] = src[prop];
                    }
                });
            }
            /**
             * Calculates the interpolated tween values of an Object for a given
             * timestamp.
             * @param {Number} forPosition The position to compute the state for.
             * @param {Object} currentState Current state properties.
             * @param {Object} originalState: The original state properties the Object is
             * tweening from.
             * @param {Object} targetState: The destination state properties the Object
             * is tweening to.
             * @param {number} duration: The length of the tween in milliseconds.
             * @param {number} timestamp: The UNIX epoch time at which the tween began.
             * @param {Object} easing: This Object's keys must correspond to the keys in
             * targetState.
             * @private
             */
            function tweenProps(forPosition, currentState, originalState, targetState, duration, timestamp, easing) {
                var normalizedPosition = forPosition < timestamp ? 0 : (forPosition - timestamp) / duration;
                var prop;
                var easingObjectProp;
                var easingFn;
                for (prop in currentState) {
                    if (currentState.hasOwnProperty(prop)) {
                        easingObjectProp = easing[prop];
                        easingFn = typeof easingObjectProp === 'function'
                            ? easingObjectProp
                            : formula[easingObjectProp];
                        currentState[prop] = tweenProp(originalState[prop], targetState[prop], easingFn, normalizedPosition);
                    }
                }
                return currentState;
            }
            /**
             * Tweens a single property.
             * @param {number} start The value that the tween started from.
             * @param {number} end The value that the tween should end at.
             * @param {Function} easingFunc The easing curve to apply to the tween.
             * @param {number} position The normalized position (between 0.0 and 1.0) to
             * calculate the midpoint of 'start' and 'end' against.
             * @return {number} The tweened value.
             * @private
             */
            function tweenProp(start, end, easingFunc, position) {
                return start + (end - start) * easingFunc(position);
            }
            /**
             * Applies a filter to Tweenable instance.
             * @param {Tweenable} tweenable The `Tweenable` instance to call the filter
             * upon.
             * @param {String} filterName The name of the filter to apply.
             * @private
             */
            function applyFilter(tweenable, filterName) {
                var filters = Tweenable.prototype.filter;
                var args = tweenable._filterArgs;
                each(filters, function (name) {
                    if (typeof filters[name][filterName] !== 'undefined') {
                        filters[name][filterName].apply(tweenable, args);
                    }
                });
            }
            var timeoutHandler_endTime;
            var timeoutHandler_currentTime;
            var timeoutHandler_isEnded;
            var timeoutHandler_offset;
            /**
             * Handles the update logic for one step of a tween.
             * @param {Tweenable} tweenable
             * @param {number} timestamp
             * @param {number} delay
             * @param {number} duration
             * @param {Object} currentState
             * @param {Object} originalState
             * @param {Object} targetState
             * @param {Object} easing
             * @param {Function(Object, *, number)} step
             * @param {Function(Function,number)}} schedule
             * @param {number=} opt_currentTimeOverride Needed for accurate timestamp in
             * Tweenable#seek.
             * @private
             */
            function timeoutHandler(tweenable, timestamp, delay, duration, currentState, originalState, targetState, easing, step, schedule, opt_currentTimeOverride) {
                timeoutHandler_endTime = timestamp + delay + duration;
                timeoutHandler_currentTime =
                    Math.min(opt_currentTimeOverride || now(), timeoutHandler_endTime);
                timeoutHandler_isEnded =
                    timeoutHandler_currentTime >= timeoutHandler_endTime;
                timeoutHandler_offset = duration - (timeoutHandler_endTime - timeoutHandler_currentTime);
                if (tweenable.isPlaying()) {
                    if (timeoutHandler_isEnded) {
                        step(targetState, tweenable._attachment, timeoutHandler_offset);
                        tweenable.stop(true);
                    }
                    else {
                        tweenable._scheduleId =
                            schedule(tweenable._timeoutHandler, UPDATE_TIME);
                        applyFilter(tweenable, 'beforeTween');
                        // If the animation has not yet reached the start point (e.g., there was
                        // delay that has not yet completed), just interpolate the starting
                        // position of the tween.
                        if (timeoutHandler_currentTime < (timestamp + delay)) {
                            tweenProps(1, currentState, originalState, targetState, 1, 1, easing);
                        }
                        else {
                            tweenProps(timeoutHandler_currentTime, currentState, originalState, targetState, duration, timestamp + delay, easing);
                        }
                        applyFilter(tweenable, 'afterTween');
                        step(currentState, tweenable._attachment, timeoutHandler_offset);
                    }
                }
            }
            /**
             * Creates a usable easing Object from a string, a function or another easing
             * Object.  If `easing` is an Object, then this function clones it and fills
             * in the missing properties with `"linear"`.
             * @param {Object.<string|Function>} fromTweenParams
             * @param {Object|string|Function} easing
             * @return {Object.<string|Function>}
             * @private
             */
            function composeEasingObject(fromTweenParams, easing) {
                var composedEasing = {};
                var typeofEasing = typeof easing;
                if (typeofEasing === 'string' || typeofEasing === 'function') {
                    each(fromTweenParams, function (prop) {
                        composedEasing[prop] = easing;
                    });
                }
                else {
                    each(fromTweenParams, function (prop) {
                        if (!composedEasing[prop]) {
                            composedEasing[prop] = easing[prop] || DEFAULT_EASING;
                        }
                    });
                }
                return composedEasing;
            }
            /**
             * Tweenable constructor.
             * @class Tweenable
             * @param {Object=} opt_initialState The values that the initial tween should
             * start at if a `from` object is not provided to `{{#crossLink
             * "Tweenable/tween:method"}}{{/crossLink}}` or `{{#crossLink
             * "Tweenable/setConfig:method"}}{{/crossLink}}`.
             * @param {Object=} opt_config Configuration object to be passed to
             * `{{#crossLink "Tweenable/setConfig:method"}}{{/crossLink}}`.
             * @module Tweenable
             * @constructor
             */
            function Tweenable(opt_initialState, opt_config) {
                this._currentState = opt_initialState || {};
                this._configured = false;
                this._scheduleFunction = DEFAULT_SCHEDULE_FUNCTION;
                // To prevent unnecessary calls to setConfig do not set default
                // configuration here.  Only set default configuration immediately before
                // tweening if none has been set.
                if (typeof opt_config !== 'undefined') {
                    this.setConfig(opt_config);
                }
            }
            /**
             * Configure and start a tween.
             * @method tween
             * @param {Object=} opt_config Configuration object to be passed to
             * `{{#crossLink "Tweenable/setConfig:method"}}{{/crossLink}}`.
             * @chainable
             */
            Tweenable.prototype.tween = function (opt_config) {
                if (this._isTweening) {
                    return this;
                }
                // Only set default config if no configuration has been set previously and
                // none is provided now.
                if (opt_config !== undefined || !this._configured) {
                    this.setConfig(opt_config);
                }
                this._timestamp = now();
                this._start(this.get(), this._attachment);
                return this.resume();
            };
            /**
             * Configure a tween that will start at some point in the future.
             *
             * @method setConfig
             * @param {Object} config The following values are valid:
             * - __from__ (_Object=_): Starting position.  If omitted, `{{#crossLink
             *   "Tweenable/get:method"}}get(){{/crossLink}}` is used.
             * - __to__ (_Object=_): Ending position.
             * - __duration__ (_number=_): How many milliseconds to animate for.
             * - __delay__ (_delay=_): How many milliseconds to wait before starting the
             *   tween.
             * - __start__ (_Function(Object, *)_): Function to execute when the tween
             *   begins.  Receives the state of the tween as the first parameter and
             *   `attachment` as the second parameter.
             * - __step__ (_Function(Object, *, number)_): Function to execute on every
             *   tick.  Receives `{{#crossLink
             *   "Tweenable/get:method"}}get(){{/crossLink}}` as the first parameter,
             *   `attachment` as the second parameter, and the time elapsed since the
             *   start of the tween as the third. This function is not called on the
             *   final step of the animation, but `finish` is.
             * - __finish__ (_Function(Object, *)_): Function to execute upon tween
             *   completion.  Receives the state of the tween as the first parameter and
             *   `attachment` as the second parameter.
             * - __easing__ (_Object.<string|Function>|string|Function=_): Easing curve
             *   name(s) or function(s) to use for the tween.
             * - __attachment__ (_*_): Cached value that is passed to the
             *   `step`/`start`/`finish` methods.
             * @chainable
             */
            Tweenable.prototype.setConfig = function (config) {
                config = config || {};
                this._configured = true;
                // Attach something to this Tweenable instance (e.g.: a DOM element, an
                // object, a string, etc.);
                this._attachment = config.attachment;
                // Init the internal state
                this._pausedAtTime = null;
                this._scheduleId = null;
                this._delay = config.delay || 0;
                this._start = config.start || noop;
                this._step = config.step || noop;
                this._finish = config.finish || noop;
                this._duration = config.duration || DEFAULT_DURATION;
                this._currentState = shallowCopy({}, config.from || this.get());
                this._originalState = this.get();
                this._targetState = shallowCopy({}, config.to || this.get());
                var self = this;
                this._timeoutHandler = function () {
                    timeoutHandler(self, self._timestamp, self._delay, self._duration, self._currentState, self._originalState, self._targetState, self._easing, self._step, self._scheduleFunction);
                };
                // Aliases used below
                var currentState = this._currentState;
                var targetState = this._targetState;
                // Ensure that there is always something to tween to.
                defaults(targetState, currentState);
                this._easing = composeEasingObject(currentState, config.easing || DEFAULT_EASING);
                this._filterArgs =
                    [currentState, this._originalState, targetState, this._easing];
                applyFilter(this, 'tweenCreated');
                return this;
            };
            /**
             * @method get
             * @return {Object} The current state.
             */
            Tweenable.prototype.get = function () {
                return shallowCopy({}, this._currentState);
            };
            /**
             * @method set
             * @param {Object} state The current state.
             */
            Tweenable.prototype.set = function (state) {
                this._currentState = state;
            };
            /**
             * Pause a tween.  Paused tweens can be resumed from the point at which they
             * were paused.  This is different from `{{#crossLink
             * "Tweenable/stop:method"}}{{/crossLink}}`, as that method
             * causes a tween to start over when it is resumed.
             * @method pause
             * @chainable
             */
            Tweenable.prototype.pause = function () {
                this._pausedAtTime = now();
                this._isPaused = true;
                return this;
            };
            /**
             * Resume a paused tween.
             * @method resume
             * @chainable
             */
            Tweenable.prototype.resume = function () {
                if (this._isPaused) {
                    this._timestamp += now() - this._pausedAtTime;
                }
                this._isPaused = false;
                this._isTweening = true;
                this._timeoutHandler();
                return this;
            };
            /**
             * Move the state of the animation to a specific point in the tween's
             * timeline.  If the animation is not running, this will cause the `step`
             * handlers to be called.
             * @method seek
             * @param {millisecond} millisecond The millisecond of the animation to seek
             * to.  This must not be less than `0`.
             * @chainable
             */
            Tweenable.prototype.seek = function (millisecond) {
                millisecond = Math.max(millisecond, 0);
                var currentTime = now();
                if ((this._timestamp + millisecond) === 0) {
                    return this;
                }
                this._timestamp = currentTime - millisecond;
                if (!this.isPlaying()) {
                    this._isTweening = true;
                    this._isPaused = false;
                    // If the animation is not running, call timeoutHandler to make sure that
                    // any step handlers are run.
                    timeoutHandler(this, this._timestamp, this._delay, this._duration, this._currentState, this._originalState, this._targetState, this._easing, this._step, this._scheduleFunction, currentTime);
                    this.pause();
                }
                return this;
            };
            /**
             * Stops and cancels a tween.
             * @param {boolean=} gotoEnd If `false` or omitted, the tween just stops at
             * its current state, and the `finish` handler is not invoked.  If `true`,
             * the tweened object's values are instantly set to the target values, and
             * `finish` is invoked.
             * @method stop
             * @chainable
             */
            Tweenable.prototype.stop = function (gotoEnd) {
                this._isTweening = false;
                this._isPaused = false;
                this._timeoutHandler = noop;
                (root.cancelAnimationFrame ||
                    root.webkitCancelAnimationFrame ||
                    root.oCancelAnimationFrame ||
                    root.msCancelAnimationFrame ||
                    root.mozCancelRequestAnimationFrame ||
                    root.clearTimeout)(this._scheduleId);
                if (gotoEnd) {
                    applyFilter(this, 'beforeTween');
                    tweenProps(1, this._currentState, this._originalState, this._targetState, 1, 0, this._easing);
                    applyFilter(this, 'afterTween');
                    applyFilter(this, 'afterTweenEnd');
                    this._finish.call(this, this._currentState, this._attachment);
                }
                return this;
            };
            /**
             * @method isPlaying
             * @return {boolean} Whether or not a tween is running.
             */
            Tweenable.prototype.isPlaying = function () {
                return this._isTweening && !this._isPaused;
            };
            /**
             * Set a custom schedule function.
             *
             * If a custom function is not set,
             * [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame)
             * is used if available, otherwise
             * [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout)
             * is used.
             * @method setScheduleFunction
             * @param {Function(Function,number)} scheduleFunction The function to be
             * used to schedule the next frame to be rendered.
             */
            Tweenable.prototype.setScheduleFunction = function (scheduleFunction) {
                this._scheduleFunction = scheduleFunction;
            };
            /**
             * `delete` all "own" properties.  Call this when the `Tweenable` instance
             * is no longer needed to free memory.
             * @method dispose
             */
            Tweenable.prototype.dispose = function () {
                var prop;
                for (prop in this) {
                    if (this.hasOwnProperty(prop)) {
                        delete this[prop];
                    }
                }
            };
            /**
             * Filters are used for transforming the properties of a tween at various
             * points in a Tweenable's life cycle.  See the README for more info on this.
             * @private
             */
            Tweenable.prototype.filter = {};
            /**
             * This object contains all of the tweens available to Shifty.  It is
             * extensible - simply attach properties to the `Tweenable.prototype.formula`
             * Object following the same format as `linear`.
             *
             * `pos` should be a normalized `number` (between 0 and 1).
             * @property formula
             * @type {Object(function)}
             */
            Tweenable.prototype.formula = {
                linear: function (pos) {
                    return pos;
                }
            };
            formula = Tweenable.prototype.formula;
            shallowCopy(Tweenable, {
                'now': now,
                'each': each,
                'tweenProps': tweenProps,
                'tweenProp': tweenProp,
                'applyFilter': applyFilter,
                'shallowCopy': shallowCopy,
                'defaults': defaults,
                'composeEasingObject': composeEasingObject
            });
            // `root` is provided in the intro/outro files.
            // A hook used for unit testing.
            if (typeof SHIFTY_DEBUG_NOW === 'function') {
                root.timeoutHandler = timeoutHandler;
            }
            // Bootstrap Tweenable appropriately for the environment.
            {
                // CommonJS
                module.exports = Tweenable;
            }
            return Tweenable;
        }());
        (function () {
            Tweenable.shallowCopy(Tweenable.prototype.formula, {
                easeInQuad: function (pos) {
                    return Math.pow(pos, 2);
                },
                easeOutQuad: function (pos) {
                    return -(Math.pow((pos - 1), 2) - 1);
                },
                easeInOutQuad: function (pos) {
                    if ((pos /= 0.5) < 1) {
                        return 0.5 * Math.pow(pos, 2);
                    }
                    return -0.5 * ((pos -= 2) * pos - 2);
                },
                easeInCubic: function (pos) {
                    return Math.pow(pos, 3);
                },
                easeOutCubic: function (pos) {
                    return (Math.pow((pos - 1), 3) + 1);
                },
                easeInOutCubic: function (pos) {
                    if ((pos /= 0.5) < 1) {
                        return 0.5 * Math.pow(pos, 3);
                    }
                    return 0.5 * (Math.pow((pos - 2), 3) + 2);
                },
                easeInQuart: function (pos) {
                    return Math.pow(pos, 4);
                },
                easeOutQuart: function (pos) {
                    return -(Math.pow((pos - 1), 4) - 1);
                },
                easeInOutQuart: function (pos) {
                    if ((pos /= 0.5) < 1) {
                        return 0.5 * Math.pow(pos, 4);
                    }
                    return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
                },
                easeInQuint: function (pos) {
                    return Math.pow(pos, 5);
                },
                easeOutQuint: function (pos) {
                    return (Math.pow((pos - 1), 5) + 1);
                },
                easeInOutQuint: function (pos) {
                    if ((pos /= 0.5) < 1) {
                        return 0.5 * Math.pow(pos, 5);
                    }
                    return 0.5 * (Math.pow((pos - 2), 5) + 2);
                },
                easeInSine: function (pos) {
                    return -Math.cos(pos * (Math.PI / 2)) + 1;
                },
                easeOutSine: function (pos) {
                    return Math.sin(pos * (Math.PI / 2));
                },
                easeInOutSine: function (pos) {
                    return (-0.5 * (Math.cos(Math.PI * pos) - 1));
                },
                easeInExpo: function (pos) {
                    return (pos === 0) ? 0 : Math.pow(2, 10 * (pos - 1));
                },
                easeOutExpo: function (pos) {
                    return (pos === 1) ? 1 : -Math.pow(2, -10 * pos) + 1;
                },
                easeInOutExpo: function (pos) {
                    if (pos === 0) {
                        return 0;
                    }
                    if (pos === 1) {
                        return 1;
                    }
                    if ((pos /= 0.5) < 1) {
                        return 0.5 * Math.pow(2, 10 * (pos - 1));
                    }
                    return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
                },
                easeInCirc: function (pos) {
                    return -(Math.sqrt(1 - (pos * pos)) - 1);
                },
                easeOutCirc: function (pos) {
                    return Math.sqrt(1 - Math.pow((pos - 1), 2));
                },
                easeInOutCirc: function (pos) {
                    if ((pos /= 0.5) < 1) {
                        return -0.5 * (Math.sqrt(1 - pos * pos) - 1);
                    }
                    return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
                },
                easeOutBounce: function (pos) {
                    if ((pos) < (1 / 2.75)) {
                        return (7.5625 * pos * pos);
                    }
                    else if (pos < (2 / 2.75)) {
                        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
                    }
                    else if (pos < (2.5 / 2.75)) {
                        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
                    }
                    else {
                        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
                    }
                },
                easeInBack: function (pos) {
                    var s = 1.70158;
                    return (pos) * pos * ((s + 1) * pos - s);
                },
                easeOutBack: function (pos) {
                    var s = 1.70158;
                    return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
                },
                easeInOutBack: function (pos) {
                    var s = 1.70158;
                    if ((pos /= 0.5) < 1) {
                        return 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s));
                    }
                    return 0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
                },
                elastic: function (pos) {
                    // jshint maxlen:90
                    return -1 * Math.pow(4, -8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
                },
                swingFromTo: function (pos) {
                    var s = 1.70158;
                    return ((pos /= 0.5) < 1) ?
                        0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s)) :
                        0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
                },
                swingFrom: function (pos) {
                    var s = 1.70158;
                    return pos * pos * ((s + 1) * pos - s);
                },
                swingTo: function (pos) {
                    var s = 1.70158;
                    return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
                },
                bounce: function (pos) {
                    if (pos < (1 / 2.75)) {
                        return (7.5625 * pos * pos);
                    }
                    else if (pos < (2 / 2.75)) {
                        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
                    }
                    else if (pos < (2.5 / 2.75)) {
                        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
                    }
                    else {
                        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
                    }
                },
                bouncePast: function (pos) {
                    if (pos < (1 / 2.75)) {
                        return (7.5625 * pos * pos);
                    }
                    else if (pos < (2 / 2.75)) {
                        return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
                    }
                    else if (pos < (2.5 / 2.75)) {
                        return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
                    }
                    else {
                        return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
                    }
                },
                easeFromTo: function (pos) {
                    if ((pos /= 0.5) < 1) {
                        return 0.5 * Math.pow(pos, 4);
                    }
                    return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
                },
                easeFrom: function (pos) {
                    return Math.pow(pos, 4);
                },
                easeTo: function (pos) {
                    return Math.pow(pos, 0.25);
                }
            });
        }());
        (function () {
            // port of webkit cubic bezier handling by http://www.netzgesta.de/dev/
            function cubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
                var ax = 0, bx = 0, cx = 0, ay = 0, by = 0, cy = 0;
                function sampleCurveX(t) {
                    return ((ax * t + bx) * t + cx) * t;
                }
                function sampleCurveY(t) {
                    return ((ay * t + by) * t + cy) * t;
                }
                function sampleCurveDerivativeX(t) {
                    return (3.0 * ax * t + 2.0 * bx) * t + cx;
                }
                function solveEpsilon(duration) {
                    return 1.0 / (200.0 * duration);
                }
                function solve(x, epsilon) {
                    return sampleCurveY(solveCurveX(x, epsilon));
                }
                function fabs(n) {
                    if (n >= 0) {
                        return n;
                    }
                    else {
                        return 0 - n;
                    }
                }
                function solveCurveX(x, epsilon) {
                    var t0, t1, t2, x2, d2, i;
                    for (t2 = x, i = 0; i < 8; i++) {
                        x2 = sampleCurveX(t2) - x;
                        if (fabs(x2) < epsilon) {
                            return t2;
                        }
                        d2 = sampleCurveDerivativeX(t2);
                        if (fabs(d2) < 1e-6) {
                            break;
                        }
                        t2 = t2 - x2 / d2;
                    }
                    t0 = 0.0;
                    t1 = 1.0;
                    t2 = x;
                    if (t2 < t0) {
                        return t0;
                    }
                    if (t2 > t1) {
                        return t1;
                    }
                    while (t0 < t1) {
                        x2 = sampleCurveX(t2);
                        if (fabs(x2 - x) < epsilon) {
                            return t2;
                        }
                        if (x > x2) {
                            t0 = t2;
                        }
                        else {
                            t1 = t2;
                        }
                        t2 = (t1 - t0) * 0.5 + t0;
                    }
                    return t2; // Failure.
                }
                cx = 3.0 * p1x;
                bx = 3.0 * (p2x - p1x) - cx;
                ax = 1.0 - cx - bx;
                cy = 3.0 * p1y;
                by = 3.0 * (p2y - p1y) - cy;
                ay = 1.0 - cy - by;
                return solve(t, solveEpsilon(duration));
            }
            /**
             *  getCubicBezierTransition(x1, y1, x2, y2) -> Function
             *
             *  Generates a transition easing function that is compatible
             *  with WebKit's CSS transitions `-webkit-transition-timing-function`
             *  CSS property.
             *
             *  The W3C has more information about CSS3 transition timing functions:
             *  http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag
             *
             *  @param {number} x1
             *  @param {number} y1
             *  @param {number} x2
             *  @param {number} y2
             *  @return {function}
             *  @private
             */
            function getCubicBezierTransition(x1, y1, x2, y2) {
                return function (pos) {
                    return cubicBezierAtTime(pos, x1, y1, x2, y2, 1);
                };
            }
            // End ported code
            /**
             * Create a Bezier easing function and attach it to `{{#crossLink
             * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}`.  This
             * function gives you total control over the easing curve.  Matthew Lein's
             * [Ceaser](http://matthewlein.com/ceaser/) is a useful tool for visualizing
             * the curves you can make with this function.
             * @method setBezierFunction
             * @param {string} name The name of the easing curve.  Overwrites the old
             * easing function on `{{#crossLink
             * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}` if it
             * exists.
             * @param {number} x1
             * @param {number} y1
             * @param {number} x2
             * @param {number} y2
             * @return {function} The easing function that was attached to
             * Tweenable.prototype.formula.
             */
            Tweenable.setBezierFunction = function (name, x1, y1, x2, y2) {
                var cubicBezierTransition = getCubicBezierTransition(x1, y1, x2, y2);
                cubicBezierTransition.displayName = name;
                cubicBezierTransition.x1 = x1;
                cubicBezierTransition.y1 = y1;
                cubicBezierTransition.x2 = x2;
                cubicBezierTransition.y2 = y2;
                return Tweenable.prototype.formula[name] = cubicBezierTransition;
            };
            /**
             * `delete` an easing function from `{{#crossLink
             * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}`.  Be
             * careful with this method, as it `delete`s whatever easing formula matches
             * `name` (which means you can delete standard Shifty easing functions).
             * @method unsetBezierFunction
             * @param {string} name The name of the easing function to delete.
             * @return {function}
             */
            Tweenable.unsetBezierFunction = function (name) {
                delete Tweenable.prototype.formula[name];
            };
        })();
        (function () {
            function getInterpolatedValues(from, current, targetState, position, easing, delay) {
                return Tweenable.tweenProps(position, current, from, targetState, 1, delay, easing);
            }
            // Fake a Tweenable and patch some internals.  This approach allows us to
            // skip uneccessary processing and object recreation, cutting down on garbage
            // collection pauses.
            var mockTweenable = new Tweenable();
            mockTweenable._filterArgs = [];
            /**
             * Compute the midpoint of two Objects.  This method effectively calculates a
             * specific frame of animation that `{{#crossLink
             * "Tweenable/tween:method"}}{{/crossLink}}` does many times over the course
             * of a full tween.
             *
             *     var interpolatedValues = Tweenable.interpolate({
             *       width: '100px',
             *       opacity: 0,
             *       color: '#fff'
             *     }, {
             *       width: '200px',
             *       opacity: 1,
             *       color: '#000'
             *     }, 0.5);
             *
             *     console.log(interpolatedValues);
             *     // {opacity: 0.5, width: "150px", color: "rgb(127,127,127)"}
             *
             * @static
             * @method interpolate
             * @param {Object} from The starting values to tween from.
             * @param {Object} targetState The ending values to tween to.
             * @param {number} position The normalized position value (between `0.0` and
             * `1.0`) to interpolate the values between `from` and `to` for.  `from`
             * represents `0` and `to` represents `1`.
             * @param {Object.<string|Function>|string|Function} easing The easing
             * curve(s) to calculate the midpoint against.  You can reference any easing
             * function attached to `Tweenable.prototype.formula`, or provide the easing
             * function(s) directly.  If omitted, this defaults to "linear".
             * @param {number=} opt_delay Optional delay to pad the beginning of the
             * interpolated tween with.  This increases the range of `position` from (`0`
             * through `1`) to (`0` through `1 + opt_delay`).  So, a delay of `0.5` would
             * increase all valid values of `position` to numbers between `0` and `1.5`.
             * @return {Object}
             */
            Tweenable.interpolate = function (from, targetState, position, easing, opt_delay) {
                var current = Tweenable.shallowCopy({}, from);
                var delay = opt_delay || 0;
                var easingObject = Tweenable.composeEasingObject(from, easing || 'linear');
                mockTweenable.set({});
                // Alias and reuse the _filterArgs array instead of recreating it.
                var filterArgs = mockTweenable._filterArgs;
                filterArgs.length = 0;
                filterArgs[0] = current;
                filterArgs[1] = from;
                filterArgs[2] = targetState;
                filterArgs[3] = easingObject;
                // Any defined value transformation must be applied
                Tweenable.applyFilter(mockTweenable, 'tweenCreated');
                Tweenable.applyFilter(mockTweenable, 'beforeTween');
                var interpolatedValues = getInterpolatedValues(from, current, targetState, position, easingObject, delay);
                // Transform values back into their original format
                Tweenable.applyFilter(mockTweenable, 'afterTween');
                return interpolatedValues;
            };
        }());
        (function (Tweenable) {
            // CONSTANTS
            var R_NUMBER_COMPONENT = /(\d|\-|\.)/;
            var R_FORMAT_CHUNKS = /([^\-0-9\.]+)/g;
            var R_UNFORMATTED_VALUES = /[0-9.\-]+/g;
            var R_RGB = new RegExp('rgb\\(' + R_UNFORMATTED_VALUES.source +
                (/,\s*/.source) + R_UNFORMATTED_VALUES.source +
                (/,\s*/.source) + R_UNFORMATTED_VALUES.source + '\\)', 'g');
            var R_RGB_PREFIX = /^.*\(/;
            var R_HEX = /#([0-9]|[a-f]){3,6}/gi;
            var VALUE_PLACEHOLDER = 'VAL';
            // HELPERS
            /**
             * @param {Array.number} rawValues
             * @param {string} prefix
             *
             * @return {Array.<string>}
             * @private
             */
            function getFormatChunksFrom(rawValues, prefix) {
                var accumulator = [];
                var rawValuesLength = rawValues.length;
                var i;
                for (i = 0; i < rawValuesLength; i++) {
                    accumulator.push('_' + prefix + '_' + i);
                }
                return accumulator;
            }
            /**
             * @param {string} formattedString
             *
             * @return {string}
             * @private
             */
            function getFormatStringFrom(formattedString) {
                var chunks = formattedString.match(R_FORMAT_CHUNKS);
                if (!chunks) {
                    // chunks will be null if there were no tokens to parse in
                    // formattedString (for example, if formattedString is '2').  Coerce
                    // chunks to be useful here.
                    chunks = ['', ''];
                    // If there is only one chunk, assume that the string is a number
                    // followed by a token...
                    // NOTE: This may be an unwise assumption.
                }
                else if (chunks.length === 1 ||
                    // ...or if the string starts with a number component (".", "-", or a
                    // digit)...
                    formattedString.charAt(0).match(R_NUMBER_COMPONENT)) {
                    // ...prepend an empty string here to make sure that the formatted number
                    // is properly replaced by VALUE_PLACEHOLDER
                    chunks.unshift('');
                }
                return chunks.join(VALUE_PLACEHOLDER);
            }
            /**
             * Convert all hex color values within a string to an rgb string.
             *
             * @param {Object} stateObject
             *
             * @return {Object} The modified obj
             * @private
             */
            function sanitizeObjectForHexProps(stateObject) {
                Tweenable.each(stateObject, function (prop) {
                    var currentProp = stateObject[prop];
                    if (typeof currentProp === 'string' && currentProp.match(R_HEX)) {
                        stateObject[prop] = sanitizeHexChunksToRGB(currentProp);
                    }
                });
            }
            /**
             * @param {string} str
             *
             * @return {string}
             * @private
             */
            function sanitizeHexChunksToRGB(str) {
                return filterStringChunks(R_HEX, str, convertHexToRGB);
            }
            /**
             * @param {string} hexString
             *
             * @return {string}
             * @private
             */
            function convertHexToRGB(hexString) {
                var rgbArr = hexToRGBArray(hexString);
                return 'rgb(' + rgbArr[0] + ',' + rgbArr[1] + ',' + rgbArr[2] + ')';
            }
            var hexToRGBArray_returnArray = [];
            /**
             * Convert a hexadecimal string to an array with three items, one each for
             * the red, blue, and green decimal values.
             *
             * @param {string} hex A hexadecimal string.
             *
             * @returns {Array.<number>} The converted Array of RGB values if `hex` is a
             * valid string, or an Array of three 0's.
             * @private
             */
            function hexToRGBArray(hex) {
                hex = hex.replace(/#/, '');
                // If the string is a shorthand three digit hex notation, normalize it to
                // the standard six digit notation
                if (hex.length === 3) {
                    hex = hex.split('');
                    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                }
                hexToRGBArray_returnArray[0] = hexToDec(hex.substr(0, 2));
                hexToRGBArray_returnArray[1] = hexToDec(hex.substr(2, 2));
                hexToRGBArray_returnArray[2] = hexToDec(hex.substr(4, 2));
                return hexToRGBArray_returnArray;
            }
            /**
             * Convert a base-16 number to base-10.
             *
             * @param {Number|String} hex The value to convert
             *
             * @returns {Number} The base-10 equivalent of `hex`.
             * @private
             */
            function hexToDec(hex) {
                return parseInt(hex, 16);
            }
            /**
             * Runs a filter operation on all chunks of a string that match a RegExp
             *
             * @param {RegExp} pattern
             * @param {string} unfilteredString
             * @param {function(string)} filter
             *
             * @return {string}
             * @private
             */
            function filterStringChunks(pattern, unfilteredString, filter) {
                var pattenMatches = unfilteredString.match(pattern);
                var filteredString = unfilteredString.replace(pattern, VALUE_PLACEHOLDER);
                if (pattenMatches) {
                    var pattenMatchesLength = pattenMatches.length;
                    var currentChunk;
                    for (var i = 0; i < pattenMatchesLength; i++) {
                        currentChunk = pattenMatches.shift();
                        filteredString = filteredString.replace(VALUE_PLACEHOLDER, filter(currentChunk));
                    }
                }
                return filteredString;
            }
            /**
             * Check for floating point values within rgb strings and rounds them.
             *
             * @param {string} formattedString
             *
             * @return {string}
             * @private
             */
            function sanitizeRGBChunks(formattedString) {
                return filterStringChunks(R_RGB, formattedString, sanitizeRGBChunk);
            }
            /**
             * @param {string} rgbChunk
             *
             * @return {string}
             * @private
             */
            function sanitizeRGBChunk(rgbChunk) {
                var numbers = rgbChunk.match(R_UNFORMATTED_VALUES);
                var numbersLength = numbers.length;
                var sanitizedString = rgbChunk.match(R_RGB_PREFIX)[0];
                for (var i = 0; i < numbersLength; i++) {
                    sanitizedString += parseInt(numbers[i], 10) + ',';
                }
                sanitizedString = sanitizedString.slice(0, -1) + ')';
                return sanitizedString;
            }
            /**
             * @param {Object} stateObject
             *
             * @return {Object} An Object of formatManifests that correspond to
             * the string properties of stateObject
             * @private
             */
            function getFormatManifests(stateObject) {
                var manifestAccumulator = {};
                Tweenable.each(stateObject, function (prop) {
                    var currentProp = stateObject[prop];
                    if (typeof currentProp === 'string') {
                        var rawValues = getValuesFrom(currentProp);
                        manifestAccumulator[prop] = {
                            'formatString': getFormatStringFrom(currentProp),
                            'chunkNames': getFormatChunksFrom(rawValues, prop)
                        };
                    }
                });
                return manifestAccumulator;
            }
            /**
             * @param {Object} stateObject
             * @param {Object} formatManifests
             * @private
             */
            function expandFormattedProperties(stateObject, formatManifests) {
                Tweenable.each(formatManifests, function (prop) {
                    var currentProp = stateObject[prop];
                    var rawValues = getValuesFrom(currentProp);
                    var rawValuesLength = rawValues.length;
                    for (var i = 0; i < rawValuesLength; i++) {
                        stateObject[formatManifests[prop].chunkNames[i]] = +rawValues[i];
                    }
                    delete stateObject[prop];
                });
            }
            /**
             * @param {Object} stateObject
             * @param {Object} formatManifests
             * @private
             */
            function collapseFormattedProperties(stateObject, formatManifests) {
                Tweenable.each(formatManifests, function (prop) {
                    var currentProp = stateObject[prop];
                    var formatChunks = extractPropertyChunks(stateObject, formatManifests[prop].chunkNames);
                    var valuesList = getValuesList(formatChunks, formatManifests[prop].chunkNames);
                    currentProp = getFormattedValues(formatManifests[prop].formatString, valuesList);
                    stateObject[prop] = sanitizeRGBChunks(currentProp);
                });
            }
            /**
             * @param {Object} stateObject
             * @param {Array.<string>} chunkNames
             *
             * @return {Object} The extracted value chunks.
             * @private
             */
            function extractPropertyChunks(stateObject, chunkNames) {
                var extractedValues = {};
                var currentChunkName, chunkNamesLength = chunkNames.length;
                for (var i = 0; i < chunkNamesLength; i++) {
                    currentChunkName = chunkNames[i];
                    extractedValues[currentChunkName] = stateObject[currentChunkName];
                    delete stateObject[currentChunkName];
                }
                return extractedValues;
            }
            var getValuesList_accumulator = [];
            /**
             * @param {Object} stateObject
             * @param {Array.<string>} chunkNames
             *
             * @return {Array.<number>}
             * @private
             */
            function getValuesList(stateObject, chunkNames) {
                getValuesList_accumulator.length = 0;
                var chunkNamesLength = chunkNames.length;
                for (var i = 0; i < chunkNamesLength; i++) {
                    getValuesList_accumulator.push(stateObject[chunkNames[i]]);
                }
                return getValuesList_accumulator;
            }
            /**
             * @param {string} formatString
             * @param {Array.<number>} rawValues
             *
             * @return {string}
             * @private
             */
            function getFormattedValues(formatString, rawValues) {
                var formattedValueString = formatString;
                var rawValuesLength = rawValues.length;
                for (var i = 0; i < rawValuesLength; i++) {
                    formattedValueString = formattedValueString.replace(VALUE_PLACEHOLDER, +rawValues[i].toFixed(4));
                }
                return formattedValueString;
            }
            /**
             * Note: It's the duty of the caller to convert the Array elements of the
             * return value into numbers.  This is a performance optimization.
             *
             * @param {string} formattedString
             *
             * @return {Array.<string>|null}
             * @private
             */
            function getValuesFrom(formattedString) {
                return formattedString.match(R_UNFORMATTED_VALUES);
            }
            /**
             * @param {Object} easingObject
             * @param {Object} tokenData
             * @private
             */
            function expandEasingObject(easingObject, tokenData) {
                Tweenable.each(tokenData, function (prop) {
                    var currentProp = tokenData[prop];
                    var chunkNames = currentProp.chunkNames;
                    var chunkLength = chunkNames.length;
                    var easing = easingObject[prop];
                    var i;
                    if (typeof easing === 'string') {
                        var easingChunks = easing.split(' ');
                        var lastEasingChunk = easingChunks[easingChunks.length - 1];
                        for (i = 0; i < chunkLength; i++) {
                            easingObject[chunkNames[i]] = easingChunks[i] || lastEasingChunk;
                        }
                    }
                    else {
                        for (i = 0; i < chunkLength; i++) {
                            easingObject[chunkNames[i]] = easing;
                        }
                    }
                    delete easingObject[prop];
                });
            }
            /**
             * @param {Object} easingObject
             * @param {Object} tokenData
             * @private
             */
            function collapseEasingObject(easingObject, tokenData) {
                Tweenable.each(tokenData, function (prop) {
                    var currentProp = tokenData[prop];
                    var chunkNames = currentProp.chunkNames;
                    var chunkLength = chunkNames.length;
                    var firstEasing = easingObject[chunkNames[0]];
                    var typeofEasings = typeof firstEasing;
                    if (typeofEasings === 'string') {
                        var composedEasingString = '';
                        for (var i = 0; i < chunkLength; i++) {
                            composedEasingString += ' ' + easingObject[chunkNames[i]];
                            delete easingObject[chunkNames[i]];
                        }
                        easingObject[prop] = composedEasingString.substr(1);
                    }
                    else {
                        easingObject[prop] = firstEasing;
                    }
                });
            }
            Tweenable.prototype.filter.token = {
                'tweenCreated': function (currentState, fromState, toState, easingObject) {
                    sanitizeObjectForHexProps(currentState);
                    sanitizeObjectForHexProps(fromState);
                    sanitizeObjectForHexProps(toState);
                    this._tokenData = getFormatManifests(currentState);
                },
                'beforeTween': function (currentState, fromState, toState, easingObject) {
                    expandEasingObject(easingObject, this._tokenData);
                    expandFormattedProperties(currentState, this._tokenData);
                    expandFormattedProperties(fromState, this._tokenData);
                    expandFormattedProperties(toState, this._tokenData);
                },
                'afterTween': function (currentState, fromState, toState, easingObject) {
                    collapseFormattedProperties(currentState, this._tokenData);
                    collapseFormattedProperties(fromState, this._tokenData);
                    collapseFormattedProperties(toState, this._tokenData);
                    collapseEasingObject(easingObject, this._tokenData);
                }
            };
        }(Tweenable));
    }).call(null);
});
// Utility functions
var PREFIXES = 'Webkit Moz O ms'.split(' ');
var FLOAT_COMPARISON_EPSILON = 0.001;
// Copy all attributes from source object to destination object.
// destination object is mutated.
function extend(destination, source, recursive) {
    destination = destination || {};
    source = source || {};
    recursive = recursive || false;
    for (var attrName in source) {
        if (source.hasOwnProperty(attrName)) {
            var destVal = destination[attrName];
            var sourceVal = source[attrName];
            if (recursive && isObject(destVal) && isObject(sourceVal)) {
                destination[attrName] = extend(destVal, sourceVal, recursive);
            }
            else {
                destination[attrName] = sourceVal;
            }
        }
    }
    return destination;
}
// Renders templates with given variables. Variables must be surrounded with
// braces without any spaces, e.g. {variable}
// All instances of variable placeholders will be replaced with given content
// Example:
// render('Hello, {message}!', {message: 'world'})
function render(template, vars) {
    var rendered = template;
    for (var key in vars) {
        if (vars.hasOwnProperty(key)) {
            var val = vars[key];
            var regExpString = '\\{' + key + '\\}';
            var regExp = new RegExp(regExpString, 'g');
            rendered = rendered.replace(regExp, val);
        }
    }
    return rendered;
}
function setStyle(element, style, value) {
    var elStyle = element.style; // cache for performance
    for (var i = 0; i < PREFIXES.length; ++i) {
        var prefix = PREFIXES[i];
        elStyle[prefix + capitalize(style)] = value;
    }
    elStyle[style] = value;
}
function setStyles(element, styles) {
    forEachObject(styles, function (styleValue, styleName) {
        // Allow disabling some individual styles by setting them
        // to null or undefined
        if (styleValue === null || styleValue === undefined) {
            return;
        }
        // If style's value is {prefix: true, value: '50%'},
        // Set also browser prefixed styles
        if (isObject(styleValue) && styleValue.prefix === true) {
            setStyle(element, styleName, styleValue.value);
        }
        else {
            element.style[styleName] = styleValue;
        }
    });
}
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
}
function isFunction(obj) {
    return typeof obj === 'function';
}
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
// Returns true if `obj` is object as in {a: 1, b: 2}, not if it's function or
// array
function isObject(obj) {
    if (isArray(obj)) {
        return false;
    }
    var type = typeof obj;
    return type === 'object' && !!obj;
}
function forEachObject(object, callback) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            var val = object[key];
            callback(val, key);
        }
    }
}
function floatEquals(a, b) {
    return Math.abs(a - b) < FLOAT_COMPARISON_EPSILON;
}
// https://coderwall.com/p/nygghw/don-t-use-innerhtml-to-empty-dom-elements
function removeChildren(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}
var utils = {
    extend: extend,
    render: render,
    setStyle: setStyle,
    setStyles: setStyles,
    capitalize: capitalize,
    isString: isString,
    isFunction: isFunction,
    isObject: isObject,
    forEachObject: forEachObject,
    floatEquals: floatEquals,
    removeChildren: removeChildren
};
// Lower level API to animate any kind of svg path
var EASING_ALIASES = {
    easeIn: 'easeInCubic',
    easeOut: 'easeOutCubic',
    easeInOut: 'easeInOutCubic'
};
var Path = function Path(path, opts) {
    // Throw a better error if not initialized with `new` keyword
    if (!(this instanceof Path)) {
        throw new Error('Constructor was called without new keyword');
    }
    // Default parameters for animation
    opts = utils.extend({
        duration: 800,
        easing: 'linear',
        from: {},
        to: {},
        step: function () { }
    }, opts);
    var element;
    if (utils.isString(path)) {
        element = document.querySelector(path);
    }
    else {
        element = path;
    }
    // Reveal .path as public attribute
    this.path = element;
    this._opts = opts;
    this._tweenable = null;
    // Set up the starting positions
    var length = this.path.getTotalLength();
    this.path.style.strokeDasharray = length + ' ' + length;
    this.set(0);
};
Path.prototype.value = function value() {
    var offset = this._getComputedDashOffset();
    var length = this.path.getTotalLength();
    var progress = 1 - offset / length;
    // Round number to prevent returning very small number like 1e-30, which
    // is practically 0
    return parseFloat(progress.toFixed(6), 10);
};
Path.prototype.set = function set(progress) {
    this.stop();
    this.path.style.strokeDashoffset = this._progressToOffset(progress);
    var step = this._opts.step;
    if (utils.isFunction(step)) {
        var easing = this._easing(this._opts.easing);
        var values = this._calculateTo(progress, easing);
        var reference = this._opts.shape || this;
        step(values, reference, this._opts.attachment);
    }
};
Path.prototype.stop = function stop() {
    this._stopTween();
    this.path.style.strokeDashoffset = this._getComputedDashOffset();
};
// Method introduced here:
// http://jakearchibald.com/2013/animated-line-drawing-svg/
Path.prototype.animate = function animate(progress, opts, cb) {
    opts = opts || {};
    if (utils.isFunction(opts)) {
        cb = opts;
        opts = {};
    }
    var passedOpts = utils.extend({}, opts);
    // Copy default opts to new object so defaults are not modified
    var defaultOpts = utils.extend({}, this._opts);
    opts = utils.extend(defaultOpts, opts);
    var shiftyEasing = this._easing(opts.easing);
    var values = this._resolveFromAndTo(progress, shiftyEasing, passedOpts);
    this.stop();
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    this.path.getBoundingClientRect();
    var offset = this._getComputedDashOffset();
    var newOffset = this._progressToOffset(progress);
    var self = this;
    this._tweenable = new shifty();
    this._tweenable.tween({
        from: utils.extend({ offset: offset }, values.from),
        to: utils.extend({ offset: newOffset }, values.to),
        duration: opts.duration,
        easing: shiftyEasing,
        step: function (state) {
            self.path.style.strokeDashoffset = state.offset;
            var reference = opts.shape || self;
            opts.step(state, reference, opts.attachment);
        },
        finish: function (state) {
            if (utils.isFunction(cb)) {
                cb();
            }
        }
    });
};
Path.prototype._getComputedDashOffset = function _getComputedDashOffset() {
    var computedStyle = window.getComputedStyle(this.path, null);
    return parseFloat(computedStyle.getPropertyValue('stroke-dashoffset'), 10);
};
Path.prototype._progressToOffset = function _progressToOffset(progress) {
    var length = this.path.getTotalLength();
    return length - progress * length;
};
// Resolves from and to values for animation.
Path.prototype._resolveFromAndTo = function _resolveFromAndTo(progress, easing, opts) {
    if (opts.from && opts.to) {
        return {
            from: opts.from,
            to: opts.to
        };
    }
    return {
        from: this._calculateFrom(easing),
        to: this._calculateTo(progress, easing)
    };
};
// Calculate `from` values from options passed at initialization
Path.prototype._calculateFrom = function _calculateFrom(easing) {
    return shifty.interpolate(this._opts.from, this._opts.to, this.value(), easing);
};
// Calculate `to` values from options passed at initialization
Path.prototype._calculateTo = function _calculateTo(progress, easing) {
    return shifty.interpolate(this._opts.from, this._opts.to, progress, easing);
};
Path.prototype._stopTween = function _stopTween() {
    if (this._tweenable !== null) {
        this._tweenable.stop();
        this._tweenable = null;
    }
};
Path.prototype._easing = function _easing(easing) {
    if (EASING_ALIASES.hasOwnProperty(easing)) {
        return EASING_ALIASES[easing];
    }
    return easing;
};
var path = Path;
// Base object for different progress bar shapes
var DESTROYED_ERROR = 'Object is destroyed';
var Shape = function Shape(container, opts) {
    // Throw a better error if progress bars are not initialized with `new`
    // keyword
    if (!(this instanceof Shape)) {
        throw new Error('Constructor was called without new keyword');
    }
    // Prevent calling constructor without parameters so inheritance
    // works correctly. To understand, this is how Shape is inherited:
    //
    //   Line.prototype = new Shape();
    //
    // We just want to set the prototype for Line.
    if (arguments.length === 0) {
        return;
    }
    // Default parameters for progress bar creation
    this._opts = utils.extend({
        color: '#555',
        strokeWidth: 1.0,
        trailColor: null,
        trailWidth: null,
        fill: null,
        text: {
            style: {
                color: null,
                position: 'absolute',
                left: '50%',
                top: '50%',
                padding: 0,
                margin: 0,
                transform: {
                    prefix: true,
                    value: 'translate(-50%, -50%)'
                }
            },
            autoStyleContainer: true,
            alignToBottom: true,
            value: null,
            className: 'progressbar-text'
        },
        svgStyle: {
            display: 'block',
            width: '100%'
        },
        warnings: false
    }, opts, true); // Use recursive extend
    // If user specifies e.g. svgStyle or text style, the whole object
    // should replace the defaults to make working with styles easier
    if (utils.isObject(opts) && opts.svgStyle !== undefined) {
        this._opts.svgStyle = opts.svgStyle;
    }
    if (utils.isObject(opts) && utils.isObject(opts.text) && opts.text.style !== undefined) {
        this._opts.text.style = opts.text.style;
    }
    var svgView = this._createSvgView(this._opts);
    var element;
    if (utils.isString(container)) {
        element = document.querySelector(container);
    }
    else {
        element = container;
    }
    if (!element) {
        throw new Error('Container does not exist: ' + container);
    }
    this._container = element;
    this._container.appendChild(svgView.svg);
    if (this._opts.warnings) {
        this._warnContainerAspectRatio(this._container);
    }
    if (this._opts.svgStyle) {
        utils.setStyles(svgView.svg, this._opts.svgStyle);
    }
    // Expose public attributes before Path initialization
    this.svg = svgView.svg;
    this.path = svgView.path;
    this.trail = svgView.trail;
    this.text = null;
    var newOpts = utils.extend({
        attachment: undefined,
        shape: this
    }, this._opts);
    this._progressPath = new path(svgView.path, newOpts);
    if (utils.isObject(this._opts.text) && this._opts.text.value !== null) {
        this.setText(this._opts.text.value);
    }
};
Shape.prototype.animate = function animate(progress, opts, cb) {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }
    this._progressPath.animate(progress, opts, cb);
};
Shape.prototype.stop = function stop() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }
    // Don't crash if stop is called inside step function
    if (this._progressPath === undefined) {
        return;
    }
    this._progressPath.stop();
};
Shape.prototype.destroy = function destroy() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }
    this.stop();
    this.svg.parentNode.removeChild(this.svg);
    this.svg = null;
    this.path = null;
    this.trail = null;
    this._progressPath = null;
    if (this.text !== null) {
        this.text.parentNode.removeChild(this.text);
        this.text = null;
    }
};
Shape.prototype.set = function set(progress) {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }
    this._progressPath.set(progress);
};
Shape.prototype.value = function value() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }
    if (this._progressPath === undefined) {
        return 0;
    }
    return this._progressPath.value();
};
Shape.prototype.setText = function setText(newText) {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }
    if (this.text === null) {
        // Create new text node
        this.text = this._createTextContainer(this._opts, this._container);
        this._container.appendChild(this.text);
    }
    // Remove previous text and add new
    if (utils.isObject(newText)) {
        utils.removeChildren(this.text);
        this.text.appendChild(newText);
    }
    else {
        this.text.innerHTML = newText;
    }
};
Shape.prototype._createSvgView = function _createSvgView(opts) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._initializeSvg(svg, opts);
    var trailPath = null;
    // Each option listed in the if condition are 'triggers' for creating
    // the trail path
    if (opts.trailColor || opts.trailWidth) {
        trailPath = this._createTrail(opts);
        svg.appendChild(trailPath);
    }
    var path$$1 = this._createPath(opts);
    svg.appendChild(path$$1);
    return {
        svg: svg,
        path: path$$1,
        trail: trailPath
    };
};
Shape.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 100');
};
Shape.prototype._createPath = function _createPath(opts) {
    var pathString = this._pathString(opts);
    return this._createPathElement(pathString, opts);
};
Shape.prototype._createTrail = function _createTrail(opts) {
    // Create path string with original passed options
    var pathString = this._trailString(opts);
    // Prevent modifying original
    var newOpts = utils.extend({}, opts);
    // Defaults for parameters which modify trail path
    if (!newOpts.trailColor) {
        newOpts.trailColor = '#eee';
    }
    if (!newOpts.trailWidth) {
        newOpts.trailWidth = newOpts.strokeWidth;
    }
    newOpts.color = newOpts.trailColor;
    newOpts.strokeWidth = newOpts.trailWidth;
    // When trail path is set, fill must be set for it instead of the
    // actual path to prevent trail stroke from clipping
    newOpts.fill = null;
    return this._createPathElement(pathString, newOpts);
};
Shape.prototype._createPathElement = function _createPathElement(pathString, opts) {
    var path$$1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path$$1.setAttribute('d', pathString);
    path$$1.setAttribute('stroke', opts.color);
    path$$1.setAttribute('stroke-width', opts.strokeWidth);
    if (opts.fill) {
        path$$1.setAttribute('fill', opts.fill);
    }
    else {
        path$$1.setAttribute('fill-opacity', '0');
    }
    return path$$1;
};
Shape.prototype._createTextContainer = function _createTextContainer(opts, container) {
    var textContainer = document.createElement('div');
    textContainer.className = opts.text.className;
    var textStyle = opts.text.style;
    if (textStyle) {
        if (opts.text.autoStyleContainer) {
            container.style.position = 'relative';
        }
        utils.setStyles(textContainer, textStyle);
        // Default text color to progress bar's color
        if (!textStyle.color) {
            textContainer.style.color = opts.color;
        }
    }
    this._initializeTextContainer(opts, container, textContainer);
    return textContainer;
};
// Give custom shapes possibility to modify text element
Shape.prototype._initializeTextContainer = function (opts, container, element) {
    // By default, no-op
    // Custom shapes should respect API options, such as text.style
};
Shape.prototype._pathString = function _pathString(opts) {
    throw new Error('Override this function for each progress bar');
};
Shape.prototype._trailString = function _trailString(opts) {
    throw new Error('Override this function for each progress bar');
};
Shape.prototype._warnContainerAspectRatio = function _warnContainerAspectRatio(container) {
    if (!this.containerAspectRatio) {
        return;
    }
    var computedStyle = window.getComputedStyle(container, null);
    var width = parseFloat(computedStyle.getPropertyValue('width'), 10);
    var height = parseFloat(computedStyle.getPropertyValue('height'), 10);
    if (!utils.floatEquals(this.containerAspectRatio, width / height)) {
        console.warn('Incorrect aspect ratio of container', '#' + container.id, 'detected:', computedStyle.getPropertyValue('width') + '(width)', '/', computedStyle.getPropertyValue('height') + '(height)', '=', width / height);
        console.warn('Aspect ratio of should be', this.containerAspectRatio);
    }
};
var shape = Shape;
// Line shaped progress bar
var Line = function Line(container, options) {
    this._pathTemplate = 'M 0,{center} L 100,{center}';
    shape.apply(this, arguments);
};
Line.prototype = new shape();
Line.prototype.constructor = Line;
Line.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 ' + opts.strokeWidth);
    svg.setAttribute('preserveAspectRatio', 'none');
};
Line.prototype._pathString = function _pathString(opts) {
    return utils.render(this._pathTemplate, {
        center: opts.strokeWidth / 2
    });
};
Line.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};
var line = Line;
// Circle shaped progress bar
var Circle = function Circle(container, options) {
    // Use two arcs to form a circle
    // See this answer http://stackoverflow.com/a/10477334/1446092
    this._pathTemplate =
        'M 50,50 m 0,-{radius}' +
            ' a {radius},{radius} 0 1 1 0,{2radius}' +
            ' a {radius},{radius} 0 1 1 0,-{2radius}';
    this.containerAspectRatio = 1;
    shape.apply(this, arguments);
};
Circle.prototype = new shape();
Circle.prototype.constructor = Circle;
Circle.prototype._pathString = function _pathString(opts) {
    var widthOfWider = opts.strokeWidth;
    if (opts.trailWidth && opts.trailWidth > opts.strokeWidth) {
        widthOfWider = opts.trailWidth;
    }
    var r = 50 - widthOfWider / 2;
    return utils.render(this._pathTemplate, {
        radius: r,
        '2radius': r * 2
    });
};
Circle.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};
var circle = Circle;
// Semi-SemiCircle shaped progress bar
var SemiCircle = function SemiCircle(container, options) {
    // Use one arc to form a SemiCircle
    // See this answer http://stackoverflow.com/a/10477334/1446092
    this._pathTemplate =
        'M 50,50 m -{radius},0' +
            ' a {radius},{radius} 0 1 1 {2radius},0';
    this.containerAspectRatio = 2;
    shape.apply(this, arguments);
};
SemiCircle.prototype = new shape();
SemiCircle.prototype.constructor = SemiCircle;
SemiCircle.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 50');
};
SemiCircle.prototype._initializeTextContainer = function _initializeTextContainer(opts, container, textContainer) {
    if (opts.text.style) {
        // Reset top style
        textContainer.style.top = 'auto';
        textContainer.style.bottom = '0';
        if (opts.text.alignToBottom) {
            utils.setStyle(textContainer, 'transform', 'translate(-50%, 0)');
        }
        else {
            utils.setStyle(textContainer, 'transform', 'translate(-50%, 50%)');
        }
    }
};
// Share functionality with Circle, just have different path
SemiCircle.prototype._pathString = circle.prototype._pathString;
SemiCircle.prototype._trailString = circle.prototype._trailString;
var semicircle = SemiCircle;
var main = {
    // Higher level API, different shaped progress bars
    Line: line,
    Circle: circle,
    SemiCircle: semicircle,
    // Lower level API to use any SVG path
    Path: path,
    // Base-class for creating new custom shapes
    // to be in line with the API of built-in shapes
    // Undocumented.
    Shape: shape,
    // Internal utils, undocumented.
    utils: utils
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ProgressIndicator = /** @class */ (function () {
    function ProgressIndicator() {
        var _this = this;
        this.ishidden = false;
        this.loading = true;
        this.Present = function () {
            return h("svg", { width: "100", height: "100", viewBox: "0 0 566 394", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" }, h("g", { id: "vip-reward-box-outlines", stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, h("g", { id: "Gift-Box-Illustration", transform: "translate(21.000000, 16.000000)" }, h("g", { id: "Group-4", transform: "translate(88.000000, 69.424658)", fill: _this[_this.widgetMode + 'presentcolor'], "fill-rule": "nonzero" }, h("path", { d: "M35.9907976,88.0205479 L310.663709,88.0205479 C318.875344,88.0205479 325.532189,94.6773932 325.532189,102.889028 L325.532189,277.706862 C325.532189,285.918497 318.875344,292.575342 310.663709,292.575342 L35.9907976,292.575342 C27.7791628,292.575342 21.1223176,285.918497 21.1223176,277.706862 L21.1223176,102.889028 C21.1223176,94.6773932 27.7791628,88.0205479 35.9907976,88.0205479 Z M42.1859976,109.084228 L42.1859976,271.511662 L304.468509,271.511662 L304.468509,109.084228 L42.1859976,109.084228 Z", id: "Rectangle" }), h("path", { d: "M14.86848,0.15891007 L333.028516,0.15891007 C341.24015,0.15891007 347.896996,6.81575531 347.896996,15.0273901 L347.896996,94.3863205 C347.896996,102.597955 341.24015,109.2548 333.028516,109.2548 L14.86848,109.2548 C6.65684524,109.2548 0,102.597955 0,94.3863205 L0,15.0273901 C0,6.81575531 6.65684524,0.15891007 14.86848,0.15891007 Z M21.06368,21.2225901 L21.06368,88.1911205 L326.833316,88.1911205 L326.833316,21.2225901 L21.06368,21.2225901 Z", id: "Rectangle" }), h("path", { d: "M121,87.5753425 L215.177627,87.5753425 C223.363797,87.5753425 230,92.2396223 230,97.9933031 L230,282.157382 C230,287.911063 223.363797,292.575342 215.177627,292.575342 L135.822373,292.575342 C127.636203,292.575342 121,287.911063 121,282.157382 L121,87.5753425 Z M142,102.575342 L142,277.575342 L209,277.575342 L209,102.575342 L142,102.575342 Z", id: "Rectangle" })), h("ellipse", { id: "Oval", stroke: _this[_this.widgetMode + 'presentcolor'], "stroke-width": "14.5711104", cx: "472.953863", cy: "200.469178", rx: "11.8036481", ry: "11.7773973" }), h("ellipse", { id: "Oval", stroke: _this[_this.widgetMode + 'presentcolor'], "stroke-width": "14.5711104", cx: "502.953863", cy: "110.469178", rx: "11.8036481", ry: "11.7773973" }), h("g", { id: "x-Mark", transform: "translate(496.892691, 283.941336) rotate(51.000000) translate(-496.892691, -283.941336) translate(474.392691, 261.441336)", stroke: _this[_this.widgetMode + 'presentcolor'], "stroke-linecap": "round", "stroke-width": "14.5711104" }, h("path", { d: "M29.8197425,0 L14.9098712,44.630137", id: "Line-2" }), h("path", { d: "M44.7296137,29.7534247 L0,14.8767123", id: "Line-2" })), h("ellipse", { id: "Oval", stroke: _this[_this.widgetMode + 'presentcolor'], "stroke-width": "14.5711104", cx: "11.9903433", cy: "122.866438", rx: "11.8036481", ry: "11.7773973" }), h("g", { id: "Bow", transform: "translate(163.791845, 0.000000)", stroke: _this[_this.widgetMode + 'presentcolor'], "stroke-linecap": "round", "stroke-width": "21.06368" }, h("path", { d: "M103.114059,70.6643836 C131.339262,27.389518 153.398132,5.75208521 169.29067,5.75208521 C193.129477,5.75208521 206.337166,25.7136653 185.782888,47.5779179 C172.080036,62.1540864 144.193266,69.8495749 102.122578,70.6643836", id: "Line-2" }), h("path", { d: "M0.991481337,64.9122984 C29.2166839,21.6374328 51.2755542,2.62900812e-13 67.1680924,2.62900812e-13 C91.0068997,2.62900812e-13 104.214589,19.9615801 83.6603104,41.8258327 C69.9574582,56.4020012 42.0706881,64.0974897 1.91846539e-13,64.9122984", id: "Line-2", transform: "translate(46.914137, 32.456149) scale(-1, 1) translate(-46.914137, -32.456149) " }))), h("circle", { id: "Oval", stroke: _this[_this.widgetMode + 'presentcolor'], "stroke-width": "14.5711104", cx: "32", cy: "290", r: "12" }), h("g", { id: "x-Mark", transform: "translate(72.500000, 217.500000) rotate(72.000000) translate(-72.500000, -217.500000) translate(50.000000, 195.000000)", stroke: _this[_this.widgetMode + 'presentcolor'], "stroke-linecap": "round", "stroke-width": "14.5711104" }, h("path", { d: "M29.8197425,0 L14.9098712,44.630137", id: "Line-2" }), h("path", { d: "M44.7296137,29.7534247 L0,14.8767123", id: "Line-2" }))));
        };
        this.progressBar = function () {
            var circleStyle = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      transform: scaleX(-1);\n    "], ["\n      transform: scaleX(-1);\n    "])));
            var textStyle = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      position: absolute; \n      left: ", "; \n      top:82%; \n      padding: 0px; \n      margin: 0px; \n      transform: translate(-50%, -50%); \n      color: ", "; \n      font-family: Roboto, Helvetica, sans-serif; \n      font-size: ", ";\n      font-weight:bold;\n    "], ["\n      position: absolute; \n      left: ", "; \n      top:82%; \n      padding: 0px; \n      margin: 0px; \n      transform: translate(-50%, -50%); \n      color: ", "; \n      font-family: Roboto, Helvetica, sans-serif; \n      font-size: ", ";\n      font-weight:bold;\n    "])), _this.rewardComplete ? '53.5%' : '55%', _this[_this.widgetMode + 'percentagecolor'] || 'rgb(0, 157, 245)', _this.rewardComplete ? '30px' : '34px');
            var presentStyle = css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      position: absolute; \n      left: 53%; \n      top: 52%; \n      transform: translate(-50%, -50%);\n    "], ["\n      position: absolute; \n      left: 53%; \n      top: 52%; \n      transform: translate(-50%, -50%);\n    "])));
            var percentStyle = css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      font-size:65%;\n      vertical-align: top;\n      display: inline-block;\n      margin-top: 3px;\n      margin-left: ", ";\n    "], ["\n      font-size:65%;\n      vertical-align: top;\n      display: inline-block;\n      margin-top: 3px;\n      margin-left: ", ";\n    "])), _this.rewardComplete ? '0px' : '-1px');
            var completeStyle = css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      margin-top:0em;\n      font-size:16px;\n    "], ["\n      margin-top:0em;\n      font-size:16px;\n    "])));
            return [
                h("svg", { class: circleStyle, width: "210px", height: "210px", viewBox: "0 0 133 133", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, h("g", { id: "blue-semi-circle", stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd", "stroke-linecap": "round" }, h("path", { d: "M94.2309355,112 C106.803489,103.004938 115,88.2630912 115,71.6028679 C115,44.2079604 92.8380951,22 65.5,22 C38.1619049,22 16,44.2079604 16,71.6028679 C16,88.1040219 24.0407405,102.723258 36.4101421,111.740781", id: "Grey-Semi", stroke: "#E9E9E9", "stroke-width": "6.5" }), h("path", { id: "custom-circle", d: "M94.2309355,112 C106.803489,103.004938 115,88.2630912 115,71.6028679 C115,44.2079604 92.8380951,22 65.5,22 C38.1619049,22 16,44.2079604 16,71.6028679 C16,88.1040219 24.0407405,102.723258 36.4101421,111.740781", stroke: _this[_this.widgetMode + 'progresscolor'], "stroke-width": "6.5" }))),
                h("span", { class: presentStyle }, _this.Present()),
                h("div", { class: textStyle }, h("br", null), _this.rewardStats && Math.round(_this.rewardStats.progress * 100), h("span", { class: percentStyle }, "%"), h("br", null), h("p", { class: completeStyle }, "COMPLETE"))
            ];
        };
    }
    ProgressIndicator.prototype.LoadingState = function () {
        return (h("div", { class: "container-loading" }, h("div", { class: "loading-icon" }, h("div", { class: "bar1" }), h("div", { class: "bar2" }), h("div", { class: "bar3" }), h("div", { class: "bar4" }), h("div", { class: "bar5" }))));
    };
    ProgressIndicator.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userProgress, programRules, purchaseTotal, programGoal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API.graphql.getUserProgress()];
                    case 1:
                        userProgress = _a.sent();
                        return [4 /*yield*/, API.graphql.getProgramRules()];
                    case 2:
                        programRules = _a.sent();
                        this.loading = false;
                        purchaseTotal = userProgress.customFields[programRules.id + '_totalValue'] || 0;
                        programGoal = programRules.rules.rewardRules.rewardGoal;
                        this.rewardStats = {
                            amountEarned: userProgress.rewardBalanceDetails[0] ? userProgress.rewardBalanceDetails[0].prettyAvailableValue : null,
                            purchaseTotal: purchaseTotal,
                            programGoal: programGoal,
                            progress: Math.floor(((purchaseTotal % programGoal) / programGoal) * 100) / 100,
                            progressToGoal: Math.floor((programGoal - (purchaseTotal % programGoal)))
                        };
                        this.widgetMode = this.rewardStats.progress ? "inprogress" : "noprogress";
                        return [2 /*return*/];
                }
            });
        });
    };
    ProgressIndicator.prototype.componentDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.rewardStats.purchaseTotal > 0 && this.rewardStats.purchaseTotal % this.rewardStats.programGoal == 0) {
                    this.rewardComplete = true;
                    this.rewardStats.progress = 1;
                    this.widgetMode = "completed";
                    this.getProgress();
                    return [2 /*return*/];
                }
                if (window["widgetIdent"].env === "demo") {
                    this.editorModeUpdated();
                }
                this.getProgress();
                this.updateText();
                return [2 /*return*/];
            });
        });
    };
    ProgressIndicator.prototype.componentWillUpdate = function () {
        this.updateText();
    };
    ProgressIndicator.prototype.editorModeUpdated = function () {
        this.widgetMode = this.editormode;
        switch (this.editormode) {
            case "noprogress":
                this.rewardStats = {
                    amountEarned: '$10.00',
                    purchaseTotal: 0,
                    programGoal: 24,
                    progress: 0,
                    progressToGoal: 24
                };
                this.rewardComplete = false;
                this.getProgress();
                this.updateText();
                break;
            case "inprogress":
                this.rewardStats = {
                    amountEarned: '$10.00',
                    purchaseTotal: 16,
                    programGoal: 24,
                    progress: 0.66,
                    progressToGoal: 16
                };
                this.rewardComplete = false;
                this.getProgress();
                this.updateText();
                break;
            case "completed":
                this.rewardStats = {
                    amountEarned: '$15.00',
                    purchaseTotal: 24,
                    programGoal: 24,
                    progress: 1,
                    progressToGoal: 0
                };
                this.getProgress();
                this.updateText();
                this.rewardComplete = true;
        }
    };
    ProgressIndicator.prototype.updateText = function () {
        var progress = {
            amountNeeded: this.rewardStats.progressToGoal
        };
        var earned = {
            amountEarned: this.rewardStats.amountEarned || 0
        };
        this.progressMessage = FormatJS.format(this[this.widgetMode + 'neededmessage'], progress);
        this.earnedMessage = FormatJS.format(this[this.widgetMode + 'earnedmessage'], earned);
    };
    ProgressIndicator.prototype.getProgress = function () {
        var _this = this;
        var bar = new main.Path('#custom-circle', {
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 8,
            trailWidth: 8,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false
            },
            from: { color: this[this.widgetMode + 'progresscolor'], width: 8 },
            to: { color: this[this.widgetMode + 'progresscolor'], width: 8 },
            // Set default step function for all animate calls
            step: function (state, circle) {
                circle.path.setAttribute('stroke', _this[_this.widgetMode + 'progresscolor']);
                circle.path.setAttribute('stroke-width', state.width);
            }
        });
        bar.animate(this.rewardStats.progress);
    };
    ProgressIndicator.prototype.render = function () {
        var wrapperStyle = css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      color: ", ";\n      text-align: center;\n    "], ["\n      color: ", ";\n      text-align: center;\n    "])), this[this.widgetMode + 'textcolor']);
        var progressStyle = css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      position:relative;\n      width: ", ";\n      margin: 30px auto;\n      margin-top:0;\n    "], ["\n      position:relative;\n      width: ", ";\n      margin: 30px auto;\n      margin-top:0;\n    "])), this.progresswidth);
        return !this.ishidden && (this.loading ? h(this.LoadingState, null) :
            h("div", { class: wrapperStyle }, h("sqh-text-component", { ismarkdown: true, text: this.earnedMessage || "", paddingtop: "20", color: this[this.widgetMode + 'textcolor'] }), h("div", { class: progressStyle }, h("div", { id: "container" }, this.progressBar())), this.rewardComplete ?
                h("sqh-text-component", { ismarkdown: true, text: this.progressMessage || "", padding: "0 4% 20px 4%", color: this.completedrewardedcolor })
                :
                    h("sqh-text-component", { ismarkdown: true, text: this.progressMessage || "", padding: "0 20% 20px 20%", color: this[this.widgetMode + 'textcolor'] })));
    };
    Object.defineProperty(ProgressIndicator, "is", {
        get: function () { return "sqh-progress-indicator"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressIndicator, "properties", {
        get: function () {
            return {
                "completedearnedmessage": {
                    "type": String,
                    "attr": "completedearnedmessage"
                },
                "completedneededmessage": {
                    "type": String,
                    "attr": "completedneededmessage"
                },
                "completedpercentagecolor": {
                    "type": String,
                    "attr": "completedpercentagecolor"
                },
                "completedpresentcolor": {
                    "type": String,
                    "attr": "completedpresentcolor"
                },
                "completedprogresscolor": {
                    "type": String,
                    "attr": "completedprogresscolor"
                },
                "completedrewardedcolor": {
                    "type": String,
                    "attr": "completedrewardedcolor"
                },
                "completedtextcolor": {
                    "type": String,
                    "attr": "completedtextcolor"
                },
                "earnedMessage": {
                    "state": true
                },
                "editormode": {
                    "type": String,
                    "attr": "editormode",
                    "watchCallbacks": ["editorModeUpdated"]
                },
                "inprogressearnedmessage": {
                    "type": String,
                    "attr": "inprogressearnedmessage"
                },
                "inprogressneededmessage": {
                    "type": String,
                    "attr": "inprogressneededmessage"
                },
                "inprogresspercentagecolor": {
                    "type": String,
                    "attr": "inprogresspercentagecolor"
                },
                "inprogresspresentcolor": {
                    "type": String,
                    "attr": "inprogresspresentcolor"
                },
                "inprogressprogresscolor": {
                    "type": String,
                    "attr": "inprogressprogresscolor"
                },
                "inprogresstextcolor": {
                    "type": String,
                    "attr": "inprogresstextcolor"
                },
                "ishidden": {
                    "type": Boolean,
                    "attr": "ishidden"
                },
                "ismarkdown": {
                    "type": Boolean,
                    "attr": "ismarkdown"
                },
                "loading": {
                    "state": true
                },
                "noprogresscolor": {
                    "type": String,
                    "attr": "noprogresscolor"
                },
                "noprogressearnedmessage": {
                    "type": String,
                    "attr": "noprogressearnedmessage"
                },
                "noprogressneededmessage": {
                    "type": String,
                    "attr": "noprogressneededmessage"
                },
                "noprogresspercentagecolor": {
                    "type": String,
                    "attr": "noprogresspercentagecolor"
                },
                "noprogresspresentcolor": {
                    "type": String,
                    "attr": "noprogresspresentcolor"
                },
                "noprogresstextcolor": {
                    "type": String,
                    "attr": "noprogresstextcolor"
                },
                "percentagesize": {
                    "type": String,
                    "attr": "percentagesize"
                },
                "progressMessage": {
                    "state": true
                },
                "progresstype": {
                    "type": String,
                    "attr": "progresstype"
                },
                "progresswidth": {
                    "type": String,
                    "attr": "progresswidth"
                },
                "rewardComplete": {
                    "state": true
                },
                "rewardStats": {
                    "state": true
                },
                "widgetMode": {
                    "state": true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressIndicator, "style", {
        get: function () { return "sqh-progress-indicator {\n  display: block; }\n  sqh-progress-indicator .container-loading {\n    display: none;\n    left: calc(50% - 50px);\n    position: absolute;\n    text-align: center;\n    top: 45%;\n    width: 100px; }\n  sqh-progress-indicator:not(.hydrated) .container-loading {\n    display: block;\n    visibility: visible; }\n  sqh-progress-indicator .loading-icon {\n    height: 40px;\n    text-align: center;\n    font-size: 10px;\n    position: absolute;\n    left: 0;\n    width: 100%;\n    top: 45%;\n    z-index: 1000; }\n  sqh-progress-indicator .loading-icon-tr .loading-icon {\n    position: relative;\n    top: 0; }\n  sqh-progress-indicator .loading-icon > div {\n    background-color: #439B76;\n    height: 100%;\n    margin: 1px;\n    width: 6px;\n    display: inline-block;\n    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;\n    animation: sk-stretchdelay 1.2s infinite ease-in-out; }\n  sqh-progress-indicator .loading-icon .bar2 {\n    -webkit-animation-delay: -1.1s;\n    animation-delay: -1.1s; }\n  sqh-progress-indicator .loading-icon .bar3 {\n    -webkit-animation-delay: -1.0s;\n    animation-delay: -1.0s; }\n  sqh-progress-indicator .loading-icon .bar4 {\n    -webkit-animation-delay: -0.9s;\n    animation-delay: -0.9s; }\n  sqh-progress-indicator .loading-icon .bar5 {\n    -webkit-animation-delay: -0.8s;\n    animation-delay: -0.8s; }\n\n\@-webkit-keyframes sk-stretchdelay {\n  0%, 40%, 100% {\n    -webkit-transform: scaleY(0.4); }\n  20% {\n    -webkit-transform: scaleY(1); } }\n\n\@keyframes sk-stretchdelay {\n  0%, 40%, 100% {\n    transform: scaleY(0.4);\n    -webkit-transform: scaleY(0.4); }\n  20% {\n    transform: scaleY(1);\n    -webkit-transform: scaleY(1); } }"; },
        enumerable: true,
        configurable: true
    });
    return ProgressIndicator;
}());
var marked = createCommonjsModule(function (module, exports) {
    (function (root) {
        /**
         * Block-Level Grammar
         */
        var block = {
            newline: /^\n+/,
            code: /^( {4}[^\n]+\n*)+/,
            fences: noop,
            hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
            heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
            nptable: noop,
            blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
            list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
            html: '^ {0,3}(?:' // optional indentation
                + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
                + '|comment[^\\n]*(\\n+|$)' // (2)
                + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
                + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
                + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
                + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
                + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
                + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
                + ')',
            def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
            table: noop,
            lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
            paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading| {0,3}>|<\/?(?:tag)(?: +|\n|\/?>)|<(?:script|pre|style|!--))[^\n]+)*)/,
            text: /^[^\n]+/
        };
        block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
        block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
        block.def = edit(block.def)
            .replace('label', block._label)
            .replace('title', block._title)
            .getRegex();
        block.bullet = /(?:[*+-]|\d+\.)/;
        block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
        block.item = edit(block.item, 'gm')
            .replace(/bull/g, block.bullet)
            .getRegex();
        block.list = edit(block.list)
            .replace(/bull/g, block.bullet)
            .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
            .replace('def', '\\n+(?=' + block.def.source + ')')
            .getRegex();
        block._tag = 'address|article|aside|base|basefont|blockquote|body|caption'
            + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
            + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
            + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
            + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr'
            + '|track|ul';
        block._comment = /<!--(?!-?>)[\s\S]*?-->/;
        block.html = edit(block.html, 'i')
            .replace('comment', block._comment)
            .replace('tag', block._tag)
            .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
            .getRegex();
        block.paragraph = edit(block.paragraph)
            .replace('hr', block.hr)
            .replace('heading', block.heading)
            .replace('lheading', block.lheading)
            .replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
            .getRegex();
        block.blockquote = edit(block.blockquote)
            .replace('paragraph', block.paragraph)
            .getRegex();
        /**
         * Normal Block Grammar
         */
        block.normal = merge({}, block);
        /**
         * GFM Block Grammar
         */
        block.gfm = merge({}, block.normal, {
            fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,
            paragraph: /^/,
            heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
        });
        block.gfm.paragraph = edit(block.paragraph)
            .replace('(?!', '(?!'
            + block.gfm.fences.source.replace('\\1', '\\2') + '|'
            + block.list.source.replace('\\1', '\\3') + '|')
            .getRegex();
        /**
         * GFM + Tables Block Grammar
         */
        block.tables = merge({}, block.gfm, {
            nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
            table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
        });
        /**
         * Pedantic grammar
         */
        block.pedantic = merge({}, block.normal, {
            html: edit('^ *(?:comment *(?:\\n|\\s*$)'
                + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
                + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
                .replace('comment', block._comment)
                .replace(/tag/g, '(?!(?:'
                + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
                + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
                + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
                .getRegex(),
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/
        });
        /**
         * Block Lexer
         */
        function Lexer(options) {
            this.tokens = [];
            this.tokens.links = {};
            this.options = options || marked.defaults;
            this.rules = block.normal;
            if (this.options.pedantic) {
                this.rules = block.pedantic;
            }
            else if (this.options.gfm) {
                if (this.options.tables) {
                    this.rules = block.tables;
                }
                else {
                    this.rules = block.gfm;
                }
            }
        }
        /**
         * Expose Block Rules
         */
        Lexer.rules = block;
        /**
         * Static Lex Method
         */
        Lexer.lex = function (src, options) {
            var lexer = new Lexer(options);
            return lexer.lex(src);
        };
        /**
         * Preprocessing
         */
        Lexer.prototype.lex = function (src) {
            src = src
                .replace(/\r\n|\r/g, '\n')
                .replace(/\t/g, '    ')
                .replace(/\u00a0/g, ' ')
                .replace(/\u2424/g, '\n');
            return this.token(src, true);
        };
        /**
         * Lexing
         */
        Lexer.prototype.token = function (src, top) {
            src = src.replace(/^ +$/gm, '');
            var next, loose, cap, bull, b, item, space, i, tag, l, isordered, istask, ischecked;
            while (src) {
                // newline
                if (cap = this.rules.newline.exec(src)) {
                    src = src.substring(cap[0].length);
                    if (cap[0].length > 1) {
                        this.tokens.push({
                            type: 'space'
                        });
                    }
                }
                // code
                if (cap = this.rules.code.exec(src)) {
                    src = src.substring(cap[0].length);
                    cap = cap[0].replace(/^ {4}/gm, '');
                    this.tokens.push({
                        type: 'code',
                        text: !this.options.pedantic
                            ? cap.replace(/\n+$/, '')
                            : cap
                    });
                    continue;
                }
                // fences (gfm)
                if (cap = this.rules.fences.exec(src)) {
                    src = src.substring(cap[0].length);
                    this.tokens.push({
                        type: 'code',
                        lang: cap[2],
                        text: cap[3] || ''
                    });
                    continue;
                }
                // heading
                if (cap = this.rules.heading.exec(src)) {
                    src = src.substring(cap[0].length);
                    this.tokens.push({
                        type: 'heading',
                        depth: cap[1].length,
                        text: cap[2]
                    });
                    continue;
                }
                // table no leading pipe (gfm)
                if (top && (cap = this.rules.nptable.exec(src))) {
                    item = {
                        type: 'table',
                        header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
                        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                        cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
                    };
                    if (item.header.length === item.align.length) {
                        src = src.substring(cap[0].length);
                        for (i = 0; i < item.align.length; i++) {
                            if (/^ *-+: *$/.test(item.align[i])) {
                                item.align[i] = 'right';
                            }
                            else if (/^ *:-+: *$/.test(item.align[i])) {
                                item.align[i] = 'center';
                            }
                            else if (/^ *:-+ *$/.test(item.align[i])) {
                                item.align[i] = 'left';
                            }
                            else {
                                item.align[i] = null;
                            }
                        }
                        for (i = 0; i < item.cells.length; i++) {
                            item.cells[i] = splitCells(item.cells[i], item.header.length);
                        }
                        this.tokens.push(item);
                        continue;
                    }
                }
                // hr
                if (cap = this.rules.hr.exec(src)) {
                    src = src.substring(cap[0].length);
                    this.tokens.push({
                        type: 'hr'
                    });
                    continue;
                }
                // blockquote
                if (cap = this.rules.blockquote.exec(src)) {
                    src = src.substring(cap[0].length);
                    this.tokens.push({
                        type: 'blockquote_start'
                    });
                    cap = cap[0].replace(/^ *> ?/gm, '');
                    // Pass `top` to keep the current
                    // "toplevel" state. This is exactly
                    // how markdown.pl works.
                    this.token(cap, top);
                    this.tokens.push({
                        type: 'blockquote_end'
                    });
                    continue;
                }
                // list
                if (cap = this.rules.list.exec(src)) {
                    src = src.substring(cap[0].length);
                    bull = cap[2];
                    isordered = bull.length > 1;
                    this.tokens.push({
                        type: 'list_start',
                        ordered: isordered,
                        start: isordered ? +bull : ''
                    });
                    // Get each top-level item.
                    cap = cap[0].match(this.rules.item);
                    next = false;
                    l = cap.length;
                    i = 0;
                    for (; i < l; i++) {
                        item = cap[i];
                        // Remove the list item's bullet
                        // so it is seen as the next token.
                        space = item.length;
                        item = item.replace(/^ *([*+-]|\d+\.) +/, '');
                        // Outdent whatever the
                        // list item contains. Hacky.
                        if (~item.indexOf('\n ')) {
                            space -= item.length;
                            item = !this.options.pedantic
                                ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
                                : item.replace(/^ {1,4}/gm, '');
                        }
                        // Determine whether the next list item belongs here.
                        // Backpedal if it does not belong in this list.
                        if (this.options.smartLists && i !== l - 1) {
                            b = block.bullet.exec(cap[i + 1])[0];
                            if (bull !== b && !(bull.length > 1 && b.length > 1)) {
                                src = cap.slice(i + 1).join('\n') + src;
                                i = l - 1;
                            }
                        }
                        // Determine whether item is loose or not.
                        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
                        // for discount behavior.
                        loose = next || /\n\n(?!\s*$)/.test(item);
                        if (i !== l - 1) {
                            next = item.charAt(item.length - 1) === '\n';
                            if (!loose)
                                loose = next;
                        }
                        // Check for task list items
                        istask = /^\[[ xX]\] /.test(item);
                        ischecked = undefined;
                        if (istask) {
                            ischecked = item[1] !== ' ';
                            item = item.replace(/^\[[ xX]\] +/, '');
                        }
                        this.tokens.push({
                            type: loose
                                ? 'loose_item_start'
                                : 'list_item_start',
                            task: istask,
                            checked: ischecked
                        });
                        // Recurse.
                        this.token(item, false);
                        this.tokens.push({
                            type: 'list_item_end'
                        });
                    }
                    this.tokens.push({
                        type: 'list_end'
                    });
                    continue;
                }
                // html
                if (cap = this.rules.html.exec(src)) {
                    src = src.substring(cap[0].length);
                    this.tokens.push({
                        type: this.options.sanitize
                            ? 'paragraph'
                            : 'html',
                        pre: !this.options.sanitizer
                            && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
                        text: cap[0]
                    });
                    continue;
                }
                // def
                if (top && (cap = this.rules.def.exec(src))) {
                    src = src.substring(cap[0].length);
                    if (cap[3])
                        cap[3] = cap[3].substring(1, cap[3].length - 1);
                    tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
                    if (!this.tokens.links[tag]) {
                        this.tokens.links[tag] = {
                            href: cap[2],
                            title: cap[3]
                        };
                    }
                    continue;
                }
                // table (gfm)
                if (top && (cap = this.rules.table.exec(src))) {
                    item = {
                        type: 'table',
                        header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
                        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                        cells: cap[3] ? cap[3].replace(/(?: *\| *)?\n$/, '').split('\n') : []
                    };
                    if (item.header.length === item.align.length) {
                        src = src.substring(cap[0].length);
                        for (i = 0; i < item.align.length; i++) {
                            if (/^ *-+: *$/.test(item.align[i])) {
                                item.align[i] = 'right';
                            }
                            else if (/^ *:-+: *$/.test(item.align[i])) {
                                item.align[i] = 'center';
                            }
                            else if (/^ *:-+ *$/.test(item.align[i])) {
                                item.align[i] = 'left';
                            }
                            else {
                                item.align[i] = null;
                            }
                        }
                        for (i = 0; i < item.cells.length; i++) {
                            item.cells[i] = splitCells(item.cells[i].replace(/^ *\| *| *\| *$/g, ''), item.header.length);
                        }
                        this.tokens.push(item);
                        continue;
                    }
                }
                // lheading
                if (cap = this.rules.lheading.exec(src)) {
                    src = src.substring(cap[0].length);
                    this.tokens.push({
                        type: 'heading',
                        depth: cap[2] === '=' ? 1 : 2,
                        text: cap[1]
                    });
                    continue;
                }
                // top-level paragraph
                if (top && (cap = this.rules.paragraph.exec(src))) {
                    src = src.substring(cap[0].length);
                    this.tokens.push({
                        type: 'paragraph',
                        text: cap[1].charAt(cap[1].length - 1) === '\n'
                            ? cap[1].slice(0, -1)
                            : cap[1]
                    });
                    continue;
                }
                // text
                if (cap = this.rules.text.exec(src)) {
                    // Top-level should never reach here.
                    src = src.substring(cap[0].length);
                    this.tokens.push({
                        type: 'text',
                        text: cap[0]
                    });
                    continue;
                }
                if (src) {
                    throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
                }
            }
            return this.tokens;
        };
        /**
         * Inline-Level Grammar
         */
        var inline = {
            escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
            autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
            url: noop,
            tag: '^comment'
                + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
                + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
                + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
                + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
                + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
            link: /^!?\[(label)\]\(href(?:\s+(title))?\s*\)/,
            reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
            nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
            strong: /^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)|^__([^\s])__(?!_)|^\*\*([^\s])\*\*(?!\*)/,
            em: /^_([^\s][\s\S]*?[^\s_])_(?!_)|^_([^\s_][\s\S]*?[^\s])_(?!_)|^\*([^\s][\s\S]*?[^\s*])\*(?!\*)|^\*([^\s*][\s\S]*?[^\s])\*(?!\*)|^_([^\s_])_(?!_)|^\*([^\s*])\*(?!\*)/,
            code: /^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/,
            br: /^ {2,}\n(?!\s*$)/,
            del: noop,
            text: /^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/
        };
        inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
        inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
        inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
        inline.autolink = edit(inline.autolink)
            .replace('scheme', inline._scheme)
            .replace('email', inline._email)
            .getRegex();
        inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
        inline.tag = edit(inline.tag)
            .replace('comment', block._comment)
            .replace('attribute', inline._attribute)
            .getRegex();
        inline._label = /(?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?/;
        inline._href = /\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?)/;
        inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
        inline.link = edit(inline.link)
            .replace('label', inline._label)
            .replace('href', inline._href)
            .replace('title', inline._title)
            .getRegex();
        inline.reflink = edit(inline.reflink)
            .replace('label', inline._label)
            .getRegex();
        /**
         * Normal Inline Grammar
         */
        inline.normal = merge({}, inline);
        /**
         * Pedantic Inline Grammar
         */
        inline.pedantic = merge({}, inline.normal, {
            strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
            em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
            link: edit(/^!?\[(label)\]\((.*?)\)/)
                .replace('label', inline._label)
                .getRegex(),
            reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
                .replace('label', inline._label)
                .getRegex()
        });
        /**
         * GFM Inline Grammar
         */
        inline.gfm = merge({}, inline.normal, {
            escape: edit(inline.escape).replace('])', '~|])').getRegex(),
            url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/)
                .replace('email', inline._email)
                .getRegex(),
            _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
            del: /^~~(?=\S)([\s\S]*?\S)~~/,
            text: edit(inline.text)
                .replace(']|', '~]|')
                .replace('|', '|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&\'*+/=?^_`{\\|}~-]+@|')
                .getRegex()
        });
        /**
         * GFM + Line Breaks Inline Grammar
         */
        inline.breaks = merge({}, inline.gfm, {
            br: edit(inline.br).replace('{2,}', '*').getRegex(),
            text: edit(inline.gfm.text).replace('{2,}', '*').getRegex()
        });
        /**
         * Inline Lexer & Compiler
         */
        function InlineLexer(links, options) {
            this.options = options || marked.defaults;
            this.links = links;
            this.rules = inline.normal;
            this.renderer = this.options.renderer || new Renderer();
            this.renderer.options = this.options;
            if (!this.links) {
                throw new Error('Tokens array requires a `links` property.');
            }
            if (this.options.pedantic) {
                this.rules = inline.pedantic;
            }
            else if (this.options.gfm) {
                if (this.options.breaks) {
                    this.rules = inline.breaks;
                }
                else {
                    this.rules = inline.gfm;
                }
            }
        }
        /**
         * Expose Inline Rules
         */
        InlineLexer.rules = inline;
        /**
         * Static Lexing/Compiling Method
         */
        InlineLexer.output = function (src, links, options) {
            var inline = new InlineLexer(links, options);
            return inline.output(src);
        };
        /**
         * Lexing/Compiling
         */
        InlineLexer.prototype.output = function (src) {
            var out = '', link, text, href, title, cap;
            while (src) {
                // escape
                if (cap = this.rules.escape.exec(src)) {
                    src = src.substring(cap[0].length);
                    out += cap[1];
                    continue;
                }
                // autolink
                if (cap = this.rules.autolink.exec(src)) {
                    src = src.substring(cap[0].length);
                    if (cap[2] === '@') {
                        text = escape(this.mangle(cap[1]));
                        href = 'mailto:' + text;
                    }
                    else {
                        text = escape(cap[1]);
                        href = text;
                    }
                    out += this.renderer.link(href, null, text);
                    continue;
                }
                // url (gfm)
                if (!this.inLink && (cap = this.rules.url.exec(src))) {
                    cap[0] = this.rules._backpedal.exec(cap[0])[0];
                    src = src.substring(cap[0].length);
                    if (cap[2] === '@') {
                        text = escape(cap[0]);
                        href = 'mailto:' + text;
                    }
                    else {
                        text = escape(cap[0]);
                        if (cap[1] === 'www.') {
                            href = 'http://' + text;
                        }
                        else {
                            href = text;
                        }
                    }
                    out += this.renderer.link(href, null, text);
                    continue;
                }
                // tag
                if (cap = this.rules.tag.exec(src)) {
                    if (!this.inLink && /^<a /i.test(cap[0])) {
                        this.inLink = true;
                    }
                    else if (this.inLink && /^<\/a>/i.test(cap[0])) {
                        this.inLink = false;
                    }
                    src = src.substring(cap[0].length);
                    out += this.options.sanitize
                        ? this.options.sanitizer
                            ? this.options.sanitizer(cap[0])
                            : escape(cap[0])
                        : cap[0];
                    continue;
                }
                // link
                if (cap = this.rules.link.exec(src)) {
                    src = src.substring(cap[0].length);
                    this.inLink = true;
                    href = cap[2];
                    if (this.options.pedantic) {
                        link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
                        if (link) {
                            href = link[1];
                            title = link[3];
                        }
                        else {
                            title = '';
                        }
                    }
                    else {
                        title = cap[3] ? cap[3].slice(1, -1) : '';
                    }
                    href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
                    out += this.outputLink(cap, {
                        href: InlineLexer.escapes(href),
                        title: InlineLexer.escapes(title)
                    });
                    this.inLink = false;
                    continue;
                }
                // reflink, nolink
                if ((cap = this.rules.reflink.exec(src))
                    || (cap = this.rules.nolink.exec(src))) {
                    src = src.substring(cap[0].length);
                    link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
                    link = this.links[link.toLowerCase()];
                    if (!link || !link.href) {
                        out += cap[0].charAt(0);
                        src = cap[0].substring(1) + src;
                        continue;
                    }
                    this.inLink = true;
                    out += this.outputLink(cap, link);
                    this.inLink = false;
                    continue;
                }
                // strong
                if (cap = this.rules.strong.exec(src)) {
                    src = src.substring(cap[0].length);
                    out += this.renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
                    continue;
                }
                // em
                if (cap = this.rules.em.exec(src)) {
                    src = src.substring(cap[0].length);
                    out += this.renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
                    continue;
                }
                // code
                if (cap = this.rules.code.exec(src)) {
                    src = src.substring(cap[0].length);
                    out += this.renderer.codespan(escape(cap[2].trim(), true));
                    continue;
                }
                // br
                if (cap = this.rules.br.exec(src)) {
                    src = src.substring(cap[0].length);
                    out += this.renderer.br();
                    continue;
                }
                // del (gfm)
                if (cap = this.rules.del.exec(src)) {
                    src = src.substring(cap[0].length);
                    out += this.renderer.del(this.output(cap[1]));
                    continue;
                }
                // text
                if (cap = this.rules.text.exec(src)) {
                    src = src.substring(cap[0].length);
                    out += this.renderer.text(escape(this.smartypants(cap[0])));
                    continue;
                }
                if (src) {
                    throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
                }
            }
            return out;
        };
        InlineLexer.escapes = function (text) {
            return text ? text.replace(InlineLexer.rules._escapes, '$1') : text;
        };
        /**
         * Compile Link
         */
        InlineLexer.prototype.outputLink = function (cap, link) {
            var href = link.href, title = link.title ? escape(link.title) : null;
            return cap[0].charAt(0) !== '!'
                ? this.renderer.link(href, title, this.output(cap[1]))
                : this.renderer.image(href, title, escape(cap[1]));
        };
        /**
         * Smartypants Transformations
         */
        InlineLexer.prototype.smartypants = function (text) {
            if (!this.options.smartypants)
                return text;
            return text
                // em-dashes
                .replace(/---/g, '\u2014')
                // en-dashes
                .replace(/--/g, '\u2013')
                // opening singles
                .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
                // closing singles & apostrophes
                .replace(/'/g, '\u2019')
                // opening doubles
                .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
                // closing doubles
                .replace(/"/g, '\u201d')
                // ellipses
                .replace(/\.{3}/g, '\u2026');
        };
        /**
         * Mangle Links
         */
        InlineLexer.prototype.mangle = function (text) {
            if (!this.options.mangle)
                return text;
            var out = '', l = text.length, i = 0, ch;
            for (; i < l; i++) {
                ch = text.charCodeAt(i);
                if (Math.random() > 0.5) {
                    ch = 'x' + ch.toString(16);
                }
                out += '&#' + ch + ';';
            }
            return out;
        };
        /**
         * Renderer
         */
        function Renderer(options) {
            this.options = options || marked.defaults;
        }
        Renderer.prototype.code = function (code, lang, escaped) {
            if (this.options.highlight) {
                var out = this.options.highlight(code, lang);
                if (out != null && out !== code) {
                    escaped = true;
                    code = out;
                }
            }
            if (!lang) {
                return '<pre><code>'
                    + (escaped ? code : escape(code, true))
                    + '</code></pre>';
            }
            return '<pre><code class="'
                + this.options.langPrefix
                + escape(lang, true)
                + '">'
                + (escaped ? code : escape(code, true))
                + '</code></pre>\n';
        };
        Renderer.prototype.blockquote = function (quote) {
            return '<blockquote>\n' + quote + '</blockquote>\n';
        };
        Renderer.prototype.html = function (html) {
            return html;
        };
        Renderer.prototype.heading = function (text, level, raw) {
            if (this.options.headerIds) {
                return '<h'
                    + level
                    + ' id="'
                    + this.options.headerPrefix
                    + raw.toLowerCase().replace(/[^\w]+/g, '-')
                    + '">'
                    + text
                    + '</h'
                    + level
                    + '>\n';
            }
            // ignore IDs
            return '<h' + level + '>' + text + '</h' + level + '>\n';
        };
        Renderer.prototype.hr = function () {
            return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
        };
        Renderer.prototype.list = function (body, ordered, start) {
            var type = ordered ? 'ol' : 'ul', startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
            return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
        };
        Renderer.prototype.listitem = function (text) {
            return '<li>' + text + '</li>\n';
        };
        Renderer.prototype.checkbox = function (checked) {
            return '<input '
                + (checked ? 'checked="" ' : '')
                + 'disabled="" type="checkbox"'
                + (this.options.xhtml ? ' /' : '')
                + '> ';
        };
        Renderer.prototype.paragraph = function (text) {
            return '<p>' + text + '</p>\n';
        };
        Renderer.prototype.table = function (header, body) {
            if (body)
                body = '<tbody>' + body + '</tbody>';
            return '<table>\n'
                + '<thead>\n'
                + header
                + '</thead>\n'
                + body
                + '</table>\n';
        };
        Renderer.prototype.tablerow = function (content) {
            return '<tr>\n' + content + '</tr>\n';
        };
        Renderer.prototype.tablecell = function (content, flags) {
            var type = flags.header ? 'th' : 'td';
            var tag = flags.align
                ? '<' + type + ' align="' + flags.align + '">'
                : '<' + type + '>';
            return tag + content + '</' + type + '>\n';
        };
        // span level renderer
        Renderer.prototype.strong = function (text) {
            return '<strong>' + text + '</strong>';
        };
        Renderer.prototype.em = function (text) {
            return '<em>' + text + '</em>';
        };
        Renderer.prototype.codespan = function (text) {
            return '<code>' + text + '</code>';
        };
        Renderer.prototype.br = function () {
            return this.options.xhtml ? '<br/>' : '<br>';
        };
        Renderer.prototype.del = function (text) {
            return '<del>' + text + '</del>';
        };
        Renderer.prototype.link = function (href, title, text) {
            if (this.options.sanitize) {
                try {
                    var prot = decodeURIComponent(unescape(href))
                        .replace(/[^\w:]/g, '')
                        .toLowerCase();
                }
                catch (e) {
                    return text;
                }
                if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
                    return text;
                }
            }
            if (this.options.baseUrl && !originIndependentUrl.test(href)) {
                href = resolveUrl(this.options.baseUrl, href);
            }
            try {
                href = encodeURI(href).replace(/%25/g, '%');
            }
            catch (e) {
                return text;
            }
            var out = '<a href="' + escape(href) + '"';
            if (title) {
                out += ' title="' + title + '"';
            }
            out += '>' + text + '</a>';
            return out;
        };
        Renderer.prototype.image = function (href, title, text) {
            if (this.options.baseUrl && !originIndependentUrl.test(href)) {
                href = resolveUrl(this.options.baseUrl, href);
            }
            var out = '<img src="' + href + '" alt="' + text + '"';
            if (title) {
                out += ' title="' + title + '"';
            }
            out += this.options.xhtml ? '/>' : '>';
            return out;
        };
        Renderer.prototype.text = function (text) {
            return text;
        };
        /**
         * TextRenderer
         * returns only the textual part of the token
         */
        function TextRenderer() { }
        // no need for block level renderers
        TextRenderer.prototype.strong =
            TextRenderer.prototype.em =
                TextRenderer.prototype.codespan =
                    TextRenderer.prototype.del =
                        TextRenderer.prototype.text = function (text) {
                            return text;
                        };
        TextRenderer.prototype.link =
            TextRenderer.prototype.image = function (href, title, text) {
                return '' + text;
            };
        TextRenderer.prototype.br = function () {
            return '';
        };
        /**
         * Parsing & Compiling
         */
        function Parser(options) {
            this.tokens = [];
            this.token = null;
            this.options = options || marked.defaults;
            this.options.renderer = this.options.renderer || new Renderer();
            this.renderer = this.options.renderer;
            this.renderer.options = this.options;
        }
        /**
         * Static Parse Method
         */
        Parser.parse = function (src, options) {
            var parser = new Parser(options);
            return parser.parse(src);
        };
        /**
         * Parse Loop
         */
        Parser.prototype.parse = function (src) {
            this.inline = new InlineLexer(src.links, this.options);
            // use an InlineLexer with a TextRenderer to extract pure text
            this.inlineText = new InlineLexer(src.links, merge({}, this.options, { renderer: new TextRenderer() }));
            this.tokens = src.reverse();
            var out = '';
            while (this.next()) {
                out += this.tok();
            }
            return out;
        };
        /**
         * Next Token
         */
        Parser.prototype.next = function () {
            return this.token = this.tokens.pop();
        };
        /**
         * Preview Next Token
         */
        Parser.prototype.peek = function () {
            return this.tokens[this.tokens.length - 1] || 0;
        };
        /**
         * Parse Text Tokens
         */
        Parser.prototype.parseText = function () {
            var body = this.token.text;
            while (this.peek().type === 'text') {
                body += '\n' + this.next().text;
            }
            return this.inline.output(body);
        };
        /**
         * Parse Current Token
         */
        Parser.prototype.tok = function () {
            switch (this.token.type) {
                case 'space': {
                    return '';
                }
                case 'hr': {
                    return this.renderer.hr();
                }
                case 'heading': {
                    return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, unescape(this.inlineText.output(this.token.text)));
                }
                case 'code': {
                    return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
                }
                case 'table': {
                    var header = '', body = '', i, row, cell, j;
                    // header
                    cell = '';
                    for (i = 0; i < this.token.header.length; i++) {
                        cell += this.renderer.tablecell(this.inline.output(this.token.header[i]), { header: true, align: this.token.align[i] });
                    }
                    header += this.renderer.tablerow(cell);
                    for (i = 0; i < this.token.cells.length; i++) {
                        row = this.token.cells[i];
                        cell = '';
                        for (j = 0; j < row.length; j++) {
                            cell += this.renderer.tablecell(this.inline.output(row[j]), { header: false, align: this.token.align[j] });
                        }
                        body += this.renderer.tablerow(cell);
                    }
                    return this.renderer.table(header, body);
                }
                case 'blockquote_start': {
                    body = '';
                    while (this.next().type !== 'blockquote_end') {
                        body += this.tok();
                    }
                    return this.renderer.blockquote(body);
                }
                case 'list_start': {
                    body = '';
                    var ordered = this.token.ordered, start = this.token.start;
                    while (this.next().type !== 'list_end') {
                        body += this.tok();
                    }
                    return this.renderer.list(body, ordered, start);
                }
                case 'list_item_start': {
                    body = '';
                    if (this.token.task) {
                        body += this.renderer.checkbox(this.token.checked);
                    }
                    while (this.next().type !== 'list_item_end') {
                        body += this.token.type === 'text'
                            ? this.parseText()
                            : this.tok();
                    }
                    return this.renderer.listitem(body);
                }
                case 'loose_item_start': {
                    body = '';
                    while (this.next().type !== 'list_item_end') {
                        body += this.tok();
                    }
                    return this.renderer.listitem(body);
                }
                case 'html': {
                    // TODO parse inline content if parameter markdown=1
                    return this.renderer.html(this.token.text);
                }
                case 'paragraph': {
                    return this.renderer.paragraph(this.inline.output(this.token.text));
                }
                case 'text': {
                    return this.renderer.paragraph(this.parseText());
                }
            }
        };
        /**
         * Helpers
         */
        function escape(html, encode) {
            return html
                .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }
        function unescape(html) {
            // explicitly match decimal, hex, and named HTML entities
            return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function (_, n) {
                n = n.toLowerCase();
                if (n === 'colon')
                    return ':';
                if (n.charAt(0) === '#') {
                    return n.charAt(1) === 'x'
                        ? String.fromCharCode(parseInt(n.substring(2), 16))
                        : String.fromCharCode(+n.substring(1));
                }
                return '';
            });
        }
        function edit(regex, opt) {
            regex = regex.source || regex;
            opt = opt || '';
            return {
                replace: function (name, val) {
                    val = val.source || val;
                    val = val.replace(/(^|[^\[])\^/g, '$1');
                    regex = regex.replace(name, val);
                    return this;
                },
                getRegex: function () {
                    return new RegExp(regex, opt);
                }
            };
        }
        function resolveUrl(base, href) {
            if (!baseUrls[' ' + base]) {
                // we can ignore everything in base after the last slash of its path component,
                // but we might need to add _that_
                // https://tools.ietf.org/html/rfc3986#section-3
                if (/^[^:]+:\/*[^/]*$/.test(base)) {
                    baseUrls[' ' + base] = base + '/';
                }
                else {
                    baseUrls[' ' + base] = base.replace(/[^/]*$/, '');
                }
            }
            base = baseUrls[' ' + base];
            if (href.slice(0, 2) === '//') {
                return base.replace(/:[\s\S]*/, ':') + href;
            }
            else if (href.charAt(0) === '/') {
                return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
            }
            else {
                return base + href;
            }
        }
        var baseUrls = {};
        var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
        function noop() { }
        noop.exec = noop;
        function merge(obj) {
            var i = 1, target, key;
            for (; i < arguments.length; i++) {
                target = arguments[i];
                for (key in target) {
                    if (Object.prototype.hasOwnProperty.call(target, key)) {
                        obj[key] = target[key];
                    }
                }
            }
            return obj;
        }
        function splitCells(tableRow, count) {
            var cells = tableRow.replace(/([^\\])\|/g, '$1 |').split(/ +\| */), i = 0;
            if (cells.length > count) {
                cells.splice(count);
            }
            else {
                while (cells.length < count)
                    cells.push('');
            }
            for (; i < cells.length; i++) {
                cells[i] = cells[i].replace(/\\\|/g, '|');
            }
            return cells;
        }
        /**
         * Marked
         */
        function marked(src, opt, callback) {
            // throw error in case of non string input
            if (typeof src === 'undefined' || src === null) {
                throw new Error('marked(): input parameter is undefined or null');
            }
            if (typeof src !== 'string') {
                throw new Error('marked(): input parameter is of type '
                    + Object.prototype.toString.call(src) + ', string expected');
            }
            if (callback || typeof opt === 'function') {
                if (!callback) {
                    callback = opt;
                    opt = null;
                }
                opt = merge({}, marked.defaults, opt || {});
                var highlight = opt.highlight, tokens, pending, i = 0;
                try {
                    tokens = Lexer.lex(src, opt);
                }
                catch (e) {
                    return callback(e);
                }
                pending = tokens.length;
                var done = function (err) {
                    if (err) {
                        opt.highlight = highlight;
                        return callback(err);
                    }
                    var out;
                    try {
                        out = Parser.parse(tokens, opt);
                    }
                    catch (e) {
                        err = e;
                    }
                    opt.highlight = highlight;
                    return err
                        ? callback(err)
                        : callback(null, out);
                };
                if (!highlight || highlight.length < 3) {
                    return done();
                }
                delete opt.highlight;
                if (!pending)
                    return done();
                for (; i < tokens.length; i++) {
                    (function (token) {
                        if (token.type !== 'code') {
                            return --pending || done();
                        }
                        return highlight(token.text, token.lang, function (err, code) {
                            if (err)
                                return done(err);
                            if (code == null || code === token.text) {
                                return --pending || done();
                            }
                            token.text = code;
                            token.escaped = true;
                            --pending || done();
                        });
                    })(tokens[i]);
                }
                return;
            }
            try {
                if (opt)
                    opt = merge({}, marked.defaults, opt);
                return Parser.parse(Lexer.lex(src, opt), opt);
            }
            catch (e) {
                e.message += '\nPlease report this to https://github.com/markedjs/marked.';
                if ((opt || marked.defaults).silent) {
                    return '<p>An error occurred:</p><pre>'
                        + escape(e.message + '', true)
                        + '</pre>';
                }
                throw e;
            }
        }
        /**
         * Options
         */
        marked.options =
            marked.setOptions = function (opt) {
                merge(marked.defaults, opt);
                return marked;
            };
        marked.getDefaults = function () {
            return {
                baseUrl: null,
                breaks: false,
                gfm: true,
                headerIds: true,
                headerPrefix: '',
                highlight: null,
                langPrefix: 'language-',
                mangle: true,
                pedantic: false,
                renderer: new Renderer(),
                sanitize: false,
                sanitizer: null,
                silent: false,
                smartLists: false,
                smartypants: false,
                tables: true,
                xhtml: false
            };
        };
        marked.defaults = marked.getDefaults();
        /**
         * Expose
         */
        marked.Parser = Parser;
        marked.parser = Parser.parse;
        marked.Renderer = Renderer;
        marked.TextRenderer = TextRenderer;
        marked.Lexer = Lexer;
        marked.lexer = Lexer.lex;
        marked.InlineLexer = InlineLexer;
        marked.inlineLexer = InlineLexer.output;
        marked.parse = marked;
        {
            module.exports = marked;
        }
    })(commonjsGlobal || (typeof window !== 'undefined' ? window : commonjsGlobal));
});
var TextComponent = /** @class */ (function () {
    function TextComponent() {
        this.ishidden = false;
        this.ismarkdown = false;
    }
    TextComponent.prototype.render = function () {
        var regex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;
        var textStyle = css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n      font-family: ", ";\n      font-size: ", ";\n      font-weight: ", ";\n      text-align: ", ";\n      color: ", ";\n      padding-top: ", ";\n      padding-bottom: ", ";\n      padding: ", ";\n      overflow-wrap: break-word;\n    "], ["\n      font-family: ", ";\n      font-size: ", ";\n      font-weight: ", ";\n      text-align: ", ";\n      color: ", ";\n      padding-top: ", ";\n      padding-bottom: ", ";\n      padding: ", ";\n      overflow-wrap: break-word;\n    "])), this.fontfamily || 'inherit', this.fontsize ? this.fontsize + 'px' : 'inherit', this.fontweight ? this.fontweight : 'inherit', this.textalign, this.color || 'inherit', this.paddingtop ? this.paddingtop + 'px' : 'inherit', this.paddingbottom ? this.paddingbottom + 'px' : 'inherit', this.padding ? this.padding : '');
        var divStyle = css(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n      background: ", ";\n      height: ", ";\n      background-size: contain;\n    "], ["\n      background: ", ";\n      height: ", ";\n      background-size: contain;\n    "])), this.background ? this.background.match(regex) ? "url(" + this.background + ") no-repeat center center;" : this.background : 'inherit', this.height || 'inherit');
        var content = this.ismarkdown
            ? h("div", { innerHTML: marked(this.text) })
            : this.text;
        return !this.ishidden &&
            h("div", { class: divStyle }, h("p", { class: textStyle }, content));
    };
    Object.defineProperty(TextComponent, "is", {
        get: function () { return "sqh-text-component"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextComponent, "properties", {
        get: function () {
            return {
                "background": {
                    "type": String,
                    "attr": "background"
                },
                "color": {
                    "type": String,
                    "attr": "color"
                },
                "fontfamily": {
                    "type": String,
                    "attr": "fontfamily"
                },
                "fontsize": {
                    "type": String,
                    "attr": "fontsize"
                },
                "fontweight": {
                    "type": String,
                    "attr": "fontweight"
                },
                "height": {
                    "type": String,
                    "attr": "height"
                },
                "ishidden": {
                    "type": Boolean,
                    "attr": "ishidden"
                },
                "ismarkdown": {
                    "type": Boolean,
                    "attr": "ismarkdown"
                },
                "padding": {
                    "type": String,
                    "attr": "padding"
                },
                "paddingbottom": {
                    "type": String,
                    "attr": "paddingbottom"
                },
                "paddingtop": {
                    "type": String,
                    "attr": "paddingtop"
                },
                "text": {
                    "type": String,
                    "attr": "text"
                },
                "textalign": {
                    "type": String,
                    "attr": "textalign"
                },
                "textEl": {
                    "elementRef": true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextComponent, "style", {
        get: function () { return "sqh-text-component {\n  display: block; }\n  sqh-text-component p {\n    margin: 0; }"; },
        enumerable: true,
        configurable: true
    });
    return TextComponent;
}());
export { ProgressIndicator as SqhProgressIndicator, TextComponent as SqhTextComponent };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
