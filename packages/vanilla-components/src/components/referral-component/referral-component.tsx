import { Component, Prop } from '@stencil/core';
import FormatJs from '../../services/FormatJs';

@Component({
  tag: 'sqh-referral-component',
  styleUrl: 'referral-component.scss'
})

export class ReferralComponent {
  @Prop() referral: any;
  @Prop() locale: string = "en-US";

  render() {
    return (
      <div class="squatch-referrals-row">
        <div class="squatch-referrals-heading">{this.referral.referredUser.firstName}</div>

        <div class="squatch-referrals-description">
          <span>
            { this.referral.rewards.totalCount > 0
              ? `Paid User, signed up ${FormatJs.formatRelative(this.referral.dateReferralStarted, this.locale)}`
              : `Trial User, signed up ${FormatJs.formatRelative(this.referral.dateReferralStarted, this.locale)}`
            }
          </span>
        </div>
        <i class={
          `icon squatch-referrals-icon ${
            this.referral.rewards.totalCount > 0
              ? `icon-ok-circled text-green`
              : `icon-attention text-yellow`
            }
          `
        }>
        </i>
        <div class="squatch-referrals-value">
          { this.referral.rewards.totalCount > 0
            ? `${ this.referral.rewards.data[0].currency }${ this.referral.rewards.data[0].value / 100 }`
            : 'Reward pending'
          }
        </div>
      </div>
    )
  }
}