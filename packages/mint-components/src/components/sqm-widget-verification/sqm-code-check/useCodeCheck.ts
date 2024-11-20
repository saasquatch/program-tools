import {
  setVerificationContext,
  useMutation,
  useParent,
  useParentValue,
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/stencil-hooks";
import { SHOW_CODE_NAMESPACE, VERIFICATION_EMAIL_NAMESPACE } from "../keys";
import {
  useVerificationEmailMutation,
  VerificationEmailMutation,
} from "../sqm-email-check/useEmailCheck";
import { VERIFICATION_CONTEXT_NAME } from "../../../../../component-environment/dist";

export function useCodeCheck() {
  const [showCode, setShowCode] = useParent(SHOW_CODE_NAMESPACE);
  const email = useParentValue<string | undefined>(
    VERIFICATION_EMAIL_NAMESPACE
  );

  const [codeRef, setCodeRef] = useState<HTMLDivElement>(null);
  const [validationError, setValidationError] = useState(false);
  const [request, { loading: resendLoading, data, errors: resendErrors }] =
    useVerificationEmailMutation();

  useEffect(() => {
    if (!codeRef) return;

    const codeElements = Array.from(
      codeRef.querySelectorAll(`input[name="code"]`)
    ) as HTMLInputElement[];

    console.log({ codeElements });
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
    console.log({ email });
    if (!email) {
      console.error("No email to send a repeat email to");
      return;
    }
    await request(email);
  };

  console.log({ data });

  const onCheckCode = () => {
    const codeElements = Array.from(
      codeRef.querySelectorAll(`input[name="code"]`)
    ) as HTMLInputElement[];

    if (codeElements.find((el) => !el.value)) {
      setValidationError(true);
      return;
    }

    let code = "";
    codeElements.forEach((element) => {
      code = `${code}${element.value}`;
    });

    console.log({ code });

    // Async check here
    if (code === "12345") {
      // Hardcoded jwt for my testing. Needs to match user identity id and accountId
      setVerificationContext({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoidGVzdHVzZXIiLCJhY2NvdW50SWQiOiJ0ZXN0dXNlciIsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZS5jb20ifX0.3d3_4i9IeCeFDXMi-oXeSyyH2Yk_9xyVEtVJ0iJc_SA",
      });
      reset();
    } else {
      setValidationError(true);
    }
  };

  return {
    setCodeRef,
    onCheckCode,
    resendEmail,
    validationError,
    resendLoading,
    resendErrors,
  };
}
