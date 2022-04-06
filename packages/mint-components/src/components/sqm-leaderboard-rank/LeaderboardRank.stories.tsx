import { h } from "@stencil/core";
import { LeaderboardRankView } from "./sqm-leaderboard-rank-view";
import scenario from "./leaderboard-rank.feature";

export default {
  title: "Components/Leaderboard Rank",
  parameters: {
    scenario,
  },
};

export const First = () => {
  const props = { data: { rank: "1st" } };

  return (
    <p>
      Your rank is <LeaderboardRankView {...props} /> on the leaderboard
    </p>
  );
};

export const Second = () => {
  const props = { data: { rank: "2nd" } };

  return (
    <p>
      Your rank is <LeaderboardRankView {...props} /> on the leaderboard
    </p>
  );
};


export const Unranked = () => {
  const props = { data: { rank: "unranked" } };

  return (
    <p>
      You are currently <LeaderboardRankView {...props} />, refer a friend!
    </p>
  );
};
