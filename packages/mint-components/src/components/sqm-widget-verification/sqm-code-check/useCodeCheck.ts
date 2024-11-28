import {
  setVerificationContext,
  useParent,
  useParentValue,
  useToken,
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/stencil-hooks";
import { SHOW_CODE_NAMESPACE, VERIFICATION_EMAIL_NAMESPACE } from "../keys";
import { useVerificationEmailMutation } from "../sqm-email-check/useEmailCheck";
import { CodeCheck } from "./sqm-code-check";

export function useCodeCheck(props: CodeCheck) {
  const token = useToken();
  const [showCode, setShowCode] = useParent(SHOW_CODE_NAMESPACE);
  const email = useParentValue<string | undefined>(
    VERIFICATION_EMAIL_NAMESPACE
  );

  const [codeRef, setCodeRef] = useState<HTMLDivElement>(null);
  const [validationError, setValidationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [request, { loading: resendLoading, data, errors: resendErrors }] =
    useVerificationEmailMutation();

  useEffect(() => {
    if (!codeRef) return;

    const slInputs = codeRef.querySelectorAll("sl-input");
    const codeElements = Array.from(slInputs).map(
      (node) =>
        node.shadowRoot.querySelector(`input[name="code"]`) as HTMLInputElement
    );

    codeElements.forEach((element, idx) => {
      element.addEventListener("focus", (e) => {
        console.log("focussed");
        (e.target as HTMLInputElement).select();
      });
      element.addEventListener("keydown", (e: any) => {
        if (e.key === "Backspace" && e.target.value === "") {
          codeElements[Math.max(0, idx - 1)].focus();
        }
      });
      element.addEventListener("input", (e: any) => {
        const input = e.target.value;
        if (!input) return;
        if (idx === codeElements.length - 1) {
          e.target.value = input.slice(-1);
          return;
        }

        if (input.length > 1) {
          const rest = input.slice(1);
          e.target.value = input.slice(0, 1);
          codeElements[idx + 1].value = rest;
          codeElements[idx + 1].dispatchEvent(new Event("input"));
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
    if (!email) {
      console.error("No email to send a repeat email to");
      return;
    }
    await request(email);
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

    // Async check here
    if (code === "123456") {
      // Hardcoded jwt for my testing. Needs to match user identity id and accountId
      setVerificationContext({
        token: token, // Replace with elevated permissions token
      });
      reset();
    } else {
      setValidationError(true);
    }
  };

  return {
    refs: {
      codeWrapperRef: setCodeRef,
    },
    states: {
      email,
      loading: loading,
      verifyFailed: !!validationError,
    },
    callbacks: {
      resendEmail,
      submitCode,
    },
    text: props.getTextProps(),
    // resendLoading,
    // resendErrors,
  };
}
