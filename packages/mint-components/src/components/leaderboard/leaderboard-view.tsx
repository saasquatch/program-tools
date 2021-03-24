import { VNode } from "@stencil/core";
import { h } from "@stencil/core";
export interface LeaderboardViewProps {
  states: {
    loading: boolean;
    hasLeaders: boolean;
    styles: {
      usersheading: string;
      statsheading: string;
    };
  };
  data: {
    rankType: string;
    leaderboard: {
      value: number;
      rank: string;
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
        <div class="Column">
          <div class="SeparateContent">
            <b>{styles.usersheading}</b>
            <b>{styles.statsheading}</b>
          </div>
          {data.leaderboard?.map((user) => {
            return (
              <div class="SeparateContent">
                <span>{`${user.firstName} ${user.lastInitial} `}</span>
                <span>{user.value}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
