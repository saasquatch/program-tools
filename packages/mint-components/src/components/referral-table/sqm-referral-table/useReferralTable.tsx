// import { useQuery } from "@saasquatch/component-boilerplate";
import { useHost, useTick } from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { Host, h } from "@stencil/core";
// import gql from "graphql-tag";
import { useChildElements } from "../useChildElements";

// const GET_REFERRAL_DATA = gql`
//   query getReferrals(
//     $accountId: String!
//     $id: String!
//     $limit: Int!
//     $offset: Int!
//     $filter: ReferralFilterInput
//     $programId: ID
//   ) {
//     user(id: $id, accountId: $accountId) {
//       id
//       paidReferrals: referrals(
//         filter: { dateReferralPaid_timeframe: "this_10_years" }
//         limit: 1
//       ) {
//         totalCount
//       }
//       referrals(limit: $limit, offset: $offset, filter: $filter) {
//         totalCount
//         count
//         data {
//           id
//           referredUser {
//             id
//             accountId
//             firstName
//             lastName
//             email
//             programGoals {
//               goalId
//               programId
//               count
//               firstDate
//               lastDate
//               conversionCount
//             }
//           }
//           shareLinkUsed
//           referralCodeUsed
//           moderationStatus
//           dateConverted
//           dateFraudChecksCompleted
//           dateModerated
//           dateModified
//           dateReferralEnded
//           dateReferralPaid
//           dateReferralStarted
//           dateUserModified
//           programId
//           program {
//             id
//             name
//           }
//           rewards {
//             id
//             type
//             value
//             unit
//             name
//             dateGiven
//             dateExpires
//             dateCancelled
//             dateRedeemed
//             dateScheduledFor
//             fuelTankCode
//             fuelTankType
//             currency
//             prettyValue
//             statuses
//             globalRewardKey
//             programRewardKey
//             rewardRedemptionTransactions {
//               data {
//                 exchangedRewards {
//                   data {
//                     prettyValue
//                     type
//                     fuelTankCode
//                     globalRewardKey
//                   }
//                 }
//               }
//             }
//           }
//           childNodes(limit: 10, offset: 0) {
//             data {
//               data {
//                 id
//                 ... on FlatReward {
//                   id
//                   statuses
//                   type
//                   value
//                 }
//                 ... on ProgramEmailTransaction {
//                   id
//                   rewardId
//                   dateCreated
//                   dateSent
//                   dateQueued
//                 }
//               }
//               depth
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// interface ReferralTableProps {
//   renderCell(data: Referral): SafeHTML | VNode;
//   renderInCell(el: HTMLElement, data: Referral): SafeHTML | VNode;
//   renderLabel(): string;
// }

// interface SafeHTML {
//   safeHTML: string;
// }

export function useReferralTable() {
  // const { data } = useQuery(GET_REFERRAL_DATA, {});
  const host = useHost();
  const [tick, rerender] = useTick();
  const [content, setContent] = useState(<Host style={{ display: "none" }} />);

  // TODO: needs to include reward data too
  const data = {
    rows: [
      {
        status: "Converted",
        firstName: "Joe",
        lastName: "Schmoe",
        prettyValue: "$20",
        dateConverted: 1626214500,
      },
      {
        status: "In Progress",
        firstName: "Sponge",
        lastName: "Bob",
        prettyValue: "$50",
        dateStarted: 1626214500,
      },
    ],
  };

  const components = useChildElements();

  console.log({ components });

  useEffect(() => {
    host.addEventListener("attributeUpdated", () => rerender());
    return () => {
      host.removeEventListener("attributeUpdated", rerender);
    };
  }, []);

  //TODO: sort out this mess of Promise.all's (but it works)
  async function getComponentData() {
    // get the column titles (renderLabel is asynchronous)
    const columnsPromise = components?.map((c: any) => {
      console.log({ column: c });
      return c.renderLabel();
    });
    const columns = await Promise.all(columnsPromise);

    // get the column cells (renderCell is asynchronous)
    const contentsPromise = data?.rows?.map(async (r) => {
      const rowsPromise = components?.map(async (c: any) => {
        const content = await c.renderCell(r);
        // remove td's, just return array
        return content;
      });
      const rows = await Promise.all(rowsPromise);

      // remove tr's, just return array
      return rows;
    });
    const rows = await Promise.all(contentsPromise);

    console.log({ columns, data, rows, contentsPromise });

    // Set the content to render
    setContent({ columns, rows });
  }

  useEffect(() => {
    getComponentData();
  }, [components, tick]);
  return content;
}
