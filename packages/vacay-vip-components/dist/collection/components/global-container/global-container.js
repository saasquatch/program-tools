import { css } from 'emotion';
export class GlobalContainer {
    constructor() {
        this.poweredby = true;
    }
    LoadingState() {
        return (h("div", { class: "container-loading" },
            h("div", { class: "loading-icon" },
                h("div", { class: "bar1" }),
                h("div", { class: "bar2" }),
                h("div", { class: "bar3" }),
                h("div", { class: "bar4" }),
                h("div", { class: "bar5" }))));
    }
    render() {
        const style = css `
      background-color: ${this.background};
      font-family: ${this.fontfamily};
      position: relative;
      max-width: ${this.maxwidth};
    `;
        const fontImport = h("link", { href: 'https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap', rel: 'stylesheet' });
        return h("div", { class: style },
            this.fontfamily == "Roboto" ? fontImport : '',
            h("slot", null),
            this.poweredby
                ? h("a", { class: "sqh-attribution", href: "https://www.saasquatch.com/?utm_source=app&utm_medium=user-widget&utm_campaign=referral-widget", target: "_blank" }, "Powered By Saasquatch")
                : '',
            h(this.LoadingState, null));
    }
    static get is() { return "sqh-global-container"; }
    static get properties() { return {
        "background": {
            "type": String,
            "attr": "background"
        },
        "fontfamily": {
            "type": String,
            "attr": "fontfamily"
        },
        "maxwidth": {
            "type": String,
            "attr": "maxwidth"
        },
        "poweredby": {
            "type": Boolean,
            "attr": "poweredby"
        }
    }; }
    static get style() { return "/**style-placeholder:sqh-global-container:**/"; }
}
