import gql from "graphql-tag";
import jsonpointer from "jsonpointer";
import { useEffect } from "@saasquatch/universal-hooks";
import decode from "jwt-decode";
import {
  navigation,
  setUserIdentity,
  useMutation,
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
  const [request, { loading, data, errors }] =
    useMutation<PortalRegisterMutationResult>(PortalRegisterMutation);
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
      const { registerManagedIdentityWithEmailAndPassword: res } = data;
      const jwt = res.token;
      const { user } = decode<DecodedSquatchJWT>(jwt);
      setUserIdentity({
        jwt,
        id: user.id,
        accountId: user.accountId,
        managedIdentity: {
          email: res.email,
          emailVerified: res.emailVerified,
          sessionData: res.sessionData,
        },
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
      error: errors
        ? errors?.response?.errors?.[0]?.message
        : emailVerificationStates.error,
    },
    callbacks: {
      submit,
    },
  };
}
