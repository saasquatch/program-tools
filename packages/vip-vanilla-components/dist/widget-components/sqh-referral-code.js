/*! Built with http://stenciljs.com */
const { h } = window.WidgetComponents;

import { a as API } from './chunk-eeb26f85.js';
import './chunk-7081a6f1.js';

class ReferralCode {
    componentWillLoad() {
        return API.graphql.getReferralCode().then(res => {
            this.referralcode = res;
        }).catch(e => {
            this.onError(e);
        });
    }
    onError(e) {
        console.log("Error loading via GraphQL.", e);
    }
    render() {
        return (h("span", null, this.referralcode));
    }
    ;
    static get is() { return "sqh-referral-code"; }
    static get properties() { return {
        "referralcode": {
            "state": true
        }
    }; }
    static get style() { return "sqh-referral-code {\n  display: inline; }\n  sqh-referral-code span {\n    font-family: inherit;\n    font-size: inherit;\n    color: inherit;\n    overflow-wrap: break-word; }"; }
}

export { ReferralCode as SqhReferralCode };
