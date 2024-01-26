import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { intl } from "../../../global/global";

export interface TaxDocumentSubmittedProps {
  states: {
    status: string;
    documentType: "W9" | "W8-BEN-E" | "W8-BEN";
    dateSubmitted: string;
    dateExpired?: string;
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
    taxAlertHeader?: string;
    taxAlertMessage?: string;
    bankingInformationSectionHeader: string;
    taxDocumentSectionHeader: string;
    taxDocumentSectionSubHeader: string;
    newFormButton: string;
  };
}

const style = {
  WarningAlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-red-100)",
      borderTop: "none",
    },
  },
  BankingInformationContainer: {},
  TaxDocumentsContainer: {
    marginTop: "var(--sl-spacing-x-large)",
    borderTop: "1px solid var(--sl-color-neutral-200)",
  },
  TaxFormDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "var(--sl-spacing-small)",
    alignItems: "baseline",
    marginTop: "-30px",
  },
  BadgeContainer: {
    "&::part(base)": {
      padding: "var(--sl-spacing-x-small)",
    },
  },
  NewFormButton: {
    marginTop: "var(--sl-spacing-x-small)",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export const TaxDocumentSubmittedView = (props: TaxDocumentSubmittedProps) => {
  const { states, text, callbacks } = props;

  const statusMap = {
    NOT_VERIFIED: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge type="info" pill class={sheet.classes.BadgeContainer}>
          {text.statusTextNotVerified}
        </sl-badge>
        <p>
          {text.badgeTextAwaitingReview} {states.dateSubmitted}
        </p>
      </div>
    ),
    ACTIVE: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge type="success" pill class={sheet.classes.BadgeContainer}>
          {text.statusTextActive}
        </sl-badge>
        <p>
          {text.badgeTextSubmittedOn} {states.dateSubmitted}
        </p>
      </div>
    ),
    NOT_ACTIVE: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge type="danger" pill class={sheet.classes.BadgeContainer}>
          {text.statusTextNotActive}
        </sl-badge>
        <p>
          {text.badgeTextSubmittedOn} {states.dateSubmitted}
        </p>
      </div>
    ),
    EXPIRED: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge type="danger" pill class={sheet.classes.BadgeContainer}>
          {text.statusTextExpired}
        </sl-badge>
        <p>
          {text.badgeTextExpiredOn} {states.dateExpired}
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
              id: `taxAlertHeader`,
              defaultMessage: text.taxAlertHeader,
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
    EXPIRED: (
      <sl-alert type="danger" open class={sheet.classes.WarningAlertContainer}>
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
        <strong>
          {intl.formatMessage(
            {
              id: `taxAlertHeader`,
              defaultMessage: text.taxAlertHeader,
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
      <style type="text/css">{styleString}</style>
      {(states.status === "NOT_ACTIVE" || states.status === "EXPIRED") &&
        alertMap[states.status]}
      <div>
        <h3>{text.bankingInformationSectionHeader}</h3>
        <div class={sheet.classes.BankingInformationContainer}>
          {/* AL: Placeholder for banking information. TBD with design with what belongs here */}
          <div
            style={{
              width: "700px",
              height: "150px",
              border: "1px dotted gray",
            }}
          ></div>
        </div>
      </div>
      <div class={sheet.classes.TaxDocumentsContainer}>
        <h3>{text.taxDocumentSectionHeader}</h3>
        <h4>{text.taxDocumentSectionSubHeader}</h4>
        {statusMap[states.status]}
      </div>
      <sl-button
        onClick={callbacks.onClick}
        type="primary"
        class={sheet.classes.NewFormButton}
      >
        {text.newFormButton}
      </sl-button>
    </div>
  );
};
