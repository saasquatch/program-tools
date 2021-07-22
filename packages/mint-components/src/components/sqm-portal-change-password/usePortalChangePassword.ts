import { useState } from "@saasquatch/universal-hooks";
import { PortalChangePassword } from "./sqm-portal-change-password";
import jsonpointer from "jsonpointer";
import gql from "graphql-tag";
import {
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";

// TODO: finalize the change password query for logged in users
// TODO(johan): Create a component-boilerplate hook for this when we have this functionality
const CHANGE_PASSWORD = gql`
  mutation ResetPassword($email: String!, $password: String!) {
    authenticateUser(input: { email: $email, password: $password }) {
      squatchJWT
      sessionData
    }
  }
`;

export function usePortalChangePassword(_props: PortalChangePassword) {
  const [request, { loading /*data, errors */ }] = useMutation(CHANGE_PASSWORD);
  const [open, setOpen] = useState(false);

  const user = useUserIdentity();

  const submit = async (event: any) => {
    const formData = event.detail?.formData;
    formData?.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });

    const variables = {
      email: user.managedIdentity.email,
      password: formData.password,
    };

    await request(variables);
    console.log(
      { formData },
      formData?.newPasswordOne,
      formData.newPasswordTwo
    );
  };
  return {
    states: {
      open,
      loading,
      error: "",
    },
    data: {},
    callbacks: {
      setOpen,
      submit,
    },
  };
}
