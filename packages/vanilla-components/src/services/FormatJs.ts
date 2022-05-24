import IntlMessageFormat from "intl-messageformat";
import IntRelativeFormat from "intl-relativeformat";

const FormatJS = {
  format(msg: string, values: { [key: string]: any }): string {
    var locale = ((<any>window).widgetIdent.locale || "en-US").replace(
      "_",
      "-"
    );
    var format = new IntlMessageFormat(msg, locale);
    return format.format(values);
  },
  formatRelative(value: string | number) {
    var locale = ((<any>window).widgetIdent.locale || "en-US").replace(
      "_",
      "-"
    );
    var relative = new IntRelativeFormat(locale);
    return relative.format(value);
  },
};

export default FormatJS;
