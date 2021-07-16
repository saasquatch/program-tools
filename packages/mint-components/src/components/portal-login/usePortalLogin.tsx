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

const PortalLoginMutation = gql`
  mutation PortalLogin($email: String!, $password: String!) {
    authenticateManagedIdentityWithEmailAndPassword(
      authenticateManagedIdentityWithEmailAndPasswordInput: {
        email: $email
        password: $password
      }
    ) {
      token
      email
      emailVerified
      sessionData
    }
  }
`;

interface PortalLoginMutationResult {
  authenticateManagedIdentityWithEmailAndPassword: {
    token: string;
    email: string;
    emailVerified: boolean;
    sessionData: Record<string, any>;
  };
}

interface DecodedSquatchJWT {
  user: {
    accountId: string;
    id: string;
  };
}

export function usePortalLogin({ nextPage, nextPageUrlParameter }) {
  const [{ loading, data, error }, request] =
    usePortalQuery<PortalLoginMutationResult>(PortalLoginMutation, {
      loading: false,
    });
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
    if (data?.authenticateManagedIdentityWithEmailAndPassword) {
      const { authenticateManagedIdentityWithEmailAndPassword: res } = data;
      const jwt = res.token;
      const { user } = decode<DecodedSquatchJWT>(jwt);
      setUserIdentity({
        jwt,
        id: user.id,
        accountId: user.accountId,
        managedIdentity: {
          email: res.email,
          emailVerified: res.emailVerified,
          sessionData: res.sessionData,
        },
      });
    }
  }, [data?.authenticateManagedIdentityWithEmailAndPassword]);

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
