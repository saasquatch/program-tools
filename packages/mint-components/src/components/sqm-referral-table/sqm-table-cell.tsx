import { Component, h, Prop, Host } from "@stencil/core";

@Component({
  tag: "sqm-table-cell",
  shadow: true,
})
export class TableCell {
  @Prop() colspan: number = 1;
  render() {
    return (
      <Host style={{ display: "contents" }}>
        <td colSpan={this.colspan}>
          <slot />
        </td>
      </Host>
    );
  }
}
