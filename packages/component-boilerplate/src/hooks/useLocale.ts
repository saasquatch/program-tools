import { LocaleContext } from "../context";

/**
 * Use the Locale in the SaaSquatch format. Uses the user's locale when there's a user in context, otherwise defaults to browser locale.
 *
 * @returns the locale in SaaSquatch format e.g. en_US -- does NOT return browser format (e.g. en-US);
 */
export default function useLocale() {
  const sqLocale = LocaleContext.useContext();
  return sqLocale;
}
