import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { RewardTableColumn } from "./RewardTableColumn";

/**
 * @uiName Reward Table Source Column
 * @validParents ["sqm-rewards-table"]
 * @exampleGroup Rewards
 * @example Reward Table Source Column - <sqm-rewards-table-source-column column-title="Source" anonymous-user="Anonymous User" deleted-user="Deleted User" reward-exchange-text="Reward Exchange" referral-rext="{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}" reward-source-text="{rewardSource, select, MANUAL {Manual} AUTOMATED {{programName}} other {}}"></sqm-rewards-table-source-column>
 */
@Component({
  tag: "sqm-rewards-table-source-column",
  shadow: true,
})
export class RewardTableUserColumn implements RewardTableColumn {
  /**
   * @uiName Soruce column title
   */
  @Prop() columnTitle: string = "Source";

  /**
   * Name displayed for unknown users
   *
   * @uiName Anonymous user text
   */
  @Prop() anonymousUser: string = "Anonymous User";
  /**
   * Name displayed for deleted users
   *
   * @uiName Deleted user text
   */
  @Prop() deletedUser: string = "Deleted User";

  /**
   * @uiName Reward exchange label
   */
  @Prop() rewardExchangeText: string = "Reward Exchange";

  /**
   * Shown when a reward has been created by a referral
   *
   * @uiName Referral text
   * @uiWidget textArea
   */
  @Prop() referralText: string =
    "{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}";

  /**
   * Shown when a reward has been created by a source other than a referral.
   *
   * @uiName Reward source text
   * @uiWidget textArea
   */
  @Prop() rewardSourceText: string =
    "{rewardSource, select, MANUAL {Manual} AUTOMATED {{programName}} other {}}";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Reward, options?: { locale: string }) {
    return (
      <sqm-rewards-table-source-cell
        reward={data}
        anonymousUserText={this.anonymousUser}
        deletedUserText={this.deletedUser}
        rewardExchangeText={this.rewardExchangeText}
        referralText={this.referralText}
        rewardSourceText={this.rewardSourceText}
        locale={options?.locale}
      ></sqm-rewards-table-source-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  render() {
    useRequestRerender([
      this.deletedUser,
      this.anonymousUser,
      this.columnTitle,
      this.rewardExchangeText,
      this.referralText,
      this.rewardSourceText,
    ]);
    return <Host style={{ display: "none" }} />;
  }
}
