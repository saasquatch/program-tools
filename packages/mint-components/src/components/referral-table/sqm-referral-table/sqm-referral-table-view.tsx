import { VNode } from "@stencil/core";
import { h } from "@stencil/core";
export interface LeaderboardViewProps {
  states: {
    loading: boolean;
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
  if (states.loading) {
    return elements.loadingstate;
  }
  return (
    <div>
      {elements.empty}

      <table>
        <tr>
          <th class="User"></th>
          <th class="Score"></th>
        </tr>
        {data.leaderboard?.map((user) => {
          return (
            <tr class="SeparateContent">
              <td class="User">{`${user.firstName} ${user.lastInitial} `}</td>
              <td class="Score">{user.value}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
