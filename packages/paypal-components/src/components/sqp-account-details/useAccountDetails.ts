import { setUserIdentity, useMutation, useQuery, useRefreshDispatcher, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useEffect, useRef, useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import jsonpointer from 'jsonpointer';
const ACCOUNT_DETAILS_QUERY = gql`
  query {
    viewer {
      ... on User {
        id
        accountId
        firstName
        customFields
      }
    }
  }
`;

const SUBMIT_ACCOUNT = gql`
  mutation upsertPaypalEmail($userInput: UserInput!) {
    upsertUser(userInput: $userInput) {
      id
      accountId
      customFields
    }
  }
`;

export function useAccountDetails(props) {
  // hacking in a user for ez development
  useEffect(() => {
    setUserIdentity({
      jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2MzQwNmY4MWUzMWUzOTM2ZjkwOTQxZDAiLCJpYXQiOjE2NjUxNjcyMzMsImV4cCI6MTY2NTI1MzYzMywic3ViIjoiYzJGdEt6SXdRSE5oWVhOeGRXRjBMbU5vOmMyRnRLekl3UUhOaFlYTnhkV0YwTG1Ob0B0ZXN0X2E4YjQxam90ZjhhMXY6dXNlcnMiLCJ1c2VyIjp7ImlkIjoic2FtKzIwQHNhYXNxdWF0LmNoIiwiYWNjb3VudElkIjoic2FtKzIwQHNhYXNxdWF0LmNoIiwiZGF0ZUJsb2NrZWQiOm51bGx9fQ.ODn5NEs5iU2WpzarxLycTy0J2eZoA0c9OwrloTGJ2wk',
      id: 'sam+20@saasquat.ch',
      accountId: 'sam+20@saasquat.ch',
      managedIdentity: {
        email: 'sam+20@saasquat.ch',
        emailVerified: true,
        sessionData: {},
      },
    });
  }, []);
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data } = useQuery(ACCOUNT_DETAILS_QUERY, {});

  const [fetch, { data: submissionData, loading }] = useMutation(SUBMIT_ACCOUNT);

  const { refresh } = useRefreshDispatcher();
  console.log({ data });
  const { accountId, id } = useUserIdentity();

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
      setSuccess(true);
      refresh();
    }
  };

  function resetForm() {
    const formControls = formRef.current.getFormControls();
    console.log({ stuff: formRef.current, formControls });
    formControls?.forEach(control => {
      control.value = '';
    });
    setSuccess(false);
  }

  function openModal(open: boolean) {
    setOpen(open);
    if (!open) {
      resetForm();
    }
  }

  return {
    formRef,
    hasAccount: !!data?.viewer?.customFields?.paypalEmail,
    accountDetails: {
      email: data?.viewer?.customFields?.paypalEmail,
      recentPayment: { amount: 10000, date: 12345678900 },
      nextPayment: {
        date: 12345678900,
      },
    },
    callbacks: { submit, setOpen: openModal },
    states: {
      loading,
      error,
      success,
      open,
    },
    detailsContent: {
      headerText: props.headerText,
      accountLabel: props.accountLabel,
      recentPaymentLabel: props.recentPaymentLabel,
      nextPaymentLabel: props.nextPaymentLabel,
      editText: props.editText,
    },
    formContent: {
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
  };
}
