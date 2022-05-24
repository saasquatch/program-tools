import { h, r as registerInstance } from './index-832bd454.js';
import { j as jn } from './index.module-b74a7f69.js';
import { n as h$1 } from './stencil-hooks.module-f4b05383.js';
import { c as cjs } from './cjs-e829b75b.js';
import { w as withShadowView, u as useLeaderboard, L as LeaderboardView } from './useLeaderboard-f7cb2d02.js';
import './extends-c31f1eff.js';

function LoadingSlot() {
  return (h("slot", { name: "loading" },
    h(LoadingRow, null),
    h(LoadingRow, null),
    h(LoadingRow, null),
    h(LoadingRow, null)));
}
function LoadingRow() {
  return (h("sqm-table-row", null,
    h("sqm-table-cell", { colspan: 5 },
      h("sl-skeleton", null))));
}
function LoadingSkeleton() {
  return (h("div", { style: { width: "100%" } },
    h("sl-skeleton", { style: { marginBottom: "28px" } }),
    h("sl-skeleton", { style: { marginBottom: "28px" } }),
    h("sl-skeleton", { style: { marginBottom: "28px" } }),
    h("sl-skeleton", { style: { marginBottom: "28px" } }),
    h("sl-skeleton", null)));
}
function EmptySlot({ label }) {
  return (h("slot", { name: "empty" },
    h(EmptySkeleton, { label: label })));
}
function EmptySkeleton({ label }) {
  return (h("div", { style: { width: "100%" } },
    h("sqm-text", null,
      h("h3", { style: { color: "#777777" } }, label))));
}

const sqmLeaderboardCss = ":host{display:block}:host([hidden]){display:none}.header-title{font-size:var(--sl-font-size-large);font-weight:var(--sl-font-weight-semibold)}.header-description{font-size:var(--sl-font-size-medium);font-weight:var(--sl-font-weight-normal);margin-bottom:var(--sl-spacing-large)}.cover-image{width:100%;margin-bottom:var(--sl-spacing-large)}table{width:100%;border-collapse:collapse}th{font-size:var(--sl-font-size-small);font-weight:var(--sl-font-weight-semibold);text-align:left}tr:not(:first-child){border-top:1px solid var(--sl-color-neutral-200)}td{font-size:var(--sl-font-size-medium);font-weight:var(--sl-font-weight-normal)}.ellipses{text-align:center;padding:0;color:var(--sl-color-neutral-500)}.highlight{background:var(--sl-color-primary-50)}td,th{color:var(--sl-color-gray-800);padding:var(--sl-spacing-medium)}th{padding:var(--sl-spacing-medium);padding-top:0}.User{width:100%}.Score{width:auto;white-space:nowrap}";

let Leaderboard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiName Show viewing user's rank
     */
    this.showUser = true;
    /**
     * @uiName Empty State Text
     */
    this.emptyStateText = "No Users Yet";
    /**
     * @uiName Title displayed for users without names
     */
    this.anonymousUser = "Anonymous";
    this.ignored = true;
    h$1(this);
    withShadowView(this);
  }
  disconnectedCallback() { }
  render() {
    const loading = h(LoadingSkeleton, null);
    const empty = h(EmptySkeleton, { label: this.emptyStateText });
    const props = {
      empty: empty,
      loadingstate: loading,
      usersheading: this.usersheading,
      statsheading: this.statsheading,
      rankType: this.rankType,
      leaderboardType: this.leaderboardType,
      anonymousUser: this.anonymousUser,
      emptyStateText: this.emptyStateText,
      interval: this.interval,
      showUser: this.showUser,
      showRank: this.showRank,
    };
    const demoProps = { ...props, demoData: this.demoData };
    const viewprops = jn()
      ? useLeaderboardDemo(demoProps)
      : useLeaderboard(props);
    return h(LeaderboardView, Object.assign({}, viewprops));
  }
};
function useLeaderboardDemo(props) {
  return cjs({
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        usersheading: props.usersheading
          ? props.usersheading
          : "TOP REFERRERS",
        statsheading: props.statsheading ? props.statsheading : "NEW TITANS",
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
      empty: props.empty ? (props.empty) : (h(EmptySkeleton, { label: "No Users Yet" })),
      loadingstate: props.loadingstate ? (props.loadingstate) : (h(LoadingSkeleton, null)),
    },
  }, props.demoProps || {}, { arrayMerge: (_, a) => a });
}
Leaderboard.style = sqmLeaderboardCss;

export { Leaderboard as sqm_leaderboard };
