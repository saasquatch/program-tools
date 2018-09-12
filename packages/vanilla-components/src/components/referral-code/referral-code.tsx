import { Component, State } from '@stencil/core';
import { API } from '../../services/WidgetHost';

@Component({
  tag: 'sqh-referral-code',
  styleUrl: 'referral-code.scss'
})
export class TextComponent {
  @State() referralcode: string;

  componentWillLoad() {
    return API.graphql.getReferralCode().then(res => {
      this.referralcode = res;
    }).catch(e => {
      this.onError(e);
    });
  }

  onError(e: Error) {
    console.log("Error loading via GraphQL.", e);
  }

  render() {
    return (
      <span >
        {this.referralcode}
      </span>
    )};
}