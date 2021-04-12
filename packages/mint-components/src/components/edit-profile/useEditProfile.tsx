import {
  useLazyQuery,
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { EditProfileViewProps } from "./edit-profile-view";
import { intl } from "../../global/global";

export interface EditProfileProps {
  editprofileheader: string;
  editprofiletext: string;
  firstnametext: string;
  lastnametext: string;
  canceltext: string;
  updatetext: string;
  currentregiontext: string;
}

const GET_USER = gql`
  query {
    viewer {
      __typename
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
  mutation(
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
  currentRegion: "",
  firstName: "",
  lastName: "",
  errors: {},
  error: "",
};

export function useEditProfile(props: EditProfileProps): EditProfileViewProps {
  const userIdent = useUserIdentity();
  const [showEdit, setShowEdit] = useState(false);
  const [userData, setUserData] = useState<null | {
    id: string;
    accountId: string;
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
  }>(undefined);

  const [formState, setFormState] = useState<{
    currentRegion: string;
    firstName: string;
    lastName: string;
    errors: any;
    error: string;
  }>(defaultFormState);

  const [getUser, userDataResponse] = useLazyQuery(GET_USER);

  const [upsertUser, upsertUserResponse] = useMutation(UPSERT_USER);

  useEffect(() => {
    console.log(userIdent?.jwt);
    if (userIdent?.jwt) getUser({});
  }, [userIdent?.jwt]);

  useEffect(() => {
    if (upsertUserResponse?.loading || !showEdit) return;

    if (upsertUserResponse?.errors) {
      setFormState((state) => ({
        ...state,
        error: upsertUserResponse?.errors?.response.errors?.[0].message,
      }));
    } else {
      console.log("upsert response data:", upsertUserResponse?.data);
      setUserData((state) => ({
        ...state,
        ...upsertUserResponse?.data?.upsertUser,
      }));
      setShowEdit(false);
    }
  }, [upsertUserResponse?.loading]);

  useEffect(() => {
    setUserData((data) => ({ ...data, ...userDataResponse?.data?.viewer }));
  }, [userDataResponse?.data]);

  return {
    states: {
      loading: userDataResponse?.loading || upsertUserResponse.loading,
      submitDisabled: false,
      formState,
      user: userData,
      showEdit,
      text: {
        editprofileheader: props.editprofileheader,
        editprofiletext: props.editprofiletext,
        firstnametext: props.firstnametext,
        lastnametext: props.lastnametext,
        canceltext: props.canceltext,
        updatetext: props.updatetext,
        currentregiontext: props.currentregiontext,
      },
    },
    callbacks: {
      onSubmit: () => {
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
        if(errors !== {}){
          setFormState((e) => ({ ...e, error: "Please correct the errors below to update your profile." }));
        }
        setFormState((e) => ({ ...e, errors }));
      },
      resetForm: () => {
        const currentRegion = userDataResponse?.data?.viewer?.countryCode
          ? intl.formatDisplayName(userDataResponse.data.viewer.countryCode, {
              type: "region",
            })
          : "Unknown";

        setUserData({
          ...userDataResponse.data?.viewer,
          ...upsertUserResponse.data?.upsertUser,
        });
        setFormState({
          ...defaultFormState,
          ...userDataResponse.data?.viewer,
          ...upsertUserResponse.data?.upsertUser,
          currentRegion,
        });
      },
      onChange: (e) => {
        const { name, value } = e.target;
        setFormState((data) => ({ ...data, [name]: value }));
      },
      setShowEdit,
    },
  };
}
