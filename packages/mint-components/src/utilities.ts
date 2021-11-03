// import { IntlMessageFormat } from 'intl-messageformat';

// export function formatMessage(message: string, locale: string, variables: Record<string, any>) {
//   return new IntlMessageFormat(message, locale).format(variables);
// }

// TODO fix IntlMessageFormat
import { useState, useEffect, useCallback } from "@saasquatch/universal-hooks";

export function formatMessage(message: string, locale: string, variables: Record<string, any>) {
  return message + locale + variables;
}


export function isMobile(breakPoint: number): boolean {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowResize = useCallback(() => setWidth(window.innerWidth), []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width > breakPoint ? false : true;
}