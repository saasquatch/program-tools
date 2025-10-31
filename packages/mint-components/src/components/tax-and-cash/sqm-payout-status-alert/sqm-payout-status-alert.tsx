import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import {
  PayoutStatusAlertView,
  PayoutStatusAlertViewProps,
} from "./sqm-payout-status-alert-view";
import { usePayoutStatus } from "./usePayoutStatus";
import { parseStates } from "../../../utils/parseStates";

/**
 * @uiName Payout Status Alert
 * @validParents ["sqm-portal-container","div","sqm-hero","sqm-instant-access-registration","sqm-brand","sqb-program-section","sqb-conditional-section"]
 * @exampleGroup Tax and Cash
 * @example Payout Status Alert - <sqm-payout-status-alert></sqm-payout-status-alert>
 */
@Component({
  tag: "sqm-payout-status-alert",
  shadow: true,
})
export class PayoutStatusAlert {
  /**
   * @uiName Info required alert header
   */
  @Prop() informationRequiredHeader: string =
    "Payout and tax information required";
  /**
   *
   * @uiName Edit payment info button label
   */
  @Prop() editPaymentInformationButton: string = "Edit Payout Information";
  /**
   * @uiName Submit new tax form button label
   */
  @Prop() newFormButton: string = "Submit new form";
  /**
   * @uiName Info required alert description
   */
  @Prop() informationRequiredDescription: string =
    "Submit your banking details and tax documents to receive your rewards.";
  /**
   * @uiName Info required alert button text
   */
  @Prop() informationRequiredButtonText: string = "Payouts & Tax Settings";
  /**
   * @uiName Verification required alert header
   */
  @Prop() verificationRequiredHeader: string = "Verify your identity";
  /**
   * @uiName Verification required alert description
   */
  @Prop() verificationRequiredDescription: string =
    "It should only take a few minutes verify. If you run in to an issue verifying your identity contact our {supportLink}.";
  /**
   * @uiName Verification required alert button text
   */
  @Prop() verificationRequiredButtonText: string = "Start Verification";
  /**
   * @uiName Verification required internal alert header
   */
  @Prop() verificationRequiredInternalHeader: string =
    "Identity Verification in progress";
  /**
   * @uiName Verification required internal alert description
   */
  @Prop() verificationRequiredInternalDescription: string =
    "Identity verification submission has been received. Our system is currently performing additional checks and analyzing the results. You will be updated shortly. If you don't hear from us contact our {supportLink}.";
  /**
   * @uiName Verification review internal alert header
   */
  @Prop() verificationReviewInternalHeader: string =
    "Identity Verification under review";
  /**
   * @uiName Verification review internal alert description
   */
  @Prop() verificationReviewInternalDescription: string =
    "Identity verification requires further review due to a potential error. Our team is reviewing the information and will update you shortly. If you don't hear from us contact our {supportLink}.";
  /**
   * @uiName Verification failed internal alert header
   */
  @Prop() verificationFailedInternalHeader: string =
    "Identity verification unsuccessful";
  /**
   * @uiName Verification failed internal alert description
   */
  @Prop() verificationFailedInternalDescription: string =
    "Identity verification has failed. Our team is reviewing the report and will contact you with further information. If you don't hear from us contact our {supportLink}.";
  /**
   * @uiName Account review alert header
   */
  @Prop() accountReviewHeader: string = "Your account is under review";
  /**
   * @uiName Account review alert description
   */
  @Prop() accountReviewDescription: string =
    "This process takes 48 hours, payouts are on hold until it's completed. You will receive an email from our referral provider, Impact.com, if any issues arise.  It contains details on how to resolve this issue. If you need further assistance, please reach out to our {supportLink}.";
  /**
   * @uiName Payment on hold alert header
   */
  @Prop() paymentHoldOnChangeHeader: string =
    "We are reviewing your new payout settings";
  /**
   * @uiName Payment on hold alert description
   */
  @Prop() paymentHoldOnChangeDescription: string =
    "Your payout is temporarily on hold while we review your new payment information, this process is usually resolved within 48 hours.";

  /**
   * @uiName Beneficiary name invalid alert header
   */
  @Prop() beneficiaryNameInvalidHeader: string =
    "Your payment information does not match your tax form";
  /**
   * @uiName Beneficiary name invalid description
   */
  @Prop() beneficiaryNameInvalidDescription: string =
    "The beneficiary name in your payment information does not match what was submitted in your tax form. Please review and update your payment information or tax form so that they match exactly and do not include any invalid characters. Your payouts are on hold until this is resolved.";

  /**
   * @uiName Beneficiary name mismatch alert header
   */
  @Prop() beneficiaryNameMismatchHeader: string =
    "Your payment information does not match your tax form";
  /**
   * @uiName Beneficiary name mismatch alert description
   */
  @Prop() beneficiaryNameMismatchDescription: string =
    "The beneficiary name in your payment information does not match what was submitted in your tax form. Please review and update your payment information or tax form so that they match exactly and do not include any invalid characters. Your payouts are on hold until this is resolved.";

