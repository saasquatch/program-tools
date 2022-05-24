import { h } from "@stencil/core";
import { LeaderboardRankView } from "../components/sqm-leaderboard-rank/sqm-leaderboard-rank-view";

export default {
  title: "Leaderboard Rank",
};

export const First = () => {
  const props = { data: { rank: "1st" } };

  return (
    <p>
      Your rank is <LeaderboardRankView {...props} /> on the leaderboard
    </p>
  );
};
