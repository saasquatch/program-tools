import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../tables/re-render";
import { ReferralTableColumn } from "../sqm-referral-table/columns/ReferralTableColumn";
import { Reward } from "./useRewardsTable";

/**
 * @uiName Rewards Table Column
 */
@Component({
  tag: "sqm-rewards-table-column",
  shadow: true,
})
export class RewardsTableColumn implements ReferralTableColumn {
  /**
   * @uiName Reward column title
   */
  @Prop() columnTitle: string = "Rewards";

  /**
   * @uiName Hide dropdown details of reward
   */
  @Prop() hideDetails: boolean = false;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  //@ts-ignore
  async renderCell(data: Reward[]) {
    // TODO: Do the right thing with many rewards, pending rewards, canceled rewards

    console.log({data})
    return (
      <sqm-referral-table-rewards-cell
        rewards={data}
        hideDetails={this.hideDetails}
      ></sqm-referral-table-rewards-cell>
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
