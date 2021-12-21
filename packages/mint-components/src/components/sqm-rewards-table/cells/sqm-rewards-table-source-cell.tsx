import { Component, h, Prop } from "@stencil/core";
import { intl } from "../../../global/global";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";

@Component({
  tag: "sqm-rewards-table-source-cell",
  shadow: true,
})
export class RewardTableSourceCell {
  @Prop() reward: Reward;
  @Prop() deletedUserText: string;
  @Prop() anonymousUserText: string;
  @Prop() rewardExchangeText: string;
  @Prop() referralText: string;
  @Prop() rewardSourceText: string;

  render() {
    const RewardSource = ({ reward }: { reward: Reward }) => {
      return (
        <span>
          {intl.formatMessage(
            {
              id: "rewardSourceText",
              defaultMessage: this.rewardSourceText,
            },
            {
              rewardSource: reward.rewardSource,
            }
          )}
        </span>
      );
    };

    const SOURCE_COLUMN_LENGTH = 21;
    const RewardExchangeBadge = ({ reward }: { reward: Reward }) => {
      const rewardExchange = (
        <div>
          {this.rewardExchangeText}
          <br />
          {reward.exchangedRewardRedemptionTransaction?.prettyRedeemedCredit}
          {" → "}
          {reward.prettyValue}
        </div>
      );

      return reward.exchangedRewardRedemptionTransaction.prettyRedeemedCredit
        .length +
        reward.prettyValue.length <
        SOURCE_COLUMN_LENGTH ? (
        rewardExchange
      ) : (
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            maxWidth: "155px",
          }}
        >
          {rewardExchange}
        </div>
      );
    };

    // TODO: user type
    const getFullName = (user: any) => {
      if (!user) return this.deletedUserText;
      if (!user.firstName && !user.lastName) return this.anonymousUserText;

      if (!user.firstName) return `${user.lastName}`;
      if (!user.lastName) return `${user.firstName}`;

      return `${user.firstName} ${user.lastName}`;
    };

    const source = () =>
      this.reward.rewardSource === "FRIEND_SIGNUP" ||
      this.reward.rewardSource === "REFERRED" ? (
        <div>
          {intl.formatMessage(
            {
              id: "referralText",
              defaultMessage: this.referralText,
            },
            {
              rewardSource: this.reward.rewardSource,
            }
          )}
          <br />
          <b>{getFullName(this.reward.referral.referredUser)}</b>
        </div>
      ) : this.reward.exchangedRewardRedemptionTransaction ? (
        <RewardExchangeBadge reward={this.reward} />
      ) : (
        <RewardSource reward={this.reward} />
      );

    return <TextSpanView type="p">{source()}</TextSpanView>;
  }
}
