import { Component, h, Prop } from "@stencil/core";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";

@Component({
  tag: "sqm-rewards-table-source-cell",
  shadow: true,
})
export class RewardTableSourceCell {
  @Prop() reward: Reward;

  render() {
    function capitalize(str: string) {
      if (typeof str !== "string") {
        console.error(`Cannot capitalize parameter of type ${typeof str}`);
        return null;
      }
      return str.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
    }

    function RewardSource({ reward }: { reward: Reward }) {
      const rewardSource =
        capitalize(reward.rewardSource?.replace("_", " ") || "") ?? "-";
      return <span>{rewardSource}</span>;
    }

    const SOURCE_COLUMN_LENGTH = 21;
    function RewardExchangeBadge({ reward }: { reward: Reward }) {
      const rewardExchange = (
        <div>
          Reward Exchange
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
    }

    // TODO: user type
    function getFullName(user: any) {
      if (!user) return "Deleted User";
      if (!user.firstName && !user.lastName) return "Anonymous User";

      if (!user.firstName) return `${user.lastName}`;
      if (!user.lastName) return `${user.firstName}`;

      return `${user.firstName} ${user.lastName}`;
    }

    const source = () =>
      this.reward.rewardSource === "FRIEND_SIGNUP" ||
      this.reward.rewardSource === "REFERRED" ? (
        <div>
          <div
            style={{
              fontSize: "var(--sl-font-size-small)",
              color: "var(--sl-color-neutral-500)",
              marginBottom: "var(--sl-spacing-xx-small)",
            }}
          >
            {this.reward.rewardSource === "FRIEND_SIGNUP" && "Referral to"}
            {this.reward.rewardSource === "REFERRED" && "Referred by"}
          </div>
          <div>{getFullName(this.reward.referral.referredUser)}</div>
        </div>
      ) : this.reward.exchangedRewardRedemptionTransaction ? (
        <RewardExchangeBadge reward={this.reward} />
      ) : (
        <RewardSource reward={this.reward} />
      );

    return <TextSpanView type="p">{source()}</TextSpanView>;
  }
}
