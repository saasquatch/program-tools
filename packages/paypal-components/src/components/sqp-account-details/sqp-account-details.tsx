import { withHooks } from '@saasquatch/stencil-hooks';
import { useState } from '@saasquatch/universal-hooks';
import { Component, h, Host, Prop, State } from '@stencil/core';
import { getProps } from '../../utils/utils';
import { AccountDetailsView } from './sqp-account-details-view';
import { AccountFormView } from './sqp-account-form-view';
import { useAccountDetails } from './useAccountDetails';

/**
 * @uiName Paypal Account Details
 * @slots [{"name":"","title":"Form Slot"}]
 * @exampleGroup Paypal Components
 * @example Paypal Account Details - <sqp-account-details header-text="PayPal account" account-label="Account" recent-payment-label="Recent payment" next-payment-label="Next payment" edit-text="Edit" modal-connect-pay-pal-account-header="Connect PayPal account" cancel-text="Cancel" connect-pay-pal-account-button-text="Connect account" pay-pal-email-label="PayPal email" pay-pal-email-label-help-text="Enter the email used for your PayPal account." confirm-pay-pal-email-label="Confirm email" success-message="Success!" pay-pal-account-header-text="PayPal account" connect-pay-pal-description-text="Connect your PayPal account to automatically receive payments/cash rewards."></sqp-account-details>
 */
@Component({
  tag: 'sqp-account-details',
  shadow: true,
})
export class PaypalAccountDetails {
  @State()
  ignored = true;

  /**
   * @uiName Header Text
   * @uiGroup Details
   */
  @Prop() headerText: string = 'PayPal account';
  /**
   * @uiName Account Label
   * @uiGroup Details
   */
  @Prop() accountLabel: string = 'Account';
  /**
   * @uiName Recent Payment Label
   * @uiGroup Details
   */
  @Prop() recentPaymentLabel: string = 'Recent payment';
  /**
   * @uiName Next Payment Label
   * @uiGroup Details
   */
  @Prop() nextPaymentLabel: string = 'Next payment';
  /**
   * @uiName Edit Text
   * @uiGroup Details
   */
  @Prop() editText: string = 'Edit';
  /**
   * @uiName Modal Header
   * @uiGroup Form
   */
  @Prop() modalConnectPayPalAccountHeader: string = 'Connect PayPal account';
  /**
   * @uiName Cancel Text
   * @uiGroup Form
   */
  @Prop() cancelText: string = 'Cancel';
  /**
   * @uiName Connect Button Text
   * @uiGroup Form
   */
  @Prop() connectPayPalAccountButtonText: string = 'Connect account';
  /**
   * @uiName Paypal Email Label
   * @uiGroup Form
   */
  @Prop() payPalEmailLabel: string = 'PayPal email';
  /**
   * @uiName Email Help Text
   * @uiGroup Form
   */
  @Prop() payPalEmailLabelHelpText: string = 'Enter the email used for your PayPal account.';
  /**
   * @uiName Confirmation Email Text
   * @uiGroup Form
   */
  @Prop() confirmPayPalEmailLabel: string = 'Confirm email';
  /**
   * @uiName Success Message
   * @uiGroup Form
   */
  @Prop() successMessage: string = 'Success!';
  /**
   * @uiName Header Text
   * @uiGroup Form
   */
  @Prop() payPalAccountHeaderText: string = 'PayPal account';
  /**
   * @uiName Subheader Text
   * @uiGroup Form
   */
  @Prop() connectPayPalDescriptionText: string = 'Connect your PayPal account to automatically receive payments/cash rewards.';

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const props = useAccountDetails(getProps(this));
    // isDemo() ? useAccountDetailsDemo(getProps(this)) : useAccountDetails(getProps(this));

    return (
      <Host>
        <AccountFormView states={props.states} callbacks={props.callbacks} formContent={props.formContent} hasAccount={props.hasAccount} />
        <AccountDetailsView accountDetails={props.accountDetails} detailsContent={props.detailsContent} setOpen={props.callbacks.setOpen}></AccountDetailsView>
      </Host>
    );
  }
}

function useAccountDetailsDemo() {
  const [open, setOpen] = useState(false);
  return {
    hasAccount: true,
    states: {
      open,
    },
    callbacks: {
      setOpen,
    },
  };
}
