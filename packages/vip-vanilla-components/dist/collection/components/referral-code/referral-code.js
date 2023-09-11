import { API } from '../../services/WidgetHost';
export class ReferralCode {
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
    static get style() { return "/**style-placeholder:sqh-referral-code:**/"; }
}
