/*!
 * WidgetComponents: Core, ES5
 * Built with http://stenciljs.com
 */
this && this.__extends || function() {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(d, b) {
    d.__proto__ = b;
  } || function(d, b) {
    for (var p in b) {
      b.hasOwnProperty(p) && (d[p] = b[p]);
    }
  };
}();

var appGlobal = function() {};

function applyPolyfills(window, cb) {
  /*!
    es6-promise - a tiny implementation of Promises/A+.
    Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
    Licensed under MIT license
    See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
    v4.2.4+314e4831
    */
  window.ES6Promise = function() {
    function t() {
      var t = setTimeout;
      return function() {
        return t(r, 1);
      };
    }
    function r() {
      for (var t = 0; t < y; t += 2) {
        (0, C[t])(C[t + 1]), C[t] = void 0, C[t + 1] = void 0;
      }
      y = 0;
    }
    function e(t, r) {
      var e = this, n = new this.constructor(o);
      void 0 === n[O] && _(n);
      var i = e._state;
      if (i) {
        var s = arguments[i - 1];
        g(function() {
          return v(i, n, s, e._result);
        });
      } else {
        l(e, n, t, r);
      }
      return n;
    }
    function n(t) {
      if (t && 'object' == typeof t && t.constructor === this) {
        return t;
      }
      var r = new this(o);
      return u(r, t), r;
    }
    function o() {}
    function i(t) {
      try {
        return t.then;
      } catch (t) {
        return q.error = t, q;
      }
    }
    function s(t, r, o) {
      r.constructor === t.constructor && o === e && r.constructor.resolve === n ? function(t, r) {
        r._state === x ? a(t, r._result) : r._state === F ? f(t, r._result) : l(r, void 0, function(r) {
          return u(t, r);
        }, function(r) {
          return f(t, r);
        });
      }(t, r) : o === q ? (f(t, q.error), q.error = null) : void 0 === o ? a(t, r) : 'function' == typeof o ? function(t, r, e) {
        g(function(t) {
          var n = !1, o = function(t, r, e, n) {
            try {
              t.call(r, e, n);
            } catch (t) {
              return t;
            }
          }(e, r, function(e) {
            n || (n = !0, r !== e ? u(t, e) : a(t, e));
          }, function(r) {
            n || (n = !0, f(t, r));
          }, t._label);
          !n && o && (n = !0, f(t, o));
        }, t);
      }(t, r, o) : a(t, r);
    }
    function u(t, r) {
      if (t === r) {
        f(t, new TypeError('cannot resolve promise w/ itself'));
      } else {
        var e = typeof r;
        null === r || 'object' !== e && 'function' !== e ? a(t, r) : s(t, r, i(r));
      }
    }
    function c(t) {
      t._onerror && t._onerror(t._result), h(t);
    }
    function a(t, r) {
      t._state === P && (t._result = r, t._state = x, 0 !== t._subscribers.length && g(h, t));
    }
    function f(t, r) {
      t._state === P && (t._state = F, t._result = r, g(c, t));
    }
    function l(t, r, e, n) {
      var o = t._subscribers, i = o.length;
      t._onerror = null, o[i] = r, o[i + x] = e, o[i + F] = n, 0 === i && t._state && g(h, t);
    }
    function h(t) {
      var r = t._subscribers, e = t._state;
      if (0 !== r.length) {
        for (var n, o, i = t._result, s = 0; s < r.length; s += 3) {
          n = r[s], o = r[s + e], n ? v(e, n, o, i) : o(i);
        }
        t._subscribers.length = 0;
      }
    }
    function v(t, r, e, n) {
      var o = 'function' == typeof e, i = void 0, s = void 0, c = void 0, l = void 0;
      if (o) {
        try {
          i = e(n);
        } catch (t) {
          q.error = t, i = q;
        }
        if (i === q ? (l = !0, s = i.error, i.error = null) : c = !0, r === i) {
          return void f(r, new TypeError('Cannot return same promise'));
        }
      } else {
        i = n, c = !0;
      }
      r._state === P && (o && c ? u(r, i) : l ? f(r, s) : t === x ? a(r, i) : t === F && f(r, i));
    }
    function _(t) {
      t[O] = U++, t._state = void 0, t._result = void 0, t._subscribers = [];
    }
    var p, d = Array.isArray ? Array.isArray : function(t) {
      return '[object Array]' === Object.prototype.toString.call(t);
    }, y = 0, w = void 0, m = void 0, g = function(t, e) {
      C[y] = t, C[y + 1] = e, 2 === (y += 2) && (m ? m(r) : T());
    }, b = (p = 'undefined' != typeof window ? window : void 0) || {}, A = b.MutationObserver || b.WebKitMutationObserver;
    b = 'undefined' == typeof self;
    var E, S, M, j = 'undefined' != typeof Uint8ClampedArray && 'undefined' != typeof importScripts && 'undefined' != typeof MessageChannel, C = Array(1e3), T = void 0;
    T = A ? (E = 0, S = new A(r), M = document.createTextNode(''), S.observe(M, {
      characterData: !0
    }), function() {
      M.data = E = ++E % 2;
    }) : j ? function() {
      var t = new MessageChannel();
      return t.port1.onmessage = r, function() {
        return t.port2.postMessage(0);
      };
    }() : void 0 === p && 'function' == typeof require ? function() {
      try {
        var e = Function('return this')().require('vertx');
        return void 0 !== (w = e.runOnLoop || e.runOnContext) ? function() {
          w(r);
        } : t();
      } catch (r) {
        return t();
      }
    }() : t();
    var O = Math.random().toString(36).substring(2), P = void 0, x = 1, F = 2, q = {
      error: null
    }, U = 0, D = function() {
      function t(t, r) {
        this._instanceConstructor = t, this.promise = new t(o), this.promise[O] || _(this.promise), 
        d(r) ? (this._remaining = this.length = r.length, this._result = Array(this.length), 
        0 === this.length ? a(this.promise, this._result) : (this.length = this.length || 0, 
        this._enumerate(r), 0 === this._remaining && a(this.promise, this._result))) : f(this.promise, Error('Array Methods must be provided an Array'));
      }
      return t.prototype._enumerate = function(t) {
        for (var r = 0; this._state === P && r < t.length; r++) {
          this._eachEntry(t[r], r);
        }
      }, t.prototype._eachEntry = function(t, r) {
        var u = this._instanceConstructor, c = u.resolve;
        c === n ? (c = i(t)) === e && t._state !== P ? this._settledAt(t._state, r, t._result) : 'function' != typeof c ? (this._remaining--, 
        this._result[r] = t) : u === K ? (s(u = new u(o), t, c), this._willSettleAt(u, r)) : this._willSettleAt(new u(function(r) {
          return r(t);
        }), r) : this._willSettleAt(c(t), r);
      }, t.prototype._settledAt = function(t, r, e) {
        var n = this.promise;
        n._state === P && (this._remaining--, t === F ? f(n, e) : this._result[r] = e), 
        0 === this._remaining && a(n, this._result);
      }, t.prototype._willSettleAt = function(t, r) {
        var e = this;
        l(t, void 0, function(t) {
          return e._settledAt(x, r, t);
        }, function(t) {
          return e._settledAt(F, r, t);
        });
      }, t;
    }(), K = function() {
      function t(r) {
        if (this[O] = U++, this._result = this._state = void 0, this._subscribers = [], 
        o !== r) {
          if ('function' != typeof r) {
            throw new TypeError('Must pass a resolver fn as 1st arg');
          }
          if (!(this instanceof t)) {
            throw new TypeError('Failed to construct \'Promise\': Use the \'new\' operator.');
          }
          !function(t, r) {
            try {
              r(function(r) {
                u(t, r);
              }, function(r) {
                f(t, r);
              });
            } catch (r) {
              f(t, r);
            }
          }(this, r);
        }
      }
      return t.prototype.catch = function(t) {
        return this.then(null, t);
      }, t.prototype.finally = function(t) {
        var r = this.constructor;
        return this.then(function(e) {
          return r.resolve(t()).then(function() {
            return e;
          });
        }, function(e) {
          return r.resolve(t()).then(function() {
            throw e;
          });
        });
      }, t;
    }();
    return K.prototype.then = e, K.all = function(t) {
      return new D(this, t).promise;
    }, K.race = function(t) {
      var r = this;
      return d(t) ? new r(function(e, n) {
        for (var o = t.length, i = 0; i < o; i++) {
          r.resolve(t[i]).then(e, n);
        }
      }) : new r(function(t, r) {
        return r(new TypeError('Must pass array to race'));
      });
    }, K.resolve = n, K.reject = function(t) {
      var r = new this(o);
      return f(r, t), r;
    }, K._setScheduler = function(t) {
      m = t;
    }, K._setAsap = function(t) {
      g = t;
    }, K._asap = g, K.polyfill = function() {
      var t = void 0;
      if ('undefined' != typeof global) {
        t = global;
      } else if ('undefined' != typeof self) {
        t = self;
      } else {
        try {
          t = Function('return this')();
        } catch (t) {
          throw Error('polyfill failed');
        }
      }
      var r = t.Promise;
      if (r) {
        var e = null;
        try {
          e = Object.prototype.toString.call(r.resolve());
        } catch (t) {}
        if ('[object Promise]' === e && !r.cast) {
          return;
        }
      }
      t.Promise = K;
    }, K.Promise = K, K.polyfill(), K;
  }();
  var promises = [];
  window.customElements && (!window.Element || window.Element.prototype.closest && window.Element.prototype.matches && window.Element.prototype.remove) || promises.push(import('./polyfills/dom.js'));
  'function' === typeof Object.assign && Object.entries || promises.push(import('./polyfills/object.js'));
  Array.prototype.find && Array.prototype.includes || promises.push(import('./polyfills/array.js'));
  String.prototype.startsWith && String.prototype.endsWith || promises.push(import('./polyfills/string.js'));
  window.fetch || promises.push(import('./polyfills/fetch.js'));
  Promise.all(promises).then(function(results) {
    results.forEach(function(polyfillModule) {
      polyfillModule.applyPolyfill(window, window.document);
    });
    cb();
  });
};

function createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype) {
  (win['s-apps'] = win['s-apps'] || []).push(namespace);
  HTMLElementPrototype.componentOnReady || (HTMLElementPrototype.componentOnReady = function componentOnReady() {
    /*tslint:disable*/
    var elm = this;
    function executor(resolve) {
      if (elm.nodeName.indexOf('-') > 0) {
        // window hasn't loaded yet and there's a
        // good chance this is a custom element
        var apps = win['s-apps'];
        var appsReady = 0;
        // loop through all the app namespaces
                for (var i = 0; i < apps.length; i++) {
          // see if this app has "componentOnReady" setup
          if (win[apps[i]].componentOnReady) {
            // this app's core has loaded call its "componentOnReady"
            if (win[apps[i]].componentOnReady(elm, resolve)) {
              // this component does belong to this app and would
              // have fired off the resolve fn
              // let's stop here, we're good
              return;
            }
            appsReady++;
          }
        }
        if (appsReady < apps.length) {
          // not all apps are ready yet
          // add it to the queue to be figured out when they are
          (win['s-cr'] = win['s-cr'] || []).push([ elm, resolve ]);
          return;
        }
      }
      // not a recognized app component
            resolve(null);
    }
    // callback wasn't provided, let's return a promise
        if (win.Promise) {
      // use native/polyfilled promise
      return new win.Promise(executor);
    }
    // promise may not have been polyfilled yet
        return {
      then: executor
    };
  });
}

/**
 * SSR Attribute Names
 */
var SSR_VNODE_ID = 'data-ssrv';

var SSR_CHILD_ID = 'data-ssrc';

/**
 * Default style mode id
 */ var DEFAULT_STYLE_MODE = '$';

/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */ var EMPTY_OBJ = {};

var EMPTY_ARR = [];

/**
 * Key Name to Key Code Map
 */ var KEY_CODE_MAP = {
  'enter': 13,
  'escape': 27,
  'space': 32,
  'tab': 9,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40
};

function getScopeId(cmpMeta, mode) {
  var id = 'data-' + cmpMeta.tagNameMeta;
  if (mode && mode !== DEFAULT_STYLE_MODE) {
    return id + '-' + mode;
  }
  return id;
}

function getHostScopeAttribute(scopeId) {
  return scopeId + '-host';
}

function getSlotScopeAttribute(scopeId) {
  return scopeId + '-slot';
}

function initStyleTemplate(domApi, cmpMeta, cmpConstructor) {
  var style = cmpConstructor.style;
  if (style) {
    // we got a style mode for this component, let's create an id for this style
    var styleModeId = cmpConstructor.is + (cmpConstructor.styleMode || DEFAULT_STYLE_MODE);
    if (!cmpMeta[styleModeId]) {
      true;
      // ie11's template polyfill doesn't fully do the trick and there's still issues
      // so instead of trying to clone templates with styles in them, we'll just
      // keep a map of the style text as a string to create <style> elements for es5 builds
      cmpMeta[styleModeId] = style;
    }
  }
}

