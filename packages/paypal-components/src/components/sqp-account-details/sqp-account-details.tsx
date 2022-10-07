import { h, Component, State, Prop, Host } from '@stencil/core';
import { withHooks } from '@saasquatch/stencil-hooks';
import { isDemo } from '@saasquatch/component-boilerplate';
import { useAccountDetails } from './useAccountDetails';
import { PayPalAccountDetailsView } from './sqp-account-details-view';
import { getProps } from '../../utils/utils';

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

    console.log({ props });
    return (
      <Host>
        {!props.hasAccount ? (
          <slot name="test" />
        ) : (
          <div>
            <slot name="test" />
          </div>
        )}
        <PayPalAccountDetailsView {...props}></PayPalAccountDetailsView>
      </Host>
    );
    // return props.hasAccount ? (
    //   <div>has account: {props.accountDetails?.email}</div>
    // ) : (
    //   <div>
    //     <button>set up your account now</button>
    //   </div>
    // );
  }
}

function useAccountDetailsDemo() {
  return {
    hasAccount: true,
  };
}
