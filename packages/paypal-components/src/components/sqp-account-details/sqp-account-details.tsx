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
import { Upcoming } from "./DetailsCard.stories";
import { Default } from "./ScheduleCard.stories";
/**
 * @uiName PayPal Account Details
 * @exampleGroup PayPal Components
 * @example PayPal Account Details - <sqp-account-details></sqp-account-details>
 */
@Component({
  tag: "sqp-account-details",
  shadow: true,
})
export class PaypalAccountDetails {
  @State()
  ignored = true;

  /**
   * @uiName Header
   * @uiGroup Account connected
   */
  @Prop() headerText: string = "Account";
  /**
   * @undocumented
   */
  @Prop() accountLabel: string = "Account";
  /**
   * @undocumented
   */
  @Prop() recentPaymentLabel: string = "Recent payment";
  /**
   * @undocumented
   */
  @Prop() nextPaymentLabel: string = "Next payment";
  /**
   * Text on payout card to indicate that this has rewards with multiple currencies.
   *
   * @uiName Other currencies label
   * @uiGroup Account connected
   */
  @Prop() otherCurrenciesLabel: string =
    "{amount} {amount, plural, =0 {other currencies} =1 {other currency} other {other currencies}}";
  /**
   * Text on a payout card to indicate that this reward is pending due to tax reasons.
   *
   * @uiName W9 tax label
   * @uiGroup Account connected
   */
  @Prop() w9TaxLabel: string = "Awaiting W-9 tax form";
  /**
   * @uiName Pending reward label
   * @uiGroup Account connected
   */
  @Prop() pendingDetailedStatusText: string =
    "Check rewards table for available date";
  /**
   * Badge label on a payout card to indicate that this is scheduled after their next payout.
   *
   * @uiName  Upcoming payout badge
   * @uiGroup Account connected
   */
  @Prop() upcomingPaymentLabel: string = "Upcoming";
  /**
   * Badge label on a payout card to indicate that this is their next scheduled payout.
   *
   * @uiName  Next payout badge
   * @uiGroup Account connected
   */
  @Prop() nextPayoutLabel: string = "Next payout";
  /**
   * @uiName  Pending Label
   * @uiGroup Account connected
   */
  @Prop() pendingLabel: string = "Pending";
  /**
   * Allows a participant to edit their account connection.
   *
   * @uiName Edit button label
   * @uiGroup Account connected
   */
  @Prop() editText: string = "Edit";
  /**
   * @undocumented
   */
  @Prop() integrationDomain: string =
    "https://paypal-payouts-staging.herokuapp.com/graphql";
  /**
   * @uiName Connect button label
   * @uiGroup Account not connected
   */
  @Prop() connectPayPalAccountButtonText: string = "Connect account";
  /**
   * Let your participants know they need to connect their PayPal account to receive payouts.
   *
   * @uiName Subheader text
   * @uiGroup Account not connected
   * @uiWidget textArea
   */
  @Prop() connectPayPalDescriptionText: string =
    "Connect your PayPal account to automatically receive payments/cash rewards.";
  /**
   * @uiName Header
   * @uiGroup Account not connected
   */
  @Prop() payPalAccountHeaderText: string = "PayPal account";
  /**
   * Header for the modal shown when a participant is connecting their acccount.
   * 
   * @uiName Connect account header
   * @uiGroup Account settings modal
   */
  @Prop() modalConnectPayPalAccountHeader: string = "Connect PayPal account";
  /**
   * @uiName Cancel button label
   * @uiGroup Account settings modal
   */
  @Prop() cancelText: string = "Cancel";
  /**
   * @uiName Submit button label
   * @uiGroup Account settings modal
   */
  @Prop() submitPayPalAccountButtonText: string = "Connect account";
  /**
   * Label for the input shown when a participant is connecting their account.
   * 
   * @uiName PayPal email label
   * @uiGroup Account settings modal
   */
  @Prop() payPalEmailLabel: string = "PayPal email";
  /**
   * @uiName Email help text
   * @uiGroup Account settings modal
   * @uiWidget textArea
   */
  @Prop() payPalEmailLabelHelpText: string =
    "Enter the email used for your PayPal account.";
  /**
   * Label for the input shown when a participant is connecting their account.
   *
   * @uiName Confirm email label
   * @uiGroup Account settings modal
   */
  @Prop() confirmPayPalEmailLabel: string = "Confirm email";
  /**
   * Alert message shown when a participant successfully connects, changes, or disconnects their PayPal account.
   * 
   * @uiName Success message
   * @uiGroup Account settings modal
   */
  @Prop() successMessage: string = "Success!";
  /**
   * Header for the section in the modal that allows a participant to change their connected PayPal account.
   *
   * @uiName Edit account header
   * @uiGroup Account settings modal
   */
  @Prop() connectAccountModalHeaderText: string = "Connected account settings";

  /**
   * @uiName Change account button label
   * @uiGroup Account settings modal
   */
  @Prop() connectAccountModalButtonText: string = "Change account";
  /**
   * Header for the section in the modal that allows a participant to disconnect their PayPal account.
   *
   * @uiName Disconnect account header
   * @uiGroup Account settings modal
   */
  @Prop() disconnectAccountHeaderText: string = "Disconnect account";
  /**
   * Description for the section in the modal that allows a participant to disconnect their PayPal account.
   *
   * @uiName Disconnect account description
   * @uiGroup Account settings modal
   * @uiWidget textArea
   */
  @Prop() disconnectAccountDescriptionText: string =
    "You will not be able to receive payments if you disconnect your PayPal account.";

