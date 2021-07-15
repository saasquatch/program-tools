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
    resetPassword(input: { password: $password, oobCode: $oobCode }) {
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

export function usePortalResetPassword({ nextPage, nextPageUrlParameter }) {
  const [{ loading, data, error }, request] = usePortalQuery(
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
    if (data?.resetPassword) {
      const { resetPassword } = data;
      const jwt = resetPassword.squatchJWT;
      const { user } = decode<DecodedSquatchJWT>(jwt);
      const sessionData = {
        ...resetPassword.sessionData,
        verified: user.verified,
        email: user.email,
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
  }, [data?.resetPassword]);

  return {
    states: {
      loading,
      error,
      reset,
    },
    callbacks: { submit },
  };
}
