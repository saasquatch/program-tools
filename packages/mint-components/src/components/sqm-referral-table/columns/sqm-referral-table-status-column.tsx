import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../re-render";
import { ReferralTableColumn } from "./ReferralTableColumn";

@Component({
  tag: "sqm-referral-table-status-column",
  styleUrl: "../sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableStatusColumn implements ReferralTableColumn {
  @Prop() columnTitle: string = "Status";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Referral) {
    console.log("renderCell data", { data });
    // TODO: Make ICU and more complete
    const statusText = data.dateConverted ? "Converted" : "In Progress";
    return (
      <sqm-referral-table-status-cell
        status-text={statusText}
      ></sqm-referral-table-status-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  render() {
    useRequestRerender([this.columnTitle]);
    return <Host style={{ display: "none" }} />;
  }
}