function attachStyles(plt, domApi, cmpMeta, hostElm) {
  // first see if we've got a style for a specific mode
  var modeName = cmpMeta.componentConstructor.styleMode;
  var encapsulation = cmpMeta.encapsulation;
  (2 /* ScopedCss */ === encapsulation || 1 /* ShadowDom */ === encapsulation && !plt.domApi.$supportsShadowDom) && (
  // either this host element should use scoped css
  // or it wants to use shadow dom but the browser doesn't support it
  // create a scope id which is useful for scoped css
  // and add the scope attribute to the host
  hostElm['s-sc'] = getScopeId(cmpMeta, modeName));
  var styleModeId = cmpMeta.tagNameMeta + (modeName || DEFAULT_STYLE_MODE);
  var styleTemplate = cmpMeta[styleModeId];
  if (styleTemplate) {
    // cool, we found a style template element for this component
    var styleContainerNode = domApi.$head;
    // if this browser supports shadow dom, then let's climb up
    // the dom and see if we're within a shadow dom
        if (domApi.$supportsShadowDom) {
      if (1 /* ShadowDom */ === encapsulation) {
        // we already know we're in a shadow dom
        // so shadow root is the container for these styles
        styleContainerNode = hostElm.shadowRoot;
      } else {
        // climb up the dom and see if we're in a shadow dom
        var root = hostElm;
        while (root = domApi.$parentNode(root)) {
          if (root.host && root.host.shadowRoot) {
            // looks like we are in shadow dom, let's use
            // this shadow root as the container for these styles
            styleContainerNode = root.host.shadowRoot;
            break;
          }
        }
      }
    }
    // if this container element already has these styles
    // then there's no need to apply them again
    // create an object to keep track if we'ready applied this component style
        var appliedStyles = plt.componentAppliedStyles.get(styleContainerNode);
    appliedStyles || plt.componentAppliedStyles.set(styleContainerNode, appliedStyles = {});
    // check if we haven't applied these styles to this container yet
        if (!appliedStyles[styleModeId]) {
      var styleElm = void 0;
      true;
      // es5 builds are not usig <template> because of ie11 issues
      // instead the "template" is just the style text as a string
      // create a new style element and add as innerHTML
      if (plt.customStyle) {
        styleElm = plt.customStyle.createHostStyle(hostElm, styleModeId, styleTemplate);
      } else {
        styleElm = domApi.$createElement('style');
        styleElm.innerHTML = styleTemplate;
        // remember we don't need to do this again for this element
                appliedStyles[styleModeId] = true;
      }
      if (styleElm) {
        // add a style id attribute, but only useful during dev
        domApi.$setAttribute(styleElm, 'data-style-id', styleModeId);
        var dataStyles = styleContainerNode.querySelectorAll('[data-styles]');
        domApi.$insertBefore(styleContainerNode, styleElm, dataStyles.length && dataStyles[dataStyles.length - 1].nextSibling || styleContainerNode.firstChild);
      }
    }
  }
}

var isDef = function(v) {
  return null != v;
};

var toLowerCase = function(str) {
  return str.toLowerCase();
};

var dashToPascalCase = function(str) {
  return toLowerCase(str).split('-').map(function(segment) {
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }).join('');
};

var noop = function() {};

function createDomApi(App, win, doc) {
  // using the $ prefix so that closure is
  // cool with property renaming each of these
  if (!App.ael) {
    App.ael = function(elm, eventName, cb, opts) {
      return elm.addEventListener(eventName, cb, opts);
    };
    App.rel = function(elm, eventName, cb, opts) {
      return elm.removeEventListener(eventName, cb, opts);
    };
  }
  var unregisterListenerFns = new WeakMap();
  var domApi = {
    $documentElement: doc.documentElement,
    $head: doc.head,
    $body: doc.body,
    $supportsEventOptions: false,
    $nodeType: function(node) {
      return node.nodeType;
    },
    $createElement: function(tagName) {
      return doc.createElement(tagName);
    },
    $createElementNS: function(namespace, tagName) {
      return doc.createElementNS(namespace, tagName);
    },
    $createTextNode: function(text) {
      return doc.createTextNode(text);
    },
    $createComment: function(data) {
      return doc.createComment(data);
    },
    $insertBefore: function(parentNode, childNode, referenceNode) {
      return parentNode.insertBefore(childNode, referenceNode);
    },
    // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
    // and it's polyfilled in es5 builds
    $remove: function(node) {
      return node.remove();
    },
    $appendChild: function(parentNode, childNode) {
      return parentNode.appendChild(childNode);
    },
    $childNodes: function(node) {
      return node.childNodes;
    },
    $parentNode: function(node) {
      return node.parentNode;
    },
    $nextSibling: function(node) {
      return node.nextSibling;
    },
    $previousSibling: function(node) {
      return node.previousSibling;
    },
    $tagName: function(elm) {
      return toLowerCase(elm.nodeName);
    },
    $getTextContent: function(node) {
      return node.textContent;
    },
    $setTextContent: function(node, text) {
      return node.textContent = text;
    },
    $getAttribute: function(elm, key) {
      return elm.getAttribute(key);
    },
    $setAttribute: function(elm, key, val) {
      return elm.setAttribute(key, val);
    },
    $setAttributeNS: function(elm, namespaceURI, qualifiedName, val) {
      return elm.setAttributeNS(namespaceURI, qualifiedName, val);
    },
    $removeAttribute: function(elm, key) {
      return elm.removeAttribute(key);
    },
    $hasAttribute: function(elm, key) {
      return elm.hasAttribute(key);
    },
    $getMode: function(elm) {
      return elm.getAttribute('mode') || (App.Context || {}).mode;
    },
    $elementRef: function(elm, referenceName) {
      if ('child' === referenceName) {
        return elm.firstElementChild;
      }
      if ('parent' === referenceName) {
        return domApi.$parentElement(elm);
      }
      if ('body' === referenceName) {
        return domApi.$body;
      }
      if ('document' === referenceName) {
        return doc;
      }
      if ('window' === referenceName) {
        return win;
      }
      return elm;
    },
    $addEventListener: function(assignerElm, eventName, listenerCallback, useCapture, usePassive, attachTo, eventListenerOpts, splt) {
      // remember the original name before we possibly change it
      var assignersEventName = eventName;
      var attachToElm = assignerElm;
      // get the existing unregister listeners for
      // this element from the unregister listeners weakmap
            var assignersUnregListeners = unregisterListenerFns.get(assignerElm);
      assignersUnregListeners && assignersUnregListeners[assignersEventName] && 
      // removed any existing listeners for this event for the assigner element
      // this element already has this listener, so let's unregister it now
      assignersUnregListeners[assignersEventName]();
      if ('string' === typeof attachTo) {
        // attachTo is a string, and is probably something like
        // "parent", "window", or "document"
        // and the eventName would be like "mouseover" or "mousemove"
        attachToElm = domApi.$elementRef(assignerElm, attachTo);
      } else if ('object' === typeof attachTo) {
        // we were passed in an actual element to attach to
        attachToElm = attachTo;
      } else {
        // depending on the event name, we could actually be attaching
        // this element to something like the document or window
        splt = eventName.split(':');
        if (splt.length > 1) {
          // document:mousemove
          // parent:touchend
          // body:keyup.enter
          attachToElm = domApi.$elementRef(assignerElm, splt[0]);
          eventName = splt[1];
        }
      }
      if (!attachToElm) {
        // somehow we're referencing an element that doesn't exist
        // let's not continue
        return;
      }
      var eventListener = listenerCallback;
      // test to see if we're looking for an exact keycode
            splt = eventName.split('.');
      if (splt.length > 1) {
        // looks like this listener is also looking for a keycode
        // keyup.enter
        eventName = splt[0];
        eventListener = function(ev) {
          // wrap the user's event listener with our own check to test
          // if this keyboard event has the keycode they're looking for
          ev.keyCode === KEY_CODE_MAP[splt[1]] && listenerCallback(ev);
        };
      }
      // create the actual event listener options to use
      // this browser may not support event options
            eventListenerOpts = domApi.$supportsEventOptions ? {
        capture: !!useCapture,
        passive: !!usePassive
      } : !!useCapture;
      // ok, good to go, let's add the actual listener to the dom element
            App.ael(attachToElm, eventName, eventListener, eventListenerOpts);
      assignersUnregListeners || 
      // we don't already have a collection, let's create it
      unregisterListenerFns.set(assignerElm, assignersUnregListeners = {});
      // add the unregister listener to this element's collection
            assignersUnregListeners[assignersEventName] = function() {
        // looks like it's time to say goodbye
        attachToElm && App.rel(attachToElm, eventName, eventListener, eventListenerOpts);
        assignersUnregListeners[assignersEventName] = null;
      };
    },
    $removeEventListener: function(elm, eventName) {
      // get the unregister listener functions for this element
      var assignersUnregListeners = unregisterListenerFns.get(elm);
      assignersUnregListeners && (
      // this element has unregister listeners
      eventName ? 
      // passed in one specific event name to remove
      assignersUnregListeners[eventName] && assignersUnregListeners[eventName]() : 
      // remove all event listeners
      Object.keys(assignersUnregListeners).forEach(function(assignersEventName) {
        assignersUnregListeners[assignersEventName] && assignersUnregListeners[assignersEventName]();
      }));
    }
  };
  domApi.$attachShadow = function(elm, shadowRootInit) {
    return elm.attachShadow(shadowRootInit);
  };
  domApi.$supportsShadowDom = !!domApi.$documentElement.attachShadow;
  win.location.search.indexOf('shadow=false') > 0 && (
  // by adding ?shadow=false it'll force the slot polyfill
  // only add this check when in dev mode
  domApi.$supportsShadowDom = false);
  true;
  if ('function' !== typeof win.CustomEvent) {
    // CustomEvent polyfill
    win.CustomEvent = function(event, data, evt) {
      evt = doc.createEvent('CustomEvent');
      evt.initCustomEvent(event, data.bubbles, data.cancelable, data.detail);
      return evt;
    };
    win.CustomEvent.prototype = win.Event.prototype;
  }
  domApi.$dispatchEvent = function(elm, eventName, data) {
    return elm && elm.dispatchEvent(new win.CustomEvent(eventName, data));
  };
  // test if this browser supports event options or not
  try {
    win.addEventListener('e', null, Object.defineProperty({}, 'passive', {
      get: function() {
        return domApi.$supportsEventOptions = true;
      }
    }));
  } catch (e) {}
  domApi.$parentElement = function(elm, parentNode) {
    // if the parent node is a document fragment (shadow root)
    // then use the "host" property on it
    // otherwise use the parent node
    return (parentNode = domApi.$parentNode(elm)) && 11 /* DocumentFragment */ === domApi.$nodeType(parentNode) ? parentNode.host : parentNode;
  };
  return domApi;
}

function parseComponentLoader(cmpData, i, d) {
  // tag name will always be lower case
  var cmpMeta = {
    tagNameMeta: cmpData[0],
    membersMeta: {
      // every component defaults to always have
      // the mode and color properties
      // but only color should observe any attribute changes
      'color': {
        attribName: 'color'
      }
    }
  };
  // map of the bundle ids
  // can contain modes, and array of esm and es5 bundle ids
    cmpMeta.bundleIds = cmpData[1];
  // parse member meta
  // this data only includes props that are attributes that need to be observed
  // it does not include all of the props yet
    var memberData = cmpData[3];
  if (memberData) {
    for (i = 0; i < memberData.length; i++) {
      d = memberData[i];
      cmpMeta.membersMeta[d[0]] = {
        memberType: d[1],
        reflectToAttrib: !!d[2],
        attribName: 'string' === typeof d[3] ? d[3] : d[3] ? d[0] : 0,
        propType: d[4]
      };
    }
  }
  // encapsulation
    cmpMeta.encapsulation = cmpData[4];
  cmpData[5] && (
  // parse listener meta
  cmpMeta.listenersMeta = cmpData[5].map(parseListenerData));
  return cmpMeta;
}

function parseListenerData(listenerData) {
  return {
    eventName: listenerData[0],
    eventMethodName: listenerData[1],
    eventDisabled: !!listenerData[2],
    eventPassive: !!listenerData[3],
    eventCapture: !!listenerData[4]
  };
}

function parsePropertyValue(propType, propValue) {
  // ensure this value is of the correct prop type
  // we're testing both formats of the "propType" value because
  // we could have either gotten the data from the attribute changed callback,
  // which wouldn't have Constructor data yet, and because this method is reused
  // within proxy where we don't have meta data, but only constructor data
  if (isDef(propValue) && 'object' !== typeof propValue && 'function' !== typeof propValue) {
    if (propType === Boolean || 3 /* Boolean */ === propType) {
      // per the HTML spec, any string value means it is a boolean true value
      // but we'll cheat here and say that the string "false" is the boolean false
      return 'false' !== propValue && ('' === propValue || !!propValue);
    }
    if (propType === Number || 4 /* Number */ === propType) {
      // force it to be a number
      return parseFloat(propValue);
    }
    if (propType === String || 2 /* String */ === propType) {
      // could have been passed as a number or boolean
      // but we still want it as a string
      return propValue.toString();
    }
  }
  // not sure exactly what type we want
  // so no need to change to a different type
    return propValue;
}

function initEventEmitters(plt, cmpEvents, instance) {
  if (cmpEvents) {
    var elm_1 = plt.hostElementMap.get(instance);
    cmpEvents.forEach(function(eventMeta) {
      instance[eventMeta.method] = {
        emit: function(data) {
          plt.emitEvent(elm_1, eventMeta.name, {
            bubbles: eventMeta.bubbles,
            composed: eventMeta.composed,
            cancelable: eventMeta.cancelable,
            detail: data
          });
        }
      };
    });
  }
}

