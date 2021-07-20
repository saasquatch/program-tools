import {
  useQuery,
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { PortalProfileViewProps } from "./sqm-portal-profile-view";

export interface PortalProfileProps {
  firstnametext: string;
  lastnametext: string;
  countrytext: string;
  emailtext: string;
}

const GET_USER = gql`
  query {
    viewer {
      ... on User {
        id
        accountId
        firstName
        lastName
        email
        countryCode
      }
    }
  }
`;

const UPSERT_USER = gql`
  mutation (
    $id: String!
    $accountId: String!
    $firstName: String!
    $lastName: String!
  ) {
    upsertUser(
      userInput: {
        id: $id
        accountId: $accountId
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      firstName
      lastName
    }
  }
`;

// view doesn't tolerate undefined, even when we're loading
const defaultFormState = {
  country: "",
  email: "",
  firstName: "",
  lastName: "",
  errors: {},
  error: "",
};

export function usePortalProfile(
  props: PortalProfileProps
): PortalProfileViewProps {
  const userIdent = useUserIdentity();
  const [userData, setUserData] = useState<null | {
    id: string;
    accountId: string;
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
  }>(undefined);

  const [formState, setFormState] = useState<{
    country: string;
    firstName: string;
    lastName: string;
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
        error: upsertUserResponse?.errors?.response.errors?.[0].message,
      }));
    } else {
      setUserData((state) => ({
        ...state,
        ...upsertUserResponse?.data?.upsertUser,
      }));
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

  const onSubmit = () => {
    if (formState.firstName && formState.lastName) {
      upsertUser({
        id: userIdent?.id,
        accountId: userIdent?.accountId,
        firstName: formState.firstName,
        lastName: formState.lastName,
      });
      setFormState((s) => ({ ...s, errors: {} }));
      return;
    }

    const errors = {};
    if (!formState.firstName) {
      errors["firstName"] = { message: "Field can't be empty" };
    }
    if (!formState.lastName) {
      errors["lastName"] = { message: "Field can't be empty" };
    }
    if (errors !== {}) {
      setFormState((e) => ({
        ...e,
        error: "Please correct the errors below to update your profile.",
      }));
    }
    setFormState((e) => ({ ...e, errors }));
  };

  return {
    states: {
      loading: userDataResponse?.loading || upsertUserResponse.loading,
      submitDisabled: false,
      formState,
      user: userData,
      text: {
        firstnametext: props.firstnametext,
        lastnametext: props.lastnametext,
        countrytext: props.countrytext,
        emailtext: props.emailtext,
      },
    },
    callbacks: {
      onSubmit,
      onChange: (e) => {
        const { name, value } = e.target;
        setFormState((data) => ({ ...data, [name]: value }));
      },
    },
  };
}
