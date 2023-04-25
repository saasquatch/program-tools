// import FormatJs from '../../services/FormatJs';
export class RewardsActions {
    constructor() {
        this.previoustext = 'Previous';
        this.hidetext = 'Hide';
        this.nexttext = 'Next';
    }
    render() {
        return (h("div", { class: "squatch-referrals-actions" },
            h("button", { class: "btn btn-default disabled", "data-scroll-element": "#squatch-referrals-scroll", "data-scroll-increment": "-3" }, this.previoustext),
            h("button", { class: "btn btn-default", "data-close-panel": "#squatch-panel", "data-scroll-reset": "#squatch-referrals-scroll" }, this.hidetext),
            h("button", { class: "btn btn-default disabled", "data-scroll-element": "#squatch-referrals-scroll", "data-scroll-increment": "3" }, this.nexttext)));
    }
    static get is() { return "sqh-rewards-actions"; }
    static get properties() { return {
        "hidetext": {
            "type": String,
            "attr": "hidetext"
        },
        "nexttext": {
            "type": String,
            "attr": "nexttext"
        },
        "previoustext": {
            "type": String,
            "attr": "previoustext"
        }
    }; }
    static get style() { return "/**style-placeholder:sqh-rewards-actions:**/"; }
}
