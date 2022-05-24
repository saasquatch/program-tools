import { h, r as registerInstance } from './index-832bd454.js';
import { d as dist, i as ie, M, A as An, h as mn, j as jn } from './index.module-b74a7f69.js';
import { u as useReducer, i as useEffect, n as h$1 } from './stencil-hooks.module-f4b05383.js';
import { c as cjs } from './cjs-e829b75b.js';
import { G as GenericTableView } from './GenericTableView-be56be51.js';
import { a as useRerenderListener } from './re-render-22c375e6.js';
import { u as useChildElements } from './useChildElements-7ccc20a7.js';
import './extends-c31f1eff.js';
import './mixins-d2de6ff8.js';
import './JSS-f59933eb.js';

const CSS_NAMESPACE = "sqm-rewards-table";
const GET_REWARDS = dist.gql `
  query getRewards(
    $limit: Int!
    $offset: Int!
    $rewardFilter: RewardFilterInput
    $locale: RSLocale
  ) {
    viewer {
      ... on User {
        id
        rewards(limit: $limit, offset: $offset, filter: $rewardFilter) {
          totalCount
          count
          data {
            id
            type
            value
            unit
            name
            dateGiven
            dateExpires
            dateCancelled
            dateRedeemed
            dateScheduledFor
            fuelTankCode
            fuelTankType
            currency
            prettyValue(locale: $locale)
            prettyValueNumber: prettyValue(
              formatType: NUMBER_FORMATTED
              locale: $locale
            )
            prettyAvailableNumber: prettyAvailableValue(
              formatType: NUMBER_FORMATTED
              locale: $locale
            )
            prettyRedeemedNumber: prettyRedeemedCredit(
              formatType: NUMBER_FORMATTED
              locale: $locale
            )
            programId
            statuses
            globalRewardKey
            programRewardKey
            rewardSource
            prettyRedeemedCredit(locale: $locale)
            prettyAssignedCredit(locale: $locale)
            prettyAvailableValue(locale: $locale)
            exchangedRewardRedemptionTransaction {
              id
              creditRedeemed
              prettyRedeemedCredit(locale: $locale)
              unit
              dateRedeemed
            }
            referral {
              id
              referrerUser {
                id
                firstName
                lastName
              }
              referredUser {
                id
                firstName
                lastName
              }
            }
            rewardRedemptionTransactions {
              data {
                exchangedRewards {
                  data {
                    prettyValue(locale: $locale)
                    type
                    fuelTankCode
                    globalRewardKey
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
function useRewardsTable(props, emptyElement, loadingElement) {
  var _a, _b;
  const user = ie();
  const programIdContext = M();
  const locale = An();
  // Default to context, overriden by props
  const programId = (_a = props.programId) !== null && _a !== void 0 ? _a : programIdContext;
  const rewardFilter = {
    userId_eq: user === null || user === void 0 ? void 0 : user.id,
    accountId_eq: user === null || user === void 0 ? void 0 : user.accountId,
    // If no program ID, shows all programs
    ...(programId
      ? programId === "classic"
        ? { programId_exists: false }
        : { programId_eq: programId }
      : {}),
  };
  const [content, setContent] = useReducer((state, next) => ({
    ...state,
    ...next,
  }), {
    columns: [],
    rows: [],
    loading: false,
    page: 0,
  });
  const { envelope: rewardsData, states, callbacks, } = mn(GET_REWARDS, (data) => { var _a; return (_a = data === null || data === void 0 ? void 0 : data.viewer) === null || _a === void 0 ? void 0 : _a.rewards; }, {
    limit: props.perPage,
    offset: 0,
  }, {
    rewardFilter,
    locale,
  }, !(user === null || user === void 0 ? void 0 : user.jwt));
  const tick = useRerenderListener();
  const components = useChildElements();
  const data = rewardsData === null || rewardsData === void 0 ? void 0 : rewardsData.data;
  async function getComponentData(components) {
    // filter out loading and empty states from columns array
    const columnComponents = components.filter((component) => component.slot !== "loading" && component.slot !== "empty");
    // get the column titles (renderLabel is asynchronous)
    const columnsPromise = columnComponents === null || columnComponents === void 0 ? void 0 : columnComponents.map(async (c) => tryMethod(c, () => c.renderLabel()));
    // get the column cells (renderCell is asynchronous)
    const cellsPromise = data === null || data === void 0 ? void 0 : data.map(async (r) => {
      const cellPromise = columnComponents === null || columnComponents === void 0 ? void 0 : columnComponents.map(async (c) => tryMethod(c, () => c.renderCell([r], locale)));
      const cells = await Promise.all(cellPromise);
      return cells;
    });
    const rows = cellsPromise && (await Promise.all(cellsPromise)).filter((i) => i);
    setContent({ rows });
    const columns = columnsPromise && (await Promise.all(columnsPromise));
    // Set the content to render and finish loading components
    setContent({ columns, loading: false, page: states.currentPage });
  }
  useEffect(() => {
    setContent({ loading: true });
    rewardsData && getComponentData(components);
  }, [rewardsData, components, tick]);
  const isEmpty = !((_b = content === null || content === void 0 ? void 0 : content.rows) === null || _b === void 0 ? void 0 : _b.length) && !(data === null || data === void 0 ? void 0 : data.length);
  const show = 
  // 1 - Loading if loading
  states.loading || content.loading
    ? "loading"
    : // 2 - Empty if empty
      isEmpty
        ? "empty"
        : // 3 - Then show rows
          "rows";
  return {
    states: {
      hasNext: states.currentPage < states.pageCount - 1,
      hasPrev: states.currentPage > 0,
      show,
      namespace: CSS_NAMESPACE,
    },
    data: {
      textOverrides: {
        showLabels: props.showLabels,
        prevLabel: props.prevLabel,
        moreLabel: props.moreLabel,
      },
      hiddenColumns: props.hiddenColumns,
      smBreakpoint: props.smBreakpoint,
      mdBreakpoint: props.mdBreakpoint,
    },
    elements: {
      columns: content.columns,
      rows: content.rows,
      emptyElement,
      loadingElement,
    },
    callbacks: {
      nextPage: () => {
        callbacks.setCurrentPage(states.currentPage + 1);
      },
      prevPage: () => {
        callbacks.setCurrentPage(states.currentPage - 1);
      },
    },
  };
}
function generateUserError(e) {
  try {
    return JSON.stringify(e);
  }
  catch (e) {
    return "An unknown error";
  }
}
async function tryMethod(c, callback) {
  const tag = c.tagName.toLowerCase();
  await customElements.whenDefined(tag);
  let labelPromise;
  try {
    labelPromise = callback();
  }
  catch (e) {
    // renderLabel did not return a promise, so this method probably doesn't exist
    // therefore, we IGNORE the label
    console.error("label promise failed", e);
    return h("span", null);
  }
  try {
    return await labelPromise;
  }
  catch (e) {
    // The column returned a promise, and that promise failed.
    // This should not happen so we fail fast
    console.error("Error rendering label", e);
    const userError = generateUserError(e);
    return (h("details", null,
      h("summary", null, "Error"),
      userError));
  }
}

let RewardsTable = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** @uiName Number of rewards per page */
    this.perPage = 3;
    /** @uiName Show column labels */
    this.showLabels = true;
    /** @uiName Previous button text  */
    this.prevLabel = "Prev";
    /** @uiName View More button text  */
    this.moreLabel = "Next";
    /** @uiName Hide Columns (Mobile View)  */
    this.hiddenColumns = "0";
    /** @uiName Hide Columns (Mobile View)  */
    this.smBreakpoint = 599;
    /** @uiName Hide Columns (Mobile View)  */
    this.mdBreakpoint = 899;
    /** @uiName Empty State Image Link  */
    this.emptyStateImgUrl = "https://res.cloudinary.com/saasquatch/image/upload/v1642618031/squatch-assets/image_4_1.png";
    /** @uiName Empty State Title  */
    this.emptyStateTitle = "View your rewards";
    /** @uiName Empty State Text  */
    this.emptyStateText = "See all the rewards you have earned from referring friends and completing tasks";
    h$1(this);
  }
  disconnectedCallback() { }
  render() {
    const empty = (h(EmptySlot, { emptyStateImgUrl: this.emptyStateImgUrl, emptyStateTitle: this.emptyStateTitle, emptyStateText: this.emptyStateText }));
    const loading = h(LoadingSlot, null);
    const { states, data, callbacks, elements } = jn()
      ? useRewardsTableDemo(this)
      : useRewardsTable(this, empty, loading);
    return (h(GenericTableView, { states: states, data: data, callbacks: callbacks, elements: elements }));
  }
};
function LoadingSlot() {
  return (h("slot", { name: "loading" }, h(LoadingRow, null), h(LoadingRow, null), h(LoadingRow, null), h(LoadingRow, null)));
}
function LoadingRow() {
  return (h("sqm-table-row", null, h("sqm-table-cell", { colspan: 5 }, h("sl-skeleton", null))));
}
function useRewardsTableDemo(props) {
  return cjs({
    states: {
      hasPrev: false,
      hasNext: false,
      loading: false,
      namespace: CSS_NAMESPACE,
    },
    callbacks: {
      prevPage: () => console.log("Prev"),
      nextPage: () => console.log("Next"),
    },
    data: {
      textOverrides: {
        showLabels: props.showLabels,
        prevLabel: props.prevLabel,
        moreLabel: props.moreLabel,
      },
      referralData: [],
    },
    elements: {
      emptyElement: (h(EmptySlot, { emptyStateImgUrl: "https://res.cloudinary.com/saasquatch/image/upload/v1642618031/squatch-assets/image_4_1.png", emptyStateTitle: "View your rewards", emptyStateText: "See all the rewards you have earned from referring friends and completing tasks" })),
      loadingElement: h(LoadingSlot, null),
      // TODO: This should be smarter
      columns: [h("div", null, "Name"), h("div", null, "Email"), h("div", null, "DOB")],
      rows: [],
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}
function EmptySlot({ emptyStateImgUrl, emptyStateTitle, emptyStateText, }) {
  return (h("div", { slot: "empty", style: { display: "contents" } }, h("sqm-table-row", null, h("sqm-table-cell", { colspan: 5, style: { textAlign: "center" } }, h("div", { style: { padding: "var(--sl-spacing-xxx-large)" } }, h("img", { src: emptyStateImgUrl, style: { width: "100px" } }), h("div", null, h("b", null, emptyStateTitle)), h("div", { style: {
      marginTop: "var(--sl-spacing-xx-small)",
      fontSize: "var(--sl-font-size-small)",
      color: "var(--sl-color-neutral-500)",
    } }, emptyStateText))))));
}

export { RewardsTable as sqm_rewards_table };
