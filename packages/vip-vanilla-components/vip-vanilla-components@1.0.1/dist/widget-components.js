/*!
 * Built with http://stenciljs.com
 * 2019-05-14T21:55:10
 */
(function(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

  function init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCorePolyfilled, hydratedCssClass, components, HTMLElementPrototype, App, x, y, scriptElm) {
    // create global namespace if it doesn't already exist
    App = win[namespace] = win[namespace] || {};
    App.components = components;
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype);
    resourcesUrl = resourcesUrl || App.resourcesUrl;
    // figure out the script element for this current script
    y = doc.querySelectorAll('script');
    for (x = y.length - 1; x >= 0; x--) {
        scriptElm = y[x];
        if (scriptElm.src || scriptElm.hasAttribute('data-resources-url')) {
            break;
        }
    }
    // get the resource path attribute on this script element
    y = scriptElm.getAttribute('data-resources-url');
    if (!resourcesUrl && y) {
        // the script element has a data-resources-url attribute, always use that
        resourcesUrl = y;
    }
    if (!resourcesUrl && scriptElm.src) {
        // we don't have an exact resourcesUrl, so let's
        // figure it out relative to this script's src and app's filesystem namespace
        y = scriptElm.src.split('/').slice(0, -1);
        resourcesUrl = (y.join('/')) + (y.length ? '/' : '') + fsNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    if (usePolyfills(win, win.location, x, 'import("")')) {
        // requires the es5/polyfilled core
        x.src = resourcesUrl + appCorePolyfilled;
    }
    else {
        // let's do this!
        x.src = resourcesUrl + appCore;
        x.setAttribute('type', 'module');
        x.setAttribute('crossorigin', true);
    }
    x.setAttribute('data-resources-url', resourcesUrl);
    x.setAttribute('data-namespace', fsNamespace);
    doc.head.appendChild(x);
}
function usePolyfills(win, location, scriptElm, dynamicImportTest) {
    // fyi, dev mode has verbose if/return statements
    // but it minifies to a nice 'lil one-liner ;)
    if (location.search.indexOf('core=esm') > 0) {
        // force esm build
        return false;
    }
    if ((location.search.indexOf('core=es5') > 0) ||
        (location.protocol === 'file:') ||
        (!(win.customElements && win.customElements.define)) ||
        (!win.fetch) ||
        (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) ||
        (!('noModule' in scriptElm))) {
        // es5 build w/ polyfills
        return true;
    }
    // final test to see if this browser support dynamic imports
    return doesNotSupportsDynamicImports(dynamicImportTest);
}
function doesNotSupportsDynamicImports(dynamicImportTest) {
    try {
        new Function(dynamicImportTest);
        return false;
    }
    catch (e) { }
    return true;
}
function createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype) {
    (win['s-apps'] = win['s-apps'] || []).push(namespace);
    if (!HTMLElementPrototype.componentOnReady) {
        HTMLElementPrototype.componentOnReady = function componentOnReady() {
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
                        (win['s-cr'] = win['s-cr'] || []).push([elm, resolve]);
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
            return { then: executor };
        };
    }
}


  init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

  })(window, document, "WidgetComponents","widget-components",0,"widget-components.core.js","es5-build-disabled.js","hydrated",[["sqh-close-button","sqh-close-button",1,[["closeButton",7],["text",1,0,1,2]],0,[["click","handleClick"]]],["sqh-copy-button","sqh-copy-button",1,[["backgroundcolor",1,0,1,2],["borderradius",1,0,1,4],["codefontcolor",1,0,1,2],["codefontsize",1,0,1,4],["copyfailure",1,0,1,2],["copysuccess",1,0,1,2],["fontsize",1,0,1,4],["fueltankcode",5],["ishidden",1,0,1,3],["rewardkey",1,0,1,2],["text",1,0,1,2],["textcolor",1,0,1,2],["width",1,0,1,4]]],["sqh-copy-link-button","sqh-copy-link-button",1,[["buttoncolor",1,0,1,2],["copyfailure",1,0,1,2],["copysuccess",1,0,1,2],["ishidden",1,0,1,3],["sharelink",5],["text",1,0,1,2],["textcolor",1,0,1,2]]],["sqh-cta-component","sqh-cta-component",1,[["background",1,0,1,2],["backgroundcolor",1,0,1,2],["borderradius",1,0,1,2],["color",1,0,1,2],["fontfamily",1,0,1,2],["fontsize",1,0,1,2],["fontweight",1,0,1,2],["height",1,0,1,2],["ishidden",1,0,1,3],["ismarkdown",1,0,1,3],["padding",1,0,1,2],["paddingbottom",1,0,1,2],["paddingtop",1,0,1,2],["text",1,0,1,2],["textEl",7],["textalign",1,0,1,2],["url",1,0,1,2],["width",1,0,1,2]]],["sqh-global-container","sqh-global-container",1,[["background",1,0,1,2],["fontfamily",1,0,1,2],["maxwidth",1,0,1,2],["poweredby",1,0,1,3]]],["sqh-image-component","sqh-image-component",1,[["alignment",1,0,1,2],["borderradius",1,0,1,4],["css",1,0,1,2],["ishidden",1,0,1,3],["url",1,0,1,2],["width",1,0,1,4]]],["sqh-partner-stat-component","sqh-partner-stat-component",1,[["elem",7],["ishidden",1,0,1,3],["statcolor",1,0,1,2],["statdescription",1,0,1,2],["stattype",1,0,1,2],["statvalue",1,0,1,2]]],["sqh-progress-indicator","sqh-progress-indicator",1,[["completedearnedmessage",1,0,1,2],["completedneededmessage",1,0,1,2],["completedpercentagecolor",1,0,1,2],["completedpresentcolor",1,0,1,2],["completedprogresscolor",1,0,1,2],["completedrewardedcolor",1,0,1,2],["completedtextcolor",1,0,1,2],["earnedMessage",5],["editormode",1,0,1,2],["inprogressearnedmessage",1,0,1,2],["inprogressneededmessage",1,0,1,2],["inprogresspercentagecolor",1,0,1,2],["inprogresspresentcolor",1,0,1,2],["inprogressprogresscolor",1,0,1,2],["inprogresstextcolor",1,0,1,2],["ishidden",1,0,1,3],["ismarkdown",1,0,1,3],["loading",5],["noprogresscolor",1,0,1,2],["noprogressearnedmessage",1,0,1,2],["noprogressneededmessage",1,0,1,2],["noprogresspercentagecolor",1,0,1,2],["noprogresspresentcolor",1,0,1,2],["noprogresstextcolor",1,0,1,2],["percentagesize",1,0,1,2],["progressMessage",5],["progresstype",1,0,1,2],["progresswidth",1,0,1,2],["rewardComplete",5],["rewardStats",5],["widgetMode",5]]],["sqh-referral-code","sqh-referral-code",1,[["referralcode",5]]],["sqh-referral-component","sqh-referral-component",1,[["referral",1],["referraltype",1,0,1,2],["referralvariables",1],["unknownuser",1]]],["sqh-referral-list","sqh-referral-component",1,[["cancelledcolor",1,0,1,2],["cancelledcontent",1,0,1,2],["cancelledvalue",1,0,1,2],["convertedcontent",1,0,1,2],["expiredcolor",1,0,1,2],["expiredcontent",1,0,1,2],["expiredvalue",1,0,1,2],["ishidden",1,0,1,3],["loading",5],["noreferralsyet",1,0,1,2],["offset",5],["paginateless",1,0,1,2],["paginatemore",1,0,1,2],["pendingcolor",1,0,1,2],["pendingcontent",1,0,1,2],["pendingvalue",1,0,1,2],["referralnamecolor",1,0,1,2],["referrals",5],["referralsCount",5],["referraltextcolor",1,0,1,2],["referredBy",5],["referrercontent",1,0,1,2],["referrervalue",1,0,1,2],["rewardcolor",1,0,1,2],["rewards",5],["showreferrer",1,0,1,3],["unknownuser",1,0,1,2],["usefirstreward",1,0,1,3],["valuecontent",1,0,1,2]]],["sqh-rewards-actions","sqh-rewards-actions",1,[["hidetext",1,0,1,2],["nexttext",1,0,1,2],["previoustext",1,0,1,2]]],["sqh-share-button","sqh-share-button",1,[["backgroundcolor",1,0,1,2],["button",7],["className",1,0,"class-name",2],["displayrule",1,0,1,2],["icon",1,0,1,2],["iconhorizontal",1,0,1,4],["iconsize",1,0,1,4],["iconvertical",1,0,1,4],["text",1,0,1,2],["textcolor",1,0,1,2],["type",1,0,1,2],["url",1,0,1,2]]],["sqh-share-button-container","sqh-share-button",1,[["emailbackgroundcolor",1,0,1,2],["emailclassName",1,0,"emailclass-name",2],["emaildisplayrule",1,0,1,2],["emailicon",1,0,1,2],["emailiconhorizontal",1,0,1,4],["emailiconsize",1,0,1,4],["emailiconvertical",1,0,1,4],["emailtext",1,0,1,2],["emailtextcolor",1,0,1,2],["emailurl",5],["facebookbackgroundcolor",1,0,1,2],["facebookclassName",1,0,"facebookclass-name",2],["facebookdisplayrule",1,0,1,2],["facebookicon",1,0,1,2],["facebookiconhorizontal",1,0,1,4],["facebookiconsize",1,0,1,4],["facebookiconvertical",1,0,1,4],["facebooktext",1,0,1,2],["facebooktextcolor",1,0,1,2],["facebookurl",5],["ishidden",1,0,1,3],["linebackgroundcolor",1,0,1,2],["lineclassName",1,0,"lineclass-name",2],["linedisplayrule",1,0,1,2],["lineicon",1,0,1,2],["lineiconhorizontal",1,0,1,4],["lineiconsize",1,0,1,4],["lineiconvertical",1,0,1,4],["linetext",1,0,1,2],["linetextcolor",1,0,1,2],["lineurl",5],["linkedinbackgroundcolor",1,0,1,2],["linkedinclassName",1,0,"linkedinclass-name",2],["linkedindisplayrule",1,0,1,2],["linkedinicon",1,0,1,2],["linkediniconhorizontal",1,0,1,4],["linkediniconsize",1,0,1,4],["linkediniconvertical",1,0,1,4],["linkedintext",1,0,1,2],["linkedintextcolor",1,0,1,2],["linkedinurl",5],["messengerbackgroundcolor",1,0,1,2],["messengerclassName",1,0,"messengerclass-name",2],["messengerdisplayrule",1,0,1,2],["messengericon",1,0,1,2],["messengericonhorizontal",1,0,1,4],["messengericonsize",1,0,1,4],["messengericonvertical",1,0,1,4],["messengertext",1,0,1,2],["messengertextcolor",1,0,1,2],["messengerurl",5],["pinterestbackgroundcolor",1,0,1,2],["pinterestclassName",1,0,"pinterestclass-name",2],["pinterestdisplayrule",1,0,1,2],["pinteresticon",1,0,1,2],["pinteresticonhorizontal",1,0,1,4],["pinteresticonsize",1,0,1,4],["pinteresticonvertical",1,0,1,4],["pinteresttext",1,0,1,2],["pinteresttextcolor",1,0,1,2],["pinteresturl",5],["smsbackgroundcolor",1,0,1,2],["smsclassName",1,0,"smsclass-name",2],["smsdisplayrule",1,0,1,2],["smsicon",1,0,1,2],["smsiconhorizontal",1,0,1,4],["smsiconsize",1,0,1,4],["smsiconvertical",1,0,1,4],["smstext",1,0,1,2],["smstextcolor",1,0,1,2],["smsurl",5],["twitterbackgroundcolor",1,0,1,2],["twitterclassName",1,0,"twitterclass-name",2],["twitterdisplayrule",1,0,1,2],["twittericon",1,0,1,2],["twittericonhorizontal",1,0,1,4],["twittericonsize",1,0,1,4],["twittericonvertical",1,0,1,4],["twittertext",1,0,1,2],["twittertextcolor",1,0,1,2],["twitterurl",5],["whatsappbackgroundcolor",1,0,1,2],["whatsappclassName",1,0,"whatsappclass-name",2],["whatsappdisplayrule",1,0,1,2],["whatsappicon",1,0,1,2],["whatsappiconhorizontal",1,0,1,4],["whatsappiconsize",1,0,1,4],["whatsappiconvertical",1,0,1,4],["whatsapptext",1,0,1,2],["whatsapptextcolor",1,0,1,2],["whatsappurl",5]]],["sqh-stat-component","sqh-stat-component",1,[["elem",7],["ishidden",1,0,1,3],["statcolor",1,0,1,2],["statdescription",1,0,1,2],["stattype",1,0,1,2],["statvalue",1,0,1,2]]],["sqh-stats-container","sqh-stats-container",1,[["container",7],["ishidden",1,0,1,3],["loading",5],["paddingbottom",1,0,1,2],["paddingtop",1,0,1,2],["stats",5]],0,[["statTypeUpdated","statTypeUpdatedHandler"],["statAdded","statAddedHandler"]]],["sqh-text-component","sqh-progress-indicator",1,[["background",1,0,1,2],["color",1,0,1,2],["fontfamily",1,0,1,2],["fontsize",1,0,1,2],["fontweight",1,0,1,2],["height",1,0,1,2],["ishidden",1,0,1,3],["ismarkdown",1,0,1,3],["padding",1,0,1,2],["paddingbottom",1,0,1,2],["paddingtop",1,0,1,2],["text",1,0,1,2],["textEl",7],["textalign",1,0,1,2]]]],HTMLElement.prototype);