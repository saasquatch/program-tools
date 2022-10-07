import { useMutation, useRefreshDispatcher, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import jsonpointer from 'jsonpointer';
const SUBMIT_ACCOUNT = gql`
  mutation upsertPaypalEmail($userInput: UserInput!) {
    upsertUser(userInput: $userInput) {
      id
      accountId
      customFields
    }
  }
`;

export function useAccountForm(props) {
  const [fetch, { data, loading }] = useMutation(SUBMIT_ACCOUNT);
  const [error, setError] = useState('');
  const { refresh } = useRefreshDispatcher();
  console.log({ data });
  const { accountId, id } = useUserIdentity();

  const [open, setOpen] = useState(false);

  const submit = async (event: any) => {
    setError('');
    let formData = event.detail.formData;

    formData?.forEach((value: any, key: string) => {
      jsonpointer.set(formData, key, value);
    });

    if (formData.email !== formData.confirmEmail) {
      setError('Emails do not match.');
      return;
    }
    const userInput = { id, accountId, customFields: { paypalEmail: formData.email } };
    const result = await fetch({ userInput });
    if (result instanceof Error) {
      return setError('Network request failed.');
    } else {
      refresh();
    }
  };

  return {
    callbacks: { submit, setOpen },
    states: {
      loading,
      error,
      success: !!data,
      open,
      content: {
        modalConnectPayPalAccountHeader: props.modalConnectPayPalAccountHeader,
        cancelText: props.cancelText,
        connectPayPalAccountButtonText: props.connectPayPalAccountButtonText,
        payPalEmailLabel: props.payPalEmailLabel,
        payPalEmailLabelHelpText: props.payPalEmailLabelHelpText,
        confirmPayPalEmailLabel: props.confirmPayPalEmailLabel,
        successMessage: props.successMessage,
        payPalAccountHeaderText: props.payPalAccountHeaderText,
        connectPayPalDescriptionText: props.connectPayPalDescriptionText,
      },
    },
  };
}
