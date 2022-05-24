import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { d as dist, M, i as ie, a as sn, j as jn } from './index.module-b74a7f69.js';
import { L as LeaderboardRankView } from './sqm-leaderboard-rank-view-187f6857.js';
import { i as intl } from './global-b1f18590.js';
import { c as cjs } from './cjs-e829b75b.js';
import './extends-c31f1eff.js';
import './insertcss-d82cf6d6.js';

const GET_RANK = dist.gql `
  query ($type: String!, $filter: UserLeaderboardFilterInput) {
    viewer {
      ... on User {
        leaderboardRank(type: $type, filter: $filter) {
          rowNumber
          rank
          denseRank
        }
      }
    }
  }
`;
function useLeaderboardRank(props) {
  var _a, _b, _c;
  const programId = M();
  const user = ie();
  const rankVariables = {
    type: props.leaderboardType,
    filter: { programId_eq: programId },
  };
  if (props.interval) {
    rankVariables.filter["interval"] = props.interval;
  }
  const { data: rankData } = sn(GET_RANK, rankVariables, !(user === null || user === void 0 ? void 0 : user.jwt));
  const fullRankText = ((_a = rankData === null || rankData === void 0 ? void 0 : rankData.viewer) === null || _a === void 0 ? void 0 : _a.leaderboardRank)
    ? intl.formatMessage({ id: "rankText", defaultMessage: props.rankText }, {
      rank: (_c = (_b = rankData === null || rankData === void 0 ? void 0 : rankData.viewer) === null || _b === void 0 ? void 0 : _b.leaderboardRank) === null || _c === void 0 ? void 0 : _c[props.rankType],
    })
    : props.unrankedText || "unranked";
  return {
    data: {
      rank: fullRankText,
    },
  };
}

const sqmLeaderboardRankCss = "p,.P{font-size:var(--sl-font-size-small);color:var(--sl-color-gray-800);margin-top:0px}p.Subtitle,.P.Subtitle{color:var(--sl-color-gray-500);margin:0px}";

let LeaderboardRank = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiName Rank Text
     */
    this.rankText = "You are currently in {rank, selectordinal, one {#st} two {#nd} few {#rd} other {#th} } place!";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const props = jn()
      ? useLeaderboardRankDemo(this)
      : useLeaderboardRank(this);
    return h$1(LeaderboardRankView, Object.assign({}, props));
  }
};
function useLeaderboardRankDemo(props) {
  const rank = intl.formatMessage({ id: "rankText", defaultMessage: props.rankText }, {
    rank: 1,
  }) || "1st";
  return cjs({
    data: {
      rank,
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}
LeaderboardRank.style = sqmLeaderboardRankCss;

export { LeaderboardRank as sqm_leaderboard_rank };
