import { ContextListener } from "dom-context";
import { USER_CONTEXT_NAME, LOCALE_CONTEXT_NAME } from "./types";
import { UserIdentity } from "./types";
import { lazilyStartLocaleContext } from "./contexts/LocaleContext";
import { fetchLocale } from "./fetchLocale";
import { debug as _debug } from "./debug";

const debug = (...args: any[]) => _debug(LOCALE_CONTEXT_NAME, ...args);

const userContextListenerDiv = (() => {
  const id = "__environment_context_listener";
  let div = document.getElementById(id);
  if (!div) {
    div = document.createElement("div");
    div.id = id;
    document.documentElement.appendChild(div);
  }
  return div;
})();

// Listens to user changes and refetches the locale from GraphQL
const userContextListenerForLocale = new ContextListener<
  UserIdentity | undefined
>({
  contextName: USER_CONTEXT_NAME,
  element: userContextListenerDiv,
  onChange: async (next) => {
    const localeProvider = lazilyStartLocaleContext();
    const defaultLocale =
      window.widgetIdent?.locale || navigator.language.replace("-", "_");

    let newLocale;
    if (next) {
      debug("User context changed, refetching locale");
      const locale = await fetchLocale();
      if (localeProvider.context !== locale) {
        debug(`New value fetched from GraphQL [${locale}]`);
        newLocale = locale || defaultLocale;
      }
    } else {
      newLocale = defaultLocale;
    }

    debug(`Setting locale context to [${newLocale}]`);
    localeProvider.context = newLocale;
  },
  onStatus: (status) => debug("STATUS", status),
});

export function startUserContextListenerForLocale() {
  debug("Starting user context listener for locale updates");
  userContextListenerForLocale.start();
}
