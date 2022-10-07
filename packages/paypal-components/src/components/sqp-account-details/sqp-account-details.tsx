import { withHooks } from '@saasquatch/stencil-hooks';
import { Component, h, Host, Prop, State } from '@stencil/core';
import { useRequestRerender } from '../../tables/re-render';
import { getProps } from '../../utils/utils';
import { AccountDetailsView } from './sqp-account-details-view';
import { useAccountDetails } from './useAccountDetails';

@Component({
  tag: 'sqp-account-details',
})
export class PaypalAccountDetails {
  @State()
  ignored = true;

  @Prop() headerText: string = 'PayPal account';
  @Prop() accountLabel: string = 'Account';
  @Prop() recentPaymentLabel: string = 'Recent payment';
  @Prop() nextPaymentLabel: string = 'Next payment';
  @Prop() editText: string = 'Edit';

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const props = useAccountDetails(getProps(this));
    // isDemo() ? useAccountDetailsDemo() : useAccountDetails();

    const formSlot = <slot />;

    return (
      <Host>
        <div style={{ display: props.hasAccount ? 'none' : 'block' }}>{formSlot}</div>

        <AccountDetailsView {...props}></AccountDetailsView>
      </Host>
    );
  }
}

function useAccountDetailsDemo() {
  return {
    hasAccount: true,
  };
}
