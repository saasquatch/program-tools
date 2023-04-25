import { css } from 'emotion';
import { uuid } from '../../utilities';
import { API } from '../../services/WidgetHost';
export class ReferralList {
    constructor() {
        // general in dropdown
        this.ishidden = false;
        // referrer props
        this.showreferrer = true;
        this.usefirstreward = false;
        this.offset = 0;
        this.loading = true;
    }
    componentWillLoad() {
        if (!this.ishidden) {
            return this.getReferrals().then(res => {
                this.referrals = res.referrals.data;
                this.referredBy = res.referredByReferral;
                this.referralsCount = res.referrals.totalCount;
                this.loading = false;
            }).catch(e => {
                this.onError(e);
            });
        }
    }
    getReferrals(offset = 0) {
        return API.graphql.getReferrals(offset);
    }
    paginate(offset, event) {
        if (this.loading)
            return null;
        let { referralsCount } = this;
        if (this.showreferrer && this.referredBy)
            referralsCount++;
        if (offset >= referralsCount || offset < 0)
            return null;
        this.loading = true;
        const { target } = event;
        target.innerText = "...";
        this.getReferrals(offset)
            .then(res => {
            target.innerText = offset > this.offset
                ? this.paginatemore
                : this.paginateless;
            this.referrals = res.referrals.data;
            this.offset = offset;
            this.loading = false;
        });
    }
    onError(e) {
        console.error(e);
        this.loading = false;
    }
    render() {
        let referredByRow;
        let referralsRow;
        const referralvariables = {
            usefirstreward: this.usefirstreward,
            referrercontent: this.referrercontent,
            convertedcontent: this.convertedcontent,
            pendingcontent: this.pendingcontent,
            pendingvalue: this.pendingvalue,
            referrervalue: this.referrervalue,
            valuecontent: this.valuecontent,
            expiredcontent: this.expiredcontent,
            expiredvalue: this.expiredvalue,
            cancelledvalue: this.cancelledvalue,
            cancelledcontent: this.cancelledcontent
        };
        if (this.referrals) {
            referralsRow = (this.referrals.map((ref) => {
                const referraltype = ref.rewards.length > 0 ? 'converted' : 'pending';
                return (h("sqh-referral-component", { id: uuid(), referral: ref, referralvariables: referralvariables, referraltype: referraltype, unknownuser: this.unknownuser }));
            }));
        }
        if (this.referrals.length < 3 && this.referredBy && this.showreferrer) {
            referredByRow = (h("sqh-referral-component", { id: uuid(), referral: this.referredBy, referralvariables: referralvariables, referraltype: 'referrer', unknownuser: this.unknownuser }));
        }
        const clz = css `
      .squatch-referrals-icon.icon-ok-circled {
        color: ${this.rewardcolor};
      }
      .squatch-referrals-icon.icon-attention {
        color: ${this.pendingcolor};
      }
      .squatch-referrals-value {
        color: ${this.rewardcolor};
      }
      .squatch-referrals-value.pending {
        color: ${this.pendingcolor};
      }
      .squatch-referrals-value.referrer {
        color: ${this.rewardcolor};
      }
      .squatch-referrals-value.expired {
        color: ${this.expiredcolor};
      }
      .squatch-value-contents.expired {
        color: ${this.expiredcolor}
      }
      .squatch-referrals-icon.icon-attention.expired {
        color: ${this.expiredcolor}
      }
      .squatch-referrals-value.cancelled {
        color: ${this.cancelledcolor};
      }
      .squatch-value-contents.cancelled {
        color: ${this.cancelledcolor}
      }
      .squatch-referrals-icon.icon-attention.cancelled {
        color: ${this.cancelledcolor}
      }
      .squatch-referrals-heading {
        color: ${this.referralnamecolor};
      }
      .squatch-referrals-description,
      .squatch-referrals-value-content {
        color: ${this.referraltextcolor};
      }
      .squatch-referrals-scroll-action {
        font-family: ${'inherit'};
      }
    `;
        const totalReferralsCount = this.showreferrer && this.referredBy ? this.referralsCount + 1 : this.referralsCount;
        return !this.ishidden &&
            totalReferralsCount > 0
            ? ( // Referral List when not hidden and 1 or more referrals
            h("div", { class: `squatch-referrals ${clz}` },
                h("div", { class: "squatch-referrals-scroll-container" },
                    referralsRow,
                    referredByRow),
                h("div", { class: "squatch-referrals-scroll-action-container" },
                    h("button", { class: `
                squatch-referrals-scroll-action previous ${this.loading
                            ? "disabled"
                            : this.offset === 0
                                ? "disabled"
                                : ""}
              `, onClick: event => this.paginate(this.offset - 3, event) }, this.paginateless),
                    h("button", { class: `
                squatch-referrals-scroll-action view-more ${this.loading
                            ? "disabled"
                            : this.showreferrer && this.referredBy
                                ? this.offset >= this.referralsCount - 2
                                    ? "disabled"
                                    : ""
                                : this.offset >= this.referralsCount - 3
                                    ? "disabled"
                                    : ""}
              `, "view-more": true, onClick: event => this.paginate(this.offset + 3, event) }, this.paginatemore))))
            // 'No Referrals Yet' button if this.referralCount < 1
            : (h("div", { class: "squatch-referrals-scroll-action-container" },
                h("button", { disabled: true, class: 'squatch-no-referrals-yet' }, this.noreferralsyet)));
    }
    static get is() { return "sqh-referral-list"; }
    static get properties() { return {
        "cancelledcolor": {
            "type": String,
            "attr": "cancelledcolor"
        },
        "cancelledcontent": {
            "type": String,
            "attr": "cancelledcontent"
        },
        "cancelledvalue": {
            "type": String,
            "attr": "cancelledvalue"
        },
        "convertedcontent": {
            "type": String,
            "attr": "convertedcontent"
        },
        "expiredcolor": {
            "type": String,
            "attr": "expiredcolor"
        },
        "expiredcontent": {
            "type": String,
            "attr": "expiredcontent"
        },
        "expiredvalue": {
            "type": String,
            "attr": "expiredvalue"
        },
        "ishidden": {
            "type": Boolean,
            "attr": "ishidden"
        },
        "loading": {
            "state": true
        },
        "noreferralsyet": {
            "type": String,
            "attr": "noreferralsyet"
        },
        "offset": {
            "state": true
        },
        "paginateless": {
            "type": String,
            "attr": "paginateless"
        },
        "paginatemore": {
            "type": String,
            "attr": "paginatemore"
        },
        "pendingcolor": {
            "type": String,
            "attr": "pendingcolor"
        },
        "pendingcontent": {
            "type": String,
            "attr": "pendingcontent"
        },
        "pendingvalue": {
            "type": String,
            "attr": "pendingvalue"
        },
        "referralnamecolor": {
            "type": String,
            "attr": "referralnamecolor"
        },
        "referrals": {
            "state": true
        },
        "referralsCount": {
            "state": true
        },
        "referraltextcolor": {
            "type": String,
            "attr": "referraltextcolor"
        },
        "referredBy": {
            "state": true
        },
        "referrercontent": {
            "type": String,
            "attr": "referrercontent"
        },
        "referrervalue": {
            "type": String,
            "attr": "referrervalue"
        },
        "rewardcolor": {
            "type": String,
            "attr": "rewardcolor"
        },
        "rewards": {
            "state": true
        },
        "showreferrer": {
            "type": Boolean,
            "attr": "showreferrer"
        },
        "unknownuser": {
            "type": String,
            "attr": "unknownuser"
        },
        "usefirstreward": {
            "type": Boolean,
            "attr": "usefirstreward"
        },
        "valuecontent": {
            "type": String,
            "attr": "valuecontent"
        }
    }; }
    static get style() { return "/**style-placeholder:sqh-referral-list:**/"; }
}
