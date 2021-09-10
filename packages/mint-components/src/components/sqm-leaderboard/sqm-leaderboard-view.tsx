import { VNode } from "@stencil/core";
import { h } from "@stencil/core";
export interface LeaderboardViewProps {
  states: {
    loading: boolean;
    hasLeaders: boolean;
    styles: {
      usersheading: string;
      statsheading: string;
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
  if (states.loading) {
    return elements.loadingstate;
  }
  return (
    <div>
      {!states.hasLeaders && elements.empty}
      {states.hasLeaders && (
        <table>
          <tr>
            {styles.showRank && <th class="User">Rank</th>}
            <th class="User">{styles.usersheading}</th>
            <th class="Score">{styles.statsheading}</th>
          </tr>
          {data.leaderboard?.map((user) => {
            return (
              <tr class="SeparateContent">
                {styles.showRank && <td class="User">{user.rank}</td>}
                <td class="User">{`${user.firstName} ${user.lastInitial} `}</td>
                <td class="Score">{user.value}</td>
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
}
