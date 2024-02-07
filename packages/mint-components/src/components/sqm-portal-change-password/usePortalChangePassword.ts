import { useEffect, useState } from "@saasquatch/universal-hooks";
import { PortalChangePassword } from "./sqm-portal-change-password";
import jsonpointer from "jsonpointer";
import {
  useChangePasswordMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";

export function usePortalChangePassword(props: PortalChangePassword) {
  const [request, { loading, errors, data }] = useChangePasswordMutation();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const user = useUserIdentity();

  const submit = async (event: any) => {
    setSuccess(false);

    const formData = event.detail?.formData;
    formData?.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });

    if (!user?.jwt) {
      setError(props.invalidSessionErrorText);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(props.nonMatchingPasswordErrorText);
      return;
    }
    setError("");

    const variables = {
      password: formData.password,
    };

    const result = await request(variables);
    if (
      !(result instanceof Error) &&
      result.changeManagedIdentityPassword?.success
    ) {
      setSuccess(true);
    }
  };

  return {
    states: {
      open,
      loading,
      success,
      error:
        error ||
        errors?.response?.errors?.[0]?.extensions?.message ||
        errors?.response?.errors?.[0]?.message,
      content: {
        modalChangePasswordHeader: props.modalChangePasswordHeader,
        cancelText: props.cancelText,
        changePasswordButtonText: props.changePasswordButtonText,
        passwordFieldLabel: props.passwordFieldLabel,
        confirmPasswordFieldLabel: props.confirmPasswordFieldLabel,
        successMessage: props.successMessage,
        portalChangePasswordHeader: props.portalChangePasswordHeader,
        portalChangePasswordButtonText: props.portalChangePasswordButtonText,
        meetsRequirementsText: props.meetsRequirementsText,
        doesNotMeetRequirementsText: props.doesNotMeetRequirementsText,
        minErrorText: props.minErrorText,
        uppercaseErrorText: props.uppercaseErrorText,
        lowercaseErrorText: props.lowercaseErrorText,
        hasErrorText: props.hasErrorText,
      },
    },
    data: {},
    callbacks: {
      setOpen,
      submit,
    },
  };
}
