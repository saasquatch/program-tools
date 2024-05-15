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
  @Prop() deletedReferralText: string;
  @Prop() anonymousUserText: string;
  @Prop() rewardExchangeText: string;
  @Prop() referralText: string;
  @Prop() rewardSourceText: string;
  @Prop() locale: string = "en";

  render() {
    intl.locale = this.locale;
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
              programName: reward?.program?.name,
            }
          )}
        </span>
      );
    };

    const SOURCE_COLUMN_LENGTH = 21;
    const RewardExchangeBadge = ({ reward }: { reward: Reward }) => {
      const rewardExchange = (
        <div>
          <span
            style={{
              fontSize: "var(--sl-font-size-small)",
              color: "var(--sl-color-neutral-500)",
            }}
          >
            {this.rewardExchangeText}
          </span>
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
            // maxWidth: "155px",
          }}
        >
          {rewardExchange}
        </div>
      );
    };

    const getFullName = (user: { firstName: string; lastName: string }) => {
      if (!user) return this.deletedUserText;

      if (!user.firstName && !user.lastName) return this.anonymousUserText;

      if (!user.firstName) return `${user.lastName}`;
      if (!user.lastName) return `${user.firstName}`;

      return `${user.firstName} ${user.lastName}`;
    };

    const Source = () =>
      this.reward.rewardSource === "FRIEND_SIGNUP" ||
      this.reward.rewardSource === "REFERRED" ? (
        this.reward.referral === null ? (
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: "var(--sl-spacing-xx-small)",
            }}
          >
            <sl-icon
              style={{
                color: "white",
                backgroundColor: "var(--sl-color-warning-500)",
                borderRadius: "25px",
                marginBottom: "var(--sl-spacing-xxx-small)",
              }}
              slot="icon"
              name="exclamation-circle"
            ></sl-icon>
            {this.deletedReferralText}
          </div>
        ) : (
          <div>
            <div
              style={{
                fontSize: "var(--sl-font-size-small)",
                color: "var(--sl-color-neutral-500)",
              }}
            >
              {intl.formatMessage(
                {
                  id: "referralText",
                  defaultMessage: this.referralText,
                },
                {
                  rewardSource: this.reward.rewardSource,
                }
              )}
            </div>
            <div>
              {this.reward.rewardSource == "FRIEND_SIGNUP"
                ? getFullName(this.reward.referral.referredUser)
                : getFullName(this.reward.referral.referrerUser)}
            </div>
          </div>
        )
      ) : this.reward.exchangedRewardRedemptionTransaction ? (
        <RewardExchangeBadge reward={this.reward} />
      ) : (
        <RewardSource reward={this.reward} />
      );

    return <Source />;
  }
}
