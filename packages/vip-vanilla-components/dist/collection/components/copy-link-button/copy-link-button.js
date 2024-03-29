import Clipboard from 'clipboard';
import { shadeColor, addClass, removeClass } from '../../utilities';
import { css } from 'emotion';
import { API } from '../../services/WidgetHost';
export class CopyLinkButton {
    constructor() {
        this.copysuccess = "copied!";
        this.copyfailure = "Press Ctrl+C to copy";
        this.ishidden = false;
    }
    componentWillLoad() {
        if (!this.ishidden) {
            return API.graphql.getShareLink().then(res => {
                this.sharelink = res;
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
        API.analytics.shareEvent('DIRECT');
    }
    notifySuccess(e) {
        this.notify(e.trigger.dataset.clipboardNotification, this.copysuccess);
    }
    notifyFailure(e) {
        this.notify(e.trigger.dataset.clipboardNotification, this.copyfailure);
    }
    componentDidLoad() {
        const clipboard = new Clipboard('[data-clipboard-target]');
        clipboard.on('success', this.notifySuccess.bind(this));
        clipboard.on('error', this.notifyFailure.bind(this));
    }
    render() {
        const myStyle = css `
      background-color: ${this.buttoncolor};
      border: 1px solid ${this.buttoncolor};
      color: ${this.textcolor};
      font-family: ${'inherit'};
      
      &:hover {
        background: ${shadeColor(this.buttoncolor, 10)};
        border-color: ${shadeColor(this.buttoncolor, 12)};
        color: ${this.textcolor};
      }
      
      &:focus {
        color: ${this.textcolor};
      }
    `;
        const buttonClass = [`sqh-copy-btn icon-btn`, myStyle].join(" ");
        return !this.ishidden &&
            h("div", { class: "input-group" },
                h("input", { id: "squatch-share-link", value: this.sharelink, readonly: "readonly" }),
                h("span", { class: "label fade", id: "squatch-share-notification" }, this.copysuccess),
                h("span", { class: "input-group-btn" },
                    h("button", { class: buttonClass, "data-clipboard-target": "#squatch-share-link", "data-clipboard-notification": "#squatch-share-notification" },
                        h("i", { class: "icon icon-link" }),
                        h("span", { class: "hidden-sm" }, this.text))));
    }
    static get is() { return "sqh-copy-link-button"; }
    static get properties() { return {
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
    }; }
    static get style() { return "/**style-placeholder:sqh-copy-link-button:**/"; }
}
