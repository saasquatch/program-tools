import { shadeColor, addClass, removeClass } from '../../utilities';
import { css } from 'emotion';
import { API } from '../../services/WidgetHost';
import Clipboard from 'clipboard';
export class CopyButton {
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
    static get style() { return "/**style-placeholder:sqh-copy-button:**/"; }
}
