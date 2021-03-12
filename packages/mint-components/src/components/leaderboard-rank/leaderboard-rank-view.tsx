import { h } from '@stencil/core';
import { P } from '../styles/Typography';

export interface LeaderboardRankViewProps {
  pretext: string;
  rank: string;
  posttext: string;
}

export function LeaderboardRankView(props: LeaderboardRankViewProps) {
  return (
    <p class={P} style={{display: "inline-block"}}>
      {props.pretext} {props.rank} {props.posttext}
    </p>
  );
}
