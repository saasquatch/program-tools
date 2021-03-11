import { Component, Prop, h } from '@stencil/core';
import ReferralListView from './referral-list-view';
import { useReferralList } from './useReferralList';

@Component({
  tag: 'sqm-referral-list',
  styleUrl: 'referral-list.css',
  shadow: true,
})
export class MyComponent {
  @Prop() unknownuser: string;
  @Prop() pickrewardtext: string;
  @Prop() showStatus: boolean;
  @Prop() downloadedtext: string;
  @Prop() downloadedunqualifiedtext: string;
  @Prop() purchasedeligibletext: string;
  @Prop() purchasednoteligibletext: string;
  @Prop() newreferraltext: string;
  @Prop() rewardpendingtext: string;
  @Prop() rewardsavailabletext: string;
  @Prop() rewardredeemedtext: string;
  @Prop() paginateless: string;
  @Prop() paginatemore: string;
  @Prop() noreferralsyet: string;
  @Prop() titleText: string;
  render() {
    return <ReferralListView {...useReferralList(this)} />;
  }
}
