import gql from "graphql-tag";
import jsonpointer from "jsonpointer";
import { useEffect } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../sqm-portal/usePortalQuery";
import decode from "jwt-decode";
import {
  navigation,
  setPersistedUserIdentity,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";

const PortalLoginMutation = gql`
  mutation PortalLogin($email: String!, $password: String!) {
    authenticateUser(input: { email: $email, password: $password }) {
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
    verified: boolean;
  };
}

export function usePortalLogin({ nextPage, nextPageUrlParameter }) {
  const [{ loading, data, error }, request] = usePortalQuery(
    PortalLoginMutation,
    { loading: false }
  );
  const userIdent = useUserIdentity();

  const urlParams = new URLSearchParams(window.location.search);
  const nextPageOverride = urlParams.get(nextPageUrlParameter);
  urlParams.delete(nextPageUrlParameter);

  const submit = async (event: any) => {
    let formData = event.detail.formData;

    formData?.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });
    const variables = { email: formData.email, password: formData.password };

    await request(variables);
  };

  useEffect(() => {
    if (data?.authenticateUser) {
      const { authenticateUser } = data;
      const jwt = authenticateUser.squatchJWT;
      const { user } = decode<DecodedSquatchJWT>(jwt);
      const sessionData = {
        ...authenticateUser.sessionData,
        verified: user.verified,
        email: user.email,
      };
      setPersistedUserIdentity({
        jwt,
        id: user.id,
        accountId: user.accountId,
        sessionData,
      });
    }
  }, [data?.authenticateUser]);

  useEffect(() => {
    if (userIdent?.jwt) {
      navigation.push({
        pathname: nextPageOverride || nextPage,
        search: urlParams.toString(),
      });
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
