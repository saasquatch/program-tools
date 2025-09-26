import { h, VNode } from "@stencil/core";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";
import { PayoutStatus } from "../sqm-payout-status-alert/usePayoutStatus";
import { TaxDocumentType } from "../sqm-tax-and-cash/data";

export interface TaxAndCashDashboardProps {
  states: {
    status?: string;
    documentType: TaxDocumentType | undefined;
    documentTypeString: string;
    canEditPayoutInfo: boolean;
    disabled?: boolean;
    dateSubmitted?: string;
    noFormNeeded?: boolean;
    indirectTaxType?: string;
    qstNumber?: string;
    subRegionTaxNumber?: string;
    subRegion?: string;
    indirectTaxNumber?: string;
    province?: string;
    country?: string;
    notRegistered?: boolean;
    isBusinessEntity?: boolean;
    loading?: boolean;
    loadingError?: boolean;
    showNewFormDialog: boolean;
    hasHold: boolean;
    payoutStatus: PayoutStatus;
    veriffLoading: boolean;
    errors?: {
      general?: boolean;
    };
    enforceUsTaxComplianceOption?: string;
  };
  slots: {
    payoutDetailsCardSlot: VNode;
  };
  callbacks: {
    onClick: (props: any) => void;
    onVerifyClick: () => void;
    onEditPayoutInfo: () => void;
    onNewFormCancel: () => void;
    onNewFormClick: () => void;
  };
  text: {
    statusTextActive?: string;
    statusTextNotActive?: string;
    statusTextNotVerified?: string;
    statusTextRequired?: string;
    badgeTextSubmittedOn?: string;
    badgeTextSubmittedOnW8?: string;
    badgeTextAwaitingReview?: string;
    requiredTaxForm?: string;
    noTaxFormRequired?: string;
    taxAlertHeaderNotActive?: string;
    taxAlertHeaderNotActiveW9?: string;
    taxAlertHeaderNotActiveW8?: string;
    taxAlertNotActiveMessageW9?: string;
    taxAlertNotActiveMessageW8?: string;
    bankingInformationSectionHeader: string;
    indirectTaxInfoSectionHeader: string;
    indirectTaxInfoCanada?: string;
    indirectTaxInfoSpain?: string;
    payoutFromImpact: string;
    indirectTaxInfoOtherCountry?: string;
    indirectTaxIndividualParticipant?: string;
    indirectTaxTooltipSupport?: string;
    indirectTaxDetails?: string;
    taxDocumentSectionHeader?: string;
    taxDocumentSectionSubHeader?: string;
    newFormButton?: string;
    editPaymentInformationButton?: string;
    invalidForm?: string;
    notRegisteredForTax?: string;
    qstNumber?: string;
    subRegionTaxNumber: string;
    invoiceColumnTitle: string;
    earningsColumnTitle: string;
    indirectTaxColumnTitle: string;
    earningsAfterTaxColumnTitle: string;
    dateColumnTitle: string;
    invoiceDescription: string;
    invoicePrevLabel: string;
    invoiceMoreLabel: string;
    invoiceHeader: string;
    invoiceEmptyStateHeader: string;
    invoiceEmptyStateText: string;
    replaceTaxFormModalHeader: string;
    replaceTaxFormModalBodyText: string;
    payoutHoldAlertHeader: string;
    payoutHoldAlertDescription: string;
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
    termsAndConditions: string;
    cancelButton: string;
    supportLink: string;
    error: {
      generalTitle: string;
      generalDescription: string;
      loadingErrorAlertHeader: string;
      loadingErrorAlertDescription: string;
    };
  };
}