function proxyComponentInstance(plt, cmpConstructor, elm, instance, hostSnapshot, properties, memberName) {
  // at this point we've got a specific node of a host element, and created a component class instance
  // and we've already created getters/setters on both the host element and component class prototypes
  // let's upgrade any data that might have been set on the host element already
  // and let's have the getters/setters kick in and do their jobs
  // let's automatically add a reference to the host element on the instance
  plt.hostElementMap.set(instance, elm);
  // create the values object if it doesn't already exist
  // this will hold all of the internal getter/setter values
    plt.valuesMap.has(elm) || plt.valuesMap.set(elm, {});
  // get the properties from the constructor
  // and add default "mode" and "color" properties
    properties = Object.assign({
    color: {
      type: String
    }
  }, cmpConstructor.properties);
  // always set mode
    properties.mode = {
    type: String
  };
  // define each of the members and initialize what their role is
    for (memberName in properties) {
    defineMember(plt, properties[memberName], elm, instance, memberName, hostSnapshot);
  }
}

function initComponentInstance(plt, elm, hostSnapshot, instance, componentConstructor, queuedEvents, i) {
  try {
    // using the user's component class, let's create a new instance
    componentConstructor = plt.getComponentMeta(elm).componentConstructor;
    instance = new componentConstructor();
    // ok cool, we've got an host element now, and a actual instance
    // and there were no errors creating the instance
    // let's upgrade the data on the host element
    // and let the getters/setters do their jobs
        proxyComponentInstance(plt, componentConstructor, elm, instance, hostSnapshot);
    // add each of the event emitters which wire up instance methods
    // to fire off dom events from the host element
    initEventEmitters(plt, componentConstructor.events, instance);
    try {
      // replay any event listeners on the instance that
      // were queued up between the time the element was
      // connected and before the instance was ready
      queuedEvents = plt.queuedEvents.get(elm);
      if (queuedEvents) {
        // events may have already fired before the instance was even ready
        // now that the instance is ready, let's replay all of the events that
        // we queued up earlier that were originally meant for the instance
        for (i = 0; i < queuedEvents.length; i += 2) {
          // data was added in sets of two
          // first item the eventMethodName
          // second item is the event data
          // take a look at initElementListener()
          instance[queuedEvents[i]](queuedEvents[i + 1]);
        }
        plt.queuedEvents.delete(elm);
      }
    } catch (e) {
      plt.onError(e, 2 /* QueueEventsError */ , elm);
    }
  } catch (e) {
    // something done went wrong trying to create a component instance
    // create a dumby instance so other stuff can load
    // but chances are the app isn't fully working cuz this component has issues
    instance = {};
    plt.onError(e, 7 /* InitInstanceError */ , elm, true);
  }
  plt.instanceMap.set(elm, instance);
  return instance;
}

function initComponentLoaded(plt, elm, hydratedCssClass, instance, onReadyCallbacks) {
  false;
  // all is good, this component has been told it's time to finish loading
  // it's possible that we've already decided to destroy this element
  // check if this element has any actively loading child elements
  if (!plt.hasLoadedMap.has(elm) && (instance = plt.instanceMap.get(elm)) && !plt.isDisconnectedMap.has(elm) && (!elm['s-ld'] || !elm['s-ld'].length)) {
    // cool, so at this point this element isn't already being destroyed
    // and it does not have any child elements that are still loading
    // ensure we remove any child references cuz it doesn't matter at this point
    delete elm['s-ld'];
    // sweet, this particular element is good to go
    // all of this element's children have loaded (if any)
    // elm._hasLoaded = true;
        plt.hasLoadedMap.set(elm, true);
    try {
      // fire off the ref if it exists
      callNodeRefs(plt.vnodeMap.get(elm));
      // fire off the user's elm.componentOnReady() callbacks that were
      // put directly on the element (well before anything was ready)
            if (onReadyCallbacks = plt.onReadyCallbacksMap.get(elm)) {
        onReadyCallbacks.forEach(function(cb) {
          return cb(elm);
        });
        plt.onReadyCallbacksMap.delete(elm);
      }
      // fire off the user's componentDidLoad method (if one was provided)
      // componentDidLoad only runs ONCE, after the instance's element has been
      // assigned as the host element, and AFTER render() has been called
      // we'll also fire this method off on the element, just to
      instance.componentDidLoad && instance.componentDidLoad();
    } catch (e) {
      plt.onError(e, 4 /* DidLoadError */ , elm);
    }
    // add the css class that this element has officially hydrated
        elm.classList.add(hydratedCssClass);
    // ( •_•)
    // ( •_•)>⌐■-■
    // (⌐■_■)
    // load events fire from bottom to top
    // the deepest elements load first then bubbles up
        propagateComponentLoaded(plt, elm);
  }
}

function propagateComponentLoaded(plt, elm, index, ancestorsActivelyLoadingChildren) {
  // load events fire from bottom to top
  // the deepest elements load first then bubbles up
  var ancestorHostElement = plt.ancestorHostElementMap.get(elm);
  if (ancestorHostElement) {
    // ok so this element already has a known ancestor host element
    // let's make sure we remove this element from its ancestor's
    // known list of child elements which are actively loading
    ancestorsActivelyLoadingChildren = ancestorHostElement['s-ld'] || ancestorHostElement.$activeLoading;
    if (ancestorsActivelyLoadingChildren) {
      index = ancestorsActivelyLoadingChildren.indexOf(elm);
      index > -1 && 
      // yup, this element is in the list of child elements to wait on
      // remove it so we can work to get the length down to 0
      ancestorsActivelyLoadingChildren.splice(index, 1);
      // the ancestor's initLoad method will do the actual checks
      // to see if the ancestor is actually loaded or not
      // then let's call the ancestor's initLoad method if there's no length
      // (which actually ends up as this method again but for the ancestor)
            if (!ancestorsActivelyLoadingChildren.length) {
        ancestorHostElement['s-init'] && ancestorHostElement['s-init']();
        // $initLoad deprecated 2018-04-02
                ancestorHostElement.$initLoad && ancestorHostElement.$initLoad();
      }
    }
    plt.ancestorHostElementMap.delete(elm);
  }
}

/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */ var stack = [];

function h(nodeName, vnodeData, child) {
  var children = null;
  var lastSimple = false;
  var simple = false;
  for (var i = arguments.length; i-- > 2; ) {
    stack.push(arguments[i]);
  }
  while (stack.length > 0) {
    if ((child = stack.pop()) && void 0 !== child.pop) {
      for (i = child.length; i--; ) {
        stack.push(child[i]);
      }
    } else {
      'boolean' === typeof child && (child = null);
      (simple = 'function' !== typeof nodeName) && (null == child ? child = '' : 'number' === typeof child ? child = String(child) : 'string' !== typeof child && (simple = false));
      simple && lastSimple ? children[children.length - 1].vtext += child : null === children ? children = [ simple ? {
        vtext: child
      } : child ] : children.push(simple ? {
        vtext: child
      } : child);
      lastSimple = simple;
    }
  }
  var vkey;
  var vname;
  if (null != vnodeData) {
    // normalize class / classname attributes
    vnodeData.className && (vnodeData.class = vnodeData.className);
    if ('object' === typeof vnodeData.class) {
      for (i in vnodeData.class) {
        vnodeData.class[i] && stack.push(i);
      }
      vnodeData.class = stack.join(' ');
      stack.length = 0;
    }
    null != vnodeData.key && (vkey = vnodeData.key);
    null != vnodeData.name && (vname = vnodeData.name);
  }
  if ('function' === typeof nodeName) {
    // nodeName is a functional component
    return nodeName(Object.assign({}, vnodeData, {
      children: children
    }), utils);
  }
  return {
    vtag: nodeName,
    vchildren: children,
    vtext: void 0,
    vattrs: vnodeData,
    vkey: vkey,
    vname: vname,
    elm: void 0,
    ishost: false
  };
}

var utils = {
  'getAttributes': function(vnode) {
    return vnode.vattrs;
  },
  'replaceAttributes': function(vnode, attributes) {
    return vnode.vattrs = attributes;
  }
};

function render(plt, cmpMeta, hostElm, instance) {
  try {
    // if this component has a render function, let's fire
    // it off and generate the child vnodes for this host element
    // note that we do not create the host element cuz it already exists
    var hostMeta = cmpMeta.componentConstructor.host;
    var encapsulation = cmpMeta.componentConstructor.encapsulation;
    // test if this component should be shadow dom
    // and if so does the browser supports it
        var useNativeShadowDom = 'shadow' === encapsulation && plt.domApi.$supportsShadowDom;
    var reflectHostAttr = void 0;
    var rootElm = void 0;
    reflectHostAttr = reflectInstanceValuesToHostAttributes(cmpMeta.componentConstructor.properties, instance);
    rootElm = useNativeShadowDom ? hostElm.shadowRoot : hostElm;
    if (!hostElm['s-rn']) {
      // attach the styles this component needs, if any
      // this fn figures out if the styles should go in a
      // shadow root or if they should be global
      plt.attachStyles(plt, plt.domApi, cmpMeta, hostElm);
      // if no render function
            var scopeId = hostElm['s-sc'];
      if (scopeId) {
        plt.domApi.$setAttribute(hostElm, getHostScopeAttribute(scopeId), '');
        instance.render || plt.domApi.$setAttribute(hostElm, getSlotScopeAttribute(scopeId), '');
      }
    }
    if (instance.render || instance.hostData || hostMeta || reflectHostAttr) {
      // tell the platform we're actively rendering
      // if a value is changed within a render() then
      // this tells the platform not to queue the change
      plt.activeRender = true;
      var vnodeChildren = instance.render && instance.render();
      var vnodeHostData = void 0;
      // user component provided a "hostData()" method
      // the returned data/attributes are used on the host element
      vnodeHostData = instance.hostData && instance.hostData();
      if (vnodeHostData && cmpMeta.membersMeta) {
        var foundHostKeys = Object.keys(vnodeHostData).reduce(function(err, k) {
          if (cmpMeta.membersMeta[k]) {
            return err.concat(k);
          }
          if (cmpMeta.membersMeta[dashToPascalCase(k)]) {
            return err.concat(dashToPascalCase(k));
          }
          return err;
        }, []);
        if (foundHostKeys.length > 0) {
          throw new Error('The following keys were attempted to be set with hostData() from the ' + cmpMeta.tagNameMeta + ' component: ' + foundHostKeys.join(', ') + '. If you would like to modify these please set @Prop({ mutable: true, reflectToAttr: true}) on the @Prop() decorator.');
        }
      }
      reflectHostAttr && (vnodeHostData = vnodeHostData ? Object.assign(vnodeHostData, reflectHostAttr) : reflectHostAttr);
      // tell the platform we're done rendering
      // now any changes will again queue
            plt.activeRender = false;
      hostMeta && (
      // component meta data has a "theme"
      // use this to automatically generate a good css class
      // from the mode and color to add to the host element
      vnodeHostData = applyComponentHostData(vnodeHostData, hostMeta, instance));
      // looks like we've got child nodes to render into this host element
      // or we need to update the css class/attrs on the host element
      // if we haven't already created a vnode, then we give the renderer the actual element
      // if this is a re-render, then give the renderer the last vnode we already created
            var oldVNode = plt.vnodeMap.get(hostElm) || {};
      oldVNode.elm = rootElm;
      var hostVNode = h(null, vnodeHostData, vnodeChildren);
      // only care if we're reflecting values to the host element
      hostVNode.ishost = true;
      // each patch always gets a new vnode
      // the host element itself isn't patched because it already exists
      // kick off the actual render and any DOM updates
      plt.vnodeMap.set(hostElm, plt.render(hostElm, oldVNode, hostVNode, useNativeShadowDom, encapsulation));
    }
    // update styles!
        plt.customStyle && plt.customStyle.updateHost(hostElm);
    // it's official, this element has rendered
        hostElm['s-rn'] = true;
    hostElm.$onRender && (
    // $onRender deprecated 2018-04-02
    hostElm['s-rc'] = hostElm.$onRender);
    if (hostElm['s-rc']) {
      // ok, so turns out there are some child host elements
      // waiting on this parent element to load
      // let's fire off all update callbacks waiting
      hostElm['s-rc'].forEach(function(cb) {
        return cb();
      });
      hostElm['s-rc'] = null;
    }
  } catch (e) {
    plt.activeRender = false;
    plt.onError(e, 8 /* RenderError */ , hostElm, true);
  }
}

function applyComponentHostData(vnodeHostData, hostMeta, instance) {
  vnodeHostData = vnodeHostData || {};
  // component meta data has a "theme"
  // use this to automatically generate a good css class
  // from the mode and color to add to the host element
    Object.keys(hostMeta).forEach(function(key) {
    'theme' === key ? 
    // host: { theme: 'button' }
    // adds css classes w/ mode and color combinations
    // class="button button-md button-primary button-md-primary"
    convertCssNamesToObj(vnodeHostData.class = vnodeHostData.class || {}, hostMeta[key], instance.mode, instance.color) : 'class' === key ? 
    // host: { class: 'multiple css-classes' }
    // class="multiple css-classes"
    convertCssNamesToObj(vnodeHostData[key] = vnodeHostData[key] || {}, hostMeta[key]) : 
    // rando attribute/properties
    vnodeHostData[key] = hostMeta[key];
  });
  return vnodeHostData;
}

