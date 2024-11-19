import {
  setVerificationContext,
  useVerificationContext,
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";

export function useWidgetVerification() {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState<string | null>(null);
  const [codeRef, setCodeRef] = useState<HTMLDivElement>(null);

  const onSubmitEmail = () => {
    setStep("code");
  };

  useEffect(() => {
    if (!codeRef) return;

    const codeElements = Array.from(
      codeRef.querySelectorAll(`input[name="code"]`)
    ) as HTMLInputElement[];

    console.log({ codeElements });
    codeElements.forEach((element, idx) => {
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

  const onCheckCode = () => {
    setVerificationContext({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoiOThkODNlZGIwMmQ3ZTdjOTViY2Q2MjY3ZDZlN2RkMWU0NDJiNGMyMWJkZDQ4ZjY4NTgyMjIwYTVlNzgxMDdkYyIsImFjY291bnRJZCI6Ijk4ZDgzZWRiMDJkN2U3Yzk1YmNkNjI2N2Q2ZTdkZDFlNDQyYjRjMjFiZGQ0OGY2ODU4MjIyMGE1ZTc4MTA3ZGMiLCJlbWFpbCI6ImltcGFjdHFhbWFudWFsK3VzMUBnbWFpbC5jb20ifX0._CwBBMh6mX0WpoV2D3H_LfkP-i-D_bkgv7Q0ZCUhRTI",
    });
  };

  return {
    step,
    email,
    setEmail,
    setCodeRef,
    onCheckCode,
    onSubmitEmail,
  };
}
