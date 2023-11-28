import { Component, h, Prop } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";

const style = {
  Badge: {
    "&::part(base)": {
      fontSize: "var(--sl-font-size-small)",
      padding: "4px 8px",
      whiteSpace: "pre-line",
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
  @Prop() fraudStatus?:
    | "APPROVED"
    | "PENDING_REVIEW"
    | "MANUAL_DENIED"
    | "AUTO_DENIED";
  @Prop() converted: boolean;

  render() {
    const getBadgeType = (fraudStatus) => {
      switch (fraudStatus) {
        case this.converted:
        case "APPROVED":
          return "success";
        case "PENDING_REVIEW":
          return "warning";
        case "AUTO_DENIED":
        case "MANUAL_DENIED":
          return "danger";
        default:
          return "warning";
      }
    };

    return (
      <div>
        <style type="text/css">{styleString}</style>
        <sl-badge
          pill
          type={getBadgeType(this.fraudStatus)}
          class={sheet.classes.Badge}
        >
          {this.statusText}
        </sl-badge>
      </div>
    );
  }
}
