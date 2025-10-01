import { h, VNode } from "@stencil/core";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";
import { TaxDocumentType } from "../data";
import { PayoutStatus } from "../sqm-payout-status-alert/usePayoutStatus";
import { capitalizeFirstLetter } from "../../../utils/utils";

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
    badgeTextSubmittedOn?: string;
    badgeTextSubmittedOnW8?: string;
    badgeTextAwaitingReview?: string;
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
    noFormNeededSubtext?: string;
    notRegisteredForTax?: string;
    qstNumber?: string;
    subRegionTaxNumber: string;
    invoiceColumnTitle: string;
    earningsColumnTitle: string;
    indirectTaxColumnTitle: string;
    earningsAfterTaxColumnTitle: string;
    dateColumnTitle: string;
    taxAndPayoutsDescription: string;
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
  DangerBadge: {
    "&::part(base)": {
      backgroundColor: "var(--sqm-danger-color-icon)",
      color: "var(--sl-color-white)",
    },
  },
  SuccessBadge: {
    "&::part(base)": {
      backgroundColor: "var(--sqm-success-color-icon)",
      color: "var(--sl-color-white)",
    },
  },
  WarningBadge: {
    "&::part(base)": {
      backgroundColor: "var(--sqm-warning-color-icon)",
      color: "var(--sl-color-white)",
    },
  },
  BankingInformationContainer: {
    maxWidth: "700px",
  },
  IndirectTaxPreviewContainer: {
    marginTop: "var(--sl-spacing-x-large)",
    borderTop: "var(--sqm-border-thickness, 1px) solid var(--sqm-border-color)",
  },
  IndirectTaxPreviewHeaderContainer: {
    marginTop: "var(--sl-spacing-large)",
    marginBottom: "var(--sl-spacing-xx-small)",
    margin: "0",
    display: "flex",
    gap: "var(--sl-spacing-x-small)",
    "&::part(base)": {
      color: "var(--sqm-success-color-text)",
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
    color: "var(--sqm-text-subdued)",
  },
  TaxDocumentsContainer: {
    marginTop: "var(--sl-spacing-xx-large)",
    borderTop: "var(--sqm-border-thickness, 1px) solid var(--sqm-border-color)",
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
      color: "var(--sqm-text-subdued)",
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
    color: "var(--sqm-text-subdued)",
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
    color: "var(--sqm-text-subdued)",
    fontSize: "var(--sl-font-size-x-small)",
    maxWidth: "492px",
  },
  PageDescriptionText: {
    color: "var(--sqm-text-subdued)",
    fontSize: "var(--sl-font-size-medium)",
    marginTop: "0",
  },

  WarningButton: {
    "&::part(base)": {
      marginTop: "20px",
      borderColor: "var(--sqm-warning-color-border)",
      color: "var(--sqm-warning-color-text)",
      background: "var(--sqm-warning-color-background)",

      "&:hover": {
        background: "var(--sqm-warning-color-icon)",
      },
    },
  },

  ErrorButton: {
    "&::part(base)": {
      marginTop: "20px",
      borderColor: "var(--sqm-danger-color-border)",
      color: "var(--sqm-danger-color-text)",
      background: "var(--sqm-danger-color-background)",

      "&:hover": {
        background: "var(--sqm-danger-color-icon)",
      },
    },
  },

  SuccessButton: {
    "&::part(base)": {
      marginTop: "20px",
      borderColor: "var(--sqm-success-color-border)",
      color: "var(--sqm-success-color-text)",
      background: "var(--sqm-success-color-background)",

      "&:hover": {
        background: "var(--sqm-success-color-icon)",
      },
    },
  },
  Dialog: {
    "&::part(panel)": {
      maxWidth: "420px",
    },
    "&::part(header)": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "var(--sl-spacing-large)",
    },
    "&::part(close-button)": {
      marginBottom: "var(--sl-spacing-xx-large)",
    },
    "&::part(title)": {
      fontSize: "var(--sl-font-size-large)",
      fontWeight: "600",
      padding: "0px var(--sl-spacing-x-large) 0 var(--sl-spacing-x-large)",
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

const vanillaStyle = `
  * {
    font-family: var(--sqm-primary-font);
    }
  a {
    color: inherit;
    text-decoration: underline;
    cursor: pointer;
  }

  *::part(primarybutton-base),
  sl-button[type="primary"]::part(base) {
    font-family: var(--sqm-primary-font);
    width: 100%;
    background-color: var(--sqm-primary-button-background);
    color: var(--sqm-primary-button-color);
    border-color: var(--sqm-primary-button-color-border);
    border-radius: var(--sqm-primary-button-radius);
  }

  *::part(primarybutton-base):hover,
  sl-button[type="primary"]::part(base):hover{
    background-color: var(--sqm-primary-button-background-hover);
    border-color: var(--sqm-primary-button-border-color-hover);
    color: var(--sqm-primary-button-color-hover);
  }


  *::part(primarybutton-base):focus,
  sl-button[type="primary"]::part(base):focus {
    box-shadow: none;
  }

  *::part(secondarybutton-base),
  sl-button[type="secondary"]::part(base) {
  font-family: var(--sqm-primary-font);
    background-color: var(--sqm-secondary-button-background);
    color: var(--sqm-secondary-button-color);
    border-color: var(--sqm-secondary-button-color-border);
    border-radius: var(--sqm-secondary-button-radius);
  }

  *::part(secondarybutton-base):hover,
  sl-button[type="secondary"]::part(base):hover {
    background-color: var(--sqm-secondary-button-background-hover);
    color: var(--sqm-secondary-button-color-hover);
    border-color: var(--sqm-secondary-button-border-color-hover);
  }
`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export const TaxAndCashDashboardView = (props: TaxAndCashDashboardProps) => {
  const { states, text, callbacks, slots } = props;

  function getAlert(status: PayoutStatus) {
    switch (status) {
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
        };
      default:
        return;
    }
  }

  const statusMap = {
    NOT_VERIFIED: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge class={sheet.classes.WarningBadge} type="warning" pill>
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
        <sl-badge class={sheet.classes.SuccessBadge} type="success" pill>
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
        <sl-badge class={sheet.classes.DangerBadge} type="danger" pill>
          {text.statusTextNotActive}
        </sl-badge>
        <p>{text.invalidForm}</p>
      </div>
    ),
  };

  const alertMap = {
    INACTIVE: (
      <sqm-form-message type="error">
        <p part="alert-title">
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
        </p>
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
      </sqm-form-message>
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

  const alert = getAlert(states.payoutStatus);

  return (
    <div>
      <div>
        <style type="text/css">{styleString}</style>
        <style type="text/css">{vanillaStyle}</style>
        {states.loadingError && (
          <sqm-form-message type="error">
            <p part="alert-title">{text.error.loadingErrorAlertHeader}</p>
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
          </sqm-form-message>
        )}
        {states.errors?.general && (
          <sqm-form-message type="error">
            <p part="alert-title">{text.error.generalTitle}</p>
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
          </sqm-form-message>
        )}

        {alert && (
          <sqm-form-message type={alert.alertType}>
            <p part="alert-title">{alert.header}</p>
            <p part="alert-description">{alert.description}</p>
            {alert.buttonText && (
              <sl-button
                class={
                  sheet.classes[
                    `${capitalizeFirstLetter(alert.alertType)}Button`
                  ]
                }
                loading={states.veriffLoading}
                onClick={() => callbacks.onVerifyClick()}
              >
                {alert.buttonText}
              </sl-button>
            )}
          </sqm-form-message>
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
            exportparts="base: primarybutton-base"
            class={sheet.classes.DialogButton}
            onClick={callbacks.onNewFormClick}
          >
            {text.newFormButton}
          </sl-button>
          <sl-button
            slot="footer"
            type="secondary"
            exportparts="base: secondarybutton-base"
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
          <p class={sheet.classes.PageDescriptionText}>
            {text.taxAndPayoutsDescription}
          </p>
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
                type="secondary"
                exportparts="base: secondarybutton-base"
                onClick={callbacks.onEditPayoutInfo}
                style={{ marginTop: states.loading ? "12px" : "0px" }} //Need to add margin when loading because we are relying on the margin from the DescriptionText which is hidden when loading
              >
                {text.editPaymentInformationButton}
              </sl-button>
            )}
          </div>
        </div>
        <div class={sheet.classes.TaxDocumentsContainer}>
          <div>
            {states.loading ? (
              <div class={sheet.classes.TaxSectionSkeletonContainer}>
                <sl-skeleton class={sheet.classes.SkeletonOne}></sl-skeleton>
                <sl-skeleton class={sheet.classes.SkeletonTwo}></sl-skeleton>
              </div>
            ) : (
              <div>
                {states.noFormNeeded ? (
                  <div>
                    <h3
                      class={sheet.classes.TaxDocumentsSectionHeaderContainer}
                    >
                      {text.taxDocumentSectionHeader}
                    </h3>
                    <p class={sheet.classes.TaxDocSubtext}>
                      {text.noFormNeededSubtext}
                    </p>
                  </div>
                ) : (
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
                    {states.status !== "NOT_VERIFIED" && (
                      <sl-button
                        style={{ marginTop: "20px" }}
                        disabled={states.disabled || states.loading}
                        onClick={callbacks.onClick}
                        type="secondary"
                        exportparts="base: secondarybutton-base"
                      >
                        {text.newFormButton}
                      </sl-button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

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
