import { e as getElement, h } from './index-832bd454.js';
import { d as dist, M, i as ie, a as sn } from './index.module-b74a7f69.js';

const map = new Map();
function withShadowView(component) {
  // TODO: Could only do this if rendered in a Stencilbook environment to prevent unintended side-effects
  const element = getElement(component);
  let renderFn = component["render"].bind(component);
  const newRenderFn = () => {
    const key = element.getAttribute("stencilbook-shadow-view");
    if (key) {
      const value = map.get(key);
      if (value) {
        return value;
      }
    }
    return renderFn();
  };
  component["render"] = newRenderFn;
}
/**
 * Any story that defines `parameters.tagname` will be used as a wrapper component around the view
 */
const ShadowViewAddon = ({ story }, children) => {
  var _a;
  let TagName = (_a = story.parent.parameters) === null || _a === void 0 ? void 0 : _a.tagname;
  if (!TagName)
    return children;
  const randomInt = Math.round(Math.random() * 100000);
  map.set(randomInt + "", children);
  const RandomTagName = "stencilbook-shawdow-view-" + randomInt;
  // This will only re-render when the tag name changes, so we use a random tag name every time.
  // Altneratively we could try to trick Stencil to call `forceUpdate` every time.
  return (h(RandomTagName, null,
    h(TagName, { "stencilbook-shadow-view": randomInt })));
};

function empty(styles) {
  return (h("table", null,
    h("tr", null,
      styles.showRank && h("th", { class: "Rank" }, styles.rankheading),
      h("th", { class: "User" }, styles.usersheading),
      h("th", { class: "Score" }, styles.statsheading)),
    h("tr", null,
      h("td", { colSpan: 100 }, styles.emptyStateText))));
}
function loading() {
  return (h("table", null, [...Array(10)].map(() => {
    return (h("tr", null,
      h("td", null,
        h("sl-skeleton", null))));
  })));
}
function LeaderboardView(props) {
  var _a, _b, _c, _d, _e, _f, _g;
  const { states, data, elements } = props;
  const { styles } = states;
  if (states.loading)
    return (_a = elements.loadingstate) !== null && _a !== void 0 ? _a : loading();
  if (!states.hasLeaders)
    return (_b = elements.empty) !== null && _b !== void 0 ? _b : empty(styles);
  let userSeenFlag = false;
  return (h("div", null,
    h("table", null,
      h("tr", null,
        styles.showRank && h("th", { class: "Rank" }, styles.rankheading),
        h("th", { class: "User" }, styles.usersheading),
        h("th", { class: "Score" }, styles.statsheading)), (_c = data.leaderboard) === null || _c === void 0 ? void 0 :
      _c.map((user) => {
        var _a, _b;
        if (user.rowNumber === ((_a = data.userRank) === null || _a === void 0 ? void 0 : _a.rowNumber))
          userSeenFlag = true;
        return (h("tr", { class: user.rowNumber === ((_b = data.userRank) === null || _b === void 0 ? void 0 : _b.rowNumber) ? "highlight" : "" },
          styles.showRank && h("td", { class: "Rank" }, user.rank),
          h("td", { class: "User" }, `${user.firstName} ${user.lastInitial} `),
          h("td", { class: "Score" }, user.value)));
      }),
      !userSeenFlag && data.showUser && (h("tr", null,
        h("td", { colSpan: 100, class: "ellipses" },
          h("sl-icon", { name: "three-dots", style: { verticalAlign: "middle" } })))),
      !userSeenFlag && data.showUser && (h("tr", { class: "highlight" },
        styles.showRank && (h("td", { class: "Rank" }, ((_d = data.userRank) === null || _d === void 0 ? void 0 : _d.rank) || "-")),
        h("td", { class: "User" }, `${((_e = data.userRank) === null || _e === void 0 ? void 0 : _e.firstName) || "-"} ${((_f = data.userRank) === null || _f === void 0 ? void 0 : _f.lastInitial) || "-"} `),
        h("td", { class: "Score" }, ((_g = data.userRank) === null || _g === void 0 ? void 0 : _g.value) || "0"))))));
}

