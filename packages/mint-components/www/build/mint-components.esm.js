import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-832bd454.js';
import { g as globalScripts } from './app-globals-9190f787.js';
import './global-b1f18590.js';
import './stencil-hooks.module-f4b05383.js';
import './index.module-b74a7f69.js';
import './extends-c31f1eff.js';
import './insertcss-d82cf6d6.js';

/*
 Stencil Client Patch Browser v2.9.0 | MIT Licensed | https://stenciljs.com
 */
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-db0073f0.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], {
                    type: 'application/javascript',
                }));
                mod = new Promise((resolve) => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy(JSON.parse("[[\"sqm-referral-table\",[[1,\"sqm-referral-table\",{\"programId\":[1,\"program-id\"],\"perPage\":[2,\"per-page\"],\"showLabels\":[4,\"show-labels\"],\"prevLabel\":[1,\"prev-label\"],\"moreLabel\":[1,\"more-label\"],\"showReferrer\":[4,\"show-referrer\"],\"hiddenColumns\":[1,\"hidden-columns\"],\"smBreakpoint\":[2,\"sm-breakpoint\"],\"mdBreakpoint\":[2,\"md-breakpoint\"],\"emptyStateImgUrl\":[1,\"empty-state-img-url\"],\"emptyStateTitle\":[1,\"empty-state-title\"],\"emptyStateText\":[1,\"empty-state-text\"],\"demoData\":[16]}]]],[\"sqm-stencilbook\",[[4,\"sqm-stencilbook\",{\"ignored\":[32]}]]],[\"sqm-leaderboard\",[[1,\"sqm-leaderboard\",{\"usersheading\":[1],\"statsheading\":[1],\"rankheading\":[1],\"showRank\":[4,\"show-rank\"],\"showUser\":[4,\"show-user\"],\"emptyStateText\":[1,\"empty-state-text\"],\"rankType\":[1,\"rank-type\"],\"leaderboardType\":[1,\"leaderboard-type\"],\"anonymousUser\":[1,\"anonymous-user\"],\"interval\":[1],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-portal-reset-password\",[[1,\"sqm-portal-reset-password\",{\"nextPage\":[1,\"next-page\"],\"failedPage\":[1,\"failed-page\"],\"confirmPassword\":[4,\"confirm-password\"],\"resetPasswordHeader\":[1,\"reset-password-header\"],\"passwordResetHeader\":[1,\"password-reset-header\"],\"resetPasswordButtonText\":[1,\"reset-password-button-text\"],\"continueButtonText\":[1,\"continue-button-text\"],\"confirmPasswordFieldLabel\":[1,\"confirm-password-field-label\"],\"passwordFieldLabel\":[1,\"password-field-label\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-portal-email-verification\",[[1,\"sqm-portal-email-verification\",{\"redirectPath\":[1,\"redirect-path\"],\"emailVerificationHeader\":[1,\"email-verification-header\"],\"resendEmailButtonText\":[1,\"resend-email-button-text\"],\"verifyMessage\":[1,\"verify-message\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-portal-forgot-password\",[[1,\"sqm-portal-forgot-password\",{\"redirectPath\":[1,\"redirect-path\"],\"emailLabel\":[1,\"email-label\"],\"submitLabel\":[1,\"submit-label\"],\"loginPath\":[1,\"login-path\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-portal-profile\",[[1,\"sqm-portal-profile\",{\"firstnametext\":[1],\"lastnametext\":[1],\"emailtext\":[1],\"countrytext\":[1],\"editProfileHeader\":[1,\"edit-profile-header\"],\"editProfileSubHeader\":[1,\"edit-profile-sub-header\"],\"submitChangeButtonText\":[1,\"submit-change-button-text\"],\"showCountry\":[4,\"show-country\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-portal-verify-email\",[[1,\"sqm-portal-verify-email\",{\"nextPage\":[1,\"next-page\"],\"failedPage\":[1,\"failed-page\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-referral-table-column\",[[1,\"sqm-referral-table-column\",{\"columnTitle\":[1,\"column-title\"],\"renderCell\":[64],\"renderLabel\":[64]}]]],[\"sqm-asset-card\",[[1,\"sqm-asset-card\",{\"titleText\":[1,\"title-text\"],\"imgUrl\":[1,\"img-url\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-big-stat\",[[1,\"sqm-big-stat\",{\"statType\":[1,\"stat-type\"],\"flexReverse\":[4,\"flex-reverse\"],\"alignment\":[1],\"programId\":[1,\"program-id\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-graphql-client-provider\",[[4,\"sqm-graphql-client-provider\",{\"domain\":[1],\"ignored\":[32]}]]],[\"sqm-hero\",[[1,\"sqm-hero\",{\"columns\":[2],\"background\":[1],\"paddingSize\":[1,\"padding-size\"],\"secondaryBackground\":[1,\"secondary-background\"],\"wrapDirection\":[1,\"wrap-direction\"]}]]],[\"sqm-leaderboard-rank\",[[1,\"sqm-leaderboard-rank\",{\"rankType\":[1,\"rank-type\"],\"rankText\":[1,\"rank-text\"],\"leaderboardType\":[1,\"leaderboard-type\"],\"unrankedText\":[1,\"unranked-text\"],\"interval\":[1],\"demoData\":[16]}]]],[\"sqm-name-fields\",[[0,\"sqm-name-fields\",{\"firstNameLabel\":[1,\"first-name-label\"],\"lastNameLabel\":[1,\"last-name-label\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-navigation-sidebar\",[[1,\"sqm-navigation-sidebar\",{\"ignored\":[32]}]]],[\"sqm-navigation-sidebar-item\",[[1,\"sqm-navigation-sidebar-item\",{\"path\":[1],\"icon\":[1],\"label\":[1],\"demoData\":[16]}]]],[\"sqm-popup-container\",[[4,\"sqm-popup-container\",{\"poweredBy\":[4,\"powered-by\"],\"closeButton\":[4,\"close-button\"],\"closeButtonText\":[1,\"close-button-text\"],\"embedPadding\":[1,\"embed-padding\"],\"popupPadding\":[1,\"popup-padding\"]}]]],[\"sqm-portal-footer\",[[1,\"sqm-portal-footer\",{\"supportEmail\":[1,\"support-email\"],\"supportText\":[1,\"support-text\"],\"termsLink\":[1,\"terms-link\"],\"termsText\":[1,\"terms-text\"],\"faqLink\":[1,\"faq-link\"],\"faqText\":[1,\"faq-text\"],\"showPoweredBy\":[4,\"show-powered-by\"],\"poweredByLink\":[1,\"powered-by-link\"],\"paddingTop\":[1,\"padding-top\"],\"paddingRight\":[1,\"padding-right\"],\"paddingBottom\":[1,\"padding-bottom\"],\"paddingLeft\":[1,\"padding-left\"],\"ignored\":[32]}]]],[\"sqm-portal-logout\",[[1,\"sqm-portal-logout\",{\"nextPage\":[1,\"next-page\"],\"ignored\":[32]}]]],[\"sqm-portal-protected-route\",[[1,\"sqm-portal-protected-route\",{\"redirectTo\":[1,\"redirect-to\"],\"requireEmailVerification\":[4,\"require-email-verification\"],\"redirectToUnverified\":[1,\"redirect-to-unverified\"],\"ignored\":[32]}]]],[\"sqm-refresh-button\",[[1,\"sqm-refresh-button\",{\"icon\":[1]}]]],[\"sqm-route\",[[1,\"sqm-route\",{\"path\":[1],\"ignored\":[32]}]]],[\"sqm-stat-container\",[[1,\"sqm-stat-container\",{\"space\":[1],\"ignored\":[32]}]]],[\"sqm-text-span\",[[0,\"sqm-text-span\",{\"text\":[1],\"type\":[1],\"ignored\":[32]}]]],[\"sqm-portal-change-password\",[[1,\"sqm-portal-change-password\",{\"modalChangePasswordHeader\":[1,\"modal-change-password-header\"],\"cancelText\":[1,\"cancel-text\"],\"changePasswordButtonText\":[1,\"change-password-button-text\"],\"passwordFieldLabel\":[1,\"password-field-label\"],\"confirmPasswordFieldLabel\":[1,\"confirm-password-field-label\"],\"successMessage\":[1,\"success-message\"],\"portalChangePasswordHeader\":[1,\"portal-change-password-header\"],\"portalChangePasswordButtonText\":[1,\"portal-change-password-button-text\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-portal-register\",[[1,\"sqm-portal-register\",{\"nextPage\":[1,\"next-page\"],\"redirectPath\":[1,\"redirect-path\"],\"emailLabel\":[1,\"email-label\"],\"passwordLabel\":[1,\"password-label\"],\"submitLabel\":[1,\"submit-label\"],\"loginLabel\":[1,\"login-label\"],\"confirmPasswordLabel\":[1,\"confirm-password-label\"],\"confirmPassword\":[4,\"confirm-password\"],\"enablePasswordValidation\":[4,\"enable-password-validation\"],\"hideInputs\":[4,\"hide-inputs\"],\"pageLabel\":[1,\"page-label\"],\"loginPath\":[1,\"login-path\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-rewards-table\",[[1,\"sqm-rewards-table\",{\"programId\":[1,\"program-id\"],\"perPage\":[2,\"per-page\"],\"showLabels\":[4,\"show-labels\"],\"prevLabel\":[1,\"prev-label\"],\"moreLabel\":[1,\"more-label\"],\"hiddenColumns\":[1,\"hidden-columns\"],\"smBreakpoint\":[2,\"sm-breakpoint\"],\"mdBreakpoint\":[2,\"md-breakpoint\"],\"emptyStateImgUrl\":[1,\"empty-state-img-url\"],\"emptyStateTitle\":[1,\"empty-state-title\"],\"emptyStateText\":[1,\"empty-state-text\"],\"demoData\":[16]}]]],[\"sqm-edit-profile\",[[1,\"sqm-edit-profile\",{\"editprofileheader\":[1],\"editprofiletext\":[1],\"canceltext\":[1],\"updatetext\":[1],\"firstnametext\":[1],\"lastnametext\":[1],\"currentregiontext\":[1],\"showregion\":[4],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-portal-login\",[[1,\"sqm-portal-login\",{\"nextPage\":[1,\"next-page\"],\"emailLabel\":[1,\"email-label\"],\"passwordLabel\":[1,\"password-label\"],\"submitLabel\":[1,\"submit-label\"],\"forgotPasswordLabel\":[1,\"forgot-password-label\"],\"registerLabel\":[1,\"register-label\"],\"pageLabel\":[1,\"page-label\"],\"registerPath\":[1,\"register-path\"],\"forgotPasswordPath\":[1,\"forgot-password-path\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-referral-table-date-column\",[[1,\"sqm-referral-table-date-column\",{\"columnTitle\":[1,\"column-title\"],\"dateShown\":[1,\"date-shown\"],\"renderCell\":[64],\"renderLabel\":[64]}]]],[\"sqm-referral-table-rewards-column\",[[1,\"sqm-referral-table-rewards-column\",{\"columnTitle\":[1,\"column-title\"],\"statusText\":[1,\"status-text\"],\"statusLongText\":[1,\"status-long-text\"],\"fuelTankText\":[1,\"fuel-tank-text\"],\"rewardReceivedText\":[1,\"reward-received-text\"],\"expiringText\":[1,\"expiring-text\"],\"pendingForText\":[1,\"pending-for-text\"],\"hideDetails\":[4,\"hide-details\"],\"renderCell\":[64],\"renderLabel\":[64]}]]],[\"sqm-referral-table-status-column\",[[1,\"sqm-referral-table-status-column\",{\"columnTitle\":[1,\"column-title\"],\"convertedStatusText\":[1,\"converted-status-text\"],\"inProgressStatusText\":[1,\"in-progress-status-text\"],\"renderCell\":[64],\"renderLabel\":[64]}]]],[\"sqm-referral-table-user-column\",[[1,\"sqm-referral-table-user-column\",{\"columnTitle\":[1,\"column-title\"],\"anonymousUser\":[1,\"anonymous-user\"],\"deletedUser\":[1,\"deleted-user\"],\"renderCell\":[64],\"renderLabel\":[64]}]]],[\"sqm-rewards-table-date-column\",[[1,\"sqm-rewards-table-date-column\",{\"columnTitle\":[1,\"column-title\"],\"dateShown\":[1,\"date-shown\"],\"renderCell\":[64],\"renderLabel\":[64]}]]],[\"sqm-rewards-table-reward-column\",[[1,\"sqm-rewards-table-reward-column\",{\"columnTitle\":[1,\"column-title\"],\"redeemedText\":[1,\"redeemed-text\"],\"availableText\":[1,\"available-text\"],\"renderCell\":[64],\"renderLabel\":[64]}]]],[\"sqm-rewards-table-source-column\",[[1,\"sqm-rewards-table-source-column\",{\"columnTitle\":[1,\"column-title\"],\"anonymousUser\":[1,\"anonymous-user\"],\"deletedUser\":[1,\"deleted-user\"],\"rewardExchangeText\":[1,\"reward-exchange-text\"],\"referralText\":[1,\"referral-text\"],\"rewardSourceText\":[1,\"reward-source-text\"],\"renderCell\":[64],\"renderLabel\":[64]}]]],[\"sqm-rewards-table-status-column\",[[1,\"sqm-rewards-table-status-column\",{\"columnTitle\":[1,\"column-title\"],\"statusText\":[1,\"status-text\"],\"expiryText\":[1,\"expiry-text\"],\"renderCell\":[64],\"renderLabel\":[64]}]]],[\"sqm-brand\",[[1,\"sqm-brand\",{\"brandColor\":[1,\"brand-color\"],\"brandFont\":[1,\"brand-font\"]}]]],[\"sqm-card-feed\",[[1,\"sqm-card-feed\",{\"width\":[2],\"gap\":[2],\"ignored\":[32]}]]],[\"sqm-divided-layout\",[[1,\"sqm-divided-layout\",{\"direction\":[1],\"dividerStyle\":[1,\"divider-style\"]}]]],[\"sqm-hero-image\",[[1,\"sqm-hero-image\",{\"imageUrl\":[1,\"image-url\"],\"minHeight\":[1,\"min-height\"],\"overlayColor\":[1,\"overlay-color\"],\"overlayOpacity\":[1,\"overlay-opacity\"],\"textColor\":[1,\"text-color\"],\"backgroundColor\":[1,\"background-color\"],\"layout\":[1],\"imagePos\":[1,\"image-pos\"],\"imageMobilePos\":[1,\"image-mobile-pos\"],\"header\":[1],\"description\":[1],\"buttonText\":[1,\"button-text\"],\"buttonLink\":[1,\"button-link\"],\"buttonNewTab\":[4,\"button-new-tab\"],\"padding\":[1]}]]],[\"sqm-hook-story-container\",[[0,\"sqm-hook-story-container\",{\"hookStory\":[16],\"ignored\":[32]}]]],[\"sqm-image\",[[1,\"sqm-image\",{\"imageUrl\":[1,\"image-url\"],\"left\":[1],\"right\":[1],\"align\":[1],\"backgroundColor\":[1,\"background-color\"],\"ignored\":[32]}]]],[\"sqm-navigation-menu\",[[1,\"sqm-navigation-menu\",{\"includeDropdown\":[4,\"include-dropdown\"],\"menuLabel\":[1,\"menu-label\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-portal-container\",[[1,\"sqm-portal-container\",{\"direction\":[1],\"padding\":[1],\"gap\":[1],\"minWidth\":[1,\"min-width\"],\"display\":[1],\"maxWidth\":[1,\"max-width\"],\"ignored\":[32]}]]],[\"sqm-portal-frame\",[[1,\"sqm-portal-frame\",{\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-program-explainer\",[[1,\"sqm-program-explainer\",{\"header\":[1],\"textColor\":[1,\"text-color\"],\"backgroundColor\":[1,\"background-color\"],\"ignored\":[32]}]]],[\"sqm-program-explainer-step\",[[1,\"sqm-program-explainer-step\",{\"header\":[1],\"description\":[1],\"textColor\":[1,\"text-color\"],\"backgroundColor\":[1,\"background-color\"],\"imageUrl\":[1,\"image-url\"],\"icon\":[1]}]]],[\"sqm-program-menu\",[[4,\"sqm-program-menu\",{\"ignored\":[32]}]]],[\"sqm-referral-card\",[[1,\"sqm-referral-card\",{\"header\":[1],\"description\":[1],\"padding\":[1],\"verticalAlignment\":[1,\"vertical-alignment\"],\"ignored\":[32]}]]],[\"sqm-referral-iframe\",[[0,\"sqm-referral-iframe\",{\"iframeSrc\":[1,\"iframe-src\"],\"iframeHeight\":[1,\"iframe-height\"],\"iframeWidth\":[1,\"iframe-width\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-reward-exchange-list\",[[1,\"sqm-reward-exchange-list\",{\"buttonText\":[1,\"button-text\"],\"notAvailableError\":[1,\"not-available-error\"],\"chooseRewardTitle\":[1,\"choose-reward-title\"],\"chooseAmountTitle\":[1,\"choose-amount-title\"],\"confirmationTitle\":[1,\"confirmation-title\"],\"rewardTitle\":[1,\"reward-title\"],\"cancelText\":[1,\"cancel-text\"],\"backText\":[1,\"back-text\"],\"continueText\":[1,\"continue-text\"],\"continueToConfirmationText\":[1,\"continue-to-confirmation-text\"],\"redeemText\":[1,\"redeem-text\"],\"redeemTitle\":[1,\"redeem-title\"],\"redemptionSuccessText\":[1,\"redemption-success-text\"],\"sourceAmountMessage\":[1,\"source-amount-message\"],\"tooltiptext\":[1],\"doneText\":[1,\"done-text\"],\"selectText\":[1,\"select-text\"],\"queryError\":[1,\"query-error\"],\"redemptionError\":[1,\"redemption-error\"],\"notEnoughError\":[1,\"not-enough-error\"],\"promoCode\":[1,\"promo-code\"],\"skeletonCardNum\":[2,\"skeleton-card-num\"],\"rewardNameTitle\":[1,\"reward-name-title\"],\"rewardAmountTitle\":[1,\"reward-amount-title\"],\"costTitle\":[1,\"cost-title\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-router\",[[4,\"sqm-router\",{\"ignored\":[32]}]]],[\"sqm-share-button\",[[1,\"sqm-share-button\",{\"medium\":[1],\"programId\":[1,\"program-id\"],\"borderradius\":[2],\"backgroundcolor\":[1],\"textcolor\":[1],\"pill\":[4],\"disabled\":[4],\"type\":[1],\"size\":[1],\"iconslot\":[1],\"icon\":[1],\"hideicon\":[4],\"hidetext\":[4],\"sharetitle\":[1],\"sharetext\":[1],\"demoData\":[16]}]]],[\"sqm-share-code\",[[1,\"sqm-share-code\",{\"programId\":[1,\"program-id\"],\"tooltiptext\":[1,\"tooltip-text\"],\"tooltiplifespan\":[2,\"tooltip-lifespan\"],\"demoData\":[16]}]]],[\"sqm-share-link\",[[1,\"sqm-share-link\",{\"programId\":[1,\"program-id\"],\"tooltiptext\":[1,\"tooltip-text\"],\"tooltiplifespan\":[2,\"tooltip-lifespan\"],\"demoData\":[16]}]]],[\"sqm-task-card\",[[1,\"sqm-task-card\",{\"rewardAmount\":[1,\"reward-amount\"],\"rewardUnit\":[1,\"reward-unit\"],\"cardTitle\":[1,\"card-title\"],\"description\":[1],\"repeatable\":[4],\"finite\":[2],\"showProgressBar\":[4,\"show-progress-bar\"],\"goal\":[2],\"steps\":[4],\"progressBarUnit\":[1,\"progress-bar-unit\"],\"showExpiry\":[4,\"show-expiry\"],\"expiryMessage\":[1,\"expiry-message\"],\"rewardDuration\":[1,\"reward-duration\"],\"startsOnMessage\":[1,\"starts-on-message\"],\"displayDuration\":[1,\"display-duration\"],\"endedMessage\":[1,\"ended-message\"],\"completedText\":[1,\"completed-text\"],\"buttonText\":[1,\"button-text\"],\"buttonLink\":[1,\"button-link\"],\"openNewTab\":[4,\"open-new-tab\"],\"statType\":[1,\"stat-type\"],\"eventKey\":[1,\"event-key\"],\"programId\":[1,\"program-id\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-timeline\",[[1,\"sqm-timeline\",{\"icon\":[1],\"ignored\":[32]}]]],[\"sqm-timeline-entry\",[[1,\"sqm-timeline-entry\",{\"reward\":[1],\"unit\":[1],\"desc\":[1],\"line\":[4],\"icon\":[1],\"ignored\":[32]}]]],[\"sqm-titled-section\",[[1,\"sqm-titled-section\",{\"label\":[1],\"align\":[1],\"labelMargin\":[1,\"label-margin\"],\"padding\":[1]}]]],[\"sqm-user-name\",[[1,\"sqm-user-name\",{\"fallback\":[1],\"loadingText\":[1,\"loading-text\"],\"demoData\":[16],\"_ignored\":[32]}]]],[\"sqm-referral-table-cell\",[[1,\"sqm-referral-table-cell\",{\"innerTemplate\":[1,\"inner-template\"],\"ignored\":[32]}]]],[\"sqm-referral-table-date-cell\",[[1,\"sqm-referral-table-date-cell\",{\"date\":[2],\"locale\":[1],\"ignored\":[32]}]]],[\"sqm-referral-table-rewards-cell\",[[1,\"sqm-referral-table-rewards-cell\",{\"rewards\":[16],\"hideDetails\":[4,\"hide-details\"],\"statusText\":[1,\"status-text\"],\"statusLongText\":[1,\"status-long-text\"],\"fuelTankText\":[1,\"fuel-tank-text\"],\"rewardReceivedText\":[1,\"reward-received-text\"],\"expiringText\":[1,\"expiring-text\"],\"pendingForText\":[1,\"pending-for-text\"],\"locale\":[1]}]]],[\"sqm-referral-table-status-cell\",[[1,\"sqm-referral-table-status-cell\",{\"statusText\":[1,\"status-text\"],\"converted\":[4]}]]],[\"sqm-referral-table-user-cell\",[[1,\"sqm-referral-table-user-cell\",{\"name\":[1]}]]],[\"sqm-rewards-table-date-cell\",[[1,\"sqm-rewards-table-date-cell\",{\"date\":[2],\"locale\":[1],\"ignored\":[32]}]]],[\"sqm-rewards-table-reward-cell\",[[1,\"sqm-rewards-table-reward-cell\",{\"reward\":[16],\"redeemedText\":[1,\"redeemed-text\"],\"availableText\":[1,\"available-text\"],\"locale\":[1]}]]],[\"sqm-rewards-table-source-cell\",[[1,\"sqm-rewards-table-source-cell\",{\"reward\":[16],\"deletedUserText\":[1,\"deleted-user-text\"],\"anonymousUserText\":[1,\"anonymous-user-text\"],\"rewardExchangeText\":[1,\"reward-exchange-text\"],\"referralText\":[1,\"referral-text\"],\"rewardSourceText\":[1,\"reward-source-text\"],\"locale\":[1]}]]],[\"sqm-rewards-table-status-cell\",[[1,\"sqm-rewards-table-status-cell\",{\"statusText\":[1,\"status-text\"],\"reward\":[16],\"expiryText\":[1,\"expiry-text\"],\"locale\":[1]}]]],[\"sqm-text\",[[4,\"sqm-text\",{\"ignored\":[32]}]]],[\"sqm-password-field\",[[0,\"sqm-password-field\",{\"fieldLabel\":[1,\"field-label\"],\"enableValidation\":[4,\"enable-validation\"],\"demoData\":[16],\"ignored\":[32]}]]],[\"sqm-table-cell\",[[1,\"sqm-table-cell\",{\"colspan\":[2],\"padding\":[1]}]]],[\"sqm-table-row\",[[1,\"sqm-table-row\",{\"border\":[1]}]]],[\"sqm-form-message\",[[1,\"sqm-form-message\",{\"type\":[1],\"icon\":[1],\"ignored\":[32]}]]]]"), options);
});
