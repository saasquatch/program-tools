import { useQuery } from "@saasquatch/component-boilerplate";
import { useHost, useTick } from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { Host, h, VNode } from "@stencil/core";
import gql from "graphql-tag";
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

// interface ReferralTableProps {
//   renderCell(data: Referral): SafeHTML | VNode;
//   renderInCell(el: HTMLElement, data: Referral): SafeHTML | VNode;
//   renderLabel(): string;
// }

// interface SafeHTML {
//   safeHTML: string;
// }

export function useReferralTable(props: ReferralTable): ReferralTableViewProps {
  const { data: referralData } = useQuery(GET_REFERRAL_DATA, {
    filter: { programId_eq: props.programId },
    limit: 10,
    offset: 0,
  });
  const host = useHost();
  const [tick, rerender] = useTick();
  const [content, setContent] = useState<ReferralTableViewProps>(
    <Host style={{ display: "none" }} />
  );

  console.log({ referralData });

  const data = referralData?.viewer?.referrals?.data?.map((referral) => ({
    // todo: real status grabbing function
    status: !!referral.dateConverted ? "Converted" : "In Progress",
    firstName: referral.referredUser?.firstName,
    lastName: referral.referredUser?.lastName,
    prettyValue: referral.rewards?.[0]?.prettyValue,
    dateConverted: referral.dateConverted,
    dateStarted: referral.dateReferralStarted,
  }));

  // TODO: needs to include reward data too
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

  console.log({ components });

  useEffect(() => {
    host.addEventListener("attributeUpdated", rerender);
    return () => {
      host.removeEventListener("attributeUpdated", rerender);
    };
  }, []);

  //TODO: sort out this mess of Promise.all's (but it works)
  async function getComponentData() {
    // get the column titles (renderLabel is asynchronous)

    const columnsPromise = components?.map(async (c: any) => {
      return tryMethod(c, () => c.renderLabel());
    });

    console.log({ columnsPromise });

    // get the column cells (renderCell is asynchronous)
    const cellsPromise = data?.map(async (r) => {
      const rowsPromise = components?.map(async (c: any) => {
        const tag = c.tagName.toLowerCase();
        console.log({
          column: c,
          tag,
        });
        await customElements.whenDefined(tag);

        const cell = await c.renderCell(r, c);
        // remove td's, just return array
        return cell;
      });
      const rows = await Promise.all(rowsPromise);

      // remove tr's, just return array
      return rows;
    });

    const columns = await Promise.all(columnsPromise);
    const rows = await Promise.all(cellsPromise);

    console.log({ columns, data, rows, cellsPromise });

    // Set the content to render
    setContent({ columns, rows });
  }

  useEffect(() => {
    if (!referralData) return;
    getComponentData();
  }, [referralData, components, tick]);
  return content;
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
