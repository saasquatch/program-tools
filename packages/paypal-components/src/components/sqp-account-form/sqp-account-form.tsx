import { h, Component, State, Prop } from '@stencil/core';
import { withHooks } from '@saasquatch/stencil-hooks';
import { isDemo } from '@saasquatch/component-boilerplate';
import { useAccountForm } from './useAccountForm';
import { PayPalAccountFormView } from '../sqp-paypal-account-form/sqp-paypal-account-form-view';
import { getProps } from '../../utils/utils';

@Component({
  tag: 'sqp-account-form',
})
export class PaypalAccountForm {
  @State()
  ignored = true;

  @Prop() modalConnectPayPalAccountHeader: string = 'Connect PayPal account';
  @Prop() cancelText: string = 'Cancel';
  @Prop() connectPayPalAccountButtonText: string = 'Connect account';
  @Prop() payPalEmailLabel: string = 'PayPal email';
  @Prop() payPalEmailLabelHelpText: string = 'Enter the email used for your PayPal account.';
  @Prop() confirmPayPalEmailLabel: string = 'Confirm email';
  @Prop() successMessage: string = 'Success!';
  @Prop() payPalAccountHeaderText: string = 'PayPal account';
  @Prop() connectPayPalDescriptionText: string = 'Connect your PayPal account to automatically receive payments/cash rewards.';

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const props = useAccountForm(getProps(this));
    // isDemo() ? useAccountFormDemo() : useAccountForm();

    return <PayPalAccountFormView {...props} />;
  }
}

function useAccountFormDemo() {
  return {};
}
