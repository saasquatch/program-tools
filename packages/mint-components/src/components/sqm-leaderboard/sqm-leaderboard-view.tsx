import { VNode } from "@stencil/core";
import { h } from "@stencil/core";
export interface LeaderboardViewProps {
  states: {
    loading: boolean;
    hasLeaders: boolean;
    styles: {
      usersheading: string;
      statsheading: string;
      rankheading?: string;
      showRank?: boolean;
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
    showUser?: boolean;
    userRank?: {
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

function empty(styles, elements) {
  return (
    <table>
      <tr>
        {styles.showRank && <th class="Rank">{styles.rankheading}</th>}
        <th class="User">{styles.usersheading}</th>
        <th class="Score">{styles.statsheading}</th>
      </tr>
      <tr>
        <td colSpan={100}>{elements.empty}</td>
      </tr>
    </table>
  );
}

export function LeaderboardView(props: LeaderboardViewProps) {
  const { states, data, elements } = props;
  const { styles } = states;

  if (states.loading) return elements.loadingstate;
  if (!states.hasLeaders) return elements.empty ?? empty(styles, elements);

  let userSeenFlag = false;

  return (
    <div>
      <table>
        <tr>
          {styles.showRank && <th class="Rank">{styles.rankheading}</th>}
          <th class="User">{styles.usersheading}</th>
          <th class="Score">{styles.statsheading}</th>
        </tr>
        {data.leaderboard?.map((user) => {
          if (user.rowNumber === data.userRank?.rowNumber) userSeenFlag = true;
          return (
            <tr
              class={
                user.rowNumber === data.userRank?.rowNumber ? "highlight" : ""
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
        {!userSeenFlag && data.showUser && (
          <tr>
            <td colSpan={100} class="ellipses">
              <sl-icon
                name="three-dots"
                style={{ verticalAlign: "middle" }}
              ></sl-icon>
            </td>
          </tr>
        )}
        {!userSeenFlag && data.showUser && (
          <tr class="highlight">
            {styles.showRank && (
              <td class="Rank">{data.userRank?.rank || "-"}</td>
            )}
            <td class="User">
              {data.userRank?.firstName && data.userRank?.lastInitial
                ? data.userRank?.firstName + " " + data.userRank?.lastInitial
                : data.userRank?.firstName || data.userRank?.lastInitial
                ? data.userRank?.firstName || data.userRank?.lastInitial
                : styles.anonymousUser || "Anonymous User"}
            </td>
            <td class="Score">{data.userRank?.value || "0"}</td>
          </tr>
        )}
      </table>
    </div>
  );
}
