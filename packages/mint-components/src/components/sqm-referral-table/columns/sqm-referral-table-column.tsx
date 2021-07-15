import { Component, h, Method, Host, State, Prop } from "@stencil/core";

@Component({
  tag: "sqm-referral-table-column",
  styleUrl: "../sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableColumn {
  @State()
  ignored = true;

  @Prop() columnLabel: string;

  @Method()
  async renderCell(_, host) {
    // this is insecure, <script> tags can be added
    return (
      <sqm-referral-table-cell
        inner-template={host.innerHTML}
      ></sqm-referral-table-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnLabel;
  }

  render() {
    return (
      <Host style={{ display: "none" }}>
        <slot />
      </Host>
    );
  }
}
