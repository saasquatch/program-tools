import IntlMessageFormat from 'intl-messageformat';

const FormatJS = {
    format(msg:string, values:Object|Array<any>):string{
        var format = new IntlMessageFormat(msg, 'en-US');
        return format.format(values);
    }
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