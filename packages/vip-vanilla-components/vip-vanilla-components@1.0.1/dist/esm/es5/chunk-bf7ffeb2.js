/////////////////////////////////////
//////                           ////
/////  Color Utility Functions  /////
////                           //////
/////////////////////////////////////
var cutHex = function (hex) {
    return (hex.charAt(0) == "#") ? hex.substring(1) : hex;
};
var cutRgb = function (rgb) {
    return (rgb.substring(4, rgb.length - 1));
};
var hexToRgb = function (hex) {
    var noHex = cutHex(hex);
    var r = parseInt(noHex.substring(0, 2), 16);
    var g = parseInt(noHex.substring(2, 4), 16);
    var b = parseInt(noHex.substring(4, 6), 16);
    return "rgb(" + r + ", " + g + ", " + b + ")";
};
var isHex = function (string) {
    return !!string.match(/^#[0-9a-f]{6}$/i);
};
var isRgb = function (string) {
    var rgbArray = cutRgb(string).split(", ");
    if (rgbArray.length !== 3)
        return false;
    return rgbArray.every(function (x) { return parseInt(x) >= 0 && parseInt(x) <= 255; });
};
var shadeColor = function (color, percent) {
    if (!isHex(color) && !isRgb(color))
        return;
    var rgb = (isHex(color)) ? hexToRgb(color) : color;
    var decimalPercent = percent / 100;
    var shadedArray = cutRgb(rgb).split(", ").map(function (n) { return Math.floor(parseInt(n) * (1 - decimalPercent)); });
    return "rgb(" + shadedArray.join(", ") + ")";
};
/////////////////////
//////           ////
/////  Exports  /////
////           //////
/////////////////////
var hasClass = function (el, className) {
    if (el.classList)
        return el.classList.contains(className);
    else
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};
var addClass = function (el, className) {
    if (el.classList) {
        el.classList.add(className);
    }
    else if (!hasClass(el, className)) {
        el.className += " " + className;
    }
};
var removeClass = function (el, className) {
    if (el.classList) {
        el.classList.remove(className);
    }
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
};
var detectMobileSafari = function () {
    return /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(window.navigator.userAgent);
};
// @ts-ignore
// https://gist.github.com/jed/982883
var uuid = function b(a) {
    if (a === void 0) { a = undefined; }
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};
export { shadeColor as a, addClass as b, removeClass as c, uuid as d, detectMobileSafari as e };
