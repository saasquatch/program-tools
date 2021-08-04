import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  navigation,
  useVerifyPasswordResetCodeMutation,
  useResetPasswordMutation,
} from "@saasquatch/component-boilerplate";
import { PortalResetPasswordViewProps } from "./sqm-portal-reset-password-view";

export function usePortalResetPassword({
  nextPage,
  confirmPassword,
}): PortalResetPasswordViewProps {
  const [reset, setReset] = useState(false);
  const [error, setError] = useState("");
  const [verifyPasswordResetCode, verifyPasswordResetCodeState] =
    useVerifyPasswordResetCodeMutation();

  const [resetPassword, resetPasswordState] = useResetPasswordMutation();

  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get("oobCode");
  urlParams.delete("oobCode");

  const nextPageOverride = urlParams.get("nextPage");

  const submit = async (event: any) => {
    setError("");
    let formData = event.detail.formData;

    formData?.forEach((value: any, key: string) => {
      jsonpointer.set(formData, key, value);
    });
    const variables = { oobCode, password: formData.password };

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    await resetPassword(variables);
  };

  const gotoNextPage = () => {
    urlParams.delete("nextPage");
    navigation.push({
      pathname: nextPageOverride || nextPage,
      search: urlParams.toString() && "?" + urlParams.toString(),
    });
  };

  const failed = () => {
    navigation.push({
      pathname: "/",
      search: urlParams.toString() && "?" + urlParams.toString(),
    });
  };

  useEffect(() => {
    if (resetPasswordState.data?.resetManagedIdentityPassword) {
      setReset(true);
      setTimeout(() => {
        gotoNextPage();
      }, 5000);
    }
  }, [resetPasswordState.data?.resetManagedIdentityPassword]);

  useEffect(() => {
    verifyPasswordResetCode({ oobCode });
  }, [oobCode]);

  useEffect(() => {
    if (verifyPasswordResetCodeState?.errors?.message) {
      setError("Network request failed.");
    }
  }, [verifyPasswordResetCodeState?.errors]);

  return {
    states: {
      loading: resetPasswordState.loading,
      reset,
      confirmPassword,
      error: resetPasswordState.errors?.response?.errors?.[0]?.message || error,
      oobCodeValidating: verifyPasswordResetCodeState.loading,
      oobCodeValid:
        verifyPasswordResetCodeState.data
          ?.verifyManagedIdentityPasswordResetCode.success,
    },
    callbacks: { submit, failed, gotoNextPage },
  };
}
