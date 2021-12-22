import { h } from "@stencil/core";
import { LeaderboardView } from "./sqm-leaderboard-view";

export default {
  title: "Components/Leaderboard",
  parameters: {
    tagname: "sqm-leaderboard",
  },
};

const defaultStyles = {
  usersheading: "TOP REFERRERS",
  statsheading: "NEW TITANS",
};

const defaultElements = {
  empty: <div>Empty</div>,
  loadingstate: <div>Loading</div>,
};

export const Empty = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: false,
      styles: {
        ...defaultStyles,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: [],
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};

export const Loading = () => {
  const props = {
    states: {
      loading: true,
      hasLeaders: false,
      styles: {
        ...defaultStyles,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: [],
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};

export const One = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        ...defaultStyles,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: [
        { firstName: "Viktor", lastInitial: "V", value: 82, rank: 1 },
      ],
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};

export const Five = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        ...defaultStyles,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: [
        { firstName: "Viktor", lastInitial: "V", value: 82, rank: 1 },
        { firstName: "MF", lastInitial: "D", value: 73, rank: 2 },
        { firstName: "Freddie", lastInitial: "G", value: 64, rank: 3 },
        { firstName: "Benny", lastInitial: "B", value: 55, rank: 4 },
        { firstName: "Mos", lastInitial: "D", value: 46, rank: 5 },
      ],
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};

export const FiveWithRank = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
		rankheading: "Rank",
		usersheading: "User",
		statsheading: "Referrals",
        showRank: true,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: [
        { firstName: "Viktor", lastInitial: "V", value: 82, rank: 1 },
        { firstName: "MF", lastInitial: "D", value: 73, rank: 2 },
        { firstName: "Freddie", lastInitial: "G", value: 64, rank: 3 },
        { firstName: "Benny", lastInitial: "B", value: 55, rank: 4 },
        { firstName: "Mos", lastInitial: "D", value: 46, rank: 5 },
      ],
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};
