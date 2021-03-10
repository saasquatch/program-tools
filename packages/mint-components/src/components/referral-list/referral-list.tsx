import { Component, Prop, h } from '@stencil/core';
import ReferralListView from './referral-list-view';
import { useReferralList } from './useReferralList';

@Component({
  tag: 'sqm-share-button',
  styleUrl: 'referral-list.css',
  shadow: true,
})
export class MyComponent {


  render() {
    return <ReferralListView {...useReferralList(this)} />;
  }
}
