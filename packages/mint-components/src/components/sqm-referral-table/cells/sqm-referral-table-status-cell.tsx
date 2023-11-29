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
  SubText: {
    fontSize: "var(--sl-font-size-small)",
    color: "var(--sl-color-neutral-500)",
    margin: "0",
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
  @Prop() fraudStatus?: "APPROVED" | "PENDING_REVIEW" | "DENIED";
  @Prop() converted: boolean;

  render() {
    const getBadgeType = (fraudStatus) => {
      switch (fraudStatus) {
        case this.converted:
        case "APPROVED":
          return "success";
        case "PENDING_REVIEW":
          return "warning";
        case "DENIED":
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
        {this.fraudStatus === "PENDING_REVIEW" ? (
          <p class={sheet.classes.SubText}>Awaiting review</p>
        ) : null}
      </div>
    );
  }
}
