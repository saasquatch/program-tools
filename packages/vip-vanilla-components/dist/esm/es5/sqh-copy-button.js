var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
/*! Built with http://stenciljs.com */
import { h } from './widget-components.core.js';
import { a as shadeColor, b as addClass, c as removeClass } from './chunk-bf7ffeb2.js';
import { a as css } from './chunk-06494afc.js';
import { a as API } from './chunk-eeb26f85.js';
import { a as Clipboard } from './chunk-80d3d1b7.js';
import './chunk-7081a6f1.js';
var CopyButton = /** @class */ (function () {
    function CopyButton() {
        this.ishidden = false;
        this.copysuccess = "copied!";
        this.copyfailure = "Press Ctrl+C to copy";
    }
    CopyButton.prototype.componentWillLoad = function () {
        var _this = this;
        if (!this.ishidden) {
            return API.graphql.getFueltankCode(this.rewardkey).then(function (res) {
                var fuelTank = res.rewards.data.length > 0 ? res.rewards.data[0].fuelTankCode : null;
                _this.fueltankcode = fuelTank || res.referredByReferral.referrerUser.referralCode;
            }).catch(function (e) {
                _this.onError(e);
            });
        }
    };
    CopyButton.prototype.onError = function (e) {
        console.log("Error loading via GraphQL.", e);
    };
    CopyButton.prototype.notify = function (clipboardNotification, notificationText) {
        var notification = document.getElementById(clipboardNotification.slice(1));
        notification.textContent = notificationText;
        addClass(notification, 'in');
        setTimeout(function () {
            removeClass(notification, 'in');
        }, 1400);
    };
    CopyButton.prototype.notifySuccess = function (e) {
        this.notify(e.trigger.dataset.clipboardNotification, this.copysuccess);
    };
    CopyButton.prototype.notifyFailure = function (e) {
        this.notify(e.trigger.dataset.clipboardNotification, this.copyfailure);
    };
    CopyButton.prototype.componentDidLoad = function () {
        var clipboard = new Clipboard('button');
        clipboard.on('success', this.notifySuccess.bind(this));
        clipboard.on('error', this.notifyFailure.bind(this));
    };
    CopyButton.prototype.render = function () {
        var style = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    max-width: ", "px;\n    background-color: ", ";\n    border: ", ";\n    color: ", ";\n    border-radius: ", "px;\n    font-size: ", "px;\n\n    &:hover {\n      background-color: ", ";\n      border-color: ", ";\n      color: ", ";\n    }\n\n    &:focus {\n      color: ", ";\n    }\n    "], ["\n    max-width: ", "px;\n    background-color: ", ";\n    border: ", ";\n    color: ", ";\n    border-radius: ", "px;\n    font-size: ", "px;\n\n    &:hover {\n      background-color: ", ";\n      border-color: ", ";\n      color: ", ";\n    }\n\n    &:focus {\n      color: ", ";\n    }\n    "])), this.width, this.backgroundcolor, this.backgroundcolor, this.textcolor, this.borderradius, this.fontsize, shadeColor(this.backgroundcolor, 10), shadeColor(this.backgroundcolor, 12), this.textcolor, this.textcolor);
        var code = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      text-align: center;\n      font-weight: bold;\n      font-size: ", ";\n      color: ", ";\n    "], ["\n      text-align: center;\n      font-weight: bold;\n      font-size: ", ";\n      color: ", ";\n    "])), this.codefontsize, this.codefontcolor);
        var classes = ["sqh-copy-button", style].join(" ");
        return (!this.ishidden &&
            h("div", null, h("div", { class: code }, this.fueltankcode), h("div", { class: "sqh-align-button" }, h("span", { class: "label fade", id: "squatch-copy-notification" }, this.copysuccess), h("button", { class: classes, "data-clipboard-text": this.fueltankcode, "data-clipboard-notification": "#squatch-copy-notification" }, this.text))));
    };
    Object.defineProperty(CopyButton, "is", {
        get: function () { return "sqh-copy-button"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyButton, "properties", {
        get: function () {
            return {
                "backgroundcolor": {
                    "type": String,
                    "attr": "backgroundcolor"
                },
                "borderradius": {
                    "type": Number,
                    "attr": "borderradius"
                },
                "codefontcolor": {
                    "type": String,
                    "attr": "codefontcolor"
                },
                "codefontsize": {
                    "type": Number,
                    "attr": "codefontsize"
                },
                "copyfailure": {
                    "type": String,
                    "attr": "copyfailure"
                },
                "copysuccess": {
                    "type": String,
                    "attr": "copysuccess"
                },
                "fontsize": {
                    "type": Number,
                    "attr": "fontsize"
                },
                "fueltankcode": {
                    "state": true
                },
                "ishidden": {
                    "type": Boolean,
                    "attr": "ishidden"
                },
                "rewardkey": {
                    "type": String,
                    "attr": "rewardkey"
                },
                "text": {
                    "type": String,
                    "attr": "text"
                },
                "textcolor": {
                    "type": String,
                    "attr": "textcolor"
                },
                "width": {
                    "type": Number,
                    "attr": "width"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyButton, "style", {
        get: function () { return "sqh-copy-button {\n  display: block; }\n  sqh-copy-button .sqh-align-button {\n    text-align: center;\n    position: relative;\n    margin: 20px 0; }\n    sqh-copy-button .sqh-align-button .sqh-copy-button {\n      width: 100%;\n      text-align: center;\n      padding: 8px;\n      cursor: pointer; }\n    sqh-copy-button .sqh-align-button .label {\n      padding: .2em .6em .3em;\n      font-size: 11px;\n      font-weight: bold;\n      line-height: 1;\n      color: #fff;\n      text-align: center;\n      white-space: nowrap;\n      border-radius: .25em;\n      background-color: #35b21e; }\n      sqh-copy-button .sqh-align-button .label:empty {\n        display: none; }\n    sqh-copy-button .sqh-align-button .fade {\n      opacity: 0;\n      -webkit-transition: opacity .15s linear;\n      -o-transition: opacity .15s linear;\n      transition: opacity .15s linear; }\n      sqh-copy-button .sqh-align-button .fade.in {\n        opacity: 1; }\n    sqh-copy-button .sqh-align-button #squatch-copy-notification {\n      position: absolute;\n      left: 215px;\n      bottom: 35px;\n      z-index: 2; }"; },
        enumerable: true,
        configurable: true
    });
    return CopyButton;
}());
export { CopyButton as SqhCopyButton };
var templateObject_1, templateObject_2;
