import { VNode } from "@stencil/core";
import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { intl } from "../../global/global";
export interface LeaderboardViewProps {
  states: {
    loading: boolean;
    hasLeaders: boolean;
    isEssentials?: boolean;
    styles: {
      usersheading: string;
      statsheading: string;
      rankheading?: string;
      showRank?: boolean;
      hideViewer?: boolean;
      viewingUserText?: string;
      viewingUserHighlightColor?: string;
      viewingUserHighlightTextColor?: string;
      hideNames?: boolean;
      anonymousUser?: string;
      rankSuffix?: string;
      width?: string;
      background?: string;
      borderColor?: string;
      textColor?: string;
      borderRadius?: number;
    };
  };
  data: {
    rankType: string;
    leaderboard: {
      textValue: string;
      rank: number;
      firstName: string;
      lastInitial: string;
      rowNumber: number;
    }[];
    viewerRank?: {
      textValue: string;
      rank: number;
      firstName?: string;
      lastInitial?: string;
      rowNumber: number;
    };
  };
  elements: {
    empty: VNode;
  };
}

export function LeaderboardView(props: LeaderboardViewProps) {
  const { states, data, elements } = props;
  const { styles } = states;

  const style = {
    Leaderboard: {
      "& table": {
        width: "100%",
        borderCollapse: "collapse",
        background: styles.background || "transparent",
        borderRadius: styles.borderRadius ? `${styles.borderRadius}px` : "0",
      },
      "& th": {
        textAlign: "left",
        padding: "var(--sl-spacing-medium)",
        paddingTop: "0",
        fontSize: "var(--sl-font-size-medium)",
        fontWeight: "var(--sl-font-weight-semibold)",
      },
      "& tr:not(:first-child)": {
        borderTop: `1px solid ${
          styles.borderColor || "var(--sl-color-neutral-200)"
        }`,
      },
      "& td": {
        fontSize: "var(--sl-font-size-medium)",
        fontWeight: "var(--sl-font-weight-normal)",
      },
      "& .ellipses": {
        textAlign: "left",
        padding: "0",
        color: styles.textColor || "var(--sqm-text)",
        paddingLeft: "25%",
      },
      "& .highlight": {
        background:
          styles.viewingUserHighlightColor || "var(--sl-color-primary-200)",
        "& td, th": {
          color: styles.viewingUserHighlightTextColor || "var(--sqm-text)",
        },
      },
      "& td, th": {
        color: styles.textColor || "var(--sqm-text)",
        padding: "var(--sl-spacing-medium)",
      },
      "& .User": {
        width: "100%",
      },
      "& .Score": {
        width: "auto",
        whiteSpace: "nowrap",
      },

      "& .Rank": {
        whiteSpace: "nowrap",
      },
      "& .fullWidth": {
        width: "100%",
      },
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  const vanillaStyle = `
  :host{
    display: block;
  }
`;

  if (states.isEssentials) {
    return (
      <sqm-empty
        empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1715360191/squatch-assets/Leaderboard_Not_Available.svg"
        empty-state-header="Leaderboards aren’t available on your plan"
        empty-state-text="Contact {supportText} to upgrade your plan and start leveraging gamification in your program."
        support-text="Support"
      ></sqm-empty>
    );
  }

  if (states.loading) {
    return (
      <div
        class={sheet.classes.Leaderboard}
        style={{ width: styles.width || "100%" }}
      >
        <style type="text/css">
          {styleString}
          {vanillaStyle}
        </style>
        <table>
          {[...Array(10)].map(() => {
            return (
              <tr>
                <td>
                  <sl-skeleton></sl-skeleton>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }

  if (!states.hasLeaders) return elements.empty;

  let userSeenFlag = false;

  const getUsersName = (user) => {
    if (!user.firstName && !user.lastInitial) return styles.anonymousUser;

    const { firstName, lastInitial } = user;
    if (firstName && lastInitial) return `${firstName} ${lastInitial}`;
    if (firstName || lastInitial) return firstName || lastInitial;
    return styles.anonymousUser;
  };

  const getRankCellText = (userRank, isViewingUsersRow) => {
    if (!userRank) {
      return styles.hideNames ? `${styles.viewingUserText}` : "-";
    }
    const viewingUserText = ` - ${styles.viewingUserText}`;
    return styles.rankSuffix
      ? intl.formatMessage(
          {
            id: "rank",
            defaultMessage: styles.rankSuffix,
          },
          {
            rank: userRank,
          }
        ) + `${isViewingUsersRow && styles.hideNames ? viewingUserText : ""}`
      : `${userRank} ${
          isViewingUsersRow && styles.hideNames ? viewingUserText : ""
        }`;
  };

  return (
    <div
      class={sheet.classes.Leaderboard}
      part="sqm-base"
      style={{ width: styles.width || "100%" }}
    >
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>

      <table part="sqm-table">
        <tr>
          {styles.showRank && (
            <th class={`Rank ${styles.hideNames ? "fullWidth" : ""}`}>
              {styles.rankheading}
            </th>
          )}
          {!styles.hideNames && <th class="User">{styles.usersheading}</th>}
          <th class="Score">{styles.statsheading}</th>
        </tr>
        {data.leaderboard?.map((user) => {
          if (user.rowNumber === data.viewerRank?.rowNumber)
            userSeenFlag = true;

          const isViewingUsersRow =
            !styles.hideViewer && user.rowNumber === data.viewerRank?.rowNumber;
          return (
            <tr class={isViewingUsersRow ? "highlight" : ""}>
              {styles.showRank && (
                <td class="Rank">
                  {getRankCellText(user.rank, isViewingUsersRow)}
                </td>
              )}
              {!styles.hideNames && <td class="User">{getUsersName(user)}</td>}
              <td class="Score">{user.textValue}</td>
            </tr>
          );
        })}
        {!userSeenFlag && !styles.hideViewer && (
          <tr>
            <td colSpan={100} class="ellipses">
              <sl-icon
                name="three-dots"
                style={{ verticalAlign: "middle" }}
              ></sl-icon>
            </td>
          </tr>
        )}
        {!userSeenFlag && !styles.hideViewer && (
          <tr class="highlight">
            {styles.showRank && (
              <td class="Rank">
                {getRankCellText(data.viewerRank?.rank, true)}
              </td>
            )}
            {!styles.hideNames && (
              <td class="User">{getUsersName(data.viewerRank || {})}</td>
            )}
            <td class="Score">{data.viewerRank?.textValue || "0"}</td>
          </tr>
        )}
      </table>
    </div>
  );
}
