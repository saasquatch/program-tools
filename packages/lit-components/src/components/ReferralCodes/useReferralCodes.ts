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
