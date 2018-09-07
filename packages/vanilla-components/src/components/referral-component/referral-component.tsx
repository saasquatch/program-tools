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

  render() {
    const { 
      dateReferralStarted,
      rewards
    } = this.referral;

    const formatVariables = {
      date: FormatJS.formatRelative(dateReferralStarted.toString()),
      extrarewards: rewards.length - 1,
    };

    const name = (this.referral as Referral).referredUser
      ? (this.referral as Referral).referredUser.firstName
      : (this.referral as ReferredByReferral).referrerUser.firstName;

    const icon = rewards.length > 0
      ? `icon-ok-circled`
      : `icon-attention`;

    const content = this.referraltype === "converted"
      ? FormatJS.format(this.referralvariables.convertedcontent, formatVariables)
      : this.referraltype === "pending"
      ? FormatJS.format(this.referralvariables.pendingcontent, formatVariables)
      : FormatJS.format(this.referralvariables.referrercontent, formatVariables);

    const value = rewards.length > 0
      ? this.referralvariables.usefirstreward
      ? rewards[rewards.length - 1].prettyValue
      : rewards[0].prettyValue
      : this.referralvariables.pendingvalue

    const valuecontent = rewards.length > 1
      ? FormatJS.format(this.referralvariables.valuecontent, formatVariables)
      : '';

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
        </div>

        {/* second column */}
        <div class="sqh-column-two">
          <i class={`icon squatch-referrals-icon ${ icon }`}></i>
          <div class={ `squatch-referrals-value ${ rewards.length > 0 ? '' : 'pending' }` }>
            { value }
          </div>
          { valuecontent }
        </div>

      </div>
    )
  }
}