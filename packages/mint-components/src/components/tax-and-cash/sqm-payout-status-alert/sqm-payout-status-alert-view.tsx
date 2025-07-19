import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { PayoutStatus } from "./usePayoutStatus";
import { intl } from "../../../global/global";
export interface PayoutStatusAlertViewProps {
  states: {
    error: boolean;
    loading: boolean;
    status: PayoutStatus;
    veriffLoading: boolean;
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
    holdHeader: string;
    holdDescription: string;
    supportLink: string;
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

const vanillaStyle = `
  a {
    color: inherit;
    text-decoration: underline;
    cursor: pointer;
  }
`;

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
      };

    switch (status) {
      case "INFORMATION_REQUIRED":
        return {
          header: text.informationRequiredHeader,
          description: text.informationRequiredDescription,
          buttonText: text.informationRequiredButtonText,
          alertType: "info",
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
        };
      default:
        return;
    }
  }

  function getButton(status: PayoutStatus) {
    switch (status) {
      case "INFORMATION_REQUIRED":
        return data.type === "SquatchJS2" ? (
          <div style={{ paddingTop: "10px" }}>
            <sqm-scroll
              scroll-tag-name="sqm-tabs"
              button-text={text.informationRequiredButtonText}
              scroll-animation="smooth"
            ></sqm-scroll>
          </div>
        ) : data.type === "SquatchPortal" ? (
          <div style={{ paddingTop: "10px" }}>
            <sl-button
              type="secondary"
              exportparts="base: secondarybutton-base"
              onClick={callbacks.onTermsClick}
            >
              {text.informationRequiredButtonText}
            </sl-button>
          </div>
        ) : (
          // Demo case
          <div style={{ paddingTop: "10px" }}>
            <sl-button
              type="secondary"
              exportparts="base: secondarybutton-base"
            >
              {text.informationRequiredButtonText}
            </sl-button>
          </div>
        );
      case "VERIFICATION:REQUIRED":
        return (
          <div style={{ paddingTop: "10px" }}>
            <sl-button
              type="secondary"
              exportparts="base: secondarybutton-base"
              loading={states.veriffLoading}
              onClick={callbacks.onClick}
            >
              {text.verificationRequiredButtonText}
            </sl-button>
          </div>
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
      <style type="text/css">{vanillaStyle}</style>
      <sqm-form-message type={alertDetails.alertType}>
        <p part="alert-title">{alertDetails.header}</p>
        <p part="alert-description">{alertDetails.description}</p>
        {getButton(states.status)}
      </sqm-form-message>
    </div>
  );
}
