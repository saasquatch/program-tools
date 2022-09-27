import { Component, h, Prop, Host } from "@stencil/core";

/**
 * @uiName Table Cell
 * @slots [{"name":"", "title":"Cell Content"}]
 */
@Component({
  tag: "sqm-table-cell",
  shadow: true,
})
export class TableCell {
  /** @uiName Column Span  */
  @Prop() colspan: number = 1;
  /** @uiName Padding */
  @Prop() padding: string = "15px 10px";
  render() {
    return (
      <Host style={{ display: "contents" }}>
        <td colSpan={this.colspan} style={{ padding: this.padding }}>
          <slot />
        </td>
      </Host>
    );
  }
}
