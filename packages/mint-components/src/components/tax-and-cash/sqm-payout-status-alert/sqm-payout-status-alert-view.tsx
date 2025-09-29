import { h } from "@stencil/core";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";
import { EnforceUsTaxComplianceOption, PayoutStatus } from "./usePayoutStatus";
export interface PayoutStatusAlertViewProps {
  states: {
    error: boolean;
    loading: boolean;
    status: PayoutStatus;
    veriffLoading: boolean;
    enforceUsTaxComplianceOption?: EnforceUsTaxComplianceOption;
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
  };
  text: {
    informationRequiredHeader: string;
    informationRequiredDescription: string;
    informationRequiredButtonText: string;
    verificationRequiredHeader: string;
    verificationRequiredDescription: string;
    verificationRequiredButtonText: string;
    verificationRequiredInternalHeader: string;
    verificationRequiredInternalDescription: string;
    verificationReviewInternalHeader: string;
    verificationReviewInternalDescription: string;
    verificationFailedInternalHeader: string;
    verificationFailedInternalDescription: string;
    accountReviewHeader: string;
    accountReviewDescription: string;
    w9RequiredHeader: string;
    w9RequiredDescription: string;
    w9RequiredButtonText: string;
    holdHeader: string;
    holdDescription: string;
    supportLink: string;
    termsAndConditions: string;
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
  const { text, states, data, callbacks } = props;

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
      case "VERIFICATION:REQUIRED":
        return {
          header: text.verificationRequiredHeader,
          description: intl.formatMessage(
            {
              id: "verificationRequiredDescription",
              defaultMessage: text.verificationRequiredDescription,
            },
            {
              supportLink: (
                <a target="_blank" href={`mailto:advocate-support@impact.com`}>
                  {text.supportLink}
                </a>
              ),
            }
          ),
          buttonText: text.verificationRequiredButtonText,
          alertType: "warning",
          icon: "exclamation-triangle",
          class: sheet.classes.WarningAlertContainer,
        };
      case "VERIFICATION:INTERNAL":
        return {
          header: text.verificationRequiredInternalHeader,
          description: intl.formatMessage(
            {
              id: "verificationRequiredInternalDescription",
              defaultMessage: text.verificationRequiredInternalDescription,
            },
            {
              supportLink: (
                <a target="_blank" href={`mailto:advocate-support@impact.com`}>
                  {text.supportLink}
                </a>
              ),
            }
          ),
          alertType: "warning",
          icon: "exclamation-triangle",
          class: sheet.classes.WarningAlertContainer,
        };
      case "VERIFICATION:REVIEW":
        return {
          header: text.verificationReviewInternalHeader,
          description: intl.formatMessage(
            {
              id: "verificationReviewInternalDescription",
              defaultMessage: text.verificationReviewInternalDescription,
            },
            {
              supportLink: (
                <a target="_blank" href={`mailto:advocate-support@impact.com`}>
                  {text.supportLink}
                </a>
              ),
            }
          ),
          alertType: "warning",
          icon: "exclamation-triangle",
          class: sheet.classes.WarningAlertContainer,
        };
      case "VERIFICATION:FAILED":
        return {
          header: text.verificationFailedInternalHeader,
          description: intl.formatMessage(
            {
              id: "verificationFailedInternalDescription",
              defaultMessage: text.verificationFailedInternalDescription,
            },
            {
              supportLink: (
                <a target="_blank" href={`mailto:advocate-support@impact.com`}>
                  {text.supportLink}
                </a>
              ),
            }
          ),
          alertType: "critical",
          icon: "exclamation-octagon",
          class: sheet.classes.ErrorAlertContainer,
        };
      case "OVER_W9_THRESHOLD":
        if (states.enforceUsTaxComplianceOption === "CASH_ONLY_DEFER_W9") {
          return {
            header: text.w9RequiredHeader,
            description: intl.formatMessage(
              {
                id: "w9RequiredDescription",
                defaultMessage: text.w9RequiredDescription,
              },
              {
                termsAndConditions: (
                  <a
                    target="_blank"
                    href={`https://terms.advocate.impact.com/PayoutTermsAndConditions.html`}
                  >
                    {text.termsAndConditions}
                  </a>
                ),
              }
            ),
            buttonText: text.w9RequiredButtonText,
            alertType: "warning",
            icon: "exclamation-triangle",
            class: sheet.classes.WarningAlertContainer,
          };
        } else {
          return {
            header: text.holdHeader,
            description: intl.formatMessage(
              {
                id: "holdDescription",
                defaultMessage: text.holdDescription,
              },
              {
                supportLink: (
                  <a
                    target="_blank"
                    href={`mailto:advocate-support@impact.com`}
                  >
                    {text.supportLink}
                  </a>
                ),
              }
            ),
            buttonText: null,
            alertType: "warning",
            icon: "exclamation-triangle",
            class: sheet.classes.WarningAlertContainer,
          };
        }
      case "ACCOUNT_REVIEW":
        return {
          header: text.accountReviewHeader,
          description: intl.formatMessage(
            {
              id: "accountReviewDescription",
              defaultMessage: text.accountReviewDescription,
            },
            {
              supportLink: (
                <a target="_blank" href={`mailto:advocate-support@impact.com`}>
                  {text.supportLink}
                </a>
              ),
            }
          ),
          buttonText: null,
          alertType: "warning",
          icon: "exclamation-triangle",
          class: sheet.classes.WarningAlertContainer,
        };
      case "HOLD":
        return {
          header: text.holdHeader,
          description: intl.formatMessage(
            {
              id: "holdDescription",
              defaultMessage: text.holdDescription,
            },
            {
              supportLink: (
                <a target="_blank" href={`mailto:advocate-support@impact.com`}>
                  {text.supportLink}
                </a>
              ),
            }
          ),
          buttonText: null,
          alertType: "warning",
          icon: "exclamation-triangle",
          class: sheet.classes.WarningAlertContainer,
        };
      default:
        return;
    }
  }

  function getButton(status: PayoutStatus) {
    switch (status) {
      case "OVER_W9_THRESHOLD":
        if (states.enforceUsTaxComplianceOption === "CASH_ONLY") return;
        return data.type === "SquatchJS2" ? (
          <sqm-scroll
            scroll-tag-name="sqm-tabs"
            button-text={text.w9RequiredButtonText}
            scroll-animation="smooth"
          ></sqm-scroll>
        ) : data.type === "SquatchPortal" ? (
          <sl-button type="default" onClick={callbacks.onTermsClick}>
            {text.w9RequiredButtonText}
          </sl-button>
        ) : (
          // Demo case
          <sl-button type="default">{text.w9RequiredButtonText}</sl-button>
        );
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
          // Demo case
          <sl-button type="default">
            {text.informationRequiredButtonText}
          </sl-button>
        );
      case "VERIFICATION:REQUIRED":
        return (
          <sl-button
            type="default"
            loading={states.veriffLoading}
            onClick={callbacks.onClick}
          >
            {text.verificationRequiredButtonText}
          </sl-button>
        );
      default:
        return;
    }
  }

  if (states.loading) {
    return <sl-skeleton class={sheet.classes.SkeletonOne}></sl-skeleton>;
  }

  const alertDetails = getAlert(states.status);
  if (states.status === "DONE" || !alertDetails) {
    return <div></div>;
  }

  return (
    <div part="sqm-base">
      <style type="text/css">{styleString}</style>
      <sl-alert
        exportparts="base: alert-base, icon:alert-icon"
        type={alertDetails.alertType}
        class={alertDetails.class}
        open
      >
        <sl-icon slot="icon" name={alertDetails.icon}></sl-icon>
        <strong>{alertDetails.header}</strong>
        <p class={sheet.classes.AlertDescriptionText}>
          {alertDetails.description}
        </p>
        {getButton(states.status)}
      </sl-alert>
    </div>
  );
}
