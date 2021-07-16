import gql from "graphql-tag";
import jsonpointer from "jsonpointer";
import { useEffect } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";
import decode from "jwt-decode";
import {
  navigation,
  setPersistedUserIdentity,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { usePortalEmailVerification } from "../portal-email-verification/usePortalEmailVerification";

const PortalRegisterMutation = gql`
  mutation PortalRegister(
    $email: String!
    $password: String!
    $formData: RSJsonNode
  ) {
    registerManagedIdentityWithEmailAndPassword(
      registerManagedIdentityWithEmailAndPasswordInput: {
        email: $email
        password: $password
        formData: $formData
      }
    ) {
      token
      email
      emailVerified
      sessionData
    }
  }
`;

interface PortalRegisterMutationResult {
  registerManagedIdentityWithEmailAndPassword: {
    token: string;
    email: string;
    emailVerified: boolean;
    sessionData: Record<string, any>;
  };
}

interface DecodedSquatchJWT {
  user: {
    accountId: string;
    id: string;
    email: string;
    verified: boolean;
  };
}

export function usePortalRegister({ nextPage, nextPageUrlParameter }) {
  const [{ loading, data, error }, request] =
    usePortalQuery<PortalRegisterMutationResult>(PortalRegisterMutation, {
      loading: false,
    });
  const userIdent = useUserIdentity();
  const {
    states: emailVerificationStates,
    callbacks: { submit: submitEmailVerificationRequest },
  } = usePortalEmailVerification({
    nextPageUrlParameter,
  });

  const submit = async (event: any) => {
    let formData = event.detail.formData;

    formData?.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });
    const { email, password } = formData;
    delete formData.email;
    delete formData.password;
    formData = { ...formData };
    const variables = {
      email,
      password,
      formData,
    };
    await request(variables);
  };

  useEffect(() => {
    if (data?.registerManagedIdentityWithEmailAndPassword) {
      const { registerManagedIdentityWithEmailAndPassword } = data;
      const jwt = registerManagedIdentityWithEmailAndPassword.token;
      const { user } = decode<DecodedSquatchJWT>(jwt);
      const sessionData = {
        ...registerManagedIdentityWithEmailAndPassword.sessionData,
        verified: registerManagedIdentityWithEmailAndPassword.emailVerified,
        email: registerManagedIdentityWithEmailAndPassword.email,
      };
      setPersistedUserIdentity({
        jwt,
        id: user.id,
        accountId: user.accountId,
        sessionData,
      });
    }
  }, [data?.registerManagedIdentityWithEmailAndPassword]);

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
      error: error ? error : emailVerificationStates.error,
    },
    callbacks: {
      submit,
    },
  };
}
