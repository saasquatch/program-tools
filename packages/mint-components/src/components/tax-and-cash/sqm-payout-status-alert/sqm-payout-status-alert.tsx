import { useQuery } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { GET_USER, UserQuery } from "../sqm-tax-and-cash/data";
import { useEffect } from "@saasquatch/universal-hooks";

type PayoutStatus =
  | "INFORMATION_REQUIRED"
  | "VERIFICATION_NEEDED"
  | "HOLD"
  | "DONE";
@Component({
  tag: "sqm-payout-status-alert",
  shadow: true,
})
export class PayoutStatusAlert {
  @Prop() informationRequiredHeader: string;
  @Prop() informationRequiredDescription: string;
  @Prop() informationRequiredButtonText: string;

  @Prop() verificationRequiredHeader: string;
  @Prop() verificationRequiredDescription: string;
  @Prop() verificationRequiredButtonText: string;

  @Prop() holdHeader: string;
  @Prop() holdDescription: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

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

    const props = usePayoutStatus();

    function informationRequiredAlert() {
      return (
        <sl-alert
          exportparts="base: alert-base, icon:alert-icon"
          type="info"
          open
        >
          <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
          <strong>{this.informationRequiredHeader}</strong>
          <br />
          {this.informationRequiredDescription}
          <sl-button>{this.informationRequiredButtonText}</sl-button>
        </sl-alert>
      );
    }

    function verificationRequiredAlert() {
      return (
        <sl-alert
          exportparts="base: alert-base, icon:alert-icon"
          type="info"
          open
        >
          <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
          <strong>{this.verificationRequiredHeader}</strong>
          <br />
          {this.verificationRequiredDescription}
          <sl-button>{this.verificationRequiredButtonText}</sl-button>
        </sl-alert>
      );
    }

    function holdAlert() {
      return (
        <sl-alert
          exportparts="base: alert-base, icon:alert-icon"
          type="info"
          open
        >
          <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
          <strong>{this.holdHeader}</strong>
          <br />
          {this.holdDescription}
        </sl-alert>
      );
    }

    function getAlert(status: PayoutStatus) {
      switch (status) {
        case "INFORMATION_REQUIRED":
          return informationRequiredAlert();
        case "VERIFICATION_NEEDED":
          return verificationRequiredAlert();
        case "HOLD":
          return holdAlert();
        case "DONE":
          return <div></div>;
      }
    }

    return getAlert(props.status);
  }
}
