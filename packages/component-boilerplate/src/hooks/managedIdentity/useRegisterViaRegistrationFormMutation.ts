import gql from "graphql-tag";
import decode from "jwt-decode";
import { useEffect } from "@saasquatch/universal-hooks";

import { BaseQueryData } from "../graphql/useBaseQuery";
import {
  setUserIdentity,
  DecodedSquatchJWT,
} from "../../environment/UserIdentityContext";
import { useMutation } from "../graphql/useMutation";
import { useState } from "react";

const RegisterViaRegistrationFormMutation = gql`
  mutation RegisterViaRegistrationForm(
    $email: String!
    $password: String!
    $formData: RSJsonNode
    $redirectPath: String
  ) {
    submitForm(
      formInput: {
        formData: {
          email: $email
          password: $password
          formData: $formData
          redirectPath: $redirectPath
        }
      }
    ) {
      results {
        ... on FormHandlerSubmissionResult {
          result
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
    }>;
  };
}
interface RegistrationFormResponseData<T> extends BaseQueryData<T> {
  formError?: string;
}

export function useRegisterViaRegistrationFormMutation(): [
  (e: {
    email: string;
    password: string;
    formData?: Record<string, any>;
  }) => unknown,
  RegistrationFormResponseData<RegisterViaRegistrationFormResult>
] {
  const [request, { loading, data, errors }] =
    useMutation<RegisterViaRegistrationFormResult>(
      RegisterViaRegistrationFormMutation
    );
  const [formError, setFormError] = useState<string | undefined>();

  useEffect(() => {
    const registrationResult: null | RegistrationResult =
      data?.submitForm?.results.reduce(
        (
          prev: null | RegistrationResult,
          curr: RegisterViaRegistrationFormResult["submitForm"]["results"][number]
        ) => {
          // not really sure how to only get the registration result...
          const result = curr.result.results.find((result) =>
            result.hasOwnProperty("success")
          );

          return result || prev;
        },
        null
      );
    if (registrationResult && registrationResult.success) {
      // if success handle setUserIdentity
      setFormError(undefined);
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
    } else if (registrationResult && !registrationResult.success) {
      // handle errors
      setFormError(registrationResult.message);
    }
  }, [data?.submitForm]);

  return [request, { loading, data, errors, formError }];
}
