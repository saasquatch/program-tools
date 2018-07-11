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
        <div>
          <div class="squatch-referrals-heading">{this.referral.referredUser.firstName}</div>

          <div class="squatch-referrals-description">
            <span>
              { this.referral.rewards.totalCount > 0
                ? `Paid User, signed up ${FormatJs.formatRelative(this.referral.dateReferralStarted, this.locale)}`
                : `Trial User, signed up ${FormatJs.formatRelative(this.referral.dateReferralStarted, this.locale)}`
              }
            </span>
          </div>
        </div>
        <i class={this.referral.rewards.totalCount > 0
          ? `icon squatch-referrals-icon icon-ok-circled text-green`
          : `icon squatch-referrals-icon icon-attention text-yellow`}>
        </i>
        <div>
          { this.referral.rewards.totalCount > 0
            ? `${ this.referral.rewards.data[0].currency }${ this.referral.rewards.data[0].value / 100 }`
            : 'Reward pending'
          }
        </div>
      </div>
      // <tr>
      //   <td>
      //     <div class="squatch-referrals-heading">{this.referral.referredUser.firstName}</div>

      //     <div class="squatch-referrals-description">
      //       <span class="hidden-sm">
      //         {this.referral.dateReferralPaid
      //         ? `Paid User`
      //         : `Trial User`
      //         }
      //       </span>

      //       <span class="hidden-md text-green">
      //         $10
      //       </span>
      //     </div>
      //   </td>

      //   <td class="hidden-sm">
      //     <div class="squatch-referrals-heading">
      //       {this.referral.dateReferralPaid
      //       ? `Signed Up`
      //       : `Referred`
      //       }
      //     </div>

      //     <div class="squatch-referrals-description" data-moment="true">{FormatJs.format(this.dateformatting, {value:this.referral.dateReferralStarted})}</div>
      //   </td>

      //   <td>
      //     <i class={this.referral.dateReferralPaid ? `icon squatch-referrals-icon icon-ok-circled text-green` : `icon squatch-referrals-icon icon-ok-circled text-yellow`}></i>

      //     <div class="squatch-referrals-heading hidden-sm">
      //       {/* TODO: logic here */}
      //       $10
      //     </div>

      //     <div class="squatch-referrals-description hidden-sm">
      //       {this.referral.dateReferralPaid
      //       ? `Free Credit`
      //       : `Credit Pending`
      //       }
      //     </div>
      //   </td>
      // </tr>
    )
  }
}