function convertCssNamesToObj(cssClassObj, className, mode, color) {
  className.split(' ').forEach(function(cssClass) {
    cssClassObj[cssClass] = true;
    if (mode) {
      cssClassObj[cssClass + '-' + mode] = true;
      color && (cssClassObj[cssClass + '-' + mode + '-' + color] = cssClassObj[cssClass + '-' + color] = true);
    }
  });
}

function reflectInstanceValuesToHostAttributes(properties, instance, reflectHostAttr) {
  properties && Object.keys(properties).forEach(function(memberName) {
    if (properties[memberName].reflectToAttr) {
      reflectHostAttr = reflectHostAttr || {};
      reflectHostAttr[memberName] = instance[memberName];
    }
  });
  return reflectHostAttr;
}

function queueUpdate(plt, elm) {
  // only run patch if it isn't queued already
  if (!plt.isQueuedForUpdate.has(elm)) {
    plt.isQueuedForUpdate.set(elm, true);
    // run the patch in the next tick
    // vdom diff and patch the host element for differences
        plt.isAppLoaded ? 
    // app has already loaded
    // let's queue this work in the dom write phase
    plt.queue.write(function() {
      return update(plt, elm);
    }) : 
    // app hasn't finished loading yet
    // so let's use next tick to do everything
    // as fast as possible
    plt.queue.tick(function() {
      return update(plt, elm);
    });
  }
}

function update(plt, elm, isInitialLoad, instance, ancestorHostElement, userPromise) {
  // no longer queued for update
  plt.isQueuedForUpdate.delete(elm);
  // everything is async, so somehow we could have already disconnected
  // this node, so be sure to do nothing if we've already disconnected
    if (!plt.isDisconnectedMap.has(elm)) {
    instance = plt.instanceMap.get(elm);
    isInitialLoad = !instance;
    if (isInitialLoad) {
      ancestorHostElement = plt.ancestorHostElementMap.get(elm);
      ancestorHostElement && ancestorHostElement.$rendered && (
      // $rendered deprecated 2018-04-02
      ancestorHostElement['s-rn'] = true);
      if (ancestorHostElement && !ancestorHostElement['s-rn']) {
        // this is the intial load
        // this element has an ancestor host element
        // but the ancestor host element has NOT rendered yet
        // so let's just cool our jets and wait for the ancestor to render
        (ancestorHostElement['s-rc'] = ancestorHostElement['s-rc'] || []).push(function() {
          // this will get fired off when the ancestor host element
          // finally gets around to rendering its lazy self
          update(plt, elm);
        });
        // $onRender deprecated 2018-04-02
                ancestorHostElement.$onRender = ancestorHostElement['s-rc'];
        return;
      }
      // haven't created a component instance for this host element yet!
      // create the instance from the user's component class
      // https://www.youtube.com/watch?v=olLxrojmvMg
            instance = initComponentInstance(plt, elm, plt.hostSnapshotMap.get(elm));
      // fire off the user's componentWillLoad method (if one was provided)
      // componentWillLoad only runs ONCE, after instance's element has been
      // assigned as the host element, but BEFORE render() has been called
      try {
        instance.componentWillLoad && (userPromise = instance.componentWillLoad());
      } catch (e) {
        plt.onError(e, 3 /* WillLoadError */ , elm);
      }
    } else {
      // already created an instance and this is an update
      // fire off the user's componentWillUpdate method (if one was provided)
      // componentWillUpdate runs BEFORE render() has been called
      // but only BEFORE an UPDATE and not before the intial render
      // get the returned promise (if one was provided)
      try {
        instance.componentWillUpdate && (userPromise = instance.componentWillUpdate());
      } catch (e) {
        plt.onError(e, 5 /* WillUpdateError */ , elm);
      }
    }
    userPromise && userPromise.then ? 
    // looks like the user return a promise!
    // let's not actually kick off the render
    // until the user has resolved their promise
    userPromise.then(function() {
      return renderUpdate(plt, elm, instance, isInitialLoad);
    }) : 
    // user never returned a promise so there's
    // no need to wait on anything, let's do the render now my friend
    renderUpdate(plt, elm, instance, isInitialLoad);
  }
}

function renderUpdate(plt, elm, instance, isInitialLoad) {
  // if this component has a render function, let's fire
  // it off and generate a vnode for this
  render(plt, plt.getComponentMeta(elm), elm, instance);
  try {
    if (isInitialLoad) {
      // so this was the initial load i guess
      elm['s-init']();
      // componentDidLoad just fired off
        } else {
      // fire off the user's componentDidUpdate method (if one was provided)
      // componentDidUpdate runs AFTER render() has been called
      // but only AFTER an UPDATE and not after the intial render
      instance.componentDidUpdate && instance.componentDidUpdate();
      callNodeRefs(plt.vnodeMap.get(elm));
    }
  } catch (e) {
    // derp
    plt.onError(e, 6 /* DidUpdateError */ , elm, true);
  }
}

function defineMember(plt, property, elm, instance, memberName, hostSnapshot, hostAttributes, hostAttrValue) {
  function getComponentProp(values) {
    // component instance prop/state getter
    // get the property value directly from our internal values
    values = plt.valuesMap.get(plt.hostElementMap.get(this));
    return values && values[memberName];
  }
  function setComponentProp(newValue, elm) {
    // component instance prop/state setter (cannot be arrow fn)
    elm = plt.hostElementMap.get(this);
    elm && (property.state || property.mutable ? setValue(plt, elm, memberName, newValue) : console.warn('@Prop() "' + memberName + '" on "' + elm.tagName + '" cannot be modified.'));
  }
  if (property.type || property.state) {
    var values = plt.valuesMap.get(elm);
    if (!property.state) {
      !property.attr || void 0 !== values[memberName] && '' !== values[memberName] || 
      // check the prop value from the host element attribute
      (hostAttributes = hostSnapshot && hostSnapshot.$attributes) && isDef(hostAttrValue = hostAttributes[property.attr]) && (
      // looks like we've got an attribute value
      // let's set it to our internal values
      values[memberName] = parsePropertyValue(property.type, hostAttrValue));
      true;
      // client-side
      // within the browser, the element's prototype
      // already has its getter/setter set, but on the
      // server the prototype is shared causing issues
      // so instead the server's elm has the getter/setter
      // directly on the actual element instance, not its prototype
      // so on the browser we can use "hasOwnProperty"
      if (elm.hasOwnProperty(memberName)) {
        // @Prop or @Prop({mutable:true})
        // property values on the host element should override
        // any default values on the component instance
        void 0 === values[memberName] && (values[memberName] = parsePropertyValue(property.type, elm[memberName]));
        // for the client only, let's delete its "own" property
        // this way our already assigned getter/setter on the prototype kicks in
                delete elm[memberName];
      }
    }
    instance.hasOwnProperty(memberName) && void 0 === values[memberName] && (
    // @Prop() or @Prop({mutable:true}) or @State()
    // we haven't yet got a value from the above checks so let's
    // read any "own" property instance values already set
    // to our internal value as the source of getter data
    // we're about to define a property and it'll overwrite this "own" property
    values[memberName] = instance[memberName]);
    property.watchCallbacks && (values[WATCH_CB_PREFIX + memberName] = property.watchCallbacks.slice());
    // add getter/setter to the component instance
    // these will be pointed to the internal data set from the above checks
        definePropertyGetterSetter(instance, memberName, getComponentProp, setComponentProp);
  } else if (property.elementRef) {
    // @Element()
    // add a getter to the element reference using
    // the member name the component meta provided
    definePropertyValue(instance, memberName, elm);
  } else if (property.method) {
    // @Method()
    // add a property "value" on the host element
    // which we'll bind to the instance's method
    definePropertyValue(elm, memberName, instance[memberName].bind(instance));
  } else if (property.context) {
    // @Prop({ context: 'config' })
    var contextObj = plt.getContextItem(property.context);
    void 0 !== contextObj && definePropertyValue(instance, memberName, contextObj.getContext && contextObj.getContext(elm) || contextObj);
  } else {
    property.connect && 
    // @Prop({ connect: 'ion-loading-ctrl' })
    definePropertyValue(instance, memberName, plt.propConnect(property.connect));
  }
}

function setValue(plt, elm, memberName, newVal, values, instance, watchMethods) {
  // get the internal values object, which should always come from the host element instance
  // create the _values object if it doesn't already exist
  values = plt.valuesMap.get(elm);
  values || plt.valuesMap.set(elm, values = {});
  var oldVal = values[memberName];
  // check our new property value against our internal value
    if (newVal !== oldVal) {
    // gadzooks! the property's value has changed!!
    // set our new value!
    // https://youtu.be/dFtLONl4cNc?t=22
    values[memberName] = newVal;
    instance = plt.instanceMap.get(elm);
    if (instance) {
      // get an array of method names of watch functions to call
      watchMethods = values[WATCH_CB_PREFIX + memberName];
      if (watchMethods) {
        // this instance is watching for when this property changed
        for (var i = 0; i < watchMethods.length; i++) {
          try {
            // fire off each of the watch methods that are watching this property
            instance[watchMethods[i]].call(instance, newVal, oldVal, memberName);
          } catch (e) {
            console.error(e);
          }
        }
      }
      !plt.activeRender && elm['s-rn'] && 
      // looks like this value actually changed, so we've got work to do!
      // but only if we've already rendered, otherwise just chill out
      // queue that we need to do an update, but don't worry about queuing
      // up millions cuz this function ensures it only runs once
      queueUpdate(plt, elm);
    }
  }
}

function definePropertyValue(obj, propertyKey, value) {
  // minification shortcut
  Object.defineProperty(obj, propertyKey, {
    'configurable': true,
    'value': value
  });
}

function definePropertyGetterSetter(obj, propertyKey, get, set) {
  // minification shortcut
  Object.defineProperty(obj, propertyKey, {
    'configurable': true,
    'get': get,
    'set': set
  });
}

var WATCH_CB_PREFIX = 'wc-';

function updateAttribute(elm, memberName, newValue, isBoolean, forceRemove) {
  var isXlinkNs = memberName !== (memberName = memberName.replace(/^xlink\:?/, ''));
  var isBooleanAttr = BOOLEAN_ATTRS[memberName] || isBoolean;
  if (isBooleanAttr && (!newValue || 'false' === newValue) || forceRemove) {
    isXlinkNs ? elm.removeAttributeNS(XLINK_NS$1, toLowerCase(memberName)) : elm.removeAttribute(memberName);
  } else if ('function' !== typeof newValue) {
    isBooleanAttr && (newValue = '');
    isXlinkNs ? elm.setAttributeNS(XLINK_NS$1, toLowerCase(memberName), newValue) : elm.setAttribute(memberName, newValue);
  }
}

var BOOLEAN_ATTRS = {
  'allowfullscreen': 1,
  'async': 1,
  'autofocus': 1,
  'autoplay': 1,
  'checked': 1,
  'controls': 1,
  'disabled': 1,
  'enabled': 1,
  'formnovalidate': 1,
  'hidden': 1,
  'multiple': 1,
  'noresize': 1,
  'readonly': 1,
  'required': 1,
  'selected': 1,
  'spellcheck': 1
};

var XLINK_NS$1 = 'http://www.w3.org/1999/xlink';

function setAccessor(plt, elm, memberName, oldValue, newValue, isSvg, isHostElement, i, ilen, cmpMeta) {
  if ('class' !== memberName || isSvg) {
    if ('style' === memberName) {
      // Style
      oldValue = oldValue || EMPTY_OBJ;
      newValue = newValue || EMPTY_OBJ;
      for (i in oldValue) {
        newValue[i] || (elm.style[i] = '');
      }
      for (i in newValue) {
        newValue[i] !== oldValue[i] && (elm.style[i] = newValue[i]);
      }
    } else if ('o' !== memberName[0] || 'n' !== memberName[1] || !/[A-Z]/.test(memberName[2]) || memberName in elm) {
      if ('list' !== memberName && 'type' !== memberName && !isSvg && (memberName in elm || -1 !== [ 'object', 'function' ].indexOf(typeof newValue) && null !== newValue) || false) {
        // Properties
        // - list and type are attributes that get applied as values on the element
        // - all svgs get values as attributes not props
        // - check if elm contains name or if the value is array, object, or function
        cmpMeta = plt.getComponentMeta(elm);
        if (cmpMeta && cmpMeta.membersMeta && cmpMeta.membersMeta[memberName]) {
          // we know for a fact that this element is a known component
          // and this component has this member name as a property,
          // let's set the known @Prop on this element
          // set it directly as property on the element
          setProperty(elm, memberName, newValue);
          isHostElement && cmpMeta.membersMeta[memberName].reflectToAttrib && 
          // we also want to set this data to the attribute
          updateAttribute(elm, cmpMeta.membersMeta[memberName].attribName, newValue, 3 /* Boolean */ === cmpMeta.membersMeta[memberName].propType, null == newValue);
        } else if ('ref' !== memberName) {
          // this member name is a property on this element, but it's not a component
          // this is a native property like "value" or something
          // also we can ignore the "ref" member name at this point
          setProperty(elm, memberName, null == newValue ? '' : newValue);
          null != newValue && false !== newValue || elm.removeAttribute(memberName);
        }
      } else {
        null != newValue && 'key' !== memberName ? 
        // Element Attributes
        updateAttribute(elm, memberName, newValue) : (isSvg || plt.domApi.$hasAttribute(elm, memberName) && (null == newValue || false === newValue)) && 
        // remove svg attribute
        plt.domApi.$removeAttribute(elm, memberName);
      }
    } else {
      // Event Handlers
      // so if the member name starts with "on" and the 3rd characters is
      // a capital letter, and it's not already a member on the element,
      // then we're assuming it's an event listener
      // standard event
      // the JSX attribute could have been "onMouseOver" and the
      // member name "onmouseover" is on the element's prototype
      // so let's add the listener "mouseover", which is all lowercased
      memberName = toLowerCase(memberName) in elm ? toLowerCase(memberName.substring(2)) : toLowerCase(memberName[2]) + memberName.substring(3);
      newValue ? newValue !== oldValue && 
      // add listener
      plt.domApi.$addEventListener(elm, memberName, newValue) : 
      // remove listener
      plt.domApi.$removeEventListener(elm, memberName);
    }
  } else 
  // Class
  if (oldValue !== newValue) {
    var oldList_1 = null == oldValue || '' === oldValue ? EMPTY_ARR : oldValue.trim().split(/\s+/);
    var newList = null == newValue || '' === newValue ? EMPTY_ARR : newValue.trim().split(/\s+/);
    var classList = null == elm.className || '' === elm.className ? EMPTY_ARR : elm.className.trim().split(/\s+/);
    for (i = 0, ilen = oldList_1.length; i < ilen; i++) {
      -1 === newList.indexOf(oldList_1[i]) && (classList = classList.filter(function(c) {
        return c !== oldList_1[i];
      }));
    }
    for (i = 0, ilen = newList.length; i < ilen; i++) {
      -1 === oldList_1.indexOf(newList[i]) && (classList = classList.concat([ newList[i] ]));
    }
    elm.className = classList.join(' ');
  }
}

