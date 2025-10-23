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
    firstName: "",
    lastInitial: "",
    textValue: "82",
    rank: 1,
    rowNumber: 1,
  },
  {
    firstName: "MF",
    lastInitial: "D",
    textValue: "73",
    rank: 2,
    rowNumber: 2,
  },
  {
    firstName: "Freddie",
    lastInitial: "G",
    textValue: "64",
    rank: 3,
    rowNumber: 3,
  },
  {
    firstName: "Benny",
    lastInitial: "B",
    textValue: "55",
    rank: 4,
    rowNumber: 4,
  },
  {
    firstName: "Mos",
    lastInitial: "D",
    textValue: "46",
    rank: 5,
    rowNumber: 5,
  },
  {
    firstName: "Joe",
    lastInitial: "S",
    textValue: "42",
    rank: 6,
    rowNumber: 6,
  },
  {
    firstName: "Zach",
    lastInitial: "H",
    textValue: "41",
    rank: 7,
    rowNumber: 7,
  },
  {
    firstName: "Sarah",
    lastInitial: "S",
    textValue: "39",
    rank: 8,
    rowNumber: 8,
  },
  {
    firstName: "James",
    lastInitial: "",
    textValue: "33",
    rank: 9,
    rowNumber: 9,
  },
  {
    firstName: "",
    lastInitial: "J",
    textValue: "29",
    rank: 10,
    rowNumber: 10,
  },
];

const pointsUsers = [
  {
    firstName: "Tom",
    lastInitial: "Smith",
    textValue: "82 Points",
    rank: 1,
    rowNumber: 1,
  },
  {
    firstName: "MF",
    lastInitial: "D",
    textValue: "73 Points",
    rank: 2,
    rowNumber: 2,
  },
  {
    firstName: "Freddie",
    lastInitial: "G",
    textValue: "64 Points",
    rank: 3,
    rowNumber: 3,
  },
  {
    firstName: "Benny",
    lastInitial: "B",
    textValue: "55 Points",
    rank: 4,
    rowNumber: 4,
  },
  {
    firstName: "Mos",
    lastInitial: "D",
    textValue: "46 Points",
    rank: 5,
    rowNumber: 5,
  },
  {
    firstName: "Joe",
    lastInitial: "S",
    textValue: "42 Points",
    rank: 6,
    rowNumber: 6,
  },
  {
    firstName: "Zach",
    lastInitial: "H",
    textValue: "41 Points",
    rank: 7,
    rowNumber: 7,
  },
  {
    firstName: "Sarah",
    lastInitial: "S",
    textValue: "39 Points",
    rank: 8,
    rowNumber: 8,
  },
  {
    firstName: "James",
    lastInitial: "",
    textValue: "33 Points",
    rank: 9,
    rowNumber: 9,
  },
  {
    firstName: "",
    lastInitial: "J",
    textValue: "29 Points",
    rank: 10,
    rowNumber: 10,
  },
];

const defaultStyles = {
  usersheading: "User",
  statsheading: "Referrals",
  rankheading: "Rank",
  anonymousUser: "Anonymous User",
  viewingUserText: "You",
  rankSuffix:
    "{rank, selectordinal, one {#st} two {#nd} few {#rd} other {#th}}",
};

const link = <a>Support</a>;

const tag = "Contact" + link + "about upgrading your plan";

