import {
  useMutation,
  useParent,
  useParentValue,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useHost, useState } from "@saasquatch/stencil-hooks";
import { gql } from "graphql-request";
import {
  SHOW_CODE_NAMESPACE,
  VERIFICATION_EMAIL_NAMESPACE,
  VERIFICATION_EVENT_KEY,
} from "../keys";
import { useVerificationEmailMutation } from "../sqm-email-verification/useEmailVerification";
import { WidgetCodeVerification } from "./sqm-code-verification";

// TODO: Move to component-boilerplate
export const VerifyEmailWithCodeMutation = gql`
  mutation submitImpactPublisherEmail2FACode(
    $user: UserIdInput!
    $code: String!
  ) {
    submitImpactPublisherEmail2FACode(user: $user, code: $code) {
      verifiedEmail
      accessKey
    }
  }
`;

export function useCodeVerificationMutation() {
  const user = useUserIdentity();
  const [request, { loading, data, errors }] = useMutation(
    VerifyEmailWithCodeMutation
  );

  const verifyUserWithCodeMutation = async (code: string) => {
    try {
      const result = await request({
        user: {
          id: user.id,
          accountId: user.accountId,
        },
        code,
      });
      if (result instanceof Error || !result) throw new Error();

      return result;
    } catch (e) {
      console.error("Failed to verify user", e);
      return null;
    }
  };

  return [verifyUserWithCodeMutation, { loading, data, errors }] as const;
}

export function useWidgetCodeVerification(props: WidgetCodeVerification) {
  const host = useHost();
  const [_, setShowCode] = useParent(SHOW_CODE_NAMESPACE);
  const email = useParentValue<string | undefined>(
    VERIFICATION_EMAIL_NAMESPACE
  );

  const [emailSent, setEmailSent] = useState(false);
  const [emailResent, setEmailResent] = useState(false);
  const [codeRef, setCodeRef] = useState<HTMLDivElement>(null);
  const [validationError, setValidationError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // TODO: Need to handle error states for these errors
  const [verifyUser, { loading: verifyLoading, errors: verifyErrors }] =
    useCodeVerificationMutation();
  const [request, { loading: resendLoading, data, errors: resendErrors }] =
    useVerificationEmailMutation();

  useEffect(() => {
    if (!codeRef) return;

    const slInputs = codeRef.querySelectorAll("sl-input");
    const codeElements = Array.from(slInputs).map(
      (node) =>
        node.shadowRoot.querySelector(`input[name="code"]`) as HTMLInputElement
    );

    console.log({ codeElements });
    codeElements.forEach((element, idx) => {
      element.addEventListener("focus", (e) => {
        (e.target as HTMLInputElement).select();
      });
      element.addEventListener("keydown", (e: any) => {
        if (e.key === "Backspace" && e.target.value === "") {
          codeElements[Math.max(0, idx - 1)].focus();
        }
      });
      element.addEventListener("input", (e: any) => {
        const input = e.data;
        if (!input) return;
        if (idx === codeElements.length - 1) {
          e.target.value = input.slice(-1);
          return;
        }

        if (input.length > 1) {
          const rest = input.slice(1);
          e.target.value = input.slice(0, 1);
          codeElements[idx + 1].dispatchEvent(
            new InputEvent("input", {
              inputType: "insertFromPaste",
              data: rest,
            })
          );
        }
        codeElements[idx + 1].focus();
      });
    });
  }, [codeRef]);

  const reset = () => {
    setShowCode(false);
    setValidationError(false);
  };

  const resendEmail = async () => {
    const result = await request();
    if (!result) {
      setEmailError(true);
      return;
    }

    if (emailSent) setEmailResent(true);
    setEmailSent(true);
  };

  const submitCode = async () => {
    const slInputs = codeRef.querySelectorAll("sl-input");
    const codeElements = Array.from(slInputs).map(
      (node) =>
        node.shadowRoot.querySelector(`input[name="code"]`) as HTMLInputElement
    );

    if (codeElements.find((el) => !el.value)) {
      setValidationError(true);
      return;
    }

    let code = "";
    codeElements.forEach((element) => {
      code = `${code}${element.value}`;
    });

    setValidationError(false);
    // Only 123456 passes for a valid code rn
    const res = await verifyUser(code);
    if (res) {
      const event = new CustomEvent(VERIFICATION_EVENT_KEY, {
        detail: { token: res.submitImpactPublisherEmail2FACode.accessKey },
        composed: true,
        bubbles: true,
      });
      host.dispatchEvent(event);
      reset();
    } else {
      setValidationError(true);
    }
  };

  useEffect(() => {
    // email should already exist if user has completed email-verification
    if (!email) resendEmail();
    else setEmailSent(true);
  }, []);

  return {
    refs: {
      codeWrapperRef: setCodeRef,
    },
    states: {
      email,
      emailResent,
      resendError: !!resendErrors?.message || emailError,
      loading: verifyLoading || resendLoading,
      verifyFailed: !!validationError,
    },
    callbacks: {
      resendEmail,
      submitCode,
    },
    text: props.getTextProps(),
  };
}
