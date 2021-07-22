import { Component, h, Prop, Host } from "@stencil/core";

@Component({
  tag: "sqm-table-cell",
  shadow: true,
})
export class TableCell {
  @Prop() colspan: number = 1;
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
