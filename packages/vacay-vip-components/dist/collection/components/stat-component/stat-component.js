import { css } from 'emotion';
export class StatComponent {
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
    static get style() { return "/**style-placeholder:sqh-stat-component:**/"; }
}
