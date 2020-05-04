import IntlMessageFormat from "intl-messageformat";
import IntlRelativeTimeFormat from "@formatjs/intl-relativetimeformat";
import { selectUnit } from "@formatjs/intl-utils";

const FormatJS = {
  format(msg: string, values: { [key: string]: any }): string {
    var locale = ((<any>window).widgetIdent.locale || "en-US").replace(
      "_",
      "-"
    );
    var format = new IntlMessageFormat(msg, locale);
    return format.format(values);
  },
  formatRelative(value: number | Date) {
    var locale = ((<any>window).widgetIdent.locale || "en-US").replace(
      "_",
      "-"
    );
    const diff = selectUnit(value);

    return new IntlRelativeTimeFormat(locale, { numeric: "auto" }).format(
      diff.value,
      diff.unit
    );
  },
};

// Intl polyfill: https://github.com/andyearnshaw/Intl.js
function fromPolyfillService() {
  if (!window["Intl"]) {
    var script = document.createElement("script");
    script.src =
      "https://polyfillz.herokuapp.com/v2/polyfill.min.js?features=Intl.~locale.en";
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}

fromPolyfillService();

export default FormatJS;
