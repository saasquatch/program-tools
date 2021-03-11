import { Component, Prop, h } from '@stencil/core';
import ReferralListView from './referral-list-view';
import { useReferralList } from './useReferralList';

@Component({
  tag: 'sqm-referral-list',
  styleUrl: 'referral-list.css',
  shadow: true,
})
export class MyComponent {
  @Prop() showreferrer: string;
  @Prop() usefirstreward: string;
  @Prop() referralnamecolor: string;
  @Prop() referraltextcolor: string;
  @Prop() rewardcolor: string;
  @Prop() pendingcolor: string;
  @Prop() pendingvalue: string;
  @Prop() referrervalue: string;
  @Prop() referrercontent: string;
  @Prop() convertedcontent: string;
  @Prop() pendingcontent: string;
  @Prop() valuecontent: string;
  @Prop() expiredcolor: string;
  @Prop() expiredvalue: string;
  @Prop() expiredcontent: string;
  @Prop() cancelledcolor: string;
  @Prop() cancelledvalue: string;
  @Prop() cancelledcontent: string;
  @Prop() paginatemore: string;
  @Prop() paginateless: string;
  @Prop() noreferralsyet: string;
  @Prop() unknownuser: string;
  render() {
    return <ReferralListView {...useReferralList(this)} />;
  }
}
