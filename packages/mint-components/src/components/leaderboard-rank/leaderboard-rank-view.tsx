import { h } from '@stencil/core';
import { P } from '../styles/Typography';

export interface LeaderboardRankViewProps {
  rank: string;
}

export function LeaderboardRankView(props: LeaderboardRankViewProps) {
  return <span class={P}>{props.rank}</span>;
}
