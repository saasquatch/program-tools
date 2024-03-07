import { h, VNode } from "@stencil/core";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";
import { TaxDocumentType } from "../sqm-tax-and-cash/data";

export interface TaxAndCashDashboardProps {
  states: {
    status?: string;
    documentType: TaxDocumentType | undefined;
    documentTypeString: string;
    disabled?: boolean;
    dateSubmitted?: string;
    dateExpired?: string;
    expiresSoon?: boolean;
    noFormNeeded?: boolean;
    // AL: TODO add indirectTaxType props
    indirectTaxType?: string;
    //AL: TOD add qst number (quebec)
    qstNumber?: number;
    //AL: TODO add income tax number (spain)
    subRegionTaxNumber?: number;
    //AL TODO add sub-region (spain)
    subRegion?: string;
    indirectTaxNumber?: string;
    province?: string;
    country?: string;
    notRegistered?: boolean;
    isIndirectTaxCanada?: boolean;
    isBusinessEntity: boolean;
    loading?: boolean;
    errors?: {
      general?: boolean;
    };
  };
  slots: {
    payoutDetailsCardSlot: VNode;
  };
  callbacks: { onClick: (props: any) => void; onEditPayoutInfo: () => void };
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
    editIndirectTaxButton: string;
    invalidForm?: string;
    noFormNeededSubtext?: string;
    notRegisteredForTax?: string;
    qstNumber?: string;
    subRegionTaxNumber: string;
    error: {
      generalTitle: string;
      generalDescription: string;
    };
  };
}

const style = {
  WarningAlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-red-100)",
      borderTop: "none",
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
    marginTop: "var(--sl-spacing-xx-large)",
    borderTop: "1px solid var(--sl-color-neutral-200)",
  },
  IndirectTaxPreviewHeaderContainer: {
    marginTop: "var(--sl-spacing-x-large)",
    marginBottom: "var(--sl-spacing-x-small)",
    display: "flex",
    gap: "var(--sl-spacing-small)",
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
    maxWidth: "179px",
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
    fontSize: "12px",
    marginBottom: "none",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export const TaxAndCashDashboardView = (props: TaxAndCashDashboardProps) => {
  const { states, text, callbacks, slots } = props;

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
    NOT_ACTIVE: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge type="danger" pill>
          {text.statusTextNotActive}
        </sl-badge>
        <p>{text.invalidForm}</p>
      </div>
    ),
  };

  const alertMap = {
    NOT_ACTIVE: (
      <sl-alert type="danger" open class={sheet.classes.WarningAlertContainer}>
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

  return (
    <div>
      <div>
        <style type="text/css">{styleString}</style>
        {states.errors?.general && (
          <sl-alert
            type="danger"
            open
            class={sheet.classes.WarningAlertContainer}
          >
            <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
            <strong>{text.error.generalTitle}</strong>
            <br />
            {text.error.generalDescription}
          </sl-alert>
        )}
        {states.status === "NOT_ACTIVE" && alertMap[states.status]}
        <div>
          <h3>{text.bankingInformationSectionHeader}</h3>
          <div class={sheet.classes.BankingInformationContainer}>
            {slots.payoutDetailsCardSlot}
            <p class={sheet.classes.DescriptionText}>{text.payoutFromImpact}</p>
            {/* ZH: Most likely need this button in the next iteration of form */}
            {/* <sl-button
              disabled={states.disabled || states.loading}
              type="default"
              class={sheet.classes.EditBankDetailsButton}
              onClick={callbacks.onEditPayoutInfo}
            >
              {text.editPaymentInformationButton}
            </sl-button> */}
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
                  placement="top"
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
                      {text.notRegisteredForTax}
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
              </div>
            </div>
          )}
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
                    <sl-button
                      disabled={states.disabled || states.loading}
                      onClick={callbacks.onClick}
                      type="default"
                      class={sheet.classes.NewFormButton}
                      exportparts="base: secondarybutton-base"
                    >
                      {text.newFormButton}
                    </sl-button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};