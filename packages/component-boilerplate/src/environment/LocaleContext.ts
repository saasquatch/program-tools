import { useDomContext } from "@saasquatch/dom-context-hooks";
import { ContextProvider } from "dom-context";
import { useHost } from "../hooks/useHost";
import { WidgetIdent } from "./environment";

const CONTEXT_NAME = "sq:locale";

declare global {
  interface Window {
    widgetIdent: WidgetIdent;
    squatchLocale: ContextProvider<string>;
  }
}

function _lazilyStartGlobally() {
  const globalProvider = window.squatchLocale;
  if (!globalProvider) {
    // Lazily creates a global provider
    window.squatchLocale = new ContextProvider<string>({
      element: document.documentElement,
      initialState: window.widgetIdent?.locale || undefined,
      contextName: CONTEXT_NAME,
    }).start();
  }
}

export function useLocale(): string | undefined {
  _lazilyStartGlobally();
  const host = useHost();
  return useDomContext<string>(host, CONTEXT_NAME);
}

/**
 * Overide the globally defined Locale context
 *
 * @param locale the new locale used by the user
 */
export function setLocale(locale: string) {
  _lazilyStartGlobally();
  const globalProvider = window.squatchLocale;
  globalProvider.context = locale;
}
