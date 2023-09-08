/*! Built with http://stenciljs.com */
const { h } = window.WidgetComponents;

import { a as css } from './chunk-06494afc.js';
import './chunk-7081a6f1.js';

class StatComponent {
    constructor() {
        this.ishidden = false;
    }
    componentWillLoad() {
        this.statAddedHandler(this.elem);
    }
    stattypeHandler(newValue, oldValue) {
        if (newValue !== oldValue)
            this.statTypeUpdatedHandler(this.elem);
    }
    statAddedHandler(stat) {
        this.statAdded.emit(stat);
    }
    statTypeUpdatedHandler(stat) {
        this.statTypeUpdated.emit(stat);
    }
    render() {
        const clz = css `
      color: ${this.statcolor};
    `;
        return !this.ishidden &&
            h("div", { class: clz },
                h("div", { class: "stat-value" }, this.statvalue),
                h("div", { class: "stat-description" }, this.statdescription));
    }
    static get is() { return "sqh-stat-component"; }
    static get properties() { return {
        "elem": {
            "elementRef": true
        },
        "ishidden": {
            "type": Boolean,
            "attr": "ishidden"
        },
        "statcolor": {
            "type": String,
            "attr": "statcolor"
        },
        "statdescription": {
            "type": String,
            "attr": "statdescription"
        },
        "stattype": {
            "type": String,
            "attr": "stattype",
            "watchCallbacks": ["stattypeHandler"]
        },
        "statvalue": {
            "type": String,
            "attr": "statvalue"
        }
    }; }
    static get events() { return [{
            "name": "statTypeUpdated",
            "method": "statTypeUpdated",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "statAdded",
            "method": "statAdded",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "sqh-stat-component {\n  text-align: center;\n  width: 140px;\n  float: left; }\n  sqh-stat-component > div {\n    padding: 10px; }\n  sqh-stat-component .stat-value {\n    white-space: nowrap;\n    font-size: 30px;\n    line-height: 20px;\n    margin-top: 20px;\n    margin-bottom: 8px;\n    font-weight: 300; }\n  sqh-stat-component .stat-description {\n    text-transform: uppercase;\n    font-size: 12px; }\n\n\@media (max-width: 499px) {\n  sqh-stat-component {\n    width: 100%;\n    text-align: left;\n    background: #f2f2f2;\n    border: 1px solid #ddd; }\n    sqh-stat-component:first-child {\n      border-radius: 4px 4px 0 0; }\n    sqh-stat-component:last-child {\n      border-radius: 0 0 4px 4px; } }\n\n\@media (max-width: 499px) {\n  sqh-stat-component .stat-value {\n    font-size: 22px;\n    float: left;\n    width: 60px;\n    text-align: center;\n    margin: 0 10px 0 0; } }\n\n\@media (max-width: 499px) {\n  sqh-stat-component .stat-description {\n    line-height: 20px;\n    padding-left: 100px;\n    overflow-wrap: break-word; } }"; }
}

export { StatComponent as SqhStatComponent };
