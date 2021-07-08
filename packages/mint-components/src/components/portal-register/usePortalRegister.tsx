import gql from "graphql-tag";
import jsonpointer from "jsonpointer";
import { useEffect } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";
import decode from "jwt-decode";
import {
  navigation,
  setUserIdentity,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";

const PortalRegisterMutation = gql`
  mutation PortalRegister(
    $email: String!
    $password: String!
    $formData: JSONObject
  ) {
    registerUser(
      input: { email: $email, password: $password, formData: $formData }
    ) {
      squatchJWT
      sessionData
    }
  }
`;

interface DecodedSquatchJWT {
  user: {
    accountId: string;
    id: string;
    email: string;
  };
}

export function usePortalRegister({ nextPage, nextPageUrlParameter }) {
  const [{ loading, data, error }, request] = usePortalQuery(
    PortalRegisterMutation,
    { loading: false }
  );
  const userIdent = useUserIdentity();

  const urlParams = new URLSearchParams(window.location.search);
  const nextPageOverride = urlParams.get(nextPageUrlParameter);

  const submit = async (event: any) => {
    console.log("sl-submit");

    let formData = event.detail.formData;

    formData?.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });
    const variables = { email: formData.email, password: formData.password };

    await request(variables);
  };

  useEffect(() => {
    if (data?.registerUser) {
      const { registerUser } = data;
      const jwt = registerUser.squatchJWT;
      // const sessionData = registerUser.sessionData;
      const { user } = decode<DecodedSquatchJWT>(jwt);
      setUserIdentity({
        jwt,
        id: user.id,
        accountId: user.accountId,
        // sessionData,
      });
    }
  }, [data?.registerUser]);

  useEffect(() => {
    if (userIdent?.jwt) {
      navigation.push(nextPageOverride || nextPage);
    }
  }, [userIdent?.jwt]);

  return {
    states: {
      loading,
      error,
    },
    callbacks: {
      submit,
    },
  };
}
