import { useMutation, useProgramId } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import { BankingInfoFormProps } from './BankingInfoForm';

const SUBMIT_BANKING = gql`
  mutation submitBankingInfo($bankingInfo: BankingInfoInput!, $programId: ID) {
    submitBankingInfo(bankingInfo: $bankingInfo, programId: $programId) {
      success
    }
  }
`;

export function useBankingInfoForm(props: BankingInfoFormProps) {
  const programId = useProgramId() || props.programId;
  const [submitBanking] = useMutation(SUBMIT_BANKING);
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: Event) {
    e.preventDefault();
    if (!accountName || !bankName || !accountNumber || !routingNumber) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await submitBanking({
        bankingInfo: { accountName, bankName, accountNumber, routingNumber },
        programId,
      });
      setSuccess(true);
    } catch {
      setError('Failed to save banking information. Please try again.');
    }
    setLoading(false);
  }

  return {
    accountName,
    setAccountName,
    bankName,
    setBankName,
    accountNumber,
    setAccountNumber,
    routingNumber,
    setRoutingNumber,
    error,
    loading,
    success,
    onSubmit,
  };
}
