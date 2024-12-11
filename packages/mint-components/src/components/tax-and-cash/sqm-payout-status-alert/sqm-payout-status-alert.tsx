import { useQuery } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { GET_USER, UserQuery } from "../sqm-tax-and-cash/data";
import { useEffect } from "@saasquatch/universal-hooks";
import { isDemo } from "../../../utils/isDemo";
import {
  PayoutStatusAlertView,
  PayoutStatusAlertViewProps,
} from "./sqm-payout-status-alert-view";
import { getProps } from "../../../utils/utils";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";

export type PayoutStatus =
  | "INFORMATION_REQUIRED"
  | "VERIFICATION_NEEDED"
  | "HOLD"
  | "DONE";
@Component({
  tag: "sqm-payout-status-alert",
  shadow: true,
})
export class PayoutStatusAlert {
  @Prop() informationRequiredHeader: string =
    "Payout and tax information required";
  @Prop() informationRequiredDescription: string =
    "Submit your banking details and tax documents to receive your rewards.";
  @Prop() informationRequiredButtonText: string = "Payouts & Tax Settings";

  @Prop() verificationRequiredHeader: string = "Verify your identity";
  @Prop() verificationRequiredDescription: string =
    "Complete your verification to start receiving your cash rewards. It should only take a few minutes verify.";
  @Prop() verificationRequiredButtonText: string = "Start Verification";

  @Prop() holdHeader: string = "Your payouts and account are on hold";
  @Prop() holdDescription: string =
    "Please check your inbox for an email from our referral provider, impact.com. It contains details on how to resolve this issue. If you need further assistance, feel free to reach out to {support email}.";

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
    function usePayoutStatus() {
      const { loading, data, errors, refetch } = useQuery<UserQuery>(
        GET_USER,
        {}
      );
      const [status, setStatus] = useState<PayoutStatus | undefined>(undefined);

      useEffect(() => {
        if (!data) return;

        function getStatus(data: UserQuery): PayoutStatus {
          const account = data.user.impactConnection?.publisher?.payoutsAccount;

          if (!account) return "INFORMATION_REQUIRED";
          if (account.hold) return "HOLD";
          // @ts-ignore, TODO: add check for account verification
          if (!account.verified) return "VERIFICATION_NEEDED";
          return "DONE";
        }

        const s = getStatus(data);
        setStatus(s);
      }, [data]);

      useEffect(() => {
        const cb = () => refetch();
        window.addEventListener("sqm:tax-form-updated", cb);
        return () => window.removeEventListener("sqm:tax-form-updated", cb);
      }, []);

      return { loading, status };
    }

    // const props = isDemo() ? useDemoPayoutStatusAlert(this) : usePayoutStatus();

    const props = useDemoPayoutStatusAlert(this);
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
      },
      text: props.getTextProps(),
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
