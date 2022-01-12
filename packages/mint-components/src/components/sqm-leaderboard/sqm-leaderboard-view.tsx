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

function empty(styles) {
  return (
    <table>
      <tr>
        {styles.showRank && <th class="Rank">{styles.rankheading}</th>}
        <th class="User">{styles.usersheading}</th>
        <th class="Score">{styles.statsheading}</th>
      </tr>
      <tr>
        <td colSpan={100}>No Users</td>
      </tr>
    </table>
  );
}

function loading() {
  return (
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
  );
}

export function LeaderboardView(props: LeaderboardViewProps) {
  const { states, data, elements } = props;
  const { styles } = states;
  console.log(props);
  let userSeenFlag = false;

  if (states.loading) return loading();

  if (!states.hasLeaders) return empty(styles);

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
              <td class="User">{`${user.firstName} ${user.lastInitial} `}</td>
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
            {styles.showRank && <td class="Rank">{data.userRank?.rank}</td>}
            <td class="User">{`${data.userRank?.firstName || "-"} ${
              data.userRank?.lastInitial || "-"
            } `}</td>
            <td class="Score">{data.userRank?.value || "0"}</td>
          </tr>
        )}
      </table>
    </div>
  );
}
