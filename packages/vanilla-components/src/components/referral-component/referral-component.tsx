import { Component, Prop } from '@stencil/core';
import FormatJS from '../../services/FormatJs';

@Component({
  tag: 'sqh-referral-component',
  styleUrl: 'referral-component.scss'
})

export class ReferralComponent {
  @Prop() referral: Referral | ReferredByReferral;
  @Prop() referraltype: "converted" | "pending" | "referrer";
  @Prop() referralvariables: ReferralVariables;
  @Prop() unknownuser: String;

  getName() {
    const referral = (this.referral as Referral);
    const referredByReferral = (this.referral as ReferredByReferral);
    
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

  rewardIsRedeemed() {
    const { rewards } = this.referral;
    const hasStatuses = rewards.length == 1 && rewards[0].statuses;
    const isRedeemed = hasStatuses && rewards[0].statuses.indexOf("REDEEMED") > -1;

    return isRedeemed;
  }


  getValue() {
    const {rewards} = this.referral;
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
    const {rewards} = this.referral;

    // Expired content only applies when there is 1 reward in the referral
    if (rewards.length == 1 && this.rewardIsExpired()) {
      return FormatJS.format(this.referralvariables.expiredvalue, formatVariables)
    }

    // Cancelled content only applies when there is 1 reward in the referral
    if (rewards.length == 1 && this.rewardIsCancelled()) {
      return FormatJS.format(this.referralvariables.cancelledvalue, formatVariables)
    }  

    // When there are no more than rewards and reward has not expired yet
    if (!rewards.length) return '';

    if(this.rewardIsRedeemed()){
      return FormatJS.format(rewards.length == 1 ? 'Redeemed' : this.referralvariables.valuecontent, formatVariables);
    }

    if(this.referralvariables.showexpiry && !rewards[0].dateExpires) return '';

    if(this.referralvariables.showexpiry){
      const expiryDate = FormatJS.formatRelative(rewards[0].dateExpires);
      return FormatJS.format(`Expires ${expiryDate}`, formatVariables)
    }

    return FormatJS.format(rewards.length == 1 ? '' : this.referralvariables.valuecontent, formatVariables);
  }

  getNote(){
    const {rewards} = this.referral;
    const note = rewards[0] && rewards[0].meta && rewards[0].meta.message
    return note || ""
  }

  render() {
    const { 
      dateReferralStarted,
      rewards
    } = this.referral;

    const formatVariables = {
      date: FormatJS.formatRelative(dateReferralStarted.toString()),
      extrarewards: rewards.length - 1,
    };
    const name = this.getName();
    const icon = this.getIcon();
    const content = this.getContent(formatVariables);
    const value = this.getValue();
    const valuecontent = this.getValueContent(formatVariables);
    const customernote = this.getNote();
    return (
      <div class="squatch-referrals-row">

        {/* first column */}
        <div>
          <div class="squatch-referrals-heading">
            { name }
          </div>
          <div class="squatch-referrals-description">
            { content }
          </div>
          { this.referralvariables.shownotes && customernote &&
            <div class="squatch-referrals-description squatch-customer-note">
              { customernote }
            </div>
          }
        </div>

        <i class={`icon squatch-referrals-icon ${ icon } ${this.rewardIsExpired() && 'expired'} ${this.rewardIsCancelled() && 'cancelled'}`}></i>

        {/* second column */}
        <div class="sqh-column-two">
          <div class={ `squatch-referrals-value ${this.rewardIsCancelled() && 'cancelled'} ${ rewards.length > 0 ? this.rewardIsExpired() ? 'expired': '' : this.referraltype === 'referrer' ? 'referrer' : 'pending' }` }>
            { value }
          </div>
          <div class={`squatch-value-contents ${this.rewardIsExpired() && 'expired'} ${this.rewardIsCancelled() && 'cancelled'}`}>{ valuecontent }</div>
        </div>

      </div>
    )
  }
}