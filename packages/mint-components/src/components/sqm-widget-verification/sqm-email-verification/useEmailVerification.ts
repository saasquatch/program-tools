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

export const VerificationEmailMutation = gql`
  mutation requestUserEmailVerification($user: UserIdInput!) {
    requestUserEmailVerification(user: $user) {
      success
    }
  }
`;

export const UpsertUserEmailMutation = gql`
  mutation upsertUser($userInput: UserInput!) {
    user(userInput: $userInput) {
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
};
export const UserLookupQuery = gql`
  query user {
    viewer {
      ... on User {
        id
        accountId
        email
      }
    }
  }
`;

// TODO: Move to component-boilerplate
export function useVerificationEmailMutation() {
  const user = useUserIdentity();
  const [request, { loading: loading, data, errors }] = useMutation(
    VerificationEmailMutation
  );

  const sendVerificationEmailMutation = async () => {
    try {
      const result = await request({
        user: {
          id: user.id,
          accountId: user.accountId,
        },
      });
      if (result instanceof Error || !result) throw new Error();

      return result;
    } catch (e) {
      console.error("Could not send verification email", e);
      return undefined;
    }
  };

  return [
    sendVerificationEmailMutation,
    {
      loading,
      data,
      errors,
    },
  ] as const;
}

export function useUpsertUserEmail() {
  const user = useUserIdentity();
  const [request, { loading: loading, data, errors }] = useMutation(
    UpsertUserEmailMutation
  );

  const upsertUserEmail = async (email: string) => {
    try {
      const result = await request({
        user: {
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
  const [sendVerificationEmailMutation] = useVerificationEmailMutation();
  const [upsertUserEmail] = useUpsertUserEmail();
  const [loading, setLoading] = useState(false);
  const { data, loading: initialLoading } = useQuery<
    { viewer: User } | undefined
  >(UserLookupQuery, {});

  useEffect(() => {
    if (!data?.viewer) return;

    setEmailExists(!!data.viewer.email);
  }, [data]);

  const submitEmail = async (e: any) => {
    e.preventDefault();
    if (!data?.viewer) return;

    setLoading(true);
    const toAddress = data.viewer.email;
    if (!toAddress) {
      // If no email on the user, set one
      const formData = e.detail.formData;
      const newEmail = formData.get("email").toString();

      const result = await upsertUserEmail(newEmail);
      if (!result || !result.user.email) setError(true);
    }

    const result = await sendVerificationEmailMutation();
    if (!result || !result.requestUserEmailVerification.success) setError(true);
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
      initialLoading,
      error: error && props.errorText,
      email: data?.viewer.email,
    },
    text: props.getTextProps(),
  };
}
