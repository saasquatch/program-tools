import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";

export interface TaxDocumentSubmittedProps {
  states: {
    status: string;
    documentType: "W9" | "W8-BEN-E" | "W8-BEN";
    dateSubmitted: string;
    dateExpired?: string;
  };
  callbacks: { onClick: (props: any) => void };
  text: {
    status: string;
    documentType: string;
    dateSubmitted: string;
    dateExpired?: string;
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
          Not Verified
        </sl-badge>
        <p>Awaiting review. Submitted on {text.dateSubmitted}</p>
      </div>
    ),
    ACTIVE: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge type="success" pill class={sheet.classes.BadgeContainer}>
          Active
        </sl-badge>
        <p>Submitted on {text.dateSubmitted}</p>
      </div>
    ),
    NOT_ACTIVE: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge type="danger" pill class={sheet.classes.BadgeContainer}>
          Not Active
        </sl-badge>
        <p>Submitted on {text.dateSubmitted}</p>
      </div>
    ),
    EXPIRED: (
      <div class={sheet.classes.TaxFormDetailsContainer}>
        <sl-badge type="danger" pill class={sheet.classes.BadgeContainer}>
          Expired
        </sl-badge>
        <p>Expired on {text.dateSubmitted}</p>
      </div>
    ),
  };

  const alertMap = {
    NOT_ACTIVE: (
      <sl-alert type="danger" open class={sheet.classes.WarningAlertContainer}>
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
        <strong>
          Your {text.documentType} tax form has personal information that
          doesn't match your profile.
        </strong>
        <br />
        Please resubmit a new {text.documentType} form.
      </sl-alert>
    ),
    EXPIRED: (
      <sl-alert type="danger" open class={sheet.classes.WarningAlertContainer}>
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
        <strong>Your {text.documentType} tax form has expired.</strong>
        <br />
        Please submit a new {text.documentType} form.
      </sl-alert>
    ),
  };

  return (
    <div>
      <style type="text/css">{styleString}</style>
      {(states.status === "NOT_ACTIVE" || states.status === "EXPIRED") &&
        alertMap[states.status]}
      <div>
        <h3>Banking Information</h3>
        <div class={sheet.classes.BankingInformationContainer}>
          {/* AL: Placeholder for banking information*/}
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
        <h3>Tax documents</h3>
        <h4>{text.documentType} Tax Form</h4>
        {statusMap[states.status]}
      </div>
      <sl-button
        onClick={callbacks.onClick}
        type="primary"
        class={sheet.classes.NewFormButton}
      >
        Subit New Form
      </sl-button>
    </div>
  );
};
