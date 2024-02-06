import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { intl } from "../../../global/global";
import {
  PayoutDetailsCardView,
  PayoutDetailsCardViewProps,
} from "../sqm-payout-details-card/sqm-payout-details-card";

export type TaxDocumentType = "W9" | "W8-BEN-E" | "W8-BEN";
export interface TaxDocumentSubmittedProps {
  states: {
    status?: string;
    documentType: TaxDocumentType | undefined;
    disabled?: boolean;
    dateSubmitted?: string;
    dateExpired?: string;
    expiresSoon?: boolean;
    noFormNeeded?: boolean;
    // ---- AL: TODO Hooks
    indirectTaxNumber?: number;
    province?: string;
    country?: string;
    isIndirectTaxCanada?: boolean;
    //----
    loading?: boolean;
    errors?: any;
  };
  callbacks: { onClick: (props: any) => void };
  text: {
    statusTextActive?: string;
    statusTextNotActive?: string;
    statusTextNotVerified?: string;
    statusTextExpired?: string;
    badgeTextSubmittedOn?: string;
    badgeTextAwaitingReview?: string;
    badgeTextExpiredOn?: string;
    badgeTextExpiringSoon?: string;
    noTaxFormRequired?: string;
    taxAlertMessageExpiringSoon?: string;
    taxAlertHeaderNotActive?: string;
    taxAlertHeaderExpiredOn?: string;
    taxAlertHeaderExpiringSoon?: string;
    taxAlertMessage?: string;
    bankingInformationSectionHeader: string;
    indirectTaxInfoSectionHeader: string;
    indirectTaxInfoCanada?: string;
    indirectTaxInfoOtherCountry?: string;
    taxDocumentSectionHeader: string;
    taxDocumentSectionSubHeader: string;
    newFormButton: string;
    invalidForm?: string;
    noFormNeededSubtext: string;
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
  },
  IndirectTaxPreviewDetails: {
    gap: "var(--sl-spacing-x-small)",
    display: "flex",
    flexDirection: "column",
    lineHeight: "var(--sl-spacing-small)",
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
    "& h4": {
      margin: "0",
    },
    "& p": {
      margin: "0",
    },
  },
  TaxFormDetailsContainer: {
    display: "flex",
    gap: "var(--sl-spacing-small)",
    alignItems: "baseline",
    flexFlow: "row wrap",
  },
  BadgeContainer: {
    "&::part(base)": {
      padding: "var(--sl-spacing-x-small)",
    },
  },
  NewFormButton: {
    marginTop: "var(--sl-spacing-medium)",
    maxWidth: "179px",
  },
  EditBankDetailsButton: {
    marginTop: "var(--sl-spacing-x-large)",
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
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export const TaxDocumentSubmittedView = (props: TaxDocumentSubmittedProps) => {
  const { states, text, callbacks } = props;

  // AL: Not sure what states will be yet, placeholder for now
  const testDetailsCardProps: PayoutDetailsCardViewProps = {
    loading: states.loading,
    empty: false,
    otherCurrencies: false,
    mainCurrency: { currencyText: "USD", amountText: "100.00" },
    status: "upcoming",
    pendingStatusBadgeText: "Pending",
    upcomingStatusBadgeText: "Upcoming",
    nextPayoutStatusBadgeText: "Next payout",
    pendingDetailedStatusText: "Check rewards table for available date",
    upcomingDetailedStatusText: "November 1, 2022",
    nextPayoutDetailedStatusText: "November 1, 2022",
    otherCurrenciesText: "other currencies",
    w9PendingText: "Awaiting W-9 tax form",
    w9Pending: undefined,
    hasDatePending: true,
    hasW9Pending: false,
  };

  const statusMap = {
    NOT_VERIFIED: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge type="warning" pill class={sheet.classes.BadgeContainer}>
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
        <sl-badge type="success" pill class={sheet.classes.BadgeContainer}>
          {text.statusTextActive}
        </sl-badge>
        <p>
          {intl.formatMessage(
            {
              id: `badgeTextSubmittedOn`,
              defaultMessage: text.badgeTextSubmittedOn,
            },
            {
              dateSubmitted: states.dateSubmitted,
            }
          )}
          {intl.formatMessage(
            {
              id: `badgeTextExpiringSoon`,
              defaultMessage: text.badgeTextExpiringSoon,
            },
            {
              dateExpired: states.dateExpired,
            }
          )}
        </p>
      </div>
    ),
    NOT_ACTIVE: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge type="danger" pill class={sheet.classes.BadgeContainer}>
          {text.statusTextNotActive}
        </sl-badge>
        <p>{text.invalidForm}</p>
      </div>
    ),
    EXPIRED: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge type="danger" pill class={sheet.classes.BadgeContainer}>
          {text.statusTextExpired}
        </sl-badge>
        <p>
          {intl.formatMessage(
            {
              id: `badgeTextExpiredOn`,
              defaultMessage: text.badgeTextExpiredOn,
            },
            {
              dateExpired: states.dateExpired,
            }
          )}
        </p>
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
              defaultMessage: text.taxAlertHeaderNotActive,
            },
            {
              documentType: states.documentType,
            }
          )}
        </strong>
        <br />
        {intl.formatMessage(
          {
            id: `taxAlertMessage`,
            defaultMessage: text.taxAlertMessage,
          },
          {
            documentType: states.documentType,
          }
        )}
      </sl-alert>
    ),
    EXPIRING_SOON: (
      <sl-alert
        type="warning"
        open
        class={sheet.classes.ExpiringSoonAlertContainer}
      >
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
        <strong>
          {intl.formatMessage(
            {
              id: `taxAlertHeaderExpiringSoon`,
              defaultMessage: text.taxAlertHeaderExpiringSoon,
            },
            {
              documentType: states.documentType,
              dateExpired: states.dateExpired,
            }
          )}
        </strong>
        <br />
        {intl.formatMessage(
          {
            id: `taxAlertMessageExpiringSoon`,
            defaultMessage: text.taxAlertMessageExpiringSoon,
          },
          {
            documentType: states.documentType,
          }
        )}
      </sl-alert>
    ),
    EXPIRED: (
      <sl-alert type="danger" open class={sheet.classes.WarningAlertContainer}>
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
        <strong>
          {intl.formatMessage(
            {
              id: `taxAlertHeaderExpiredOn`,
              defaultMessage: text.taxAlertHeaderExpiredOn,
            },
            {
              documentType: states.documentType,
            }
          )}
        </strong>
        <br />
        {intl.formatMessage(
          {
            id: `taxAlertMessage`,
            defaultMessage: text.taxAlertMessage,
          },
          {
            documentType: states.documentType,
          }
        )}
      </sl-alert>
    ),
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
        {(states.status === "NOT_ACTIVE" || states.status === "EXPIRED") &&
          alertMap[states.status]}
        {states.status === "ACTIVE" &&
          states.expiresSoon &&
          alertMap.EXPIRING_SOON}
        <div>
          <h3>{text.bankingInformationSectionHeader}</h3>
          <div class={sheet.classes.BankingInformationContainer}>
            {/* AL: Placeholder for banking information. TBD with design with what belongs here */}
            <PayoutDetailsCardView {...testDetailsCardProps} />
            <sl-button
              disabled={states.disabled || states.loading}
              type="default"
              class={sheet.classes.EditBankDetailsButton}
            >
              Edit Bank Details
            </sl-button>
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
              </h3>
              <div class={sheet.classes.IndirectTaxPreviewDetails}>
                <span>
                  {states.isIndirectTaxCanada
                    ? intl.formatMessage(
                        {
                          id: `indirectTaxInfoCanada`,
                          defaultMessage: text.indirectTaxInfoCanada,
                        },
                        {
                          country: states.country,
                          province: states.province,
                        }
                      )
                    : intl.formatMessage(
                        {
                          id: `indirectTaxInfoOtherCountry`,
                          defaultMessage: text.indirectTaxInfoOtherCountry,
                        },
                        {
                          country: states.country,
                        }
                      )}
                </span>
                <span>{states.indirectTaxNumber}</span>
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
                  <span class={sheet.classes.TaxFormDetailsContainer}>
                    {states.noFormNeeded ? (
                      <p class={sheet.classes.TaxDocSubtext}>
                        {text.noFormNeededSubtext}
                      </p>
                    ) : (
                      <div class={sheet.classes.StatusContainer}>
                        <h4>
                          {intl.formatMessage(
                            {
                              id: "section-subheader",
                              defaultMessage: text.taxDocumentSectionSubHeader,
                            },
                            {
                              documentType: states.documentType,
                            }
                          )}
                        </h4>
                        {statusMap[states.status]}
                      </div>
                    )}
                  </span>
                )}
              </div>
            )}
            {states.noFormNeeded ? (
              ""
            ) : (
              <sl-button
                disabled={states.disabled || states.loading}
                onClick={callbacks.onClick}
                type="default"
                class={sheet.classes.NewFormButton}
              >
                {text.newFormButton}
              </sl-button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
