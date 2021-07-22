import jsonpointer from "jsonpointer";
import { useEffect } from "@saasquatch/universal-hooks";
import {
  navigation,
  useUserIdentity,
  useRegisterWithEmailAndPasswordMutation,
} from "@saasquatch/component-boilerplate";
import { usePortalEmailVerification } from "../sqm-portal-email-verification/usePortalEmailVerification";

export function usePortalRegister({ nextPage, nextPageUrlParameter }) {
  const [request, { loading, errors }] =
    useRegisterWithEmailAndPasswordMutation();
  const userIdent = useUserIdentity();
  const {
    states: emailVerificationStates,
    callbacks: { submit: submitEmailVerificationRequest },
  } = usePortalEmailVerification({
    nextPageUrlParameter,
  });

  const submit = async (event: any) => {
    let formControls = event.target.getFormControls();

    let formData: Record<string, any> = {};
    formControls?.forEach((control) => {
      if (!control.name) return;
      const key = control.name;
      const value = control.value;
      jsonpointer.set(formData, key, value);
    });
    const { email, password } = formData;
    delete formData.email;
    delete formData.password;
    delete formData.confirmPassword;
    formData = { ...formData };
    const variables = {
      email,
      password,
      formData,
    };
    await request(variables);
  };

  useEffect(() => {
    if (userIdent?.jwt) {
      submitEmailVerificationRequest();
    }
  }, [userIdent?.jwt]);

  useEffect(() => {
    if (emailVerificationStates.success) navigation.push(nextPage);
  }, [emailVerificationStates.success]);

  return {
    states: {
      loading: loading || emailVerificationStates.loading,
      error: errors
        ? errors?.response?.errors?.[0]?.message
        : emailVerificationStates.error,
    },
    callbacks: {
      submit,
    },
  };
}
