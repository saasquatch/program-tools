import gql from "graphql-tag";
import jsonpointer from "jsonpointer";
import { useEffect, useCallback } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";
import decode from "jwt-decode";
import {
  setUserIdentity,
  // setUserIdentity,
  useCurrentPage,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";

const PortalLoginMutation = gql`
  mutation PortalLogin($email: String!, $password: String!) {
    authenticateUser(input: { email: $email, password: $password }) {
      squatchJWT
      sessionData
    }
  }
`;

interface DecodedSquatchJWT {
  user: {
    accountId: string;
    id: string;
    email: string;
  };
}

export function usePortalLogin() {
  const [{ loading, data, error }, request] = usePortalQuery(
    PortalLoginMutation,
    { loading: false }
  );
  const currentPage = useCurrentPage();
  const userIdent = useUserIdentity();

  const formRef = useCallback((node) => {
    node.addEventListener("sl-submit", async (event: any) => {
      console.log("sl-submit");

      let formData = event.detail.formData;

      formData?.forEach((value, key) => {
        jsonpointer.set(formData, key, value);
      });
      const variables = { email: formData.email, password: formData.password };

      await request(variables);
    });
  }, []);

  useEffect(() => {
    if (data) {
      const { authenticateUser } = data;
      const jwt = authenticateUser.squatchJWT;
      const { user } = decode<DecodedSquatchJWT>(jwt);
      setUserIdentity({ jwt, id: user.id, accountId: user.accountId });
    }
  }, [data]);

  useEffect(() => {
    if (userIdent?.jwt && currentPage.pathname === "/") {
      console.log("logged in");
      console.log(userIdent);
    }
  }, [userIdent?.jwt]);

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