const defaultElements = {
  empty: (
    <sqm-empty
      empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png"
      empty-state-header="View your rank in the leaderboard"
      empty-state-text="Be the first to refer a friend and reach the top of the leaderboard"
    ></sqm-empty>
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
      rowNumber: 10,
      viewerRank: {
        firstName: "Kutay",
        lastInitial: "C",
        textValue: "8",
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
      rowNumber: 10,
      leaderboard: [],
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};

export const Essentials = () => {
  const props = {
    states: {
      loading: false,
      isEssentials: true,
      hasLeaders: false,
      styles: {
        ...defaultStyles,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: [],
      rowNumber: 10,
      viewerRank: {
        firstName: "Kutay",
        lastInitial: "C",
        textValue: "8",
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
      rowNumber: 1,
      leaderboard: [
        {
          firstName: "Viktor",
          lastInitial: "V",
          textValue: "82",
          rank: 1,
          rowNumber: 1,
        },
      ],
      viewerRank: {
        firstName: "Viktor",
        lastInitial: "V",
        textValue: "82",
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
      rowNumber: 5,
      leaderboard: [
        {
          firstName: "Viktor",
          lastInitial: "V",
          textValue: "82",
          rank: 1,
          rowNumber: 1,
        },
        {
          firstName: "MF",
          lastInitial: "D",
          textValue: "73",
          rank: 2,
          rowNumber: 2,
        },
        {
          firstName: "Freddie",
          lastInitial: "G",
          textValue: "64",
          rank: 3,
          rowNumber: 3,
        },
        {
          firstName: "Benny",
          lastInitial: "B",
          textValue: "55",
          rank: 4,
          rowNumber: 4,
        },
        {
          firstName: "Mos",
          lastInitial: "D",
          textValue: "46",
          rank: 5,
          rowNumber: 5,
        },
      ],
      viewerRank: {
        firstName: "Viktor",
        lastInitial: "V",
        textValue: "82",
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

export const ReferralLeaderboard = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        ...defaultStyles,
        rankheading: "Rank",
        usersheading: "User",
        statsheading: "Referrals",
        showRank: false,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: users,
      rowNumber: 10,
      viewerRank: {
        firstName: "Viktor",
        lastInitial: "V",
        textValue: "82",
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

export const ReferralLeaderboardWithCustomStyles = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        ...defaultStyles,
        rankheading: "Rank",
        usersheading: "User",
        statsheading: "Referrals",
        showRank: true,
        textColor: "white",
        borderColor: "white",
        background: "slateblue",
        borderRadius: 18,
        viewingUserHighlightColor: "yellow",
        viewingUserHighlightTextColor: "slateblue",
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: users,
      rowNumber: 10,
      viewerRank: {
        firstName: "Viktor",
        lastInitial: "V",
        textValue: "82",
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

export const ReferralLeaderboardWithMaxWidth = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        ...defaultStyles,
        rankheading: "Rank",
        usersheading: "User",
        statsheading: "Referrals",
        showRank: false,
        maxWidth: "300px",
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: users,
      rowNumber: 10,
      viewerRank: {
        firstName: "Viktor",
        lastInitial: "V",
        textValue: "82",
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

export const PointsLeaderboard = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        ...defaultStyles,
        rankheading: "Rank",
        usersheading: "User",
        statsheading: "Points",
        showRank: false,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: pointsUsers,
      rowNumber: 10,
      viewerRank: {
        firstName: "Viktor",
        lastInitial: "V",
        textValue: "82 Points",
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
      rowNumber: 10,
      viewerRank: {
        firstName: "Viktor",
        lastInitial: "V",
        textValue: "82",
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
      rowNumber: 10,
      viewerRank: {
        firstName: "Kutay",
        lastInitial: "C",
        textValue: "8",
        rowNumber: 11,
        rank: 24,
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
      rowNumber: 10,
      viewerRank: null,
    },
    elements: {
      ...defaultElements,
    },
  };
  return <LeaderboardView {...props} />;
};

export const HideNamesWithViewerOutside = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        ...defaultStyles,
        showRank: true,
        hideNames: true,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: users,
      rowNumber: 10,
      viewerRank: {
        textValue: "8",
        rowNumber: 11,
        rank: 42,
      },
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
      rowNumber: 10,
      styles: {
        ...defaultStyles,
        showRank: true,
        hideViewer: true,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: users,
      rowNumber: 10,
      viewerRank: {
        firstName: "Viktor",
        lastInitial: "V",
        textValue: "82",
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

export const HideNames = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      rowNumber: 10,
      styles: {
        ...defaultStyles,
        showRank: true,
        hideNames: true,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: users,
      rowNumber: 10,
      viewerRank: {
        firstName: "Viktor",
        lastInitial: "V",
        textValue: "82",
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

export const LeaderboardWithNoNamesAndGraphic = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
        gap: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          maxWidth: "30%",
        }}
      >
        <sqm-image
          width="70%"
          alignment="center"
          imageUrl="https://res.cloudinary.com/saasquatch-staging/image/upload/v1729728469/Leaderboard_image_z87lsm.png"
        ></sqm-image>
        <h2 style={{ margin: "auto" }}> Top Performers</h2>
        <p style={{ margin: "0" }}>
          The leaderboard highlights the top performers in real-time. Stay
          motivated, stay competitive!
        </p>
      </div>
      <sqm-leaderboard
        width="300px"
        usersheading="Referrer"
        statsheading="Referrals"
        rank-type="rank"
        leaderboard-type="topStartedReferrers"
        rankheading="Rank"
        show-rank="true"
        hide-names="true"
        hide-viewer="true"
      >
        <sqm-empty
          empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png"
          empty-state-header="View your rank in the leaderboard"
          empty-state-text="Be the first to refer a friend and reach the top of the leaderboard"
        ></sqm-empty>
      </sqm-leaderboard>
    </div>
  );
};
