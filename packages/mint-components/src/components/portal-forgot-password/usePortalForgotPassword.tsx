import gql from "graphql-tag";
import jsonpointer from "jsonpointer";
import { useEffect, useCallback } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";

const PortalForgotPasswordMutation = gql`
  mutation PortalForgotPassword($email: String!) {
    requestPasswordResetEmail(input: { email: $email }) {
      success
    }
  }
`;

export function usePortalForgotPassword() {
  const [{ loading, data, error }, request] = usePortalQuery(
    PortalForgotPasswordMutation,
    { loading: false }
  );
  const formRef = useCallback((node) => {
    node.addEventListener("sl-submit", async (event: any) => {
      console.log("sl-submit");

      let formData = event.detail.formData;

      formData?.forEach((value, key) => {
        jsonpointer.set(formData, key, value);
      });
      const variables = { email: formData.email };

      await request(variables);
    });
  }, []);

  useEffect(() => {
    if (data?.requestPasswordResetEmail?.success) {
      console.log("email requested");
    }
  }, [data?.requestPasswordResetEmail?.success]);

  return {
    states: {
      loading,
      error,
    },
    refs: {
      formRef,
    },
  };
}
