import { ReferralListViewProps } from './referral-list-view';
import gql from 'graphql-tag';
import { usePaginatedQuery } from '../../hooks/usePaginatedQuery';

const getReferrals = gql`
  query($accountId: String!, $id: String!, $limit: Int!, $offset: Int!, $filter: ReferralFilterInput) {
    user(id: $id, accountId: $accountId) {
      id
      paidReferrals: referrals(filter: { dateReferralPaid_timeframe: "this_10_years" }, limit: 1) {
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
          referrerModerationStatus
          referredModerationStatus
          referrerModerationStatus
          fraudSignals
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
            fuelTankCode
            fuelTankType
            currency
            prettyValue
            statuses
            globalRewardKey
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
`;

type ReferralListProps = {
  unknownuser: string;
  pickrewardtext: string;
  showStatus: boolean;
  downloadedtext: string;
  downloadedunqualifiedtext: string;
  purchasedeligibletext: string;
  purchasednoteligibletext: string;
  newreferraltext: string;
  rewardpendingtext: string;
  rewardsavailabletext: string;
  rewardredeemedtext: string;
  paginateless: string;
  paginatemore: string;
  noreferralsyet: string;
  titleText: string;
};

export function useReferralList(props: ReferralListProps): ReferralListViewProps {
  //@ts-ignore
  const { userId: id, accountId } = window.widgetIdent;

  const { envelope, states, callbacks } = usePaginatedQuery(
    getReferrals,
    data => data?.user?.referrals,
    { limit: 3, offset: 0 },
    {
      accountId,
      id,
    },
  );
  const referrals = envelope?.data;
  const referralsCount = envelope?.totalCount;
  const { loading, currentPage } = states;
  const { setCurrentPage } = callbacks;

  return {
    states: {
      loading,
      page: currentPage,
      pageCount: states.pageCount,
      styles: { ...props },
    },
    data: {
      //@ts-ignore
      referrals, // TODO THIS IS BROKEN
      referralsCount,
      referraltype: 'converted', //TODO idk what this is
      rewardTranslations: {}, //TODO or this
    },
    callbacks: {
      paginate: setCurrentPage,
    },
    // return {
    //   states: {
    //     loading: false,
    //     offset: 0,
    //     styles: {
    //       ...props,
    //     },
    //   },
    //   data: {
    //     referrals: [],
    //     referraltype: 'converted',
    //     referralsCount: 0,
    //     rewardTranslations: {},
    //   },
    //   callbacks: {
    //     intl: () => {
    //       console.log('intl');
    //     },
    //     paginate: () => {
    //       console.log('paginate');
    //     },
    //   },
  };
}
