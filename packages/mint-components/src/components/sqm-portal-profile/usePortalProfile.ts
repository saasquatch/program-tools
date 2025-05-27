import {
  useQuery,
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { PortalProfileViewProps } from "./sqm-portal-profile-view";
import { isEmpty } from "../../utilities";
import { PortalProfile } from "./sqm-portal-profile";

export interface PortalProfileProps {
  firstnametext: string;
  lastnametext: string;
  countrytext: string;
  emailtext: string;
  editProfileHeader: string;
  editProfileSubHeader: string;
  submitChangeButtonText: string;
  hideCountry: boolean;
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

export function usePortalProfile(props: PortalProfile): PortalProfileViewProps {
  const userIdent = useUserIdentity();

  const [success, setSuccess] = useState(false);

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

  const onSubmit = () => {
    setSuccess(false);
    if (formState.firstName && formState.lastName) {
      upsertUser({
        id: userIdent?.id,
        accountId: userIdent?.accountId,
        firstName: formState.firstName,
        lastName: formState.lastName,
      });
      setFormState((s) => ({ ...s, errors: {}, error: "" }));
      return;
    }

    const errors = {};
    if (!formState.firstName) {
      errors["firstName"] = { message: props.fieldEmptyText };
    }
    if (!formState.lastName) {
      errors["lastName"] = { message: props.fieldEmptyText };
    }
    if (!isEmpty(errors)) {
      setFormState((e) => ({
        ...e,
        error: props.formErrorText,
      }));
    }
    setFormState((e) => ({ ...e, errors }));
  };

  return {
    states: {
      success,
      loading: userDataResponse?.loading || upsertUserResponse.loading,
      submitDisabled: false,
      showCountry: !props.hideCountry,
      formState,
      user: userData,
      text: {
        firstnametext: props.firstnametext,
        lastnametext: props.lastnametext,
        countrytext: props.countrytext,
        emailtext: props.emailtext,
        editProfileHeader: props.editProfileHeader,
        editProfileSubHeader: props.editProfileSubHeader,
        submitChangeButtonText: props.submitChangeButtonText,
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
