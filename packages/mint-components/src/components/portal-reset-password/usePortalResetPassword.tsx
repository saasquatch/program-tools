import gql from "graphql-tag";
import decode from "jwt-decode";
import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";
import { navigation, setUserIdentity } from "@saasquatch/component-boilerplate";

const VerifyManagedIdentityPasswordResetCodeMutation = gql`
  mutation VerifyPasswordResetCode($oobCode: String!) {
    verifyManagedIdentityPasswordResetCode(
      verifyManagedIdentityPasswordResetCodeInput: { oobCode: $oobCode }
    ) {
      success
    }
  }
`;

interface VerifyManagedIdentityPasswordResetCodeMutationResult {
  verifyManagedIdentityPasswordResetCode: {
    success: boolean;
  };
}

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
  const [reset, setReset] = useState(false);

  const [verifyPasswordResetCodeState, verifyPasswordResetCode] =
    usePortalQuery<VerifyManagedIdentityPasswordResetCodeMutationResult>(
      VerifyManagedIdentityPasswordResetCodeMutation,
      { loading: true }
    );

  const [resetPasswordState, resetPassword] =
    usePortalQuery<PortalResetPasswordMutationResult>(
      PortalResetPasswordMutation,
      { loading: false }
    );

  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get("oobCode");
  urlParams.delete("oobCode");

  const nextPageOverride = urlParams.get(nextPageUrlParameter);
  urlParams.delete(nextPageUrlParameter);

  const submit = async (event: any) => {
    let formData = event.detail.formData;

    formData?.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });
    const variables = { oobCode, password: formData.password };

    await resetPassword(variables);
  };

  const gotoNextPage = () => {
    navigation.push({
      pathname: nextPageOverride || nextPage,
      search: urlParams.toString(),
    });
  };

  const failed = () => {
    navigation.push({
      pathname: "/",
      search: urlParams.toString(),
    });
  };

  useEffect(() => {
    if (resetPasswordState.data?.resetManagedIdentityPassword) {
      const { resetManagedIdentityPassword: res } = resetPasswordState.data;
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
      setReset(true);
      setTimeout(() => {
        gotoNextPage();
      }, 5000);
    }
  }, [resetPasswordState.data?.resetManagedIdentityPassword]);

  useEffect(() => {
    verifyPasswordResetCode({ oobCode });
  }, [oobCode]);

  return {
    states: {
      loading: resetPasswordState.loading,
      error: resetPasswordState.error,
      reset,
      oobCodeValidating: verifyPasswordResetCodeState.loading,
      oobCodeValid:
        verifyPasswordResetCodeState.data
          ?.verifyManagedIdentityPasswordResetCode.success,
    },
    callbacks: { submit, failed, gotoNextPage },
  };
}
