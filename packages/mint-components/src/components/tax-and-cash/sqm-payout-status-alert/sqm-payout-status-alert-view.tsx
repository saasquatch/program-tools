import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { PayoutStatus } from "./usePayoutStatus";
export interface PayoutStatusAlertViewProps {
  states: {
    error: boolean;
    loading: boolean;
    status: PayoutStatus;
    showVerifyIdentity: boolean;
  };
  data: {
    type:
      | "SquatchJS2"
      | "SquatchAndroid"
      | "SquatchIOS"
      | "SquatchPortal"
      | "SquatchAdmin"
      | "None";
  };
  callbacks: {
    onClick: () => void;
    onTermsClick: () => void;
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
    errorHeader: string;
    errorDescription: string;
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
  ErrorAlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-red-100)",
      borderTop: "none",
    },

    "& sl-icon::part(base)": {
      color: "var(--sl-color-danger-500)",
    },
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
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function PayoutStatusAlertView(props: PayoutStatusAlertViewProps) {
  const { text, states, data, callbacks } = props;

  if (states.loading) {
    return <sl-skeleton class={sheet.classes.SkeletonOne}></sl-skeleton>;
  }

  if (states.status === "DONE") {
    return <div></div>;
  }

  function getAlert(status: PayoutStatus) {
    if (states.error)
      return {
        header: text.errorHeader,
        description: text.errorDescription,
        buttonText: null,
        alertType: "critical",
        icon: "exclamation-triangle",
        class: sheet.classes.ErrorAlertContainer,
      };

    switch (status) {
      case "INFORMATION_REQUIRED":
        return {
          header: text.informationRequiredHeader,
          description: text.informationRequiredDescription,
          buttonText: text.informationRequiredButtonText,
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
        return data.type === "SquatchJS2" ? (
          <sqm-scroll
            scroll-tag-name="sqm-tabs"
            button-text={text.informationRequiredButtonText}
            scroll-animation="smooth"
          ></sqm-scroll>
        ) : data.type === "SquatchPortal" ? (
          <sl-button type="default" onClick={callbacks.onTermsClick}>
            {text.informationRequiredButtonText}
          </sl-button>
        ) : (
          <sl-button type="default">
            {text.informationRequiredButtonText}
          </sl-button>
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
        // class={sheet.classes.Dialog}
        open={states.showVerifyIdentity}
        onSl-hide={callbacks.onCancel}
      >
        AL: TODO add IFRAME URL
      </sl-dialog>
    </div>
  );
}
