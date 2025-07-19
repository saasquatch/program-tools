import { Component, h, Prop } from "@stencil/core";
import { FraudStatus } from "../../../saasquatch";
import { createStyleSheet } from "../../../styling/JSS";

const style = {
  SubText: {
    fontSize: "var(--sl-font-size-small)",
    color: "var(--sqm-text-subdued)",
    margin: "0",
  },
  RedeemBadge: {
    "&::part(base)": {
      fontSize: "var(--sl-font-size-small)",
      padding: "4px 8px",
      textAlign: "center",
      maxWidth: "170px",
      whiteSpace: "pre-line",
      background: "var(--sqm-informative-color-icon)",
      color: "var(--sqm-informative-color-text)",
    },
  },
  DangerBadge: {
    "&::part(base)": {
      fontSize: "var(--sl-font-size-small)",
      padding: "4px 8px",
      textAlign: "center",
      maxWidth: "170px",
      whiteSpace: "pre-line",
      background: "var(--sqm-danger-color-icon)",
      color: "var(--sqm-danger-color-text)",
    },
  },
  WarningBadge: {
    "&::part(base)": {
      fontSize: "var(--sl-font-size-small)",
      padding: "4px 8px",
      textAlign: "center",
      maxWidth: "170px",
      whiteSpace: "pre-line",
      background: "var(--sqm-warning-color-icon)",
      color: "var(--sqm-warning-color-text)",
    },
  },
  SuccessBadge: {
    "&::part(base)": {
      fontSize: "var(--sl-font-size-small)",
      padding: "4px 8px",
      textAlign: "center",
      maxWidth: "170px",
      whiteSpace: "pre-line",
      background: "var(--sqm-success-color-icon)",
      color: "var(--sqm-success-color-text)",
    },
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

@Component({
  tag: "sqm-referral-table-status-cell",
  shadow: true,
})
export class ReferralTableStatusCell {
  @Prop() statusText: string;
  @Prop() fraudStatus?: FraudStatus;
  @Prop() converted: boolean;
  @Prop() statusSubText: string;

  render() {
    const sheet = createStyleSheet(style);
    const styleString = sheet.toString();

    const getBadgeType = (fraudStatus) => {
      if (fraudStatus === "PENDING") return "warning";
      if (fraudStatus === "DENIED") return "danger";

      if (this.converted) return "success";
      return "warning";
    };

    type ShoeLaceBadgeType =
      | "primary"
      | "danger"
      | "warning"
      | "success"
      | "info";

    const getBadgeCSSClass = (badgeType: ShoeLaceBadgeType): string => {
      switch (badgeType) {
        case "primary":
          return sheet.classes.RedeemBadge;

        case "danger":
          return sheet.classes.DangerBadge;

        case "success":
          return sheet.classes.SuccessBadge;

        case "warning":
        case "info":
          return sheet.classes.WarningBadge;

        default:
          return sheet.classes.WarningBadge;
      }
    };

    return (
      <div>
        <style type="text/css">{styleString}</style>
        <sl-badge
          pill
          type={getBadgeType(this.fraudStatus)}
          class={getBadgeCSSClass(getBadgeType(this.fraudStatus))}
        >
          {this.statusText}
        </sl-badge>
        {this.statusSubText ? (
          <p class={sheet.classes.SubText}>{this.statusSubText}</p>
        ) : null}
      </div>
    );
  }
}
