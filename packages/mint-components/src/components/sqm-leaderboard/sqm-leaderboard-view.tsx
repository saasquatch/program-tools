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
    imageUrl?: string;
    headerTitle?: string;
    headerDescription?: string;
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
      {data.headerTitle && <div class="header-title">{data.headerTitle}</div>}
      {data.headerDescription && (
        <div class="header-description">{data.headerDescription}</div>
      )}
      {data.imageUrl && <img class="cover-image" src={data.imageUrl} />}
      {!states.hasLeaders && elements.empty}
      {states.hasLeaders && (
        <table>
          <tr>
            {styles.showRank && <th class="Rank">{styles.rankheading}</th>}
            <th class="User">{styles.usersheading}</th>
            <th class="Score">{styles.statsheading}</th>
          </tr>
          {data.leaderboard?.map((user) => {
            return (
              <tr class="SeparateContent">
                {styles.showRank && <td class="Rank">{user.rank}</td>}
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
