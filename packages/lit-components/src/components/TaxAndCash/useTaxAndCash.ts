import { useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import { TaxAndCashProps } from './TaxAndCash';

const TAX_STATUS_QUERY = gql`
  query getTaxStatus($programId: ID) {
    viewer {
      ... on User {
        taxHandling(programId: $programId) {
          status
          publisher {
            taxFormStatus
            indirectTaxFormStatus
            payoutStatus
            bankingInfoStatus
          }
        }
      }
    }
  }
`;

export function useTaxAndCash(props: TaxAndCashProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const [currentStep, setCurrentStep] = useState(props.step || 'dashboard');

  const { data, loading } = useQuery(TAX_STATUS_QUERY, { programId }, !user?.jwt);

  const taxHandling = data?.viewer?.taxHandling;
  const publisher = taxHandling?.publisher;

  return {
    currentStep,
    setCurrentStep,
    loading,
    status: taxHandling?.status || 'NOT_STARTED',
    taxFormStatus: publisher?.taxFormStatus || 'NOT_STARTED',
    bankingInfoStatus: publisher?.bankingInfoStatus || 'NOT_STARTED',
    payoutStatus: publisher?.payoutStatus || 'NOT_STARTED',
  };
}
