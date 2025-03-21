import {
  useMutation,
  useParent,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { SHOW_CODE_NAMESPACE, VERIFICATION_EMAIL_NAMESPACE } from "../keys";
import { WidgetEmailVerification } from "./sqm-email-verification";
import { WidgetEmailVerificationViewProps } from "./sqm-email-verification-view";
import { useVerificationEmail } from "../useVerificationEmail";

export const UpsertUserEmailMutation = gql`
  mutation upsertUser($userInput: UserInput!) {
    upsertUser(userInput: $userInput) {
      id
      accountId
      email
    }
  }
`;

type User = {
  id: string;
  accountId: string;
  email: string | null;
  impactConnection: {
    user: {
      id: string;
      email: string | null;
    } | null;
  } | null;
};
export const UserLookupQuery = gql`
  query user {
    viewer {
      ... on User {
        id
        accountId
        email
        impactConnection {
          user {
            id
            email
          }
        }
      }
    }
  }
`;

export function useUpsertUserEmail() {
  const user = useUserIdentity();
  const [request, { loading: loading, data, errors }] = useMutation(
    UpsertUserEmailMutation
  );

  const upsertUserEmail = async (email: string) => {
    try {
      const result = await request({
        userInput: {
          id: user.id,
          accountId: user.accountId,
          email,
        },
      });
      if (result instanceof Error || !result) throw new Error();

      return result;
    } catch (e) {
      console.error("Could not set email on user", e);
      return undefined;
    }
  };

  return [
    upsertUserEmail,
    {
      loading,
      data,
      errors,
    },
  ] as const;
}

export function useWidgetEmailVerification(
  props: WidgetEmailVerification
): WidgetEmailVerificationViewProps {
  const [_, setShowCode] = useParent(SHOW_CODE_NAMESPACE);
  const [email, setEmail] = useParent<string>(VERIFICATION_EMAIL_NAMESPACE);
  const [emailExists, setEmailExists] = useState(false);

  const [error, setError] = useState(false);
  const [mutationError, setMutationError] = useState(false);
  const {
    initialized,
    send: [sendEmail, { loading: sendLoading, errors }],
  } = useVerificationEmail();
  const [upsertUserEmail] = useUpsertUserEmail();
  const [loading, setLoading] = useState(true);
  const { data, loading: initialLoading } = useQuery<
    { viewer: User } | undefined
  >(UserLookupQuery, {});

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    if (!data?.viewer) return;

    setEmailExists(!!data.viewer.email);
  }, [data]);

  useEffect(() => {
    if (initialized) setLoading(false);
  }, [initialized]);

  const submitEmail = async (e: any) => {
    e.preventDefault();
    if (!data?.viewer) return;

    setLoading(true);
    const toAddress = data.viewer.email;
    if (!toAddress) {
      // If no email on the user, set one
      const formData = e.detail.formData;
      const newEmail = formData.get("email").toString();

      if (!emailRegex.test(newEmail)) {
        setError(true);
        return;
      }

      const result = await upsertUserEmail(newEmail);
      if (!result || !result.user.email) setError(true);
    }

    // UI should not allow this call til initialisation is done
    if (!initialized) return;

    const result = await sendEmail();
    if (!result || !result.success) setMutationError(true);
    else {
      // This is used to let the code verification widget know an email was already sent
      setEmail(toAddress);
      setShowCode(true);
    }
    setLoading(false);
  };

  return {
    callbacks: {
      submitEmail,
    },
    states: {
      loading,
      initialLoading: initialLoading && !initialized,
      error,
      email: data?.viewer.email,
      sendCodeError: mutationError,
    },
    text: props.getTextProps(),
  };
}
