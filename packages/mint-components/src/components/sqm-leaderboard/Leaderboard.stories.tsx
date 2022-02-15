import { h } from "@stencil/core";
import { EmptySkeleton, LoadingSkeleton } from "../../tables/TableSlots";
import { LeaderboardView } from "./sqm-leaderboard-view";
import scenario from "./leaderboard.feature";

export default {
  title: "Components/Leaderboard",
  parameters: {
    scenario,
  },
};

const users = [
  {
    firstName: "Viktor",
    lastInitial: "V",
    value: 82,
    rank: 1,
    rowNumber: 1,
  },
  {
    firstName: "MF",
    lastInitial: "D",
    value: 73,
    rank: 2,
    rowNumber: 2,
  },
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
  {
    firstName: "Joe",
    lastInitial: "S",
    value: 42,
    rank: 6,
    rowNumber: 6,
  },
  {
    firstName: "Zach",
    lastInitial: "H",
    value: 41,
    rank: 7,
    rowNumber: 7,
  },
  {
    firstName: "Sarah",
    lastInitial: "S",
    value: 39,
    rank: 8,
    rowNumber: 8,
  },
  {
    firstName: "James",
    lastInitial: "",
    value: 33,
    rank: 9,
    rowNumber: 9,
  },
  {
    firstName: "",
    lastInitial: "J",
    value: 29,
    rank: 10,
    rowNumber: 10,
  },
];

const defaultStyles = {
  usersheading: "User",
  statsheading: "Referrals",
  rankheading: "Rank",
};

const defaultElements = {
  empty: (
    <sqm-empty
      empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png"
      empty-state-header="View your rank in the leaderboard"
      empty-state-text="Be the first to refer a friend and reach the top of the leaderboard"
    ></sqm-empty>
  ),
  loadingstate: (
    <slot name="loading">
      <table>
        {[...Array(10)].map(() => {
          return (
            <tr>
              <td>
                <sl-skeleton></sl-skeleton>
              </td>
            </tr>
          );
        })}
      </table>
    </slot>
  ),
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
      viewerRank: {
        firstName: "Kutay",
        lastInitial: "C",
        value: 8,
        rowNumber: 11,
        rank: 23,
      },
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
      viewerRank: {
        firstName: "Viktor",
        lastInitial: "V",
        value: 82,
        rank: 1,
        rowNumber: 1,
      },
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
      viewerRank: {
        firstName: "Viktor",
        lastInitial: "V",
        value: 82,
        rank: 1,
        rowNumber: 1,
      },
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};

export const Ten = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        rankheading: "Rank",
        usersheading: "User",
        statsheading: "Referrals",
        showRank: false,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: users,
      viewerRank: {
        firstName: "Viktor",
        lastInitial: "V",
        value: 82,
        rank: 1,
        rowNumber: 1,
      },
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};

export const TenWithRank = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        ...defaultStyles,
        showRank: true,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: users,
      viewerRank: {
        firstName: "Viktor",
        lastInitial: "V",
        value: 82,
        rank: 1,
        rowNumber: 1,
      },
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};

export const ViewerOutside = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        ...defaultStyles,
        showRank: true,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: users,
      viewerRank: {
        firstName: "Kutay",
        lastInitial: "C",
        value: 8,
        rowNumber: 11,
        rank: 23,
      },
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};

export const ViewerAnonymous = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        ...defaultStyles,
        showRank: true,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: users,
      viewerRank: null,
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};

export const HideViewer = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        ...defaultStyles,
        showRank: true,
        hideViewer: true,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: users,
      viewerRank: {
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
