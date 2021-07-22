import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "sqm-table-row",
  shadow: true,
})
export class TableRow {
  render() {
    return (
      <Host style={{ display: "contents" }}>
        <tr>
          <slot />
        </tr>
      </Host>
    );
  }
}
