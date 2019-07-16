import { h } from '@stencil/core';
import Clipboard from 'clipboard';
export class SqCodeExample {
    constructor() {
        this.code = [];
    }
    componentWillLoad() {
        this.tabs = Array.from(document.querySelectorAll('sq-code'));
    }
    componentDidLoad() {
        const openedTab = this.tabs.filter(t => {
            //console.log("did load t?", t, t.open);
            return t.open;
        });
        this.clipboard = new Clipboard('.copy-button', {
            text: () => {
                //console.log('tab  ', openedTab);
                // console.log("elements:", elements)
                return openedTab[0].innerText;
            }
        });
    }
    async openTab(tabIndex) {
        this.tabs = this.tabs.map((tab) => {
            tab.open = false;
            return tab;
        });
        this.tabs[tabIndex].open = true;
        const openedTab = this.tabs[tabIndex];
        new Clipboard('.copy-button', {
            text: () => {
                return openedTab.getElementsByClassName(`original`)[0].textContent;
            }
        });
    }
    render() {
        return h("div", null,
            h("div", { class: "sq-tabs" }, this.tabs.map((tab, i) => {
                const openClass = tab.open ? 'sq-open' : '';
                return (h("div", { class: `sq-tab ${openClass}` },
                    h("button", { role: "tab", class: `sq-tab-button`, onClick: () => this.openTab(i) }, tab.tabname)));
            })),
            h("button", { class: "copy-button" }, "Copy"),
            h("slot", null));
    }
    static get is() { return "sq-code-example"; }
    static get originalStyleUrls() { return {
        "$": ["sq-code-example.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["sq-code-example.css"]
    }; }
    static get states() { return {
        "tabs": {},
        "code": {},
        "clipboard": {}
    }; }
}
