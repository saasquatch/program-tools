import { useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { gql } from 'graphql-request';
import { ReferralCodesProps } from './ReferralCodes';

const ReferralCodesQuery = gql`
  query getReferralCodes($programId: ID) {
    user: viewer {
      ... on User {
        referralCodes(programId: $programId) {
          referralCode
          dateCreated
          dateCopied
        }
      }
    }
  }
`;

export function useReferralCodes(props: ReferralCodesProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const { data, loading } = useQuery(ReferralCodesQuery, { programId }, !user?.jwt);

  const codes = data?.user?.referralCodes || [];
  return { codes, loading };
}

export function useDemoReferralCodes(_props: ReferralCodesProps) {
  return {
    codes: [
      { referralCode: 'ABC123', dateCreated: '2024-01-01', dateCopied: null },
      { referralCode: 'XYZ789', dateCreated: '2024-01-02', dateCopied: '2024-01-03' },
    ],
    loading: false,
  };
}