  /**
   * @uiName Bank name mismatch alert header
   */
  @Prop() bankTaxNameMismatchHeader: string =
    "Your payment information does not match your tax form";
  /**
   * @uiName Bank name mismatch alert description
   */
  @Prop() bankTaxNameMismatchDescription: string =
    "The bank name in your payment information does not match what was submitted in your tax form. Please review and update your payment information or tax form so that they match exactly and do not include any invalid characters. Your payouts are on hold until this is resolved.";

  /**
   * @uiName Withdrawal settings invalid alert header
   */
  @Prop() withdrawalSettingsInvalidHeader: string =
    "Your payment information is incomplete or includes invalid characters";
  /**
   * @uiName Withdrawal settings invalid alert description
   */
  @Prop() withdrawalSettingsInvalidDescription: string =
    "There are missing fields or invalid characters in your payment information. Please review your information and make sure it is correct. Your payouts are on hold until this is resolved.";

  /**
   * @uiName Payment returned alert header
   */
  @Prop() paymentReturnedHeader: string = "Payout unsuccessful";
  /**
   * @uiName Payment returned alert description
   */
  @Prop() paymentReturnedDescription: string =
    "Our recent payment attempt for your earnings was unsuccessful. Please review your payment information and make sure it is correct.";

  /**
   * @uiName W-9 payment threshold alert header
   */
  @Prop() w9RequiredHeader: string = "Your next payout is on hold";
  /**
   * @uiName W-9 payment threshold alert description
   */
  @Prop() w9RequiredDescription: string =
    "You have surpassed the $600 threshold requiring a W-9 form or have multiple accounts with impact.com. To remove the hold, please submit your W-9 form.";
  /**
   * @uiName W-9 payment threshold alert button text
   */
  @Prop() w9RequiredButtonText: string = "Submit W-9";
  /**
   * @uiName Payout on hold alert header
   */
  @Prop() holdHeader: string = "Your payouts and account are on hold";
  /**
   * @uiName Payout on hold alert description
   */
  @Prop() holdDescription: string =
    "Please check your inbox for an email from our referral provider, impact.com. It contains details on how to resolve this issue. If you need further assistance, feel free to reach out to our {supportLink}.";
  /**
   * @uiName Cash & Payouts Microsite Page (only set if alert is used in a microsite)
   */
  @Prop() cashPayoutsPageUrl: string = "/taxAndCash";
  /**
   * @uiName Support link text
   */
  @Prop() supportLink: string = "support team";
  /**
   * @uiName Terms and Conditions text
   */
  @Prop() termsAndConditions: string = "Terms and Conditions";
  /**
   * @uiName Error header
   */
  @Prop() errorHeader: string = "Could not determine payout status.";
  /**
   * @uiName Error description
   */
  @Prop() errorDescription: string =
    "There was an error with determining your payout status.";

  /**
   * @undocumented
   * @componentState { "title": "Payout Info Required", "props": { "states": { "status": "INFORMATION_REQUIRED" } }, "dependencies": ["sqm-payout-status-alert"] }
   * @componentState { "title": "Verification Required", "props": { "states": { "status": "VERIFICATION:REQUIRED" } }, "dependencies": ["sqm-payout-status-alert"] }
   * @componentState { "title": "Identity Verification", "props": { "states": { "status": "VERIFICATION:REVIEW" } }, "dependencies": ["sqm-payout-status-alert"] }
   * @componentState { "title": "Account Hold", "props": { "states": { "status": "HOLD" } }, "dependencies": ["sqm-payout-status-alert"] }
   */
  @Prop() stateController?: string = "{}";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PayoutStatusAlertViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  getTextProps() {
    return getProps(this);
  }

  render() {
    const props = isDemo()
      ? useDemoPayoutStatusAlert(this)
      : usePayoutStatus(this);

    return <PayoutStatusAlertView {...props} />;
  }
}

function useDemoPayoutStatusAlert(
  props: PayoutStatusAlert
): PayoutStatusAlertViewProps {
  const states = parseStates(props.stateController);
  const formatted = Object.keys(states).reduce(
    (prev, key) =>
      key === "sqm-payout-status-alert"
        ? { ...prev, ...states[key] }
        : { ...prev, [`${key}_stateController`]: states[key] },
    {}
  );

  return deepmerge(
    {
      states: {
        error: false,
        status: props.demoData.states.status,
        loading: false,
        veriffLoading: false,
      },
      data: { type: "SquatchAdmin" },
      text: props.getTextProps(),
      callbacks: {
        onTermsClick: () => {},
        onClick: () => console.log("show"),
        onPaymentInfoClick: () => {},
        onNewFormClick: () => {},
      },
    },
    formatted || props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
