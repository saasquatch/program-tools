import { h } from "@stencil/core";
import { LeaderboardView } from "../components/leaderboard/leaderboard-view";

export default {
  title: "Leaderboard",
  parameters: {
    tagname: "sqm-leaderboard",
  },
};

const defaultProps = {
  usersheading: "TOP REFERRERS",
  statsheading: "NEW TITANS",
  empty: <div>Empty</div>,
  loadingstate: <div>Loading</div>,
};

export const Empty = () => {
  const props = {
    loading: false,
    hasleaders: false,
    referrers: [],
    ...defaultProps,
  };
  return <LeaderboardView {...props} />;
};

export const Loading = () => {
  const props = {
    loading: true,
    hasleaders: false,
    referrers: [],
    ...defaultProps,
  };
  return <LeaderboardView {...props} />;
};

export const One = () => {
  const props = {
    loading: false,
    hasleaders: true,
    referrers: [{ name: "Viktor V.", score: "82" }],
    ...defaultProps,
  };
  return <LeaderboardView {...props} />;
};

export const Five = () => {
  const props = {
    loading: false,
    hasleaders: true,
    referrers: [
      { name: "Viktor V.", score: "82" },
      { name: "MF D.", score: "73" },
      { name: "Freddie G.", score: "64" },
      { name: "Benny B.", score: "55" },
      { name: "Mos D.", score: "46" },
    ],
    ...defaultProps,
  };
  return <LeaderboardView {...props} />;
};
