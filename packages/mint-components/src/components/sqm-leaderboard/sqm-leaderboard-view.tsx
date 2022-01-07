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
    showUser?: boolean;
    userRank?: any;
    rankType: string;
    leaderboard: {
      value: number;
      rank: number;
      firstName: string;
      lastInitial: string;
      rowNumber: number;
    }[];
  };
  elements: {
    empty: VNode;
    loadingstate: VNode;
  };
}

export function LeaderboardView(props: LeaderboardViewProps) {
  const { states, data, elements } = props;
  const { styles } = states;
  console.log(props);
  let flag = false;
  if (states.loading) {
    return elements.loadingstate;
  }
  return (
    <div>
      {!states.hasLeaders && elements.empty}
      {states.hasLeaders && (
        <table>
          <tr>
            {styles.showRank && <th class="Rank">{styles.rankheading}</th>}
            <th class="User">{styles.usersheading}</th>
            <th class="Score">{styles.statsheading}</th>
          </tr>
          {data.leaderboard?.map((user) => {
            if (user.rowNumber === data.userRank?.leaderboardRank?.rowNumber)
              flag = true;
            return (
              <tr
                class={
                  user.rowNumber === data.userRank?.leaderboardRank?.rowNumber
                    ? "special"
                    : ""
                }
              >
                {styles.showRank && <td class="Rank">{user.rank}</td>}
                <td class="User">{`${user.firstName} ${user.lastInitial} `}</td>
                <td class="Score">{user.value}</td>
              </tr>
            );
          })}
          {!flag && data.showUser && (
            <tr>
              <td colSpan={100} class="dotdotdot">
                <sl-icon
                  name="three-dots"
                  style={{ verticalAlign: "middle" }}
                ></sl-icon>
              </td>
            </tr>
          )}
          {!flag && data.showUser && (
            <tr class="special">
              {styles.showRank && (
                <td class="Rank">{data.userRank?.leaderboardRank?.rank}</td>
              )}
              <td class="User">{`${data.userRank?.firstName} ${data.userRank?.lastInitial} `}</td>
              <td class="Score">{data.userRank?.leaderboardRank?.value}</td>
            </tr>
          )}
        </table>
      )}
    </div>
  );
}
