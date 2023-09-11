/*! Built with http://stenciljs.com */
const { h } = window.WidgetComponents;

import { a as shadeColor, b as addClass, c as removeClass } from './chunk-bf7ffeb2.js';
import { a as css } from './chunk-06494afc.js';
import { a as API } from './chunk-eeb26f85.js';
import { a as Clipboard } from './chunk-80d3d1b7.js';
import './chunk-7081a6f1.js';

class CopyButton {
    constructor() {
        this.ishidden = false;
        this.copysuccess = "copied!";
        this.copyfailure = "Press Ctrl+C to copy";
    }
    componentWillLoad() {
        if (!this.ishidden) {
            return API.graphql.getFueltankCode(this.rewardkey).then(res => {
                const fuelTank = res.rewards.data.length > 0 ? res.rewards.data[0].fuelTankCode : null;
                this.fueltankcode = fuelTank || res.referredByReferral.referrerUser.referralCode;
            }).catch(e => {
                this.onError(e);
            });
        }
    }
    onError(e) {
        console.log("Error loading via GraphQL.", e);
    }
    notify(clipboardNotification, notificationText) {
        const notification = document.getElementById(clipboardNotification.slice(1));
        notification.textContent = notificationText;
        addClass(notification, 'in');
        setTimeout(() => {
            removeClass(notification, 'in');
        }, 1400);
    }
    notifySuccess(e) {
        this.notify(e.trigger.dataset.clipboardNotification, this.copysuccess);
    }
    notifyFailure(e) {
        this.notify(e.trigger.dataset.clipboardNotification, this.copyfailure);
    }
    componentDidLoad() {
        const clipboard = new Clipboard('button');
        clipboard.on('success', this.notifySuccess.bind(this));
        clipboard.on('error', this.notifyFailure.bind(this));
    }
    render() {
        const style = css `
    max-width: ${this.width}px;
    background-color: ${this.backgroundcolor};
    border: ${this.backgroundcolor};
    color: ${this.textcolor};
    border-radius: ${this.borderradius}px;
    font-size: ${this.fontsize}px;

    &:hover {
      background-color: ${shadeColor(this.backgroundcolor, 10)};
      border-color: ${shadeColor(this.backgroundcolor, 12)};
      color: ${this.textcolor};
    }

    &:focus {
      color: ${this.textcolor};
    }
    `;
        const code = css `
      text-align: center;
      font-weight: bold;
      font-size: ${this.codefontsize};
      color: ${this.codefontcolor};
    `;
        const classes = [`sqh-copy-button`, style].join(" ");
        return (!this.ishidden &&
            h("div", null,
                h("div", { class: code }, this.fueltankcode),
                h("div", { class: "sqh-align-button" },
                    h("span", { class: "label fade", id: "squatch-copy-notification" }, this.copysuccess),
                    h("button", { class: classes, "data-clipboard-text": this.fueltankcode, "data-clipboard-notification": "#squatch-copy-notification" }, this.text))));
    }
    static get is() { return "sqh-copy-button"; }
    static get properties() { return {
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
    }; }
    static get style() { return "sqh-copy-button {\n  display: block; }\n  sqh-copy-button .sqh-align-button {\n    text-align: center;\n    position: relative;\n    margin: 20px 0; }\n    sqh-copy-button .sqh-align-button .sqh-copy-button {\n      width: 100%;\n      text-align: center;\n      padding: 8px;\n      cursor: pointer; }\n    sqh-copy-button .sqh-align-button .label {\n      padding: .2em .6em .3em;\n      font-size: 11px;\n      font-weight: bold;\n      line-height: 1;\n      color: #fff;\n      text-align: center;\n      white-space: nowrap;\n      border-radius: .25em;\n      background-color: #35b21e; }\n      sqh-copy-button .sqh-align-button .label:empty {\n        display: none; }\n    sqh-copy-button .sqh-align-button .fade {\n      opacity: 0;\n      -webkit-transition: opacity .15s linear;\n      -o-transition: opacity .15s linear;\n      transition: opacity .15s linear; }\n      sqh-copy-button .sqh-align-button .fade.in {\n        opacity: 1; }\n    sqh-copy-button .sqh-align-button #squatch-copy-notification {\n      position: absolute;\n      left: 215px;\n      bottom: 35px;\n      z-index: 2; }"; }
}

export { CopyButton as SqhCopyButton };
