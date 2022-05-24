import { h } from '@stencil/core';

export interface LeaderboardRankViewProps {
  data: {
    rank: string;
  };
}

export function LeaderboardRankView(props: LeaderboardRankViewProps) {
  const { data } = props;
  return <span class="P">{data.rank}</span>;
}
