import gql from "graphql-tag";
import jsonpointer from "jsonpointer";
import { useCallback, useEffect, useState } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";

const PortalResetPasswordMutation = gql`
  mutation PortalResetPassword($oobCode: String!, $password: String!) {
    resetPassword(input: { password: $password, oobCode: $oobCode }) {
      success
    }
  }
`;

export function usePortalResetPassword() {
  const [{ loading, data, error }, request] = usePortalQuery(
    PortalResetPasswordMutation,
    { loading: false }
  );
  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get("oobCode");

  const [reset, setReset] = useState(false);

  const formRef = useCallback((node) => {
    node.addEventListener("sl-submit", async (event: any) => {
      if (reset) {
        //redirect
        return;
      }
      console.log("sl-submit");

      let formData = event.detail.formData;

      formData?.forEach((value, key) => {
        jsonpointer.set(formData, key, value);
      });
      const variables = { oobCode, password: formData.password };

      await request(variables);
    });
  }, []);

  useEffect(() => {
    if (data?.resetPassword?.success) {
      console.log("password reset");
      setReset(true);
    }
  }, [data?.resetPassword?.success]);

  return {
    states: {
      loading,
      error,
      reset,
    },
    refs: {
      formRef,
    },
  };
}
