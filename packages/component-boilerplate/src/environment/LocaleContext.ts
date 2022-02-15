import { useDomContext } from "@saasquatch/dom-context-hooks";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { ContextProvider } from "dom-context";
import { gql } from "graphql-request";
import { useLazyQuery, useQuery, useUserIdentity } from "..";
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

  useEffect(() => {
    console.log({ user });
    if (!user && globalProvider) {
      console.log("clearing locale");
      return (globalProvider.context = undefined);
    }
    console.log("fetching locale");
    fetch({});
  }, [user]);

  const [fetch, { data }] = useLazyQuery(GET_LOCALE);
  const locale = data?.viewer?.locale;

  console.log({ locale });

  if (!globalProvider) {
    // Lazily creates a global provider
    window.squatchLocale = new ContextProvider<string>({
      element: document.documentElement,
      initialState: locale || window.widgetIdent?.locale || undefined,
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
