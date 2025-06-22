import { h } from "@stencil/core";

export interface LeaderboardRankViewProps {
  data: {
    rank: string;
  };
}

export function LeaderboardRankView(props: LeaderboardRankViewProps) {
  const { data } = props;
  return (
    <span style={{ marginTop: "0px", fontSize: "var(--sl-font-size-small)" }}>
      {data.rank}
    </span>
  );
}
