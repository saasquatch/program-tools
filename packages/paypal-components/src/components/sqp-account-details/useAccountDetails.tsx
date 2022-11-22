import {
  useMutation,
  useQuery,
  useRefreshDispatcher,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useRef, useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { gql } from "graphql-request";
import jsonpointer from "jsonpointer";
import { Upcoming } from "./DetailsCard.stories";
import { Default } from "./ScheduleCard.stories";
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

type AccountDetailsQuery = {
  viewer: {
    id: string;
    accountId: string;
    customFields: {
      paypalEmail?: string;
    };
  };
};

export function useAccountDetails(props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editingAccount, setEditingAccount] = useState(false);

  const { data } = useQuery<AccountDetailsQuery>(ACCOUNT_DETAILS_QUERY, {});

  const [submitUser, { loading }] = useMutation(SUBMIT_ACCOUNT);

  const { refresh } = useRefreshDispatcher();
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOpen(false);
      await new Promise((resolve) => setTimeout(resolve, 250));
      setEditingAccount(false);
      refresh();
    }
  };

  function resetForm() {
    setSuccess(false);
    setEditingAccount(false);
    const formControls = formRef.current?.getFormControls();
    formControls?.forEach((control) => {
      control.value = data?.viewer?.customFields?.paypalEmail || "";
    });
  }

  function openModal(open: boolean) {
    resetForm();
    setOpen(open);
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOpen(false);
      await new Promise((resolve) => setTimeout(resolve, 250));
      refresh();
    }
  };

  const paypalEmail = data?.viewer?.customFields?.paypalEmail;

  return {
    formRef,
    integrationDisabled: false,
    integrationPaused: false,
    hasAccount: !!paypalEmail,
    callbacks: { submit, setOpen: openModal, disconnect, setEditingAccount },
    states: {
      loading,
      error,
      success,
      open,
      editingAccount,
      paypalEmail,
    },
    detailsContent: {
      headerText: props.headerText,
      editText: props.editText,
    },
    formContent: {
      paypalEmail: data?.viewer?.customFields?.paypalEmail,
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
      editText: props.editText,
    },
    alertContent: {
      integrationDisabledHeader: props.integrationDisabledHeader,
      integrationDisabledText: props.integrationDisabledText,
      integrationPausedHeader: props.integrationPausedHeader,
      integrationPausedText: props.integrationPausedText,
    },
    overviewContent: {
      detailsHeaderText: props.detailsHeaderText,
      scheduleHeaderText: props.scheduleHeaderText,
      otherCurrenciesLabel: props.otherCurrenciesLabel,
      pendingDetailedStatusText: props.pendingDetailedStatusText,
      w9TaxLabel: props.w9TaxLabel,
      upcomingPaymentLabel: props.upcomingPaymentLabel,
      nextPayoutLabel: props.nextPayoutLabel,
      pendingLabel: props.pendingLabel,
      detailsContent: <Upcoming />,
      ScheduleContent: [<Default />],
    },
  };
}
