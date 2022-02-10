import { Component, h, Prop } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";

@Component({
  tag: "sqm-referral-table-status-cell",
  shadow: true,
})
export class ReferralTableStatusCell {
  @Prop() statusText: string;
  @Prop() converted: boolean;
  render() {
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

    return (
      <div>
        <style type="text/css">{styleString}</style>
        <sl-badge
          pill
          type={this.converted ? "success" : "warning"}
          class={sheet.classes.Badge}
        >
          {this.statusText}
        </sl-badge>
      </div>
    );
  }
}
