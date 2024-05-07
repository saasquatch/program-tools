import { ContextProvider } from "dom-context";
import { LOCALE_CONTEXT_NAME } from "../types";
import { debug as _debug } from "../debug";

const debug = (...args: any[]) => _debug(LOCALE_CONTEXT_NAME, ...args);

export function validateLocale(locale?: string) {
  if (locale && /^[a-z]{2}(_(?:[A-Z]{2}|[0-9]{3}))?$/.test(locale)) {
    return locale;
  }
}

/**
 * Lazily start the locale context provider. If it already exists, the existing provider is
 * returned. This function is safe to call multiple times.
 *
 * @returns The global locale context provider
 */
export function lazilyStartLocaleContext() {
  let globalProvider = window.squatchLocale;

  if (!globalProvider) {
    debug("Creating locale context provider");

    const locale =
      window.widgetIdent?.locale ??
      validateLocale(navigator.language.replaceAll("-", "_"));

    debug("initializing with locale:", locale);

    globalProvider = new ContextProvider<string | undefined>({
      element: document.documentElement,
      initialState: locale,
      contextName: LOCALE_CONTEXT_NAME,
    }).start();

    window.squatchLocale = globalProvider;
  }

  return globalProvider;
}

/**
 * Overide the globally defined Locale context
 *
 * @param locale the new locale used by the user
 */
export function setLocale(locale?: string) {
  const globalProvider = lazilyStartLocaleContext();
  if (globalProvider.context !== locale) {
    debug(`Setting locale context value [${locale}]`);
    globalProvider.context = locale;
  }
}

/**
 * Get the current value of the locale context
 */
export function getLocale() {
  return window.squatchLocale?.context;
}
