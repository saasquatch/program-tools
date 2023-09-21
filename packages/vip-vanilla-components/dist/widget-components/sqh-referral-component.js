/*! Built with http://stenciljs.com */
const { h } = window.WidgetComponents;

import { a as FormatJS } from './chunk-2b5ffdc4.js';
import { a as css } from './chunk-06494afc.js';
import { d as uuid } from './chunk-bf7ffeb2.js';
import { a as API } from './chunk-eeb26f85.js';
import './chunk-7081a6f1.js';

class ReferralComponent {
    getName() {
        const referral = this.referral;
        const referredByReferral = this.referral;
        // Referred User
        if (referral.referredUser) {
            return referral.referredUser.firstName || this.unknownuser;
        }
        // Referrer User
        if (referredByReferral.referrerUser) {
            return referredByReferral.referrerUser.firstName || this.unknownuser;
        }
        return this.unknownuser;
    }
    getIcon() {
        if ((this.referraltype === "converted" || this.referraltype === "referrer") && !this.rewardIsExpired() && !this.rewardIsCancelled()) {
            return `icon-ok-circled`;
        }
        return `icon-attention`;
    }
    getContent(formatVariables) {
        // When reward is expired and Expired Content was set
        if (this.rewardIsExpired() && this.referralvariables.expiredcontent) {
            return FormatJS.format(this.referralvariables.expiredcontent, formatVariables);
        }
        // When reward is cancelled and Cancelled Content was set
        if (this.rewardIsCancelled() && this.referralvariables.cancelledcontent) {
            return FormatJS.format(this.referralvariables.cancelledcontent, formatVariables);
        }
        if (this.referraltype) {
            return FormatJS.format(this.referralvariables[`${this.referraltype}content`], formatVariables);
        }
        return ``;
    }
    rewardIsExpired() {
        const { rewards } = this.referral;
        const hasExpiry = rewards.length == 1 && rewards[0].statuses;
        const isExpired = hasExpiry && rewards[0].statuses.indexOf("EXPIRED") > -1;
        return isExpired;
    }
    rewardIsCancelled() {
        const { rewards } = this.referral;
        const hasStatuses = rewards.length == 1 && rewards[0].statuses;
        const isCancelled = hasStatuses && rewards[0].statuses.indexOf("CANCELLED") > -1;
        return isCancelled;
    }
    getValue() {
        const { rewards } = this.referral;
        const referrer = this.referralvariables.referrervalue;
        const pending = this.referralvariables.pendingvalue;
        // When we have no reward values to show
        if (rewards.length == 0) {
            return this.referraltype === "referrer" ? referrer : pending;
        }
        // When we want to use the first reward pretty value
        if (rewards.length > 0 && this.referralvariables.usefirstreward) {
            return rewards[rewards.length - 1].prettyValue || rewards[0].prettyValue;
        }
        // Use last reward pretty value
        return rewards[0].prettyValue;
    }
    getValueContent(formatVariables) {
        const { rewards } = this.referral;
        // Expired content only applies when there is 1 reward in the referral
        if (rewards.length == 1 && this.rewardIsExpired()) {
            return FormatJS.format(this.referralvariables.expiredvalue, formatVariables);
        }
        // Cancelled content only applies when there is 1 reward in the referral
        if (rewards.length == 1 && this.rewardIsCancelled()) {
            return FormatJS.format(this.referralvariables.cancelledvalue, formatVariables);
        }
        // When there are no more than rewards and reward has not expired yet
        if (rewards.length <= 1)
            return '';
        return FormatJS.format(this.referralvariables.valuecontent, formatVariables);
    }
    render() {
        const { dateReferralStarted, rewards } = this.referral;
        const formatVariables = {
            date: FormatJS.formatRelative(dateReferralStarted.toString()),
            extrarewards: rewards.length - 1,
        };
        const name = this.getName();
        const icon = this.getIcon();
        const content = this.getContent(formatVariables);
        const value = this.getValue();
        const valuecontent = this.getValueContent(formatVariables);
        return (h("div", { class: "squatch-referrals-row" },
            h("div", null,
                h("div", { class: "squatch-referrals-heading" }, name),
                h("div", { class: "squatch-referrals-description" }, content)),
            h("i", { class: `icon squatch-referrals-icon ${icon} ${this.rewardIsExpired() && 'expired'} ${this.rewardIsCancelled() && 'cancelled'}` }),
            h("div", { class: "sqh-column-two" },
                h("div", { class: `squatch-referrals-value ${this.rewardIsCancelled() && 'cancelled'} ${rewards.length > 0 ? this.rewardIsExpired() ? 'expired' : '' : this.referraltype === 'referrer' ? 'referrer' : 'pending'}` }, value),
                h("div", { class: `squatch-value-contents ${this.rewardIsExpired() && 'expired'} ${this.rewardIsCancelled() && 'cancelled'}` }, valuecontent))));
    }
    static get is() { return "sqh-referral-component"; }
    static get properties() { return {
        "referral": {
            "type": "Any",
            "attr": "referral"
        },
        "referraltype": {
            "type": String,
            "attr": "referraltype"
        },
        "referralvariables": {
            "type": "Any",
            "attr": "referralvariables"
        },
        "unknownuser": {
            "type": "Any",
            "attr": "unknownuser"
        }
    }; }
    static get style() { return "sqh-referral-component:nth-child(3) .squatch-referrals-row {\n  border-bottom: none; }\n\nsqh-referral-component .squatch-referrals-row {\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n  -ms-flex-align: center;\n  -webkit-box-align: center;\n  align-items: center;\n  height: 80px;\n  border-bottom: 1px solid #ececec;\n  max-width: 500px;\n  margin: 0 auto;\n  padding: 0 20px;\n  line-height: 1.6; }\n  sqh-referral-component .squatch-referrals-row > div:first-of-type {\n    -ms-flex: 1;\n    -webkit-box-flex: 1;\n    flex: 1; }\n  sqh-referral-component .squatch-referrals-row .icon {\n    float: left;\n    font-size: 32px; }\n  sqh-referral-component .squatch-referrals-row .sqh-column-two {\n    padding: 10px 0; }\n\nsqh-referral-component .squatch-referrals-value {\n  width: 175px;\n  font-size: 16px;\n  float: left;\n  line-height: 49px; }\n\nsqh-referral-component .squatch-value-contents {\n  font-size: 13px;\n  line-height: 0px;\n  padding-bottom: 25px; }\n\nsqh-referral-component .squatch-referrals-heading {\n  font-size: 16px; }\n\nsqh-referral-component .squatch-referrals-description {\n  font-size: 13px; }\n\n\@media (max-width: 499px) {\n  sqh-referral-component .squatch-referrals-description {\n    display: none; }\n  sqh-referral-component .squatch-referrals-row {\n    padding: 0; }\n  sqh-referral-component .squatch-referrals-row > div:first-of-type {\n    width: 100px;\n    overflow: hidden; } }"; }
}

