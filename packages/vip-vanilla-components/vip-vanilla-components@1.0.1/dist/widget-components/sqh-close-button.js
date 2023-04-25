/*! Built with http://stenciljs.com */
const { h } = window.WidgetComponents;

import { a as API, b as widgetIdent } from './chunk-eeb26f85.js';
import './chunk-7081a6f1.js';

// const API: MyAPI = window["WidgetHost"];
// const widget = window["widgetIdent"];
class TwitterShareButton {
    constructor() {
        this.text = "Close";
    }
    handleClick() {
        API.ui.close();
    }
    componentDidLoad() {
        const widget = widgetIdent();
        if (widget && widget.engagementMedium != "POPUP") {
            this.closeButton.setAttribute('style', 'display:none');
        }
    }
    render() {
        return (h("span", { class: "close squatch-header-close", "data-close-panel": "#squatch-panel" }, this.text));
    }
    static get is() { return "sqh-close-button"; }
    static get properties() { return {
        "closeButton": {
            "elementRef": true
        },
        "text": {
            "type": String,
            "attr": "text"
        }
    }; }
    static get listeners() { return [{
            "name": "click",
            "method": "handleClick"
        }]; }
    static get style() { return "sqh-close-button .squatch-header-close {\n  position: absolute;\n  top: 4px;\n  right: 6px;\n  background: transparent;\n  border: 0;\n  color: #4486e1;\n  font-size: 12px; }\n  sqh-close-button .squatch-header-close:hover {\n    text-decoration: underline; }"; }
}

export { TwitterShareButton as SqhCloseButton };
