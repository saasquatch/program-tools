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
  @Prop() fraudStatus?: FraudStatus;
  @Prop() converted: boolean;
  @Prop() statusSubText: string;

  render() {
    const getBadgeType = (fraudStatus) => {
      if (fraudStatus === "PENDING") return "warning";
      if (fraudStatus === "DENIED") return "danger";

      if (this.converted) return "success";
      return "warning";
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
        {this.statusSubText ? (
          <p class={sheet.classes.SubText}>{this.statusSubText}</p>
        ) : null}
      </div>
    );
  }
}
