import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  navigation,
  useVerifyPasswordResetCodeMutation,
  useResetPasswordMutation,
} from "@saasquatch/component-boilerplate";
import { PortalResetPasswordViewProps } from "./sqm-portal-reset-password-view";
import { PortalResetPassword } from "./sqm-portal-reset-password";
import { sanitizeUrlPath } from "../../utils/utils";

export function usePortalResetPassword(
  props: PortalResetPassword
): PortalResetPasswordViewProps {
  const [reset, setReset] = useState(false);
  const [error, setError] = useState("");
  const [verifyPasswordResetCode, verifyPasswordResetCodeState] =
    useVerifyPasswordResetCodeMutation();

  const [resetPassword, resetPasswordState] = useResetPasswordMutation();

  const urlParams = new URLSearchParams(navigation.location.search);
  const oobCode = urlParams.get("oobCode");
  urlParams.delete("oobCode");

  const nextPageOverride = urlParams.get("nextPage");

  const verifyPasswordResetCodeAndHandleResponse = async () => {
    const result = await verifyPasswordResetCode({ oobCode });
    if (result instanceof Error) {
      setError("Network request failed.");
    }
  };

  useEffect(() => {
    verifyPasswordResetCodeAndHandleResponse();
  }, []);

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

    const result = await resetPassword(variables);
    if (result instanceof Error) {
      return setError("Network request failed.");
    }
    if (result.resetManagedIdentityPassword) {
      setReset(true);
      setTimeout(() => {
        gotoNextPage();
      }, 5000);
    }
  };

  const gotoNextPage = () => {
    urlParams.delete("nextPage");
    const url = sanitizeUrlPath(nextPageOverride || props.nextPage);
    navigation.push(url.href);
  };

  const failed = () => {
    navigation.push({
      pathname: props.failedPage,
      search: urlParams.toString() && "?" + urlParams.toString(),
    });
  };

  return {
    states: {
      loading: resetPasswordState.loading,
      reset,
      confirmPassword: props.confirmPassword,
      error:
        resetPasswordState.errors?.response?.errors?.[0]?.extensions?.message ||
        resetPasswordState.errors?.response?.errors?.[0]?.message ||
        error,
      oobCodeValidating: verifyPasswordResetCodeState.loading,
      oobCodeValid:
        verifyPasswordResetCodeState.data
          ?.verifyManagedIdentityPasswordResetCode.success,
      content: {
        passwordResetHeader: props.passwordResetHeader,
        resetPasswordHeader: props.resetPasswordHeader,
        continueButtonText: props.continueButtonText,
        resetPasswordButtonText: props.resetPasswordButtonText,
        confirmPasswordFieldLabel: props.confirmPasswordFieldLabel,
        passwordFieldLabel: props.passwordFieldLabel,
        meetsRequirementsText: props.meetsRequirementsText,
        doesNotMeetRequirementsText: props.doesNotMeetRequirementsText,
        minErrorText: props.minErrorText,
        uppercaseErrorText: props.uppercaseErrorText,
        lowercaseErrorText: props.lowercaseErrorText,
        hasErrorText: props.hasErrorText,
      },
    },
    callbacks: { submit, failed, gotoNextPage },
  };
}