const GET_LEADERBOARD = dist.gql `
  query ($type: String!, $filter: UserLeaderboardFilterInput) {
    userLeaderboard(type: $type, filter: $filter) {
      dateModified
      rows {
        value
        firstName
        lastInitial
        rank {
          rank
          denseRank
          rowNumber
        }
      }
    }
  }
`;
const GET_RANK = dist.gql `
  query ($type: String!, $filter: UserLeaderboardFilterInput) {
    viewer {
      ... on User {
        firstName
        lastInitial
        leaderboardRank(type: $type, filter: $filter) {
          value
          rank
          denseRank
          rowNumber
        }
      }
    }
  }
`;
function useLeaderboard(props) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j;
  const programId = M();
  const user = ie();
  const variables = {
    type: props.leaderboardType,
    filter: { programId_eq: programId },
  };
  if (props.interval) {
    variables.filter["interval"] = props.interval;
  }
  const { data: leaderboardData, loading: loadingLeaderboard } = sn(GET_LEADERBOARD, variables, !(user === null || user === void 0 ? void 0 : user.jwt));
  const { data: rankData } = sn(GET_RANK, variables, !(user === null || user === void 0 ? void 0 : user.jwt));
  const leaderboardRows = (_a = leaderboardData === null || leaderboardData === void 0 ? void 0 : leaderboardData.userLeaderboard) === null || _a === void 0 ? void 0 : _a.rows;
  const flattenedLeaderboard = getFlattenedLeaderboard(leaderboardRows);
  const sortedLeaderboard = flattenedLeaderboard === null || flattenedLeaderboard === void 0 ? void 0 : flattenedLeaderboard.sort(function (a, b) {
    return a.rank - b.rank;
  });
  function getFlattenedLeaderboard(leaderboardRows) {
    return leaderboardRows === null || leaderboardRows === void 0 ? void 0 : leaderboardRows.flatMap((user) => {
      var _a, _b;
      return ({
        value: user.value,
        firstName: user.firstName || props.anonymousUser,
        lastInitial: user.lastInitial,
        rank: (_a = user.rank) === null || _a === void 0 ? void 0 : _a[props.rankType],
        rowNumber: (_b = user.rank) === null || _b === void 0 ? void 0 : _b.rowNumber,
      });
    });
  }
  console.log(rankData);
  const viewingUser = {
    value: (_c = (_b = rankData === null || rankData === void 0 ? void 0 : rankData.viewer) === null || _b === void 0 ? void 0 : _b.leaderboardRank) === null || _c === void 0 ? void 0 : _c.value,
    firstName: (_d = rankData === null || rankData === void 0 ? void 0 : rankData.viewer) === null || _d === void 0 ? void 0 : _d.firstName,
    lastInitial: (_e = rankData === null || rankData === void 0 ? void 0 : rankData.viewer) === null || _e === void 0 ? void 0 : _e.lastInitial,
    rank: (_g = (_f = rankData === null || rankData === void 0 ? void 0 : rankData.viewer) === null || _f === void 0 ? void 0 : _f.leaderboardRank) === null || _g === void 0 ? void 0 : _g[props.rankType],
    rowNumber: (_j = (_h = rankData === null || rankData === void 0 ? void 0 : rankData.viewer) === null || _h === void 0 ? void 0 : _h.leaderboardRank) === null || _j === void 0 ? void 0 : _j.rowNumber,
  };
  return {
    states: {
      loading: loadingLeaderboard,
      hasLeaders: (sortedLeaderboard === null || sortedLeaderboard === void 0 ? void 0 : sortedLeaderboard.length) > 0,
      styles: props,
    },
    data: {
      leaderboard: sortedLeaderboard,
      rankType: props.rankType,
      userRank: viewingUser,
      showUser: props.showUser,
    },
    elements: {
      empty: props.empty,
      loadingstate: props.loadingstate,
    },
  };
}

export { LeaderboardView as L, ShadowViewAddon as S, useLeaderboard as u, withShadowView as w };