/**
 * Attempt to set a DOM property to the given value.
 * IE & FF throw for certain property-value combinations.
 */ function setProperty(elm, name, value) {
  try {
    elm[name] = value;
  } catch (e) {}
}

function updateElement(plt, oldVnode, newVnode, isSvgMode, memberName) {
  // if the element passed in is a shadow root, which is a document fragment
  // then we want to be adding attrs/props to the shadow root's "host" element
  // if it's not a shadow root, then we add attrs/props to the same element
  var elm = 11 /* DocumentFragment */ === newVnode.elm.nodeType && newVnode.elm.host ? newVnode.elm.host : newVnode.elm;
  var oldVnodeAttrs = oldVnode && oldVnode.vattrs || EMPTY_OBJ;
  var newVnodeAttrs = newVnode.vattrs || EMPTY_OBJ;
  // remove attributes no longer present on the vnode by setting them to undefined
    for (memberName in oldVnodeAttrs) {
    newVnodeAttrs && null != newVnodeAttrs[memberName] || null == oldVnodeAttrs[memberName] || setAccessor(plt, elm, memberName, oldVnodeAttrs[memberName], void 0, isSvgMode, newVnode.ishost);
  }
  // add new & update changed attributes
    for (memberName in newVnodeAttrs) {
    memberName in oldVnodeAttrs && newVnodeAttrs[memberName] === ('value' === memberName || 'checked' === memberName ? elm[memberName] : oldVnodeAttrs[memberName]) || setAccessor(plt, elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.ishost);
  }
}

var isSvgMode = false;

