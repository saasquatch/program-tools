import { VNode } from "@stencil/core";
import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { loading } from "../sqm-reward-exchange-list/RewardExchangeListData";
export interface LeaderboardViewProps {
  states: {
    loading: boolean;
    hasLeaders: boolean;
    styles: {
      usersheading: string;
      statsheading: string;
      rankheading?: string;
      showRank?: boolean;
      hideViewer?: boolean;
      anonymousUser?: string;
    };
  };
  data: {
    rankType: string;
    leaderboard: {
      value: number;
      rank: number;
      firstName: string;
      lastInitial: string;
      rowNumber: number;
    }[];
    viewerRank?: {
      value: number;
      rank: number;
      firstName: string;
      lastInitial: string;
      rowNumber: number;
    };
  };
  elements: {
    empty: VNode;
    loadingstate: VNode;
  };
}

const style = {
  Leaderboard: {
    "& table": {
      width: "100%",
      borderCollapse: "collapse",
    },
    "& th": {
      textAlign: "left",
      padding: "var(--sl-spacing-medium)",
      paddingTop: "0",
      fontSize: "var(--sl-font-size-medium)",
      fontWeight: "var(--sl-font-weight-semibold)",
    },
    "& tr:not(:first-child)": {
      borderTop: "1px solid var(--sl-color-neutral-200)",
    },
    "& td": {
      fontSize: "var(--sl-font-size-medium)",
      fontWeight: "var(--sl-font-weight-normal)",
    },
    "& .ellipses": {
      textAlign: "center",
      padding: "0",
      color: "var(--sl-color-neutral-500)",
    },
    "& .highlight": {
      background: "var(--sl-color-primary-50)",
    },
    "& td, th": {
      color: "var(--sl-color-gray-800)",
      padding: "var(--sl-spacing-medium)",
    },
    "& .User": {
      width: "100%",
    },
    "& .Score": {
      width: "auto",
      whiteSpace: "nowrap",
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

export function LeaderboardView(props: LeaderboardViewProps) {
  const { states, data, elements } = props;
  const { styles } = states;

  if (states.loading)
    return (
      <div class={sheet.classes.Leaderboard}>
        <style type="text/css">
          {styleString}
          {vanillaStyle}
        </style>
        {elements.loadingstate}
      </div>
    );

  if (!states.hasLeaders) return elements.empty;

  let userSeenFlag = false;

  return (
    <div class={sheet.classes.Leaderboard}>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <table>
        <tr>
          {styles.showRank && <th class="Rank">{styles.rankheading}</th>}
          <th class="User">{styles.usersheading}</th>
          <th class="Score">{styles.statsheading}</th>
        </tr>
        {data.leaderboard?.map((user) => {
          if (user.rowNumber === data.viewerRank?.rowNumber)
            userSeenFlag = true;
          return (
            <tr
              class={
                !styles.hideViewer &&
                user.rowNumber === data.viewerRank?.rowNumber
                  ? "highlight"
                  : ""
              }
            >
              {styles.showRank && <td class="Rank">{user.rank}</td>}
              <td class="User">
                {user.firstName && user.lastInitial
                  ? user.firstName + " " + user.lastInitial
                  : user.firstName || user.lastInitial
                  ? user.firstName || user.lastInitial
                  : styles.anonymousUser || "Anonymous User"}
              </td>
              <td class="Score">{user.value}</td>
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
              <td class="Rank">{data.viewerRank?.rank || "-"}</td>
            )}
            <td class="User">
              {data.viewerRank?.firstName && data.viewerRank?.lastInitial
                ? data.viewerRank?.firstName +
                  " " +
                  data.viewerRank?.lastInitial
                : data.viewerRank?.firstName || data.viewerRank?.lastInitial
                ? data.viewerRank?.firstName || data.viewerRank?.lastInitial
                : styles.anonymousUser || "Anonymous User"}
            </td>
            <td class="Score">{data.viewerRank?.value || "0"}</td>
          </tr>
        )}
      </table>
    </div>
  );
}
