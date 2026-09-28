import { Component, h, Prop } from "@stencil/core";
import { FraudStatus } from "../../../saasquatch";
import { createStyleSheet } from "../../../styling/JSS";
import { ReferralStatus } from "../referralStatus";

type ShoeLaceBadgeType = "primary" | "danger" | "warning" | "success" | "info";

const badgeTypeMap: Record<ReferralStatus, ShoeLaceBadgeType> = {
  DENIED: "danger",
  RETRACTED: "danger",
  PENDING_REVIEW: "warning",
  CONVERTED: "success",
  IN_PROGRESS: "warning",
};

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
      color: "var(--sl-color-white)",
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
      color: "var(--sl-color-white)",
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
      color: "var(--sl-color-white)",
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
      color: "var(--sl-color-white)",
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
  @Prop() status?: ReferralStatus;
  @Prop() fraudStatus?: FraudStatus;
  @Prop() converted: boolean;
  @Prop() statusSubText: string;

  render() {
    const sheet = createStyleSheet(style);
    const styleString = sheet.toString();

    const getBadgeType = (): ShoeLaceBadgeType => {
      if (this.status) return badgeTypeMap[this.status];

      // Callers that predate the status prop still set fraudStatus/converted
      if (this.fraudStatus === "PENDING") return "warning";
      if (this.fraudStatus === "DENIED") return "danger";
      if (this.converted) return "success";
      return "warning";
    };

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
          type={getBadgeType()}
          class={getBadgeCSSClass(getBadgeType())}
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
