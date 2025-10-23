import { Fragment, h } from "@stencil/core";
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
    onPaymentInfoClick: () => void;
    onNewFormClick: () => void;
  };
  text: {
    editPaymentInformationButton: string;
    newFormButton: string;
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
    paymentHoldOnChangeHeader: string;
    paymentHoldOnChangeDescription: string;
    beneficiaryNameInvalidHeader: string;
    beneficiaryNameInvalidDescription: string;
    beneficiaryNameMismatchHeader: string;
    beneficiaryNameMismatchDescription: string;
    bankTaxNameMismatchHeader: string;
    bankTaxNameMismatchDescription: string;
    withdrawalSettingsInvalidHeader: string;
    withdrawalSettingsInvalidDescription: string;
    paymentReturnedHeader: string;
    paymentReturnedDescription: string;
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
        alertType: "error",
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
          alertType: "error",
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
          };
        }
      case "NEW_PAYEE_REVIEW":
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
        };
      case "PAYMENT_HOLD_ON_CHANGE":
        return {
          header: text.paymentHoldOnChangeHeader,
          description: intl.formatMessage(
            {
              id: "accountReviewDescription",
              defaultMessage: text.paymentHoldOnChangeDescription,
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
        };
      case "BENEFICIARY_NAME_INVALID":
        return {
          header: text.beneficiaryNameInvalidHeader,
          description: intl.formatMessage(
            {
              id: "accountReviewDescription",
              defaultMessage: text.beneficiaryNameInvalidDescription,
            },
            {
              supportLink: (
                <a target="_blank" href={`mailto:advocate-support@impact.com`}>
                  {text.supportLink}
                </a>
              ),
            }
          ),
          buttonText: text.editPaymentInformationButton,
          alertType: "warning",
          icon: "exclamation-triangle",
        };
      case "BENEFICIARY_NAME_MISMATCH":
        return {
          header: text.beneficiaryNameMismatchHeader,
          description: intl.formatMessage(
            {
              id: "accountReviewDescription",
              defaultMessage: text.beneficiaryNameMismatchDescription,
            },
            {
              supportLink: (
                <a target="_blank" href={`mailto:advocate-support@impact.com`}>
                  {text.supportLink}
                </a>
              ),
            }
          ),
          buttonText: text.editPaymentInformationButton,
          alertType: "warning",
          icon: "exclamation-triangle",
        };
      case "BANK_TAX_NAME_MISMATCH":
        return {
          header: text.bankTaxNameMismatchHeader,
          description: intl.formatMessage(
            {
              id: "accountReviewDescription",
              defaultMessage: text.bankTaxNameMismatchDescription,
            },
            {
              supportLink: (
                <a target="_blank" href={`mailto:advocate-support@impact.com`}>
                  {text.supportLink}
                </a>
              ),
            }
          ),
          buttonText: text.editPaymentInformationButton,
          alertType: "warning",
          icon: "exclamation-triangle",
        };
      case "WITHDRAWAL_SETTINGS_INVALID":
        return {
          header: text.withdrawalSettingsInvalidHeader,
          description: intl.formatMessage(
            {
              id: "accountReviewDescription",
              defaultMessage: text.withdrawalSettingsInvalidDescription,
            },
            {
              supportLink: (
                <a target="_blank" href={`mailto:advocate-support@impact.com`}>
                  {text.supportLink}
                </a>
              ),
            }
          ),
          buttonText: text.editPaymentInformationButton,
          alertType: "warning",
          icon: "exclamation-triangle",
        };
      case "PAYMENT_RETURNED":
        return {
          header: text.paymentReturnedHeader,
          description: intl.formatMessage(
            {
              id: "accountReviewDescription",
              defaultMessage: text.paymentReturnedDescription,
            },
            {
              supportLink: (
                <a target="_blank" href={`mailto:advocate-support@impact.com`}>
                  {text.supportLink}
                </a>
              ),
            }
          ),
          button: (
            <Fragment>
              <sl-button
                disabled={states.loading}
                type="default"
                onClick={callbacks.onPaymentInfoClick}
              >
                {text.editPaymentInformationButton}
              </sl-button>
              <sl-button
                disabled={states.loading}
                type="default"
                onClick={callbacks.onNewFormClick}
              >
                {text.newFormButton}
              </sl-button>
            </Fragment>
          ),
          alertType: "warning",
          icon: "exclamation-triangle",
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
        if (alertDetails.button) return alertDetails.button;

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
