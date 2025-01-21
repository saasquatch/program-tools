import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { PayoutStatus } from "./usePayoutStatus";
export interface PayoutStatusAlertViewProps {
  states: {
    loading: boolean;
    status: PayoutStatus;
    showVerifyIdentity: boolean;
  };
  callbacks: {
    onClick: () => void;
    onCancel: () => void;
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
  WarningAlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-yellow-100)",
      borderTop: "none",
    },

    "& sl-icon::part(base)": {
      color: "var(--sl-color-danger-500)",
    },
  },
  InfoAlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-sky-100)",
      borderTop: "none",
    },
    "& sl-icon::part(base)": {
      color: "var(--sl-color-blue-500)",
    },
  },
  Dialog: {
    "&::part(panel)": {
      height: "600px",
    },
    "&::part(close-button)": {
      marginBottom: "var(--sl-spacing-xx-large)",
    },
    "&::part(title)": {
      display: "none",
    },
    "&::part(header)": {},
    "&::part(body)": { padding: "0" },
    "&::part(footer)": {},
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function PayoutStatusAlertView(props: PayoutStatusAlertViewProps) {
  const { text, states, callbacks } = props;

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
          icon: "info-circle",
          class: sheet.classes.InfoAlertContainer,
        };
      case "VERIFICATION_NEEDED":
        return {
          header: text.verificationRequiredHeader,
          description: text.verificationRequiredDescription,
          buttonText: text.verificationRequiredButtonText,
          alertType: "warning",
          icon: "exclamation-triangle",
          class: sheet.classes.WarningAlertContainer,
        };
      case "HOLD":
        return {
          header: text.holdHeader,
          description: text.holdDescription,
          buttonText: null,
          alertType: "warning",
          icon: "exclamation-triangle",
          class: sheet.classes.WarningAlertContainer,
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
            scroll-tag-name="sqm-tabs"
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
            onClick={() => callbacks.onClick}
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
      <sl-alert
        exportparts="base: alert-base, icon:alert-icon"
        type={getAlert(states.status)?.alertType}
        class={getAlert(states.status)?.class}
        open
      >
        <sl-icon slot="icon" name={getAlert(states.status)?.icon}></sl-icon>
        <strong>{getAlert(states.status)?.header}</strong>
        <p class={sheet.classes.AlertDescriptionText}>
          {getAlert(states.status)?.description}
        </p>
        {getButton(states.status)}
      </sl-alert>
      <sl-dialog
        noDismiss
        class={sheet.classes.Dialog}
        open={states.showVerifyIdentity}
        onSl-hide={callbacks.onCancel}
      >
        <iframe
          // AL: TODO replace iframe URL with verification url when available
          scrolling="yes"
          frameBorder="0"
          width={"100%"}
          height={"100%"}
          src="https://impacttech.complytaxforms.com/ServiceRedirect.aspx?Language=eng&Param1=UxBORV4bOIrqNb4gbpNmtvW3wjdZJyx4gPElIGMJNR8=&UUID=B576EA3E-80FD-4D85-AA59-653D23A7CCE8"
        ></iframe>
      </sl-dialog>
    </div>
  );
}
