import { useState } from "@saasquatch/universal-hooks";
import { PortalChangePassword } from "./sqm-portal-change-password";
import jsonpointer from "jsonpointer";

export function usePortalChangePassword(props: PortalChangePassword) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: any) => {
    const formData = event.detail?.formData;
    formData?.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });
    console.log(
      { formData },
      formData?.newPasswordOne,
      formData.newPasswordTwo
    );
  };
  return {
    states: {
      open,
      error,
    },
    data: {},
    callbacks: {
      setOpen,
      submit,
    },
  };
}
