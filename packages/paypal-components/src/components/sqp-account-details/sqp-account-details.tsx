import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useRef, useState } from "@saasquatch/universal-hooks";
import { Component, h, Host, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import {
  AccountDetailsView,
  AccountDetailsViewProps,
} from "./sqp-account-details-view";
import { AccountFormView, AccountFormViewProps } from "./sqp-account-form-view";
import { useAccountDetails } from "./useAccountDetails";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
/**
 * @uiName Paypal Account Details
 * @slots [{"name":"","title":"Form Slot"}]
 * @exampleGroup Paypal Components
 * @example Paypal Account Details - <sqp-account-details header-text="PayPal account" account-label="Account" recent-payment-label="Recent payment" next-payment-label="Next payment" edit-text="Edit" modal-connect-pay-pal-account-header="Connect PayPal account" cancel-text="Cancel" connect-pay-pal-account-button-text="Connect account" pay-pal-email-label="PayPal email" pay-pal-email-label-help-text="Enter the email used for your PayPal account." confirm-pay-pal-email-label="Confirm email" success-message="Success!" pay-pal-account-header-text="PayPal account" connect-pay-pal-description-text="Connect your PayPal account to automatically receive payments/cash rewards."></sqp-account-details>
 */
@Component({
  tag: "sqp-account-details",
  shadow: true,
})
export class PaypalAccountDetails {
  @State()
  ignored = true;

  /**
   * @uiName Header Text
   * @uiGroup Details
   */
  @Prop() headerText: string = "PayPal account";
  /**
   * @uiName Account Label
   * @uiGroup Details
   */
  @Prop() accountLabel: string = "Account";
  /**
   * @uiName Recent Payment Label
   * @uiGroup Details
   */
  @Prop() recentPaymentLabel: string = "Recent payment";
  /**
   * @uiName Next Payment Label
   * @uiGroup Details
   */
  @Prop() nextPaymentLabel: string = "Next payment";
  /**
   * @uiName Edit Text
   * @uiGroup Details
   */
  @Prop() editText: string = "Edit";
  /**
   * @uiName Modal Header
   * @uiGroup Form
   */
  @Prop() modalConnectPayPalAccountHeader: string = "Connect PayPal account";
  /**
   * @uiName Cancel Text
   * @uiGroup Form
   */
  @Prop() cancelText: string = "Cancel";
  /**
   * @uiName Connect Button Text
   * @uiGroup Form
   */
  @Prop() connectPayPalAccountButtonText: string = "Connect account";
  /**
   * @uiName Paypal Email Label
   * @uiGroup Form
   */
  @Prop() payPalEmailLabel: string = "PayPal email";
  /**
   * @uiName Email Help Text
   * @uiGroup Form
   */
  @Prop() payPalEmailLabelHelpText: string =
    "Enter the email used for your PayPal account.";
  /**
   * @uiName Confirmation Email Text
   * @uiGroup Form
   */
  @Prop() confirmPayPalEmailLabel: string = "Confirm email";
  /**
   * @uiName Success Message
   * @uiGroup Form
   */
  @Prop() successMessage: string = "Success!";
  /**
   * @uiName Header Text
   * @uiGroup Form
   */
  @Prop() payPalAccountHeaderText: string = "PayPal account";
  /**
   * @uiName Subheader Text
   * @uiGroup Form
   */
  @Prop() connectPayPalDescriptionText: string =
    "Connect your PayPal account to automatically receive payments/cash rewards.";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<AccountDetailsViewProps & AccountFormViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const props = isDemo()
      ? useAccountDetailsDemo(getProps(this))
      : useAccountDetails(getProps(this));

    return (
      <Host>
        <AccountFormView
          formRef={props.formRef}
          states={props.states}
          callbacks={props.callbacks}
          formContent={props.formContent}
          hasAccount={props.hasAccount}
        />
        <AccountDetailsView
          hasAccount={props.hasAccount}
          accountDetails={props.accountDetails}
          detailsContent={props.detailsContent}
          setOpen={props.callbacks.setOpen}
        ></AccountDetailsView>
      </Host>
    );
  }
}

function useAccountDetailsDemo(props: PaypalAccountDetails) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  return deepmerge(
    {
      formRef,
      setupAccount: () => {},
      hasAccount: false,
      accountDetails: {
        email: "test@example.com",
        recentPayment: { amount: 10000, date: 12345678900 },
        nextPayment: {
          date: 12345678900,
        },
      },
      callbacks: { submit: () => {}, setOpen },
      states: {
        loading: false,
        error: undefined,
        success: false,
        open,
      },
      detailsContent: {
        headerText: props.headerText,
        accountLabel: props.accountLabel,
        recentPaymentLabel: props.recentPaymentLabel,
        nextPaymentLabel: props.nextPaymentLabel,
        editText: props.editText,
      },
      formContent: {
        modalConnectPayPalAccountHeader: props.modalConnectPayPalAccountHeader,
        cancelText: props.cancelText,
        connectPayPalAccountButtonText: props.connectPayPalAccountButtonText,
        payPalEmailLabel: props.payPalEmailLabel,
        payPalEmailLabelHelpText: props.payPalEmailLabelHelpText,
        confirmPayPalEmailLabel: props.confirmPayPalEmailLabel,
        successMessage: props.successMessage,
        payPalAccountHeaderText: props.payPalAccountHeaderText,
        connectPayPalDescriptionText: props.connectPayPalDescriptionText,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
