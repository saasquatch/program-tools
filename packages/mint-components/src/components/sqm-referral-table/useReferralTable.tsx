import {
  usePaginatedQuery,
  useProgramId,
} from "@saasquatch/component-boilerplate";
import { useEffect, useReducer } from "@saasquatch/universal-hooks";
import { h, VNode } from "@stencil/core";
import gql from "graphql-tag";
import { useRerenderListener } from "./re-render";
import { ReferralTable } from "./sqm-referral-table";
import { ReferralTableViewProps } from "./sqm-referral-table-view";
import { useChildElements } from "./useChildElements";

const GET_REFERRAL_DATA = gql`
  query getReferrals(
    $limit: Int!
    $offset: Int!
    $filter: ReferralFilterInput
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
        referrals(limit: $limit, offset: $offset, filter: $filter) {
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
            rewards {
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
              statuses
              globalRewardKey
              programRewardKey
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

export function useReferralTable(
  props: ReferralTable,
  emptyElement: VNode,
  loadingElement: VNode
): ReferralTableViewProps {
  const programIdContext = useProgramId();
  // Default to context, overriden by props
  const programId = props.programId ?? programIdContext;
  // If no program ID, shows all programs
  const filter = programId
    ? programId === "classic"
      ? { programId_exists: false }
      : { programId_eq: programId }
    : {};
  const {
    envelope: referralData,
    states,
    callbacks,
  } = usePaginatedQuery<Referral>(
    GET_REFERRAL_DATA,
    (data) => data?.viewer?.referrals,
    {
      limit: props.perPage,
      offset: 0,
    },
    { filter }
  );
  const tick = useRerenderListener();
  const [content, setContent] = useReducer<
    ReferralTableViewProps["elements"],
    Partial<ReferralTableViewProps["elements"]>
  >(
    (state, next) => ({
      ...state,
      ...next,
    }),
    {
      columns: [],
      rows: [],
      loading: false,
    }
  );

  const data = referralData?.data;

  const components = useChildElements();

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
    const cellsPromise = data?.map(async (r) => {
      const rowsPromise = columnComponents?.map(async (c: any) =>
        tryMethod(c, () => c.renderCell(r, c))
      );
      const rows = await Promise.all(rowsPromise);
      return rows;
    });

    const rows = cellsPromise && (await Promise.all(cellsPromise));

    setContent({ rows });
    const columns = columnsPromise && (await Promise.all(columnsPromise));
    // Set the content to render and finish loading components
    setContent({ columns, loading: false });
  }

  useEffect(() => {
    setContent({ loading: true });
    referralData && getComponentData(components);
  }, [referralData, components, tick]);

  return {
    states: {
      hasNext: states.currentPage < states.pageCount - 1,
      hasPrev: states.currentPage > 0,
      loading: states.loading || content.loading,
    },
    data: {
      textOverrides: {
        showLabels: props.showLabels,
        prevLabel: props.prevLabel,
        moreLabel: props.moreLabel,
      },
      referralData: data,
    },
    elements: {
      columns: content.columns,
      rows: content.rows,
      emptyElement,
      loadingElement,
    },
    callbacks: {
      nextPage: () => callbacks.setCurrentPage(states.currentPage + 1),
      prevPage: () => callbacks.setCurrentPage(states.currentPage - 1),
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
