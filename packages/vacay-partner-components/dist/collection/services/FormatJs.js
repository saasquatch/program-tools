import IntlMessageFormat from 'intl-messageformat';
import IntRelativeFormat from 'intl-relativeformat';
const FormatJS = {
    format(msg, values) {
        var locale = (window.widgetIdent.locale || 'en-US').replace('_', '-');
        var format = new IntlMessageFormat(msg, locale);
        return format.format(values);
    },
    formatRelative(value) {
        var locale = (window.widgetIdent.locale || 'en-US').replace('_', '-');
        var relative = new IntRelativeFormat(locale);
        return relative.format(value);
    },
};
// Intl polyfill: https://github.com/andyearnshaw/Intl.js
function fromPolyfillService() {
    if (!window['Intl']) {
        var script = document.createElement('script');
        script.src = "https://polyfillz.herokuapp.com/v2/polyfill.min.js?features=Intl.~locale.en";
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}
fromPolyfillService();
export default FormatJS;
