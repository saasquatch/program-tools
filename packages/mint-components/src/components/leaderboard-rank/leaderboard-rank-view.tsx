import { h } from "@stencil/core";
import { P } from "../styles/Typography";

export interface LeaderboardRankViewProps {
  data: {
    rank: string;
  };
}

export function LeaderboardRankView(props: LeaderboardRankViewProps) {
  const { data } = props;
  return <span class={P}>{data.rank}</span>;
}
