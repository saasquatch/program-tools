import IntlMessageFormat from 'intl-messageformat';
import IntRelativeFormat from 'intl-relativeformat';

const FormatJS = {
    format(msg:string, values:Object|Array<any>):string{
        var format = new IntlMessageFormat(msg, 'en-US');
        return format.format(values);
    },
    formatRelative(value: string) {
      var locale = ((<any>window).widgetIdent.locale || 'en-US').replace('_', '-');
      var relative = new IntRelativeFormat(locale);
      return relative.format(value);
  },
};


// Intl polyfill: https://github.com/andyearnshaw/Intl.js
function fromPolyfillService(){
    if(!window['Intl']){
        var script = document.createElement('script');
        script.src = "https://polyfillz.herokuapp.com/v2/polyfill.min.js?features=Intl.~locale.en";
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}

fromPolyfillService();

export default FormatJS;