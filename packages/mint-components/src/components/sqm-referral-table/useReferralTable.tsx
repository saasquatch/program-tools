import {
  usePaginatedQuery,
  useProgramId
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
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

export function useReferralTable(props: ReferralTable): ReferralTableViewProps {
  const programIdContext = useProgramId();
  // Default to context, overriden by props
  const programId = props.programId ?? programIdContext;
  // If no program ID, shows all programs
  const filter = programId ? { programId_eq: programId } : {};
  const {
    envelope: referralData,
    states,
    callbacks,
  } = usePaginatedQuery<Referral>(
    GET_REFERRAL_DATA,
    (data) => data?.viewer?.referrals,
    {
      limit: 5,
      offset: 0,
    },
    { filter }
  );
  const tick = useRerenderListener();
  const [content, setContent] = useState<ReferralTableViewProps["elements"]>({
    columns: [],
    rows: [],
  });

  // TODO: Let the referral cells handle this
  const data = referralData?.data;

  // TODO: Demo Hook - needs to include reward data too
  // const data2 = {
  //   rows: [
  //     {
  //       status: "Converted",
  //       firstName: "Joe",
  //       lastName: "Schmoe",
  //       prettyValue: "$20",
  //       dateConverted: 1626214500,
  //     },
  //     {
  //       status: "In Progress",
  //       firstName: "Sponge",
  //       lastName: "Bob",
  //       prettyValue: "$50",
  //       dateStarted: 1626214500,
  //     },
  //   ],
  // };

  const components = useChildElements();

  async function getComponentData() {
    // get the column titles (renderLabel is asynchronous)

    const columnsPromise = components?.map(async (c: any) =>
      tryMethod(c, () => c.renderLabel())
    );

    // get the column cells (renderCell is asynchronous)
    const cellsPromise = data?.map(async (r) => {
      const rowsPromise = components?.map(async (c: any) =>
        tryMethod(c, () => c.renderCell(r, c))
      );
      const rows = await Promise.all(rowsPromise);
      return rows;
    });

    const columns = await Promise.all(columnsPromise);
    const rows = await Promise.all(cellsPromise);

    // Set the content to render
    setContent({ columns, rows });
  }

  useEffect(() => {
    if (!referralData) return;
    getComponentData();
  }, [referralData, components, tick]);

  // TODO: Loading state - while initial rendering rows?
  // TODO: Empty state
  return {
    states: {
      hasNext: states.currentPage < states.pageCount - 1,
      hasPrev: states.currentPage > 0,
      loading: states.loading,
    },
    elements: {
      columns: content.columns,
      rows: content.rows,
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
