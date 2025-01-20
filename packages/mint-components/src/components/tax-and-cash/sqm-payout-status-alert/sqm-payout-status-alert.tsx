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
   * @uiName Payout on hold alert header
   */
  @Prop() holdHeader: string = "Your payouts and account are on hold";
  /**
   * @uiName Payout on hold alert description
   */
  @Prop() holdDescription: string =
    "Please check your inbox for an email from our referral provider, impact.com. It contains details on how to resolve this issue. If you need further assistance, feel free to reach out to {support email}.";
  /**
   * @uiName Cash & Payouts Terms and Conditions url
   */
  @Prop() termsUrl: string =
    "https://terms.advocate.impact.com/PayoutTermsAndConditions.html";

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
  return deepmerge(
    {
      states: {
        status: "INFORMATION_REQUIRED",
        loading: false,
        showVerifyIdentity: false,
      },
      data: { type: "SquatchAdmin" },
      text: props.getTextProps(),
      callbacks: {
        onTermsClick: () => {},
        onClick: () => console.log("show"),
        onCancel: () => console.log("hide"),
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
