import { Component, h, Method, Host, State, Prop } from "@stencil/core";

@Component({
  tag: "sqm-referral-table-status-column",
  styleUrl: "../sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableStatusColumn {
  @State()
  ignored = true;

  @Prop() columnTitle: string = "Status";

  @Method()
  async renderCell(data) {
    console.log("renderCell data", { data });
    return (
      <sqm-referral-table-status-cell
        status-text={data.status}
      ></sqm-referral-table-status-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  render() {
    return <Host style={{ display: "none" }} />;
  }
}
