var commonjsGlobal = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
function unwrapExports(e) { return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e; }
function createCommonjsModule(e, r) { return e(r = { exports: {} }, r.exports), r.exports; }
var global$1 = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};
function defaultSetTimout() { throw new Error("setTimeout has not been defined"); }
function defaultClearTimeout() { throw new Error("clearTimeout has not been defined"); }
var cachedSetTimeout = defaultSetTimout, cachedClearTimeout = defaultClearTimeout;
function runTimeout(e) { if (cachedSetTimeout === setTimeout)
    return setTimeout(e, 0); if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout)
    return cachedSetTimeout = setTimeout, setTimeout(e, 0); try {
    return cachedSetTimeout(e, 0);
}
catch (r) {
    try {
        return cachedSetTimeout.call(null, e, 0);
    }
    catch (r) {
        return cachedSetTimeout.call(this, e, 0);
    }
} }
function runClearTimeout(e) { if (cachedClearTimeout === clearTimeout)
    return clearTimeout(e); if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout)
    return cachedClearTimeout = clearTimeout, clearTimeout(e); try {
    return cachedClearTimeout(e);
}
catch (r) {
    try {
        return cachedClearTimeout.call(null, e);
    }
    catch (r) {
        return cachedClearTimeout.call(this, e);
    }
} }
"function" == typeof global$1.setTimeout && (cachedSetTimeout = setTimeout), "function" == typeof global$1.clearTimeout && (cachedClearTimeout = clearTimeout);
var currentQueue, queue = [], draining = !1, queueIndex = -1;
function cleanUpNextTick() { draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue()); }
function drainQueue() { if (!draining) {
    var e = runTimeout(cleanUpNextTick);
    draining = !0;
    for (var r = queue.length; r;) {
        for (currentQueue = queue, queue = []; ++queueIndex < r;)
            currentQueue && currentQueue[queueIndex].run();
        queueIndex = -1, r = queue.length;
    }
    currentQueue = null, draining = !1, runClearTimeout(e);
} }
function nextTick(e) { var r = new Array(arguments.length - 1); if (arguments.length > 1)
    for (var t = 1; t < arguments.length; t++)
        r[t - 1] = arguments[t]; queue.push(new Item(e, r)), 1 !== queue.length || draining || runTimeout(drainQueue); }
function Item(e, r) { this.fun = e, this.array = r; }
Item.prototype.run = function () { this.fun.apply(null, this.array); };
var title = "browser", platform = "browser", browser = !0, env = {}, argv = [], version = "", versions = {}, release = {}, config = {};
function noop() { }
var on = noop, addListener = noop, once = noop, off = noop, removeListener = noop, removeAllListeners = noop, emit = noop;
function binding(e) { throw new Error("process.binding is not supported"); }
function cwd() { return "/"; }
function chdir(e) { throw new Error("process.chdir is not supported"); }
function umask() { return 0; }
var performance = global$1.performance || {}, performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () { return (new Date).getTime(); };
function hrtime(e) { var r = .001 * performanceNow.call(performance), t = Math.floor(r), n = Math.floor(r % 1 * 1e9); return e && (t -= e[0], (n -= e[1]) < 0 && (t--, n += 1e9)), [t, n]; }
var startTime = new Date;
function uptime() { return (new Date - startTime) / 1e3; }
var process = { nextTick: nextTick, title: title, browser: browser, env: env, argv: argv, version: version, versions: versions, on: on, addListener: addListener, once: once, off: off, removeListener: removeListener, removeAllListeners: removeAllListeners, emit: emit, binding: binding, cwd: cwd, chdir: chdir, umask: umask, hrtime: hrtime, platform: platform, release: release, config: config, uptime: uptime };
export { commonjsGlobal as a, unwrapExports as b, createCommonjsModule as c, process as d, global$1 as e };
