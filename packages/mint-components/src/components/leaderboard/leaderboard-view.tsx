import { h, VNode } from "@stencil/core";
import { css } from "emotion";
import { gap, seperateContent } from "../../global/mixins";
import { Column } from "../styles/Spacing";

const ColumnWrapper = css`
  ${Column}
  ${gap("top", "0")}
`;

const Row = css`
  ${seperateContent()}
  padding: var(--sl-spacing-x-small) var(--sl-spacing-small);

  &:not(:last-child) {
    border-bottom: 1px solid var(--sl-color-panel);
  }
`;

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
        <div class={ColumnWrapper}>
          <div class={Row}>
            <b>{styles.usersheading}</b>
            <b>{styles.statsheading}</b>
          </div>
          {data.leaderboard?.map((user) => {
            return (
              <div class={Row}>
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
