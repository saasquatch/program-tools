import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../re-render";
import { ReferralTableColumn } from "./ReferralTableColumn";

@Component({
  tag: "sqm-referral-table-status-column",
  shadow: true,
})
export class ReferralTableStatusColumn implements ReferralTableColumn {
  @Prop() columnTitle: string = "Status";
  @Prop() convertedStatusText: string = "Converted";
  @Prop() inProgressStatusText: string = "In Progress";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Referral) {
    // TODO: Make ICU and more complete
    const statusText = data.dateConverted
      ? this.convertedStatusText
      : this.inProgressStatusText;
    return (
      <sqm-referral-table-status-cell
        status-text={statusText}
        converted={data.dateConverted ? true : false}
      ></sqm-referral-table-status-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  @Method()
  async renderReferrerCell(data: Referrer) {
    // TODO: Make ICU and more complete
    const statusText = data.dateConverted
      ? this.convertedStatusText
      : this.inProgressStatusText;
    return (
      <sqm-referral-table-status-cell
        status-text={statusText}
        converted={data.dateConverted ? true : false}
      ></sqm-referral-table-status-cell>
    );
  }

  render() {
    useRequestRerender([this.columnTitle]);
    return <Host style={{ display: "none" }} />;
  }
}
