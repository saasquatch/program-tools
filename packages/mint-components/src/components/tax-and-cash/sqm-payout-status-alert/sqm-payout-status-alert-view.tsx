import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { PayoutStatus } from "./sqm-payout-status-alert";
export interface PayoutStatusAlertViewProps {
  states: {
    loading: boolean;
    status: PayoutStatus;
  };
  text: {
    informationRequiredHeader: string;
    informationRequiredDescription: string;
    informationRequiredButtonText: string;
    verificationRequiredHeader: string;
    verificationRequiredDescription: string;
    verificationRequiredButtonText: string;
    holdHeader: string;
    holdDescription: string;
  };
}

const style = {
  SkeletonOne: {
    width: "50%",
    height: "16px",
  },
  AlertDescriptionText: {
    margin: "0",
    marginBottom: "var(--sl-spacing-small)",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function PayoutStatusAlertView(props: PayoutStatusAlertViewProps) {
  const { text, states } = props;

  if (states.loading) {
    return <sl-skeleton class={sheet.classes.SkeletonOne}></sl-skeleton>;
  }

  if (states.status === "DONE") {
    return <div></div>;
  }

  function getAlert(status: PayoutStatus) {
    switch (status) {
      case "INFORMATION_REQUIRED":
        return {
          header: text.informationRequiredHeader,
          description: text.informationRequiredDescription,
          buttonText: text.verificationRequiredButtonText,
          alertType: "info",
          icon: "exclamation-octagon",
        };
      case "VERIFICATION_NEEDED":
        return {
          header: text.verificationRequiredHeader,
          description: text.verificationRequiredDescription,
          buttonText: text.verificationRequiredButtonText,
          alertType: "warning",
          icon: "exclamation-octagon",
        };
      case "HOLD":
        return {
          header: text.holdHeader,
          description: text.holdDescription,
          buttonText: null,
          alertType: "warning",
          icon: "exclamation-octagon",
        };
      default:
        return;
    }
  }
  //AL: TODO hookup ID
  function getButton(status: PayoutStatus) {
    switch (status) {
      case "INFORMATION_REQUIRED":
        return (
          <sqm-scroll
            scroll-tag-name="sqm-text"
            button-text="Payout and tax settings"
            scroll-animation="smooth"
          ></sqm-scroll>
        );
      case "VERIFICATION_NEEDED":
        return (
          <sl-button
            type="default"
            loading={states.loading}
            //AL: TODO callback to open verification form
            // onClick={(e) => {
            //   callbacks.onSubmit(e);
            // }}
          >
            {text.verificationRequiredButtonText}
          </sl-button>
        );
      default:
        return;
    }
  }
  return (
    <div part="sqm-base">
      <style type="text/css">{styleString}</style>
      <sqm-form-message
        style={{ display: "flex", gap: "2px" }}
        exportparts="base: alert-base, icon:alert-icon"
        type={getAlert(states.status).alertType}
      >
        <sl-icon slot="icon" name={getAlert(states.status).icon}></sl-icon>
        <strong>{getAlert(states.status).header}</strong>
        <p class={sheet.classes.AlertDescriptionText}>
          {getAlert(states.status).description}
        </p>
        {getButton(states.status)}
      </sqm-form-message>
    </div>
  );
}
