import gql from "graphql-tag";
import decode from "jwt-decode";
import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";
import {
  navigation,
  setPersistedUserIdentity,
} from "@saasquatch/component-boilerplate";

const PortalResetPasswordMutation = gql`
  mutation PortalResetPassword($oobCode: String!, $password: String!) {
    resetManagedIdentityPassword(
      resetManagedIdentityPasswordInput: {
        password: $password
        oobCode: $oobCode
      }
    ) {
      token
      email
      emailVerified
      sessionData
    }
  }
`;

interface PortalResetPasswordMutationResult {
  resetManagedIdentityPassword: {
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
    email: string;
    verified: boolean;
  };
}

export function usePortalResetPassword({ nextPage, nextPageUrlParameter }) {
  const [{ loading, data, error }, request] =
    usePortalQuery<PortalResetPasswordMutationResult>(
      PortalResetPasswordMutation,
      { loading: false }
    );

  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get("oobCode");
  urlParams.delete("oobCode");

  const nextPageOverride = urlParams.get(nextPageUrlParameter);
  urlParams.delete(nextPageUrlParameter);

  const [reset, setReset] = useState(false);

  const submit = async (event: any) => {
    if (reset) {
      return navigation.push({
        pathname: nextPageOverride || nextPage,
        search: urlParams.toString(),
      });
    }

    let formData = event.detail.formData;

    formData?.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });
    const variables = { oobCode, password: formData.password };

    await request(variables);
  };

  useEffect(() => {
    if (data?.resetManagedIdentityPassword) {
      const { resetManagedIdentityPassword } = data;
      const jwt = resetManagedIdentityPassword.token;
      const { user } = decode<DecodedSquatchJWT>(jwt);
      const sessionData = {
        ...resetManagedIdentityPassword.sessionData,
        verified: resetManagedIdentityPassword.emailVerified,
        email: resetManagedIdentityPassword.email,
      };
      setPersistedUserIdentity({
        jwt,
        id: user.id,
        accountId: user.accountId,
        sessionData,
      }).then(() => {
        setReset(true);
      });
    }
  }, [data?.resetManagedIdentityPassword]);

  return {
    states: {
      loading,
      error,
      reset,
    },
    callbacks: { submit },
  };
}
