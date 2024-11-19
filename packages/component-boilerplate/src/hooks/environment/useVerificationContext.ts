import {
  checkVerificationToken,
  isDemo,
  lazilyStartVerificationContext,
  setVerificationContext,
  VERIFICATION_CONTEXT_NAME,
  VerificationContext,
} from "@saasquatch/component-environment";
import { useDomContext } from "@saasquatch/dom-context-hooks";
import { useHost } from "../useHost";

export function useVerificationContext(): VerificationContext | undefined {
  lazilyStartVerificationContext();
  const host = useHost();
  const context = useDomContext(host, VERIFICATION_CONTEXT_NAME) as
    | VerificationContext
    | undefined;

  const valid = checkVerificationToken(context?.token);
  if (!isDemo() && context && !valid) {
    setVerificationContext(undefined);
    return undefined;
  }

  return context;
}

export function useVerificationToken() {
  return useVerificationContext()?.token;
}
