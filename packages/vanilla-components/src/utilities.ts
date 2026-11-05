/////////////////////////////////////
//////                           ////
/////  Color Utility Functions  /////
////                           //////
/////////////////////////////////////

const cutHex = (hex) => {
  return hex.charAt(0) == "#" ? hex.substring(1) : hex;
};

const cutRgb = (rgb) => {
  return rgb.substring(4, rgb.length - 1);
};

const hexToRgb = (hex) => {
  const noHex = cutHex(hex);
  const r = parseInt(noHex.substring(0, 2), 16);
  const g = parseInt(noHex.substring(2, 4), 16);
  const b = parseInt(noHex.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const isHex = (string) => {
  return !!string.match(/^#[0-9a-f]{6}$/i);
};

const isRgb = (string) => {
  const rgbArray = cutRgb(string).split(", ");
  if (rgbArray.length !== 3) return false;
  return rgbArray.every((x) => parseInt(x) >= 0 && parseInt(x) <= 255);
};

const shadeColor = (color, percent) => {
  if (!isHex(color) && !isRgb(color)) return;
  const rgb = isHex(color) ? hexToRgb(color) : color;
  const decimalPercent = percent / 100;
  const shadedArray = cutRgb(rgb)
    .split(", ")
    .map((n) => {
      return Math.floor(parseInt(n) * (1 - decimalPercent));
    });
  return `rgb(${shadedArray.join(", ")})`;
};

/////////////////////
//////           ////
/////  Exports  /////
////           //////
/////////////////////

const hasClass = (el, className) => {
  if (el.classList) return el.classList.contains(className);
  else
    return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
};

const addClass = (el, className) => {
  if (el.classList) {
    el.classList.add(className);
  } else if (!hasClass(el, className)) {
    el.className += " " + className;
  }
};

const removeClass = (el, className) => {
  if (el.classList) {
    el.classList.remove(className);
  } else if (hasClass(el, className)) {
    const reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
};

const detectMobileSafari = () => {
  return /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(
    window.navigator.userAgent
  );
};

const detectMobileChrome = () => {
  return window.navigator.userAgent.match("CriOS");
};

// @ts-ignore
// https://gist.github.com/jed/982883
const uuid = function b(a = undefined) {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};

/**
 * Decides whether a background value should be treated as an image URL
 * (as opposed to a CSS color). The check is anchored to the start of the
 * value and runs in linear time: an unanchored pattern would rescan the
 * remaining suffix at every word boundary, freezing the widget on long
 * non-URL values (e.g. "a.".repeat(32000) + "!") since it runs
 * synchronously in render(). Embedded URLs are intentionally unsupported.
 */
const isUrl = (value: string): boolean => {
  return /^(?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|(?:\/\/)?(?:www\d{0,3}\.|[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,4}\/))/i.test(
    value.trim()
  );
};

export {
  shadeColor,
  addClass,
  removeClass,
  detectMobileSafari,
  detectMobileChrome,
  uuid,
  isUrl,
};
