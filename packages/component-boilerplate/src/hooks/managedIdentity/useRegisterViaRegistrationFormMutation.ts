import gql from "graphql-tag";
import decode from "jwt-decode";
import { useEffect, useState } from "@saasquatch/universal-hooks";

import { BaseQueryData } from "../graphql/useBaseQuery";
import {
  setUserIdentity,
  DecodedSquatchJWT,
} from "@saasquatch/component-environment";
import { useMutation } from "../graphql/useMutation";

const RegisterViaRegistrationFormMutation = gql`
  mutation RegisterViaRegistrationForm($key: String!, $formData: RSJsonNode!) {
    submitForm(formSubmissionInput: { key: $key, formData: $formData }) {
      results {
        ... on FormHandlerSubmissionResult {
          result
          formHandler {
            namespace
          }
        }
        ... on FormHandlerError {
          errorCode
          error
          errorType
          formHandler {
            name
            endpointUrl
          }
        }
      }
    }
  }
`;

type RegistrationResult =
  | {
      success: true;
      message: string;
      data: {
        token: string;
        email: string;
        emailVerified: boolean;
        sessionData: Record<string, any>;
      };
    }
  | {
      success: false;
      message: string;
    };

interface RegisterViaRegistrationFormResult {
  submitForm: {
    results: Array<{
      result: {
        results: Array<RegistrationResult>;
      };
      formHandler: {
        namespace: string;
      };
    }>;
  };
}
interface RegistrationFormResponseData<T> extends BaseQueryData<T> {
  formError?: string;
}

export function useRegisterViaRegistrationFormMutation(): [
  (e: {
    key: string;
    formData: {
      email: string;
      password: string;
      redirectUrl?: string;
      [field: string]: any;
    };
  }) => Promise<RegisterViaRegistrationFormResult | Error>,
  RegistrationFormResponseData<RegisterViaRegistrationFormResult>
] {
  const [request, { loading, data, errors }] =
    useMutation<RegisterViaRegistrationFormResult>(
      RegisterViaRegistrationFormMutation
    );
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const managedIdentityResponse:
      | undefined
      | RegisterViaRegistrationFormResult["submitForm"]["results"][number] = data?.submitForm?.results.find(
      (result) => result.formHandler.namespace === "identity"
    );
    if (
      managedIdentityResponse &&
      managedIdentityResponse.result.results.length
    ) {
      const registrationResult = managedIdentityResponse.result.results[0];
      if (registrationResult.success) {
        // if success handle setUserIdentity
        setFormError(null);
        const jwt = registrationResult.data.token;
        const { user } = decode<DecodedSquatchJWT>(jwt);
        setUserIdentity({
          jwt,
          id: user.id,
          accountId: user.accountId,
          managedIdentity: {
            email: registrationResult.data.email,
            emailVerified: registrationResult.data.emailVerified,
            sessionData: registrationResult.data.sessionData,
          },
        });
      } else {
        // handle errors
        setFormError(registrationResult.message);
      }
    }
  }, [data?.submitForm]);

  return [request, { loading, data, errors, formError }];
}
