import { h } from "@stencil/core";
import { LeaderboardRankView } from "../components/leaderboard-rank/leaderboard-rank-view";

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
