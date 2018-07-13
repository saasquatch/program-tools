import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'sqh-referral-component',
  styleUrl: 'referral-component.scss'
})

export class ReferralComponent {
  @Prop() name: string;
  @Prop() content: string;
  @Prop() value: string;
  @Prop() hasreward: boolean;

  render() {
    return (
      <div class="squatch-referrals-row">
        <div class="squatch-referrals-heading">
          { this.name }
        </div>
        <div class="squatch-referrals-description">
          { this.content }
        </div>
        <i class={
          `icon squatch-referrals-icon ${
            this.hasreward
              ? `icon-ok-circled`
              : `icon-attention`
            }
          `
        }></i>
        <div class={ `squatch-referrals-value ${ this.hasreward ? '' : 'pending' }` }>
          { this.value }
        </div>
      </div>
    )
  }
}