import { Component, h, Host, Prop } from "@stencil/core";

/**
 * @uiName Table Row
 * @slots [{"name":"", "title":"Row Content"}]
 */
@Component({
  tag: "sqm-table-row",
  shadow: true,
})
export class TableRow {
  /**
   * @uiName Border
   */
  @Prop() border: string =
    "var(--sqm-border-thickness, 1px) solid var(--sqm-border-color, #eaeaea)";
  render() {
    return (
      <Host style={{ display: "contents" }}>
        <tr style={{ border: this.border }}>
          <slot />
        </tr>
      </Host>
    );
  }
}
