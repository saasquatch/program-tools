import { Component, h, Prop } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";
@Component({
  tag: "sqm-rewards-table-rewards-cell",
  shadow: true,
})
export class RewardTableRewardsCell {
  @Prop() reward: Reward;
  @Prop() hideDetails: boolean;

  // TODO: value function from portalv2

  render() {
    const style = {
      DetailsContainer: {
        width: "100%",
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",
        "margin-right": "var(--sl-spacing-small)",
        "flex-wrap": "wrap",
      },

      Details: {
        "padding-bottom": "var(--sl-spacing-small)",
        "max-width": "500px",
        "padding-right": "var(--sl-spacing-x-small)",
        "&::part(header)": {
          padding: "var(--sl-spacing-x-small)",
          cursor: "default",
        },
        "&::part(content)": {
          padding: "var(--sl-spacing-x-small) var(--sl-spacing-medium)",
        },
        "&::part(base)": {
          opacity: "1",
        },
        "&::part(summary-icon)": {
          display: "flex",
        },
      },

      BadgeContainer: {
        "& > :not(:last-child)": {
          "margin-right": "var(--sl-spacing-x-small)",
        },
      },

      BoldText: {
        "font-weight": "var(--sl-font-weight-semibold)",
      },
      StatusBadge: {
        paddingLeft: "var(--sl-spacing-xxx-small)",
      },
    };

    jss.setup(preset());
    const sheet = jss.createStyleSheet(style);
    const styleString = sheet.toString();

    function RewardValue({ reward }: { reward: Reward }) {
      const pimpedPrettyValue =
        reward.unit === "CENTS"
          ? reward.prettyValue.replace(/USD/gi, "$")
          : reward.prettyValue ?? "-";

      if (reward.type === "CREDIT") {
        const progress = Math.round(
          ((parseFloat(reward.prettyValueNumber) -
            parseFloat(reward.prettyRedeemedNumber)) /
            parseFloat(reward.prettyValueNumber)) *
            100
        );

        const progressBarSubtext =
          reward.statuses.includes("EXPIRED") ||
          reward.statuses.includes("CANCELLED") ? (
            <div>{reward.prettyRedeemedCredit} redeemed</div>
          ) : (
            <div>{reward.prettyAvailableValue} available</div>
          );

        const style = {
          Progress: {
            height: "3px",
            width: "100px",
            margin: "var(--sl-spacing-xx-small) 0",
			background: "var(--sl-color-neutral-200)",
            "&:after": {
              content: '""',
              display: "block",
			  background: "var(--sl-color-neutral-1000)",
              borderRadius: "100px",
              width: `${progress}%`,
              height: "100%",
            },
          },
          Container: {
            display: "inline-block",
            verticalAlign: "top",
            maxWidth: "100%",
            maxHeight: "60px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },

          RewardAmount: {
            fontSize: "var(--sl-font-size-medium)",
            fontWeight: "var(--sl-font-weight-semibold)",
          },
          RewardRemain: {
            fontSize: "var(--sl-font-size-small)",
            color: "var(--sl-color-neutral-500)",
          },
        };
        jss.setup(preset());
        const sheet = jss.createStyleSheet(style);
        const styleString = sheet.toString();
        return (
          <div>
            <style type="text/css">{styleString}</style>
            <div class={sheet.classes.Container}>
              <span class={sheet.classes.RewardAmount}>
                {pimpedPrettyValue + " "}
              </span>
              <br /> <div class={sheet.classes.Progress} />
              <span class={sheet.classes.RewardRemain}>
                {progressBarSubtext}
              </span>
            </div>
          </div>
        );
      }
      return <span>{pimpedPrettyValue}</span>;
    }

    return (
      <div style={{ display: "contents" }}>
        <style type="text/css">{styleString}</style>
        <TextSpanView type="p">
          <RewardValue reward={this.reward} />
        </TextSpanView>
      </div>
    );
  }
}
