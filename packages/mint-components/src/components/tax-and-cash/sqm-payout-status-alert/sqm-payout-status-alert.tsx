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
import { isDemo } from "@saasquatch/component-boilerplate";

/**
 * @uiName Payout Status Alert
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
    "Complete your verification to start receiving your cash rewards. It should only take a few minutes verify.";
  /**
   * @uiName Verification required alert button text
   */
  @Prop() verificationRequiredButtonText: string = "Start Verification";
  /**
   * @uiName Verification required internal alert header
   */
  @Prop() verificationRequiredInternalHeader: string =
    "Verification in Progress";
  /**
   * @uiName Verification required internal alert description
   */
  @Prop() verificationRequiredInternalDescription: string =
    "Verification submission has been received. Our system is currently performing additional checks and analyzing the results. You will be updated shortley.";
  /**
   * @uiName Verification review internal alert header
   */
  @Prop() verificationReviewInternalHeader: string =
    "Verification Under Review";
  /**
   * @uiName Verification review internal alert description
   */
  @Prop() verificationReviewInternalDescription: string =
    "Verification requires further review due to a potential error. Our team is reviewing the information and will update you shortly.";
  /**
   * @uiName Verification failed internal alert header
   */
  @Prop() verificationFailedInternalHeader: string =
    "Verification Unsuccessful";
  /**
   * @uiName Verification failed internal alert description
   */
  @Prop() verificationFailedInternalDescription: string =
    "Verification has failed. Our team is reviewing the report and will contact you with further information.";
  /**
   * @uiName Payout on hold alert header
   */
  @Prop() holdHeader: string = "Your payouts and account are on hold";
  /**
   * @uiName Payout on hold alert description
   * AL: TODO copy not finalized for support section
   */
  @Prop() holdDescription: string =
    "Please check your inbox for an email from our referral provider, impact.com. It contains details on how to resolve this issue. If you need further assistance, feel free to reach out to our support team.";
  /**
   * @uiName Cash & Payouts Terms and Conditions url
   */
  @Prop() termsUrl: string =
    "https://terms.advocate.impact.com/PayoutTermsAndConditions.html";

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

    console.log({ props });

    return <PayoutStatusAlertView {...props} />;
  }
}

function useDemoPayoutStatusAlert(
  props: PayoutStatusAlert
): PayoutStatusAlertViewProps {
  return deepmerge(
    {
      states: {
        error: false,
        status: "INFORMATION_REQUIRED",
        loading: false,
        showVerifyIdentity: false,
      },
      data: { type: "SquatchAdmin" },
      text: props.getTextProps(),
      callbacks: {
        onTermsClick: () => {},
        onClick: () => console.log("show"),
        // onCancel: () => console.log("hide"),
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
