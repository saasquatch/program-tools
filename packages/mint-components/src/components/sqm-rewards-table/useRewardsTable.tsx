import {
  usePaginatedQuery,
  useProgramId,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useReducer } from "@saasquatch/universal-hooks";
import { h, VNode } from "@stencil/core";
import gql from "graphql-tag";
import { useRerenderListener } from "../../tables/re-render";
import { RewardsTable } from "./sqm-rewards-table";
import { RewardsTableViewProps } from "./sqm-rewards-table-view";
import { useChildElements } from "../../tables/useChildElements";

export const CSS_NAMESPACE = "sqm-rewards-table";

const GET_REWARDS = gql`
  query getRewards(
    $limit: Int!
    $offset: Int!
    $rewardFilter: RewardFilterInput
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
            prettyValue
            prettyValueNumber: prettyValue(formatType: NUMBER_FORMATTED)
            prettyAvailableNumber: prettyAvailableValue(
              formatType: NUMBER_FORMATTED
            )
            prettyRedeemedNumber: prettyRedeemedCredit(
              formatType: NUMBER_FORMATTED
            )
            programId
            statuses
            globalRewardKey
            programRewardKey
            rewardSource
            prettyRedeemedCredit
            prettyAssignedCredit
            prettyAvailableValue
            exchangedRewardRedemptionTransaction {
              id
              creditRedeemed
              prettyRedeemedCredit
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
                    prettyValue
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

export function useRewardsTable(
  props: RewardsTable,
  emptyElement: VNode,
  loadingElement: VNode
): RewardsTableViewProps {
  const user = useUserIdentity();
  const programIdContext = useProgramId();
  // Default to context, overriden by props
  const programId = props.programId ?? programIdContext;

  const rewardFilter = {
    userId_eq: user?.id,
    accountId_eq: user?.accountId,
    // If no program ID, shows all programs
    ...(programId
      ? programId === "classic"
        ? { programId_exists: false }
        : { programId_eq: programId }
      : {}),
  };

  const [content, setContent] = useReducer<
  RewardsTableViewProps["elements"],
    Partial<RewardsTableViewProps["elements"]>
  >(
    (state, next) => ({
      ...state,
      ...next,
    }),
    {
      columns: [],
      rows: [],
      loading: false,
      page: 0,
    }
  );

  const {
    envelope: rewardsData,
    states,
    callbacks,
  } = usePaginatedQuery<Reward>(
    GET_REWARDS,
    (data) => data?.viewer?.rewards,
    {
      limit: props.perPage,
      offset: 0,
    },
    {
      rewardFilter,
    },
    !user?.jwt
  );

  const tick = useRerenderListener();
  const components = useChildElements();

  const data = rewardsData?.data;

  async function getComponentData(components: Element[]) {
    // filter out loading and empty states from columns array
    const columnComponents = components.filter(
      (component) => component.slot !== "loading" && component.slot !== "empty"
    );
    // get the column titles (renderLabel is asynchronous)
    const columnsPromise = columnComponents?.map(async (c: any) =>
      tryMethod(c, () => c.renderLabel())
    );

    // get the column cells (renderCell is asynchronous)
    const cellsPromise = data?.map(async (r: Reward) => {
      const cellPromise = columnComponents?.map(async (c: any) =>
        tryMethod(c, () => c.renderCell([r], c))
      );
      const cells = await Promise.all(cellPromise);
      return cells;
    });

    const rows =
      cellsPromise && (await Promise.all(cellsPromise)).filter((i) => i);

    setContent({ rows });
    const columns = columnsPromise && (await Promise.all(columnsPromise));
    // Set the content to render and finish loading components
    setContent({ columns, loading: false, page: states.currentPage });
  }

  useEffect(() => {
    setContent({ loading: true });
    rewardsData && getComponentData(components);
  }, [rewardsData, components, tick]);

  const isEmpty = !content?.rows?.length && !data?.length;

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

function generateUserError(e: any) {
  try {
    return JSON.stringify(e);
  } catch (e) {
    return "An unknown error";
  }
}

async function tryMethod(
  c: HTMLElement,
  callback: () => Promise<VNode>
): Promise<VNode> {
  const tag = c.tagName.toLowerCase();
  await customElements.whenDefined(tag);
  let labelPromise: Promise<VNode>;
  try {
    labelPromise = callback();
  } catch (e) {
    // renderLabel did not return a promise, so this method probably doesn't exist
    // therefore, we IGNORE the label
    console.error("label promise failed", e);
    return <span />;
  }
  try {
    return await labelPromise;
  } catch (e) {
    // The column returned a promise, and that promise failed.
    // This should not happen so we fail fast
    console.error("Error rendering label", e);
    const userError = generateUserError(e);
    return (
      <details>
        <summary>Error</summary>
        {userError}
      </details>
    );
  }
}
