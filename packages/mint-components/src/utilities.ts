import { IntlMessageFormat } from "intl-messageformat";


export function formatMessage(
  message: string,
  locale: string,
  variables: Record<string, any>
) {
  return new IntlMessageFormat(message, locale).format(variables);
}
