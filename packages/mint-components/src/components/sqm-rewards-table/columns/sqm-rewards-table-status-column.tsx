import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { RewardTableColumn } from "./RewardTableColumn";

/**
 * @uiName Reward Table Status Column
 */
@Component({
  tag: "sqm-rewards-table-status-column",
  shadow: true,
})
export class RewardTableStatusColumn implements RewardTableColumn {
  /**
   * @uiName Column Title
   */
  @Prop() columnTitle: string = "Status";

  /**
   * @uiName Reward Status Text
   */
  @Prop() statusText: string =
    "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }";

  /**
   * @uiName Expired Status Text
   */
  @Prop() expiryText: string = "Expires on ";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Reward[]) {
    const rewardData = data?.[0];
    return (
      <sqm-rewards-table-status-cell
        statusText={this.statusText}
        reward={rewardData}
        expiryText={this.expiryText}
      ></sqm-rewards-table-status-cell>
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
