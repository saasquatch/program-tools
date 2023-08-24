var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
/*! Built with http://stenciljs.com */
import { h } from './widget-components.core.js';
import { a as Clipboard } from './chunk-80d3d1b7.js';
import { a as shadeColor, b as addClass, c as removeClass } from './chunk-bf7ffeb2.js';
import { a as css } from './chunk-06494afc.js';
import { a as API } from './chunk-eeb26f85.js';
import './chunk-7081a6f1.js';
var CopyLinkButton = /** @class */ (function () {
    function CopyLinkButton() {
        this.copysuccess = "copied!";
        this.copyfailure = "Press Ctrl+C to copy";
        this.ishidden = false;
    }
    CopyLinkButton.prototype.componentWillLoad = function () {
        var _this = this;
        if (!this.ishidden) {
            return API.graphql.getShareLink().then(function (res) {
                _this.sharelink = res;
            }).catch(function (e) {
                _this.onError(e);
            });
        }
    };
    CopyLinkButton.prototype.onError = function (e) {
        console.log("Error loading via GraphQL.", e);
    };
    CopyLinkButton.prototype.notify = function (clipboardNotification, notificationText) {
        var notification = document.getElementById(clipboardNotification.slice(1));
        notification.textContent = notificationText;
        addClass(notification, 'in');
        setTimeout(function () {
            removeClass(notification, 'in');
        }, 1400);
        API.analytics.shareEvent('DIRECT');
    };
    CopyLinkButton.prototype.notifySuccess = function (e) {
        this.notify(e.trigger.dataset.clipboardNotification, this.copysuccess);
    };
    CopyLinkButton.prototype.notifyFailure = function (e) {
        this.notify(e.trigger.dataset.clipboardNotification, this.copyfailure);
    };
    CopyLinkButton.prototype.componentDidLoad = function () {
        var clipboard = new Clipboard('[data-clipboard-target]');
        clipboard.on('success', this.notifySuccess.bind(this));
        clipboard.on('error', this.notifyFailure.bind(this));
    };
    CopyLinkButton.prototype.render = function () {
        var myStyle = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      background-color: ", ";\n      border: 1px solid ", ";\n      color: ", ";\n      font-family: ", ";\n      \n      &:hover {\n        background: ", ";\n        border-color: ", ";\n        color: ", ";\n      }\n      \n      &:focus {\n        color: ", ";\n      }\n    "], ["\n      background-color: ", ";\n      border: 1px solid ", ";\n      color: ", ";\n      font-family: ", ";\n      \n      &:hover {\n        background: ", ";\n        border-color: ", ";\n        color: ", ";\n      }\n      \n      &:focus {\n        color: ", ";\n      }\n    "])), this.buttoncolor, this.buttoncolor, this.textcolor, 'inherit', shadeColor(this.buttoncolor, 10), shadeColor(this.buttoncolor, 12), this.textcolor, this.textcolor);
        var buttonClass = ["sqh-copy-btn icon-btn", myStyle].join(" ");
        return !this.ishidden &&
            h("div", { class: "input-group" }, h("input", { id: "squatch-share-link", value: this.sharelink, readonly: "readonly" }), h("span", { class: "label fade", id: "squatch-share-notification" }, this.copysuccess), h("span", { class: "input-group-btn" }, h("button", { class: buttonClass, "data-clipboard-target": "#squatch-share-link", "data-clipboard-notification": "#squatch-share-notification" }, h("i", { class: "icon icon-link" }), h("span", { class: "hidden-sm" }, this.text))));
    };
    Object.defineProperty(CopyLinkButton, "is", {
        get: function () { return "sqh-copy-link-button"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyLinkButton, "properties", {
        get: function () {
            return {
                "buttoncolor": {
                    "type": String,
                    "attr": "buttoncolor"
                },
                "copyfailure": {
                    "type": String,
                    "attr": "copyfailure"
                },
                "copysuccess": {
                    "type": String,
                    "attr": "copysuccess"
                },
                "ishidden": {
                    "type": Boolean,
                    "attr": "ishidden"
                },
                "sharelink": {
                    "state": true
                },
                "text": {
                    "type": String,
                    "attr": "text"
                },
                "textcolor": {
                    "type": String,
                    "attr": "textcolor"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyLinkButton, "style", {
        get: function () { return "sqh-copy-link-button {\n  display: block;\n  text-align: center; }\n  sqh-copy-link-button .input-group {\n    padding: 8px 0 10px;\n    position: relative;\n    display: table;\n    border-collapse: separate;\n    width: 100%;\n    max-width: 440px;\n    margin: 0 auto; }\n  sqh-copy-link-button #squatch-share-link {\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.428571429;\n    border: 1px solid #ccc;\n    border-radius: 4px 0 0 4px;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n    -webkit-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\n    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\n    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;\n    transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;\n    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\n    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;\n    color: #5b6165;\n    cursor: text;\n    position: relative;\n    z-index: 2;\n    width: 100%;\n    margin-bottom: 0;\n    display: table-cell; }\n  sqh-copy-link-button .label {\n    padding: .2em .6em .3em;\n    font-size: 11px;\n    font-weight: bold;\n    line-height: 1;\n    color: #fff;\n    text-align: center;\n    white-space: nowrap;\n    border-radius: .25em;\n    background-color: #737b80; }\n    sqh-copy-link-button .label:empty {\n      display: none; }\n  sqh-copy-link-button .fade {\n    opacity: 0;\n    -webkit-transition: opacity .15s linear;\n    -o-transition: opacity .15s linear;\n    transition: opacity .15s linear; }\n    sqh-copy-link-button .fade.in {\n      opacity: 1; }\n  sqh-copy-link-button #squatch-share-notification {\n    position: absolute;\n    top: 16px;\n    right: 156px;\n    z-index: 2; }\n  sqh-copy-link-button .input-group-btn {\n    display: table-cell;\n    width: 1%;\n    white-space: nowrap;\n    vertical-align: middle; }\n  sqh-copy-link-button .sqh-copy-btn {\n    -ms-touch-action: manipulation;\n    touch-action: manipulation;\n    cursor: pointer;\n    background-image: none;\n    border: 1px solid transparent;\n    white-space: nowrap;\n    border-radius: 4px;\n    border-bottom-left-radius: 0;\n    border-top-left-radius: 0;\n    height: 34px; }\n    sqh-copy-link-button .sqh-copy-btn:focus {\n      outline: 0; }\n    sqh-copy-link-button .sqh-copy-btn.disabled, sqh-copy-link-button .sqh-copy-btn[disabled],\n    fieldset[disabled] sqh-copy-link-button .sqh-copy-btn {\n      cursor: not-allowed;\n      pointer-events: none;\n      opacity: .65;\n      -webkit-box-shadow: none;\n      box-shadow: none; }\n  sqh-copy-link-button .icon-btn {\n    width: 139px;\n    border-left: 0;\n    padding-left: 0;\n    padding-right: 0;\n    position: relative;\n    text-align: left; }\n    sqh-copy-link-button .icon-btn:before {\n      content: '';\n      position: absolute;\n      top: -1px;\n      left: -3px;\n      bottom: -1px;\n      background: rgba(255, 255, 255, 0.18);\n      width: 40px; }\n    sqh-copy-link-button .icon-btn .icon {\n      width: 42px;\n      margin-right: 30px; }\n  sqh-copy-link-button .hidden-sm {\n    text-align: center;\n    padding-left: 10px;\n    font-size: 14px; }\n  sqh-copy-link-button .icon-link:before {\n    font-size: 1.2em;\n    padding-left: 8px; }\n\n\@media (max-width: 499px) {\n  sqh-copy-link-button .input-group {\n    max-width: 100%; } }\n\n\@media (max-width: 499px) {\n  sqh-copy-link-button #squatch-share-notification {\n    right: 60px; } }\n\n\@media (max-width: 499px) {\n  sqh-copy-link-button .sqh-copy-btn {\n    width: auto; }\n    sqh-copy-link-button .sqh-copy-btn .icon {\n      width: 39px;\n      margin-right: 0;\n      padding-right: 8px; } }\n\n\@media (min-width: 0px) and (max-width: 499px) {\n  sqh-copy-link-button .hidden-sm {\n    display: none !important; } }"; },
        enumerable: true,
        configurable: true
    });
    return CopyLinkButton;
}());
export { CopyLinkButton as SqhCopyLinkButton };
var templateObject_1;
