import gql from "graphql-tag";
import jsonpointer from "jsonpointer";
import { useEffect, useRef } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";
import {
  navigation,
  setUserIdentity,
  // setUserIdentity,
  useCurrentPage,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";

const PortalLoginMutation = gql`
  mutation PortalLogin($email: String!, $password: String!) {
    authenticateUser(input: { email: $email, password: $password }) {
      squatchJWT
      customData
    }
  }
`;

export function usePortalLogin() {
  const [{ loading, data, error }, request] = usePortalQuery(
    PortalLoginMutation,
    { loading: false }
  );
  const formRef = useRef(null);
  const currentPage = useCurrentPage();
  const userIdent = useUserIdentity();
  useEffect(() => {
    if (userIdent?.jwt && currentPage.pathname === "/") {
      console.log("logged in");
      console.log(userIdent);
    } else if (data) {
      const { authenticateUser } = data;
      const jwt = authenticateUser.squatchJWT;
      setUserIdentity({ jwt, id: "", accountId: "" });
    }
  }, [data, userIdent?.jwt]);

  console.log("usePortalLogin");
  console.log(formRef.current);
  formRef.current?.addEventListener("sl-submit", async (event: any) => {
    console.log("event heard");
    let formData = event.detail.formData;

    formData?.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });
    const variables = { email: formData.email, password: formData.password };

    await request(variables);
  });

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
