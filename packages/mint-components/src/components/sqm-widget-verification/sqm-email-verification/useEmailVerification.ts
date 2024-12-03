import { useMutation, useParent } from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { SHOW_CODE_NAMESPACE, VERIFICATION_EMAIL_NAMESPACE } from "../keys";
import { WidgetEmailVerification } from "./sqm-email-verification";
import { WidgetEmailVerificationViewProps } from "./sqm-email-verification-view";

export const VerificationEmailMutation = gql`
  mutation sendVerificationEmail($key: String!, $toAddress: String!) {
    sendPreviewEmail(emailKey: $key, toAddress: $toAddress)
  }
`;

// TODO: Move to component-boilerplate
export function useVerificationEmailMutation() {
  const [request, { loading, data, errors }] = useMutation(
    VerificationEmailMutation
  );

  const sendVerificationEmailMutation = async (toAddress: string) => {
        console.log(toAddress);
    return true;


    // TODO: Needs new mutation
    // try {
    //   const result = await request({
    //     toAddress,
    //     key: "verification-code-email",
    //   });
    //   if (result instanceof Error || !result) throw new Error();

    //   return result;
    // } catch (e) {
    //   return undefined;
    // }
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
  const [__, setEmail] = useParent(VERIFICATION_EMAIL_NAMESPACE);

  const [error, setError] = useState(false);
  const [sendVerificationEmailMutation, { loading, data, errors }] =
    useVerificationEmailMutation();

  const submitEmail = async (e: any) => {
    e.preventDefault();
    const formData = e.detail.formData;
    const toAddress = formData.get("email").toString();
    console.log({ toAddress });

    const result = await sendVerificationEmailMutation(toAddress);
    if (!result) setError(true);
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
    },
    text: props.getTextProps(),
  };
}
