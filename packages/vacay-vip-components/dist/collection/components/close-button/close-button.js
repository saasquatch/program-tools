import { API, widgetIdent } from "../../services/WidgetHost";
// const API: MyAPI = window["WidgetHost"];
// const widget = window["widgetIdent"];
export class TwitterShareButton {
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
    static get style() { return "/**style-placeholder:sqh-close-button:**/"; }
}
