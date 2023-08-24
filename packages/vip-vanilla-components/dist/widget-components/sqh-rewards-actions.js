/*! Built with http://stenciljs.com */
const { h } = window.WidgetComponents;

// import FormatJs from '../../services/FormatJs';
class RewardsActions {
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
    static get style() { return "sqh-rewards-actions .squatch-referrals-actions {\n  text-align: center; }\n  sqh-rewards-actions .squatch-referrals-actions .btn {\n    margin-left: 10px;\n    width: 120px; }\n    sqh-rewards-actions .squatch-referrals-actions .btn:first-child {\n      margin-left: 0; }\n    \@media (max-width: 499px) {\n      sqh-rewards-actions .squatch-referrals-actions .btn {\n        font-size: 13px;\n        width: 85px;\n        padding-left: 6px;\n        padding-right: 6px;\n        margin-left: 7px; } }"; }
}

export { RewardsActions as SqhRewardsActions };
