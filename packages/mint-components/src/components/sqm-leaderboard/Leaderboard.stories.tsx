import { h } from "@stencil/core";
import { EmptySkeleton, LoadingSkeleton } from "../../tables/TableSlots";
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
  empty: <EmptySkeleton label="No Users Yet" />,
  loadingstate: <LoadingSkeleton />,
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
        {
          firstName: "Viktor",
          lastInitial: "V",
          value: 82,
          rank: 1,
          rowNumber: 1,
        },
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
        {
          firstName: "Viktor",
          lastInitial: "V",
          value: 82,
          rank: 1,
          rowNumber: 1,
        },
        { firstName: "MF", lastInitial: "D", value: 73, rank: 2, rowNumber: 2 },
        {
          firstName: "Freddie",
          lastInitial: "G",
          value: 64,
          rank: 3,
          rowNumber: 3,
        },
        {
          firstName: "Benny",
          lastInitial: "B",
          value: 55,
          rank: 4,
          rowNumber: 4,
        },
        {
          firstName: "Mos",
          lastInitial: "D",
          value: 46,
          rank: 5,
          rowNumber: 5,
        },
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
        {
          firstName: "Viktor",
          lastInitial: "V",
          value: 82,
          rank: 1,
          rowNumber: 1,
        },
        { firstName: "MF", lastInitial: "D", value: 73, rank: 2, rowNumber: 2 },
        {
          firstName: "Freddie",
          lastInitial: "G",
          value: 64,
          rank: 3,
          rowNumber: 3,
        },
        {
          firstName: "Benny",
          lastInitial: "B",
          value: 55,
          rank: 4,
          rowNumber: 4,
        },
        {
          firstName: "Mos",
          lastInitial: "D",
          value: 46,
          rank: 5,
          rowNumber: 5,
        },
      ],
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};

export const UserInList = () => {
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
        {
          firstName: "Viktor",
          lastInitial: "V",
          value: 82,
          rank: 1,
          rowNumber: 1,
        },
        { firstName: "MF", lastInitial: "D", value: 73, rank: 2, rowNumber: 2 },
        {
          firstName: "Freddie",
          lastInitial: "G",
          value: 64,
          rank: 3,
          rowNumber: 3,
        },
        {
          firstName: "Benny",
          lastInitial: "B",
          value: 55,
          rank: 4,
          rowNumber: 4,
        },
        {
          firstName: "Mos",
          lastInitial: "D",
          value: 46,
          rank: 5,
          rowNumber: 5,
        },
      ],
      showUser: true,
      userRank: {
        firstName: "Viktor",
        lastInitial: "V",
        value: 82,
        rowNumber: 1,
        rank: 1,
      },
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};

export const UserOutside = () => {
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
        {
          firstName: "Viktor",
          lastInitial: "V",
          value: 82,
          rank: 1,
          rowNumber: 1,
        },
        { firstName: "MF", lastInitial: "D", value: 73, rank: 2, rowNumber: 2 },
        {
          firstName: "Freddie",
          lastInitial: "G",
          value: 64,
          rank: 3,
          rowNumber: 3,
        },
        {
          firstName: "Benny",
          lastInitial: "B",
          value: 55,
          rank: 4,
          rowNumber: 4,
        },
        {
          firstName: "Mos",
          lastInitial: "D",
          value: 46,
          rank: 5,
          rowNumber: 5,
        },
      ],
      showUser: true,
      userRank: {
        firstName: "Kutay",
        lastInitial: "C",
        value: 7,
        rowNumber: 6,
        rank: 9,
      },
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};
