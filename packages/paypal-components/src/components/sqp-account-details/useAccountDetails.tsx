import {
  useMutation,
  useQuery,
  useRefreshDispatcher,
  useUserIdentity,
  setUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useRef, useState, useEffect } from "@saasquatch/universal-hooks";
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

const NEXT_PAYOUT_QUERY = gql`
  query nextPayoutDetails {
    nextPayoutDetails {
      totals {
        currencyCode
        value
      }
      baseUnitBalances {
        baseUnit
        balances {
          currencyCode
          value
        }
      }
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

  // TODO: remove this
  if (process.env.NODE_ENV === "dev")
    useEffect(() => {
      setUserIdentity({
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoic2FtKzIwQHNhYXNxdWF0LmNoIiwiYWNjb3VudElkIjoic2FtKzIwQHNhYXNxdWF0LmNoIiwiZW1haWwiOiJzYW0rMjBAc2Fhc3F1YXQuY2gifX0.1b8tjushS1Dq5Suc-EY7WmasP9v5XX2Fa997y-CH2i4",
        id: "sam+20@saasquat.ch",
        accountId: "sam+20@saasquat.ch",
      });
    }, []);

  const [submitUser, { data: submissionData, loading }] =
    useMutation(SUBMIT_ACCOUNT);

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
      setEditingAccount(false);
      refresh();
    }
  };

  function resetForm() {
    const formControls = formRef.current?.getFormControls();
    formControls?.forEach((control) => {
      control.value = data?.viewer?.customFields?.paypalEmail || "";
    });
    setSuccess(false);
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
      refresh();
      setSuccess(true);
      setOpen(false);
    }
  };

  const paypalEmail = data?.viewer?.customFields?.paypalEmail;

  return {
    formRef,
    integrationDisabled: false,
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
      accountLabel: props.accountLabel,
      recentPaymentLabel: props.recentPaymentLabel,
      nextPaymentLabel: props.nextPaymentLabel,
      editText: props.editText,
    },
    formContent: {
      // @ts-ignore
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
      integrationAlertHeader: props.integrationAlertHeader,
      integrationAlertText: props.integrationAlertText,
    },
    overviewContent: {
      detailsHeaderText: props.detailsHeaderText,
      scheduleHeaderText: props.scheduleHeaderText,
      otherCurrenciesLabel: props.otherCurrenciesLabel,
      w9TaxLabel: props.w9TaxLabel,
      upcomingPaymentLabel: props.upcomingPaymentLabel,
      nextPayoutLabel: props.nextPayoutLabel,
      detailsContent: <Upcoming />,
      ScheduleContent: [<Default />],
    },
  };
}
