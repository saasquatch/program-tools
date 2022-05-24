import { h, r as registerInstance } from './index-832bd454.js';
import { d as dist, i as ie, M, A as An, a as sn, h as mn, j as jn } from './index.module-b74a7f69.js';
import { u as useReducer, i as useEffect, n as h$1 } from './stencil-hooks.module-f4b05383.js';
import { c as cjs } from './cjs-e829b75b.js';
import { G as GenericTableView } from './GenericTableView-be56be51.js';
import { a as useRerenderListener } from './re-render-22c375e6.js';
import { u as useChildElements } from './useChildElements-7ccc20a7.js';
import './extends-c31f1eff.js';
import './mixins-d2de6ff8.js';
import './JSS-f59933eb.js';

const CSS_NAMESPACE = "sqm-referral-table";
const GET_REFERRER_DATA = dist.gql `
  query getReferrals(
    $programId: ID
    $rewardFilter: RewardFilterInput
    $locale: RSLocale
  ) {
    viewer {
      ... on User {
        referredByReferral(programId: $programId) {
          dateReferralStarted
          dateConverted
          referrerUser {
            firstName
            lastName
          }
          rewards(filter: $rewardFilter) {
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
            statuses
            globalRewardKey
            programRewardKey
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
const GET_REFERRAL_DATA = dist.gql `
  query getReferrals(
    $limit: Int!
    $offset: Int!
    $referralFilter: ReferralFilterInput
    $rewardFilter: RewardFilterInput
    $locale: RSLocale
  ) {
    viewer {
      ... on User {
        id
        paidReferrals: referrals(
          filter: { dateReferralPaid_timeframe: "this_10_years" }
          limit: 1
        ) {
          totalCount
        }
        referrals(limit: $limit, offset: $offset, filter: $referralFilter) {
          totalCount
          count
          data {
            id
            referredUser {
              id
              accountId
              firstName
              lastName
              email
              programGoals {
                goalId
                programId
                count
                firstDate
                lastDate
                conversionCount
              }
            }
            shareLinkUsed
            referralCodeUsed
            moderationStatus
            dateConverted
            dateFraudChecksCompleted
            dateModerated
            dateModified
            dateReferralEnded
            dateReferralPaid
            dateReferralStarted
            dateUserModified
            programId
            program {
              id
              name
            }
            rewards(filter: $rewardFilter) {
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
              statuses
              globalRewardKey
              programRewardKey
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
            childNodes(limit: 10, offset: 0) {
              data {
                data {
                  id
                  ... on FlatReward {
                    id
                    statuses
                    type
                    value
                  }
                  ... on ProgramEmailTransaction {
                    id
                    rewardId
                    dateCreated
                    dateSent
                    dateQueued
                  }
                }
                depth
              }
            }
          }
        }
      }
    }
  }
`;
function useReferralTable(props, emptyElement, loadingElement) {
  var _a, _b, _c;
  const user = ie();
  const programIdContext = M();
  // Default to context, overriden by props
  const programId = (_a = props.programId) !== null && _a !== void 0 ? _a : programIdContext;
  // If no program ID, shows all programs
  const referralFilter = programId
    ? programId === "classic"
      ? { programId_exists: false }
      : { programId_eq: programId }
    : {};
  const rewardFilter = {
    userId_eq: user === null || user === void 0 ? void 0 : user.id,
    accountId_eq: user === null || user === void 0 ? void 0 : user.accountId,
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
  const locale = An();
  const { data: referrerResponse, loading: referrerLoading, refetch, } = sn(GET_REFERRER_DATA, {
    programId: programId === "classic" ? null : programId,
    rewardFilter,
    locale,
  }, !props.showReferrer || !(user === null || user === void 0 ? void 0 : user.jwt));
  const referrerData = (_b = referrerResponse === null || referrerResponse === void 0 ? void 0 : referrerResponse.viewer) === null || _b === void 0 ? void 0 : _b.referredByReferral;
  const showReferrerRow = props.showReferrer && !!(referrerData === null || referrerData === void 0 ? void 0 : referrerData.dateReferralStarted);
  const { envelope: referralData, states, callbacks, } = mn(GET_REFERRAL_DATA, (data) => { var _a; return (_a = data === null || data === void 0 ? void 0 : data.viewer) === null || _a === void 0 ? void 0 : _a.referrals; }, {
    limit: props.perPage,
    offset: 0,
  }, {
    referralFilter,
    rewardFilter,
    locale,
  }, (props.showReferrer && referrerLoading && !referrerResponse) || !(user === null || user === void 0 ? void 0 : user.jwt));
  useEffect(() => {
    if (states.currentPage === 0 && showReferrerRow)
      callbacks.setLimit(props.perPage - 1);
  }, [showReferrerRow]);
  useEffect(() => {
    if (props.showReferrer && showReferrerRow) {
      callbacks.setLimit(props.perPage - 1);
      callbacks.setCurrentPage(0);
    }
    else {
      callbacks.setLimit(props.perPage);
      callbacks.setCurrentPage(0);
    }
  }, [props.showReferrer]);
  const tick = useRerenderListener();
  const data = referralData === null || referralData === void 0 ? void 0 : referralData.data;
  const components = useChildElements();
  async function getComponentData(components) {
    // filter out loading and empty states from columns array
    const columnComponents = components.filter((component) => component.slot !== "loading" && component.slot !== "empty");
    // get the column titles (renderLabel is asynchronous)
    const columnsPromise = columnComponents === null || columnComponents === void 0 ? void 0 : columnComponents.map(async (c) => tryMethod(c, () => c.renderLabel()));
    // show the referrer row before any other rows (renderReferrerCell is asynchronous)
    let referrerRow;
    if (showReferrerRow && states.currentPage === 0) {
      const referrerPromise = columnComponents === null || columnComponents === void 0 ? void 0 : columnComponents.map(async (c) => tryMethod(c, function renderReferrerCell() {
        return c.renderReferrerCell(referrerData, c);
      }));
      referrerRow = await Promise.all(referrerPromise);
    }
    // get the column cells (renderCell is asynchronous)
    const cellsPromise = data === null || data === void 0 ? void 0 : data.map(async (r) => {
      const cellPromise = columnComponents === null || columnComponents === void 0 ? void 0 : columnComponents.map(async (c) => tryMethod(c, () => c.renderCell(r, locale)));
      const cells = await Promise.all(cellPromise);
      return cells;
    });
    const rows = cellsPromise &&
      [referrerRow, ...(await Promise.all(cellsPromise))].filter((value) => value);
    setContent({ rows });
    const columns = columnsPromise && (await Promise.all(columnsPromise));
    // Set the content to render and finish loading components
    setContent({ columns, loading: false, page: states.currentPage });
  }
  useEffect(() => {
    setContent({ loading: true });
    referralData && getComponentData(components);
  }, [referralData, components, tick]);
  const isEmpty = !((_c = content === null || content === void 0 ? void 0 : content.rows) === null || _c === void 0 ? void 0 : _c.length) && !(data === null || data === void 0 ? void 0 : data.length);
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
      //   referralData: data,
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
        if (states.currentPage === 0 && showReferrerRow)
          callbacks.setLimit(props.perPage);
        callbacks.setCurrentPage(states.currentPage + 1);
      },
      prevPage: () => {
        if (states.currentPage === 1 && showReferrerRow)
          callbacks.setLimit(props.perPage - 1);
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
    if (callback.name === "renderReferrerCell") {
      console.error("column does not have a renderReferrerCell method.");
    }
    else {
      console.error("label promise failed", e);
    }
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

let ReferralTable = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** @uiName Number of referrals per page */
    this.perPage = 3;
    /** @uiName Show column labels */
    this.showLabels = true;
    /** @uiName Previous button text  */
    this.prevLabel = "Prev";
    /** @uiName View More button text  */
    this.moreLabel = "Next";
    /** @uiName Show Referred by user in table  */
    this.showReferrer = false;
    /** @uiName Hide Columns (Mobile View)  */
    this.hiddenColumns = "0";
    /** @uiName Hide Columns (Mobile View)  */
    this.smBreakpoint = 634;
    /** @uiName Hide Columns (Mobile View)  */
    this.mdBreakpoint = 899;
    /** @uiName Empty State Image Link  */
    this.emptyStateImgUrl = "https://res.cloudinary.com/saasquatch/image/upload/v1642618031/squatch-assets/image_3_1.png";
    /** @uiName Empty State Title  */
    this.emptyStateTitle = "View your referral details";
    /** @uiName Empty State Text  */
    this.emptyStateText = "Track the status of your referrals and rewards earned by referring friends";
    h$1(this);
  }
  disconnectedCallback() { }
  render() {
    const empty = (h(EmptySlot, { emptyStateImgUrl: this.emptyStateImgUrl, emptyStateTitle: this.emptyStateTitle, emptyStateText: this.emptyStateText }));
    const loading = h(LoadingSlot, null);
    const { states, data, callbacks, elements } = jn()
      ? useReferraltableDemo(this)
      : useReferralTable(this, empty, loading);
    return (h(GenericTableView, { states: states, data: data, callbacks: callbacks, elements: elements }));
  }
};
function LoadingSlot() {
  return (h("slot", { name: "loading" }, h(LoadingRow, null), h(LoadingRow, null), h(LoadingRow, null), h(LoadingRow, null)));
}
function LoadingRow() {
  return (h("sqm-table-row", null, h("sqm-table-cell", { colspan: 5 }, h("sl-skeleton", null))));
}
function useReferraltableDemo(props) {
  return cjs({
    states: {
      hasPrev: false,
      hasNext: false,
      loading: false,
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
      emptyElement: (h(EmptySlot, { emptyStateImgUrl: "https://res.cloudinary.com/saasquatch/image/upload/v1642618031/squatch-assets/image_3_1.png", emptyStateTitle: "View your referral details", emptyStateText: "Track the status of your referrals and rewards earned by referring\r\n\t\tfriends" })),
      loadingElement: h(LoadingSlot, null),
      columns: [
        h("div", null, "User"),
        h("div", null, "Referral Status"),
        h("div", null, "Rewards"),
      ],
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

export { ReferralTable as sqm_referral_table };
