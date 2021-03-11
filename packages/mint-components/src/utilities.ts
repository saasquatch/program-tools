import { IntlShape } from "@formatjs/intl";
import { selectUnit } from "@formatjs/intl-utils";
import { IntlMessageFormat } from "intl-messageformat";

export function formatRelativeTimestamp(
  intl: IntlShape<string>,
  timestamp: number
) {
  const diff = selectUnit(timestamp);
  return intl.formatRelativeTime(diff.value, diff.unit, { numeric: "auto" });
}

export function formatMessage(
  message: string,
  locale: string,
  variables: Record<string, any>
) {
  return new IntlMessageFormat(message, locale).format(variables);
}

//
// OLD STUFF BELOW HERE
//

/////////////////////////////////////
//////                           ////
/////  Color Utility Functions  /////
////                           //////
/////////////////////////////////////

export const cutHex = (hex) => {
  return hex.charAt(0) == "#" ? hex.substring(1) : hex;
};

export const cutRgb = (rgb) => {
  return rgb.substring(4, rgb.length - 1);
};

export const hexToRgb = (hex) => {
  const noHex = cutHex(hex);
  const r = parseInt(noHex.substring(0, 2), 16);
  const g = parseInt(noHex.substring(2, 4), 16);
  const b = parseInt(noHex.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

export const isHex = (string) => {
  return !!string.match(/^#[0-9a-f]{6}$/i);
};

export const isRgb = (string) => {
  const rgbArray = cutRgb(string).split(", ");
  if (rgbArray.length !== 3) return false;
  return rgbArray.every((x) => parseInt(x) >= 0 && parseInt(x) <= 255);
};

export const shadeColor = (color, percent) => {
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

export const hasClass = (el, className) => {
  if (el.classList) return el.classList.contains(className);
  else
    return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
};

export const addClass = (el, className) => {
  if (el.classList) {
    el.classList.add(className);
  } else if (!hasClass(el, className)) {
    el.className += " " + className;
  }
};

export const removeClass = (el, className) => {
  if (el.classList) {
    el.classList.remove(className);
  } else if (hasClass(el, className)) {
    const reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
};

export const detectMobileSafari = () => {
  return /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(
    window.navigator.userAgent
  );
};

export const detectMobileChrome = () => {
  return window.navigator.userAgent.match("CriOS");
};

export const uuid = function b(a = undefined): string {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : // @ts-ignore
      // https://gist.github.com/jed/982883
      ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};