class ReferralList {
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
    static get style() { return "sqh-referral-list {\n  display: block; }\n  sqh-referral-list .squatch-no-referrals-yet {\n    background: white;\n    border-color: #adadad;\n    border: 1px solid;\n    border-color: #cccccc;\n    border-radius: 4px;\n    font-size: 14px;\n    line-height: 20px;\n    margin: 5px;\n    padding: 6px 12px;\n    width: 165px; }\n  sqh-referral-list .squatch-referrals-scroll-container {\n    min-height: 255px; }\n  sqh-referral-list .squatch-referrals-scroll-action-container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    padding: 5px 0; }\n    sqh-referral-list .squatch-referrals-scroll-action-container .squatch-referrals-scroll-action {\n      background: white;\n      border: 1px solid;\n      border-color: #cccccc;\n      border-radius: 4px;\n      cursor: pointer;\n      font-size: 14px;\n      line-height: 20px;\n      margin: 5px;\n      padding: 6px 12px;\n      width: 120px; }\n      sqh-referral-list .squatch-referrals-scroll-action-container .squatch-referrals-scroll-action.disabled {\n        cursor: default;\n        opacity: 0.5; }\n        sqh-referral-list .squatch-referrals-scroll-action-container .squatch-referrals-scroll-action.disabled:hover {\n          background: white;\n          border-color: #cccccc; }\n        sqh-referral-list .squatch-referrals-scroll-action-container .squatch-referrals-scroll-action.disabled:active {\n          border-style: solid; }\n      sqh-referral-list .squatch-referrals-scroll-action-container .squatch-referrals-scroll-action:hover {\n        background: #e6e6e6;\n        border-color: #adadad; }\n      sqh-referral-list .squatch-referrals-scroll-action-container .squatch-referrals-scroll-action:active, sqh-referral-list .squatch-referrals-scroll-action-container .squatch-referrals-scroll-action:focus {\n        outline: none; }"; }
}

export { ReferralComponent as SqhReferralComponent, ReferralList as SqhReferralList };
