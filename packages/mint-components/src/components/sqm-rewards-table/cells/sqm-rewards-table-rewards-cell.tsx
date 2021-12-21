import { Component, h, Prop } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { intl } from "../../../global/global";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";
@Component({
  tag: "sqm-rewards-table-rewards-cell",
  shadow: true,
})
export class RewardTableRewardsCell {
  @Prop() reward: Reward;
  @Prop() redeemedText: string;
  @Prop() availableText: string;

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

    const RewardValue = ({ reward }: { reward: Reward }) => {
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
            <div>
              {intl.formatMessage(
                {
                  id: "redeemedText",
                  defaultMessage: this.redeemedText,
                },
                {
                  redeemedAmount: reward.prettyRedeemedCredit,
                }
              )}
            </div>
          ) : (
            <div>
              {intl.formatMessage(
                {
                  id: "availableText",
                  defaultMessage: this.availableText,
                },
                {
                  availableAmount: reward.prettyAvailableValue,
                }
              )}
            </div>
          );

        const style = {
          Progress: {
            background: "#e0e0e0",
            borderRadius: "4px",
            height: "3px",
            width: "80px",
            marginTop: "6px",
            marginBottom: "6px",
            "&:after": {
              content: '""',
              display: "block",
              background: "#222222",
              borderRadius: "4px",
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
        };
        jss.setup(preset());
        const sheet = jss.createStyleSheet(style);
        const styleString = sheet.toString();
        return (
          <div>
            <style type="text/css">{styleString}</style>
            <div class={sheet.classes.Container}>
              <span style={{ color: "#232323" }}>{pimpedPrettyValue}</span>{" "}
              <br /> <div class={sheet.classes.Progress} />
              {progressBarSubtext}
            </div>
          </div>
        );
      }
      return <span style={{ color: "#232323" }}>{pimpedPrettyValue}</span>;
    };

    return (
      <div style={{ display: "contents" }}>
        <style type="text/css">{styleString}</style>
        <TextSpanView type="p">
          <span class={sheet.classes.BoldText}>
            <RewardValue reward={this.reward} />
          </span>
        </TextSpanView>
      </div>
    );
  }
}
