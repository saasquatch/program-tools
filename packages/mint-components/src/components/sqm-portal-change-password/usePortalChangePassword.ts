import { useState } from "@saasquatch/universal-hooks";
import { PortalChangePassword } from "./sqm-portal-change-password";
import jsonpointer from "jsonpointer";
import {
  useChangePasswordMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";

export function usePortalChangePassword(_props: PortalChangePassword) {
  const [request, { loading, errors }] = useChangePasswordMutation();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const user = useUserIdentity();

  const submit = async (event: any) => {
    const formData = event.detail?.formData;
    formData?.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });

    if (!user?.jwt) {
      setError("Please log in again to change your password.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");

    const variables = {
      password: formData.password,
    };

    await request(variables);
  };
  return {
    states: {
      open,
      loading,
      error: errors?.response?.errors?.[0]?.message || error,
    },
    data: {},
    callbacks: {
      setOpen,
      submit,
    },
  };
}