const style = {
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
      maxWidth: "600px",
    },
    "& sl-icon::part(base)": {
      color: "var(--sl-color-warning-500)",
    },
  },
  WarningHoldAlertContainer: {
    marginLeft: "-20px",
    "&::part(base)": {
      maxWidth: "850px",
      border: "none",
      backgroundColor: "transparent",
    },
    "& sl-icon::part(base)": {
      color: "var(--sl-color-warning-500)",
    },
  },
  ErrorHoldAlertContainer: {
    marginLeft: "-20px",
    "&::part(base)": {
      maxWidth: "850px",
      border: "none",
      backgroundColor: "transparent",
    },
    "& sl-icon::part(base)": {
      color: "var(--sl-color-danger-500)",
    },
  },
  ExpiringSoonAlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-yellow-100)",
      borderTop: "none",
    },
  },
  BankingInformationContainer: {
    maxWidth: "700px",
  },
  IndirectTaxPreviewContainer: {
    marginTop: "var(--sl-spacing-x-large)",
    borderTop: "1px solid var(--sl-color-neutral-200)",
  },
  IndirectTaxPreviewHeaderContainer: {
    marginTop: "var(--sl-spacing-large)",
    marginBottom: "var(--sl-spacing-xx-small)",
    margin: "0",
    display: "flex",
    gap: "var(--sl-spacing-x-small)",
    "&::part(base)": {
      color: "var(--sl-color-green-500)",
    },
  },
  IndirectTaxPreviewDetails: {
    gap: "var(--sl-spacing-x-small)",
    display: "flex",
    flexDirection: "column",
    lineHeight: "var(--sl-spacing-medium)",
    fontSize: "var(--sl-font-size-small)",
  },
  InvoiceTableContainer: {
    marginTop: "var(--sl-spacing-medium)",
  },
  NotRegisteredIndirectTaxText: {
    color: "var(--sl-color-gray-500)",
  },
  TaxDocumentsContainer: {
    marginTop: "var(--sl-spacing-xx-large)",
    borderTop: "1px solid var(--sl-color-neutral-200)",
  },
  TaxDocumentsSectionHeaderContainer: {
    marginTop: "var(--sl-spacing-x-large)",
    marginBottom: "var(--sl-spacing-xx-small)",
  },
  StatusContainer: {
    marginTop: "var(--sl-spacing-x-large)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--sl-spacing-x-small)",
    "& h3": {
      margin: "0",
    },
    "& p": {
      margin: "0",
      paddingTop: "2px",
      color: "var(--sl-color-gray-500)",
    },
  },
  StatusAlert: {
    fontSize: "var(--sl-font-size-small)",
  },
  TaxFormDetailsContainer: {
    display: "flex",
    gap: "var(--sl-spacing-small)",
    alignItems: "center",
  },
  NewFormButton: {
    marginTop: "var(--sl-spacing-large)",
    maxWidth: "300px",
  },
  EditBankDetailsButton: {
    marginTop: "var(--sl-spacing-large)",
  },
  SkeletonOne: {
    width: "15%",
    height: "10px",
  },
  SkeletonTwo: {
    width: "25%",
    height: "24px",
    top: "var(--sl-spacing-small)",
    marginBottom: "var(--sl-spacing-x-small)",
  },
  TaxSectionSkeletonContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "var(--sl-spacing-x-large)",
  },
  TaxDocSubtext: {
    margin: "0",
    color: "var(--sl-color-neutral-500)",
    lineHeight: "var(--sl-spacing-medium)",
    fontSize: "var(--sl-font-size-small)",
    marginLeft: "1px",
  },
  TooltipContainer: {
    display: "flex",
    textAlign: "center",
    width: "250px",
  },
  ToolTip: {
    top: "6px",
    width: "16px",
    height: "16px",
  },
  TaxNumberContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  DescriptionText: {
    color: "var(--sl-color-gray-500)",
    fontSize: "var(--sl-font-size-x-small)",
    marginBottom: "none",
    maxWidth: "492px",
  },
  PageDescriptionText: {
    color: "var(--sl-color-neutral-500)",
    fontSize: "var(--sl-font-size-medium)",
    marginTop: "0",
  },
  Dialog: {
    "&::part(panel)": {
      maxWidth: "420px",
    },
    "&::part(close-button)": {
      marginBottom: "var(--sl-spacing-xx-large)",
    },
    "&::part(title)": {
      fontSize: "var(--sl-font-size-x-large)",
      fontWeight: "600",
      marginTop: "var(--sl-spacing-xxx-large)",
      padding:
        "var(--sl-spacing-x-large) var(--sl-spacing-x-large) 0 var(--sl-spacing-x-large)",
    },
    "&::part(body)": {
      padding: "0 var(--sl-spacing-x-large) 0 var(--sl-spacing-x-large)",
      fontSize: "var(--sl-font-size-small)",
    },
    "&::part(footer)": {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sl-spacing-small)",
      marginBottom: "var(--sl-spacing-xx-small)",
      alignItems: "center",
      flex: "1",
    },
  },
  DialogButton: { margin: "auto", width: "100%" },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export const TaxAndCashDashboardView = (props: TaxAndCashDashboardProps) => {
  const { states, text, callbacks, slots } = props;

  function getAlert(status: PayoutStatus) {
    switch (status) {
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
            button: (
              <sl-button
                style={{ marginTop: "var(--sl-spacing-x-small)" }}
                type="default"
                onClick={callbacks.onNewFormClick}
              >
                {text.w9RequiredButtonText}
              </sl-button>
            ),
            alertType: "info",
            icon: "info-circle",
            class: sheet.classes.WarningHoldAlertContainer,
          };
        } else {
          return {
            header: text.payoutHoldAlertHeader,
            description: intl.formatMessage(
              {
                id: "payoutHoldAlertDescription",
                defaultMessage: text.payoutHoldAlertDescription,
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
            class: sheet.classes.WarningHoldAlertContainer,
          };
        }
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
          class: sheet.classes.WarningHoldAlertContainer,
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
          class: sheet.classes.WarningHoldAlertContainer,
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
          class: sheet.classes.WarningHoldAlertContainer,
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
          class: sheet.classes.ErrorHoldAlertContainer,
        };
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
          class: sheet.classes.WarningHoldAlertContainer,
        };
      case "HOLD":
        return {
          header: text.payoutHoldAlertHeader,
          description: intl.formatMessage(
            {
              id: "payoutHoldAlertDescription",
              defaultMessage: text.payoutHoldAlertDescription,
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
          class: sheet.classes.WarningHoldAlertContainer,
        };
      default:
        return;
    }
  }

  const statusMap = {
    NOT_VERIFIED: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge type="warning" pill>
          {text.statusTextNotVerified}
        </sl-badge>
        <p>
          {intl.formatMessage(
            {
              id: `badgeTextAwaitingReview`,
              defaultMessage: text.badgeTextAwaitingReview,
            },
            {
              dateSubmitted: states.dateSubmitted,
            }
          )}
        </p>
      </div>
    ),
    ACTIVE: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge type="success" pill>
          {text.statusTextActive}
        </sl-badge>
        <p>
          {intl.formatMessage(
            {
              id: `badgeTextSubmittedOn`,
              defaultMessage:
                states.documentType === "W9"
                  ? text.badgeTextSubmittedOn
                  : text.badgeTextSubmittedOnW8,
            },
            {
              dateSubmitted: states.dateSubmitted,
            }
          )}
        </p>
      </div>
    ),
    INACTIVE: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge type="danger" pill>
          {text.statusTextNotActive}
        </sl-badge>
        <p>{text.invalidForm}</p>
      </div>
    ),
    undefined: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge type="danger" pill>
          {text.statusTextRequired}
        </sl-badge>
        <p>
          {intl.formatMessage(
            {
              id: `requiredTaxForm`,
              defaultMessage: text.requiredTaxForm,
            },
            {
              taxFormType: states.documentType,
            }
          )}
        </p>
      </div>
    ),
  };

  const alertMap = {
    INACTIVE: (
      <sl-alert
        exportparts="base: alert-base, icon:alert-icon"
        type="danger"
        open
        class={sheet.classes.ErrorAlertContainer}
      >
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
        <strong>
          {intl.formatMessage(
            {
              id: `taxAlertHeaderNotActive`,
              defaultMessage:
                states.documentType === "W9"
                  ? text.taxAlertHeaderNotActiveW9
                  : text.taxAlertHeaderNotActiveW8,
            },
            {
              documentType: states.documentTypeString,
            }
          )}
        </strong>
        <br />
        {intl.formatMessage(
          {
            id: `taxAlertMessage`,
            defaultMessage:
              states.documentType === "W9"
                ? text.taxAlertNotActiveMessageW9
                : text.taxAlertNotActiveMessageW8,
          },
          {
            documentType: states.documentTypeString,
          }
        )}
      </sl-alert>
    ),
  };

  const getIndirectTaxRegisteredIn = () => {
    if (states.province) {
      return intl.formatMessage(
        {
          id: `indirectTaxInfoCanada`,
          defaultMessage: text.indirectTaxInfoCanada,
        },
        {
          country: "Canada",
          province: states.province,
        }
      );
    } else if (states.subRegion) {
      return intl.formatMessage(
        {
          id: `indirectTaxInfoSpain`,
          defaultMessage: text.indirectTaxInfoSpain,
        },
        {
          country: states.country,
          subRegion: states.subRegion,
        }
      );
    } else {
      return intl.formatMessage(
        {
          id: `indirectTaxInfoOtherCountry`,
          defaultMessage: text.indirectTaxInfoOtherCountry,
        },
        {
          country: states.country,
        }
      );
    }
  };

  const alertInfo = getAlert(states.payoutStatus);

  return (
    <div>
      <div>
        <style type="text/css">{styleString}</style>
        {states.loadingError && (
          <div>
            <sl-alert
              exportparts="base: alert-base, icon:alert-icon"
              type="danger"
              open
              class={sheet.classes.ErrorAlertContainer}
            >
              <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
              <strong>{text.error.loadingErrorAlertHeader}</strong>
              <br />
              {intl.formatMessage(
                {
                  id: "loadingErrorAlertDescription",
                  defaultMessage: text.error.loadingErrorAlertDescription,
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
              )}
            </sl-alert>
          </div>
        )}
        {states.errors?.general && (
          <sl-alert
            exportparts="base: alert-base, icon:alert-icon"
            type="danger"
            open
            class={sheet.classes.ErrorAlertContainer}
          >
            <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
            <strong>{text.error.generalTitle}</strong>
            <br />
            {intl.formatMessage(
              {
                id: "generalDescription",
                defaultMessage: text.error.generalDescription,
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
            )}
          </sl-alert>
        )}
        {alertInfo && (
          <sl-alert
            exportparts="base: alert-base, icon:alert-icon"
            name={alertInfo?.alertType}
            open
            class={alertInfo?.class}
          >
            <sl-icon slot="icon" name={alertInfo?.icon}></sl-icon>
            <strong>{alertInfo.header}</strong>
            <p style={{ margin: "0" }}>{alertInfo.description}</p>
            {alertInfo.buttonText && (
              <sl-button
                style={{ marginTop: "var(--sl-spacing-x-small)" }}
                type="default"
                loading={states.veriffLoading}
                onClick={() => callbacks.onVerifyClick()}
              >
                {alertInfo.buttonText}
              </sl-button>
            )}
            {alertInfo.button ? (
              alertInfo.button
            ) : (
              <div style={{ display: "none" }}></div>
            )}
          </sl-alert>
        )}
        <sl-dialog
          label={text.replaceTaxFormModalHeader}
          class={sheet.classes.Dialog}
          open={states.showNewFormDialog}
          onSl-hide={callbacks.onNewFormCancel}
        >
          <p>{text.replaceTaxFormModalBodyText}</p>
          <sl-button
            slot="footer"
            type="primary"
            class={sheet.classes.DialogButton}
            onClick={callbacks.onNewFormClick}
          >
            {text.newFormButton}
          </sl-button>
          <sl-button
            slot="footer"
            type="default"
            class={sheet.classes.DialogButton}
            onClick={callbacks.onNewFormCancel}
          >
            {text.cancelButton}
          </sl-button>
        </sl-dialog>
        {states.status === "INACTIVE" && alertMap[states.status]}
        <div>
          <h3 style={{ marginBottom: "0" }}>
            {text.bankingInformationSectionHeader}
          </h3>
          <div class={sheet.classes.BankingInformationContainer}>
            {slots.payoutDetailsCardSlot}
            {!states.loading && (
              <p class={sheet.classes.DescriptionText}>
                {text.payoutFromImpact}
              </p>
            )}
            {states.canEditPayoutInfo && (
              <sl-button
                disabled={states.disabled || states.loading}
                type="default"
                class={sheet.classes.EditBankDetailsButton}
                onClick={callbacks.onEditPayoutInfo}
              >
                {text.editPaymentInformationButton}
              </sl-button>
            )}
          </div>
        </div>
        {(!states.noFormNeeded || states.status === "NOT_VERIFIED") && (
          <div class={sheet.classes.TaxDocumentsContainer}>
            <div>
              {states.loading ? (
                <div class={sheet.classes.TaxSectionSkeletonContainer}>
                  <sl-skeleton class={sheet.classes.SkeletonOne}></sl-skeleton>
                  <sl-skeleton class={sheet.classes.SkeletonTwo}></sl-skeleton>
                </div>
              ) : (
                <div>
                  <div>
                    <span class={sheet.classes.TaxFormDetailsContainer}>
                      <div class={sheet.classes.StatusContainer}>
                        <h3>
                          {intl.formatMessage(
                            {
                              id: "section-subheader",
                              defaultMessage: text.taxDocumentSectionSubHeader,
                            },
                            {
                              documentType: states.documentTypeString,
                            }
                          )}
                        </h3>
                        <span class={sheet.classes.StatusAlert}>
                          {statusMap[states.status]}
                        </span>
                      </div>
                    </span>
                    {states.noFormNeeded &&
                      states.status !== "NOT_VERIFIED" && (
                        <sl-button
                          disabled={states.disabled || states.loading}
                          onClick={callbacks.onClick}
                          type="default"
                          class={sheet.classes.NewFormButton}
                          exportparts="base: primarybutton-base"
                        >
                          {text.newFormButton}
                        </sl-button>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div class={sheet.classes.IndirectTaxPreviewContainer}>
          {states.loading ? (
            <div class={sheet.classes.TaxSectionSkeletonContainer}>
              <sl-skeleton class={sheet.classes.SkeletonOne}></sl-skeleton>
              <sl-skeleton class={sheet.classes.SkeletonTwo}></sl-skeleton>
            </div>
          ) : (
            <div>
              <h3 class={sheet.classes.IndirectTaxPreviewHeaderContainer}>
                {text.indirectTaxInfoSectionHeader}
                <sl-tooltip
                  trigger="hover"
                  placement="right"
                  content={text.indirectTaxTooltipSupport}
                  class={sheet.classes.TooltipContainer}
                >
                  <sl-icon name="info-circle" class={sheet.classes.ToolTip} />
                </sl-tooltip>
              </h3>
              <div class={sheet.classes.IndirectTaxPreviewDetails}>
                <span>
                  {states.notRegistered ? (
                    <span class={sheet.classes.NotRegisteredIndirectTaxText}>
                      {intl.formatMessage(
                        {
                          id: "notRegisteredForTax",
                          defaultMessage: text.notRegisteredForTax,
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
                      )}
                    </span>
                  ) : (
                    getIndirectTaxRegisteredIn()
                  )}
                </span>
                {!states.notRegistered && (
                  <div class={sheet.classes.TaxNumberContainer}>
                    <span>
                      {intl.formatMessage(
                        {
                          id: `indirectTaxDetails`,
                          defaultMessage: text.indirectTaxDetails,
                        },
                        {
                          indirectTaxType: states.indirectTaxType,
                          indirectTaxNumber: states.indirectTaxNumber,
                        }
                      )}
                    </span>
                    <span>
                      {states.qstNumber &&
                        intl.formatMessage(
                          {
                            id: `qstNumber`,
                            defaultMessage: text.qstNumber,
                          },
                          {
                            qstNumber: states.qstNumber,
                          }
                        )}
                      {states.subRegionTaxNumber &&
                        intl.formatMessage(
                          {
                            id: `subRegionTaxNumber`,
                            defaultMessage: text.subRegionTaxNumber,
                          },
                          {
                            subRegionTaxNumber: states.subRegionTaxNumber,
                          }
                        )}
                    </span>
                  </div>
                )}
                {!states.notRegistered && (
                  <div class={sheet.classes.InvoiceTableContainer}>
                    <sqm-invoice-table
                      description={text.invoiceDescription}
                      prev-label={text.invoicePrevLabel}
                      more-label={text.invoiceMoreLabel}
                      header={text.invoiceHeader}
                      empty-state-header={text.invoiceEmptyStateHeader}
                      empty-state-text={text.invoiceEmptyStateText}
                    >
                      <sqm-invoice-table-download-column></sqm-invoice-table-download-column>
                      <sqm-invoice-table-date-column
                        column-title={text.dateColumnTitle}
                      ></sqm-invoice-table-date-column>
                      <sqm-invoice-table-data-column
                        column-title={text.invoiceColumnTitle}
                        property="invoiceId"
                      ></sqm-invoice-table-data-column>
                      <sqm-invoice-table-data-column
                        column-title={text.earningsColumnTitle}
                        property="earnings"
                      ></sqm-invoice-table-data-column>
                      <sqm-invoice-table-data-column
                        column-title={text.indirectTaxColumnTitle}
                        property="indirectTax"
                      ></sqm-invoice-table-data-column>
                      <sqm-invoice-table-data-column
                        column-title={text.earningsAfterTaxColumnTitle}
                        property="netEarnings"
                      ></sqm-invoice-table-data-column>
                    </sqm-invoice-table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
