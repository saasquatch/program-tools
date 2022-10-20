import {
  useMutation,
  useQuery,
  useRefreshDispatcher,
  useUserIdentity,
  setUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useRef, useState, useEffect } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import jsonpointer from "jsonpointer";
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
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data } = useQuery(ACCOUNT_DETAILS_QUERY, {});

  // TODO: remove this
  useEffect(() => {
    setUserIdentity({
      jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJaR1Z5WldzdWMybGxiV1Z1Y3l0MGNFQnlaV1psY25KaGJITmhZWE54ZFdGMFkyZ3VZMjl0OlpHVnlaV3N1YzJsbGJXVnVjeXQwY0VCeVpXWmxjbkpoYkhOaFlYTnhkV0YwWTJndVkyOXRAdGVzdF9hNjM3c3JubmI0OGE0OnVzZXJzIiwidXNlciI6eyJpZCI6ImRlcmVrLnNpZW1lbnMrdHBAcmVmZXJyYWxzYWFzcXVhdGNoLmNvbSIsImFjY291bnRJZCI6ImRlcmVrLnNpZW1lbnMrdHBAcmVmZXJyYWxzYWFzcXVhdGNoLmNvbSIsImRhdGVCbG9ja2VkIjpudWxsfX0.1mraInmrItlrm2lHkUVFgsI8U7iUjrzBNMlWQ4QTbWc",
      id: "derek.siemens+tp@referralsaasquatch.com",
      accountId: "derek.siemens+tp@referralsaasquatch.com",
      managedIdentity: {
        email: "derek.siemens+tp@referralsaasquatch.com",
        emailVerified: true,
        sessionData: {},
      },
    });
  }, []);

  const [submitUser, { data: submissionData, loading }] =
    useMutation(SUBMIT_ACCOUNT);

  const { refresh } = useRefreshDispatcher();
  console.log({ data });
  const { accountId, id } = useUserIdentity() || { accountId: null, id: null };

  const submit = async (event: any) => {
    setError("");
    let formData = event.detail.formData;

    formData?.forEach((value: any, key: string) => {
      jsonpointer.set(formData, key, value);
    });

    if (formData.email !== formData.confirmEmail) {
      setError("Emails do not match.");
      return;
    }
    const userInput = {
      id,
      accountId,
      customFields: { paypalEmail: formData.email },
    };
    const result = await submitUser({ userInput });
    if (result instanceof Error) {
      return setError("Network request failed.");
    } else {
      setSuccess(true);
      refresh();
    }
  };

  function resetForm() {
    const formControls = formRef.current.getFormControls();
    formControls?.forEach((control) => {
      control.value = "";
    });
    setSuccess(false);
  }

  function openModal(open: boolean) {
    setOpen(open);
    if (!open) {
      resetForm();
    }
  }

  const disconnect = async () => {
    const userInput = {
      id,
      accountId,
      customFields: { paypalEmail: null },
    };
    const result = await submitUser({ userInput });
    if (result instanceof Error) {
      return setError("Network request failed.");
    } else {
      setSuccess(true);
      refresh();
    }
  };

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
    callbacks: { submit, setOpen: openModal, disconnect },
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
      submitPayPalAccountButtonText: props.submitPayPalAccountButtonText,
      payPalEmailLabel: props.payPalEmailLabel,
      payPalEmailLabelHelpText: props.payPalEmailLabelHelpText,
      confirmPayPalEmailLabel: props.confirmPayPalEmailLabel,
      successMessage: props.successMessage,
      payPalAccountHeaderText: props.payPalAccountHeaderText,
      connectPayPalDescriptionText: props.connectPayPalDescriptionText,
      connectAccountModalHeaderText: props.connectAccountModalHeaderText,
      connectAccountModalButtonText: props.connectAccountModalButtonText,
      disconnectAccountHeaderText: props.disconnectAccountHeaderText,
      disconnectAccountDescriptionText: props.disconnectAccountDescriptionText,
      disconnectAccountButtonText: props.disconnectAccountButtonText,
    },
  };
}
