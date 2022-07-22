import { useDomContext } from "@saasquatch/dom-context-hooks";
import {
  LOCALE_CONTEXT_NAME,
  lazilyStartLocaleContext,
} from "@saasquatch/component-environment";
import { useHost } from "../useHost";

export function useLocale(): string | undefined {
  lazilyStartLocaleContext();
  const host = useHost();
  return useDomContext<string>(host, LOCALE_CONTEXT_NAME);
}
