import {
  useMutation,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import jsonpointer from "jsonpointer";
import { PortalChangeMarketing } from "./sqm-portal-change-marketing";
import { PortalProfileViewProps } from "./sqm-portal-change-marketing-view";

const GET_USER = gql`
  query {
    viewer {
      ... on User {
        id
        accountId
        marketingEmailOptIn
      }
    }
  }
`;

const UPSERT_USER = gql`
  mutation ($userInput: UserInput!) {
    upsertUser(userInput: $userInput) {
      id
      marketingEmailOptIn
    }
  }
`;

// view doesn't tolerate undefined, even when we're loading
const defaultFormState = {
  marketingEmailOptIn: false,
  errors: {},
  error: "",
};

export function usePortalProfile(
  props: PortalChangeMarketing
): PortalProfileViewProps {
  const userIdent = useUserIdentity();

  const [success, setSuccess] = useState(false);

  const [userData, setUserData] = useState<null | {
    id: string;
    accountId: string;
    marketingEmailOptIn: boolean;
  }>(undefined);

  const [formState, setFormState] = useState<{
    marketingEmailOptIn: boolean;
    errors: any;
    error: string;
  }>(defaultFormState);

  const userDataResponse = useQuery(GET_USER, {}, !userIdent?.jwt);

  const [upsertUser, upsertUserResponse] = useMutation(UPSERT_USER);

  useEffect(() => {
    if (upsertUserResponse?.loading) return;

    if (upsertUserResponse?.errors) {
      setFormState((state) => ({
        ...state,
        error: upsertUserResponse?.errors?.response?.errors?.[0].message,
      }));
    } else {
      setUserData((state) => ({
        ...state,
        ...upsertUserResponse?.data?.upsertUser,
      }));
      if (upsertUserResponse?.data) setSuccess(true);
    }
  }, [upsertUserResponse?.loading]);

  useEffect(() => {
    setUserData((data) => ({ ...data, ...userDataResponse?.data?.viewer }));

    setFormState({
      ...defaultFormState,
      ...userDataResponse.data?.viewer,
      ...upsertUserResponse.data?.upsertUser,
    });
  }, [userDataResponse?.data]);

  useEffect(() => {
    if (upsertUserResponse?.errors?.message) {
      setFormState({
        ...userDataResponse.data?.viewer,
        error: props.networkRequestMessage,
      });
    }
  }, [upsertUserResponse?.errors]);

  const onSubmit = (event) => {
    setSuccess(false);

    const formData = event.detail?.formData;
    formData?.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });

    upsertUser({
      userInput: {
        id: userIdent?.id,
        accountId: userIdent?.accountId,
        marketingEmailOptIn: Boolean(formData.marketingEmailOptIn),
      },
    });
    setFormState((s) => ({ ...s, errors: {}, error: "" }));
    return;
  };

  return {
    states: {
      success,
      loading: userDataResponse?.loading || upsertUserResponse.loading,
      submitDisabled: false,
      formState,
      user: userData,
      text: {
        emailPreferencesHeader: props.emailPreferencesHeader,
        marketingCheckboxLabel: props.marketingCheckboxLabel,
        submitChangeButtonText: props.submitChangeButtonText,
        successMessage: props.successMessage,
      },
    },
    callbacks: {
      onSubmit,
      setChecked: (value: boolean) =>
        setFormState({ ...formState, marketingEmailOptIn: value }),
    },
  };
}
