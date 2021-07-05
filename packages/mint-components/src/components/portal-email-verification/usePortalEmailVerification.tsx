import gql from "graphql-tag";
import jsonpointer from "jsonpointer";
import { useEffect, useCallback } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";

const PortalEmailVerificationMutation = gql`
  mutation PortalEmailVerification($email: String!) {
    requestVerificationEmail(input: { email: $email }) {
      success
    }
  }
`;

export function usePortalEmailVerification() {
  const [{ loading, data, error }, request] = usePortalQuery(
    PortalEmailVerificationMutation,
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
    if (data?.requestVerificationEmail?.success) {
      console.log("email requested");
    }
  }, [data?.requestVerificationEmail?.success]);

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
