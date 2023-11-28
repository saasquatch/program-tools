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
    return (
      <div>
        <style type="text/css">{styleString}</style>
        <sl-badge
          pill
          // FRAUD-TODO: Proper status tag. Consider converted and fraudStatus
          type={
            this.fraudStatus && this.fraudStatus !== "APPROVED"
              ? "danger"
              : this.converted
              ? "success"
              : "warning"
          }
          class={sheet.classes.Badge}
        >
          {this.statusText}
        </sl-badge>
      </div>
    );
  }
}
