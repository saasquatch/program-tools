import { ReferralListViewProps } from './referral-list-view';
import gql from 'graphql-tag';
import { useQuery } from '@saasquatch/component-boilerplate';
import { usePaginatedCountQuery } from '../../hooks/usePaginatedCountQuery';
import { usePaginatedQuery } from '../../hooks/usePaginatedQuery';

type ReferralListProps = any;

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

export function useReferralList(props: ReferralListProps): ReferralListViewProps {
  const {id, accountId} = props;

  const {envelope, states, callbacks} = usePaginatedQuery(
    getReferrals,
    data => data?.user?.referrals,
    { limit: 10, offset: 0 },
    {
      accountId,
      id,
    },
  );
  const referrals = envelope?.data
  const referralsCount = envelope?.totalCount
  const {loading, currentPage} = states;
  const {setCurrentPage} = callbacks
  // const queryResult = useQuery(getUser, variables);
  // console.log(queryResult);
  return {
    ...props,
    states: {
      loading,
      offset: currentPage,
    },
    data: {
      referrals,
      referralsCount
    },
    callbacks: {
      paginate: setCurrentPage
    }
  };
}
