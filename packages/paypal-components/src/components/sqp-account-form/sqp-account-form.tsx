import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { AccountFormView } from "./sqp-account-form-view";
import { useAccountForm } from "./useAccountForm";

/**
 * @uiName Paypal Account Form
 * @exampleGroup Paypal Components
 * @example Paypal Account Form - <sqp-account-form modal-connect-pay-pal-account-header="Connect PayPal account" cancel-text="Cancel" connect-pay-pal-account-button-text="Connect account" pay-pal-email-label="PayPal email" pay-pal-email-label-help-text="Enter the email used for your PayPal account." confirm-pay-pal-email-label="Confirm email" success-message="Success!" pay-pal-account-header-text="PayPal account" connect-pay-pal-description-text="Connect your PayPal account to automatically receive payments/cash rewards."></sqp-account-form>
 */
@Component({
  tag: "sqp-account-form",
})
export class PaypalAccountForm {
  @State()
  ignored = true;

  /**
   * @uiName Modal Header
   */
  @Prop() modalConnectPayPalAccountHeader: string = "Connect PayPal account";
  /**
   * @uiName Cancel Text
   */
  @Prop() cancelText: string = "Cancel";
  /**
   * @uiName Connect Button Text
   */
  @Prop() connectPayPalAccountButtonText: string = "Connect account";
  /**
   * @uiName Paypal Email Label
   */
  @Prop() payPalEmailLabel: string = "PayPal email";
  /**
   * @uiName Email Help Text
   */
  @Prop() payPalEmailLabelHelpText: string = "Enter the email used for your PayPal account.";
  /**
   * @uiName Confirmation Email Text
   */
  @Prop() confirmPayPalEmailLabel: string = "Confirm email";
  /**
   * @uiName Success Message
   */
  @Prop() successMessage: string = "Success!";
  /**
   * @uiName Header Text
   */
  @Prop() payPalAccountHeaderText: string = "PayPal account";
  /**
   * @uiName Subheader Text
   */
  @Prop() connectPayPalDescriptionText: string = "Connect your PayPal account to automatically receive payments/cash rewards.";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const props = useAccountForm(getProps(this));
    // isDemo() ? useAccountFormDemo() : useAccountForm();

    return <AccountFormView {...props} />;
  }
}

function useAccountFormDemo() {
  return {};
}