function createRendererPatch(plt, domApi) {
  // createRenderer() is only created once per app
  // the patch() function which createRenderer() returned is the function
  // which gets called numerous times by each component
  function createElm(oldParentVNode, newParentVNode, childIndex, parentElm, i, elm, childNode, newVNode, oldVNode) {
    newVNode = newParentVNode.vchildren[childIndex];
    if (!useNativeShadowDom) {
      // remember for later we need to check to relocate nodes
      checkSlotRelocate = true;
      if ('slot' === newVNode.vtag) {
        scopeId && 
        // scoped css needs to add its scoped id to the parent element
        domApi.$setAttribute(parentElm, scopeId + '-slot', '');
        newVNode.vchildren ? 
        // slot element has fallback content
        // still create an element that "mocks" the slot element
        newVNode.isSlotFallback = true : 
        // slot element does not have fallback content
        // create an html comment we'll use to always reference
        // where actual slot content should sit next to
        newVNode.isSlotReference = true;
      }
    }
    if (isDef(newVNode.vtext)) {
      // create text node
      newVNode.elm = domApi.$createTextNode(newVNode.vtext);
    } else if (newVNode.isSlotReference) {
      // create a slot reference html text node
      newVNode.elm = domApi.$createTextNode('');
    } else {
      // create element
      elm = newVNode.elm = isSvgMode || 'svg' === newVNode.vtag ? domApi.$createElementNS('http://www.w3.org/2000/svg', newVNode.vtag) : domApi.$createElement(newVNode.isSlotFallback ? 'slot-fb' : newVNode.vtag);
      isSvgMode = 'svg' === newVNode.vtag || 'foreignObject' !== newVNode.vtag && isSvgMode;
      // add css classes, attrs, props, listeners, etc.
      updateElement(plt, null, newVNode, isSvgMode);
      isDef(scopeId) && elm['s-si'] !== scopeId && 
      // if there is a scopeId and this is the initial render
      // then let's add the scopeId as an attribute
      domApi.$setAttribute(elm, elm['s-si'] = scopeId, '');
      isDef(ssrId) && 
      // SSR ONLY: this is an SSR render and this
      // logic does not run on the client
      // give this element the SSR child id that can be read by the client
      domApi.$setAttribute(elm, SSR_CHILD_ID, ssrId + '.' + childIndex + (hasChildNodes(newVNode.vchildren) ? '' : '.'));
      if (newVNode.vchildren) {
        for (i = 0; i < newVNode.vchildren.length; ++i) {
          // create the node
          childNode = createElm(oldParentVNode, newVNode, i, elm);
          // return node could have been null
                    if (childNode) {
            isDef(ssrId) && 3 /* TextNode */ === childNode.nodeType && !childNode['s-cr'] && 
            // SSR ONLY: add the text node's start comment
            domApi.$appendChild(elm, domApi.$createComment('s.' + ssrId + '.' + i));
            // append our new node
                        domApi.$appendChild(elm, childNode);
            if (isDef(ssrId) && 3 /* TextNode */ === childNode.nodeType && !childNode['s-cr']) {
              // SSR ONLY: add the text node's end comment
              domApi.$appendChild(elm, domApi.$createComment('/'));
              domApi.$appendChild(elm, domApi.$createTextNode(' '));
            }
          }
        }
      }
      'svg' === newVNode.vtag && (
      // Only reset the SVG context when we're exiting SVG element
      isSvgMode = false);
    }
    newVNode.elm['s-hn'] = hostTagName;
    if (newVNode.isSlotFallback || newVNode.isSlotReference) {
      // remember the content reference comment
      newVNode.elm['s-sr'] = true;
      // remember the content reference comment
            newVNode.elm['s-cr'] = contentRef;
      // remember the slot name, or empty string for default slot
            newVNode.elm['s-sn'] = newVNode.vname || '';
      // check if we've got an old vnode for this slot
            oldVNode = oldParentVNode && oldParentVNode.vchildren && oldParentVNode.vchildren[childIndex];
      oldVNode && oldVNode.vtag === newVNode.vtag && oldParentVNode.elm && 
      // we've got an old slot vnode and the wrapper is being replaced
      // so let's move the old slot content back to it's original location
      putBackInOriginalLocation(oldParentVNode.elm);
    }
    return newVNode.elm;
  }
  function putBackInOriginalLocation(parentElm, recursive, i, childNode) {
    plt.tmpDisconnected = true;
    var oldSlotChildNodes = domApi.$childNodes(parentElm);
    for (i = oldSlotChildNodes.length - 1; i >= 0; i--) {
      childNode = oldSlotChildNodes[i];
      if (childNode['s-hn'] !== hostTagName && childNode['s-ol']) {
        // this child node in the old element is from another component
        // remove this node from the old slot's parent
        domApi.$remove(childNode);
        // and relocate it back to it's original location
                domApi.$insertBefore(parentReferenceNode(childNode), childNode, referenceNode(childNode));
        // remove the old original location comment entirely
        // later on the patch function will know what to do
        // and move this to the correct spot in need be
                domApi.$remove(childNode['s-ol']);
        childNode['s-ol'] = null;
        checkSlotRelocate = true;
      }
      recursive && putBackInOriginalLocation(childNode, recursive);
    }
    plt.tmpDisconnected = false;
  }
  function addVnodes(parentElm, before, parentVNode, vnodes, startIdx, endIdx, containerElm, childNode) {
    // $defaultHolder deprecated 2018-04-02
    var contentRef = parentElm['s-cr'] || parentElm.$defaultHolder;
    containerElm = contentRef && domApi.$parentNode(contentRef) || parentElm;
    containerElm.shadowRoot && domApi.$tagName(containerElm) === hostTagName && (containerElm = containerElm.shadowRoot);
    for (;startIdx <= endIdx; ++startIdx) {
      if (vnodes[startIdx]) {
        childNode = isDef(vnodes[startIdx].vtext) ? domApi.$createTextNode(vnodes[startIdx].vtext) : createElm(null, parentVNode, startIdx, parentElm);
        if (childNode) {
          vnodes[startIdx].elm = childNode;
          domApi.$insertBefore(containerElm, childNode, referenceNode(before));
        }
      }
    }
  }
  function removeVnodes(vnodes, startIdx, endIdx, node) {
    for (;startIdx <= endIdx; ++startIdx) {
      if (isDef(vnodes[startIdx])) {
        node = vnodes[startIdx].elm;
        // we're removing this element
        // so it's possible we need to show slot fallback content now
        checkSlotFallbackVisibility = true;
        node['s-ol'] ? 
        // remove the original location comment
        domApi.$remove(node['s-ol']) : 
        // it's possible that child nodes of the node
        // that's being removed are slot nodes
        putBackInOriginalLocation(node, true);
        // remove the vnode's element from the dom
        domApi.$remove(node);
      }
    }
  }
  function updateChildren(parentElm, oldCh, newVNode, newCh, idxInOld, i, node, elmToMove) {
    var oldStartIdx = 0, newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (null == oldStartVnode) {
        // Vnode might have been moved left
        oldStartVnode = oldCh[++oldStartIdx];
      } else if (null == oldEndVnode) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (null == newStartVnode) {
        newStartVnode = newCh[++newStartIdx];
      } else if (null == newEndVnode) {
        newEndVnode = newCh[--newEndIdx];
      } else if (isSameVnode(oldStartVnode, newStartVnode)) {
        patchVNode(oldStartVnode, newStartVnode);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (isSameVnode(oldEndVnode, newEndVnode)) {
        patchVNode(oldEndVnode, newEndVnode);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (isSameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        'slot' !== oldStartVnode.vtag && 'slot' !== newEndVnode.vtag || putBackInOriginalLocation(domApi.$parentNode(oldStartVnode.elm));
        patchVNode(oldStartVnode, newEndVnode);
        domApi.$insertBefore(parentElm, oldStartVnode.elm, domApi.$nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (isSameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        'slot' !== oldStartVnode.vtag && 'slot' !== newEndVnode.vtag || putBackInOriginalLocation(domApi.$parentNode(oldEndVnode.elm));
        patchVNode(oldEndVnode, newStartVnode);
        domApi.$insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        // createKeyToOldIdx
        idxInOld = null;
        for (i = oldStartIdx; i <= oldEndIdx; ++i) {
          if (oldCh[i] && isDef(oldCh[i].vkey) && oldCh[i].vkey === newStartVnode.vkey) {
            idxInOld = i;
            break;
          }
        }
        if (isDef(idxInOld)) {
          elmToMove = oldCh[idxInOld];
          if (elmToMove.vtag !== newStartVnode.vtag) {
            node = createElm(oldCh && oldCh[newStartIdx], newVNode, idxInOld, parentElm);
          } else {
            patchVNode(elmToMove, newStartVnode);
            oldCh[idxInOld] = void 0;
            node = elmToMove.elm;
          }
          newStartVnode = newCh[++newStartIdx];
        } else {
          // new element
          node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm);
          newStartVnode = newCh[++newStartIdx];
        }
        node && domApi.$insertBefore(parentReferenceNode(oldStartVnode.elm), node, referenceNode(oldStartVnode.elm));
      }
    }
    oldStartIdx > oldEndIdx ? addVnodes(parentElm, null == newCh[newEndIdx + 1] ? null : newCh[newEndIdx + 1].elm, newVNode, newCh, newStartIdx, newEndIdx) : newStartIdx > newEndIdx && removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
  function isSameVnode(vnode1, vnode2) {
    // compare if two vnode to see if they're "technically" the same
    // need to have the same element tag, and same key to be the same
    if (vnode1.vtag === vnode2.vtag && vnode1.vkey === vnode2.vkey) {
      if ('slot' === vnode1.vtag) {
        return vnode1.vname === vnode2.vname;
      }
      return true;
    }
    return false;
  }
  function referenceNode(node) {
    if (node && node['s-ol']) {
      // this node was relocated to a new location in the dom
      // because of some other component's slot
      // but we still have an html comment in place of where
      // it's original location was according to it's original vdom
      return node['s-ol'];
    }
    return node;
  }
  function parentReferenceNode(node) {
    return domApi.$parentNode(node['s-ol'] ? node['s-ol'] : node);
  }
  function patchVNode(oldVNode, newVNode, defaultHolder) {
    var elm = newVNode.elm = oldVNode.elm;
    var oldChildren = oldVNode.vchildren;
    var newChildren = newVNode.vchildren;
    // test if we're rendering an svg element, or still rendering nodes inside of one
    // only add this to the when the compiler sees we're using an svg somewhere
    isSvgMode = newVNode.elm && isDef(domApi.$parentElement(newVNode.elm)) && void 0 !== newVNode.elm.ownerSVGElement;
    isSvgMode = 'svg' === newVNode.vtag || 'foreignObject' !== newVNode.vtag && isSvgMode;
    if (isDef(newVNode.vtext)) {
      (defaultHolder = elm['s-cr'] || elm.$defaultHolder /* $defaultHolder deprecated 2018-04-02 */) ? 
      // this element has slotted content
      domApi.$setTextContent(domApi.$parentNode(defaultHolder), newVNode.vtext) : oldVNode.vtext !== newVNode.vtext && 
      // update the text content for the text only vnode
      // and also only if the text is different than before
      domApi.$setTextContent(elm, newVNode.vtext);
    } else {
      // element node
      'slot' !== newVNode.vtag && 
      // either this is the first render of an element OR it's an update
      // AND we already know it's possible it could have changed
      // this updates the element's css classes, attrs, props, listeners, etc.
      updateElement(plt, oldVNode, newVNode, isSvgMode);
      if (isDef(oldChildren) && isDef(newChildren)) {
        // looks like there's child vnodes for both the old and new vnodes
        updateChildren(elm, oldChildren, newVNode, newChildren);
      } else if (isDef(newChildren)) {
        // no old child vnodes, but there are new child vnodes to add
        isDef(oldVNode.vtext) && 
        // the old vnode was text, so be sure to clear it out
        domApi.$setTextContent(elm, '');
        // add the new vnode children
                addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
      } else {
        isDef(oldChildren) && 
        // no new child vnodes, but there are old child vnodes to remove
        removeVnodes(oldChildren, 0, oldChildren.length - 1);
      }
    }
    // reset svgMode when svg node is fully patched
    isSvgMode && 'svg' === newVNode.vtag && (isSvgMode = false);
  }
  function updateFallbackSlotVisibility(elm, childNode, childNodes, i, ilen, j, slotNameAttr, nodeType) {
    childNodes = domApi.$childNodes(elm);
    for (i = 0, ilen = childNodes.length; i < ilen; i++) {
      childNode = childNodes[i];
      if (1 /* ElementNode */ === domApi.$nodeType(childNode)) {
        if (childNode['s-sr']) {
          // this is a slot fallback node
          // get the slot name for this slot reference node
          slotNameAttr = childNode['s-sn'];
          // by default always show a fallback slot node
          // then hide it if there are other slots in the light dom
                    childNode.hidden = false;
          for (j = 0; j < ilen; j++) {
            if (childNodes[j]['s-hn'] !== childNode['s-hn']) {
              // this sibling node is from a different component
              nodeType = domApi.$nodeType(childNodes[j]);
              if ('' !== slotNameAttr) {
                // this is a named fallback slot node
                if (1 /* ElementNode */ === nodeType && slotNameAttr === domApi.$getAttribute(childNodes[j], 'slot')) {
                  childNode.hidden = true;
                  break;
                }
              } else 
              // this is a default fallback slot node
              // any element or text node (with content)
              // should hide the default fallback slot node
              if (1 /* ElementNode */ === nodeType || 3 /* TextNode */ === nodeType && '' !== domApi.$getTextContent(childNodes[j]).trim()) {
                childNode.hidden = true;
                break;
              }
            }
          }
        }
        // keep drilling down
                updateFallbackSlotVisibility(childNode);
      }
    }
  }
  var relocateNodes = [];
  function relocateSlotContent(elm, childNodes, childNode, node, i, ilen, j, hostContentNodes, slotNameAttr, nodeType) {
    childNodes = domApi.$childNodes(elm);
    for (i = 0, ilen = childNodes.length; i < ilen; i++) {
      childNode = childNodes[i];
      if (childNode['s-sr'] && (node = childNode['s-cr'])) {
        // first got the content reference comment node
        // then we got it's parent, which is where all the host content is in now
        hostContentNodes = domApi.$childNodes(domApi.$parentNode(node));
        slotNameAttr = childNode['s-sn'];
        for (j = hostContentNodes.length - 1; j >= 0; j--) {
          node = hostContentNodes[j];
          if (!node['s-cn'] && !node['s-nr'] && node['s-hn'] !== childNode['s-hn']) {
            // let's do some relocating to its new home
            // but never relocate a content reference node
            // that is suppose to always represent the original content location
            nodeType = domApi.$nodeType(node);
            if (((3 /* TextNode */ === nodeType || 8 /* CommentNode */ === nodeType) && '' === slotNameAttr || 1 /* ElementNode */ === nodeType && null === domApi.$getAttribute(node, 'slot') && '' === slotNameAttr || 1 /* ElementNode */ === nodeType && domApi.$getAttribute(node, 'slot') === slotNameAttr) && !relocateNodes.some(function(r) {
              return r.nodeToRelocate === node;
            })) {
              // made some changes to slots
              // let's make sure we also double check
              // fallbacks are correctly hidden or shown
              checkSlotFallbackVisibility = true;
              node['s-sn'] = slotNameAttr;
              // add to our list of nodes to relocate
                            relocateNodes.push({
                slotRefNode: childNode,
                nodeToRelocate: node
              });
            }
          }
        }
      }
      1 /* ElementNode */ === domApi.$nodeType(childNode) && relocateSlotContent(childNode);
    }
  }
  // internal variables to be reused per patch() call
    var useNativeShadowDom, ssrId, scopeId, checkSlotFallbackVisibility, checkSlotRelocate, hostTagName, contentRef;
  return function patch(hostElm, oldVNode, newVNode, useNativeShadowDomVal, encapsulation, ssrPatchId, i, relocateNode, orgLocationNode, refNode, parentNodeRef, insertBeforeNode) {
    // patchVNode() is synchronous
    // so it is safe to set these variables and internally
    // the same patch() call will reference the same data
    hostTagName = domApi.$tagName(hostElm);
    contentRef = hostElm['s-cr'];
    useNativeShadowDom = useNativeShadowDomVal;
    ssrId = 'shadow' !== encapsulation ? ssrPatchId : null;
    // get the scopeId
    scopeId = hostElm['s-sc'];
    // always reset
        checkSlotRelocate = checkSlotFallbackVisibility = false;
    // synchronous patch
    patchVNode(oldVNode, newVNode);
    isDef(ssrId) && 
    // SSR ONLY: we've been given an SSR id, so the host element
    // should be given the ssr id attribute
    domApi.$setAttribute(oldVNode.elm, SSR_VNODE_ID, ssrId);
    if (checkSlotRelocate) {
      relocateSlotContent(newVNode.elm);
      for (i = 0; i < relocateNodes.length; i++) {
        relocateNode = relocateNodes[i];
        if (!relocateNode.nodeToRelocate['s-ol']) {
          // add a reference node marking this node's original location
          // keep a reference to this node for later lookups
          orgLocationNode = domApi.$createTextNode('');
          orgLocationNode['s-nr'] = relocateNode.nodeToRelocate;
          domApi.$insertBefore(domApi.$parentNode(relocateNode.nodeToRelocate), relocateNode.nodeToRelocate['s-ol'] = orgLocationNode, relocateNode.nodeToRelocate);
        }
      }
      // while we're moving nodes around existing nodes, temporarily disable
      // the disconnectCallback from working
            plt.tmpDisconnected = true;
      for (i = 0; i < relocateNodes.length; i++) {
        relocateNode = relocateNodes[i];
        // by default we're just going to insert it directly
        // after the slot reference node
                parentNodeRef = domApi.$parentNode(relocateNode.slotRefNode);
        insertBeforeNode = domApi.$nextSibling(relocateNode.slotRefNode);
        orgLocationNode = relocateNode.nodeToRelocate['s-ol'];
        while (orgLocationNode = domApi.$previousSibling(orgLocationNode)) {
          if ((refNode = orgLocationNode['s-nr']) && refNode && refNode['s-sn'] === relocateNode.nodeToRelocate['s-sn'] && parentNodeRef === domApi.$parentNode(refNode) && (refNode = domApi.$nextSibling(refNode)) && refNode && !refNode['s-nr']) {
            insertBeforeNode = refNode;
            break;
          }
        }
        if ((!insertBeforeNode && parentNodeRef !== domApi.$parentNode(relocateNode.nodeToRelocate) || domApi.$nextSibling(relocateNode.nodeToRelocate) !== insertBeforeNode) && relocateNode.nodeToRelocate !== insertBeforeNode) {
          // remove the node from the dom
          domApi.$remove(relocateNode.nodeToRelocate);
          // add it back to the dom but in its new home
                    domApi.$insertBefore(parentNodeRef, relocateNode.nodeToRelocate, insertBeforeNode);
        }
      }
      // done moving nodes around
      // allow the disconnect callback to work again
            plt.tmpDisconnected = false;
    }
    checkSlotFallbackVisibility && updateFallbackSlotVisibility(newVNode.elm);
    // always reset
        relocateNodes.length = 0;
    // return our new vnode
    return newVNode;
  };
}

function callNodeRefs(vNode, isDestroy) {
  if (vNode) {
    vNode.vattrs && vNode.vattrs.ref && vNode.vattrs.ref(isDestroy ? null : vNode.elm);
    vNode.vchildren && vNode.vchildren.forEach(function(vChild) {
      callNodeRefs(vChild, isDestroy);
    });
  }
}

function hasChildNodes(children) {
  // SSR ONLY: check if there are any more nested child elements
  // if there aren't, this info is useful so the client runtime
  // doesn't have to climb down and check so many elements
  if (children) {
    for (var i = 0; i < children.length; i++) {
      if ('slot' !== children[i].vtag || hasChildNodes(children[i].vchildren)) {
        return true;
      }
    }
  }
  return false;
}

function createQueueClient(App, win) {
  var now = function() {
    return win.performance.now();
  };
  var resolved = Promise.resolve();
  var highPriority = [];
  var domReads = [];
  var domWrites = [];
  var domWritesLow = [];
  var congestion = 0;
  var rafPending = false;
  App.raf || (App.raf = win.requestAnimationFrame.bind(win));
  function consume(queue) {
    for (var i = 0; i < queue.length; i++) {
      try {
        queue[i]();
      } catch (e) {
        console.error(e);
      }
    }
    queue.length = 0;
  }
  function consumeTimeout(queue, timeout) {
    var i = 0;
    while (i < queue.length && now() < timeout) {
      try {
        queue[i++]();
      } catch (e) {
        console.error(e);
      }
    }
    i === queue.length ? queue.length = 0 : 0 !== i && queue.splice(0, i);
  }
  function flush() {
    congestion++;
    // always force a bunch of medium callbacks to run, but still have
    // a throttle on how many can run in a certain time
    // DOM READS!!!
        consume(domReads);
    var start = now() + 7 * Math.ceil(congestion * (1 / 22));
    // DOM WRITES!!!
        consumeTimeout(domWrites, start);
    consumeTimeout(domWritesLow, start);
    if (domWrites.length > 0) {
      domWritesLow.push.apply(domWritesLow, domWrites);
      domWrites.length = 0;
    }
    (rafPending = domReads.length + domWrites.length + domWritesLow.length > 0) ? 
    // still more to do yet, but we've run out of time
    // let's let this thing cool off and try again in the next tick
    App.raf(flush) : congestion = 0;
  }
  return {
    tick: function(cb) {
      // queue high priority work to happen in next tick
      // uses Promise.resolve() for next tick
      highPriority.push(cb);
      1 === highPriority.length && resolved.then(function() {
        return consume(highPriority);
      });
    },
    read: function(cb) {
      // queue dom reads
      domReads.push(cb);
      if (!rafPending) {
        rafPending = true;
        App.raf(flush);
      }
    },
    write: function(cb) {
      // queue dom writes
      domWrites.push(cb);
      if (!rafPending) {
        rafPending = true;
        App.raf(flush);
      }
    }
  };
}

function initElementListeners(plt, elm) {
  // so the element was just connected, which means it's in the DOM
  // however, the component instance hasn't been created yet
  // but what if an event it should be listening to get emitted right now??
  // let's add our listeners right now to our element, and if it happens
  // to receive events between now and the instance being created let's
  // queue up all of the event data and fire it off on the instance when it's ready
  var cmpMeta = plt.getComponentMeta(elm);
  cmpMeta.listenersMeta && 
  // we've got listens
  cmpMeta.listenersMeta.forEach(function(listenMeta) {
    // go through each listener
    listenMeta.eventDisabled || 
    // only add ones that are not already disabled
    plt.domApi.$addEventListener(elm, listenMeta.eventName, createListenerCallback(plt, elm, listenMeta.eventMethodName), listenMeta.eventCapture, listenMeta.eventPassive);
  });
}

function createListenerCallback(plt, elm, eventMethodName, val) {
  // create the function that gets called when the element receives
  // an event which it should be listening for
  return function(ev) {
    // get the instance if it exists
    val = plt.instanceMap.get(elm);
    if (val) {
      // instance is ready, let's call it's member method for this event
      val[eventMethodName](ev);
    } else {
      // instance is not ready!!
      // let's queue up this event data and replay it later
      // when the instance is ready
      val = plt.queuedEvents.get(elm) || [];
      val.push(eventMethodName, ev);
      plt.queuedEvents.set(elm, val);
    }
  };
}

function enableEventListener(plt, instance, eventName, shouldEnable, attachTo, passive) {
  if (instance) {
    // cool, we've got an instance, it's get the element it's on
    var elm = plt.hostElementMap.get(instance);
    var cmpMeta = plt.getComponentMeta(elm);
    if (cmpMeta && cmpMeta.listenersMeta) {
      // alrighty, so this cmp has listener meta
      if (shouldEnable) {
        // we want to enable this event
        // find which listen meta we're talking about
        var listenMeta_1 = cmpMeta.listenersMeta.find(function(l) {
          return l.eventName === eventName;
        });
        listenMeta_1 && 
        // found the listen meta, so let's add the listener
        plt.domApi.$addEventListener(elm, eventName, function(ev) {
          return instance[listenMeta_1.eventMethodName](ev);
        }, listenMeta_1.eventCapture, void 0 === passive ? listenMeta_1.eventPassive : !!passive, attachTo);
      } else {
        // we're disabling the event listener
        // so let's just remove it entirely
        plt.domApi.$removeEventListener(elm, eventName);
      }
    }
  }
}

function generateDevInspector(App, namespace, win, plt) {
  var devInspector = win.devInspector = win.devInspector || {};
  devInspector.apps = devInspector.apps || [];
  devInspector.apps.push(generateDevInspectorApp(App, namespace, plt));
  devInspector.getInstance || (devInspector.getInstance = function(elm) {
    return Promise.all(devInspector.apps.map(function(app) {
      return app.getInstance(elm);
    })).then(function(results) {
      return results.find(function(instance) {
        return !!instance;
      });
    });
  });
  devInspector.getComponents || (devInspector.getComponents = function() {
    var appsMetadata = [];
    devInspector.apps.forEach(function(app) {
      appsMetadata.push(app.getComponents());
    });
    return Promise.all(appsMetadata).then(function(appMetadata) {
      var allMetadata = [];
      appMetadata.forEach(function(metadata) {
        metadata.forEach(function(m) {
          allMetadata.push(m);
        });
      });
      return allMetadata;
    });
  });
  return devInspector;
}

function generateDevInspectorApp(App, namespace, plt) {
  var app = {
    namespace: namespace,
    getInstance: function(elm) {
      if (elm && elm.tagName) {
        return Promise.all([ getComponentMeta(plt, elm.tagName), getComponentInstance(plt, elm) ]).then(function(results) {
          if (results[0] && results[1]) {
            var cmp = {
              meta: results[0],
              instance: results[1]
            };
            return cmp;
          }
          return null;
        });
      }
      return Promise.resolve(null);
    },
    getComponent: function(tagName) {
      return getComponentMeta(plt, tagName);
    },
    getComponents: function() {
      return Promise.all(App.components.map(function(cmp) {
        return getComponentMeta(plt, cmp[0]);
      })).then(function(metadata) {
        return metadata.filter(function(m) {
          return m;
        });
      });
    }
  };
  return app;
}

function getMembersMeta(properties) {
  return Object.keys(properties).reduce(function(membersMap, memberKey) {
    var prop = properties[memberKey];
    var category;
    var member = {
      name: memberKey
    };
    if (prop.state) {
      category = 'states';
      member.watchers = prop.watchCallbacks || [];
    } else if (prop.elementRef) {
      category = 'elements';
    } else if (prop.method) {
      category = 'methods';
    } else {
      category = 'props';
      var type = 'any';
      if (prop.type) {
        type = prop.type;
        'function' === typeof prop.type && (type = prop.type.name);
      }
      member.type = type.toLowerCase();
      member.mutable = prop.mutable || false;
      member.connect = prop.connect || '-';
      member.context = prop.connect || '-';
      member.watchers = prop.watchCallbacks || [];
    }
    membersMap[category].push(member);
    return membersMap;
  }, {
    props: [],
    states: [],
    elements: [],
    methods: []
  });
}

function getComponentMeta(plt, tagName) {
  var elm = {
    nodeName: tagName
  };
  var internalMeta = plt.getComponentMeta(elm);
  if (!internalMeta || !internalMeta.componentConstructor) {
    return Promise.resolve(null);
  }
  var cmpCtr = internalMeta.componentConstructor;
  var members = getMembersMeta(cmpCtr.properties || {});
  var listeners = (internalMeta.listenersMeta || []).map(function(listenerMeta) {
    return {
      event: listenerMeta.eventName,
      capture: listenerMeta.eventCapture,
      disabled: listenerMeta.eventDisabled,
      passive: listenerMeta.eventPassive,
      method: listenerMeta.eventMethodName
    };
  });
  var emmiters = cmpCtr.events || [];
  var meta = Object.assign({
    tag: cmpCtr.is,
    bundle: internalMeta.bundleIds || 'unknown',
    encapsulation: cmpCtr.encapsulation || 'none'
  }, members, {
    events: {
      emmiters: emmiters,
      listeners: listeners
    }
  });
  return Promise.resolve(meta);
}

function getComponentInstance(plt, elm) {
  return Promise.resolve(plt.instanceMap.get(elm));
}

function initCoreComponentOnReady(plt, App, win, apps, queuedComponentOnReadys, i) {
  // add componentOnReady() to the App object
  // this also is used to know that the App's core is ready
  App.componentOnReady = function(elm, resolve) {
    if (!elm.nodeName.includes('-')) {
      resolve(null);
      return false;
    }
    var cmpMeta = plt.getComponentMeta(elm);
    if (cmpMeta) {
      if (plt.hasLoadedMap.has(elm)) {
        // element has already loaded, pass the resolve the element component
        // so we know that the resolve knows it this element is an app component
        resolve(elm);
      } else {
        // element hasn't loaded yet
        // add this resolve specifically to this elements on ready queue
        var onReadyCallbacks = plt.onReadyCallbacksMap.get(elm) || [];
        onReadyCallbacks.push(resolve);
        plt.onReadyCallbacksMap.set(elm, onReadyCallbacks);
      }
    }
    // return a boolean if this app recognized this element or not
        return !!cmpMeta;
  };
  if (queuedComponentOnReadys) {
    // we've got some componentOnReadys in the queue before the app was ready
    for (i = queuedComponentOnReadys.length - 1; i >= 0; i--) {
      // go through each element and see if this app recongizes it
      App.componentOnReady(queuedComponentOnReadys[i][0], queuedComponentOnReadys[i][1]) && 
      // turns out this element belongs to this app
      // remove the resolve from the queue so in the end
      // all that's left in the queue are elements not apart of any apps
      queuedComponentOnReadys.splice(i, 1);
    }
    for (i = 0; i < apps.length; i++) {
      if (!win[apps[i]].componentOnReady) {
        // there is at least 1 apps that isn't ready yet
        // so let's stop here cuz there's still app cores loading
        return;
      }
    }
    // if we got to this point then that means all of the apps are ready
    // and they would have removed any of their elements from queuedComponentOnReadys
    // so let's do the cleanup of the  remaining queuedComponentOnReadys
        for (i = 0; i < queuedComponentOnReadys.length; i++) {
      // resolve any queued componentsOnReadys that are left over
      // since these elements were not apart of any apps
      // call the resolve fn, but pass null so it's know this wasn't a known app component
      queuedComponentOnReadys[i][1](null);
    }
    queuedComponentOnReadys.length = 0;
  }
}

function attributeChangedCallback(membersMeta, elm, attribName, oldVal, newVal, propName, memberMeta) {
  // only react if the attribute values actually changed
  if (membersMeta && oldVal !== newVal) {
    // using the known component meta data
    // look up to see if we have a property wired up to this attribute name
    for (propName in membersMeta) {
      memberMeta = membersMeta[propName];
      // normalize the attribute name w/ lower case
            if (memberMeta.attribName && toLowerCase(memberMeta.attribName) === toLowerCase(attribName)) {
        // cool we've got a prop using this attribute name, the value will
        // be a string, so let's convert it to the correct type the app wants
        elm[propName] = parsePropertyValue(memberMeta.propType, newVal);
        break;
      }
    }
  }
}

function initHostSnapshot(domApi, cmpMeta, hostElm, hostSnapshot, attribName) {
  // the host element has connected to the dom
  // and we've waited a tick to make sure all frameworks
  // have finished adding attributes and child nodes to the host
  // before we go all out and hydrate this beast
  // let's first take a snapshot of its original layout before render
  hostElm.mode || (
  // looks like mode wasn't set as a property directly yet
  // first check if there's an attribute
  // next check the app's global
  hostElm.mode = domApi.$getMode(hostElm));
  // if the slot polyfill is required we'll need to put some nodes
  // in here to act as original content anchors as we move nodes around
  // host element has been connected to the DOM
  if (!hostElm['s-cr'] && !domApi.$getAttribute(hostElm, SSR_VNODE_ID) && (!domApi.$supportsShadowDom || 1 /* ShadowDom */ !== cmpMeta.encapsulation)) {
    // only required when we're NOT using native shadow dom (slot)
    // or this browser doesn't support native shadow dom
    // and this host element was NOT created with SSR
    // let's pick out the inner content for slot projection
    // create a node to represent where the original
    // content was first placed, which is useful later on
    hostElm['s-cr'] = domApi.$createTextNode('');
    hostElm['s-cr']['s-cn'] = true;
    domApi.$insertBefore(hostElm, hostElm['s-cr'], domApi.$childNodes(hostElm)[0]);
  }
  if (!domApi.$supportsShadowDom && 1 /* ShadowDom */ === cmpMeta.encapsulation) {
    true;
    // it's possible we're manually forcing the slot polyfill
    // but this browser may already support the read-only shadowRoot
    // do an extra check here, but only for dev mode on the client
    'shadowRoot' in HTMLElement.prototype || (hostElm.shadowRoot = hostElm);
  }
  if (1 /* ShadowDom */ === cmpMeta.encapsulation && domApi.$supportsShadowDom) {
    hostElm.shadowRoot && console.error('shadowRoot already attached to: ' + cmpMeta.tagNameMeta);
    domApi.$attachShadow(hostElm, {
      mode: 'open'
    });
  }
  // create a host snapshot object we'll
  // use to store all host data about to be read later
  hostSnapshot = {
    $id: hostElm['s-id'],
    $attributes: {}
  };
  // loop through and gather up all the original attributes on the host
  // this is useful later when we're creating the component instance
    cmpMeta.membersMeta && Object.keys(cmpMeta.membersMeta).forEach(function(memberName) {
    (attribName = cmpMeta.membersMeta[memberName].attribName) && (hostSnapshot.$attributes[attribName] = domApi.$getAttribute(hostElm, attribName));
  });
  return hostSnapshot;
}

function connectedCallback(plt, cmpMeta, elm) {
  // initialize our event listeners on the host element
  // we do this now so that we can listening to events that may
  // have fired even before the instance is ready
  if (!plt.hasListenersMap.has(elm)) {
    // it's possible we've already connected
    // then disconnected
    // and the same element is reconnected again
    plt.hasListenersMap.set(elm, true);
    initElementListeners(plt, elm);
  }
  // this element just connected, which may be re-connecting
  // ensure we remove it from our map of disconnected
  plt.isDisconnectedMap.delete(elm);
  if (!plt.hasConnectedMap.has(elm)) {
    // first time we've connected
    plt.hasConnectedMap.set(elm, true);
    elm['s-id'] || (
    // assign a unique id to this host element
    // it's possible this was already given an element id
    elm['s-id'] = plt.nextId());
    // register this component as an actively
    // loading child to its parent component
        registerWithParentComponent(plt, elm);
    // add to the queue to load the bundle
    // it's important to have an async tick in here so we can
    // ensure the "mode" attribute has been added to the element
    // place in high priority since it's not much work and we need
    // to know as fast as possible, but still an async tick in between
        plt.queue.tick(function() {
      // start loading this component mode's bundle
      // if it's already loaded then the callback will be synchronous
      return plt.requestBundle(cmpMeta, elm, initHostSnapshot(plt.domApi, cmpMeta, elm));
    });
  }
}

function registerWithParentComponent(plt, elm, ancestorHostElement) {
  // find the first ancestor host element (if there is one) and register
  // this element as one of the actively loading child elements for its ancestor
  ancestorHostElement = elm;
  while (ancestorHostElement = plt.domApi.$parentElement(ancestorHostElement)) {
    // climb up the ancestors looking for the first registered component
    if (plt.isDefinedComponent(ancestorHostElement)) {
      // we found this elements the first ancestor host element
      // if the ancestor already loaded then do nothing, it's too late
      if (!plt.hasLoadedMap.has(elm)) {
        // keep a reference to this element's ancestor host element
        // elm._ancestorHostElement = ancestorHostElement;
        plt.ancestorHostElementMap.set(elm, ancestorHostElement);
        // ensure there is an array to contain a reference to each of the child elements
        // and set this element as one of the ancestor's child elements it should wait on
                ancestorHostElement.$activeLoading && (
        // $activeLoading deprecated 2018-04-02
        ancestorHostElement['s-ld'] = ancestorHostElement.$activeLoading);
        (ancestorHostElement['s-ld'] = ancestorHostElement['s-ld'] || []).push(elm);
      }
      break;
    }
  }
}

function disconnectedCallback(plt, elm) {
  // only disconnect if we're not temporarily disconnected
  // tmpDisconnected will happen when slot nodes are being relocated
  if (!plt.tmpDisconnected && isDisconnected(plt.domApi, elm)) {
    // ok, let's officially destroy this thing
    // set this to true so that any of our pending async stuff
    // doesn't continue since we already decided to destroy this node
    // elm._hasDestroyed = true;
    plt.isDisconnectedMap.set(elm, true);
    // double check that we've informed the ancestor host elements
    // that they're good to go and loaded (cuz this one is on its way out)
        propagateComponentLoaded(plt, elm);
    // since we're disconnecting, call all of the JSX ref's with null
        callNodeRefs(plt.vnodeMap.get(elm), true);
    // detatch any event listeners that may have been added
    // because we're not passing an exact event name it'll
    // remove all of this element's event, which is good
        plt.domApi.$removeEventListener(elm);
    plt.hasListenersMap.delete(elm);
    // call instance componentDidUnload
    // if we've created an instance for this
    var instance = plt.instanceMap.get(elm);
    instance && 
    // call the user's componentDidUnload if there is one
    instance.componentDidUnload && instance.componentDidUnload();
    // clear CSS var-shim tracking
    plt.customStyle && plt.customStyle.removeHost(elm);
    // clear any references to other elements
    // more than likely we've already deleted these references
    // but let's double check there pal
        [ plt.ancestorHostElementMap, plt.onReadyCallbacksMap, plt.hostSnapshotMap ].forEach(function(wm) {
      return wm.delete(elm);
    });
  }
}

function isDisconnected(domApi, elm) {
  while (elm) {
    if (!domApi.$parentNode(elm)) {
      return 9 /* DocumentNode */ !== domApi.$nodeType(elm);
    }
    elm = domApi.$parentNode(elm);
  }
}

function proxyHostElementPrototype(plt, membersMeta, hostPrototype) {
  false;
  membersMeta && Object.keys(membersMeta).forEach(function(memberName) {
    // add getters/setters
    var member = membersMeta[memberName];
    var memberType = member.memberType;
    1 /* Prop */ === memberType || 2 /* PropMutable */ === memberType ? 
    // @Prop() or @Prop({ mutable: true })
    definePropertyGetterSetter(hostPrototype, memberName, function getHostElementProp() {
      // host element getter (cannot be arrow fn)
      // yup, ugly, srynotsry
      return (plt.valuesMap.get(this) || {})[memberName];
    }, function setHostElementProp(newValue) {
      // host element setter (cannot be arrow fn)
      setValue(plt, this, memberName, parsePropertyValue(member.propType, newValue));
    }) : 6 /* Method */ === memberType && 
    // @Method()
    // add a placeholder noop value on the host element's prototype
    // incase this method gets called before setup
    definePropertyValue(hostPrototype, memberName, noop);
  });
}

function initHostElement(plt, cmpMeta, HostElementConstructor, hydratedCssClass) {
  // let's wire up our functions to the host element's prototype
  // we can also inject our platform into each one that needs that api
  // note: these cannot be arrow functions cuz "this" is important here hombre
  HostElementConstructor.connectedCallback = function() {
    // coolsville, our host element has just hit the DOM
    connectedCallback(plt, cmpMeta, this);
  };
  HostElementConstructor.attributeChangedCallback = function(attribName, oldVal, newVal) {
    // the browser has just informed us that an attribute
    // on the host element has changed
    attributeChangedCallback(cmpMeta.membersMeta, this, attribName, oldVal, newVal);
  };
  HostElementConstructor.disconnectedCallback = function() {
    // the element has left the builing
    disconnectedCallback(plt, this);
  };
  HostElementConstructor['s-init'] = function() {
    initComponentLoaded(plt, this, hydratedCssClass);
  };
  HostElementConstructor.forceUpdate = function() {
    queueUpdate(plt, this);
  };
  // add getters/setters to the host element members
  // these would come from the @Prop and @Method decorators that
  // should create the public API to this component
    proxyHostElementPrototype(plt, cmpMeta.membersMeta, HostElementConstructor);
}

function proxyController(domApi, controllerComponents, ctrlTag) {
  return {
    'create': proxyProp(domApi, controllerComponents, ctrlTag, 'create'),
    'componentOnReady': proxyProp(domApi, controllerComponents, ctrlTag, 'componentOnReady')
  };
}

function proxyProp(domApi, controllerComponents, ctrlTag, proxyMethodName) {
  return function() {
    var args = arguments;
    return loadComponent(domApi, controllerComponents, ctrlTag).then(function(ctrlElm) {
      return ctrlElm[proxyMethodName].apply(ctrlElm, args);
    });
  };
}

function loadComponent(domApi, controllerComponents, ctrlTag) {
  var ctrlElm = controllerComponents[ctrlTag];
  ctrlElm || (ctrlElm = domApi.$body.querySelector(ctrlTag));
  if (!ctrlElm) {
    ctrlElm = controllerComponents[ctrlTag] = domApi.$createElement(ctrlTag);
    domApi.$appendChild(domApi.$body, ctrlElm);
  }
  return ctrlElm.componentOnReady();
}

function createPlatformMain(namespace, Context, win, doc, resourcesUrl, hydratedCssClass) {
  var cmpRegistry = {
    'html': {}
  };
  var controllerComponents = {};
  var App = win[namespace] = win[namespace] || {};
  var domApi = createDomApi(App, win, doc);
  // set App Context
    Context.isServer = Context.isPrerender = !(Context.isClient = true);
  Context.window = win;
  Context.location = win.location;
  Context.document = doc;
  Context.resourcesUrl = Context.publicPath = resourcesUrl;
  Context.enableListener = function(instance, eventName, enabled, attachTo, passive) {
    return enableEventListener(plt, instance, eventName, enabled, attachTo, passive);
  };
  Context.emit = function(elm, eventName, data) {
    return domApi.$dispatchEvent(elm, Context.eventNameFn ? Context.eventNameFn(eventName) : eventName, data);
  };
  // add the h() fn to the app's global namespace
  App.h = h;
  App.Context = Context;
  // keep a global set of tags we've already defined
  // DEPRECATED $definedCmps 2018-05-22
    var globalDefined = win['s-defined'] = win.$definedCmps = win['s-defined'] || win.$definedCmps || {};
  // internal id increment for unique ids
    var ids = 0;
  // create the platform api which is used throughout common core code
    var plt = {
    domApi: domApi,
    defineComponent: defineComponent,
    emitEvent: Context.emit,
    getComponentMeta: function(elm) {
      return cmpRegistry[domApi.$tagName(elm)];
    },
    getContextItem: function(contextKey) {
      return Context[contextKey];
    },
    isClient: true,
    isDefinedComponent: function(elm) {
      return !!(globalDefined[domApi.$tagName(elm)] || plt.getComponentMeta(elm));
    },
    nextId: function() {
      return namespace + ids++;
    },
    onError: function(err, type, elm) {
      return console.error(err, type, elm && elm.tagName);
    },
    propConnect: function(ctrlTag) {
      return proxyController(domApi, controllerComponents, ctrlTag);
    },
    queue: Context.queue = createQueueClient(App, win),
    requestBundle: requestBundle,
    ancestorHostElementMap: new WeakMap(),
    componentAppliedStyles: new WeakMap(),
    hasConnectedMap: new WeakMap(),
    hasListenersMap: new WeakMap(),
    hasLoadedMap: new WeakMap(),
    hostElementMap: new WeakMap(),
    hostSnapshotMap: new WeakMap(),
    instanceMap: new WeakMap(),
    isDisconnectedMap: new WeakMap(),
    isQueuedForUpdate: new WeakMap(),
    onReadyCallbacksMap: new WeakMap(),
    queuedEvents: new WeakMap(),
    vnodeMap: new WeakMap(),
    valuesMap: new WeakMap()
  };
  // create the renderer that will be used
    plt.render = createRendererPatch(plt, domApi);
  // setup the root element which is the mighty <html> tag
  // the <html> has the final say of when the app has loaded
    var rootElm = domApi.$documentElement;
  rootElm['s-ld'] = [];
  rootElm['s-rn'] = true;
  // this will fire when all components have finished loaded
    rootElm['s-init'] = function() {
    plt.hasLoadedMap.set(rootElm, App.loaded = plt.isAppLoaded = true);
    domApi.$dispatchEvent(win, 'appload', {
      detail: {
        namespace: namespace
      }
    });
  };
  false;
  function defineComponent(cmpMeta, HostElementConstructor) {
    if (!win.customElements.get(cmpMeta.tagNameMeta)) {
      // define the custom element
      // initialize the members on the host element prototype
      // keep a ref to the metadata with the tag as the key
      initHostElement(plt, cmpRegistry[cmpMeta.tagNameMeta] = cmpMeta, HostElementConstructor.prototype, hydratedCssClass);
      // add which attributes should be observed
      var observedAttributes = HostElementConstructor.observedAttributes = [];
      // at this point the membersMeta only includes attributes which should
      // be observed, it does not include all props yet, so it's safe to
      // loop through all of the props (attrs) and observed them
            for (var propName in cmpMeta.membersMeta) {
        cmpMeta.membersMeta[propName].attribName && observedAttributes.push(
        // add this attribute to our array of attributes we need to observe
        cmpMeta.membersMeta[propName].attribName);
      }
      win.customElements.define(cmpMeta.tagNameMeta, HostElementConstructor);
    }
  }
  function requestBundle(cmpMeta, elm) {
    if (cmpMeta.componentConstructor) {
      // we're already all loaded up :)
      queueUpdate(plt, elm);
    } else {
      true;
      // using a 3rd party bundler to import modules
      // at this point the cmpMeta will already have a
      // static function as a the bundleIds that returns the module
      var moduleOpts = {
        mode: elm.mode,
        scoped: 2 /* ScopedCss */ === cmpMeta.encapsulation || 1 /* ShadowDom */ === cmpMeta.encapsulation && !domApi.$supportsShadowDom
      };
      cmpMeta.bundleIds(moduleOpts).then(function(cmpConstructor) {
        // async loading of the module is done
        try {
          // get the component constructor from the module
          // initialize this component constructor's styles
          // it is possible for the same component to have difficult styles applied in the same app
          initStyleTemplate(domApi, cmpMeta, cmpMeta.componentConstructor = cmpConstructor);
        } catch (e) {
          // oh man, something's up
          console.error(e);
          // provide a bogus component constructor
          // so the rest of the app acts as normal
                    cmpMeta.componentConstructor = /** @class */ function() {
            function componentConstructor() {}
            return componentConstructor;
          }();
        }
        // bundle all loaded up, let's continue
                queueUpdate(plt, elm);
      });
    }
  }
  plt.attachStyles = function(plt, domApi, cmpMeta, elm) {
    attachStyles(plt, domApi, cmpMeta, elm);
  };
  generateDevInspector(App, namespace, win, plt);
  false;
  // create the componentOnReady fn
  initCoreComponentOnReady(plt, App, win, win['s-apps'], win['s-cr']);
  // notify that the app has initialized and the core script is ready
  // but note that the components have not fully loaded yet
    App.initialized = true;
  return plt;
}

var pltMap = {};

var initCmpOnReady = false;

function defineCustomElement(win, cmpData, opts) {
  void 0 === opts && (opts = {});
  cmpData = Array.isArray(cmpData) ? cmpData : [ cmpData ];
  var doc = win.document;
  var hydratedCssClass = opts.hydratedCssClass || 'hydrated';
  var styleCmps = cmpData.filter(function(c) {
    return c[2];
  }).map(function(c) {
    return c[0];
  });
  if (styleCmps.length) {
    // auto hide components until they been fully hydrated
    // reusing the "x" and "i" variables from the args for funzies
    var styleElm = doc.createElement('style');
    styleElm.innerHTML = styleCmps.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
    styleElm.setAttribute('data-styles', '');
    doc.head.insertBefore(styleElm, doc.head.firstChild);
  }
  var namespace = opts.namespace || 'WidgetComponents';
  if (!initCmpOnReady) {
    initCmpOnReady = true;
    createComponentOnReadyPrototype(win, namespace, win.HTMLElement.prototype);
  }
  applyPolyfills(win, function() {
    if (!pltMap[namespace]) {
      var Context = {};
      var resourcesUrl = opts.resourcesUrl || './';
      appGlobal(namespace, Context, win, doc, resourcesUrl, hydratedCssClass);
      // create a platform for this namespace
            pltMap[namespace] = createPlatformMain(namespace, Context, win, doc, resourcesUrl, hydratedCssClass);
    }
    // polyfills have been applied if need be
        cmpData.forEach(function(c) {
      var HostElementConstructor;
      if (isNative(win.customElements.define)) {
        // native custom elements supported
        var createHostConstructor = new Function('w', 'return class extends w.HTMLElement{}');
        HostElementConstructor = createHostConstructor(win);
      } else {
        // using polyfilled custom elements
        HostElementConstructor = function(self) {
          return win.HTMLElement.call(this, self);
        };
        HostElementConstructor.prototype = Object.create(win.HTMLElement.prototype, {
          constructor: {
            value: HostElementConstructor,
            configurable: true
          }
        });
      }
      // convert the static constructor data to cmp metadata
      // define the component as a custom element
            pltMap[namespace].defineComponent(parseComponentLoader(c), HostElementConstructor);
    });
  });
}

function isNative(fn) {
  return /\{\s*\[native code\]\s*\}/.test('' + fn);
}

export { defineCustomElement, h };