  /**
   * @uiName Disconnect account button label
   * @uiGroup Account settings modal
   */
  @Prop() disconnectAccountButtonText: string = "Disconnect account";
  /**
   * @uiName Integration disabled alert header
   * @uiGroup Integration disabled alert
   * @uiWidget textArea
   */
  @Prop() integrationDisabledHeader: string =
    "PayPal payouts are currently disabled";
  /**
   * @uiName Integration disabled alert descriptio
   * @uiGroup Integration disabled alert
   * @uiWidget textArea
   */
  @Prop() integrationDisabledText: string =
    "Looks like this feature is turned off at the moment. Come back later to see if it’s enabled.";
  /**
   * @uiName Integration paused alert header text
   * @uiGroup Integration disabled alert
   */
  @Prop() integrationPausedHeader: string = "PayPal payouts are paused";
  /**
   * @uiName Integration paused alert body text
   * @uiGroup Integration disabled alert
   */
  @Prop() integrationPausedText: string =
    "This feature is paused at the moment, but dont worry—your rewards are still being tracked! Once this feature resumes, your payouts will continue on the next payout date.";
  /**
   * @uiName Integration disabled flag
   * @uiGroup Integration disabled alert
   */
  @Prop() integrationDisabled: boolean = false;
  /**
   * @undocumented
   */
  @Prop() integrationPaused: boolean = false;
  /**
   * @uiName Payout details label
   */
  @Prop() detailsHeaderText: string = "Payout details";
  /**
   * @uiName Schedule payout(s) label
   */
  @Prop() scheduleHeaderText: string = "Schedule";

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
        <sqp-graphql-client-provider domain={this.integrationDomain}>
          <sqp-paypal-details
            hasAccount={props.hasAccount}
            loading={props.states.loading}
            setOpen={props.callbacks.setOpen}
            integrationDisabled={props.integrationDisabled}
            integrationPaused={props.integrationPaused}
            detailsHeaderText={props.overviewContent.detailsHeaderText}
            scheduleHeaderText={props.overviewContent.scheduleHeaderText}
            editText={props.formContent.editText}
            integrationDisabledHeader={
              props.alertContent.integrationDisabledHeader
            }
            integrationDisabledText={props.alertContent.integrationDisabledText}
            integrationPausedHeader={props.alertContent.integrationPausedHeader}
            integrationPausedText={props.alertContent.integrationPausedText}
            payPalAccountHeaderText={props.formContent.payPalAccountHeaderText}
            connectPayPalDescriptionText={
              props.formContent.connectPayPalDescriptionText
            }
            connectPayPalAccountButtonText={
              props.formContent.connectPayPalAccountButtonText
            }
            pendingLabel={props.overviewContent.pendingLabel}
            nextPayoutLabel={props.overviewContent.nextPayoutLabel}
            upcomingPaymentLabel={props.overviewContent.upcomingPaymentLabel}
            otherCurrenciesLabel={props.overviewContent.otherCurrenciesLabel}
            pendingDetailedStatusText={
              props.overviewContent.pendingDetailedStatusText
            }
            w9TaxLabel={props.overviewContent.w9TaxLabel}
          />
        </sqp-graphql-client-provider>
        {/* <AccountDetailsView
          loading={props.states.loading}
          hasAccount={props.hasAccount}
          overviewContent={props.overviewContent}
          setOpen={props.callbacks.setOpen}
          integrationDisabled={props.integrationDisabled}
        ></AccountDetailsView> */}
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
      integrationDisabled: false,
      integrationPaused: false,
      callbacks: { submit: () => {}, setOpen, disconnect: () => {} },
      states: {
        editingAccount: false,
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
        submitPayPalAccountButtonText: props.submitPayPalAccountButtonText,
        payPalEmailLabel: props.payPalEmailLabel,
        payPalEmailLabelHelpText: props.payPalEmailLabelHelpText,
        confirmPayPalEmailLabel: props.confirmPayPalEmailLabel,
        successMessage: props.successMessage,
        payPalAccountHeaderText: props.payPalAccountHeaderText,
        connectPayPalDescriptionText: props.connectPayPalDescriptionText,
        connectAccountModalHeaderText: props.connectAccountModalHeaderText,
        connectAccountModalButtonText: props.connectAccountModalButtonText,
        disconnectAccountHeaderText: props.disconnectAccountHeaderText,
        disconnectAccountDescriptionText:
          props.disconnectAccountDescriptionText,
        disconnectAccountButtonText: props.disconnectAccountButtonText,
        editText: props.editText,
      },
      alertContent: {
        integrationDisabledHeader: props.integrationDisabledHeader,
        integrationDisabledText: props.integrationDisabledText,
        integrationPausedHeader: props.integrationPausedHeader,
        integrationPausedText: props.integrationPausedText,
      },
      overviewContent: {
        detailsHeaderText: props.detailsHeaderText,
        scheduleHeaderText: props.scheduleHeaderText,
        otherCurrenciesLabel: props.otherCurrenciesLabel,
        w9TaxLabel: props.w9TaxLabel,
        pendingDetailedStatusText: props.pendingDetailedStatusText,
        upcomingPaymentLabel: props.upcomingPaymentLabel,
        nextPayoutLabel: props.nextPayoutLabel,
        pendingLabel: props.pendingLabel,
        detailsContent: <Upcoming />,
        ScheduleContent: [<Default />],
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
