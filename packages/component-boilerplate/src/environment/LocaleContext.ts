import { useDomContext } from "@saasquatch/dom-context-hooks";
import { ContextProvider } from "dom-context";
import { gql } from "graphql-request";
import { useQuery, useUserIdentity } from "..";
import { useHost } from "../hooks/useHost";
import { WidgetIdent } from "./environment";

const CONTEXT_NAME = "sq:locale";

declare global {
  interface Window {
    widgetIdent: WidgetIdent;
    squatchLocale: ContextProvider<string>;
  }
}

const GET_LOCALE = gql`
  query {
    viewer {
      ... on User {
        locale
      }
    }
  }
`;

function _lazilyStartGlobally() {
  const globalProvider = window.squatchLocale;
  const user = useUserIdentity();

  const { data } = useQuery(GET_LOCALE, {}, !user);
  const locale = data?.viewer?.locale;

  if (!globalProvider) {
    // Lazily creates a global provider
    window.squatchLocale = new ContextProvider<string>({
      element: document.documentElement,
      initialState: locale ||
        window.widgetIdent?.locale || undefined,
      contextName: CONTEXT_NAME,
    }).start();
  } else if (locale && locale !== globalProvider.context) {
    globalProvider.context = locale;
  }
}

export function useLocale(): string | undefined {
  _lazilyStartGlobally();
  const host = useHost();
  return useDomContext<string>(host, CONTEXT_NAME);
}

// not sure if this is even needed
/**
 * Overide the globally defined Locale context
 *
 * @param locale the new locale used by the user
 */
export function setLocale(locale: string) {
  const globalProvider = window.squatchLocale;
  globalProvider.context = locale;
}
