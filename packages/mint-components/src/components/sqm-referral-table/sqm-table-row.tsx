import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "sqm-table-row",
  shadow: true,
})
export class TableRow {
  @Prop() border: string = "1px solid #EAEAEA";
  render() {
    return (
      <Host style={{ display: "contents" }}>
        <tr style={{ border:this.border }}>
          <slot />
        </tr>
      </Host>
    );
  }
}
