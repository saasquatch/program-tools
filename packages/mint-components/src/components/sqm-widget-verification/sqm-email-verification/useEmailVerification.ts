import {
  useMutation,
  useParent,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { SHOW_CODE_NAMESPACE, VERIFICATION_EMAIL_NAMESPACE } from "../keys";
import { WidgetEmailVerification } from "./sqm-email-verification";
import { WidgetEmailVerificationViewProps } from "./sqm-email-verification-view";
import { Accessibility } from "puppeteer";

export const VerificationEmailMutation = gql`
  mutation requestUserEmailVerification($user: UserIdInput!) {
    requestUserEmailVerification(user: $user) {
      success
    }
  }
`;

// TODO: Move to component-boilerplate
export function useVerificationEmailMutation() {
  const user = useUserIdentity();
  const [request, { loading, data, errors }] = useMutation(
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

export function useWidgetEmailVerification(
  props: WidgetEmailVerification
): WidgetEmailVerificationViewProps {
  const [_, setShowCode] = useParent(SHOW_CODE_NAMESPACE);
  const [email, setEmail] = useParent<string>(VERIFICATION_EMAIL_NAMESPACE);

  const [error, setError] = useState(false);
  const [sendVerificationEmailMutation, { loading, data, errors }] =
    useVerificationEmailMutation();

  const submitEmail = async (e: any) => {
    e.preventDefault();
    const formData = e.detail.formData;
    const toAddress = formData.get("email").toString();

    const result = await sendVerificationEmailMutation();
    console.log({ result });
    if (!result || !result.requestUserEmailVerification.success) setError(true);
    else {
      setEmail(toAddress);
      setShowCode(true);
    }
  };

  return {
    callbacks: {
      submitEmail,
    },
    states: {
      loading,
      error: error ? "Something happened" : errors?.message,
      //AL: TODO hooks email state
      email,
    },
    text: props.getTextProps(),
  };
}
