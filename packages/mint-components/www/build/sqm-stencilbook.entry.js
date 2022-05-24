import { h as h$1, r as registerInstance, j as Host } from './index-832bd454.js';
import { a as commonjsGlobal, k as useMemo, m as useState, i as useEffect, c as createCommonjsModule, n as h$2 } from './stencil-hooks.module-f4b05383.js';
import { S as ShareButtonView, u as useShareButton } from './useShareButton-eca397a6.js';
import { S as ShareLinkView } from './sqm-share-link-view-9a6d536e.js';
import { B as BigStatView } from './sqm-big-stat-view-55b6aa0c.js';
import { L as LeaderboardView, u as useLeaderboard, S as ShadowViewAddon } from './useLeaderboard-f7cb2d02.js';
import { b as dn, l as ln, e as ae$1, d as dist, _ as _e, f as A$1 } from './index.module-b74a7f69.js';
import { L as LeaderboardRankView } from './sqm-leaderboard-rank-view-187f6857.js';
import { P as PortalFrameView } from './sqm-portal-frame-view-631178f9.js';
import { E as EditProfileView } from './sqm-edit-profile-view-7b3c5166.js';
import { u as useShareLink } from './useShareLink-5d7ea339.js';
import { a as useBigStat, u as useDemoBigStat } from './useDemoBigStat-604b848c.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { N as NavigationSidebarView } from './sqm-navigation-sidebar-view-3b9dd3e0.js';
import { N as NavigationSidebarItemView } from './sqm-navigation-sidebar-item-view-267646a8.js';
import { P as PortalSectionView } from './sqm-portal-section-view-5c942599.js';
import { P as PortalContainerView } from './sqm-portal-container-view-79dfef65.js';
import { S as StatContainerView } from './sqm-stat-container-view-5dff82d8.js';
import { P as PortalProfileView } from './sqm-portal-profile-view-f16e432c.js';
import { P as PortalChangePasswordView } from './sqm-portal-change-password-view-0cd1cdf3.js';
import { P as PortalLoginView } from './sqm-portal-login-view-dd89ca61.js';
import { P as PortalRegisterView } from './sqm-portal-register-view-0e0c90c1.js';
import { P as PortalForgotPasswordView } from './sqm-portal-forgot-password-view-ab5384e4.js';
import { P as PortalEmailVerificationView } from './sqm-portal-email-verification-view-4a30b876.js';
import { P as PortalResetPasswordView } from './sqm-portal-reset-password-view-28ca5291.js';
import { P as PortalVerifyEmailView } from './sqm-portal-verify-email-view-f40aa0a5.js';
import { A as AssetCardView } from './sqm-asset-card-view-d0b1e050.js';
import { G as GenericTableView } from './GenericTableView-be56be51.js';
import { l as luxon } from './luxon-1decee23.js';
import { T as TaskCardView, P as ProgressBarView } from './sqm-task-card-view-c3bf45cd.js';
import { a as PoweredByImg$1, P as PortalFooterView } from './sqm-portal-footer-view-ad47bb93.js';
import { H as HeroView } from './sqm-hero-view-44303932.js';
import { R as ReferralIframeView } from './sqm-referral-iframe-view-47de5357.js';
import { N as NameFieldsView } from './sqm-name-fields-view-e7dad2ee.js';
import { R as RewardExchangeView } from './sqm-reward-exchange-list-view-3e6f2b70.js';
import { C as CardFeedView } from './sqm-card-feed-view-f0e16f3c.js';
import { a as autoColorScaleCss } from './AutoColor-a6e72867.js';
import './mixins-d2de6ff8.js';
import './extends-c31f1eff.js';
import './cjs-e829b75b.js';
import './index-eccbb333.js';
import './sqm-text-span-view-6c68cc9a.js';
import './global-b1f18590.js';
import './insertcss-d82cf6d6.js';
import './utils-48175026.js';

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsAstral = '[' + rsAstralRange + ']',
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
  rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr,
  rsUpper + '+' + rsOptUpperContr,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 'ss'
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @static
 * @memberOf _
 * @since 3.1.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the start cased string.
 * @example
 *
 * _.startCase('--foo-bar--');
 * // => 'Foo Bar'
 *
 * _.startCase('fooBar');
 * // => 'Foo Bar'
 *
 * _.startCase('__FOO_BAR__');
 * // => 'FOO BAR'
 */
var startCase = createCompounder(function(result, word, index) {
  return result + (index ? ' ' : '') + upperFirst(word);
});

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

var lodash_startcase = startCase;

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        before = _this.prepend ? _this.container.firstChild : _this.before;
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? "development" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if ("development" !== 'production') {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if ("development" !== 'production' && !/:(-moz-placeholder|-ms-input-placeholder|-moz-read-write|-moz-read-only){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    if ("development" !== 'production') {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();

var e="-ms-";var r="-moz-";var a$1="-webkit-";var c$1="comm";var n="rule";var t="decl";var s$1="@page";var u$1="@media";var i$1="@import";var f$1="@charset";var o="@viewport";var l$1="@supports";var v="@document";var h="@namespace";var p$1="@keyframes";var b="@font-face";var w="@counter-style";var $="@font-feature-values";var k=Math.abs;var d$1=String.fromCharCode;function m(e,r){return (((r<<2^z(e,0))<<2^z(e,1))<<2^z(e,2))<<2^z(e,3)}function g(e){return e.trim()}function x(e,r){return (e=r.exec(e))?e[0]:e}function y(e,r,a){return e.replace(r,a)}function j(e,r){return e.indexOf(r)}function z(e,r){return e.charCodeAt(r)|0}function C(e,r,a){return e.slice(r,a)}function A(e){return e.length}function M(e){return e.length}function O(e,r){return r.push(e),e}function S(e,r){return e.map(r).join("")}var q=1;var B=1;var D=0;var E=0;var F=0;var G="";function H(e,r,a,c,n,t,s){return {value:e,root:r,parent:a,type:c,props:n,children:t,line:q,column:B,length:s,return:""}}function I(e,r,a){return H(e,r.root,r.parent,a,r.props,r.children,0)}function J(){return F}function K(){F=E>0?z(G,--E):0;if(B--,F===10)B=1,q--;return F}function L(){F=E<D?z(G,E++):0;if(B++,F===10)B=1,q++;return F}function N(){return z(G,E)}function P(){return E}function Q(e,r){return C(G,e,r)}function R(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function T(e){return q=B=1,D=A(G=e),E=0,[]}function U(e){return G="",e}function V(e){return g(Q(E-1,_(e===91?e+2:e===40?e+1:e)))}function W(e){return U(Y(T(e)))}function X(e){while(F=N())if(F<33)L();else break;return R(e)>2||R(F)>3?"":" "}function Y(e){while(L())switch(R(F)){case 0:O(re(E-1),e);break;case 2:O(V(F),e);break;default:O(d$1(F),e);}return e}function Z(e,r){while(--r&&L())if(F<48||F>102||F>57&&F<65||F>70&&F<97)break;return Q(e,P()+(r<6&&N()==32&&L()==32))}function _(e){while(L())switch(F){case e:return E;case 34:case 39:return _(e===34||e===39?e:F);case 40:if(e===41)_(e);break;case 92:L();break}return E}function ee(e,r){while(L())if(e+F===47+10)break;else if(e+F===42+42&&N()===47)break;return "/*"+Q(r,E-1)+"*"+d$1(e===47?e:L())}function re(e){while(!R(N()))L();return Q(e,E)}function ae(e){return U(ce("",null,null,null,[""],e=T(e),0,[0],e))}function ce(e,r,a,c,n,t,s,u,i){var f=0;var o=0;var l=s;var v=0;var h=0;var p=0;var b=1;var w=1;var $=1;var k=0;var m="";var g=n;var x=t;var j=c;var z=m;while(w)switch(p=k,k=L()){case 34:case 39:case 91:case 40:z+=V(k);break;case 9:case 10:case 13:case 32:z+=X(p);break;case 92:z+=Z(P()-1,7);continue;case 47:switch(N()){case 42:case 47:O(te(ee(L(),P()),r,a),i);break;default:z+="/";}break;case 123*b:u[f++]=A(z)*$;case 125*b:case 59:case 0:switch(k){case 0:case 125:w=0;case 59+o:if(h>0&&A(z)-l)O(h>32?se(z+";",c,a,l-1):se(y(z," ","")+";",c,a,l-2),i);break;case 59:z+=";";default:O(j=ne(z,r,a,f,o,n,u,m,g=[],x=[],l),t);if(k===123)if(o===0)ce(z,r,j,j,g,t,l,u,x);else switch(v){case 100:case 109:case 115:ce(e,j,j,c&&O(ne(e,j,j,0,0,n,u,m,n,g=[],l),x),n,x,l,u,c?g:x);break;default:ce(z,j,j,j,[""],x,l,u,x);}}f=o=h=0,b=$=1,m=z="",l=s;break;case 58:l=1+A(z),h=p;default:if(b<1)if(k==123)--b;else if(k==125&&b++==0&&K()==125)continue;switch(z+=d$1(k),k*b){case 38:$=o>0?1:(z+="\f",-1);break;case 44:u[f++]=(A(z)-1)*$,$=1;break;case 64:if(N()===45)z+=V(L());v=N(),o=A(m=z+=re(P())),k++;break;case 45:if(p===45&&A(z)==2)b=0;}}return t}function ne(e,r,a,c,t,s,u,i,f,o,l){var v=t-1;var h=t===0?s:[""];var p=M(h);for(var b=0,w=0,$=0;b<c;++b)for(var d=0,m=C(e,v+1,v=k(w=u[b])),x=e;d<p;++d)if(x=g(w>0?h[d]+" "+m:y(m,/&\f/g,h[d])))f[$++]=x;return H(e,r,a,t===0?n:i,f,o,l)}function te(e,r,a){return H(e,r,a,c$1,d$1(J()),C(e,2,-2),0)}function se(e,r,a,c){return H(e,r,a,t,C(e,0,c),C(e,c+1,-1),c)}function ue(c,n){switch(m(c,n)){case 5103:return a$1+"print-"+c+c;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return a$1+c+c;case 5349:case 4246:case 4810:case 6968:case 2756:return a$1+c+r+c+e+c+c;case 6828:case 4268:return a$1+c+e+c+c;case 6165:return a$1+c+e+"flex-"+c+c;case 5187:return a$1+c+y(c,/(\w+).+(:[^]+)/,a$1+"box-$1$2"+e+"flex-$1$2")+c;case 5443:return a$1+c+e+"flex-item-"+y(c,/flex-|-self/,"")+c;case 4675:return a$1+c+e+"flex-line-pack"+y(c,/align-content|flex-|-self/,"")+c;case 5548:return a$1+c+e+y(c,"shrink","negative")+c;case 5292:return a$1+c+e+y(c,"basis","preferred-size")+c;case 6060:return a$1+"box-"+y(c,"-grow","")+a$1+c+e+y(c,"grow","positive")+c;case 4554:return a$1+y(c,/([^-])(transform)/g,"$1"+a$1+"$2")+c;case 6187:return y(y(y(c,/(zoom-|grab)/,a$1+"$1"),/(image-set)/,a$1+"$1"),c,"")+c;case 5495:case 3959:return y(c,/(image-set\([^]*)/,a$1+"$1"+"$`$1");case 4968:return y(y(c,/(.+:)(flex-)?(.*)/,a$1+"box-pack:$3"+e+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+a$1+c+c;case 4095:case 3583:case 4068:case 2532:return y(c,/(.+)-inline(.+)/,a$1+"$1$2")+c;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(A(c)-1-n>6)switch(z(c,n+1)){case 109:if(z(c,n+4)!==45)break;case 102:return y(c,/(.+:)(.+)-([^]+)/,"$1"+a$1+"$2-$3"+"$1"+r+(z(c,n+3)==108?"$3":"$2-$3"))+c;case 115:return ~j(c,"stretch")?ue(y(c,"stretch","fill-available"),n)+c:c}break;case 4949:if(z(c,n+1)!==115)break;case 6444:switch(z(c,A(c)-3-(~j(c,"!important")&&10))){case 107:return y(c,":",":"+a$1)+c;case 101:return y(c,/(.+:)([^;!]+)(;|!.+)?/,"$1"+a$1+(z(c,14)===45?"inline-":"")+"box$3"+"$1"+a$1+"$2$3"+"$1"+e+"$2box$3")+c}break;case 5936:switch(z(c,n+11)){case 114:return a$1+c+e+y(c,/[svh]\w+-[tblr]{2}/,"tb")+c;case 108:return a$1+c+e+y(c,/[svh]\w+-[tblr]{2}/,"tb-rl")+c;case 45:return a$1+c+e+y(c,/[svh]\w+-[tblr]{2}/,"lr")+c}return a$1+c+e+c+c}return c}function ie(e,r){var a="";var c=M(e);for(var n=0;n<c;n++)a+=r(e[n],n,e,r)||"";return a}function fe(e,r,a,s){switch(e.type){case i$1:case t:return e.return=e.return||e.value;case c$1:return "";case n:e.value=e.props.join(",");}return A(a=ie(e.children,s))?e.return=e.value+"{"+a+"}":""}function oe(e){var r=M(e);return function(a,c,n,t){var s="";for(var u=0;u<r;u++)s+=e[u](a,c,n,t)||"";return s}}function le(e){return function(r){if(!r.root)if(r=r.return)e(r);}}function ve(c,s,u,i){if(!c.return)switch(c.type){case t:c.return=ue(c.value,c.length);break;case p$1:return ie([I(y(c.value,"@","@"+a$1),c,"")],i);case n:if(c.length)return S(c.props,(function(n){switch(x(n,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return ie([I(y(n,/:(read-\w+)/,":"+r+"$1"),c,"")],i);case"::placeholder":return ie([I(y(n,/:(plac\w+)/,":"+a$1+"input-$1"),c,""),I(y(n,/:(plac\w+)/,":"+r+"$1"),c,""),I(y(n,/:(plac\w+)/,e+"input-$1"),c,"")],i)}return ""}))}}function he(e){switch(e.type){case n:e.props=e.props.map((function(r){return S(W(r),(function(r,a,c){switch(z(r,0)){case 12:return C(r,1,A(r));case 0:case 40:case 43:case 62:case 126:return r;case 58:if(c[++a]==="global")c[a]="",c[++a]="\f"+C(c[a],a=1,-1);case 32:return a===1?"":r;default:switch(a){case 0:e=r;return M(c)>1?"":r;case a=M(c)-1:case 2:return a===2?r+e+e:r+e;default:return r}}}))}));}}

var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var last = function last(arr) {
  return arr.length ? arr[arr.length - 1] : null;
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch (R(character)) {
      case 0:
        // &\f
        if (character === 38 && N() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += re(E - 1);
        break;

      case 2:
        parsed[index] += V(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = N() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += d$1(character);
    }
  } while (character = L());

  return parsed;
};

var getRules = function getRules(value, points) {
  return U(toRules(T(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // .length indicates if this rule contains pseudo or not
  !element.length) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};
var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';

var isIgnoringComment = function isIgnoringComment(element) {
  return !!element && element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};

var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule') return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);

    if (unsafePseudoClasses && cache.compat !== true) {
      var prevElement = index > 0 ? children[index - 1] : null;

      if (prevElement && isIgnoringComment(last(prevElement.children))) {
        return;
      }

      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};

var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};

var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }

  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user


var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};

var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }

  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

var defaultStylisPlugins = [ve];

var createCache = function createCache(options) {
  var key = options.key;

  if ("development" !== 'production' && !key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
  }

  if ( key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  if ("development" !== 'production') {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {}; // $FlowFixMe

  var container;
  var nodesToHydrate = [];

  {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  if ("development" !== 'production') {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }

    }), incorrectImportAlarm);
  }

  {
    var currentSheet;
    var finalizingPlugins = [fe, "development" !== 'production' ? function (element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== c$1) {
          // insert empty rule in non-production environments
          // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
          currentSheet.insert(element.value + "{}");
        }
      }
    } : le(function (rule) {
      currentSheet.insert(rule);
    })];
    var serializer = oe(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return ie(ae(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      if ("development" !== 'production' && serialized.map !== undefined) {
        currentSheet = {
          insert: function insert(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if ("development" !== 'production') {
  var contentValuePattern = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  var contentValues = ['normal', 'none', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if ("development" !== 'production' && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error('Component selectors can only be used in conjunction with @emotion/babel-plugin.');
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if ("development" !== 'production' && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else if ("development" !== 'production') {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if ("development" !== 'production') {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with @emotion/babel-plugin.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if ("development" !== 'production' && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;

if ("development" !== 'production') {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if ("development" !== 'production' && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      if ("development" !== 'production' && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if ("development" !== 'production') {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmur2(styles) + identifierName;

  if ("development" !== 'production') {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};

var isBrowser = "object" !== 'undefined';
function getRegisteredStyles$1(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};

function insertWithoutScoping(cache, serialized) {
  if (cache.inserted[serialized.name] === undefined) {
    return cache.insert('', serialized, cache.sheet, true);
  }
}

function merge$1(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles$1(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var createEmotion = function createEmotion(options) {
  var cache = createCache(options); // $FlowFixMe

  cache.sheet.speedy = function (value) {
    if ("development" !== 'production' && this.ctr !== 0) {
      throw new Error('speedy must be changed before any rules are inserted');
    }

    this.isSpeedy = value;
  };

  cache.compat = true;

  var css = function css() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = serializeStyles(args, cache.registered, undefined);
    insertStyles(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var keyframes = function keyframes() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var serialized = serializeStyles(args, cache.registered);
    var animation = "animation-" + serialized.name;
    insertWithoutScoping(cache, {
      name: serialized.name,
      styles: "@keyframes " + animation + "{" + serialized.styles + "}"
    });
    return animation;
  };

  var injectGlobal = function injectGlobal() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var serialized = serializeStyles(args, cache.registered);
    insertWithoutScoping(cache, serialized);
  };

  var cx = function cx() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return merge$1(cache.registered, css, classnames(args));
  };

  return {
    css: css,
    cx: cx,
    injectGlobal: injectGlobal,
    keyframes: keyframes,
    hydrate: function hydrate(ids) {
      ids.forEach(function (key) {
        cache.inserted[key] = true;
      });
    },
    flush: function flush() {
      cache.registered = {};
      cache.inserted = {};
      cache.sheet.flush();
    },
    // $FlowFixMe
    sheet: cache.sheet,
    cache: cache,
    getRegisteredStyles: getRegisteredStyles$1.bind(null, cache.registered),
    merge: merge$1.bind(null, cache.registered, css)
  };
};

var classnames = function classnames(args) {
  var cls = '';

  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

var _createEmotion = createEmotion({
  key: 'css'
}),
    flush = _createEmotion.flush,
    hydrate = _createEmotion.hydrate,
    cx = _createEmotion.cx,
    merge = _createEmotion.merge,
    getRegisteredStyles = _createEmotion.getRegisteredStyles,
    injectGlobal = _createEmotion.injectGlobal,
    keyframes = _createEmotion.keyframes,
    css = _createEmotion.css,
    sheet$1 = _createEmotion.sheet,
    cache = _createEmotion.cache;

function i(){return (i=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n[r]=o[r]);}return n}).apply(this,arguments)}function s(n,t){return t||(t=n.slice(0)),n.raw=t,n}var a,l,u,c=css(a||(a=s(['\n  width: 100vw;\n  height: 100vh;\n\n  .story-book-outer-div {\n    .story-div {\n      font-family: "Arial", sans-serif;\n      font-size: 12px;\n    }\n    padding-bottom: 500px;\n  }\n\n  .story-div {\n    position: fixed;\n    box-sizing: border-box;\n    top: 0;\n    width: 250px;\n    height: 100vh;\n    z-index: 999;\n    overflow-y: scroll;\n    background: white;\n    margin-bottom: 32px;\n  }\n\n  .header {\n    padding: 24px 0 16px 16px;\n    margin-bottom: 24px;\n    color: white;\n    background: #333;\n    cursor: pointer;\n\n    h2 {\n      letter-spacing: 3px;\n      font-weight: 400;\n    }\n  }\n\n  .parentStoryList {\n    list-style: none;\n    padding-left: 16px;\n\n    summary {\n      margin-bottom: 4px;\n    }\n  }\n  .parentStory {\n    cursor: pointer;\n  }\n  .parentStory.selected {\n    font-weight: bold;\n  }\n\n  .subStory {\n    font-size: 12px;\n    cursor: pointer;\n    line-height: 1.5em;\n    margin-top: 4px;\n\n    a {\n      display: block;\n      padding: 4px 4px 4px 16px;\n    }\n  }\n  .subStory:hover {\n    background-color: #eee;\n  }\n  .subStory.selected {\n    background-color: lightgreen;\n  }\n\n  .component {\n    padding: 24px 16px;\n  }\n\n  h4.group-header {\n    margin: 8px 0;\n    text-transform: uppercase;\n    font-weight: 600;\n    font-size: 14px;\n    color: #575757;\n  }\n\n  .group-wrapper {\n    margin-bottom: 24px;\n  }\n\n  .dynamic-display-wrapper {\n    position: fixed;\n    display: flex;\n    flex-direction: column;\n    bottom: 0;\n    left: 100%;\n    padding: 16px;\n    z-index: 1000;\n    background: white;\n    transform: translateX(-100%);\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n\n    & > :not(:first-child) {\n      margin-top: 12px;\n    }\n\n    p {\n      font-size: 12px;\n      margin: 0;\n      padding: 0;\n    }\n\n    .button-wrapper {\n      display: flex;\n\n      & > :not(:first-child) {\n        margin-left: 12px;\n      }\n    }\n\n    & button {\n      border: 1px solid #eaeaea;\n      background: white;\n      border-radius: 4px;\n      color: #777;\n      padding: 4px 12px;\n      justify-content: center;\n      align-items: center;\n      text-align: center;\n\n      &.active {\n        background: #555;\n        border-color: #555;\n        color: white;\n      }\n    }\n  }\n'])));function p(n,t){var o,r=t.story.title.split("/"),e=r[1]?r[0]:"_";return i({},n,((o={})[e]=[].concat(n[e]||[],[{story:i({},t.story,{title:r[1]||r[0]}),subs:t.subs}]).sort(function(n,t){return n.story.title.localeCompare(t.story.title)}),o))}function d(n){return {story:n.default,subs:function(n,t){if(null==n)return {};var o,r,e={},i=Object.keys(n);for(r=0;r<i.length;r++)t.indexOf(o=i[r])>=0||(e[o]=n[o]);return e}(n,["default"])}}function f(a,f){var b=f.h,y=void 0===b?h$1:b,g=f.title,m=void 0===g?"Stencilbook":g,x=f.homepage,h=void 0===x?y("h3",null,"Select a story!"):x,v=f.addons,k=void 0===v?[]:v,w=useMemo(function(){return a.map(d).reduce(p,{_:[]})},a),S=useState(void 0),C=S[0],z=S[1],O=null==C?void 0:C.key,j=useState("desktop"),T=j[0],_=j[1],B=useState(!0),D=B[0],L=B[1],N=useState(!1),q=N[0],A=N[1],M=function(){return y("div",{class:"dynamic-display-wrapper"},y("div",{class:"button-wrapper"},y("button",{class:"desktop"===T?"active":"",onClick:function(){return _("desktop")}},"Desktop"),y("button",{class:"tablet"===T?"active":"",onClick:function(){return _("tablet")}},"Tablet"),y("button",{class:"mobile"===T?"active":"",onClick:function(){return _("mobile")}},"Mobile")),y("p",null,"Note: Currently doesn't test breakpoints, use the native tester for now"),y("hr",null),y("button",{class:q?"active":"",onClick:function(){return A(function(n){return !n})}},"Toggle Dark Background"),y("hr",null),y("button",{class:D?"active":"",onClick:function(){return L(function(n){return !n})}},"Toggle Sidebar"))},P="mobile"===T?"375px":"tablet"===T?"768px":"1124px",V=css(l||(l=s(["\n    max-width: ",";\n    margin-left: ",";\n  "])),P,D?"250px":"0px"),X=css(u||(u=s(["\n    display: none;\n  "])));document.body.style.backgroundColor=q?"#232323":"#fafafa";var E=function(n){var t=n.selected,o=k.reduce(function(n,o){return function(){return y(o,{story:i({},t)},y(n,null))}},null==t?void 0:t.story);return y(o,null)},F=function(){return y("div",{class:"story-book-outer-div"},y("div",{class:"story-div "+(D?"":X)},y("div",{class:"header",onClick:function(){z(void 0);}},y("h2",null,m)),y("ul",{class:"parentStoryList"},Object.keys(w).sort().map(function(n){return y("div",{class:"group-wrapper"},"_"!==n&&y("h4",{class:"group-header"},n),w[n].map(function(t){return y("li",{class:"parentStory"},y("details",{style:{marginBottom:"10px"}},y("summary",{style:{outline:"none"}},t.story.title),t.subs&&Object.keys(t.subs).map(function(o){var e=n+"/"+o,i=t.subs[o],s=i.storyName||lodash_startcase(o);return y("div",{class:"subStory "+(O===e?"selected":"")},y("a",{onClick:function(){return function(n,t,o,r){z({key:t,story:n,parent:o,label:r});}(i,e,t.story,s)}},s))})))}))}))),y(M,null),y("div",{class:"component "+V},!O&&h,O&&y("div",null,y("h3",null,C.label),y(E,{selected:C}))))};return {class:c,children:y(F,null),View:F,selected:C}}

const ShareButton_stories = {
  title: "Components/Share Button",
};
const WithIcon = () => {
  const props = { medium: "whatsapp", iconslot: "suffix" };
  return h$1(ShareButtonView, Object.assign({}, props), "Share");
};
const WithIconOverride = () => {
  const props = {
    medium: "facebook",
    icon: "person-badge",
    iconslot: "suffix",
  };
  return h$1(ShareButtonView, Object.assign({}, props), "Share");
};
const TextStyle = () => {
  const props = {
    medium: "facebook",
    type: "text",
    iconslot: "suffix",
  };
  return h$1(ShareButtonView, Object.assign({}, props), "Share");
};
const WithoutIcon = () => {
  const props = { medium: "facebook", hideicon: true };
  return h$1(ShareButtonView, Object.assign({}, props), "Share");
};
const WithoutText = () => {
  const props = { medium: "facebook", hidetext: true };
  return h$1(ShareButtonView, Object.assign({}, props), "Share");
};
const TextStyleWithoutIcon = () => {
  const props = { medium: "facebook", type: "text", hideicon: true };
  return h$1(ShareButtonView, Object.assign({}, props), "Share");
};
const WithCustomColors = () => {
  const props = {
    medium: "facebook",
    type: "text",
    backgroundcolor: "#3b5998",
    textcolor: "#fff",
    iconslot: "prefix",
  };
  return h$1(ShareButtonView, Object.assign({}, props), "Facebook");
};
const WithCustomBorderRadius = () => {
  const props = {
    medium: "facebook",
    type: "text",
    backgroundcolor: "#3b5998",
    textcolor: "#fff",
    borderradius: 8,
    iconslot: "prefix",
  };
  return h$1(ShareButtonView, Object.assign({}, props), "Facebook");
};
const FullStackIcon = () => {
  return (h$1("div", null,
    h$1("sqm-share-button", { medium: "facebook", iconslot: "prefix" },
      h$1("span", null, "Facebook")),
    h$1("br", null),
    h$1("sqm-share-button", { medium: "email", icon: "envelope", iconslot: "prefix" },
      h$1("span", null, "Email"))));
};
const AllMediums = () => {
  return (h$1("div", null,
    h$1("sqm-share-button", { medium: "facebook", iconslot: "prefix" },
      h$1("span", null, "Facebook")),
    h$1("br", null),
    h$1("sqm-share-button", { medium: "email", icon: "envelope", iconslot: "prefix" },
      h$1("span", null, "Email")),
    h$1("br", null),
    h$1("sqm-share-button", { medium: "whatsapp", icon: "whatsapp", iconslot: "prefix" },
      h$1("span", null, "WhatsApp")),
    h$1("br", null),
    h$1("sqm-share-button", { medium: "linkedin", iconslot: "prefix" },
      h$1("span", null, "Linkedin")),
    h$1("br", null),
    h$1("sqm-share-button", { medium: "twitter", iconslot: "prefix" },
      h$1("span", null, "Twitter")),
    h$1("br", null),
    h$1("sqm-share-button", { medium: "pinterest", iconslot: "prefix" },
      h$1("span", null, "Pinterest")),
    h$1("br", null),
    h$1("sqm-share-button", { medium: "fbmessenger", icon: "messenger", iconslot: "prefix" },
      h$1("span", null, "Messenger")),
    h$1("br", null),
    h$1("sqm-share-button", { medium: "sms", icon: "chat", iconslot: "prefix" },
      h$1("span", null, "SMS")),
    h$1("br", null),
    h$1("sqm-share-button", { medium: "linemessenger", icon: "line", iconslot: "prefix" },
      h$1("span", null, "Line Messenger"))));
};

const ShareButton = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ShareButton_stories,
  WithIcon: WithIcon,
  WithIconOverride: WithIconOverride,
  TextStyle: TextStyle,
  WithoutIcon: WithoutIcon,
  WithoutText: WithoutText,
  TextStyleWithoutIcon: TextStyleWithoutIcon,
  WithCustomColors: WithCustomColors,
  WithCustomBorderRadius: WithCustomBorderRadius,
  FullStackIcon: FullStackIcon,
  AllMediums: AllMediums
});

const ShareLink_stories = {
  title: "Components/Share Link",
};
const Default$b = () => {
  const props = {
    shareString: "https://noah.example.com",
    open: false,
    tooltiptext: "Copied!",
  };
  return h$1(ShareLinkView, Object.assign({}, props));
};
const Tooltip = () => {
  const props = {
    shareString: "https://noah.example.com",
    tooltiptext: "Some text for the tooltip",
    open: true,
  };
  return h$1(ShareLinkView, Object.assign({}, props));
};
const Disabled$1 = () => {
  const props = {
    shareString: "https://noah.example.com",
    disabled: true,
    open: true,
    tooltiptext: "Copied!",
  };
  return h$1(ShareLinkView, Object.assign({}, props));
};
const FullStack = () => {
  return h$1("sqm-share-link", null);
};

const ShareLink = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ShareLink_stories,
  Default: Default$b,
  Tooltip: Tooltip,
  Disabled: Disabled$1,
  FullStack: FullStack
});

const BigStat_stories = {
  title: "Components/Big Stat",
};
const Default$a = () => {
  const props = { value: 990000, statvalue: "9.900,00", loading: false };
  return h$1(BigStatView, Object.assign({}, props), "Big stat");
};
const LeftAlign = () => {
  const props = {
    value: 500,
    statvalue: "500",
    alignment: "left",
    loading: false,
  };
  return h$1(BigStatView, Object.assign({}, props), "Big stat");
};
const RightAlign = () => {
  const props = {
    value: 500,
    statvalue: "500",
    alignment: "right",
    loading: false,
  };
  return h$1(BigStatView, Object.assign({}, props), "Big stat");
};
const FlexReverse = () => {
  const props = {
    value: 500,
    statvalue: "500",
    flexReverse: true,
    loading: false,
  };
  return h$1(BigStatView, Object.assign({}, props), "Big stat");
};
const FlexReverseRight = () => {
  const props = {
    value: 500,
    statvalue: "500",
    flexReverse: true,
    alignment: "right",
    loading: false,
  };
  return h$1(BigStatView, Object.assign({}, props), "Big stat");
};
const FlexReverseLeft = () => {
  const props = {
    value: 500,
    statvalue: "500",
    flexReverse: true,
    alignment: "left",
    loading: false,
  };
  return h$1(BigStatView, Object.assign({}, props), "Big stat");
};
const NoStatValue = () => {
  const props = {
    value: 0,
    statvalue: "...",
    loading: false,
  };
  return h$1(BigStatView, Object.assign({}, props), "Big stat");
};
const InvalidStatValue = () => {
  const props = {
    value: 0,
    statvalue: "!!!",
    loading: false,
  };
  return h$1(BigStatView, Object.assign({}, props), "Big stat");
};

const BigStat = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': BigStat_stories,
  Default: Default$a,
  LeftAlign: LeftAlign,
  RightAlign: RightAlign,
  FlexReverse: FlexReverse,
  FlexReverseRight: FlexReverseRight,
  FlexReverseLeft: FlexReverseLeft,
  NoStatValue: NoStatValue,
  InvalidStatValue: InvalidStatValue
});

const Leaderboard_stories = {
  title: "Components/Leaderboard",
  parameters: {
    tagname: "sqm-leaderboard",
  },
};
const defaultStyles = {
  usersheading: "TOP REFERRERS",
  statsheading: "NEW TITANS",
};
const defaultElements = {
  empty: null,
  loadingstate: null,
};
const Empty = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: false,
      styles: {
        ...defaultStyles,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: [],
    },
    elements: {
      ...defaultElements,
    },
  };
  return h$1(LeaderboardView, Object.assign({}, props));
};
const Loading$3 = () => {
  const props = {
    states: {
      loading: true,
      hasLeaders: false,
      styles: {
        ...defaultStyles,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: [],
    },
    elements: {
      ...defaultElements,
    },
  };
  return h$1(LeaderboardView, Object.assign({}, props));
};
const One = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        ...defaultStyles,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: [
        {
          firstName: "Viktor",
          lastInitial: "V",
          value: 82,
          rank: 1,
          rowNumber: 1,
        },
      ],
    },
    elements: {
      ...defaultElements,
    },
  };
  return h$1(LeaderboardView, Object.assign({}, props));
};
const Five = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        ...defaultStyles,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: [
        {
          firstName: "Viktor",
          lastInitial: "V",
          value: 82,
          rank: 1,
          rowNumber: 1,
        },
        { firstName: "MF", lastInitial: "D", value: 73, rank: 2, rowNumber: 2 },
        {
          firstName: "Freddie",
          lastInitial: "G",
          value: 64,
          rank: 3,
          rowNumber: 3,
        },
        {
          firstName: "Benny",
          lastInitial: "B",
          value: 55,
          rank: 4,
          rowNumber: 4,
        },
        {
          firstName: "Mos",
          lastInitial: "D",
          value: 46,
          rank: 5,
          rowNumber: 5,
        },
      ],
    },
    elements: {
      ...defaultElements,
    },
  };
  return h$1(LeaderboardView, Object.assign({}, props));
};
const FiveWithRank = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        rankheading: "Rank",
        usersheading: "User",
        statsheading: "Referrals",
        showRank: true,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: [
        {
          firstName: "Viktor",
          lastInitial: "V",
          value: 82,
          rank: 1,
          rowNumber: 1,
        },
        { firstName: "MF", lastInitial: "D", value: 73, rank: 2, rowNumber: 2 },
        {
          firstName: "Freddie",
          lastInitial: "G",
          value: 64,
          rank: 3,
          rowNumber: 3,
        },
        {
          firstName: "Benny",
          lastInitial: "B",
          value: 55,
          rank: 4,
          rowNumber: 4,
        },
        {
          firstName: "Mos",
          lastInitial: "D",
          value: 46,
          rank: 5,
          rowNumber: 5,
        },
      ],
    },
    elements: {
      ...defaultElements,
    },
  };
  return h$1(LeaderboardView, Object.assign({}, props));
};
const UserInList = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        rankheading: "Rank",
        usersheading: "User",
        statsheading: "Referrals",
        showRank: true,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: [
        {
          firstName: "Viktor",
          lastInitial: "V",
          value: 82,
          rank: 1,
          rowNumber: 1,
        },
        { firstName: "MF", lastInitial: "D", value: 73, rank: 2, rowNumber: 2 },
        {
          firstName: "Freddie",
          lastInitial: "G",
          value: 64,
          rank: 3,
          rowNumber: 3,
        },
        {
          firstName: "Benny",
          lastInitial: "B",
          value: 55,
          rank: 4,
          rowNumber: 4,
        },
        {
          firstName: "Mos",
          lastInitial: "D",
          value: 46,
          rank: 5,
          rowNumber: 5,
        },
      ],
      showUser: true,
      userRank: {
        firstName: "Viktor",
        lastInitial: "V",
        value: 82,
        rowNumber: 1,
        rank: 1,
      },
    },
    elements: {
      ...defaultElements,
    },
  };
  return h$1(LeaderboardView, Object.assign({}, props));
};
const UserOutside = () => {
  const props = {
    states: {
      loading: false,
      hasLeaders: true,
      styles: {
        rankheading: "Rank",
        usersheading: "User",
        statsheading: "Referrals",
        showRank: true,
      },
    },
    data: {
      rankType: "rowNumber",
      leaderboard: [
        {
          firstName: "Viktor",
          lastInitial: "V",
          value: 82,
          rank: 1,
          rowNumber: 1,
        },
        { firstName: "MF", lastInitial: "D", value: 73, rank: 2, rowNumber: 2 },
        {
          firstName: "Freddie",
          lastInitial: "G",
          value: 64,
          rank: 3,
          rowNumber: 3,
        },
        {
          firstName: "Benny",
          lastInitial: "B",
          value: 55,
          rank: 4,
          rowNumber: 4,
        },
        {
          firstName: "Mos",
          lastInitial: "D",
          value: 46,
          rank: 5,
          rowNumber: 5,
        },
      ],
      showUser: true,
      userRank: {
        firstName: "Kutay",
        lastInitial: "C",
        value: 7,
        rowNumber: 6,
        rank: 9,
      },
    },
    elements: {
      ...defaultElements,
    },
  };
  return h$1(LeaderboardView, Object.assign({}, props));
};

const Leaderboard = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': Leaderboard_stories,
  Empty: Empty,
  Loading: Loading$3,
  One: One,
  Five: Five,
  FiveWithRank: FiveWithRank,
  UserInList: UserInList,
  UserOutside: UserOutside
});

const HookStoryAddon = ({ story }, children) => {
  var _a;
  const hookStory = (_a = story.story.parameters) === null || _a === void 0 ? void 0 : _a.hookStory;
  if (!hookStory) {
    return children;
  }
  const randomInt = Math.round(Math.random() * 100000);
  const RandomTagName = "sqm-hook-story-container-" + randomInt;
  return (h$1(RandomTagName, null,
    h$1("sqm-hook-story-container", { hookStory: hookStory })));
};
function createHookStory(hookStory) {
  const story = () => h$1("div", null);
  story.parameters = {
    hookStory,
  };
  return story;
}

const Router_stories = {
  title: "Tests/Router",
};
const templates = `
    <template path="/foo"><h1>foo</h1>
    
    <p>These elements don't produce a specific box by themselves. They are replaced by their pseudo-box and their child boxes. Please note that the CSS Display Level 3 spec defines how the contents value should affect "unusual elements" — elements that aren’t rendered purely by CSS box concepts such as replaced elements. See Appendix B: Effects of display: contents on Unusual Elements for more details.

    Due to a bug in browsers this will currently remove the element from the accessibility tree — screen readers will not look at what's inside. See the Accessibility concerns section below for more details.</p>
    </template>
    <template path="/bar"><h2>bar</h2>
    
    <p>Turns off the display of an element so that it has no effect on layout (the document is rendered as though the element did not exist). All descendant elements also have their display turned off.
    To have an element take up the space that it would normally take, but without actually rendering anything, use the visibility property instead.</p>
    </template>
    <template path="/baz/bang"><h3>baz/bang</h3>
    <pre>
    ▄▄▄▄▄▄▄░▄▄▄▄▄▄▄░▄▄▄▄▄▄░▄▄▄▄▄
    ░░▀███░░░░▀██░░░░██▀░░░░██░░
    ░░░▀██░░░░░▀██░░▄█░░░░░▄█░░░
    ░░░░███░░░░░▀██▄█░░░░░░█░░░░
    ░░░░░███░░░░░▀██░░░░░░█▀░░░░
    ░░░░░░███░░░░▄███░░░░█▀░░░░░
    ░░░░░░░██▄░░▄▀░███░░█▀░░░░░░
    ░░░░░░░▀██▄█▀░░░███▄▀░░░░░░░
    ░░░░░░░░▀██▀░░░░░███░░░░░░░░
    ░░░░░░░░░▀▀░░░░░░░▀░░░░░░░░░
    </pre>
    </template>
    <template path="/refer/:page"><h3>/refer/:page</h3>
    <pre>
      refer/:page
    </pre>
    </template>
`;
const routes = `
    <sqm-route path="/foo"><h1>foo</h1>
    
    <p>These elements don't produce a specific box by themselves. They are replaced by their pseudo-box and their child boxes. Please note that the CSS Display Level 3 spec defines how the contents value should affect "unusual elements" — elements that aren’t rendered purely by CSS box concepts such as replaced elements. See Appendix B: Effects of display: contents on Unusual Elements for more details.

    Due to a bug in browsers this will currently remove the element from the accessibility tree — screen readers will not look at what's inside. See the Accessibility concerns section below for more details.</p>
    </sqm-route>
    <sqm-route path="/bar"><h2>bar</h2>
    <p>Turns off the display of an element so that it has no effect on layout (the document is rendered as though the element did not exist). All descendant elements also have their display turned off.
    To have an element take up the space that it would normally take, but without actually rendering anything, use the visibility property instead.</p>
    </sqm-route>
    <sqm-route path="/baz/bang"><h3>baz/bang</h3>
    <pre>
    ▄▄▄▄▄▄▄░▄▄▄▄▄▄▄░▄▄▄▄▄▄░▄▄▄▄▄
    ░░▀███░░░░▀██░░░░██▀░░░░██░░
    ░░░▀██░░░░░▀██░░▄█░░░░░▄█░░░
    ░░░░███░░░░░▀██▄█░░░░░░█░░░░
    ░░░░░███░░░░░▀██░░░░░░█▀░░░░
    ░░░░░░███░░░░▄███░░░░█▀░░░░░
    ░░░░░░░██▄░░▄▀░███░░█▀░░░░░░
    ░░░░░░░▀██▄█▀░░░███▄▀░░░░░░░
    ░░░░░░░░▀██▀░░░░░███░░░░░░░░
    ░░░░░░░░░▀▀░░░░░░░▀░░░░░░░░░
    </pre>
    </sqm-route>
    <sqm-route path="/refer/:page"><h3>/refer/:page</h3>
    <pre>
      refer/:page
    </pre>
    </sqm-route>
`;
const TemplateNavigation = createHookStory(() => {
  return (h$1("div", null,
    h$1("button", { onClick: () => dn.push("/") }, "/"),
    h$1("button", { onClick: () => dn.push("/foo") }, "/foo"),
    h$1("button", { onClick: () => dn.push("/bar") }, "/bar"),
    h$1("button", { onClick: () => dn.push("/baz/bang") }, "/baz/bang"),
    h$1("button", { onClick: () => dn.push("/refer") }, "/refer"),
    h$1("button", { onClick: () => dn.push("/refer/1") }, "/refer/1"),
    h$1("button", { onClick: () => dn.push("/refer/2") }, "/refer/2"),
    h$1("button", { onClick: () => dn.back() }, "Back"),
    h$1("button", { onClick: () => dn.forward() }, "Forward"),
    h$1("hr", null),
    h$1("sqm-router", { innerHTML: templates })));
});
const RouteNavigation = createHookStory(() => {
  return (h$1("div", null,
    h$1("button", { onClick: () => dn.push("/") }, "/"),
    h$1("button", { onClick: () => dn.push("/foo") }, "/foo"),
    h$1("button", { onClick: () => dn.push("/bar") }, "/bar"),
    h$1("button", { onClick: () => dn.push("/baz/bang") }, "/baz/bang"),
    h$1("button", { onClick: () => dn.push("/refer") }, "/refer"),
    h$1("button", { onClick: () => dn.push("/refer/1") }, "/refer/1"),
    h$1("button", { onClick: () => dn.push("/refer/2") }, "/refer/2"),
    h$1("button", { onClick: () => dn.back() }, "Back"),
    h$1("button", { onClick: () => dn.forward() }, "Forward"),
    h$1("hr", null),
    h$1("sqm-router", { innerHTML: routes })));
});
const Styling = createHookStory(() => {
  return (h$1("div", null,
    h$1("button", { onClick: () => dn.push("/") }, "/"),
    h$1("button", { onClick: () => dn.push("/foo") }, "/foo"),
    h$1("hr", null),
    h$1("div", { style: { display: "flex", justifyContent: "space-around" } },
      h$1("sqm-router", { innerHTML: `<template path="/">
      
      <div>Column 1</div>
      <div>Column 2 </div>
      </template>` }))));
});
function useTemplate$1(templateString) {
  const [editedTemplate, setEditedTemplate] = useState(templateString);
  const [previewTemplate, setPreviewTemplate] = useState(templateString);
  function setPath(e) {
    //@ts-ignore
    dn.push(e.target.value);
  }
  return {
    states: { previewTemplate, editedTemplate },
    callbacks: { setEditedTemplate, setPreviewTemplate, setPath },
  };
}
const defaultRouter = `
<sqm-router>
  <template path="/">
  <div>hello world</div>
  </template>
</sqm-router>
`;
function TemplateView$1(props) {
  const { states, callbacks } = props;
  return [
    h$1("textarea", { style: { width: "100%", height: "300px" }, onChange: (e) => callbacks.setEditedTemplate(e.target.value) }, states.editedTemplate),
    h$1("button", { onClick: () => callbacks.setPreviewTemplate(states.editedTemplate) }, "Update Preview"),
    h$1("label", null,
      "Current path:",
      h$1("input", { onInput: callbacks.setPath, value: "/" })),
    h$1("div", { innerHTML: states.previewTemplate }),
  ];
}
const RouterPlayground = createHookStory(() => {
  const { states, callbacks } = useTemplate$1(defaultRouter);
  return h$1(TemplateView$1, { states: states, callbacks: callbacks });
});

const Router = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': Router_stories,
  TemplateNavigation: TemplateNavigation,
  RouteNavigation: RouteNavigation,
  Styling: Styling,
  RouterPlayground: RouterPlayground
});

const LeaderboardRank_stories = {
  title: "Components/Leaderboard Rank",
};
const First = () => {
  const props = { data: { rank: "1st" } };
  return (h$1("p", null,
    "Your rank is ",
    h$1(LeaderboardRankView, Object.assign({}, props)),
    " on the leaderboard"));
};

const LeaderboardRank = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': LeaderboardRank_stories,
  First: First
});

function setupGraphQL$9() {
  const id = "worried-camera@uexwltgh.mailosaur.net";
  const accountId = id;
  const programId = "a-referral-program";
  //@ts-ignore
  window.SquatchAndroid = true;
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_as36zjtpfy7oo",
    appDomain: "https://staging.referralsaasquatch.com",
    token: 
    // you have to change this if you change the id or accountId
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6IndvcnJpZWQtY2FtZXJhQHVleHdsdGdoLm1haWxvc2F1ci5uZXQiLCJpZCI6IndvcnJpZWQtY2FtZXJhQHVleHdsdGdoLm1haWxvc2F1ci5uZXQifX0.-WGV4_bzGCFp-OTIO-h-yp0MlgtkdufT_GgI4T691OY",
    userId: id,
    accountId,
    programId,
  };
  return { id, accountId };
}
function setupLoggedOut() {
  const programId = "a-referral-program";
  //@ts-ignore
  window.SquatchAndroid = true;
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_as36zjtpfy7oo",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };
}
const PortalFrame_stories = {
  title: "Components/Portal Frame",
};
const defaultProps$9 = {
  data: {
    footer: h$1("span", null, "example@example.com"),
    header: (h$1("div", { slot: "header", style: { display: "flex", flexDirection: "column" } },
      h$1("span", { style: {
          fontSize: "var(--sl-font-size-large)",
          fontWeight: "bold",
        } }, "Portal Header"),
      h$1("span", { style: { fontSize: "var(--sl-font-size-small)" } }, "A description for the portal"))),
  },
  callbacks: {
    rerender: () => { },
  },
  ref: { current: undefined },
};
const FrameWithMenu = () => {
  const props = {
    ...defaultProps$9,
  };
  return (h$1(PortalFrameView, Object.assign({}, props),
    h$1("sqm-navigation-menu", { "menu-label": "Menu" },
      h$1("sl-menu-item", { exportparts: "base: menuitem-base", value: "/widget" }, "Dashboard"),
      h$1("sl-menu-item", { exportparts: "base: menuitem-base", value: "/editProfile" }, "Edit Profile"),
      h$1("sl-menu-divider", null),
      h$1("sl-menu-item", { exportparts: "base: menuitem-base", value: "/logout" }, "Logout"))));
};
const FrameWithoutMenu = () => {
  const props = {
    ...defaultProps$9,
  };
  return h$1(PortalFrameView, Object.assign({}, props));
};
const FullStackFrame = () => {
  var _a;
  setupGraphQL$9();
  return (h$1("div", null,
    h$1("sqm-portal-frame", null,
      h$1("div", { slot: "header", style: { display: "flex", flexDirection: "column" } },
        h$1("span", { style: {
            fontSize: "var(--sl-font-size-large)",
            fontWeight: "bold",
          } }, "Portal Header"),
        h$1("span", { style: { fontSize: "var(--sl-font-size-small)" } }, "A description for the portal")),
      h$1("a", { slot: "footer", class: "FooterEmail", href: "mailto:referrals@servicetitan.com" }, "referrals@servicetitan.com"),
      h$1("sqm-navigation-menu", { "menu-label": "Menu" },
        h$1("sl-menu-item", { exportparts: "base: menuitem-base", value: "/widget" }, "Dashboard"),
        h$1("sl-menu-item", { exportparts: "base: menuitem-base", value: "/editProfile" }, "Edit Profile"),
        h$1("sl-menu-divider", null),
        h$1("sl-menu-item", { exportparts: "base: menuitem-base", value: "/logout" }, "Logout")),
      h$1("h1", null, "Something")),
    h$1("p", null,
      "Current path:",
      " ",
      h$1("code", null,
        h$1("strong", null, (_a = ln()) === null || _a === void 0 ? void 0 : _a.pathname))),
    h$1("button", { onClick: dn.back }, "Go Back")));
};
const FullStackFrameLoggedOut = () => {
  var _a;
  setupLoggedOut();
  return (h$1("div", null,
    h$1("sqm-portal-frame", null,
      h$1("div", { slot: "header", style: { display: "flex", flexDirection: "column" } },
        h$1("span", { style: {
            fontSize: "var(--sl-font-size-large)",
            fontWeight: "bold",
          } }, "Portal Header"),
        h$1("span", { style: { fontSize: "var(--sl-font-size-small)" } }, "A description for the portal")),
      h$1("span", { slot: "footer" }, "sample@example.com"),
      h$1("sqm-navigation-menu", { "menu-label": "Menu" },
        h$1("sl-menu-item", { exportparts: "base: menuitem-base", value: "/widget" }, "Dashboard"),
        h$1("sl-menu-item", { exportparts: "base: menuitem-base", value: "/editProfile" }, "Edit Profile"),
        h$1("sl-menu-divider", null),
        h$1("sl-menu-item", { exportparts: "base: menuitem-base", value: "/logout" }, "Logout")),
      h$1("h1", null, "Something")),
    h$1("p", null,
      "Current path:",
      " ",
      h$1("code", null,
        h$1("strong", null, (_a = ln()) === null || _a === void 0 ? void 0 : _a.pathname))),
    h$1("button", { onClick: dn.back }, "Go Back")));
};

const PortalFrame = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': PortalFrame_stories,
  FrameWithMenu: FrameWithMenu,
  FrameWithoutMenu: FrameWithoutMenu,
  FullStackFrame: FullStackFrame,
  FullStackFrameLoggedOut: FullStackFrameLoggedOut
});

const EditProfileForm_stories = {
  title: "Components/Edit Profile Form",
};
const defaultProps$8 = {
  states: {
    loading: false,
    submitDisabled: false,
    formState: {
      currentRegion: "Canada",
      firstName: "Bill",
      lastName: "Bob",
      errors: {},
      error: "An error string",
    },
    user: {
      firstName: "Bill",
      lastName: "Bob",
      email: "billbob@example.com",
    },
    showEdit: false,
    text: {
      editprofileheader: "Edit Profile",
      editprofiletext: "Update your profile.",
      firstnametext: "Bill",
      lastnametext: "Bob",
      canceltext: "Cancel",
      updatetext: "Update",
      currentregiontext: "Canada",
    },
  },
  callbacks: {
    onSubmit: (props) => {
      console.log(props);
    },
    resetForm: () => {
      console.log("reset");
    },
    onChange: () => {
      console.log("change");
    },
    setShowEdit: (props) => {
      console.log(props);
    },
  },
};
const EditProfileFormDisabled = () => {
  const props = defaultProps$8;
  return h$1(EditProfileView, Object.assign({}, props));
};
const EditProfileFormEnabled = () => {
  const props = {
    ...defaultProps$8,
    states: { ...defaultProps$8.states, showEdit: true },
  };
  return h$1(EditProfileView, Object.assign({}, props));
};
const FullStackFrameWithMenu = () => {
  return (h$1("sqm-edit-profile", { editprofileheader: "Edit Profile", editprofiletext: "Update your profile.", firstnametext: "Bill", lastnametext: "Bob", canceltext: "Cancel", updatetext: "Update", currentregiontext: "Current Region", showregion: true }));
};

const EditProfile$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': EditProfileForm_stories,
  EditProfileFormDisabled: EditProfileFormDisabled,
  EditProfileFormEnabled: EditProfileFormEnabled,
  FullStackFrameWithMenu: FullStackFrameWithMenu
});

const UseShareLink_stories = {
  title: "Hooks / useShareLink",
};
function setupGraphQL$8() {
  const id = "testestest";
  const accountId = id;
  const programId = "sam-partner-test-2";
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a8b41jotf8a1v",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };
  useEffect(() => {
    ae$1({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InRlc3Rlc3Rlc3QiLCJpZCI6InRlc3Rlc3Rlc3QifX0.qYnU5hNeIj9C_G3NogfG7btgCPGZC7JRXY0MG6a63zs",
    });
    return () => {
      window.widgetIdent = undefined;
      ae$1(undefined);
    };
  }, []);
}
const BareBonesView$1 = createHookStory(() => {
  setupGraphQL$8();
  const res = useShareLink({
    programId: "sam-partner-test-2",
    tooltiplifespan: 0,
    tooltiptext: "",
  });
  return (h$1("div", null,
    "Sharelink:",
    " ",
    h$1("code", { style: { borderStyle: "solid", borderWidth: "1px", padding: "2px" } }, res.shareString)));
});
const RegularView$2 = createHookStory(() => {
  setupGraphQL$8();
  return (h$1(ShareLinkView, Object.assign({}, useShareLink({
    programId: "sam-partner-test-2",
    tooltiptext: "Copied to clipboard",
    tooltiplifespan: 1000,
  }))));
});
const FastTooltip = createHookStory(() => {
  setupGraphQL$8();
  return (h$1(ShareLinkView, Object.assign({}, useShareLink({
    programId: "sam-partner-test-2",
    tooltiptext: "⠀⠀⠀⠀⠀⠀⠀⠀⠀HELLO THERE!!!\n⠀⠀⠀⡯⡯⡾⠝⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢊⠘⡮⣣⠪⠢⡑⡌\n⠀⠀⠀⠟⠝⠈⠀⠀⠀⠡⠀⠠⢈⠠⢐⢠⢂⢔⣐⢄⡂⢔⠀⡁⢉⠸⢨⢑⠕⡌\n⠀⠀⡀⠁⠀⠀⠀⡀⢂⠡⠈⡔⣕⢮⣳⢯⣿⣻⣟⣯⣯⢷⣫⣆⡂⠀⠀⢐⠑⡌\n⢀⠠⠐⠈⠀⢀⢂⠢⡂⠕⡁⣝⢮⣳⢽⡽⣾⣻⣿⣯⡯⣟⣞⢾⢜⢆⠀⡀⠀⠪\n⣬⠂⠀⠀⢀⢂⢪⠨⢂⠥⣺⡪⣗⢗⣽⢽⡯⣿⣽⣷⢿⡽⡾⡽⣝⢎⠀⠀⠀⢡\n⣿⠀⠀⠀⢂⠢⢂⢥⢱⡹⣪⢞⡵⣻⡪⡯⡯⣟⡾⣿⣻⡽⣯⡻⣪⠧⠑⠀⠁⢐\n⣿⠀⠀⠀⠢⢑⠠⠑⠕⡝⡎⡗⡝⡎⣞⢽⡹⣕⢯⢻⠹⡹⢚⠝⡷⡽⡨⠀⠀⢔\n⣿⡯⠀⢈⠈⢄⠂⠂⠐⠀⠌⠠⢑⠱⡱⡱⡑⢔⠁⠀⡀⠐⠐⠐⡡⡹⣪⠀⠀⢘\n⣿⣽⠀⡀⡊⠀⠐⠨⠈⡁⠂⢈⠠⡱⡽⣷⡑⠁⠠⠑⠀⢉⢇⣤⢘⣪⢽⠀⢌⢎\n⣿⢾⠀⢌⠌⠀⡁⠢⠂⠐⡀⠀⢀⢳⢽⣽⡺⣨⢄⣑⢉⢃⢭⡲⣕⡭⣹⠠⢐⢗\n⣿⡗⠀⠢⠡⡱⡸⣔⢵⢱⢸⠈⠀⡪⣳⣳⢹⢜⡵⣱⢱⡱⣳⡹⣵⣻⢔⢅⢬⡷\n⣷⡇⡂⠡⡑⢕⢕⠕⡑⠡⢂⢊⢐⢕⡝⡮⡧⡳⣝⢴⡐⣁⠃⡫⡒⣕⢏⡮⣷⡟\n⣷⣻⣅⠑⢌⠢⠁⢐⠠⠑⡐⠐⠌⡪⠮⡫⠪⡪⡪⣺⢸⠰⠡⠠⠐⢱⠨⡪⡪⡰\n⣯⢷⣟⣇⡂⡂⡌⡀⠀⠁⡂⠅⠂⠀⡑⡄⢇⠇⢝⡨⡠⡁⢐⠠⢀⢪⡐⡜⡪⡊\n⣿⢽⡾⢹⡄⠕⡅⢇⠂⠑⣴⡬⣬⣬⣆⢮⣦⣷⣵⣷⡗⢃⢮⠱⡸⢰⢱⢸⢨⢌\n⣯⢯⣟⠸⣳⡅⠜⠔⡌⡐⠈⠻⠟⣿⢿⣿⣿⠿⡻⣃⠢⣱⡳⡱⡩⢢⠣⡃⠢⠁\n⡯⣟⣞⡇⡿⣽⡪⡘⡰⠨⢐⢀⠢⢢⢄⢤⣰⠼⡾⢕⢕⡵⣝⠎⢌⢪⠪⡘⡌⠀\n⡯⣳⠯⠚⢊⠡⡂⢂⠨⠊⠔⡑⠬⡸⣘⢬⢪⣪⡺⡼⣕⢯⢞⢕⢝⠎⢻⢼⣀⠀\n⠁⡂⠔⡁⡢⠣⢀⠢⠀⠅⠱⡐⡱⡘⡔⡕⡕⣲⡹⣎⡮⡏⡑⢜⢼⡱⢩⣗⣯⣟\n⢀⢂⢑⠀⡂⡃⠅⠊⢄⢑⠠⠑⢕⢕⢝⢮⢺⢕⢟⢮⢊⢢⢱⢄⠃⣇⣞⢞⣞⢾\n⢀⠢⡑⡀⢂⢊⠠⠁⡂⡐⠀⠅⡈⠪⠪⠪⠣⠫⠑⡁⢔⠕⣜⣜⢦⡰⡎⡯⡾⡽",
    tooltiplifespan: 500,
  }))));
});

const UseShareLink = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': UseShareLink_stories,
  BareBonesView: BareBonesView$1,
  RegularView: RegularView$2,
  FastTooltip: FastTooltip
});

const UseShareButton_stories = {
  title: "Hooks / useShareButton",
};
function setupGraphQL$7() {
  const id = "testestest";
  const accountId = id;
  const programId = "sam-partner-test-2";
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a8b41jotf8a1v",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };
  useEffect(() => {
    ae$1({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InRlc3Rlc3Rlc3QiLCJpZCI6InRlc3Rlc3Rlc3QifX0.qYnU5hNeIj9C_G3NogfG7btgCPGZC7JRXY0MG6a63zs",
    });
    return () => {
      window.widgetIdent = undefined;
      ae$1(undefined);
    };
  }, []);
}
const BareBonesView = createHookStory(() => {
  setupGraphQL$7();
  const programId = "sam-partner-test-2";
  const res = [
    useShareButton({ programId, medium: "facebook" }),
    useShareButton({ programId, medium: "twitter" }),
    useShareButton({ programId, medium: "email" }),
    useShareButton({ programId, medium: "direct" }),
    useShareButton({ programId, medium: "sms" }),
  ];
  return (h$1("div", null, res.map((r) => (h$1("div", null,
    h$1("button", { onClick: r.onClick },
      "Share link (",
      r.medium,
      ")"))))));
});
const RegularView$1 = createHookStory(() => {
  setupGraphQL$7();
  const programId = "sam-partner-test-2";
  const mediums = [
    "facebook",
    "twitter",
    "email",
    "direct",
    "sms",
  ];
  return (h$1("div", null, mediums.map((medium) => (h$1("div", null,
    h$1("sqm-share-button", Object.assign({}, { programId, medium }), "BUTTON_TEXT"))))));
});

const UseShareButton = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': UseShareButton_stories,
  BareBonesView: BareBonesView,
  RegularView: RegularView$1
});

const UseBigStat_stories = {
  title: "Hooks / useBigStat",
};
function setupGraphQL$6() {
  const id = "nynellie";
  const accountId = id;
  const programId = "ny-post-referrals";
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a7yoz8854cf6x",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };
  useEffect(() => {
    ae$1({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6Im55bmVsbGllIiwiaWQiOiJueW5lbGxpZSJ9fQ.3KV974VPLgk4tD8LQfJTi4IPkKCmnaB8w48HzVJYDuI",
    });
    return () => {
      window.widgetIdent = undefined;
      ae$1(undefined);
    };
  }, []);
}
const View$1 = (statType, format) => {
  console.log(`View("${statType}") - CALLED`);
  setupGraphQL$6();
  const { props, label } = useBigStat({
    statType,
    render: () => { },
    disconnectedCallback: () => { },
    ignored: true,
  });
  return (h$1("div", null,
    h$1("b", null, "Stat format:"),
    h$1("pre", null, format),
    h$1("br", null),
    h$1("b", null, "Stat selected:"),
    " ",
    h$1("pre", { style: { color: "green" } }, statType),
    h$1(BigStatView, Object.assign({}, props), label)));
};
const DemoView = () => {
  const [type, setType] = useState("/someRandomThing/with/someArguments/1234");
  const { props, label } = useDemoBigStat({
    statType: type,
    render: () => { },
    disconnectedCallback: () => { },
    ignored: true,
  });
  return (h$1("div", null,
    h$1("div", null,
      "Stat type:",
      " ",
      h$1("input", { style: { width: "300px" }, type: "text", value: type, onInput: (e) => setType(e.target.value) })),
    h$1("hr", null),
    h$1("div", null,
      h$1(BigStatView, Object.assign({}, props), label))));
};
const Demo = createHookStory(DemoView);
const ReferralsCount = createHookStory(() => View$1("/referralsCount", "/(referralsCount)/:status?"));
const referralsConvertedCount = createHookStory(() => {
  return View$1("/referralsCount/converted", "/(referralsCount)/:status?");
});
const referralsStartedCount = createHookStory(() => {
  return View$1("/referralsCount/started", "/(referralsCount)/:status?");
});
const ReferralsMonth = createHookStory(() => View$1("/referralsMonth", "/(referralsMonth)"));
const ReferralsWeek = createHookStory(() => View$1("/referralsWeek", "/(referralsWeek)"));
const RewardsCount = createHookStory(() => View$1("/rewardsCount", "/(rewardsCount)/:global?"));
const GlobalRewardsCount = createHookStory(() => View$1("/rewardsCount/global", "/(rewardsCount)/:global"));
const GlobalRewardsCountFiltered = createHookStory(() => View$1("/rewardsCountFiltered/global", "/(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"));
const GlobalRewardsCountPctDiscount = createHookStory(() => View$1("/rewardsCountFiltered/PCT_DISCOUNT/global", "/(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"));
const GlobalRewardsCountPctDiscountPending = createHookStory(() => View$1("/rewardsCountFiltered/PCT_DISCOUNT/PENDING/global", "/(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"));
const RewardsCountByUnit = createHookStory(() => View$1("/rewardsCountFiltered/CREDIT/COFFEE", "/(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"));
const GlobalRewardsCountByUnit = createHookStory(() => View$1("/rewardsCountFiltered/CREDIT/COFFEE/global", "/(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"));
const GlobalPendingRewardsCount = createHookStory(() => View$1("/rewardsCountFiltered/CREDIT/COFFEE/PENDING/global", "/(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"));
const RewardsAvailableCount = createHookStory(() => View$1("/rewardsCountFiltered/AVAILABLE", "/(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"));
const GlobalRewardsCountByIntegration = createHookStory(() => View$1("/integrationRewardsCountFiltered/AVAILABLE/global", "/(integrationRewardsCountFiltered)/:format([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"));
const GlobalRewardsCountByPendingIntegration = createHookStory(() => View$1("/integrationRewardsCountFiltered/PENDING/global", "/(integrationRewardsCountFiltered)/:format([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"));
const RewardsMonth = createHookStory(() => View$1("/rewardsMonth", "/(rewardsMonth)/:global?"));
const RewardsWeek = createHookStory(() => View$1("/rewardsWeek", "/(rewardsWeek)/:global?"));
const RewardsAssigned = createHookStory(() => View$1("/rewardsAssigned/CREDIT/COFFEE", "/(rewardsAssigned)/:statType/:unit/:global?"));
const RewardsAssignedCashUSD = createHookStory(() => View$1("/rewardsAssigned/CREDIT/CASH%2FUSD", "/(rewardsAssigned)/:statType/:unit/:global?"));
const RewardsRedeemed = createHookStory(() => View$1("/rewardsRedeemed/CREDIT/COFFEE", "/(rewardsRedeemed)/:statType/:unit/:global?"));
const RewardsAvailable = createHookStory(() => View$1("/rewardsAvailable/CREDIT/COFFEE", "/(rewardsAvailable)/:statType/:unit/:global?"));
const RewardsAvailableWithSlash = createHookStory(() => View$1("/rewardsAvailable/CREDIT/CASH%2FUSD", "/(rewardsAvailable)/:statType/:unit/:global?"));
const RewardBalance = createHookStory(() => View$1("/rewardBalance/CREDIT/COFFEE/prettyValue", "/(rewardBalance)/:statType/:unit/:format([prettyValue|value]*)?/:global?"));
const RewardBalanceCashUSD = createHookStory(() => {
  const unit = encodeURIComponent("CASH/USD");
  return View$1(`/rewardBalance/CREDIT/${unit}/prettyValue`, "/(rewardBalance)/:statType/:unit/:format([prettyValue|value]*)?/:global?");
});
const ProgramGoals = createHookStory(() => {
  const dummy = encodeURIComponent("Paid-Member-Goal/referrals");
  return View$1(`/programGoals/count/${dummy}`, "/(programGoals)/:metricType/:goalId");
});
const CustomField = createHookStory(() => {
  return View$1(`/customFields/thingCount`, "/(customFields)/:customField");
});

const UseBigStat = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': UseBigStat_stories,
  Demo: Demo,
  ReferralsCount: ReferralsCount,
  referralsConvertedCount: referralsConvertedCount,
  referralsStartedCount: referralsStartedCount,
  ReferralsMonth: ReferralsMonth,
  ReferralsWeek: ReferralsWeek,
  RewardsCount: RewardsCount,
  GlobalRewardsCount: GlobalRewardsCount,
  GlobalRewardsCountFiltered: GlobalRewardsCountFiltered,
  GlobalRewardsCountPctDiscount: GlobalRewardsCountPctDiscount,
  GlobalRewardsCountPctDiscountPending: GlobalRewardsCountPctDiscountPending,
  RewardsCountByUnit: RewardsCountByUnit,
  GlobalRewardsCountByUnit: GlobalRewardsCountByUnit,
  GlobalPendingRewardsCount: GlobalPendingRewardsCount,
  RewardsAvailableCount: RewardsAvailableCount,
  GlobalRewardsCountByIntegration: GlobalRewardsCountByIntegration,
  GlobalRewardsCountByPendingIntegration: GlobalRewardsCountByPendingIntegration,
  RewardsMonth: RewardsMonth,
  RewardsWeek: RewardsWeek,
  RewardsAssigned: RewardsAssigned,
  RewardsAssignedCashUSD: RewardsAssignedCashUSD,
  RewardsRedeemed: RewardsRedeemed,
  RewardsAvailable: RewardsAvailable,
  RewardsAvailableWithSlash: RewardsAvailableWithSlash,
  RewardBalance: RewardBalance,
  RewardBalanceCashUSD: RewardBalanceCashUSD,
  ProgramGoals: ProgramGoals,
  CustomField: CustomField
});

function setupGraphQL$5() {
  const id = "worried-camera@uexwltgh.mailosaur.net";
  const accountId = id;
  const programId = "a-referral-program";
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_as36zjtpfy7oo",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };
  useEffect(() => {
    ae$1({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6IndvcnJpZWQtY2FtZXJhQHVleHdsdGdoLm1haWxvc2F1ci5uZXQiLCJpZCI6IndvcnJpZWQtY2FtZXJhQHVleHdsdGdoLm1haWxvc2F1ci5uZXQiLCJmaXJzdE5hbWUiOiJ0ZXN0IiwibGFzdE5hbWUiOiJ0ZXN0In19.ziDWbdCwsTo1ijxl8d2__Ga-6iFOVShaJUPp2ZBMeO0",
    });
    return () => {
      window.widgetIdent = undefined;
      ae$1(undefined);
    };
  }, []);
}
const UseEditProfile_stories = {
  title: "Hooks / useEditProfile",
};
const RegularView = createHookStory(() => {
  setupGraphQL$5();
  return (h$1("sqm-edit-profile", Object.assign({}, {
    editprofileheader: "HEADER",
    editprofiletext: "TEXT",
    firstnametext: "FIRST NAME",
    lastnametext: "LAST NAME",
    canceltext: "CANCEL",
    updatetext: "UPDATE",
    currentregiontext: "CURRENT REGION TEXT",
  })));
});

const UseEditProfile = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': UseEditProfile_stories,
  RegularView: RegularView
});

const UseLeaderboard_stories = {
  title: "Hooks / useLeaderboard",
};
function setupGraphQL$4() {
  const id = "testestest";
  const accountId = id;
  const programId = "sam-partner-test-2";
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a8b41jotf8a1v",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };
  useEffect(() => {
    ae$1({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InRlc3Rlc3Rlc3QiLCJpZCI6InRlc3Rlc3Rlc3QifX0.qYnU5hNeIj9C_G3NogfG7btgCPGZC7JRXY0MG6a63zs",
    });
    return () => {
      window.widgetIdent = undefined;
      ae$1(undefined);
    };
  }, []);
}
const View = (overrideProps) => {
  const props = {
    leaderboardType: "topConvertedReferrers",
    showRank: true,
    rankType: "rowNumber",
    usersheading: "Top Referrers",
    statsheading: "Completed Referrals",
    interval: "",
    empty: h$1("span", null, "No Referrals"),
    loadingstate: h$1("span", null, "Loading"),
    ...overrideProps,
  };
  const { leaderboardType, rankType } = props;
  console.log(`View("${leaderboardType}") - CALLED`);
  setupGraphQL$4();
  const { states, data, elements } = useLeaderboard(props);
  return (h$1("div", { style: { marginBottom: "20px" } },
    h$1("sqm-divided-layout", { direction: "row" },
      h$1("div", { style: { padding: "10px" } },
        h$1("b", null, "Leaderboard Type"),
        h$1("pre", null, leaderboardType)),
      h$1("div", { style: { padding: "10px" } },
        h$1("b", null, "Rank Type"),
        h$1("pre", null, rankType))),
    h$1(LeaderboardView, { states: states, data: data, elements: elements }),
    h$1("hr", null)));
};
const TopConvertedReferrers = createHookStory(() => {
  return [View(), View({ rankType: "rank" }), View({ rankType: "denseRank" })];
});
const TopStartedReferrers = createHookStory(() => {
  return [
    View({
      leaderboardType: "topStartedReferrers",
      statsheading: "New Referrals",
    }),
    View({
      leaderboardType: "topStartedReferrers",
      rankType: "rank",
      statsheading: "New Referrals",
    }),
    View({
      leaderboardType: "topStartedReferrers",
      rankType: "denseRank",
      statsheading: "New Referrals",
    }),
  ];
});

const UseLeaderboard = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': UseLeaderboard_stories,
  TopConvertedReferrers: TopConvertedReferrers,
  TopStartedReferrers: TopStartedReferrers
});

const FormMessage_stories = {
  title: "Components/Form Message",
};
const SuccessAlert = () => {
  return (h$1("sqm-form-message", { type: "success" },
    h$1("div", null, "This is a success message.")));
};
const ErrorAlert = () => {
  return (h$1("sqm-form-message", { type: "error" },
    h$1("div", null, "This is an error message")));
};
const InfoAlert = () => {
  return (h$1("sqm-form-message", { type: "info" },
    h$1("div", null, "This is an info message")));
};
const FullStackSuccess = () => {
  return (h$1("sqm-form-message", { type: "success", exportparts: "successalert-icon" },
    h$1("div", { class: "AlertContent" },
      h$1("div", { part: "successalert-text" }, "Title"),
      h$1("div", { part: "successalert-subtext" }, "Body text."),
      h$1("sl-button", { type: "default", exportparts: "base: defaultbutton-base", onClick: () => {
          console.log("click");
        } }, "Primary Action"),
      h$1("sl-button", { class: "SecondaryTextButton", type: "text", onClick: () => {
          console.log("click");
        } }, "Secondary Action"))));
};

const FormMessage = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': FormMessage_stories,
  SuccessAlert: SuccessAlert,
  ErrorAlert: ErrorAlert,
  InfoAlert: InfoAlert,
  FullStackSuccess: FullStackSuccess
});

const EXCHANGE = dist.gql `
  mutation exchange($exchangeRewardInput: ExchangeRewardInput!) {
    exchangeReward(exchangeRewardInput: $exchangeRewardInput) {
      reward {
        id
      }
    }
  }
`;
const UseRewardExchangeList_stories = {
  title: "Hooks / useRewardExchange",
};
function setupGraphQL$3() {
  const id = "testestest";
  const accountId = id;
  const programId = "sam-partner-test-2";
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a8b41jotf8a1v",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };
  useEffect(() => {
    ae$1({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InRlc3Rlc3Rlc3QiLCJpZCI6InRlc3Rlc3Rlc3QifX0.qYnU5hNeIj9C_G3NogfG7btgCPGZC7JRXY0MG6a63zs",
    });
    return () => {
      window.widgetIdent = undefined;
      ae$1(undefined);
    };
  }, []);
  return { id, accountId };
}
function useExchangeButton() {
  const { id, accountId } = setupGraphQL$3();
  const [points, setPoints] = useState(10);
  const [rate, setRate] = useState(100);
  const [exchange, { data, errors }] = _e(EXCHANGE);
  return {
    states: {
      points,
      rate,
    },
    data: {
      id,
      accountId,
      data,
      errors,
    },
    callbacks: {
      exchange,
      setPoints,
      setRate,
    },
  };
}
const DefaultView = (props) => {
  const { states, data, callbacks } = props;
  return (h$1("div", null,
    h$1("div", null,
      h$1("label", null, "Rate:"),
      h$1("input", { value: states.rate, onInput: (e) => 
        // @ts-ignore
        callbacks.setRate(e.target.value) })),
    h$1("input", { value: states.points, onInput: (e) => 
      // @ts-ignore
      callbacks.setPoints(e.target.value) }),
    h$1("button", { onClick: () => callbacks.exchange(props.input) }, "Exchange"),
    h$1("details", null,
      h$1("summary", null, "response"),
      h$1("h4", null, "data"),
      h$1("div", { style: { maxWidth: "500px" } },
        h$1("pre", { style: { width: "500px", whiteSpace: "pre-wrap" } }, JSON.stringify(data.data))),
      h$1("h4", null, "errors"),
      h$1("div", { style: { maxWidth: "500px" } },
        h$1("pre", { style: { maxWidth: "500px", whiteSpace: "pre-wrap" } }, JSON.stringify(data.errors))))));
};
const RewardList = createHookStory(() => {
  setupGraphQL$3();
  const props = {
    listType: "",
    render: () => { },
    disconnectedCallback: () => { },
    ignored: true,
  };
  return (h$1("sqm-reward-exchange-list", { "list-type": "something" }));
});
const FixedGlobalReward = createHookStory(() => {
  const { states, data, callbacks } = useExchangeButton();
  return (h$1(DefaultView, { states: states, data: data, callbacks: callbacks, input: {
      exchangeRewardInput: {
        userId: data.id,
        accountId: data.accountId,
        redeemCreditInput: {
          amount: states.points,
          unit: "POINT",
        },
        globalRewardKey: "gc1",
        // rewardInput: {
        //   valueInCents: states.points * 100,
        // },
      },
    } }));
});
const VariableGlobalReward = createHookStory(() => {
  const { states, data, callbacks } = useExchangeButton();
  return (h$1(DefaultView, { states: states, data: data, callbacks: callbacks, input: {
      exchangeRewardInput: {
        userId: data.id,
        accountId: data.accountId,
        redeemCreditInput: {
          amount: states.points,
          unit: "POINT",
        },
        globalRewardKey: "gc1",
        rewardInput: {
          valueInCents: Math.ceil(states.points * states.rate),
        },
      },
    } }));
});
const VariableCreditReward = createHookStory(() => {
  const { states, data, callbacks } = useExchangeButton();
  return (h$1(DefaultView, { states: states, data: data, callbacks: callbacks, input: {
      exchangeRewardInput: {
        userId: data.id,
        accountId: data.accountId,
        redeemCreditInput: {
          amount: states.points,
          unit: "POINT",
        },
        rewardInput: {
          type: "CREDIT",
          unit: "foo",
          assignedCredit: Math.ceil(states.points * states.rate),
        },
      },
    } }));
});

const UseRewardExchangeList = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': UseRewardExchangeList_stories,
  RewardList: RewardList,
  FixedGlobalReward: FixedGlobalReward,
  VariableGlobalReward: VariableGlobalReward,
  VariableCreditReward: VariableCreditReward
});

const UseRewardsTable_stories = {
  title: "Hooks / useRewardsTable",
};
function setupGraphQL$2() {
  const id = "testestest";
  const accountId = id;
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a8b41jotf8a1v",
    appDomain: "https://staging.referralsaasquatch.com",
    // programId,
  };
  useEffect(() => {
    ae$1({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InRlc3Rlc3Rlc3QiLCJpZCI6InRlc3Rlc3Rlc3QifX0.qYnU5hNeIj9C_G3NogfG7btgCPGZC7JRXY0MG6a63zs",
    });
    return () => {
      window.widgetIdent = undefined;
      ae$1(undefined);
    };
  }, []);
  return { id, accountId };
}
function setupGraphQLKlip$1({ token, id }) {
  const accountId = id;
  // const programId = "klip-referral-program";
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a74miwdpofztj",
    appDomain: "https://staging.referralsaasquatch.com",
    // programId,
  };
  useEffect(() => {
    ae$1({
      accountId,
      id,
      jwt: token,
    });
    return () => {
      window.widgetIdent = undefined;
      ae$1(undefined);
    };
  }, []);
  return { id, accountId };
}
const RewardsTableWithProgram = createHookStory(() => {
  setupGraphQL$2();
  A$1("sam-partner-test-2");
  const props = {
    listType: "",
    render: () => { },
    disconnectedCallback: () => { },
    ignored: true,
  };
  return (h$1("sqm-rewards-table", null,
    h$1("sqm-rewards-table-reward-column", null),
    h$1("sqm-rewards-table-status-column", null),
    h$1("sqm-rewards-table-source-column", null),
    h$1("sqm-rewards-table-date-column", null)));
});
const RewardsTableNoProgram = createHookStory(() => {
  setupGraphQL$2();
  A$1(undefined);
  const props = {
    listType: "",
    render: () => { },
    disconnectedCallback: () => { },
    ignored: true,
  };
  return (h$1("sqm-rewards-table", null,
    h$1("sqm-rewards-table-reward-column", null),
    h$1("sqm-rewards-table-status-column", null),
    h$1("sqm-rewards-table-source-column", null),
    h$1("sqm-rewards-table-date-column", null)));
});
const RewardsTableEn = createHookStory(() => {
  setupGraphQLKlip$1({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InNhbWVuZ2xpc2giLCJpZCI6InNhbWVuZ2xpc2gifX0._6OTVF3gcipu_ibgthUNr5UHwC-2E_lhCENI5HpYvcw",
    id: "samenglish",
  });
  A$1(undefined);
  const props = {
    listType: "",
    render: () => { },
    disconnectedCallback: () => { },
    ignored: true,
  };
  return (h$1("sqm-rewards-table", { "per-page": "4" },
    h$1("sqm-rewards-table-reward-column", null),
    h$1("sqm-rewards-table-status-column", null),
    h$1("sqm-rewards-table-source-column", null),
    h$1("sqm-rewards-table-date-column", null)));
});
const RewardsTableTr = createHookStory(() => {
  setupGraphQLKlip$1({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InNhbXR1cmtleSIsImlkIjoic2FtdHVya2V5In19.usSMe0RWg8W5FtwcvJayvAlxTw6vMxjTyWXaP8jI8_U",
    id: "samturkey",
  });
  A$1(undefined);
  const props = {
    listType: "",
    render: () => { },
    disconnectedCallback: () => { },
    ignored: true,
  };
  return (h$1("sqm-rewards-table", { "per-page": "4", "more-label": "Daha", "prev-label": "\u00D6ncesi", "empty-state-text": "Hen\u00FCz Referans Yok" },
    h$1("sqm-rewards-table-reward-column", { "column-title": "\u00D6d\u00FCller", "redeemed-text": "{redeemedAmount} kullan\u0131ld\u0131", "available-text": "{availableAmount} mevcut" }),
    h$1("sqm-rewards-table-source-column", { "column-title": "Kullan\u0131c\u0131lar", "anonymous-user": "Anonim Kullan\u0131c\u0131", "deleted-user": "Silinmi\u015F Kullan\u0131c\u0131", "reward-exchange-text": "\u00D6d\u00FClleri Kulann\u0131n", "referral-text": "{rewardSource, select, FRIEND_SIGNUP {Referans} REFERRED {Y\u00F6nlendiren} other {}}", "reward-source-text": "{rewardSource, select, MANUAL {Manuel} AUTOMATED {Otomatik} other {}}" }),
    h$1("sqm-rewards-table-status-column", { "column-title": "Statut", "status-text": "{status, select, AVAILABLE {Mevcut} PENDING {Bekleniyor} EXPIRED {Ge\u00E7mi\u015F} REDEEMED {Kullan\u0131lm\u0131\u015F} CANCELED {\u0130ptal Edildi} other {Kullan\u0131lamaz} }", "expiry-text": "Bitiyor " }),
    h$1("sqm-rewards-table-date-column", { "column-title": "Tarih" })));
});
const RewardsTableFr = createHookStory(() => {
  setupGraphQLKlip$1({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InNhbWZyZW5jaCIsImlkIjoic2FtZnJlbmNoIn19.cwhasHpfU5MLV4vGbCQcazb6p19iSw5pD2zyrVHgePg",
    id: "samfrench",
  });
  A$1(undefined);
  const props = {
    listType: "",
    render: () => { },
    disconnectedCallback: () => { },
    ignored: true,
  };
  return (h$1("sqm-rewards-table", { "per-page": "4", "more-label": "Plus", "prev-label": "Pr\u00E9c\u00E9dent", "empty-state-text": "Aucune R\u00E9compenses Maintenant" },
    h$1("sqm-rewards-table-reward-column", { "column-title": "R\u00E9compenses", "redeemed-text": "{redeemedAmount} rachet\u00E9e", "available-text": "{availableAmount} disponible" }),
    h$1("sqm-rewards-table-source-column", { "column-title": "Utilisateur", "anonymous-user": "Utilisateur Anonyme", "deleted-user": "Utilisateur Supprim\u00E9", "reward-exchange-text": "\u00C9change de R\u00E9compenses", "referral-text": "{rewardSource, select, FRIEND_SIGNUP {R\u00E9f\u00E9rence \u00E0} REFERRED {R\u00E9f\u00E9renc\u00E9 par} other {}}", "reward-source-text": "{rewardSource, select, MANUAL {Manuel} AUTOMATED {Automatique} other {}}" }),
    h$1("sqm-rewards-table-status-column", { "column-title": "Statut", "status-text": "{status, select, AVAILABLE {Disponible} PENDING {Pendant} EXPIRED {Expir\u00E9} REDEEMED {Rachet\u00E9} CANCELED {Annul\u00E9} other {Indisponible} }", "expiry-text": "Expire sur " }),
    h$1("sqm-rewards-table-date-column", { "column-title": "Date de R\u00E9ception" })));
});

const UseRewardsTable = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': UseRewardsTable_stories,
  RewardsTableWithProgram: RewardsTableWithProgram,
  RewardsTableNoProgram: RewardsTableNoProgram,
  RewardsTableEn: RewardsTableEn,
  RewardsTableTr: RewardsTableTr,
  RewardsTableFr: RewardsTableFr
});

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InNhbStrbGlwQHNhYXNxdWF0LmNoIiwiaWQiOiJzYW0ra2xpcEBzYWFzcXVhdC5jaCIsImVtYWlsIjoic2FtK2tsaXBAc2Fhc3F1YXQuY2giLCJsb2NhbGUiOiJlbiJ9fQ.a2nYYrSJ81FHXlCU-Sqp_-wquQizinHBhzwzULDzimg";
const UseTaskCard_stories = {
  title: "Hooks / useTaskCard",
};
function setupGraphQL$1() {
  const id = "sam+klip@saasquat.ch";
  const accountId = id;
  const programId = "klip-referral-program";
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a74miwdpofztj",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };
  useEffect(() => {
    ae$1({
      accountId,
      id,
      jwt: JWT,
    });
    return () => {
      window.widgetIdent = undefined;
      ae$1(undefined);
    };
  }, []);
  return { id, accountId };
}
const TaskCard$2 = createHookStory(() => {
  setupGraphQL$1();
  const props = {
    listType: "",
    render: () => { },
    disconnectedCallback: () => { },
    ignored: true,
  };
  return (h$1("sqm-task-card", { "card-title": "Comment on 5 articles", "button-text": "Start reading", goal: 5, steps: true, "show-progress-bar": true, "event-key": "testEvent", "open-new-tab": true }));
});
const TaskCardFeed = createHookStory(() => {
  setupGraphQL$1();
  const props = {
    listType: "",
    render: () => { },
    disconnectedCallback: () => { },
    ignored: true,
  };
  return (h$1("sqm-card-feed", null,
    h$1("sqm-task-card", { "reward-amount": "75", "card-title": "Refer a Friend", description: "Invite a friend to Klip and get 75 points when they signup for a free trial or contact our us about an enterprise license.", "button-text": "Start referring", "button-link": "https://klip-staging.vercel.app/app/klip-rewards", goal: 1, repeatable: true, "completed-text": "", demoData: "", "ended-message": "", "event-key": "", "expiry-message": "", "progress-bar-unit": "", "reward-duration": "2022-01-04T08:00:00.000Z/2022-01-20T08:00:00.000Z", "reward-unit": "", "starts-on-message": "", "stat-type": "", "display-duration": "2022-01-04T08:00:00.000Z/2022-01-05T08:00:00.000Z" }),
    h$1("sqb-program-section", { "program-id": "klip-loyalty" },
      h$1("sqm-task-card", { "reward-amount": "50", "card-title": "Follow Us on Twitter", description: "Earn 50 points when you follow us on Twitter!", "button-text": "Follow", "button-link": "https://twitter.com/", goal: 1, "stat-type": "/programGoals/count/Follow-on-Social-Media", "open-new-tab": "true", "event-key": "socialFollow" })),
    h$1("sqm-task-card", { "reward-amount": "250", goal: 500, "show-progress-bar": "true", "card-title": "Spend $500 on Klip Products", description: "Earn 250 points when you spend $500 or more on Klip products.", "button-text": "See plans", "button-link": "https://klip-staging.vercel.app/app/plans", "stat-type": "/customFields/purchaseTotal", "open-new-tab": "false" }),
    h$1("sqb-program-section", { "program-id": "klip-loyalty" },
      h$1("sqm-task-card", { "reward-amount": "25", goal: 1, "card-title": "Upload Your First Video", description: "Earn 25 points for exploring the Klip platform when you upload your first video.", "button-text": "Upload", "button-link": "https://klip-staging.vercel.app/app", "stat-type": "/programGoals/count/Record-First-Video", "open-new-tab": "false" })),
    h$1("sqm-task-card", { "reward-amount": "100", goal: 5, repeatable: true, "show-progress-bar": "true", steps: true, "card-title": "Share 5 Videos", description: "Earn 100 points for collaborating each time you share 5 videos.", "button-text": "Share", "button-link": "https://klip-staging.vercel.app/app", "stat-type": "/customFields/videosShared", "open-new-tab": "false" }),
    h$1("sqb-program-section", { "program-id": "klip-loyalty" },
      h$1("sqm-task-card", { "reward-amount": "1", "reward-unit": "Free Month", goal: 1, "card-title": "Upgrade Your Plan", description: "Buy a Business or Enterprise plan and get 1 free month of Klip for being a committed customer.", "button-text": "Upgrade", "button-link": "https://klip-staging.vercel.app/app/plans", "stat-type": "/programGoals/count/Upgrade-Plan", "open-new-tab": "false" })),
    h$1("sqm-task-card", { "reward-amount": "200", goal: 5, "show-progress-bar": "", "card-title": "Purchase 5 Seats", description: "Earn 200 points when you expand your Klip Team by purchasing 5 or more seats.", "button-text": "Purchase seats", "button-link": "https://klip-staging.vercel.app/app/plans", "stat-type": "/customFields/seatCount" }),
    h$1("sqm-task-card", { "reward-amount": "250", goal: 1, "show-progress-bar": "", "card-title": "Upload 1 Hour of Video", description: "Record and upload an hour of video and get 250 points for being a super user.", "button-text": "Upload", "button-link": "https://klip-staging.vercel.app/app", "stat-type": "/customFields/videoHoursCount", "progress-bar-unit": "", "reward-unit": "Points" }),
    h$1("sqb-program-section", { "program-id": "klip-loyalty" },
      h$1("sqm-task-card", { "reward-amount": "100", goal: 1, "card-title": "Complete an NPS Survey", description: "Fill out our NPS survey and get 100 points for giving us honest feedback. Be sure to use your Klip account email when completing the survey.", "button-text": "Complete survey", "button-link": "https://y5tqgj96plv.typeform.com/to/p6N7lHUk", "stat-type": "/programGoals/count/NPS-Survey", "reward-unit": "Points", "open-new-tab": "true" })),
    h$1("sqb-conditional-section", { condition: "'champion' in user.segments" },
      h$1("sqb-program-section", { "program-id": "klip-loyalty" },
        h$1("sqm-task-card", { "reward-amount": "$100", goal: 1, "card-title": "Complete a Case Study", description: "Write a Klip case study and earn a $100 Visa Gift Card for letting us know how Klip has helped your team succeed.", "button-text": "Complete case study", "button-link": "https://y5tqgj96plv.typeform.com/to/CPhkFBBW", "stat-type": "/programGoals/count/Case-Study", "reward-unit": "Visa Gift Card", "open-new-tab": "true" })))));
});

const UseTaskCard = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': UseTaskCard_stories,
  TaskCard: TaskCard$2,
  TaskCardFeed: TaskCardFeed
});

const NewPortal_stories = {
  title: "New Portal",
};
const style = {
  HeaderSubtitleBold: {
    "font-weight": 500,
    "text-decoration": "underline",
  },
};
const sheet = createStyleSheet(style);
const styleString = sheet.toString();
const barProps$1 = {
  data: {
    programs: [
      {
        key: "program1",
        label: "My Referral Program",
      },
      {
        key: "program2",
        label: "My Rewards Program",
      },
    ],
  },
};
const item1Props$1 = {
  states: {
    active: false,
  },
  data: {
    label: "Dashboard",
    icon: "house",
    path: "/",
  },
};
const item2Props$1 = {
  states: {
    active: true,
  },
  data: {
    label: "Activity",
    icon: "bar-chart",
    path: "/",
  },
};
const Sidebar$1 = () => {
  return (h$1(NavigationSidebarView, Object.assign({}, barProps$1),
    h$1(NavigationSidebarItemView, Object.assign({}, item1Props$1)),
    h$1(NavigationSidebarItemView, Object.assign({}, item2Props$1))));
};
const Dashboard$1 = () => {
  const sharelinkProps = {
    shareString: "https://ssqt.co/johnsmithrox",
    open: false,
    disabled: false,
    tooltiptext: "Share link copied",
    onClick: () => console.log("Share link copied"),
  };
  const sharecodeProps = {
    shareString: "JOHNSMITH1",
    open: false,
    disabled: false,
    tooltiptext: "Share code copied",
    onClick: () => console.log("Share code copied"),
  };
  const twitterButtonProps = {
    medium: "twitter",
    loading: false,
    disabled: false,
    pill: true,
    type: "default",
    size: "medium",
    icon: "twitter",
    hideicon: false,
    iconslot: "prefix",
    onClick: () => "Facebook share clicked",
    hide: false,
  };
  const facebookButtonProps = {
    medium: "facebook",
    loading: false,
    disabled: false,
    pill: true,
    type: "default",
    size: "medium",
    icon: "facebook",
    hideicon: false,
    iconslot: "prefix",
    onClick: () => "Facebook share clicked",
    hide: false,
  };
  const linkedinButtonProps = {
    medium: "linkedin",
    loading: false,
    disabled: false,
    pill: true,
    type: "default",
    size: "medium",
    icon: "linkedin",
    hideicon: false,
    iconslot: "prefix",
    onClick: () => "Facebook share clicked",
    hide: false,
  };
  return (h$1("sqm-divided-layout", { direction: "row" },
    h$1("style", { type: "text/css" }, styleString),
    h$1(Sidebar$1, null),
    h$1("sqm-divided-layout", { direction: "column" },
      h$1(PortalContainerView, Object.assign({}, { direction: "column", padding: "xxx-large", gap: "xxx-large" }),
        h$1(PortalSectionView, Object.assign({}, {
          labelMargin: "xx-small",
          padding: "none",
          label: (h$1("sqm-text", null,
            h$1("p", null, "Welcome back,"))),
          content: (h$1("sqm-text", null,
            h$1("h1", null, "John Smith"))),
        })),
        h$1(StatContainerView, Object.assign({}, { space: "64px" }),
          h$1(BigStatView, Object.assign({}, { statvalue: "2,345", value: 234500, loading: false }), "Clicks"),
          h$1(BigStatView, Object.assign({}, { statvalue: "58", value: 58, loading: false }), "Referrals"),
          h$1(BigStatView, Object.assign({}, { statvalue: "$10,540", value: 1054000, loading: false }), "Earned"),
          h$1(BigStatView, Object.assign({}, { statvalue: "$2,305", value: 230500, loading: false }), "Awaiting Payout"))),
      h$1(PortalContainerView, Object.assign({}, { direction: "column", padding: "xxx-large", gap: "xxx-large" }),
        h$1(PortalSectionView, Object.assign({}, {
          labelMargin: "x-large",
          padding: "none",
          label: (h$1("sqm-text", null,
            h$1("h2", null, "Partner and Profit"))),
          content: (h$1("sqm-text", null,
            h$1("p", null, "Get rewarded for referring potential customers to MyCompany. Earn commission for each successful lead you send our way"))),
        })),
        h$1(PortalSectionView, Object.assign({}, {
          labelMargin: "small",
          padding: "none",
          label: (h$1("sqm-text", null,
            h$1("h3", null, "Share your referral link"))),
          content: h$1(ShareLinkView, Object.assign({}, sharelinkProps)),
        })),
        h$1(PortalSectionView, Object.assign({}, {
          labelMargin: "small",
          padding: "none",
          label: (h$1("sqm-text", null,
            h$1("h3", null, "Share your referral code"))),
          content: h$1(ShareLinkView, Object.assign({}, sharecodeProps)),
        })),
        h$1(PortalSectionView, Object.assign({}, {
          labelMargin: "small",
          padding: "none",
          label: (h$1("sqm-text", null,
            h$1("h3", null, "Share via social media"))),
          content: (h$1(PortalContainerView, Object.assign({}, {
            direction: "row",
            padding: "large",
            gap: "xxx-large",
            minWidth: "150px",
          }),
            h$1(ShareButtonView, Object.assign({}, twitterButtonProps), "Tweet about us"),
            h$1(ShareButtonView, Object.assign({}, facebookButtonProps), "Share on Facebook"),
            h$1(ShareButtonView, Object.assign({}, linkedinButtonProps), "Post on Linkedin"))),
        }))))));
};
const EditProfile$1 = () => {
  return (h$1("sqm-divided-layout", { direction: "row" },
    h$1("style", { type: "text/css" }, styleString),
    h$1(Sidebar$1, null),
    h$1("sqm-divided-layout", { direction: "column" },
      h$1(PortalProfileView, Object.assign({}, {
        states: {
          success: false,
          loading: false,
          submitDisabled: false,
          showCountry: false,
          user: {
            id: "01",
            accountId: "111100000",
            firstName: "Joe",
            lastName: "Smith",
            email: "jsmith@gmail.com",
            countryCode: "5000",
          },
          text: {
            firstnametext: "First Name",
            lastnametext: "Last Name",
            emailtext: "Email",
            countrytext: "Country",
            editProfileHeader: "Edit your profile",
            editProfileSubHeader: "Personal Information",
            submitChangeButtonText: "Submit Changes",
          },
          formState: {
            country: "Canada",
            firstName: "Joe",
            lastName: "Smith",
            errors: null,
            error: "",
          },
        },
        callbacks: {
          onSubmit: (e) => console.log(e),
          onChange: (e) => console.log(e),
        },
      })),
      h$1(PortalChangePasswordView, Object.assign({}, {
        states: {
          open: true,
          error: "",
          loading: false,
          success: false,
          content: {
            modalChangePasswordHeader: "Change Password",
            cancelText: "Cancel",
            changePasswordButtonText: "Change Password",
            passwordFieldLabel: "Password",
            confirmPasswordFieldLabel: "Confirm new password",
            successMessage: "Your password has been updated.",
            portalChangePasswordHeader: "Password",
            portalChangePasswordButtonText: "Change your password...",
          },
        },
        callbacks: {
          setOpen: () => console.log("open"),
          submit: () => console.log("submit"),
        },
      })))));
};
const Commissions = () => {
  return (h$1("sqm-divided-layout", { direction: "row" },
    h$1("style", { type: "text/css" }, styleString),
    h$1(Sidebar$1, null),
    h$1("sqm-divided-layout", { direction: "column" },
      h$1(PortalContainerView, Object.assign({}, { direction: "column", padding: "xxx-large", gap: "xxx-large" }),
        h$1(PortalSectionView, Object.assign({}, {
          labelMargin: "xx-small",
          padding: "none",
          label: (h$1("sqm-text", null,
            h$1("h2", null, "Commissions"))),
          content: (h$1("sqm-text", null,
            h$1("p", null,
              "for the",
              " ",
              h$1("span", { class: sheet.classes.HeaderSubtitleBold }, "Partner Program #1"),
              " ",
              "program"))),
        })),
        h$1(StatContainerView, Object.assign({}, { space: "64px" }),
          h$1(BigStatView, Object.assign({}, { statvalue: "$ 1,000", value: 100000, loading: false }), "Total Earned"),
          h$1(BigStatView, Object.assign({}, { statvalue: "$ 800", value: 80000, loading: false }), "Available"),
          h$1(BigStatView, Object.assign({}, { statvalue: "$ 180", value: 18000, loading: false }), "Pending"),
          h$1(BigStatView, Object.assign({}, { statvalue: "$ 20", value: 2000, loading: false }), "Redeemed"))))));
};
const Activity$1 = () => {
  return (h$1("sqm-divided-layout", { direction: "row" },
    h$1("style", { type: "text/css" }, styleString),
    h$1(Sidebar$1, null),
    h$1("sqm-divided-layout", { direction: "column" },
      h$1(PortalContainerView, Object.assign({}, { direction: "column", padding: "xxx-large", gap: "xxx-large" }),
        h$1(PortalSectionView, Object.assign({}, {
          labelMargin: "xx-small",
          padding: "none",
          label: (h$1("sqm-text", null,
            h$1("h2", null, "Activity"))),
          content: (h$1("sqm-text", null,
            h$1("p", null,
              "for the",
              " ",
              h$1("span", { class: sheet.classes.HeaderSubtitleBold }, "Partner Program #1"),
              " ",
              "program"))),
        })),
        h$1(PortalSectionView, Object.assign({}, {
          labelMargin: "x-large",
          padding: "none",
          label: (h$1("sqm-text", null,
            h$1("h3", null, "Referral Activity"))),
          content: (h$1(StatContainerView, Object.assign({}, { space: "64px" }),
            h$1(BigStatView, Object.assign({}, { statvalue: "1,000", value: 100000, loading: false }), "Total Referrals"),
            h$1(BigStatView, Object.assign({}, { statvalue: "800", value: 800, loading: false }), "Converted"),
            h$1(BigStatView, Object.assign({}, { statvalue: "180", value: 180, loading: false }), "Pending"),
            h$1(BigStatView, Object.assign({}, { statvalue: "20", value: 20, loading: false }), "Disqualified"))),
        }))),
      h$1(PortalSectionView, Object.assign({}, {
        labelMargin: "x-large",
        padding: "xxx-large",
        label: (h$1("sqm-text", null,
          h$1("h3", null, "Traffic Generated"))),
        content: (h$1(StatContainerView, Object.assign({}, { space: "64px" }),
          h$1(BigStatView, Object.assign({}, { statvalue: "1,000", value: 1000, loading: false }), "Clicks"),
          h$1(BigStatView, Object.assign({}, { statvalue: "800", value: 800, loading: false }), "From share link"),
          h$1(BigStatView, Object.assign({}, { statvalue: "180", value: 180, loading: false }), "From share mediums"))),
      })))));
};

const NewPortal = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': NewPortal_stories,
  Dashboard: Dashboard$1,
  EditProfile: EditProfile$1,
  Commissions: Commissions,
  Activity: Activity$1
});

const SidebarItem_stories = {
  title: "Components/Sidebar Item",
};
const InactiveItem = () => {
  const props = {
    states: {
      active: false,
    },
    data: {
      label: "Dashboard",
      icon: "house",
      path: "/",
    },
  };
  return h$1(NavigationSidebarItemView, Object.assign({}, props));
};
const ActiveItem = () => {
  const props = {
    states: {
      active: true,
    },
    data: {
      label: "Dashboard",
      icon: "house",
      path: "/",
    },
  };
  return h$1(NavigationSidebarItemView, Object.assign({}, props));
};

const SidebarItem = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': SidebarItem_stories,
  InactiveItem: InactiveItem,
  ActiveItem: ActiveItem
});

const NavigationSidebar_stories = {
  title: "Components/Navigation Sidebar",
};
const DefaultNavigationSidebar = () => {
  const barProps = {
    data: {
      programs: [
        {
          key: "program1",
          label: "My Referral Program",
        },
        {
          key: "program2",
          label: "My Rewards Program",
        },
      ],
    },
  };
  const item1Props = {
    states: {
      active: false,
    },
    data: {
      label: "Dashboard",
      icon: "house",
      path: "/",
    },
  };
  const item2Props = {
    states: {
      active: true,
    },
    data: {
      label: "Activity",
      icon: "bar-chart",
      path: "/",
    },
  };
  return (h$1(NavigationSidebarView, Object.assign({}, barProps),
    h$1(NavigationSidebarItemView, Object.assign({}, item1Props)),
    h$1(NavigationSidebarItemView, Object.assign({}, item2Props))));
};

const NavigationSidebar = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': NavigationSidebar_stories,
  DefaultNavigationSidebar: DefaultNavigationSidebar
});

const PortalLogin_stories = {
  title: "Components/Portal Login",
};
const defaultProps$7 = {
  states: {
    error: "",
    loading: false,
    forgotPasswordPath: "/forgotPassword",
    registerPath: "/register",
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: { pageLabel: "Sign in to your account" }
};
const errorProps$8 = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    forgotPasswordPath: "/forgotPassword",
    registerPath: "/register",
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: { pageLabel: "Sign in to your account" }
};
const loadingProps$6 = {
  states: {
    error: "",
    loading: true,
    forgotPasswordPath: "/forgotPassword",
    registerPath: "/register",
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: { pageLabel: "Sign in to your account" }
};
const Default$9 = () => h$1(PortalLoginView, Object.assign({}, defaultProps$7));
const LoginWithError = () => h$1(PortalLoginView, Object.assign({}, errorProps$8));
const LoginLoading = () => h$1(PortalLoginView, Object.assign({}, loadingProps$6));

const PortalLogin = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': PortalLogin_stories,
  Default: Default$9,
  LoginWithError: LoginWithError,
  LoginLoading: LoginLoading
});

const PortalRegister_stories = {
  title: "Components/Portal Register",
};
const defaultProps$6 = {
  states: {
    error: "",
    loading: false,
    confirmPassword: true,
    hideInputs: false,
    loginPath: "/login",
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => { },
  },
  refs: {
    formRef: {},
  },
  content: { pageLabel: "Register", confirmPasswordLabel: "Confirm Password" },
};
const errorProps$7 = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    confirmPassword: true,
    hideInputs: false,
    loginPath: "/login",
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => { },
  },
  refs: {
    formRef: {},
  },
  content: {
    pageLabel: "Register",
    confirmPasswordLabel: "Confirm Password",
  },
};
const loadingProps$5 = {
  states: {
    error: "",
    loading: true,
    confirmPassword: true,
    hideInputs: false,
    loginPath: "/login",
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => { },
  },
  refs: {
    formRef: {},
  },
  content: { pageLabel: "Register", confirmPasswordLabel: "Confirm Password" },
};
const slottedProps = {
  states: {
    error: "",
    loading: false,
    confirmPassword: true,
    hideInputs: false,
    loginPath: "/login",
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => { },
  },
  refs: {
    formRef: {},
  },
  content: {
    pageLabel: "Register",
    confirmPasswordLabel: "Confirm Password",
    formData: (h$1("div", null,
      h$1("sl-input", { style: { marginBottom: "var(--sl-spacing-x-large)" }, exportparts: "label: input-label", label: "Slotted Input", required: true }),
      h$1("sl-input", { exportparts: "label: input-label", label: "Slotted Input 2", required: true }))),
  },
};
const Default$8 = () => h$1(PortalRegisterView, Object.assign({}, defaultProps$6));
const RegisterWithError = () => h$1(PortalRegisterView, Object.assign({}, errorProps$7));
const RegisterLoading = () => h$1(PortalRegisterView, Object.assign({}, loadingProps$5));
const FieldsHidden = () => {
  return (h$1("sqm-portal-register", { demoData: {
      states: {
        error: "",
        loading: true,
        confirmPassword: true,
        hideInputs: true,
        loginPath: "/login",
      },
    } }));
};
const SlottedInputs = () => h$1(PortalRegisterView, Object.assign({}, slottedProps));
const TermsAndConditions = () => (h$1(PortalRegisterView, Object.assign({}, defaultProps$6, { content: {
    ...defaultProps$6.content,
    terms: (h$1("p", null,
      "By signing up you agree to the",
      " ",
      h$1("a", { href: "https://example.com", target: "_blank" }, "Terms and Conditions"))),
  } })));

const PortalRegister = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': PortalRegister_stories,
  Default: Default$8,
  RegisterWithError: RegisterWithError,
  RegisterLoading: RegisterLoading,
  FieldsHidden: FieldsHidden,
  SlottedInputs: SlottedInputs,
  TermsAndConditions: TermsAndConditions
});

const scenario$a = "@author:derek\r\n@owner:ian\r\nFeature: Forgot Password\r\n\r\n  @motivating\r\n  Scenario: Users can request to reset their password\r\n    Given a user enters their email address\r\n    And that email address is linked to a previously created account\r\n    When they click \"Reset Password\"\r\n    Then the button enters a loading state\r\n    When the password reset email is sent\r\n    Then a confirmation banner is shown stating a password reset email was sent\r\n\r\n  @motivating\r\n  Scenario: Users are notified if sending their password reset email fails\r\n    Given a user enters their email address\r\n    And that email address is linked to a previously created account\r\n    When they click \"Reset Password\"\r\n    Then the button enters a loading state\r\n    When the password reset email fails to send\r\n    Then the user does not receive a password reset email\r\n    And an error banner is shown stating that they should try again\r\n\r\n  @motivating\r\n  @landmine\r\n  Scenario: If the input email is not associated to an account a success banner is shown but an email is not be sent\r\n    Given the user entered an email address that is not associated to an accoun\r\n    When they click \"Reset Password\"\r\n    Then the button enters a loading state\r\n    But no email is sent\r\n    And a success banner is shown stating a password reset email was sent if the given email was associated to an account\r\n\r\n  @motivating\r\n  Scenario: Users can resend password reset email\r\n    Given a user had previously requested to reset their password\r\n    When they enter their email address\r\n    And that email address is linked to a previously created account\r\n    And they click \"Reset Password\"\r\n    Then the user receives a second password reset email\r\n    And a success banner is shown stating that their email was sent\r\n\r\n  @motivating\r\n  Scenario Outline: The email link can be configured to redirect users to a specific base path but defaults to \"/resetPassword\"\r\n    Given a user viewing the password reset component\r\n    And the component <mayHave> \"redirect-path\" with <value>\r\n    When they request a password reset email\r\n    And they click the link in the email\r\n    Then they are redirected to <redirectPath>\r\n    Examples:\r\n      | mayHave      | value            | redirectPath     |\r\n      | doesn't have | N/A              | /resetPassword   |\r\n      | has          | /resetMyPassword | /resetMyPassword |\r\n\r\n  @minutae\r\n  Scenario Outline: Navigation back to the login page can be customized but defaults to \"/login\"\r\n    Given a user viewing the password reset component\r\n    And the component <mayHave> \"login-path\" with <value>\r\n    Then they see a \"Sign In\" text button\r\n    When they click \"Sign In\"\r\n    Then they are redirected to <redirectPath>\r\n    Examples:\r\n      | mayHave      | value   | redirectPath |\r\n      | doesn't have | N/A     | /login       |\r\n      | has          | /signin | /signin      |";

const PortalForgotPassword_stories = {
  title: "Components/Portal Forgot Password",
  parameters: {
    scenario: scenario$a,
  },
};
const defaultProps$5 = {
  states: {
    error: "",
    loading: false,
    success: false,
    loginPath: "/login",
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    secondaryButton: "Cancel",
    messageSlot: "Enter your email below to receive a password reset link.",
  },
};
const errorProps$6 = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    success: false,
    loginPath: "/login",
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    secondaryButton: "Cancel",
    messageSlot: "Enter your email below to receive a password reset link.",
  },
};
const loadingProps$4 = {
  states: {
    error: "",
    loading: true,
    success: false,
    loginPath: "/login",
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    secondaryButton: "Cancel",
    messageSlot: "Enter your email below to receive a password reset link.",
  },
};
const successProps$4 = {
  states: {
    error: "",
    loading: false,
    success: true,
    loginPath: "/login",
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    secondaryButton: "Cancel",
    messageSlot: "Enter your email below to receive a password reset link.",
  },
};
const Default$7 = () => h$1(PortalForgotPasswordView, Object.assign({}, defaultProps$5));
const ForgotPasswordWithError = () => (h$1(PortalForgotPasswordView, Object.assign({}, errorProps$6)));
const ForgotPasswordLoading = () => (h$1(PortalForgotPasswordView, Object.assign({}, loadingProps$4)));
const ForgotPasswordSuccess = () => (h$1(PortalForgotPasswordView, Object.assign({}, successProps$4)));

const PortalForgotPassword = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': PortalForgotPassword_stories,
  Default: Default$7,
  ForgotPasswordWithError: ForgotPasswordWithError,
  ForgotPasswordLoading: ForgotPasswordLoading,
  ForgotPasswordSuccess: ForgotPasswordSuccess
});

const scenario$9 = "@author:derek\r\n@owner:ian\r\nFeature: Email Verification\r\n\r\n    @minutae\r\n    Scenario: User's redirected from registration can re-send their verification email\r\n        Given a user has registered\r\n        And they have been sent a verification email\r\n        When they are redirected to the email verification page\r\n        Then a message is displayed\r\n        And it reflects that a email has been sent to their email\r\n        But they can still re-send the email\r\n        When they click to \"Resend-Email\"\r\n        Then they receive a verification email\r\n\r\n    @motivating\r\n    Scenario: Users are notified if sending the email verification message fails\r\n        Given a user viewing the email verification component\r\n        And they have an email stored in session data from registration\r\n        When they click to \"Resend-Email\"\r\n        Then the button enters a loading state\r\n        When an error occurs trying to send the verification email\r\n        Then the user does not receive a verification email\r\n        And an error banner is shown stating that they should try again\r\n\r\n    @motivating\r\n    Scenario: Users are notified if sending the email verification message succeeds\r\n        Given a user viewing the email verification component\r\n        And they have an email stored in session data from registration\r\n        When they click to \"Resend-Email\"\r\n        Then the button enters a loading state\r\n        When the email verification message sends\r\n        Then the user receives a verification email\r\n        And a success banner is shown stating that their email was resent\r\n\r\n    @motivating\r\n    Scenario Outline: The email link can be configured to redirect users to a specific base path but defaults to \"/verifyEmail\"\r\n        Given a user viewing the email verification component\r\n        And they have an email stored in session data from registration\r\n        And the component <mayHave> \"redirect-path\" with <value>\r\n        When they resend their verification email\r\n        And they click the link in the email\r\n        Then they are redirected to <redirectPath>\r\n        Examples:\r\n            | mayHave      | value          | redirectPath   |\r\n            | doesn't have | N/A            | /verifyEmail   |\r\n            | has          | /verifyMyEmail | /verifyMyEmail |";

const PortalEmailVerification_stories = {
  title: "Components/Portal Email Verification",
  parameters: {
    scenario: scenario$9,
  },
};
const defaultProps$4 = {
  states: {
    error: "",
    loading: false,
    success: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    email: "email@example.com",
    verifyMessage: "A verification email was sent to {email}. Please verify your email to continue to the portal.",
    emailVerificationHeader: "Verify your email",
    resendEmailButtonText: "Re-send Email",
  },
};
const errorProps$5 = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    success: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    email: "email@example.com",
    verifyMessage: "A verification email was sent to {email}. Please verify your email to continue to the portal.",
    emailVerificationHeader: "Verify your email",
    resendEmailButtonText: "Re-send Email",
  },
};
const loadingProps$3 = {
  states: {
    error: "",
    loading: true,
    success: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    email: "email@example.com",
    verifyMessage: "A verification email was sent to {email}. Please verify your email to continue to the portal.",
    emailVerificationHeader: "Verify your email",
    resendEmailButtonText: "Re-send Email",
  },
};
const successProps$3 = {
  states: {
    error: "",
    loading: false,
    success: true,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    email: "email@example.com",
    verifyMessage: "A verification email was sent to {email}. Please verify your email to continue to the portal.",
    emailVerificationHeader: "Verify your email",
    resendEmailButtonText: "Re-send Email",
  },
};
const Default$6 = () => h$1(PortalEmailVerificationView, Object.assign({}, defaultProps$4));
const EmailVerificationWithError$1 = () => (h$1(PortalEmailVerificationView, Object.assign({}, errorProps$5)));
const EmailVerificationLoading = () => (h$1(PortalEmailVerificationView, Object.assign({}, loadingProps$3)));
const EmailVerificationSuccess$1 = () => (h$1(PortalEmailVerificationView, Object.assign({}, successProps$3)));

const PortalEmailVerification = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': PortalEmailVerification_stories,
  Default: Default$6,
  EmailVerificationWithError: EmailVerificationWithError$1,
  EmailVerificationLoading: EmailVerificationLoading,
  EmailVerificationSuccess: EmailVerificationSuccess$1
});

const scenario$8 = "@author:derek\r\n@owner:ian\r\nFeature: Reset Password\r\n\r\n    Background: A user in on the password reset page\r\n        Given a user who has been redirected to the password reset page\r\n\r\n    @motivating\r\n    Scenario: Users can reset their password\r\n        Given a user has a valid oob code as a url query parameter\r\n        When they enter their password twice\r\n        And they click \"Update\"\r\n        Then their password is updated\r\n        And a banner with a success message is displayed\r\n        And they can log in with their new password\r\n\r\n    @motivating\r\n    Scenario Outline: Users cannot reset their password with an invalid or missing oob code\r\n        Given a user has a <oobCode> as a url query parameter\r\n        And the component <mayHave> \"failed-page\" with <value>\r\n        Then they see an error message saying that their password reset code is invalid/expired\r\n        When they click \"Continue\"\r\n        Then they are redirected to <redirectPath>\r\n        Examples:\r\n            | oobCode               | mayHave      | value  | redirectPath |\r\n            | invalid oob code      | doesn't have | N/A    | /            |\r\n            | non existant oob code | doesn't have | N/A    | /            |\r\n            | invalid oob code      | has          | /login | /login       |\r\n            | non existant oob code | has          | /login | /login       |\r\n\r\n    @motivating\r\n    Scenario: Users must enter the same password twice to successfully reset their password\r\n        Given a user has been redirected to the password reset page\r\n        And they have a valid oob code as a url query parameter\r\n        When they enter two different passwords into the password reset form\r\n        And they click \"Update\"\r\n        Then their password is not be reset\r\n        And an error banner stating the input passwords must match appears\r\n        And their password is not be reset\r\n        When they enter the same password twice\r\n        And they click \"Update\"\r\n        Then a banner appears with a success message\r\n        And they can log in with their new password\r\n\r\n    @motivating\r\n    Scenario: Users are redirected to \"/\" by default\r\n        Given the component does not have prop \"nextPage\"\r\n        And the users url does not contain a \"nextPage\" query parameter\r\n        And a user has entered their password twice\r\n        When they click \"Update\"\r\n        Then their password is updated\r\n        And they are redirected to \"/\"\r\n\r\n    @motivating\r\n    Scenario: Custom redirection can be configured\r\n        Given the component has prop \"nextPage\" with value \"/activity\"\r\n        And the users url does not contain a \"nextPage\" query parameter\r\n        And a user has entered their password twice\r\n        When they click \"Update\"\r\n        Then their password is updated\r\n        And they are redirected to \"/activity\"";

const PortalResetPassword_stories = {
  title: "Components/Portal Reset Password",
  parameters: {
    scenario: scenario$8,
  },
};
const defaultProps$3 = {
  states: {
    error: "",
    loading: false,
    reset: false,
    confirmPassword: true,
    oobCodeValidating: false,
    oobCodeValid: true,
    content: {
      passwordResetHeader: "Password reset",
      resetPasswordHeader: "Reset your password",
      continueButtonText: "Continue",
      resetPasswordButtonText: "Reset Password",
      confirmPasswordFieldLabel: "Confirm Password",
      passwordFieldLabel: "New Password",
    },
  },
  callbacks: {
    submit: async (e) => await e,
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};
const defaultPropsNoConfirm = {
  states: {
    error: "",
    loading: false,
    reset: false,
    confirmPassword: false,
    oobCodeValidating: false,
    oobCodeValid: true,
    content: {
      passwordResetHeader: "Password reset",
      resetPasswordHeader: "Reset your password",
      continueButtonText: "Continue",
      resetPasswordButtonText: "Reset Password",
      confirmPasswordFieldLabel: "Confirm Password",
      passwordFieldLabel: "New Password",
    },
  },
  callbacks: {
    submit: async (e) => await e,
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};
const errorProps$4 = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    reset: false,
    confirmPassword: true,
    oobCodeValidating: false,
    oobCodeValid: true,
    content: {
      passwordResetHeader: "Password reset",
      resetPasswordHeader: "Reset your password",
      continueButtonText: "Continue",
      resetPasswordButtonText: "Reset Password",
      confirmPasswordFieldLabel: "Confirm Password",
      passwordFieldLabel: "New Password",
    },
  },
  callbacks: {
    submit: async (e) => await e,
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};
const loadingProps$2 = {
  states: {
    error: "",
    loading: true,
    reset: false,
    confirmPassword: true,
    oobCodeValidating: false,
    oobCodeValid: true,
    content: {
      passwordResetHeader: "Password reset",
      resetPasswordHeader: "Reset your password",
      continueButtonText: "Continue",
      resetPasswordButtonText: "Reset Password",
      confirmPasswordFieldLabel: "Confirm Password",
      passwordFieldLabel: "New Password",
    },
  },
  callbacks: {
    submit: async (e) => await e,
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};
const successProps$2 = {
  states: {
    error: "",
    loading: false,
    reset: true,
    confirmPassword: true,
    oobCodeValidating: false,
    oobCodeValid: true,
    content: {
      passwordResetHeader: "Password reset",
      resetPasswordHeader: "Reset your password",
      continueButtonText: "Continue",
      resetPasswordButtonText: "Reset Password",
      confirmPasswordFieldLabel: "Confirm Password",
      passwordFieldLabel: "New Password",
    },
  },
  callbacks: {
    submit: async (e) => await e,
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};
const validatingCodeProps = {
  states: {
    error: "",
    loading: false,
    reset: false,
    confirmPassword: true,
    oobCodeValidating: false,
    oobCodeValid: false,
    content: {
      passwordResetHeader: "Password reset",
      resetPasswordHeader: "Reset your password",
      continueButtonText: "Continue",
      resetPasswordButtonText: "Reset Password",
      confirmPasswordFieldLabel: "Confirm Password",
      passwordFieldLabel: "New Password",
    },
  },
  callbacks: {
    submit: async (e) => await e,
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};
const Default$5 = () => h$1(PortalResetPasswordView, Object.assign({}, defaultProps$3));
const DefaultWithoutConfirmField = () => (h$1(PortalResetPasswordView, Object.assign({}, defaultPropsNoConfirm)));
const ResetPasswordWithError = () => (h$1(PortalResetPasswordView, Object.assign({}, errorProps$4)));
const ResetPasswordLoading = () => (h$1(PortalResetPasswordView, Object.assign({}, loadingProps$2)));
const ResetPasswordSuccess = () => (h$1(PortalResetPasswordView, Object.assign({}, successProps$2)));
const CodeValidating = () => (h$1(PortalResetPasswordView, Object.assign({}, validatingCodeProps)));

const PortalResetPassword = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': PortalResetPassword_stories,
  Default: Default$5,
  DefaultWithoutConfirmField: DefaultWithoutConfirmField,
  ResetPasswordWithError: ResetPasswordWithError,
  ResetPasswordLoading: ResetPasswordLoading,
  ResetPasswordSuccess: ResetPasswordSuccess,
  CodeValidating: CodeValidating
});

const scenario$7 = "@author:derek\r\n@owner:ian\r\nFeature: Verify Email\r\n\r\n    Background: A user is on the email verification page\r\n        Given a user who has been redirected to the email verification page\r\n\r\n    @motivating\r\n    Scenario: Verifying your email takes you to the portal login page\r\n        Given a user has a valid oob code as a url query parameter\r\n        When they click \"Verify Email\"\r\n        Then the button enters a loading state\r\n        When their email is validated\r\n        Then a button that says \"Continue\" appears\r\n        When they click \"Continue\"\r\n        Then they are redirected to login\r\n\r\n    @motivating\r\n    Scenario: Users are automatically redirected if they dont click \"Continue\"\r\n        Given a user has a valid oob code as a url query parameter\r\n        When they click \"Verify Email\"\r\n        Then the button enters a loading state\r\n        When their email is validated\r\n        Then a button that says \"Continue\" appears\r\n        When they wait 5 seconds\r\n        Then they are redirected to login\r\n\r\n    @motivating\r\n    Scenario: Users are notified if verifying their email has failed\r\n        Given a user has a valid oob code as a url query parameter\r\n        When they click \"Verify Email\"\r\n        Then the button enters a loading state\r\n        When their email fails to be validated\r\n        Then an banner is shown stating that an error occured\r\n\r\n    @motivating\r\n    Scenario Outline: Users cannot verify their email with an invalid or missing oob code\r\n        Given a user has a <oobCode> as a url query parameter\r\n        And the component <mayHave> \"failed-page\" with <value>\r\n        Then they see an error message saying that their verification code is invalid/expired\r\n        When they click \"Continue\"\r\n        Then they are redirected to <redirectPath>\r\n        Examples:\r\n            | oobCode               | mayHave      | value  | redirectPath |\r\n            | invalid oob code      | doesn't have | N/A    | /            |\r\n            | non existant oob code | doesn't have | N/A    | /            |\r\n            | invalid oob code      | has          | /login | /login       |\r\n            | non existant oob code | has          | /login | /login       |\r\n\r\n    @motivating\r\n    Scenario: Users are redirected to \"/\" by default\r\n        Given the component does not have prop \"nextPage\"\r\n        And the users url does not contain a \"nextPage\" query parameter\r\n        And a user has verified their email\r\n        When they click \"Continue\"\r\n        Then they are redirected to \"/\"\r\n\r\n    @motivating\r\n    Scenario: Custom redirection can be configured\r\n        Given the component has prop \"nextPage\" with value \"/activity\"\r\n        And the users url does not contain a \"nextPage\" query parameter\r\n        And a user has verified their email\r\n        When they click \"Continue\"\r\n        Then they are redirected to \"/activity\"\r\n\r\n    @motivating\r\n    Scenario Outline: Users are redirected to the value of the nextPage url parameter if it exists\r\n        Given the component <mayHave> prop \"nextPage\" with <nextPageValue>\r\n        And the users url contains a \"nextPage\" query paramater with <nextPageParamValue>\r\n        And the user has verified their email\r\n        When they click \"Continue\"\r\n        Then they are redirected to <nextPageParamValue>\r\n        Examples:\r\n            | mayHave       | nextPageValue | nextPageParamValue |\r\n            | has           | /dashboard    | /activity          |\r\n            | does not have | N/A           | /activity          |";

const PortalVerifyEmail_stories = {
  title: "Components/Portal Verify Email",
  parameters: {
    scenario: scenario$7,
  },
};
const errorProps$3 = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    verified: false,
  },
  data: {
    oobCode: "abc123",
  },
  callbacks: {
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};
const verifiedProps = {
  states: {
    error: "",
    loading: false,
    verified: true,
  },
  data: {
    oobCode: "abc123",
  },
  callbacks: {
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};
const EmailVerificationWithError = () => (h$1(PortalVerifyEmailView, Object.assign({}, errorProps$3)));
const EmailVerificationSuccess = () => (h$1(PortalVerifyEmailView, Object.assign({}, verifiedProps)));

const PortalVerifyEmail = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': PortalVerifyEmail_stories,
  EmailVerificationWithError: EmailVerificationWithError,
  EmailVerificationSuccess: EmailVerificationSuccess
});

const AssetCard_stories = {
  title: "Components/Asset Card",
};
const Default$4 = () => {
  const props = {
    text: { titleText: "Marketing Banner" },
    imgUrl: "../../assets/saasquatch-logo.png",
    callbacks: {},
  };
  return h$1(AssetCardView, Object.assign({}, props));
};
const CardWithLongText = () => {
  const props = {
    text: { titleText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, sunt dolores? Dolore temporibus autem officia blanditiis minus in voluptatem molestiae!" },
    imgUrl: "../../assets/saasquatch-logo.png",
    callbacks: {},
  };
  return h$1(AssetCardView, Object.assign({}, props));
};
const CardWithNoImg = () => {
  const props = {
    text: { titleText: "Marketing Banner" },
    imgUrl: "",
    callbacks: {},
  };
  return h$1(AssetCardView, Object.assign({}, props));
};

const AssetCard = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': AssetCard_stories,
  Default: Default$4,
  CardWithLongText: CardWithLongText,
  CardWithNoImg: CardWithNoImg
});

const DividedLayout_stories = {
  title: "Components/Divided Layout",
};
const barProps = {
  data: {
    programs: [
      {
        key: "program1",
        label: "My Referral Program",
      },
      {
        key: "program2",
        label: "My Rewards Program",
      },
    ],
  },
};
const item1Props = {
  states: {
    active: false,
  },
  data: {
    label: "Dashboard",
    icon: "house",
    path: "/",
  },
};
const item2Props = {
  states: {
    active: true,
  },
  data: {
    label: "Activity",
    icon: "bar-chart",
    path: "/",
  },
};
const Sidebar = () => {
  return (h$1(NavigationSidebarView, Object.assign({}, barProps),
    h$1(NavigationSidebarItemView, Object.assign({}, item1Props)),
    h$1(NavigationSidebarItemView, Object.assign({}, item2Props))));
};
const Row = () => {
  return (h$1("sqm-divided-layout", { direction: "row" },
    h$1(Sidebar, null),
    h$1("div", { style: { padding: "48px" } },
      h$1(PortalSectionView, Object.assign({}, {
        labelMargin: "xx-small",
        padding: "none",
        label: (h$1("sqm-text", null,
          h$1("p", null, "Welcome back,"))),
        content: (h$1("sqm-text", null,
          h$1("h1", null, "Joe Smith"))),
      })))));
};
const Column = () => {
  return (h$1("sqm-divided-layout", { direction: "column" },
    h$1(Sidebar, null),
    h$1("div", { style: { padding: "48px" } },
      h$1(PortalSectionView, Object.assign({}, {
        labelMargin: "xx-small",
        padding: "none",
        label: (h$1("sqm-text", null,
          h$1("p", null, "Welcome back,"))),
        content: (h$1("sqm-text", null,
          h$1("h1", null, "Joe Smith"))),
      })))));
};
const ColumnCustomDivider = () => {
  return (h$1("sqm-divided-layout", { direction: "column", dividerStyle: "1px solid red" },
    h$1(Sidebar, null),
    h$1("div", { style: { padding: "48px" } },
      h$1(PortalSectionView, Object.assign({}, {
        labelMargin: "xx-small",
        padding: "none",
        label: (h$1("sqm-text", null,
          h$1("p", null, "Welcome back,"))),
        content: (h$1("sqm-text", null,
          h$1("h1", null, "Joe Smith"))),
      })))));
};

const DividedLayout = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': DividedLayout_stories,
  Row: Row,
  Column: Column,
  ColumnCustomDivider: ColumnCustomDivider
});

const scenario$6 = "Feature: Change Password\r\n\r\n    @motivating\r\n    Scenario: Users can change their password\r\n        Given a user has registered for the portal\r\n        And they have a password\r\n        When they navigate to the edit profile page\r\n        And click \"Change your password...\"\r\n        Then a popup will appear\r\n        When they enter their new password\r\n        And confirm it\r\n        And click \"Change Password\"\r\n        Then they will see a success banner stating that the change was successful\r\n        When they logout\r\n        And try to login\r\n        Then they will not be able to login with their old password\r\n        But they will be able to login with their new password\r\n\r\n    @motivating\r\n    Scenario: Users must confirm their password change\r\n        Given a user has registered for the portal\r\n        When they navigate to the edit profile page\r\n        And click \"Change your password...\"\r\n        Then a popup will appear\r\n        When they enter their new password\r\n        But they enter a different password to confirm\r\n        And click \"Change Password\"\r\n        Then they will see an error banner stating that the passwords didnt match\r\n        When they logout\r\n        And try to login\r\n        Then they will be able to login with their existing password\r\n\r\n    @motivating\r\n    Scenario: Users must enter a new password and confirm it to change their password\r\n        Given a user has registered for the portal\r\n        When they navigate to the edit profile page\r\n        And click \"Change your password...\"\r\n        Then a popup will appear\r\n        When they click \"Change password\"\r\n        Then a validation error will appear for the new password field\r\n        And their password will not be changed\r\n        When they enter a new password\r\n        And they click \"Change password\"\r\n        Then a validation error will appear for the confirm new password field\r\n        And their password will not be changed\r\n\r\n    @motivating\r\n    Scenario: An error banner will be displayed if the password change fails\r\n        Given a user has registered for the portal\r\n        When they navigate to the edit profile page\r\n        And click \"Change your password...\"\r\n        When they enter their new password\r\n        And confirm it\r\n        And click \"Change Password\"\r\n        But the change fails\r\n        Then they will see an error banner stating that the change failed\r\n        When they logout\r\n        And try to login\r\n        Then they will be able to login with their existing password";

const ChangePassword_stories = {
  title: "Components/Change Password",
  parameters: {
    scenario: scenario$6,
  },
};
const defaultProps$2 = {
  states: {
    open: false,
    loading: false,
    success: false,
    error: "",
    content: {
      modalChangePasswordHeader: "Change Password",
      cancelText: "Cancel",
      changePasswordButtonText: "Change Password",
      passwordFieldLabel: "New Password",
      confirmPasswordFieldLabel: "Confirm new password",
      successMessage: "Your password has been updated.",
      portalChangePasswordHeader: "Password",
      portalChangePasswordButtonText: "Change your password...",
    },
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};
const openProps = {
  states: {
    open: true,
    loading: false,
    success: false,
    error: "",
    content: {
      modalChangePasswordHeader: "Change Password",
      cancelText: "Cancel",
      changePasswordButtonText: "Change Password",
      passwordFieldLabel: "New Password",
      confirmPasswordFieldLabel: "Confirm new password",
      successMessage: "Your password has been updated.",
      portalChangePasswordHeader: "Password",
      portalChangePasswordButtonText: "Change your password...",
    },
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};
const errorProps$2 = {
  states: {
    open: true,
    loading: false,
    success: false,
    error: "Network error. Please try again.",
    content: {
      modalChangePasswordHeader: "Change Password",
      cancelText: "Cancel",
      changePasswordButtonText: "Change Password",
      passwordFieldLabel: "New Password",
      confirmPasswordFieldLabel: "Confirm new password",
      successMessage: "Your password has been updated.",
      portalChangePasswordHeader: "Password",
      portalChangePasswordButtonText: "Change your password...",
    },
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};
const passwordErrorProps = {
  states: {
    open: true,
    loading: false,
    success: false,
    error: "Passwords do not match.",
    content: {
      modalChangePasswordHeader: "Change Password",
      cancelText: "Cancel",
      changePasswordButtonText: "Change Password",
      passwordFieldLabel: "New Password",
      confirmPasswordFieldLabel: "Confirm new password",
      successMessage: "Your password has been updated.",
      portalChangePasswordHeader: "Password",
      portalChangePasswordButtonText: "Change your password...",
    },
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};
const loadingProps$1 = {
  states: {
    open: true,
    loading: true,
    success: false,
    error: "",
    content: {
      modalChangePasswordHeader: "Change Password",
      cancelText: "Cancel",
      changePasswordButtonText: "Change Password",
      passwordFieldLabel: "New Password",
      confirmPasswordFieldLabel: "Confirm new password",
      successMessage: "Your password has been updated.",
      portalChangePasswordHeader: "Password",
      portalChangePasswordButtonText: "Change your password...",
    },
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};
const successProps$1 = {
  states: {
    open: true,
    loading: false,
    success: true,
    error: "",
    content: {
      modalChangePasswordHeader: "Change Password",
      cancelText: "Cancel",
      changePasswordButtonText: "Change Password",
      passwordFieldLabel: "New Password",
      confirmPasswordFieldLabel: "Confirm new password",
      successMessage: "Your password has been updated.",
      portalChangePasswordHeader: "Password",
      portalChangePasswordButtonText: "Change your password...",
    },
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};
const Default$3 = () => h$1(PortalChangePasswordView, Object.assign({}, defaultProps$2));
const Open = () => h$1(PortalChangePasswordView, Object.assign({}, openProps));
const Error$3 = () => h$1(PortalChangePasswordView, Object.assign({}, errorProps$2));
const PaswordError = () => (h$1(PortalChangePasswordView, Object.assign({}, passwordErrorProps)));
const Loading$2 = () => h$1(PortalChangePasswordView, Object.assign({}, loadingProps$1));
const Success$1 = () => h$1(PortalChangePasswordView, Object.assign({}, successProps$1));

const ChangePassword = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ChangePassword_stories,
  Default: Default$3,
  Open: Open,
  Error: Error$3,
  PaswordError: PaswordError,
  Loading: Loading$2,
  Success: Success$1
});

const PortalProfile_stories = {
  title: "Components/Portal Profile",
};
const defaultProps$1 = {
  states: {
    success: false,
    loading: false,
    submitDisabled: false,
    showCountry: true,
    user: {
      id: "01",
      accountId: "111100000",
      firstName: "Joe",
      lastName: "Smith",
      email: "jsmith@gmail.com",
      countryCode: "5000",
    },
    text: {
      firstnametext: "First Name",
      lastnametext: "Last Name",
      emailtext: "Email",
      countrytext: "Country",
      editProfileHeader: "Edit your profile",
      editProfileSubHeader: "Personal Information",
      submitChangeButtonText: "Submit Changes",
    },
    formState: {
      country: "Canada",
      firstName: "Joe",
      lastName: "Smith",
      errors: null,
      error: "",
    },
  },
  callbacks: {
    onSubmit: (e) => console.log(e),
    onChange: (e) => console.log(e),
  },
};
const noCountry = {
  states: {
    success: false,
    loading: false,
    submitDisabled: false,
    showCountry: false,
    user: {
      id: "01",
      accountId: "111100000",
      firstName: "Joe",
      lastName: "Smith",
      email: "jsmith@gmail.com",
      countryCode: "5000",
    },
    text: {
      firstnametext: "First Name",
      lastnametext: "Last Name",
      emailtext: "Email",
      countrytext: "Country",
      editProfileHeader: "Edit your profile",
      editProfileSubHeader: "Personal Information",
      submitChangeButtonText: "Submit Changes",
    },
    formState: {
      country: "Canada",
      firstName: "Joe",
      lastName: "Smith",
      errors: null,
      error: "",
    },
  },
  callbacks: {
    onSubmit: (e) => console.log(e),
    onChange: (e) => console.log(e),
  },
};
const loadingProps = {
  states: {
    success: false,
    loading: true,
    submitDisabled: false,
    showCountry: true,
    user: {
      id: "01",
      accountId: "111100000",
      firstName: "Joe",
      lastName: "Smith",
      email: "jsmith@gmail.com",
      countryCode: "5000",
    },
    text: {
      firstnametext: "First Name",
      lastnametext: "Last Name",
      emailtext: "Email",
      countrytext: "Country",
      editProfileHeader: "Edit your profile",
      editProfileSubHeader: "Personal Information",
      submitChangeButtonText: "Submit Changes",
    },
    formState: {
      country: "Canada",
      firstName: "Joe",
      lastName: "Smith",
      errors: null,
      error: "",
    },
  },
  callbacks: {
    onSubmit: (e) => console.log(e),
    onChange: (e) => console.log(e),
  },
};
const disabledProps = {
  states: {
    success: false,
    loading: false,
    submitDisabled: true,
    showCountry: true,
    user: {
      id: "01",
      accountId: "111100000",
      firstName: "Joe",
      lastName: "Smith",
      email: "jsmith@gmail.com",
      countryCode: "5000",
    },
    text: {
      firstnametext: "First Name",
      lastnametext: "Last Name",
      emailtext: "Email",
      countrytext: "Country",
      editProfileHeader: "Edit your profile",
      editProfileSubHeader: "Personal Information",
      submitChangeButtonText: "Submit Changes",
    },
    formState: {
      country: "Canada",
      firstName: "Joe",
      lastName: "Smith",
      errors: null,
      error: "",
    },
  },
  callbacks: {
    onSubmit: (e) => console.log(e),
    onChange: (e) => console.log(e),
  },
};
const errorProps$1 = {
  states: {
    success: false,
    loading: false,
    submitDisabled: false,
    showCountry: true,
    user: {
      id: "01",
      accountId: "111100000",
      firstName: "Joe",
      lastName: "Smith",
      email: "jsmith@gmail.com",
      countryCode: "5000",
    },
    text: {
      firstnametext: "First Name",
      lastnametext: "Last Name",
      emailtext: "Email",
      countrytext: "Country",
      editProfileHeader: "Edit your profile",
      editProfileSubHeader: "Personal Information",
      submitChangeButtonText: "Submit Changes",
    },
    formState: {
      country: "Canada",
      firstName: "Joe",
      lastName: "Smith",
      errors: null,
      error: "Something went wrong. Please try again.",
    },
  },
  callbacks: {
    onSubmit: (e) => console.log(e),
    onChange: (e) => console.log(e),
  },
};
const successProps = {
  states: {
    success: true,
    loading: false,
    submitDisabled: false,
    showCountry: true,
    user: {
      id: "01",
      accountId: "111100000",
      firstName: "Joe",
      lastName: "Smith",
      email: "jsmith@gmail.com",
      countryCode: "5000",
    },
    text: {
      firstnametext: "First Name",
      lastnametext: "Last Name",
      emailtext: "Email",
      countrytext: "Country",
      editProfileHeader: "Edit your profile",
      editProfileSubHeader: "Personal Information",
      submitChangeButtonText: "Submit Changes",
    },
    formState: {
      country: "Canada",
      firstName: "Joe",
      lastName: "Smith",
      errors: null,
      error: "",
    },
  },
  callbacks: {
    onSubmit: (e) => console.log(e),
    onChange: (e) => console.log(e),
  },
};
const Default$2 = () => h$1(PortalProfileView, Object.assign({}, defaultProps$1));
const DefaultNoCountry = () => h$1(PortalProfileView, Object.assign({}, noCountry));
const Loading$1 = () => h$1(PortalProfileView, Object.assign({}, loadingProps));
const Disabled = () => h$1(PortalProfileView, Object.assign({}, disabledProps));
const Error$2 = () => h$1(PortalProfileView, Object.assign({}, errorProps$1));
const Success = () => h$1(PortalProfileView, Object.assign({}, successProps));

const PortalProfile = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': PortalProfile_stories,
  Default: Default$2,
  DefaultNoCountry: DefaultNoCountry,
  Loading: Loading$1,
  Disabled: Disabled,
  Error: Error$2,
  Success: Success
});

const ReferralTableRewardsCell_stories = {
  title: "Components/Referral Table Rewards Cell",
};
const baseReward$2 = {
  id: "123",
  type: "CREDIT",
  value: 19,
  unit: "POINT",
  name: "test",
  dateGiven: 1627427794891,
  dateScheduledFor: getDays(),
  dateExpires: getMonths(),
  dateCancelled: 134400,
  dateRedeemed: 0,
  fuelTankCode: "ABC",
  fuelTankType: "Code",
  currency: "null",
  prettyValue: "19 Points",
  statuses: ["AVAILABLE"],
  globalRewardKey: "Key",
  rewardRedemptionTransactions: {
    data: [
      {
        exchangedRewards: {
          data: [
            {
              prettyValue: "19 Points",
              type: "CREDIT",
              fuelTankCode: "ABC",
              globalRewardKey: "Key",
            },
          ],
        },
      },
    ],
  },
};
const nullExpiresIn$1 = {
  dateExpires: null,
};
const nullScheduledFor = {
  dateScheduledFor: null,
};
const nullFuelTank = {
  fuelTankCode: null,
};
// Reward Type Cases
const discountReward = {
  type: "PCT_DISCOUNT",
};
const creditReward = {
  type: "CREDIT",
};
const fuelTankReward = {
  type: "FUELTANK",
};
const integrationReward = {
  type: "INTEGRATION",
};
// Reward Status Cases
const pendingReward$1 = {
  statuses: ["AVAILABLE", "PENDING"],
};
const cancelledReward$1 = {
  statuses: ["PENDING", "CANCELLED"],
  dateCancelled: 1626850800000,
};
const expiredReward$1 = {
  statuses: ["EXPIRED", "AVAILABLE"],
  dateExpires: 1626850800000,
};
const redeemedReward = {
  statuses: ["AVAILABLE", "EXPIRED", "REDEEMED"],
};
const availableReward$1 = {
  statuses: ["AVAILABLE"],
};
const zeroRewards = [];
const oneReward = [{ ...baseReward$2, ...availableReward$1 }];
const twoRewards = [
  { ...baseReward$2, ...discountReward, ...pendingReward$1 },
  { ...baseReward$2, ...creditReward },
];
const threeRewards = [
  { ...baseReward$2, ...fuelTankReward, ...nullExpiresIn$1 },
  { ...baseReward$2, ...fuelTankReward, ...expiredReward$1 },
  { ...baseReward$2, ...pendingReward$1, ...nullFuelTank },
];
const fiveRewards = [
  { ...baseReward$2, ...fuelTankReward },
  { ...baseReward$2, ...integrationReward },
  { ...baseReward$2, ...pendingReward$1 },
  { ...baseReward$2, ...cancelledReward$1, ...nullExpiresIn$1, ...nullFuelTank },
  { ...baseReward$2, ...expiredReward$1, ...nullFuelTank },
];
const eightRewards = [
  { ...baseReward$2, ...redeemedReward, ...nullFuelTank },
  { ...baseReward$2, ...availableReward$1, ...nullExpiresIn$1 },
  { ...baseReward$2, ...pendingReward$1 },
  { ...baseReward$2, ...cancelledReward$1 },
  { ...baseReward$2, ...expiredReward$1 },
  { ...baseReward$2, ...pendingReward$1, ...nullExpiresIn$1, ...nullScheduledFor },
  { ...baseReward$2, ...cancelledReward$1 },
  { ...baseReward$2, ...expiredReward$1 },
];
const tenRewards = [
  { ...baseReward$2, ...integrationReward },
  { ...baseReward$2, ...redeemedReward },
  { ...baseReward$2, ...availableReward$1 },
  { ...baseReward$2, ...cancelledReward$1, ...nullExpiresIn$1 },
  { ...baseReward$2, ...expiredReward$1 },
  { ...baseReward$2, ...pendingReward$1 },
  { ...baseReward$2, ...discountReward },
  { ...baseReward$2, ...fuelTankReward },
  { ...baseReward$2, ...cancelledReward$1, ...nullExpiresIn$1 },
  { ...baseReward$2, ...creditReward },
];
function getSeconds() {
  return luxon.DateTime.now().toMillis() + 10000;
}
function getMinutes() {
  return luxon.DateTime.now().toMillis() + 400000;
}
function getHours() {
  return luxon.DateTime.now().toMillis() + 9000000;
}
function getDays() {
  return luxon.DateTime.now().toMillis() + 600000000;
}
function getMonths() {
  return luxon.DateTime.now().toMillis() + 10000000000;
}
function getYears() {
  return luxon.DateTime.now().toMillis() + 200000000000;
}
const PendingNoUnpend = () => {
  return (h$1("sqm-referral-table-rewards-cell", { rewards: [{ ...baseReward$2, ...pendingReward$1, ...nullScheduledFor }], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }));
};
const PendingNoUnpendNoDetails = () => {
  return (h$1("sqm-referral-table-rewards-cell", { hideDetails: true, rewards: [{ ...baseReward$2, ...pendingReward$1, ...nullScheduledFor }], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }));
};
const PendingWithUnpend = () => {
  return [
    h$1("sqm-referral-table-rewards-cell", { rewards: [
        { ...baseReward$2, ...pendingReward$1, dateScheduledFor: getSeconds() },
      ], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }),
    h$1("sqm-referral-table-rewards-cell", { rewards: [
        { ...baseReward$2, ...pendingReward$1, dateScheduledFor: getMinutes() },
      ], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }),
    h$1("sqm-referral-table-rewards-cell", { rewards: [
        { ...baseReward$2, ...pendingReward$1, dateScheduledFor: getHours() },
      ], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }),
    h$1("sqm-referral-table-rewards-cell", { rewards: [
        { ...baseReward$2, ...pendingReward$1, dateScheduledFor: getDays() },
      ], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }),
    h$1("sqm-referral-table-rewards-cell", { rewards: [
        { ...baseReward$2, ...pendingReward$1, dateScheduledFor: getMonths() },
      ], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }),
    h$1("sqm-referral-table-rewards-cell", { rewards: [
        { ...baseReward$2, ...pendingReward$1, dateScheduledFor: getYears() },
      ], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }),
  ];
};
const AvailableNoExpiry = () => {
  return (h$1("sqm-referral-table-rewards-cell", { rewards: [{ ...baseReward$2, ...availableReward$1, ...nullExpiresIn$1 }], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }));
};
const AvailableWithExpiry = () => {
  return [
    h$1("sqm-referral-table-rewards-cell", { rewards: [
        { ...baseReward$2, ...availableReward$1, dateExpires: getSeconds() },
      ], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }),
    h$1("sqm-referral-table-rewards-cell", { rewards: [
        { ...baseReward$2, ...availableReward$1, dateExpires: getMinutes() },
      ], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }),
    h$1("sqm-referral-table-rewards-cell", { rewards: [{ ...baseReward$2, ...availableReward$1, dateExpires: getHours() }], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }),
    h$1("sqm-referral-table-rewards-cell", { rewards: [{ ...baseReward$2, ...availableReward$1, dateExpires: getDays() }], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }),
    h$1("sqm-referral-table-rewards-cell", { rewards: [
        { ...baseReward$2, ...availableReward$1, dateExpires: getMonths() },
      ], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }),
    h$1("sqm-referral-table-rewards-cell", { rewards: [{ ...baseReward$2, ...availableReward$1, dateExpires: getYears() }], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }),
  ];
};
const Redeemed = () => {
  return (h$1("sqm-referral-table-rewards-cell", { rewards: [{ ...baseReward$2, ...redeemedReward }], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }));
};
const Cancelled = () => {
  return (h$1("sqm-referral-table-rewards-cell", { rewards: [{ ...baseReward$2, ...cancelledReward$1 }], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }));
};
const Expired = () => {
  return (h$1("sqm-referral-table-rewards-cell", { rewards: [{ ...baseReward$2, ...expiredReward$1 }], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }));
};
const EmptyCell$3 = () => {
  return (h$1("sqm-referral-table-rewards-cell", { rewards: zeroRewards, statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }));
};
const oneRewardCell = () => {
  return (h$1("sqm-referral-table-rewards-cell", { rewards: oneReward, statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }));
};
const twoRewardsCell = () => {
  return (h$1("sqm-referral-table-rewards-cell", { rewards: twoRewards, statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }));
};
const threeRewardsCell = () => {
  return (h$1("sqm-referral-table-rewards-cell", { rewards: threeRewards, statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }));
};
const fiveRewardsCell = () => {
  return (h$1("sqm-referral-table-rewards-cell", { rewards: fiveRewards, statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }));
};
const eightRewardsCell = () => {
  return (h$1("sqm-referral-table-rewards-cell", { rewards: eightRewards, statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }));
};
const tenRewardsCell = () => {
  return (h$1("sqm-referral-table-rewards-cell", { rewards: tenRewards, statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }));
};

const ReferralTableRewardsCell = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ReferralTableRewardsCell_stories,
  PendingNoUnpend: PendingNoUnpend,
  PendingNoUnpendNoDetails: PendingNoUnpendNoDetails,
  PendingWithUnpend: PendingWithUnpend,
  AvailableNoExpiry: AvailableNoExpiry,
  AvailableWithExpiry: AvailableWithExpiry,
  Redeemed: Redeemed,
  Cancelled: Cancelled,
  Expired: Expired,
  EmptyCell: EmptyCell$3,
  oneRewardCell: oneRewardCell,
  twoRewardsCell: twoRewardsCell,
  threeRewardsCell: threeRewardsCell,
  fiveRewardsCell: fiveRewardsCell,
  eightRewardsCell: eightRewardsCell,
  tenRewardsCell: tenRewardsCell
});

const ReferralTable_stories = {
  title: "Components/Referral Table",
};
const loadingElement = (h$1("div", { slot: "loading", style: { display: "contents" } },
  h$1("sqm-table-row", null,
    h$1("sqm-table-cell", { colspan: 5 },
      h$1("sl-skeleton", null))),
  h$1("sqm-table-row", null,
    h$1("sqm-table-cell", { colspan: 5 },
      h$1("sl-skeleton", null))),
  h$1("sqm-table-row", null,
    h$1("sqm-table-cell", { colspan: 5 },
      h$1("sl-skeleton", null))),
  h$1("sqm-table-row", null,
    h$1("sqm-table-cell", { colspan: 5 },
      h$1("sl-skeleton", null))),
  h$1("sqm-table-row", null,
    h$1("sqm-table-cell", { colspan: 5 },
      h$1("sl-skeleton", null)))));
const emptyElement = (h$1("div", { slot: "empty", style: { display: "contents" } },
  h$1("sqm-table-row", null,
    h$1("sqm-table-cell", { colspan: 5, style: { textAlign: "center" } },
      h$1("div", { style: { padding: "var(--sl-spacing-xxx-large)" } },
        h$1("img", { src: "https://res.cloudinary.com/saasquatch/image/upload/v1642618031/squatch-assets/image_3_1.png", style: { width: "100px" } }),
        h$1("div", null,
          h$1("b", null, "View your referral details")),
        h$1("div", { style: {
            marginTop: "var(--sl-spacing-xx-small)",
            fontSize: "var(--sl-font-size-small)",
            color: "var(--sl-color-neutral-500)",
          } }, "Track the status of your referrals and rewards earned by referring friends"))))));
const baseReward$1 = {
  id: "123",
  type: "CREDIT",
  value: 19,
  unit: "POINT",
  name: "test",
  dateGiven: 1627427794891,
  dateScheduledFor: 1628146800000,
  dateExpires: 1629010800000,
  dateCancelled: 134400,
  dateRedeemed: 0,
  fuelTankCode: "ABC",
  fuelTankType: "Code",
  currency: "null",
  prettyValue: "19 Points",
  statuses: ["AVAILABLE"],
  globalRewardKey: "Key",
  rewardRedemptionTransactions: {
    data: [
      {
        exchangedRewards: {
          data: [
            {
              prettyValue: "19 Points",
              type: "CREDIT",
              fuelTankCode: "ABC",
              globalRewardKey: "Key",
            },
          ],
        },
      },
    ],
  },
};
// Reward Status Cases
const pendingReward = {
  statuses: ["AVAILABLE", "PENDING"],
};
const cancelledReward = {
  statuses: ["PENDING", "CANCELLED"],
  dateCancelled: 1626850800000,
};
const expiredReward = {
  statuses: ["EXPIRED", "AVAILABLE"],
  dateExpires: 1626850800000,
};
const availableReward = {
  statuses: ["AVAILABLE"],
};
const nullExpiresIn = {
  dateExpires: null,
};
const simpleUserTableProps = {
  states: {
    hasPrev: false,
    hasNext: true,
    show: "rows",
    namespace: "sqm-referral-table",
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: "Prev",
      moreLabel: "View More",
    },
    hiddenColumns: "",
    mdBreakpoint: 899,
    smBreakpoint: 599,
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },
  elements: {
    columns: [
      h$1("div", null, "Name"),
      h$1("div", null, "Email"),
      h$1("div", null, "DOB"),
      h$1("div", null, "Rewards"),
    ],
    rows: [
      [
        h$1("sqm-referral-table-user-cell", { name: "Joe Smith" }),
        h$1("sqm-referral-table-user-cell", { name: "jsmith@gmail.com" }),
        h$1("sqm-referral-table-user-cell", { name: "07/15/1902" }),
        h$1(PendingNoUnpend, null),
      ],
      [
        h$1("sqm-referral-table-user-cell", { name: "Bob Williams" }),
        h$1("sqm-referral-table-user-cell", { name: "bwill@gmail.com" }),
        h$1("sqm-referral-table-user-cell", { name: "09/05/1999" }),
        h$1(AvailableNoExpiry, null),
      ],
      [
        h$1("sqm-referral-table-user-cell", { name: "Sarah Joseph" }),
        h$1("sqm-referral-table-user-cell", { name: "sjoseph@gmail.com" }),
        h$1("sqm-referral-table-user-cell", { name: "12/21/1984" }),
        h$1(Cancelled, null),
      ],
    ],
  },
};
const hideLabelProps = {
  data: {
    textOverrides: {
      showLabels: false,
      prevLabel: "Prev",
      moreLabel: "View More",
    },
    hiddenColumns: "",
    mdBreakpoint: 899,
    smBreakpoint: 599,
  },
};
const customButtonProps = {
  states: {
    hasPrev: true,
    hasNext: true,
    show: "rows",
    namespace: "sqm-referral-table",
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: "CUSTOM PREVIOUS TEXT",
      moreLabel: "CUSTOM NEXT TEXT",
    },
    hiddenColumns: "",
    mdBreakpoint: 899,
    smBreakpoint: 599,
  },
};
const longCellTextTableProps = {
  states: {
    hasPrev: false,
    hasNext: true,
    show: "rows",
    namespace: "sqm-referral-table",
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: "Prev",
      moreLabel: "View More",
    },
    hiddenColumns: "",
    mdBreakpoint: 899,
    smBreakpoint: 599,
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },
  elements: {
    columns: [
      h$1("div", null, "Name"),
      h$1("div", null, "Email"),
      h$1("div", null, "DOB"),
      h$1("div", null, "City"),
      h$1("div", null, "State/Province"),
      h$1("div", null, "Country"),
      h$1("div", null, "Referrals"),
      h$1("div", null, "Reward Earnings"),
      h$1("div", null, "Status"),
    ],
    rows: [
      [
        h$1("sqm-referral-table-user-cell", { name: "Bartholomew Christopher-Johnston Wallace" }),
        h$1("sqm-referral-table-user-cell", { name: "jsmith@gmail.com" }),
        h$1("sqm-referral-table-date-cell", { date: -22089600000 }),
        h$1("sqm-referral-table-user-cell", { name: "Vancouver" }),
        h$1("sqm-referral-table-cell", { innerTemplate: "British Columbia" }),
        h$1("sqm-referral-table-user-cell", { name: "Canada" }),
        h$1("sqm-referral-table-user-cell", { name: "14,000,000" }),
        h$1("sqm-referral-table-user-cell", { name: "$800,000,000,000" }),
        h$1("sqm-referral-table-status-cell", { statusText: "Complete", converted: true }),
      ],
      [
        h$1("sqm-referral-table-user-cell", { name: "Bob Williams" }),
        h$1("sqm-referral-table-user-cell", { name: "bwill@gmail.com" }),
        h$1("sqm-referral-table-date-cell", { date: 800000000000 }),
        h$1("sqm-referral-table-user-cell", { name: "Los Angeles" }),
        h$1("sqm-referral-table-cell", { innerTemplate: "California" }),
        h$1("sqm-referral-table-user-cell", { name: "US" }),
        h$1("sqm-referral-table-user-cell", { name: "1" }),
        h$1("sqm-referral-table-user-cell", { name: "$5" }),
        h$1("sqm-referral-table-status-cell", { statusText: "In progress", converted: false }),
        ,
      ],
      [
        h$1("sqm-referral-table-user-cell", { name: "Sarah Joseph" }),
        h$1("sqm-referral-table-user-cell", { name: "sjoseph@gmail.com" }),
        h$1("sqm-referral-table-date-cell", { date: 444703707000 }),
        h$1("sqm-referral-table-user-cell", { name: "Toronto" }),
        h$1("sqm-referral-table-cell", { innerTemplate: "Ontario" }),
        h$1("sqm-referral-table-user-cell", { name: "Canada" }),
        h$1("sqm-referral-table-user-cell", { name: "10" }),
        h$1("sqm-referral-table-user-cell", { name: "$71" }),
        h$1("sqm-referral-table-status-cell", { statusText: "Complete", converted: true }),
        ,
      ],
    ],
  },
};
const longColumnTextTableProps = {
  states: {
    hasPrev: false,
    hasNext: true,
    show: "rows",
    namespace: "sqm-referral-table",
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: "Prev",
      moreLabel: "View More",
    },
    hiddenColumns: "",
    mdBreakpoint: 899,
    smBreakpoint: 599,
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },
  elements: {
    columns: [
      h$1("div", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit."),
      h$1("div", null, "Email"),
      h$1("div", null, "DOB"),
      h$1("div", null, "City"),
      h$1("div", null, "State/Province"),
      h$1("div", null, "Country"),
      h$1("div", null, "Referrals"),
      h$1("div", null, "Rewarddddddddddd Earningsssssssssssss"),
      h$1("div", null, "Status"),
    ],
    rows: [
      [
        h$1("sqm-referral-table-user-cell", { name: "Joe Smith" }),
        h$1("sqm-referral-table-user-cell", { name: "jsmith@gmail.com" }),
        h$1("sqm-referral-table-date-cell", { date: -2128547493000 }),
        h$1("sqm-referral-table-user-cell", { name: "Vancouver" }),
        h$1("sqm-referral-table-cell", { innerTemplate: "British Columbia" }),
        h$1("sqm-referral-table-user-cell", { name: "Canada" }),
        h$1("sqm-referral-table-user-cell", { name: "14" }),
        h$1("sqm-referral-table-user-cell", { name: "$88" }),
        h$1("sqm-referral-table-status-cell", { statusText: "Complete", converted: true }),
      ],
      [
        h$1("sqm-referral-table-user-cell", { name: "Bob Williams" }),
        h$1("sqm-referral-table-user-cell", { name: "bwill@gmail.com" }),
        h$1("sqm-referral-table-date-cell", { date: 800000000000 }),
        h$1("sqm-referral-table-user-cell", { name: "Los Angeles" }),
        h$1("sqm-referral-table-cell", { innerTemplate: "California" }),
        h$1("sqm-referral-table-user-cell", { name: "US" }),
        h$1("sqm-referral-table-user-cell", { name: "1" }),
        h$1("sqm-referral-table-user-cell", { name: "$5" }),
        h$1("sqm-referral-table-status-cell", { statusText: "In progress", converted: false }),
        ,
      ],
      [
        h$1("sqm-referral-table-user-cell", { name: "Sarah Joseph" }),
        h$1("sqm-referral-table-user-cell", { name: "sjoseph@gmail.com" }),
        h$1("sqm-referral-table-date-cell", { date: 444703707000 }),
        h$1("sqm-referral-table-user-cell", { name: "Toronto" }),
        h$1("sqm-referral-table-cell", { innerTemplate: "Ontario" }),
        h$1("sqm-referral-table-user-cell", { name: "Canada" }),
        h$1("sqm-referral-table-user-cell", { name: "10" }),
        h$1("sqm-referral-table-user-cell", { name: "$71" }),
        h$1("sqm-referral-table-status-cell", { statusText: "Complete", converted: true }),
        ,
      ],
    ],
  },
};
const fullUserTableProps = {
  states: {
    hasPrev: false,
    hasNext: true,
    show: "rows",
    namespace: "sqm-referral-table",
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: "Prev",
      moreLabel: "View More",
    },
    hiddenColumns: "",
    mdBreakpoint: 899,
    smBreakpoint: 599,
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },
  elements: {
    columns: [
      h$1("div", null, "Name"),
      h$1("div", null, "Email"),
      h$1("div", null, "DOB"),
      h$1("div", null, "City"),
      h$1("div", null, "State/Province"),
      h$1("div", null, "Country"),
      h$1("div", null, "Referrals"),
      h$1("div", null, "Reward Earnings"),
      h$1("div", null, "Status"),
    ],
    rows: [
      [
        h$1("sqm-referral-table-user-cell", { name: "Joe Smith" }),
        h$1("sqm-referral-table-user-cell", { name: "jsmith@gmail.com" }),
        h$1("sqm-referral-table-date-cell", { date: -2128547493000 }),
        h$1("sqm-referral-table-user-cell", { name: "Vancouver" }),
        h$1("sqm-referral-table-cell", { innerTemplate: "British Columbia" }),
        h$1("sqm-referral-table-user-cell", { name: "Canada" }),
        h$1("sqm-referral-table-user-cell", { name: "14" }),
        h$1("sqm-referral-table-user-cell", { name: "$88" }),
        h$1("sqm-referral-table-status-cell", { statusText: "Complete", converted: true }),
      ],
      [
        h$1("sqm-referral-table-user-cell", { name: "Bob Williams" }),
        h$1("sqm-referral-table-user-cell", { name: "bwill@gmail.com" }),
        h$1("sqm-referral-table-date-cell", { date: 800000000000 }),
        h$1("sqm-referral-table-user-cell", { name: "Los Angeles" }),
        h$1("sqm-referral-table-cell", { innerTemplate: "California" }),
        h$1("sqm-referral-table-user-cell", { name: "US" }),
        h$1("sqm-referral-table-user-cell", { name: "1" }),
        h$1("sqm-referral-table-user-cell", { name: "$5" }),
        h$1("sqm-referral-table-status-cell", { statusText: "In progress", converted: false }),
        ,
      ],
      [
        h$1("sqm-referral-table-user-cell", { name: "Sarah Joseph" }),
        h$1("sqm-referral-table-user-cell", { name: "sjoseph@gmail.com" }),
        h$1("sqm-referral-table-date-cell", { date: 444703707000 }),
        h$1("sqm-referral-table-user-cell", { name: "Toronto" }),
        h$1("sqm-referral-table-cell", { innerTemplate: "Ontario" }),
        h$1("sqm-referral-table-user-cell", { name: "Canada" }),
        h$1("sqm-referral-table-user-cell", { name: "10" }),
        h$1("sqm-referral-table-user-cell", { name: "$71" }),
        h$1("sqm-referral-table-status-cell", { statusText: "Complete", converted: true }),
        ,
      ],
    ],
  },
};
const SimpleUserTable = () => {
  return h$1(GenericTableView, Object.assign({}, simpleUserTableProps));
};
const HiddenLabelsTable = () => {
  return (h$1(GenericTableView, Object.assign({}, { ...simpleUserTableProps, ...hideLabelProps })));
};
const CustomButtonTextTable = () => {
  return (h$1(GenericTableView, Object.assign({}, { ...simpleUserTableProps, ...customButtonProps })));
};
const FullUserTable = () => {
  return h$1(GenericTableView, Object.assign({}, fullUserTableProps));
};
const LongCellTextTable = () => {
  return h$1(GenericTableView, Object.assign({}, longCellTextTableProps));
};
const LongColumnTextTable = () => {
  return h$1(GenericTableView, Object.assign({}, longColumnTextTableProps));
};
const EmptyTable = () => {
  return (h$1("sqm-referral-table", { demoData: {
      states: {
        hasPrev: false,
        hasNext: false,
        show: "empty",
        namespace: "sqm-referral-table",
      },
      data: {
        textOverrides: {
          showLabels: true,
          prevLabel: "Prev",
          moreLabel: "View More",
        },
        hiddenColumns: "",
        mdBreakpoint: 899,
        smBreakpoint: 599,
      },
      elements: {
        emptyElement: emptyElement,
        loadingElement: loadingElement,
        columns: [h$1("div", null, "Name"), h$1("div", null, "Email"), h$1("div", null, "DOB")],
        rows: [],
      },
    } }));
};
const LoadingTable = () => {
  return (h$1("sqm-referral-table", { demoData: {
      states: {
        hasPrev: false,
        hasNext: false,
        show: "loading",
        namespace: "sqm-referral-table",
      },
      data: {
        textOverrides: {
          showLabels: true,
          prevLabel: "Prev",
          moreLabel: "View More",
        },
        hiddenColumns: "",
        mdBreakpoint: 899,
        smBreakpoint: 599,
      },
      elements: {
        emptyElement: emptyElement,
        loadingElement: loadingElement,
        columns: [h$1("div", null, "Name"), h$1("div", null, "Email"), h$1("div", null, "DOB")],
        rows: [],
      },
    } }));
};
const FullRewardsTable = () => {
  return (h$1("sqm-referral-table", { demoData: {
      states: {
        hasPrev: false,
        hasNext: false,
        show: "rows",
        namespace: "sqm-referral-table",
      },
      data: {
        textOverrides: {
          showLabels: true,
          prevLabel: "Prev",
          moreLabel: "View More",
        },
        hiddenColumns: "",
        mdBreakpoint: 899,
        smBreakpoint: 599,
      },
      elements: {
        emptyElement: emptyElement,
        loadingElement: loadingElement,
        columns: [
          h$1("div", null, "User"),
          h$1("div", null, "Rewards"),
          h$1("div", null, "Status"),
          h$1("div", null, "Date Started"),
          h$1("div", null, "Date Converted"),
        ],
        rows: [
          [
            h$1("sqm-referral-table-user-cell", { name: "Joe Smith" }),
            h$1("sqm-referral-table-rewards-cell", { rewards: [
                { ...baseReward$1, ...availableReward },
                { ...baseReward$1, ...pendingReward },
                { ...baseReward$1, ...cancelledReward },
              ], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }),
            h$1("sqm-referral-table-status-cell", { statusText: "Complete", converted: true }),
            h$1("sqm-referral-table-date-cell", { date: 1626764400000 }),
            h$1("sqm-referral-table-date-cell", { date: 1627427794891 }),
          ],
          [
            h$1("sqm-referral-table-user-cell", { name: "Sarah Williams" }),
            h$1("sqm-referral-table-rewards-cell", { rewards: [{ ...baseReward$1, ...expiredReward }], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }),
            h$1("sqm-referral-table-status-cell", { statusText: "Incomplete", converted: false }),
            h$1("sqm-referral-table-date-cell", { date: 1626764400000 }),
            h$1("sqm-referral-table-date-cell", { date: null }),
          ],
          [
            h$1("sqm-referral-table-user-cell", { name: "Marvin Smith" }),
            h$1("sqm-referral-table-rewards-cell", { rewards: [
                { ...baseReward$1, ...nullExpiresIn },
                { ...baseReward$1, ...pendingReward },
              ], statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }),
            h$1("sqm-referral-table-status-cell", { statusText: "Complete", converted: true }),
            h$1("sqm-referral-table-date-cell", { date: 1626764400000 }),
            h$1("sqm-referral-table-date-cell", { date: 1627427794891 }),
          ],
        ],
      },
    } }));
};

const ReferralTable$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ReferralTable_stories,
  SimpleUserTable: SimpleUserTable,
  HiddenLabelsTable: HiddenLabelsTable,
  CustomButtonTextTable: CustomButtonTextTable,
  FullUserTable: FullUserTable,
  LongCellTextTable: LongCellTextTable,
  LongColumnTextTable: LongColumnTextTable,
  EmptyTable: EmptyTable,
  LoadingTable: LoadingTable,
  FullRewardsTable: FullRewardsTable
});

const ReferralTableCell_stories = {
  title: "Components/Referral Table Cell",
};
const TableCell = () => {
  return (h$1("sqm-referral-table-cell", { innerTemplate: "Table Cell Text" }));
};
const TableUserCell = () => {
  return (h$1("sqm-referral-table-user-cell", { name: "Table User Cell Text" }));
};
const EmptyCell$2 = () => (h$1("sqm-sqm-referral-table-cell", null, "-"));
const StatusCell = () => {
  return (h$1("div", null,
    h$1("sqm-referral-table-status-cell", { statusText: "Complete", converted: true }),
    h$1("sqm-referral-table-status-cell", { statusText: "In Progress", converted: false })));
};
const DateCell$1 = () => {
  return (h$1("sqm-referral-table-date-cell", { date: 800000000000 }));
};
/*
  TODO'S:
  - Add more rewards
  - Empty and Loading states for tables
  - Build rewards for every type of reward
*/
const rewardsData$1 = {
  id: "123",
  type: "CREDIT",
  value: 19,
  unit: "POINT",
  name: "test",
  dateGiven: 1627427794891,
  dateScheduledFor: 1628146800000,
  dateExpires: 1629010800000,
  dateCancelled: 134400,
  dateRedeemed: 0,
  fuelTankCode: "ABC",
  fuelTankType: "Code",
  currency: "null",
  prettyValue: "19 Points",
  statuses: ["AVAILABLE"],
  globalRewardKey: "Key",
  rewardRedemptionTransactions: {
    data: [
      {
        exchangedRewards: {
          data: [
            {
              prettyValue: "19 Points",
              type: "CREDIT",
              fuelTankCode: "ABC",
              globalRewardKey: "Key",
            },
          ],
        },
      },
    ],
  },
};
const rewards = [rewardsData$1];
const RewardsCell = () => {
  return (h$1("sqm-referral-table-rewards-cell", { rewards: rewards, statusText: "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }", statusLongText: "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }", fuelTankText: "Your code is", rewardReceivedText: "Reward received on", expiringText: "Expiring in", pendingForText: "{status} for {date}" }));
};

const ReferralTableCell = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ReferralTableCell_stories,
  TableCell: TableCell,
  TableUserCell: TableUserCell,
  EmptyCell: EmptyCell$2,
  StatusCell: StatusCell,
  DateCell: DateCell$1,
  RewardsCell: RewardsCell
});

const UserName_stories = {
  title: "Tests/User Name",
};
const DemoData = () => {
  return (h$1("sqm-user-name", { demoData: {
      loading: false,
      loadingText: "...",
      username: "Test Testerson",
    } }));
};
const Username = () => {
  return h$1("sqm-user-name", null);
};

const UserName = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': UserName_stories,
  DemoData: DemoData,
  Username: Username
});

const PasswordField_stories = {
  title: "Components/Portal Password Field",
};
const Start = () => {
  return (h$1("sqm-password-field", { demoData: {
      initValue: "",
      states: {
        enableValidation: true,
        validationErrors: {},
        content: {
          fieldLabel: "Password",
        },
      },
    } }));
};
const EmptyError = () => {
  return (h$1("sqm-password-field", { demoData: {
      initValue: "",
      states: {
        enableValidation: true,
        validationErrors: { password: "Cannot be empty" },
        content: {
          fieldLabel: "Password",
        },
      },
    } }));
};
const ValidationError = () => {
  return (h$1("sqm-password-field", { demoData: {
      initValue: "asdf",
      states: {
        enableValidation: true,
        validationErrors: { password: "Incomplete" },
        content: {
          fieldLabel: "Password",
        },
      },
    } }));
};

const PasswordField = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': PasswordField_stories,
  Start: Start,
  EmptyError: EmptyError,
  ValidationError: ValidationError
});

/**
 * Displays a cartesian product of the input props
 *
 * @returns
 */
function MatrixStory({ matrix, props, Component, }) {
  const propMatrix = Object.keys(matrix).map((propKey) => {
    const propValues = matrix[propKey];
    return propValues.map((val) => {
      return {
        [propKey]: val,
      };
    });
  });
  const combinations = cartesian(...propMatrix);
  const propsCombinations = combinations.map((combo) => {
    return combo.reduce((props, prop) => {
      return {
        ...props,
        ...prop,
      };
    }, {});
  });
  return propsCombinations.map((combo) => {
    const example = { ...props, ...combo };
    return (h$1("div", null,
      h$1(PropsTable, { values: example }),
      h$1("hr", null),
      " ",
      h$1("br", null),
      h$1(Component, Object.assign({}, example)),
      h$1("br", null)));
  });
}
function PropsTable({ values }) {
  return (h$1("table", null,
    h$1("tbody", null, Object.keys(values).map((key) => {
      return (h$1("tr", null,
        h$1("th", null, key),
        h$1("td", null, JSON.stringify(values[key]))));
    }))));
}
/**
 * Source: https://stackoverflow.com/questions/15298912/javascript-generating-combinations-from-n-arrays-with-m-elements
 *
 * TODO: Could replace with a fork of https://www.npmjs.com/package/cartesian
 *
 * @param args - an array of arrays
 * @returns combinations of the elements in those array
 */
function cartesian(...args) {
  var r = [], max = args.length - 1;
  function helper(arr, i) {
    for (var j = 0, l = args[i].length; j < l; j++) {
      var a = arr.slice(0); // clone arr
      a.push(args[i][j]);
      if (i == max)
        r.push(a);
      else
        helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
}

const scenarioTaskCard = "@author:derek\r\n@owner:\r\nFeature: Task Card\r\n\r\n\tScenario: A header, body title, description and a CTA button are always displayed\r\n\t\tGiven the Task Card is configured with the following props\r\n\t\t\t| prop         | value                                        |\r\n\t\t\t| rewardAmount | \"40\"                                         |\r\n\t\t\t| rewardUnit   | \"Points\"                                     |\r\n\t\t\t| cardTitle    | Complete a survey                            |\r\n\t\t\t| description  | Fill out our survey form and receive points! |\r\n\t\t\t| buttonText   | Take Survey                                  |\r\n\t\t\t| buttonLink   | https://example.com/                         |\r\n\t\tWhen a user views the Task Card\r\n\t\tThen they see \"40 Points\" as the heading\r\n\t\tAnd the \"40\" is bolded\r\n\t\tAnd they see \"Complete a survey\" bolded in the body\r\n\t\tAnd a details icon in the top right hand corner\r\n\t\tAnd a button with text \"Take Survey\" in the bottom right hand corner\r\n\t\tWhen they click the button\r\n\t\tThen they are redirected to \"example.com\" in a new window\r\n\t\tWhen they click the details icon\r\n\t\tThen \"Fill out our survey form and receive points!\" is shown as the card description\r\n\r\n\tScenario: A loading state is displayed while the Task Card is loading\r\n\t\tGiven a Task Card component\r\n\t\tWhen a user views the Task Card\r\n\t\tThen a loading state is displayed\r\n\t\tWhen the Task Card has loaded\r\n\t\tThen the loading state disapears\r\n\r\n\tScenario Outline: The Progress Bar can be shown or hidden but is hidden by default\r\n\t\tGiven a Task Card component\r\n\t\tAnd it <mayHave> \"showProgressBar\" <value>\r\n\t\tWhen a user views the Task Card\r\n\t\tThen the progress bar <mayBe> displayed\r\n\t\tExamples:\r\n\t\t\t| mayHave      | value | mayBe |\r\n\t\t\t| has          | true  | is    |\r\n\t\t\t| has          | false | isn't |\r\n\t\t\t| doesn't have |       | isn't |\r\n\r\n\tScenario Outline: Tasks can be repeatable or one-time only but are one-time only be default\r\n\t\tGiven a Task Card component\r\n\t\tAnd it <mayHave> \"repeatable\" <value>\r\n\t\tAnd a user who has already completed the task\r\n\t\tWhen they views the Task Card\r\n\t\tThen they see a green checkmark icon beside the card heading\r\n\t\tAnd the card <mayBe> green\r\n\t\tAnd the card's border <mayBe> green\r\n\t\tAnd the CTA button <mayBe> disabled\r\n\t\tAnd the CTA button <mayBe> grey\r\n\t\tExamples:\r\n\t\t\t| mayHave      | value | mayBe |\r\n\t\t\t| has          | true  | isn't |\r\n\t\t\t| has          | false | is    |\r\n\t\t\t| doesn't have |       | is    |\r\n\r\n\tScenario: Task Expiries can be configured and disable the CTA after the expiry\r\n\t\tGiven a Task Card component\r\n\t\tAnd it is configured for <expiry>\r\n\t\tWhen a user views the Card on <day>\r\n\t\tThen they the expiry on <cardLocation>\r\n\t\tAnd the text <mayBe> orange\r\n\t\tAnd the card <mayBe> disabled\r\n\t\tAnd the card <mayBe> grey\r\n\t\tAnd the user <mayBe> unable to complete the loyalty task\r\n\t\tExamples:\r\n\t\t\t| expiry               | day                    | cardLocation | mayBe |\r\n\t\t\t| Dec 31 2021 11:59:59 | Dec 1st 2021 12:00:00  | bottom left  | isn't |\r\n\t\t\t| Dec 31 2021 11:59:59 | Dec 31 2021 11:00:00   | top right    | isn't |\r\n\t\t\t| Dec 31 2021 11:59:59 | Jan 15th 2022 10:00:00 | top right    | is    |\r\n\r\n\tScenario Outline: Task expiry can be hidden or shown but is hidden by default\r\n\t\tGiven a Task Card\r\n\t\tAnd it is configured with an expiry\r\n\t\tAnd it <mayHave> \"showExpiry\" <value>\r\n\t\tWhen a user views the Task card\r\n\t\tThen the expiry <mayBe> shown in the bottom left hand corner\r\n\t\tExamples:\r\n\t\t\t| mayHave      | value | mayBe |\r\n\t\t\t| has          | true  | is    |\r\n\t\t\t| has          | false | isn't |\r\n\t\t\t| doesn't have |       | isn't |\r\n\r\n\t#DS: Currently this text is non configurable and isnt set up for proper pluralization\r\n\tScenario Outline: A task completion count is displayed for repeatable tasks\r\n\t\tGiven a Task Card is configured for a repeatable task\r\n\t\tAnd has \"goalCompletionNumber\" <goalCompletionNumberValue>\r\n\t\tAnd a user with <userGoalProgress>\r\n\t\tWhen the user views the task card\r\n\t\tThen they see a repeat icon\r\n\t\tAnd the <text> in the bottom left hand corner\r\n\t\tAnd the <text> is green\r\n\t\tExamples:\r\n\t\t\t| goalCompletionNumber | userGoalProgress | text              |\r\n\t\t\t| 1                    | 0                | Completed 0 times |\r\n\t\t\t| 1                    | 1                | Completed 1 times |\r\n\t\t\t| 1                    | 2                | Completed 2 times |\r\n\t\t\t| 10                   | 5                | Completed 0 times |\r\n\t\t\t| 10                   | 12               | Completed 1 times |\r\n\t\t\t| 10                   | 29               | Completed 2 times |\r\n\r\n\tScenario Outline: The source of a user's progress can be a custom field or a program goal\r\n\t\tGiven a Task Card is configured to have <progressSourcePath> progress source\r\n\t\tAnd a user\r\n\t\tWhen they view the Task card\r\n\t\tThen the value at <progressSourcePath> is used to benchmark their progress against the Goal Completion Count\r\n\t\tExamples:\r\n\t\t\t| value                                            |\r\n\t\t\t| /customFields/activityCount                      |\r\n\t\t\t| /customFields/purchaseTotal                      |\r\n\t\t\t| /programGoals/count%2FComment-on-Article         |\r\n\t\t\t| /programGoals/count/Referral-Started%2Freferrals |\r\n\r\n\tScenario Outline: The users completion of a goal is calculated by the Goal Completion Number\r\n\t\tGiven a Task Card is configured to have <goalValue>\r\n\t\tAnd a user who has <progressValue>\r\n\t\tWhen they view the Task Card\r\n\t\tThen they are shown to have <progressValue> towards <goalValue>\r\n\t\tWhen their progress grows larger than <goalValue>\r\n\t\tThen the task is marked as completed\r\n\t\tExamples:\r\n\t\t\t| goalValue | progressValue |\r\n\t\t\t| 1         | 0             |\r\n\t\t\t| 10        | 9             |\r\n\t\t\t| 5         | 2             |\r\n\r\n\tScenario: The Goal Completion Number defaults to 1\r\n\t\tGiven a Task Card without a configured \"goalCompletionNumber\"\r\n\t\tAnd a user who has <progressValue>\r\n\t\tWhen they view the Task Card\r\n\t\tThen it <mayBe> marked as completed\r\n\t\tExamples:\r\n\t\t\t| progressValue | mayBe |\r\n\t\t\t| 0             | isn't |\r\n\t\t\t| 1             | is    |\r\n\t\t\t| 2             | is    |";

const scenarioProgressBar = "@author:\r\n@owner:\r\nFeature: Task Card Progress Bar\r\n\r\n\tScenario Outline: Progress Bar\r\n\r\n\t\tGiven a Task Card component\r\n\t\tAnd progress is <progress>\r\n\t\tAnd goal is <goal>\r\n\t\tThen I have <progressBar>\r\n\t\tAnd <progressBar> shows <progress> with <unit> above\r\n\t\tAnd gift icon has <color>\r\n\t\tAnd gift icon shows <goal> with <unit> below\r\n\r\n\t\tExamples:\r\n\t\t\t| progress | goal | progressBar           | unit | color |\r\n\t\t\t| 0        | 500  | ●――――――――――――――――――🎁 | $    | no    |\r\n\t\t\t| 100      | 500  | ―――――――――●―――――――――🎁 | $    | no    |\r\n\t\t\t| 500      | 500  | ―――――――――――――――――――🎁 | $    | yes   |\r\n\t\t\t| 650      | 500  | ―――――――――――――――――――🎁 | $    | yes   |\r\n\t\t\t| 1200     | 500  | ―――――――――――――――――――🎁 | $    | yes   |\r\n\r\n\tScenario Outline: Progress Bar Steps\r\n\r\n\t\tGiven a Task Card component\r\n\t\tAnd progress is <progress>\r\n\t\tAnd goal is <goal>\r\n\t\tAnd steps is enabled\r\n\t\tThen I have <progressBar>\r\n\t\tAnd <progressBar> has incrementing steps up to <goal>\r\n\t\tAnd gift icon has <color>\r\n\t\tAnd gift icon shows <goal> below\r\n\r\n\t\tExamples:\r\n\t\t\t| progress | goal | progressBar           | color |\r\n\t\t\t| 0        | 5    | ―――○―――○―――○―――○―――🎁 | no    |\r\n\t\t\t| 1        | 5    | ―――●―――○―――○―――○―――🎁 | no    |\r\n\t\t\t| 5        | 5    | ―――○―――○―――○―――●―――🎁 | yes   |\r\n\t\t\t| 7        | 5    | ―――○―――○―――○―――●―――🎁 | yes   |\r\n\t\t\t| 12       | 5    | ―――○―――○―――○―――●―――🎁 | yes   |\r\n\r\n\r\n\tScenario Outline: Progress Bar Repeatable\r\n\r\n\t\tGiven a Task Card component\r\n\t\tAnd progress is <progress>\r\n\t\tAnd goal is <goal>\r\n\t\tAnd it is repeatable\r\n\t\tThen I have <progressBar>\r\n\t\tAnd <progressBar> shows <progress> with <unit> above\r\n\t\tAnd first <icon1> is <color1> with <text1> displayed below\r\n\t\tAnd second <icon2> is <color2> with <text2> displayed below\r\n\t\tAnd third <icon3> is <color3> with <text3> displayed below\r\n\r\n\t\tExamples:\r\n\t\t\t| progress | goal | progressBar          | unit | icon1 | color1   | text1 | icon2 | color2    | text 2 | icon3 | color3    | text 3 |\r\n\t\t\t| 250      | 500  | ――――●――――🎁―――――――🎁 | $    | NA    | NA       | NA    | gift  | greyscale | 500    | gift  | greyscale | 1000   |\r\n\t\t\t| 500      | 500  | ―――――――――🎁―――――――🎁 | $    | NA    | NA       | NA    | gift  | colorful  | 500    | gift  | greyscale | 1000   |\r\n\t\t\t| 750      | 500  | ―――――――――🎁―――●―――🎁 | $    | NA    | NA       | NA    | gift  | colorful  | 500    | gift  | greyscale | 1000   |\r\n\t\t\t| 1000     | 500  | 🎁―――――――🎁―――――――🎁 | $    | gift  | colorful | 500   | gift  | colorful  | 1000   | gift  | greyscale | 1500   |\r\n\t\t\t| 1250     | 500  | 🎁―――――――🎁―――●―――🎁 | $    | gift  | colorful | 500   | gift  | colorful  | 1000   | gift  | greyscale | 1500   |\r\n\r\n\tScenario Outline: Progress Bar Steps Repeatable\r\n\r\n\t\tGiven a Task Card component\r\n\t\tAnd progress is <progress>\r\n\t\tAnd goal is <goal>\r\n\t\tAnd steps is enabled\r\n\t\tAnd it is repeatable\r\n\t\tThen I have <progressBar>\r\n\t\tAnd <progressBar> has incrementing steps up to <goal>\r\n\t\tAnd first <icon1> is <color1>\r\n\t\tAnd second <icon2> is <color2>\r\n\t\tAnd third <icon3> is <color3>\r\n\r\n\t\tExamples:\r\n\t\t\t| progress | goal | progressBar              | icon1 | color1   | icon2 | color2    | icon3 | color3    |\r\n\t\t\t| 0        | 5    | ―――○―○―○―○―🎁―○―○―○―○―🎁 | NA    | NA       | gift  | greyscale | gift  | greyscale |\r\n\t\t\t| 1        | 5    | ―――●―○―○―○―🎁―○―○―○―○―🎁 | NA    | NA       | gift  | greyscale | gift  | greyscale |\r\n\t\t\t| 5        | 5    | ―――●―●―●―●―🎁―○―○―○―○―🎁 | NA    | NA       | gift  | colorful  | gift  | greyscale |\r\n\t\t\t| 7        | 5    | ―――●―●―●―●―🎁―●―●―○―○―🎁 | NA    | NA       | gift  | colorful  | gift  | greyscale |\r\n\t\t\t| 12       | 5    | 🎁―●―●―●―●―🎁―●―●―○―○―🎁 | gift  | colorful | gift  | colorful  | gift  | greyscale |";

const ResizerStylesheet = `

:root{
    --checker-color-1: #ffffff00;
    --checker-color-2: #ffffff00;
    --checker-size: 7px;
    --checker-gradient: linear-gradient(45deg, var(--checker-color-1) 25%, transparent 25%, transparent 75%, var(--checker-color-1) 75%);
}
.resizer{
    resize: horizontal;
    border: 2px dashed gray;
	margin: -2px;
    padding: 12px;
    height: fit-content;
    overflow: hidden;
}

.resizer{
    background-color: var(--checker-color-2);
    background-image: var(--checker-gradient), var(--checker-gradient);
    background-position: 0 0, var(--checker-size) var(--checker-size);
    background-size: calc(var(--checker-size) * 2) calc(var(--checker-size) * 2);
}
`;
const Resizer = (_, children) => (h$1("div", { class: "resizer" }, children));

const scenario$5 = scenarioTaskCard + scenarioProgressBar;
const TaskCard_stories = {
  title: "Components/Task Card/",
  parameters: {
    scenario: scenario$5,
  },
};
const storyFrame = {
  display: "inline-flex",
  gap: "32px",
};
const resizable = {
  width: "347px",
  minWidth: "347px",
  resize: "horizontal",
  height: "fit-content",
  overflow: "hidden",
};
const oneAction = {
  callbacks: {
    sendEvent: () => void 0,
    onClick: () => void 0,
  },
  content: {
    rewardAmount: "20",
    rewardUnit: "SaaSquatch Points",
    cardTitle: "Complete a survey",
    description: "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    repeatable: false,
    showProgressBar: false,
    steps: false,
    buttonText: "Take survey",
    buttonLink: "https://example.com/",
    openNewTab: false,
    showExpiry: false,
    rewardDuration: null,
    completedText: "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}",
    expiryMessage: "Ends {endDate}",
    startsOnMessage: "Starts {startDate}",
    endedMessage: "Ended {endDate}",
    finite: 0,
    goal: 1,
    locale: "en"
  },
  states: {
    progress: 0,
    loading: false,
    loadingEvent: false,
  },
};
const coupleActions$1 = {
  callbacks: {
    sendEvent: () => void 0,
    onClick: () => void 0,
  },
  content: {
    rewardAmount: "40",
    rewardUnit: "SaaSquatch Points",
    cardTitle: "Comment on 5 articles",
    description: "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    repeatable: false,
    showProgressBar: true,
    steps: true,
    buttonText: "Take survey",
    buttonLink: "https://example.com/",
    openNewTab: false,
    showExpiry: false,
    completedText: "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}",
    rewardDuration: null,
    expiryMessage: "Ends {endDate}",
    startsOnMessage: "Starts {startDate}",
    endedMessage: "Ended {endDate}",
    finite: 0,
    goal: 5,
    locale: "en"
  },
  states: {
    progress: 1,
    loading: false,
    loadingEvent: false,
  },
};
const manyActions$1 = {
  callbacks: {
    sendEvent: () => void 0,
    onClick: () => void 0,
  },
  content: {
    rewardAmount: "150",
    rewardUnit: "SaaSquatch Points",
    cardTitle: "Spend $500 at our Store",
    description: "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    repeatable: false,
    completedText: "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}",
    showProgressBar: true,
    steps: false,
    progressBarUnit: "$",
    buttonText: "Take survey",
    buttonLink: "https://example.com/",
    openNewTab: false,
    showExpiry: false,
    rewardDuration: null,
    expiryMessage: "Ends {endDate}",
    startsOnMessage: "Starts {startDate}",
    endedMessage: "Ended {endDate}",
    finite: 0,
    goal: 500,
    locale: "en"
  },
  states: { progress: 100, loading: false, loadingEvent: false },
};
const TaskCard = () => {
  const expire = {
    showExpiry: true,
    rewardDuration: "2021-11-30T08:00:00.000Z/2021-12-01T08:00:00.000Z",
  };
  const expireRepeat = { ...expire, repeatable: true };
  return (h$1("div", { style: storyFrame },
    h$1(Resizer, null,
      h$1("h4", null, "Not Repeatable"),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...oneAction.content, description: "" }, states: { ...oneAction.states, progress: 0 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { content: { ...coupleActions$1.content, description: "" }, states: { ...coupleActions$1.states, progress: 0 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { content: { ...manyActions$1.content, description: "" }, states: { ...manyActions$1.states, progress: 230 } }))),
    h$1(Resizer, null,
      h$1("h4", null, "Repeatable"),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...oneAction.content, repeatable: true }, states: { ...oneAction.states, progress: 2 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { content: { ...coupleActions$1.content, repeatable: true }, states: { ...coupleActions$1.states, progress: 7 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { content: { ...manyActions$1.content, repeatable: true }, states: { ...manyActions$1.states, progress: 650 } }))),
    h$1(Resizer, null,
      h$1("h4", null, "Complete"),
      h$1(TaskCardView, Object.assign({}, oneAction, { states: { ...oneAction.states, progress: 1 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { states: { ...coupleActions$1.states, progress: 5 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { states: { ...manyActions$1.states, progress: 500 } }))),
    h$1(Resizer, null,
      h$1("h4", null, "Unavailable"),
      h$1(TaskCardView, Object.assign({}, oneAction, { states: { ...oneAction.states, progress: 0 } }, expireRepeat)),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { states: { ...coupleActions$1.states, progress: 3 } }, expireRepeat)),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { states: { ...manyActions$1.states, progress: 250 } }, expireRepeat)))));
};
const TaskCardNotRepeatable = () => {
  return (h$1("div", { style: storyFrame },
    h$1("div", { style: resizable },
      h$1("h4", null, "One Action"),
      h$1(TaskCardView, Object.assign({}, oneAction, { states: { ...oneAction.states, progress: 0 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { states: { ...oneAction.states, progress: 1 } })),
      h$1("h5", null)),
    h$1("div", { style: resizable },
      h$1("h4", null, "A Couple Actions"),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { states: { ...coupleActions$1.states, progress: 1 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { states: { ...coupleActions$1.states, progress: 5 } })),
      h$1("h5", null)),
    h$1("div", { style: resizable },
      h$1("h4", null, "Many Actions"),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { states: { ...manyActions$1.states, progress: 230 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { states: { ...manyActions$1.states, progress: 500 } })),
      h$1("h5", null))));
};
const TaskCardRepeatable = () => {
  return (h$1("div", { style: storyFrame },
    h$1("div", { style: resizable },
      h$1("h4", null, "One Action"),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...oneAction.content, repeatable: true }, states: { ...oneAction.states, progress: 0 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...oneAction.content, repeatable: true }, states: { ...oneAction.states, progress: 1 } })),
      h$1("h5", null)),
    h$1("div", { style: resizable },
      h$1("h4", null, "A Couple Actions"),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { content: { ...coupleActions$1.content, repeatable: true }, states: { ...coupleActions$1.states, progress: 0 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { content: { ...coupleActions$1.content, repeatable: true }, states: { ...coupleActions$1.states, progress: 5 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { content: { ...coupleActions$1.content, repeatable: true }, states: { ...coupleActions$1.states, progress: 7 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { content: { ...coupleActions$1.content, repeatable: true }, states: { ...coupleActions$1.states, progress: 10 } })),
      h$1("h5", null)),
    h$1("div", { style: resizable },
      h$1("h4", null, "Many Actions"),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { content: { ...manyActions$1.content, repeatable: true }, states: { ...manyActions$1.states, progress: 0 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { content: { ...manyActions$1.content, repeatable: true }, states: { ...manyActions$1.states, progress: 500 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { content: { ...manyActions$1.content, repeatable: true }, states: { ...manyActions$1.states, progress: 650 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { content: { ...manyActions$1.content, repeatable: true }, states: { ...manyActions$1.states, progress: 1000 } })),
      h$1("h5", null))));
};
const TaskCardRepeatableFinite = () => {
  return (h$1("div", { style: storyFrame },
    h$1("div", { style: resizable },
      h$1("h4", null, "One Action"),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...oneAction.content, repeatable: true, finite: 2 }, states: { ...oneAction.states, progress: 0 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...oneAction.content, repeatable: true, finite: 2 }, states: { ...oneAction.states, progress: 1 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...oneAction.content, repeatable: true, finite: 2 }, states: { ...oneAction.states, progress: 2 } })),
      h$1("h5", null)),
    h$1("div", { style: resizable },
      h$1("h4", null, "A Couple Actions"),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { content: { ...coupleActions$1.content, repeatable: true, finite: 2 }, states: { ...coupleActions$1.states, progress: 2 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { content: { ...coupleActions$1.content, repeatable: true, finite: 2 }, states: { ...coupleActions$1.states, progress: 5 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { content: { ...coupleActions$1.content, repeatable: true, finite: 2 }, states: { ...coupleActions$1.states, progress: 10 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { content: { ...coupleActions$1.content, repeatable: true, finite: 3 }, states: { ...coupleActions$1.states, progress: 12 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { content: { ...coupleActions$1.content, repeatable: true, finite: 3 }, states: { ...coupleActions$1.states, progress: 15 } })),
      h$1("h5", null)),
    h$1("div", { style: resizable },
      h$1("h4", null, "Many Actions"),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { content: { ...manyActions$1.content, repeatable: true, finite: 2 }, states: { ...manyActions$1.states, progress: 200 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { content: { ...manyActions$1.content, repeatable: true, finite: 3 }, states: { ...manyActions$1.states, progress: 500 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { content: { ...manyActions$1.content, repeatable: true, finite: 2 }, states: { ...manyActions$1.states, progress: 1000 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { content: { ...manyActions$1.content, repeatable: true, finite: 3 }, states: { ...manyActions$1.states, progress: 1200 } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { content: { ...manyActions$1.content, repeatable: true, finite: 3 }, states: { ...manyActions$1.states, progress: 1500 } })),
      h$1("h5", null))));
};
const TaskCardEndDate = () => {
  const expire = {
    showExpiry: true,
    rewardDuration: luxon.DateTime.now().minus({ days: 1 }).toISO() +
      "/" +
      luxon.DateTime.now().plus({ days: 1 }).toISO(),
  };
  const expireRepeat = { ...expire, repeatable: true };
  return (h$1("div", { style: storyFrame },
    h$1("div", { style: resizable },
      h$1("h4", null, "One Action"),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...oneAction.content, ...expire } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...oneAction.content, ...expireRepeat } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...oneAction.content, ...expireRepeat }, states: { ...oneAction.states, progress: 1 } })),
      h$1("h5", null)),
    h$1("div", { style: resizable },
      h$1("h4", null, "A Couple Actions"),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...coupleActions$1.content, ...expire } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...coupleActions$1.content, ...expireRepeat } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...coupleActions$1.content, ...expireRepeat }, states: { ...coupleActions$1.states, progress: 5 } })),
      h$1("h5", null)),
    h$1("div", { style: resizable },
      h$1("h4", null, "Many Actions"),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...manyActions$1.content, ...expire } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...manyActions$1.content, ...expireRepeat } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { content: { ...manyActions$1.content, ...expireRepeat }, states: { ...manyActions$1.states, progress: 1000 } })),
      h$1("h5", null))));
};
const TaskCardLoading = () => {
  const loading = {
    states: { loading: true, progress: 0, loadingEvent: false },
  };
  return (h$1("div", { style: storyFrame },
    h$1("div", { style: resizable },
      h$1("h4", null, "One Action"),
      h$1(TaskCardView, Object.assign({}, oneAction, loading)),
      " ",
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, loading)),
      " ",
      h$1("h5", null)),
    h$1("div", { style: resizable },
      h$1("h4", null, "A Couple Actions"),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, loading)),
      " ",
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, loading)),
      " ",
      h$1("h5", null)),
    h$1("div", { style: resizable },
      h$1("h4", null, "Many Actions"),
      h$1(TaskCardView, Object.assign({}, manyActions$1, loading)),
      " ",
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, loading)),
      " ",
      h$1("h5", null))));
};
const TaskCardNotStarted = () => {
  const expire = {
    showExpiry: true,
    rewardDuration: luxon.DateTime.now().plus({ days: 1 }).toISO() +
      "/" +
      luxon.DateTime.now().plus({ days: 2 }).toISO(),
  };
  const expireRepeat = { ...expire, repeatable: true };
  return (h$1("div", { style: storyFrame },
    h$1("div", { style: resizable },
      h$1("h4", null, "One Action"),
      h$1(TaskCardView, Object.assign({}, oneAction, { states: { ...oneAction.states, progress: 0 }, content: { ...oneAction.content, ...expire } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { states: { ...oneAction.states, progress: 1 }, content: { ...oneAction.content, ...expire } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { states: { ...oneAction.states, progress: 0 }, content: { ...oneAction.content, ...expireRepeat } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { states: { ...oneAction.states, progress: 1 }, content: { ...oneAction.content, ...expireRepeat } })),
      h$1("h5", null)),
    h$1("div", { style: resizable },
      h$1("h4", null, "A Couple Actions"),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { states: { ...coupleActions$1.states, progress: 1 }, content: { ...coupleActions$1.content, ...expire } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { states: { ...coupleActions$1.states, progress: 1 }, content: { ...coupleActions$1.content, ...expire } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { states: { ...coupleActions$1.states, progress: 1 }, content: { ...coupleActions$1.content, ...expireRepeat } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { states: { ...coupleActions$1.states, progress: 1 }, content: { ...coupleActions$1.content, ...expireRepeat } })),
      h$1("h5", null)),
    h$1("div", { style: resizable },
      h$1("h4", null, "Many Actions"),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { states: { ...manyActions$1.states, progress: 100 }, content: { ...manyActions$1.content, ...expire } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { states: { ...manyActions$1.states, progress: 500 }, content: { ...manyActions$1.content, ...expire } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { states: { ...manyActions$1.states, progress: 100 }, content: { ...manyActions$1.content, ...expireRepeat } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { states: { ...manyActions$1.states, progress: 500 }, content: { ...manyActions$1.content, ...expireRepeat } })),
      h$1("h5", null))));
};
const TaskCardEnded = () => {
  const expire = {
    showExpiry: true,
    rewardDuration: luxon.DateTime.now().minus({ days: 2 }).toISO() +
      "/" +
      luxon.DateTime.now().minus({ days: 1 }).toISO(),
  };
  const expireRepeat = { ...expire, repeatable: true };
  return (h$1("div", { style: storyFrame },
    h$1("div", { style: resizable },
      h$1("h4", null, "One Action"),
      h$1(TaskCardView, Object.assign({}, oneAction, { states: { ...oneAction.states, progress: 0 }, content: { ...oneAction.content, ...expire } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { states: { ...oneAction.states, progress: 1 }, content: { ...oneAction.content, ...expire } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { states: { ...oneAction.states, progress: 0 }, content: { ...oneAction.content, ...expireRepeat } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, oneAction, { states: { ...oneAction.states, progress: 1 }, content: { ...oneAction.content, ...expireRepeat } })),
      h$1("h5", null)),
    h$1("div", { style: resizable },
      h$1("h4", null, "A Couple Actions"),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { states: { ...coupleActions$1.states, progress: 1 }, content: { ...coupleActions$1.content, ...expire } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { states: { ...coupleActions$1.states, progress: 1 }, content: { ...coupleActions$1.content, ...expire } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { states: { ...coupleActions$1.states, progress: 1 }, content: { ...coupleActions$1.content, ...expireRepeat } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, coupleActions$1, { states: { ...coupleActions$1.states, progress: 1 }, content: { ...coupleActions$1.content, ...expireRepeat } })),
      h$1("h5", null)),
    h$1("div", { style: resizable },
      h$1("h4", null, "Many Actions"),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { states: { ...manyActions$1.states, progress: 100 }, content: { ...manyActions$1.content, ...expire } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { states: { ...manyActions$1.states, progress: 500 }, content: { ...manyActions$1.content, ...expire } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { states: { ...manyActions$1.states, progress: 100 }, content: { ...manyActions$1.content, ...expireRepeat } })),
      h$1("h5", null),
      h$1(TaskCardView, Object.assign({}, manyActions$1, { states: { ...manyActions$1.states, progress: 500 }, content: { ...manyActions$1.content, ...expireRepeat } })),
      h$1("h5", null))));
};
const ProgressBar = () => {
  const props = {
    progress: 0,
    goal: 500,
    progressBarUnit: "$",
  };
  return (h$1("div", null,
    h$1(MatrixStory, { matrix: { progress: [0, 100, 500, 650, 1200] }, props: props, Component: ProgressBarView })));
};
const ProgressBarSteps = () => {
  const props = {
    progress: 0,
    steps: true,
    goal: 5,
    progressBarUnit: "$",
  };
  return (h$1("div", null,
    h$1(MatrixStory, { matrix: { progress: [0, 1, 5, 7, 12] }, props: props, Component: ProgressBarView })));
};
const ProgressBarRepeatable = () => {
  const props = {
    progress: 0,
    goal: 500,
    progressBarUnit: "$",
    repeatable: true,
  };
  return (h$1("div", null,
    h$1(MatrixStory, { matrix: { progress: [0, 250, 500, 750, 1000, 1250] }, props: props, Component: ProgressBarView })));
};
const ProgressBarStepsRepeatable = () => {
  const props = {
    progress: 0,
    steps: true,
    goal: 5,
    progressBarUnit: "$",
    repeatable: true,
  };
  return (h$1("div", null,
    h$1(MatrixStory, { matrix: { progress: [0, 1, 5, 7, 12] }, props: props, Component: ProgressBarView })));
};
const ProgressBarStepsRepeatableFinite = () => {
  const props = {
    progress: 0,
    steps: true,
    goal: 5,
    progressBarUnit: "$",
    repeatable: true,
    finite: 2,
  };
  return (h$1("div", null,
    h$1(MatrixStory, { matrix: { progress: [0, 1, 5, 7, 10, 12] }, props: props, Component: ProgressBarView })));
};

const TaskCard$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': TaskCard_stories,
  TaskCard: TaskCard,
  TaskCardNotRepeatable: TaskCardNotRepeatable,
  TaskCardRepeatable: TaskCardRepeatable,
  TaskCardRepeatableFinite: TaskCardRepeatableFinite,
  TaskCardEndDate: TaskCardEndDate,
  TaskCardLoading: TaskCardLoading,
  TaskCardNotStarted: TaskCardNotStarted,
  TaskCardEnded: TaskCardEnded,
  ProgressBar: ProgressBar,
  ProgressBarSteps: ProgressBarSteps,
  ProgressBarRepeatable: ProgressBarRepeatable,
  ProgressBarStepsRepeatable: ProgressBarStepsRepeatable,
  ProgressBarStepsRepeatableFinite: ProgressBarStepsRepeatableFinite
});

const portalTemplate = "<sqm-portal-frame>\r\n  <a slot=\"header\" href=\"/\">\r\n    <sqm-text style=\"height: 60px\">\r\n      <img\r\n        style=\"height: 60px\"\r\n        src=\"https://res.cloudinary.com/saasquatch/image/upload/v1634255445/squatch-assets/Copy_of_saasquatch-logo-tree-large-horizontal.png\"\r\n      />\r\n    </sqm-text>\r\n  </a>\r\n  <sqb-program-section program-id=\"referral-program\">\r\n    <sqm-router>\r\n      <template\r\n        path=\"/:path(\\bregister\\b|\\bemailVerification\\b|\\blogin\\b|\\bverifyEmail\\b|\\bforgotPassword\\b|\\bresetPassword\\b|\\blogout\\b)\"\r\n      >\r\n        <sqm-graphql-client-provider\r\n          domain=\"https://managed-identity.saasquatch.com\"\r\n        >\r\n          <sqm-hero\r\n            background=\"https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80\"\r\n          >\r\n            <sqm-router>\r\n              <template path=\"/register\">\r\n                <sqm-portal-register>\r\n                  <sqm-name-fields slot=\"formData\"></sqm-name-fields>\r\n                </sqm-portal-register>\r\n              </template>\r\n\r\n              <template path=\"/emailVerification\">\r\n                <sqm-portal-protected-route\r\n                  redirect-to=\"/login\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-email-verification></sqm-portal-email-verification>\r\n              </template>\r\n\r\n              <template path=\"/login\">\r\n                <sqm-portal-login></sqm-portal-login>\r\n              </template>\r\n\r\n              <template path=\"/verifyEmail\">\r\n                <sqm-portal-verify-email></sqm-portal-verify-email>\r\n              </template>\r\n\r\n              <template path=\"/forgotPassword\">\r\n                <sqm-portal-forgot-password\r\n                  email-label=\"Business Email\"\r\n                ></sqm-portal-forgot-password>\r\n              </template>\r\n\r\n              <template path=\"/resetPassword\">\r\n                <sqm-portal-reset-password\r\n                  confirm-password=\"true\"\r\n                ></sqm-portal-reset-password>\r\n              </template>\r\n              <template path=\"/logout\">\r\n                <sqm-portal-logout next-page=\"/login\"></sqm-portal-logout>\r\n              </template>\r\n            </sqm-router>\r\n          </sqm-hero>\r\n        </sqm-graphql-client-provider>\r\n      </template>\r\n    </sqm-router>\r\n    <sqm-router>\r\n      <template path=\"/:path(\\bactivity\\b|\\beditProfile\\b)?\">\r\n        <sqm-divided-layout\r\n          direction=\"row\"\r\n          style=\"\r\n            border-top: 1px solid #eaeaea;\r\n            border-bottom: 1px solid #eaeaea;\r\n          \"\r\n        >\r\n          <sqm-navigation-sidebar>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/\"\r\n              icon=\"house\"\r\n              label=\"Dashboard\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/activity\"\r\n              icon=\"bar-chart\"\r\n              label=\"Activity\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/editProfile\"\r\n              icon=\"person\"\r\n              label=\"Edit Profile\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/logout\"\r\n              icon=\"box-arrow-right\"\r\n              label=\"Logout\"\r\n            ></sqm-navigation-sidebar-item>\r\n          </sqm-navigation-sidebar>\r\n          <sqm-divided-layout direction=\"column\">\r\n            <sqm-router>\r\n              <template path=\"/\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqb-widget\r\n                  widget-type=\"p/referral-program/w/referrerWidget\"\r\n                  track-loads=\"true\"\r\n                ></sqb-widget>\r\n              </template>\r\n              <template path=\"/editProfile\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-container direction=\"column\" gap=\"xxx-large\">\r\n                  <sqm-portal-profile></sqm-portal-profile> </sqm-portal-container\r\n                ><sqm-portal-container direction=\"column\" gap=\"xxx-large\">\r\n                  <sqm-graphql-client-provider\r\n                    domain=\"https://managed-identity.saasquatch.com\"\r\n                  >\r\n                    <sqm-portal-change-password></sqm-portal-change-password>\r\n                  </sqm-graphql-client-provider>\r\n                </sqm-portal-container>\r\n              </template>\r\n\r\n              <template path=\"/activity\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-container\r\n                  direction=\"column\"\r\n                  padding=\"xxx-large\"\r\n                  gap=\"xxx-large\"\r\n                >\r\n                  <sqm-text> <h1>Activity</h1></sqm-text>\r\n                  <sqm-stat-container space=\"xxxx-large\"\r\n                    ><sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/referralsCount\"\r\n                      ><sqm-text><p>Referrals</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardsCountFiltered/AVAILABLE\"\r\n                      ><sqm-text><p>Rewards Earned</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardBalance/CREDIT/CENTS\"\r\n                      ><sqm-text><p>Reward Balance</p></sqm-text></sqm-big-stat\r\n                    >\r\n                  </sqm-stat-container>\r\n                  <sqm-referral-table>\r\n                    <sqm-referral-table-user-column></sqm-referral-table-user-column>\r\n                    <sqm-referral-table-rewards-column></sqm-referral-table-rewards-column>\r\n                    <sqm-referral-table-status-column></sqm-referral-table-status-column>\r\n                    <sqm-referral-table-date-column\r\n                      column-title=\"Referred\"\r\n                      date-shown=\"dateReferralStarted\"\r\n                    ></sqm-referral-table-date-column> </sqm-referral-table\r\n                ></sqm-portal-container>\r\n              </template>\r\n            </sqm-router>\r\n          </sqm-divided-layout>\r\n        </sqm-divided-layout>\r\n      </template>\r\n    </sqm-router>\r\n  </sqb-program-section>\r\n  <sqm-portal-footer\r\n    slot=\"footer\"\r\n    support-email=\"support@example.com\"\r\n    terms-link=\"https://example.com\"\r\n    faq-link=\"https://example.com\"\r\n    terms-text=\"Terms And Conditions\"\r\n    faq-text=\"FAQ\"\r\n    show-powered-by=\"true\"\r\n  ></sqm-portal-footer>\r\n</sqm-portal-frame>\r\n";

const portalLeadSubmitTemplate = "<sqm-portal-frame>\r\n  <a slot=\"header\" href=\"/\">\r\n    <sqm-text style=\"height: 60px\">\r\n      <img\r\n        style=\"height: 60px\"\r\n        src=\"https://res.cloudinary.com/saasquatch/image/upload/v1634255445/squatch-assets/Copy_of_saasquatch-logo-tree-large-horizontal.png\"\r\n      />\r\n    </sqm-text>\r\n  </a>\r\n  <sqb-program-section program-id=\"referral-program\">\r\n    <sqm-router>\r\n      <template\r\n        path=\"/:path(\\bregister\\b|\\bemailVerification\\b|\\blogin\\b|\\bverifyEmail\\b|\\bforgotPassword\\b|\\bresetPassword\\b|\\blogout\\b)\"\r\n      >\r\n        <sqm-graphql-client-provider\r\n          domain=\"https://managed-identity.saasquatch.com\"\r\n        >\r\n          <sqm-hero\r\n            background=\"https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80\"\r\n          >\r\n            <sqm-router>\r\n              <template path=\"/register\">\r\n                <sqm-portal-register>\r\n                  <sqm-name-fields slot=\"formData\"></sqm-name-fields>\r\n                </sqm-portal-register>\r\n              </template>\r\n\r\n              <template path=\"/emailVerification\">\r\n                <sqm-portal-protected-route\r\n                  redirect-to=\"/login\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-email-verification></sqm-portal-email-verification>\r\n              </template>\r\n\r\n              <template path=\"/login\">\r\n                <sqm-portal-login></sqm-portal-login>\r\n              </template>\r\n\r\n              <template path=\"/verifyEmail\">\r\n                <sqm-portal-verify-email></sqm-portal-verify-email>\r\n              </template>\r\n\r\n              <template path=\"/forgotPassword\">\r\n                <sqm-portal-forgot-password\r\n                  email-label=\"Business Email\"\r\n                ></sqm-portal-forgot-password>\r\n              </template>\r\n\r\n              <template path=\"/resetPassword\">\r\n                <sqm-portal-reset-password\r\n                  confirm-password=\"true\"\r\n                ></sqm-portal-reset-password>\r\n              </template>\r\n              <template path=\"/logout\">\r\n                <sqm-portal-logout next-page=\"/login\"></sqm-portal-logout>\r\n              </template>\r\n            </sqm-router>\r\n          </sqm-hero>\r\n        </sqm-graphql-client-provider>\r\n      </template>\r\n    </sqm-router>\r\n    <sqm-router>\r\n      <template path=\"/:path(\\bactivity\\b|\\beditProfile\\b|\\brefer\\b)?\">\r\n        <sqm-divided-layout\r\n          direction=\"row\"\r\n          style=\"\r\n            border-top: 1px solid #eaeaea;\r\n            border-bottom: 1px solid #eaeaea;\r\n          \"\r\n        >\r\n          <sqm-navigation-sidebar>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/\"\r\n              icon=\"house\"\r\n              label=\"Dashboard\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/refer\"\r\n              icon=\"inbox\"\r\n              label=\"Submit A Lead\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/activity\"\r\n              icon=\"bar-chart\"\r\n              label=\"Activity\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/editProfile\"\r\n              icon=\"person\"\r\n              label=\"Edit Profile\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/logout\"\r\n              icon=\"box-arrow-right\"\r\n              label=\"Logout\"\r\n            ></sqm-navigation-sidebar-item>\r\n          </sqm-navigation-sidebar>\r\n          <sqm-divided-layout direction=\"column\">\r\n            <sqm-router>\r\n              <template path=\"/\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqb-widget\r\n                  widget-type=\"p/referral-program/w/referrerWidget\"\r\n                  track-loads=\"true\"\r\n                ></sqb-widget>\r\n              </template>\r\n              <template path=\"/editProfile\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-container direction=\"column\" gap=\"xxx-large\">\r\n                  <sqm-portal-profile></sqm-portal-profile> </sqm-portal-container\r\n                ><sqm-portal-container direction=\"column\" gap=\"xxx-large\">\r\n                  <sqm-graphql-client-provider\r\n                    domain=\"https://managed-identity.saasquatch.com\"\r\n                  >\r\n                    <sqm-portal-change-password></sqm-portal-change-password>\r\n                  </sqm-graphql-client-provider>\r\n                </sqm-portal-container>\r\n              </template>\r\n              <template path=\"/refer\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-referral-iframe></sqm-referral-iframe>\r\n              </template>\r\n              <template path=\"/activity\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-container\r\n                  direction=\"column\"\r\n                  padding=\"xxx-large\"\r\n                  gap=\"xxx-large\"\r\n                >\r\n                  <sqm-text> <h1>Activity</h1></sqm-text>\r\n                  <sqm-stat-container space=\"xxxx-large\"\r\n                    ><sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/referralsCount\"\r\n                      ><sqm-text><p>Referrals</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardsCountFiltered/AVAILABLE\"\r\n                      ><sqm-text><p>Rewards Earned</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardBalance/CREDIT/CENTS\"\r\n                      ><sqm-text><p>Reward Balance</p></sqm-text></sqm-big-stat\r\n                    >\r\n                  </sqm-stat-container>\r\n                  <sqm-referral-table>\r\n                    <sqm-referral-table-user-column></sqm-referral-table-user-column>\r\n                    <sqm-referral-table-rewards-column></sqm-referral-table-rewards-column>\r\n                    <sqm-referral-table-status-column></sqm-referral-table-status-column>\r\n                    <sqm-referral-table-date-column\r\n                      column-title=\"Referred\"\r\n                      date-shown=\"dateReferralStarted\"\r\n                    ></sqm-referral-table-date-column> </sqm-referral-table\r\n                ></sqm-portal-container>\r\n              </template>\r\n            </sqm-router>\r\n          </sqm-divided-layout>\r\n        </sqm-divided-layout>\r\n      </template>\r\n    </sqm-router>\r\n  </sqb-program-section>\r\n  <sqm-portal-footer\r\n    slot=\"footer\"\r\n    support-email=\"support@example.com\"\r\n    terms-link=\"https://example.com\"\r\n    faq-link=\"https://example.com\"\r\n    terms-text=\"Terms And Conditions\"\r\n    faq-text=\"FAQ\"\r\n    show-powered-by=\"true\"\r\n  ></sqm-portal-footer>\r\n</sqm-portal-frame>\r\n";

const portalLeadSubmitTemplateWithDashboard = "<sqm-portal-frame>\r\n  <a slot=\"header\" href=\"/\">\r\n    <sqm-text style=\"height: 60px\">\r\n      <img\r\n        style=\"height: 60px\"\r\n        src=\"https://res.cloudinary.com/saasquatch/image/upload/v1634255445/squatch-assets/Copy_of_saasquatch-logo-tree-large-horizontal.png\"\r\n      />\r\n    </sqm-text>\r\n  </a>\r\n  <sqb-program-section program-id=\"referral-program\">\r\n    <sqm-router>\r\n      <template\r\n        path=\"/:path(\\bregister\\b|\\bemailVerification\\b|\\blogin\\b|\\bverifyEmail\\b|\\bforgotPassword\\b|\\bresetPassword\\b|\\blogout\\b)\"\r\n      >\r\n        <sqm-graphql-client-provider\r\n          domain=\"https://managed-identity.saasquatch.com\"\r\n        >\r\n          <sqm-hero\r\n            background=\"https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80\"\r\n          >\r\n            <sqm-router>\r\n              <template path=\"/register\">\r\n                <sqm-portal-register>\r\n                  <sqm-name-fields slot=\"formData\"></sqm-name-fields>\r\n                </sqm-portal-register>\r\n              </template>\r\n\r\n              <template path=\"/emailVerification\">\r\n                <sqm-portal-protected-route\r\n                  redirect-to=\"/login\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-email-verification></sqm-portal-email-verification>\r\n              </template>\r\n\r\n              <template path=\"/login\">\r\n                <sqm-portal-login></sqm-portal-login>\r\n              </template>\r\n\r\n              <template path=\"/verifyEmail\">\r\n                <sqm-portal-verify-email></sqm-portal-verify-email>\r\n              </template>\r\n\r\n              <template path=\"/forgotPassword\">\r\n                <sqm-portal-forgot-password\r\n                  email-label=\"Business Email\"\r\n                ></sqm-portal-forgot-password>\r\n              </template>\r\n\r\n              <template path=\"/resetPassword\">\r\n                <sqm-portal-reset-password\r\n                  confirm-password=\"true\"\r\n                ></sqm-portal-reset-password>\r\n              </template>\r\n              <template path=\"/logout\">\r\n                <sqm-portal-logout next-page=\"/login\"></sqm-portal-logout>\r\n              </template>\r\n            </sqm-router>\r\n          </sqm-hero>\r\n        </sqm-graphql-client-provider>\r\n      </template>\r\n    </sqm-router>\r\n    <sqm-router>\r\n      <template path=\"/:path(\\bactivity\\b|\\beditProfile\\b|\\brefer\\b)?\">\r\n        <sqm-divided-layout\r\n          direction=\"row\"\r\n          style=\"\r\n            border-top: 1px solid #eaeaea;\r\n            border-bottom: 1px solid #eaeaea;\r\n          \"\r\n        >\r\n          <sqm-navigation-sidebar>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/\"\r\n              icon=\"house\"\r\n              label=\"Dashboard\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/refer\"\r\n              icon=\"inbox\"\r\n              label=\"Submit A Lead\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/activity\"\r\n              icon=\"bar-chart\"\r\n              label=\"Activity\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/editProfile\"\r\n              icon=\"person\"\r\n              label=\"Edit Profile\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/logout\"\r\n              icon=\"box-arrow-right\"\r\n              label=\"Logout\"\r\n            ></sqm-navigation-sidebar-item>\r\n          </sqm-navigation-sidebar>\r\n          <sqm-divided-layout direction=\"column\">\r\n            <sqm-router>\r\n              <template path=\"/\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-container\r\n                  direction=\"column\"\r\n                  padding=\"xxx-large\"\r\n                  gap=\"xxx-large\"\r\n                  ><sqm-titled-section label-margin=\"xx-small\"\r\n                    ><sqm-text slot=\"label\"> <p>Welcome back,</p> </sqm-text\r\n                    ><sqm-text slot=\"content\">\r\n                      <h1>\r\n                        <sqm-user-name\r\n                          fallback=\"Anonymous User\"\r\n                        ></sqm-user-name>\r\n                      </h1> </sqm-text\r\n                  ></sqm-titled-section>\r\n                  <sqm-stat-container space=\"xxxx-large\"\r\n                    ><sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/referralsCount\"\r\n                      ><sqm-text><p>Referrals</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardsCountFiltered/AVAILABLE\"\r\n                      ><sqm-text><p>Rewards Earned</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardBalance/CREDIT/CENTS\"\r\n                      ><sqm-text><p>Reward Balance</p></sqm-text></sqm-big-stat\r\n                    >\r\n                  </sqm-stat-container> </sqm-portal-container\r\n                ><sqm-portal-container\r\n                  direction=\"column\"\r\n                  padding=\"xxx-large\"\r\n                  gap=\"xxx-large\"\r\n                >\r\n                  <sqm-titled-section padding=\"none\" label-margin=\"x-large\"\r\n                    ><sqm-text slot=\"label\">\r\n                      <h2>Partner and Profit</h2> </sqm-text\r\n                    ><sqm-text slot=\"content\">\r\n                      <p>\r\n                        Get rewarded for referring potential customers to\r\n                        SaaSquatch. Earn commission for each successful lead you\r\n                        send our way\r\n                      </p>\r\n                    </sqm-text></sqm-titled-section\r\n                  >\r\n                  <sqm-titled-section label-margin=\"small\" padding=\"none\"\r\n                    ><sqm-text slot=\"label\">\r\n                      <h3>Share your referral link</h3> </sqm-text\r\n                    ><sqm-share-link slot=\"content\"></sqm-share-link\r\n                  ></sqm-titled-section>\r\n                  <sqm-titled-section label-margin=\"small\" padding=\"none\">\r\n                    <sqm-text slot=\"label\">\r\n                      <h3>Share your referral code</h3> </sqm-text\r\n                    ><sqm-share-code slot=\"content\"></sqm-share-code>\r\n                  </sqm-titled-section>\r\n                  <sqm-titled-section label-margin=\"small\" padding=\"none\"\r\n                    ><sqm-text slot=\"label\">\r\n                      <h3>Share via social media</h3> </sqm-text\r\n                    ><sqm-portal-container\r\n                      slot=\"content\"\r\n                      direction=\"row\"\r\n                      padding=\"none\"\r\n                      gap=\"xxx-large\"\r\n                      min-width=\"160px\"\r\n                      ><sqm-share-button\r\n                        icon=\"envelope\"\r\n                        medium=\"email\"\r\n                        size=\"medium\"\r\n                        pill=\"true\"\r\n                        >Email a friend</sqm-share-button\r\n                      ><sqm-share-button\r\n                        medium=\"twitter\"\r\n                        size=\"medium\"\r\n                        pill=\"true\"\r\n                        >Tweet about us</sqm-share-button\r\n                      ><sqm-share-button\r\n                        medium=\"facebook\"\r\n                        size=\"medium\"\r\n                        pill=\"true\"\r\n                        >Share on Facebook</sqm-share-button\r\n                      ></sqm-portal-container\r\n                    ></sqm-titled-section\r\n                  ></sqm-portal-container\r\n                >\r\n              </template>\r\n              <template path=\"/editProfile\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-container direction=\"column\" gap=\"xxx-large\">\r\n                  <sqm-portal-profile></sqm-portal-profile> </sqm-portal-container\r\n                ><sqm-portal-container direction=\"column\" gap=\"xxx-large\">\r\n                  <sqm-graphql-client-provider\r\n                    domain=\"https://managed-identity.saasquatch.com\"\r\n                  >\r\n                    <sqm-portal-change-password></sqm-portal-change-password>\r\n                  </sqm-graphql-client-provider>\r\n                </sqm-portal-container>\r\n              </template>\r\n              <template path=\"/refer\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-referral-iframe></sqm-referral-iframe>\r\n              </template>\r\n              <template path=\"/activity\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-container\r\n                  direction=\"column\"\r\n                  padding=\"xxx-large\"\r\n                  gap=\"xxx-large\"\r\n                >\r\n                  <sqm-text> <h1>Activity</h1></sqm-text>\r\n                  <sqm-stat-container space=\"xxxx-large\"\r\n                    ><sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/referralsCount\"\r\n                      ><sqm-text><p>Referrals</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardsCountFiltered/AVAILABLE\"\r\n                      ><sqm-text><p>Rewards Earned</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardBalance/CREDIT/CENTS\"\r\n                      ><sqm-text><p>Reward Balance</p></sqm-text></sqm-big-stat\r\n                    >\r\n                  </sqm-stat-container>\r\n                  <sqm-referral-table>\r\n                    <sqm-referral-table-user-column></sqm-referral-table-user-column>\r\n                    <sqm-referral-table-rewards-column></sqm-referral-table-rewards-column>\r\n                    <sqm-referral-table-status-column></sqm-referral-table-status-column>\r\n                    <sqm-referral-table-date-column\r\n                      column-title=\"Referred\"\r\n                      date-shown=\"dateReferralStarted\"\r\n                    ></sqm-referral-table-date-column> </sqm-referral-table\r\n                ></sqm-portal-container>\r\n              </template>\r\n            </sqm-router>\r\n          </sqm-divided-layout>\r\n        </sqm-divided-layout>\r\n      </template>\r\n    </sqm-router>\r\n  </sqb-program-section>\r\n  <sqm-portal-footer\r\n    slot=\"footer\"\r\n    support-email=\"support@example.com\"\r\n    terms-link=\"https://example.com\"\r\n    faq-link=\"https://example.com\"\r\n    terms-text=\"Terms And Conditions\"\r\n    faq-text=\"FAQ\"\r\n    show-powered-by=\"true\"\r\n  ></sqm-portal-footer>\r\n</sqm-portal-frame>\r\n";

const portalTemplateWithDashboard = "<sqm-portal-frame>\r\n  <a slot=\"header\" href=\"/\">\r\n    <sqm-text style=\"height: 60px\">\r\n      <img\r\n        style=\"height: 60px\"\r\n        src=\"https://res.cloudinary.com/saasquatch/image/upload/v1634255445/squatch-assets/Copy_of_saasquatch-logo-tree-large-horizontal.png\"\r\n      />\r\n    </sqm-text>\r\n  </a>\r\n  <sqb-program-section program-id=\"referral-program\">\r\n    <sqm-router>\r\n      <template\r\n        path=\"/:path(\\bregister\\b|\\bemailVerification\\b|\\blogin\\b|\\bverifyEmail\\b|\\bforgotPassword\\b|\\bresetPassword\\b|\\blogout\\b)\"\r\n      >\r\n        <sqm-graphql-client-provider\r\n          domain=\"https://managed-identity.saasquatch.com\"\r\n        >\r\n          <sqm-hero\r\n            background=\"https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80\"\r\n          >\r\n            <sqm-router>\r\n              <template path=\"/register\">\r\n                <sqm-portal-register>\r\n                  <sqm-name-fields slot=\"formData\"></sqm-name-fields>\r\n                </sqm-portal-register>\r\n              </template>\r\n\r\n              <template path=\"/emailVerification\">\r\n                <sqm-portal-protected-route\r\n                  redirect-to=\"/login\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-email-verification></sqm-portal-email-verification>\r\n              </template>\r\n\r\n              <template path=\"/login\">\r\n                <sqm-portal-login></sqm-portal-login>\r\n              </template>\r\n\r\n              <template path=\"/verifyEmail\">\r\n                <sqm-portal-verify-email></sqm-portal-verify-email>\r\n              </template>\r\n\r\n              <template path=\"/forgotPassword\">\r\n                <sqm-portal-forgot-password\r\n                  email-label=\"Business Email\"\r\n                ></sqm-portal-forgot-password>\r\n              </template>\r\n\r\n              <template path=\"/resetPassword\">\r\n                <sqm-portal-reset-password\r\n                  confirm-password=\"true\"\r\n                ></sqm-portal-reset-password>\r\n              </template>\r\n              <template path=\"/logout\">\r\n                <sqm-portal-logout next-page=\"/login\"></sqm-portal-logout>\r\n              </template>\r\n            </sqm-router>\r\n          </sqm-hero>\r\n        </sqm-graphql-client-provider>\r\n      </template>\r\n    </sqm-router>\r\n    <sqm-router>\r\n      <template path=\"/:path(\\bactivity\\b|\\beditProfile\\b)?\">\r\n        <sqm-divided-layout\r\n          direction=\"row\"\r\n          style=\"\r\n            border-top: 1px solid #eaeaea;\r\n            border-bottom: 1px solid #eaeaea;\r\n          \"\r\n        >\r\n          <sqm-navigation-sidebar>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/\"\r\n              icon=\"house\"\r\n              label=\"Dashboard\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/activity\"\r\n              icon=\"bar-chart\"\r\n              label=\"Activity\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/editProfile\"\r\n              icon=\"person\"\r\n              label=\"Edit Profile\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/logout\"\r\n              icon=\"box-arrow-right\"\r\n              label=\"Logout\"\r\n            ></sqm-navigation-sidebar-item>\r\n          </sqm-navigation-sidebar>\r\n          <sqm-divided-layout direction=\"column\">\r\n            <sqm-router>\r\n              <template path=\"/\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-container\r\n                  direction=\"column\"\r\n                  padding=\"xxx-large\"\r\n                  gap=\"xxx-large\"\r\n                  ><sqm-titled-section label-margin=\"xx-small\"\r\n                    ><sqm-text slot=\"label\"> <p>Welcome back,</p> </sqm-text\r\n                    ><sqm-text slot=\"content\">\r\n                      <h1>\r\n                        <sqm-user-name\r\n                          fallback=\"Anonymous User\"\r\n                        ></sqm-user-name>\r\n                      </h1> </sqm-text\r\n                  ></sqm-titled-section>\r\n                  <sqm-stat-container space=\"xxxx-large\"\r\n                    ><sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/referralsCount\"\r\n                      ><sqm-text><p>Referrals</p></sqm-text></sqm-big-stat\r\n                    ><sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardBalance/CREDIT/CENTS\"\r\n                      ><sqm-text><p>Reward Balance</p></sqm-text></sqm-big-stat\r\n                    >\r\n                  </sqm-stat-container> </sqm-portal-container\r\n                ><sqm-portal-container\r\n                  direction=\"column\"\r\n                  padding=\"xxx-large\"\r\n                  gap=\"xxx-large\"\r\n                >\r\n                  <sqm-titled-section padding=\"none\" label-margin=\"x-large\"\r\n                    ><sqm-text slot=\"label\">\r\n                      <h2>Partner and Profit</h2> </sqm-text\r\n                    ><sqm-text slot=\"content\">\r\n                      <p>\r\n                        Get rewarded for referring potential customers to\r\n                        SaaSquatch. Earn commission for each successful lead you\r\n                        send our way\r\n                      </p>\r\n                    </sqm-text></sqm-titled-section\r\n                  >\r\n                  <sqm-titled-section label-margin=\"small\" padding=\"none\"\r\n                    ><sqm-text slot=\"label\">\r\n                      <h3>Share your referral link</h3> </sqm-text\r\n                    ><sqm-share-link slot=\"content\"></sqm-share-link\r\n                  ></sqm-titled-section>\r\n                  <sqm-titled-section label-margin=\"small\" padding=\"none\">\r\n                    <sqm-text slot=\"label\">\r\n                      <h3>Share your referral code</h3> </sqm-text\r\n                    ><sqm-share-code slot=\"content\"></sqm-share-code>\r\n                  </sqm-titled-section>\r\n                  <sqm-titled-section label-margin=\"small\" padding=\"none\"\r\n                    ><sqm-text slot=\"label\">\r\n                      <h3>Share via social media</h3> </sqm-text\r\n                    ><sqm-portal-container\r\n                      slot=\"content\"\r\n                      direction=\"row\"\r\n                      padding=\"none\"\r\n                      gap=\"xxx-large\"\r\n                      min-width=\"160px\"\r\n                      ><sqm-share-button\r\n                        icon=\"envelope\"\r\n                        medium=\"email\"\r\n                        size=\"medium\"\r\n                        pill=\"true\"\r\n                        >Email a friend</sqm-share-button\r\n                      ><sqm-share-button\r\n                        medium=\"twitter\"\r\n                        size=\"medium\"\r\n                        pill=\"true\"\r\n                        >Tweet about us</sqm-share-button\r\n                      ><sqm-share-button\r\n                        medium=\"facebook\"\r\n                        size=\"medium\"\r\n                        pill=\"true\"\r\n                        >Share on Facebook</sqm-share-button\r\n                      ></sqm-portal-container\r\n                    ></sqm-titled-section\r\n                  ></sqm-portal-container\r\n                >\r\n              </template>\r\n              <template path=\"/editProfile\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-container direction=\"column\" gap=\"xxx-large\">\r\n                  <sqm-portal-profile></sqm-portal-profile> </sqm-portal-container\r\n                ><sqm-portal-container direction=\"column\" gap=\"xxx-large\">\r\n                  <sqm-graphql-client-provider\r\n                    domain=\"https://managed-identity.saasquatch.com\"\r\n                  >\r\n                    <sqm-portal-change-password></sqm-portal-change-password>\r\n                  </sqm-graphql-client-provider>\r\n                </sqm-portal-container>\r\n              </template>\r\n\r\n              <template path=\"/activity\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-container\r\n                  direction=\"column\"\r\n                  padding=\"xxx-large\"\r\n                  gap=\"xxx-large\"\r\n                >\r\n                  <sqm-text> <h1>Activity</h1></sqm-text>\r\n                  <sqm-stat-container space=\"xxxx-large\"\r\n                    ><sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/referralsCount\"\r\n                      ><sqm-text><p>Referrals</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardsCountFiltered/AVAILABLE\"\r\n                      ><sqm-text><p>Rewards Earned</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardBalance/CREDIT/CENTS\"\r\n                      ><sqm-text><p>Reward Balance</p></sqm-text></sqm-big-stat\r\n                    >\r\n                  </sqm-stat-container>\r\n                  <sqm-referral-table>\r\n                    <sqm-referral-table-user-column></sqm-referral-table-user-column>\r\n                    <sqm-referral-table-rewards-column></sqm-referral-table-rewards-column>\r\n                    <sqm-referral-table-status-column></sqm-referral-table-status-column>\r\n                    <sqm-referral-table-date-column\r\n                      column-title=\"Referred\"\r\n                      date-shown=\"dateReferralStarted\"\r\n                    ></sqm-referral-table-date-column> </sqm-referral-table\r\n                ></sqm-portal-container>\r\n              </template>\r\n            </sqm-router>\r\n          </sqm-divided-layout>\r\n        </sqm-divided-layout>\r\n      </template>\r\n    </sqm-router>\r\n  </sqb-program-section>\r\n  <sqm-portal-footer\r\n    slot=\"footer\"\r\n    support-email=\"support@example.com\"\r\n    terms-link=\"https://example.com\"\r\n    faq-link=\"https://example.com\"\r\n    terms-text=\"Terms And Conditions\"\r\n    faq-text=\"FAQ\"\r\n    show-powered-by=\"true\"\r\n  ></sqm-portal-footer>\r\n</sqm-portal-frame>\r\n";

const multiProgramTemplate = "<sqm-portal-frame>\r\n  <a slot=\"header\" href=\"/\">\r\n    <sqm-text style=\"height: 60px\">\r\n      <img\r\n        style=\"height: 60px\"\r\n        src=\"https://res.cloudinary.com/saasquatch/image/upload/v1634255445/squatch-assets/Copy_of_saasquatch-logo-tree-large-horizontal.png\"\r\n      />\r\n    </sqm-text>\r\n  </a>\r\n  <sqb-program-section program-id=\"referral-program-1\">\r\n    <sqm-router>\r\n      <template\r\n        path=\"/:path(\\bregister\\b|\\bemailVerification\\b|\\blogin\\b|\\bverifyEmail\\b|\\bforgotPassword\\b|\\bresetPassword\\b|\\blogout\\b)\"\r\n      >\r\n        <sqm-graphql-client-provider\r\n          domain=\"https://managed-identity.saasquatch.com\"\r\n        >\r\n          <sqm-hero\r\n            background=\"https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80\"\r\n          >\r\n            <sqm-router>\r\n              <template path=\"/register\">\r\n                <sqm-portal-register>\r\n                  <sqm-name-fields slot=\"formData\"></sqm-name-fields>\r\n                </sqm-portal-register>\r\n              </template>\r\n\r\n              <template path=\"/emailVerification\">\r\n                <sqm-portal-protected-route\r\n                  redirect-to=\"/login\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-email-verification></sqm-portal-email-verification>\r\n              </template>\r\n\r\n              <template path=\"/login\">\r\n                <sqm-portal-login></sqm-portal-login>\r\n              </template>\r\n\r\n              <template path=\"/verifyEmail\">\r\n                <sqm-portal-verify-email></sqm-portal-verify-email>\r\n              </template>\r\n\r\n              <template path=\"/forgotPassword\">\r\n                <sqm-portal-forgot-password\r\n                  email-label=\"Business Email\"\r\n                ></sqm-portal-forgot-password>\r\n              </template>\r\n\r\n              <template path=\"/resetPassword\">\r\n                <sqm-portal-reset-password\r\n                  confirm-password=\"true\"\r\n                ></sqm-portal-reset-password>\r\n              </template>\r\n              <template path=\"/logout\">\r\n                <sqm-portal-logout next-page=\"/login\"></sqm-portal-logout>\r\n              </template>\r\n            </sqm-router>\r\n          </sqm-hero>\r\n        </sqm-graphql-client-provider>\r\n      </template>\r\n    </sqm-router>\r\n    <sqm-router>\r\n      <template path=\"/:path(\\bactivity\\b|\\beditProfile\\b)?\">\r\n        <sqm-divided-layout\r\n          direction=\"row\"\r\n          style=\"\r\n            border-top: 1px solid #eaeaea;\r\n            border-bottom: 1px solid #eaeaea;\r\n          \"\r\n        >\r\n          <sqm-navigation-sidebar>\r\n            <sqm-program-menu>\r\n              <sl-menu-item value=\"referral-program-1\"\r\n                >Referral Program 1</sl-menu-item\r\n              >\r\n              <sl-menu-item value=\"referral-program-2\"\r\n                >Referral Program 2</sl-menu-item\r\n              >\r\n            </sqm-program-menu>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/\"\r\n              icon=\"house\"\r\n              label=\"Dashboard\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/activity\"\r\n              icon=\"bar-chart\"\r\n              label=\"Activity\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/editProfile\"\r\n              icon=\"person\"\r\n              label=\"Edit Profile\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/logout\"\r\n              icon=\"box-arrow-right\"\r\n              label=\"Logout\"\r\n            ></sqm-navigation-sidebar-item>\r\n          </sqm-navigation-sidebar>\r\n          <sqm-divided-layout direction=\"column\">\r\n            <sqm-router>\r\n              <template path=\"/\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqb-program-switch>\r\n                  <template program-id=\"referral-program-1\">\r\n                    <sqb-widget\r\n                      widget-type=\"p/referral-program-1/w/referrerWidget\"\r\n                      track-loads=\"true\"\r\n                    ></sqb-widget>\r\n                  </template>\r\n                  <template program-id=\"referral-program-2\">\r\n                    <sqb-widget\r\n                      widget-type=\"p/referral-program-2/w/referrerWidget\"\r\n                      track-loads=\"true\"\r\n                    ></sqb-widget>\r\n                  </template>\r\n                </sqb-program-switch>\r\n              </template>\r\n              <template path=\"/editProfile\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-container direction=\"column\" gap=\"xxx-large\">\r\n                  <sqm-portal-profile></sqm-portal-profile></sqm-portal-container\r\n                ><sqm-portal-container direction=\"column\" gap=\"xxx-large\">\r\n                  <sqm-graphql-client-provider\r\n                    domain=\"https://managed-identity.saasquatch.com\"\r\n                  >\r\n                    <sqm-portal-change-password></sqm-portal-change-password>\r\n                  </sqm-graphql-client-provider>\r\n                </sqm-portal-container>\r\n              </template>\r\n              <template path=\"/activity\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-container\r\n                  direction=\"column\"\r\n                  padding=\"xxx-large\"\r\n                  gap=\"xxx-large\"\r\n                >\r\n                  <sqm-text> <h1>Activity</h1></sqm-text>\r\n                  <sqm-stat-container space=\"xxxx-large\"\r\n                    ><sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/referralsCount\"\r\n                      ><sqm-text><p>Referrals</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardsCountFiltered/AVAILABLE\"\r\n                      ><sqm-text><p>Rewards Earned</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardBalance/CREDIT/CENTS\"\r\n                      ><sqm-text><p>Reward Balance</p></sqm-text></sqm-big-stat\r\n                    >\r\n                  </sqm-stat-container>\r\n                  <sqm-referral-table>\r\n                    <sqm-referral-table-user-column></sqm-referral-table-user-column>\r\n                    <sqm-referral-table-rewards-column></sqm-referral-table-rewards-column>\r\n                    <sqm-referral-table-status-column></sqm-referral-table-status-column>\r\n                    <sqm-referral-table-date-column\r\n                      column-title=\"Referred\"\r\n                      date-shown=\"dateReferralStarted\"\r\n                    ></sqm-referral-table-date-column> </sqm-referral-table\r\n                ></sqm-portal-container>\r\n              </template>\r\n            </sqm-router>\r\n          </sqm-divided-layout>\r\n        </sqm-divided-layout>\r\n      </template>\r\n    </sqm-router>\r\n  </sqb-program-section>\r\n  <sqm-portal-footer\r\n    slot=\"footer\"\r\n    support-email=\"support@example.com\"\r\n    terms-link=\"https://example.com\"\r\n    faq-link=\"https://example.com\"\r\n    terms-text=\"Terms And Conditions\"\r\n    faq-text=\"FAQ\"\r\n    show-powered-by=\"true\"\r\n  ></sqm-portal-footer>\r\n</sqm-portal-frame>\r\n";

const multiProgramTemplateWithDashboard = "<sqm-portal-frame>\r\n  <a slot=\"header\" href=\"/\">\r\n    <sqm-text style=\"height: 60px\">\r\n      <img\r\n        style=\"height: 60px\"\r\n        src=\"https://res.cloudinary.com/saasquatch/image/upload/v1634255445/squatch-assets/Copy_of_saasquatch-logo-tree-large-horizontal.png\"\r\n      />\r\n    </sqm-text>\r\n  </a>\r\n  <sqb-program-section program-id=\"referral-program-1\">\r\n    <sqm-graphql-client-provider\r\n      domain=\"https://managed-identity.saasquatch.com\"\r\n    >\r\n      <sqm-hero\r\n        background=\"https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80\"\r\n      >\r\n        <sqm-router>\r\n          <template path=\"/register\">\r\n            <sqm-portal-register>\r\n              <sqm-name-fields slot=\"formData\"></sqm-name-fields>\r\n            </sqm-portal-register>\r\n          </template>\r\n\r\n          <template path=\"/emailVerification\">\r\n            <sqm-portal-protected-route\r\n              redirect-to=\"/login\"\r\n            ></sqm-portal-protected-route>\r\n            <sqm-portal-email-verification></sqm-portal-email-verification>\r\n          </template>\r\n\r\n          <template path=\"/login\">\r\n            <sqm-portal-login></sqm-portal-login>\r\n          </template>\r\n\r\n          <template path=\"/verifyEmail\">\r\n            <sqm-portal-verify-email></sqm-portal-verify-email>\r\n          </template>\r\n\r\n          <template path=\"/forgotPassword\">\r\n            <sqm-portal-forgot-password\r\n              email-label=\"Business Email\"\r\n            ></sqm-portal-forgot-password>\r\n          </template>\r\n\r\n          <template path=\"/resetPassword\">\r\n            <sqm-portal-reset-password\r\n              confirm-password=\"true\"\r\n            ></sqm-portal-reset-password>\r\n          </template>\r\n          <template path=\"/logout\">\r\n            <sqm-portal-logout next-page=\"/login\"></sqm-portal-logout>\r\n          </template>\r\n        </sqm-router>\r\n      </sqm-hero>\r\n    </sqm-graphql-client-provider>\r\n    <sqm-router>\r\n      <template path=\"/:path(\\bactivity\\b|\\beditProfile\\b)?\">\r\n        <sqm-divided-layout\r\n          direction=\"row\"\r\n          style=\"\r\n            border-top: 1px solid #eaeaea;\r\n            border-bottom: 1px solid #eaeaea;\r\n          \"\r\n        >\r\n          <sqm-navigation-sidebar>\r\n            <sqm-program-menu>\r\n              <sl-menu-item value=\"referral-program-1\"\r\n                >Referral Program 1</sl-menu-item\r\n              >\r\n              <sl-menu-item value=\"referral-program-2\"\r\n                >Referral Program 2</sl-menu-item\r\n              >\r\n            </sqm-program-menu>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/\"\r\n              icon=\"house\"\r\n              label=\"Dashboard\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/activity\"\r\n              icon=\"bar-chart\"\r\n              label=\"Activity\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/editProfile\"\r\n              icon=\"person\"\r\n              label=\"Edit Profile\"\r\n            ></sqm-navigation-sidebar-item>\r\n            <sqm-navigation-sidebar-item\r\n              path=\"/logout\"\r\n              icon=\"box-arrow-right\"\r\n              label=\"Logout\"\r\n            ></sqm-navigation-sidebar-item>\r\n          </sqm-navigation-sidebar>\r\n          <sqm-divided-layout direction=\"column\">\r\n            <sqm-router>\r\n              <template path=\"/\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route\r\n                ><sqm-portal-container\r\n                  direction=\"column\"\r\n                  padding=\"xxx-large\"\r\n                  gap=\"xxx-large\"\r\n                  ><sqm-titled-section label-margin=\"xx-small\"\r\n                    ><sqm-text slot=\"label\"> <p>Welcome back,</p> </sqm-text\r\n                    ><sqm-text slot=\"content\">\r\n                      <h1>\r\n                        <sqm-user-name\r\n                          fallback=\"Anonymous User\"\r\n                        ></sqm-user-name>\r\n                      </h1> </sqm-text\r\n                  ></sqm-titled-section>\r\n                  <sqm-stat-container space=\"xxxx-large\"\r\n                    ><sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/referralsCount\"\r\n                      ><sqm-text><p>Referrals</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardsCountFiltered/AVAILABLE\"\r\n                      ><sqm-text><p>Rewards Earned</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardBalance/CREDIT/CENTS\"\r\n                      ><sqm-text><p>Reward Balance</p></sqm-text></sqm-big-stat\r\n                    >\r\n                  </sqm-stat-container> </sqm-portal-container\r\n                ><sqm-portal-container\r\n                  direction=\"column\"\r\n                  padding=\"xxx-large\"\r\n                  gap=\"xxx-large\"\r\n                >\r\n                  <sqm-titled-section padding=\"none\" label-margin=\"x-large\"\r\n                    ><sqm-text slot=\"label\">\r\n                      <h2>Partner and Profit</h2> </sqm-text\r\n                    ><sqm-text slot=\"content\">\r\n                      <p>\r\n                        Get rewarded for referring potential customers to\r\n                        SaaSquatch. Earn commission for each successful lead you\r\n                        send our way\r\n                      </p>\r\n                    </sqm-text></sqm-titled-section\r\n                  >\r\n                  <sqm-titled-section label-margin=\"small\" padding=\"none\"\r\n                    ><sqm-text slot=\"label\">\r\n                      <h3>Share your referral link</h3> </sqm-text\r\n                    ><sqm-share-link slot=\"content\"></sqm-share-link\r\n                  ></sqm-titled-section>\r\n                  <sqm-titled-section label-margin=\"small\" padding=\"none\">\r\n                    <sqm-text slot=\"label\">\r\n                      <h3>Share your referral code</h3> </sqm-text\r\n                    ><sqm-share-code slot=\"content\"></sqm-share-code>\r\n                  </sqm-titled-section>\r\n                  <sqm-titled-section label-margin=\"small\" padding=\"none\"\r\n                    ><sqm-text slot=\"label\">\r\n                      <h3>Share via social media</h3> </sqm-text\r\n                    ><sqm-portal-container\r\n                      slot=\"content\"\r\n                      direction=\"row\"\r\n                      padding=\"none\"\r\n                      gap=\"xxx-large\"\r\n                      min-width=\"160px\"\r\n                      ><sqm-share-button\r\n                        icon=\"envelope\"\r\n                        medium=\"email\"\r\n                        size=\"medium\"\r\n                        pill=\"true\"\r\n                        >Email a friend</sqm-share-button\r\n                      ><sqm-share-button\r\n                        medium=\"twitter\"\r\n                        size=\"medium\"\r\n                        pill=\"true\"\r\n                        >Tweet about us</sqm-share-button\r\n                      ><sqm-share-button\r\n                        medium=\"facebook\"\r\n                        size=\"medium\"\r\n                        pill=\"true\"\r\n                        >Share on Facebook</sqm-share-button\r\n                      ></sqm-portal-container\r\n                    ></sqm-titled-section\r\n                  ></sqm-portal-container\r\n                >\r\n              </template>\r\n              <template path=\"/editProfile\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-container direction=\"column\" gap=\"xxx-large\">\r\n                  <sqm-portal-profile></sqm-portal-profile> </sqm-portal-container\r\n                ><sqm-portal-container direction=\"column\" gap=\"xxx-large\">\r\n                  <sqm-graphql-client-provider\r\n                    domain=\"https://managed-identity.saasquatch.com\"\r\n                  >\r\n                    <sqm-portal-change-password></sqm-portal-change-password>\r\n                  </sqm-graphql-client-provider>\r\n                </sqm-portal-container>\r\n              </template>\r\n              <template path=\"/activity\">\r\n                <sqm-portal-protected-route\r\n                  require-email-verification=\"true\"\r\n                  redirect-to=\"/login\"\r\n                  redirect-to-unverified=\"/emailVerification\"\r\n                ></sqm-portal-protected-route>\r\n                <sqm-portal-container\r\n                  direction=\"column\"\r\n                  padding=\"xxx-large\"\r\n                  gap=\"xxx-large\"\r\n                >\r\n                  <sqm-text> <h1>Activity</h1></sqm-text>\r\n                  <sqm-stat-container space=\"xxxx-large\"\r\n                    ><sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/referralsCount\"\r\n                      ><sqm-text><p>Referrals</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardsCountFiltered/AVAILABLE\"\r\n                      ><sqm-text><p>Rewards Earned</p></sqm-text></sqm-big-stat\r\n                    >\r\n                    <sqm-big-stat\r\n                      flex-reverse=\"true\"\r\n                      alignment=\"left\"\r\n                      stat-type=\"/rewardBalance/CREDIT/CENTS\"\r\n                      ><sqm-text><p>Reward Balance</p></sqm-text></sqm-big-stat\r\n                    >\r\n                  </sqm-stat-container>\r\n                  <sqm-referral-table>\r\n                    <sqm-referral-table-user-column></sqm-referral-table-user-column>\r\n                    <sqm-referral-table-rewards-column></sqm-referral-table-rewards-column>\r\n                    <sqm-referral-table-status-column></sqm-referral-table-status-column>\r\n                    <sqm-referral-table-date-column\r\n                      column-title=\"Referred\"\r\n                      date-shown=\"dateReferralStarted\"\r\n                    ></sqm-referral-table-date-column> </sqm-referral-table\r\n                ></sqm-portal-container>\r\n              </template>\r\n            </sqm-router>\r\n          </sqm-divided-layout>\r\n        </sqm-divided-layout>\r\n      </template>\r\n    </sqm-router>\r\n  </sqb-program-section>\r\n  <sqm-portal-footer\r\n    slot=\"footer\"\r\n    support-email=\"support@example.com\"\r\n    terms-link=\"https://example.com\"\r\n    faq-link=\"https://example.com\"\r\n    terms-text=\"Terms And Conditions\"\r\n    faq-text=\"FAQ\"\r\n    show-powered-by=\"true\"\r\n  ></sqm-portal-footer>\r\n</sqm-portal-frame>\r\n";

const dashboardTemplate = "<sqm-portal-container direction=\"column\" padding=\"xxx-large\" gap=\"xxx-large\"\r\n  ><sqm-titled-section label-margin=\"xx-small\"\r\n    ><sqm-text slot=\"label\"> <p>Welcome back,</p> </sqm-text\r\n    ><sqm-text slot=\"content\">\r\n      <h1>\r\n        <sqm-user-name fallback=\"Anonymous User\"></sqm-user-name>\r\n      </h1> </sqm-text\r\n  ></sqm-titled-section>\r\n  <sqm-stat-container space=\"xxxx-large\"\r\n    ><sqm-big-stat\r\n      flex-reverse=\"true\"\r\n      alignment=\"left\"\r\n      stat-type=\"/referralsCount\"\r\n      ><sqm-text><p>Referrals</p></sqm-text></sqm-big-stat\r\n    >\r\n    <sqm-big-stat\r\n      flex-reverse=\"true\"\r\n      alignment=\"left\"\r\n      stat-type=\"/rewardsCountFiltered/AVAILABLE\"\r\n      ><sqm-text><p>Rewards Earned</p></sqm-text></sqm-big-stat\r\n    >\r\n    <sqm-big-stat\r\n      flex-reverse=\"true\"\r\n      alignment=\"left\"\r\n      stat-type=\"/rewardBalance/CREDIT/CENTS\"\r\n      ><sqm-text><p>Reward Balance</p></sqm-text></sqm-big-stat\r\n    >\r\n  </sqm-stat-container> </sqm-portal-container\r\n><sqm-portal-container direction=\"column\" padding=\"xxx-large\" gap=\"xxx-large\">\r\n  <sqm-titled-section padding=\"none\" label-margin=\"x-large\"\r\n    ><sqm-text slot=\"label\"> <h2>Partner and Profit</h2> </sqm-text\r\n    ><sqm-text slot=\"content\">\r\n      <p>\r\n        Get rewarded for referring potential customers to SaaSquatch. Earn\r\n        commission for each successful lead you send our way\r\n      </p>\r\n    </sqm-text></sqm-titled-section\r\n  >\r\n  <sqm-titled-section label-margin=\"small\" padding=\"none\"\r\n    ><sqm-text slot=\"label\"> <h3>Share your referral link</h3> </sqm-text\r\n    ><sqm-share-link slot=\"content\"></sqm-share-link\r\n  ></sqm-titled-section>\r\n  <sqm-titled-section label-margin=\"small\" padding=\"none\">\r\n    <sqm-text slot=\"label\"> <h3>Share your referral code</h3> </sqm-text\r\n    ><sqm-share-code slot=\"content\"></sqm-share-code>\r\n  </sqm-titled-section>\r\n  <sqm-titled-section label-margin=\"small\" padding=\"none\"\r\n    ><sqm-text slot=\"label\"> <h3>Share via social media</h3> </sqm-text\r\n    ><sqm-portal-container\r\n      slot=\"content\"\r\n      direction=\"row\"\r\n      padding=\"none\"\r\n      gap=\"xxx-large\"\r\n      min-width=\"160px\"\r\n      ><sqm-share-button\r\n        icon=\"envelope\"\r\n        medium=\"email\"\r\n        size=\"medium\"\r\n        pill=\"true\"\r\n        >Email a friend</sqm-share-button\r\n      ><sqm-share-button medium=\"twitter\" size=\"medium\" pill=\"true\"\r\n        >Tweet about us</sqm-share-button\r\n      ><sqm-share-button medium=\"facebook\" size=\"medium\" pill=\"true\"\r\n        >Share on Facebook</sqm-share-button\r\n      ></sqm-portal-container\r\n    ></sqm-titled-section\r\n  ></sqm-portal-container\r\n>\r\n";

const leadSubmitTemplate = "<sqm-referral-iframe></sqm-referral-iframe>\r\n";

const editProfileTemplate = "<sqm-portal-protected-route\r\n  require-email-verification=\"true\"\r\n  redirect-to=\"/login\"\r\n  redirect-to-unverified=\"/emailVerification\"\r\n></sqm-portal-protected-route>\r\n<sqm-portal-container direction=\"column\" gap=\"xxx-large\">\r\n  <sqm-portal-profile></sqm-portal-profile> </sqm-portal-container\r\n><sqm-portal-container direction=\"column\" gap=\"xxx-large\">\r\n  <sqm-graphql-client-provider domain=\"https://managed-identity.saasquatch.com\">\r\n    <sqm-portal-change-password></sqm-portal-change-password>\r\n  </sqm-graphql-client-provider>\r\n</sqm-portal-container>\r\n";

const activityTemplate = "<sqm-portal-protected-route\r\n  require-email-verification=\"true\"\r\n  redirect-to=\"/login\"\r\n  redirect-to-unverified=\"/emailVerification\"\r\n></sqm-portal-protected-route>\r\n<sqm-portal-container direction=\"column\" padding=\"xxx-large\" gap=\"xxx-large\">\r\n  <sqm-text> <h1>Activity</h1></sqm-text>\r\n  <sqm-stat-container space=\"xxxx-large\"\r\n    ><sqm-big-stat\r\n      flex-reverse=\"true\"\r\n      alignment=\"left\"\r\n      stat-type=\"/referralsCount\"\r\n      ><sqm-text><p>Referrals</p></sqm-text></sqm-big-stat\r\n    >\r\n    <sqm-big-stat\r\n      flex-reverse=\"true\"\r\n      alignment=\"left\"\r\n      stat-type=\"/rewardsCountFiltered/AVAILABLE\"\r\n      ><sqm-text><p>Rewards Earned</p></sqm-text></sqm-big-stat\r\n    >\r\n    <sqm-big-stat\r\n      flex-reverse=\"true\"\r\n      alignment=\"left\"\r\n      stat-type=\"/rewardBalance/CREDIT/CENTS\"\r\n      ><sqm-text><p>Reward Balance</p></sqm-text></sqm-big-stat\r\n    >\r\n  </sqm-stat-container>\r\n  <sqm-referral-table>\r\n    <sqm-referral-table-user-column></sqm-referral-table-user-column>\r\n    <sqm-referral-table-rewards-column></sqm-referral-table-rewards-column>\r\n    <sqm-referral-table-status-column></sqm-referral-table-status-column>\r\n    <sqm-referral-table-date-column\r\n      column-title=\"Referred\"\r\n      date-shown=\"dateReferralStarted\"\r\n    ></sqm-referral-table-date-column> </sqm-referral-table\r\n></sqm-portal-container>\r\n";

const resetPasswordEmailTemplate = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional //EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\r\n\r\n<html\r\n  xmlns=\"http://www.w3.org/1999/xhtml\"\r\n  xmlns:o=\"urn:schemas-microsoft-com:office:office\"\r\n  xmlns:v=\"urn:schemas-microsoft-com:vml\"\r\n>\r\n  <head>\r\n    <!--[if gte mso 9\r\n      ]><xml\r\n        ><o:OfficeDocumentSettings\r\n          ><o:AllowPNG /><o:PixelsPerInch\r\n            >96</o:PixelsPerInch\r\n          ></o:OfficeDocumentSettings\r\n        ></xml\r\n      ><!\r\n    [endif]-->\r\n    <meta content=\"text/html; charset=utf-8\" http-equiv=\"Content-Type\" />\r\n    <meta content=\"width=device-width\" name=\"viewport\" />\r\n    <!--[if !mso]><!-->\r\n    <meta content=\"IE=edge\" http-equiv=\"X-UA-Compatible\" />\r\n    <!--<![endif]-->\r\n    <title></title>\r\n    <!--[if !mso]><!-->\r\n    <!--<![endif]-->\r\n    <style type=\"text/css\">\r\n      body {\r\n        margin: 0;\r\n        padding: 0;\r\n      }\r\n\r\n      table,\r\n      td,\r\n      tr {\r\n        vertical-align: top;\r\n        border-collapse: collapse;\r\n      }\r\n\r\n      * {\r\n        line-height: inherit;\r\n      }\r\n\r\n      a[x-apple-data-detectors=\"true\"] {\r\n        color: inherit !important;\r\n        text-decoration: none !important;\r\n      }\r\n    </style>\r\n    <style id=\"media-query\" type=\"text/css\">\r\n      @media (max-width: 520px) {\r\n        .block-grid,\r\n        .col {\r\n          min-width: 320px !important;\r\n          max-width: 100% !important;\r\n          display: block !important;\r\n        }\r\n\r\n        .block-grid {\r\n          width: 100% !important;\r\n        }\r\n\r\n        .col {\r\n          width: 100% !important;\r\n        }\r\n\r\n        .col_cont {\r\n          margin: 0 auto;\r\n        }\r\n\r\n        img.fullwidth,\r\n        img.fullwidthOnMobile {\r\n          max-width: 100% !important;\r\n        }\r\n\r\n        .no-stack .col {\r\n          min-width: 0 !important;\r\n          display: table-cell !important;\r\n        }\r\n\r\n        .no-stack.two-up .col {\r\n          width: 50% !important;\r\n        }\r\n\r\n        .no-stack .col.num2 {\r\n          width: 16.6% !important;\r\n        }\r\n\r\n        .no-stack .col.num3 {\r\n          width: 25% !important;\r\n        }\r\n\r\n        .no-stack .col.num4 {\r\n          width: 33% !important;\r\n        }\r\n\r\n        .no-stack .col.num5 {\r\n          width: 41.6% !important;\r\n        }\r\n\r\n        .no-stack .col.num6 {\r\n          width: 50% !important;\r\n        }\r\n\r\n        .no-stack .col.num7 {\r\n          width: 58.3% !important;\r\n        }\r\n\r\n        .no-stack .col.num8 {\r\n          width: 66.6% !important;\r\n        }\r\n\r\n        .no-stack .col.num9 {\r\n          width: 75% !important;\r\n        }\r\n\r\n        .no-stack .col.num10 {\r\n          width: 83.3% !important;\r\n        }\r\n\r\n        .video-block {\r\n          max-width: none !important;\r\n        }\r\n\r\n        .mobile_hide {\r\n          min-height: 0px;\r\n          max-height: 0px;\r\n          max-width: 0px;\r\n          display: none;\r\n          overflow: hidden;\r\n          font-size: 0px;\r\n        }\r\n\r\n        .desktop_hide {\r\n          display: block !important;\r\n          max-height: none !important;\r\n        }\r\n      }\r\n    </style>\r\n    <style id=\"icon-media-query\" type=\"text/css\">\r\n      @media (max-width: 520px) {\r\n        .icons-inner {\r\n          text-align: center;\r\n        }\r\n\r\n        .icons-inner td {\r\n          margin: 0 auto;\r\n        }\r\n      }\r\n    </style>\r\n  </head>\r\n  <body\r\n    class=\"clean-body\"\r\n    style=\"\r\n      margin: 0;\r\n      padding: 0;\r\n      -webkit-text-size-adjust: 100%;\r\n      background-color: #ffffff;\r\n    \"\r\n  >\r\n    <!--[if IE]><div class=\"ie-browser\"><![endif]-->\r\n    <table\r\n      bgcolor=\"#FFFFFF\"\r\n      cellpadding=\"0\"\r\n      cellspacing=\"0\"\r\n      class=\"nl-container\"\r\n      role=\"presentation\"\r\n      style=\"\r\n        table-layout: fixed;\r\n        vertical-align: top;\r\n        min-width: 320px;\r\n        border-spacing: 0;\r\n        border-collapse: collapse;\r\n        mso-table-lspace: 0pt;\r\n        mso-table-rspace: 0pt;\r\n        background-color: #ffffff;\r\n        width: 100%;\r\n      \"\r\n      valign=\"top\"\r\n      width=\"100%\"\r\n    >\r\n      <tbody>\r\n        <tr style=\"vertical-align: top\" valign=\"top\">\r\n          <td style=\"word-break: break-word; vertical-align: top\" valign=\"top\">\r\n            <!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td align=\"center\" style=\"background-color:#FFFFFF\"><![endif]-->\r\n            <div style=\"background-color: transparent\">\r\n              <div\r\n                class=\"block-grid\"\r\n                style=\"\r\n                  min-width: 320px;\r\n                  max-width: 500px;\r\n                  overflow-wrap: break-word;\r\n                  word-wrap: break-word;\r\n                  word-break: break-word;\r\n                  margin: 0 auto;\r\n                  background-color: transparent;\r\n                \"\r\n              >\r\n                <div\r\n                  style=\"\r\n                    border-collapse: collapse;\r\n                    display: table;\r\n                    width: 100%;\r\n                    background-color: transparent;\r\n                  \"\r\n                >\r\n                  <!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:500px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->\r\n                  <!--[if (mso)|(IE)]><td align=\"center\" width=\"500\" style=\"background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->\r\n                  <div\r\n                    class=\"col num12\"\r\n                    style=\"\r\n                      min-width: 320px;\r\n                      max-width: 500px;\r\n                      display: table-cell;\r\n                      vertical-align: top;\r\n                      width: 500px;\r\n                    \"\r\n                  >\r\n                    <div class=\"col_cont\" style=\"width: 100% !important\">\r\n                      <!--[if (!mso)&(!IE)]><!-->\r\n                      <div\r\n                        style=\"\r\n                          border-top: 0px solid transparent;\r\n                          border-left: 0px solid transparent;\r\n                          border-bottom: 0px solid transparent;\r\n                          border-right: 0px solid transparent;\r\n                          padding-top: 5px;\r\n                          padding-bottom: 5px;\r\n                          padding-right: 0px;\r\n                          padding-left: 0px;\r\n                        \"\r\n                      >\r\n                        <!--<![endif]-->\r\n                        <table\r\n                          cellpadding=\"0\"\r\n                          cellspacing=\"0\"\r\n                          role=\"presentation\"\r\n                          style=\"\r\n                            table-layout: fixed;\r\n                            vertical-align: top;\r\n                            border-spacing: 0;\r\n                            border-collapse: collapse;\r\n                            mso-table-lspace: 0pt;\r\n                            mso-table-rspace: 0pt;\r\n                          \"\r\n                          valign=\"top\"\r\n                          width=\"100%\"\r\n                        >\r\n                          <tr style=\"vertical-align: top\" valign=\"top\">\r\n                            <td\r\n                              align=\"center\"\r\n                              style=\"\r\n                                word-break: break-word;\r\n                                vertical-align: top;\r\n                                padding-bottom: 20px;\r\n                                padding-left: 10px;\r\n                                padding-right: 10px;\r\n                                padding-top: 10px;\r\n                                text-align: center;\r\n                                width: 100%;\r\n                              \"\r\n                              valign=\"top\"\r\n                              width=\"100%\"\r\n                            >\r\n                              <h1\r\n                                style=\"\r\n                                  color: #444445;\r\n                                  direction: ltr;\r\n                                  font-family: 'Helvetica Neue', Helvetica,\r\n                                    Arial, sans-serif;\r\n                                  font-size: 20px;\r\n                                  font-weight: normal;\r\n                                  letter-spacing: normal;\r\n                                  line-height: 120%;\r\n                                  text-align: left;\r\n                                  margin-top: 0;\r\n                                  margin-bottom: 0;\r\n                                \"\r\n                              >\r\n                                <strong>Reset your password</strong>\r\n                              </h1>\r\n                            </td>\r\n                          </tr>\r\n                        </table>\r\n                        <!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif\"><![endif]-->\r\n                        <div\r\n                          style=\"\r\n                            color: #444445;\r\n                            font-family: Arial, Helvetica Neue, Helvetica,\r\n                              sans-serif;\r\n                            line-height: 1.8;\r\n                            padding-top: 10px;\r\n                            padding-right: 10px;\r\n                            padding-bottom: 10px;\r\n                            padding-left: 10px;\r\n                          \"\r\n                        >\r\n                          <div\r\n                            class=\"txtTinyMce-wrapper\"\r\n                            style=\"\r\n                              font-size: 14px;\r\n                              line-height: 1.8;\r\n                              color: #444445;\r\n                              font-family: Arial, Helvetica Neue, Helvetica,\r\n                                sans-serif;\r\n                              mso-line-height-alt: 25px;\r\n                            \"\r\n                          >\r\n                            <p\r\n                              style=\"\r\n                                margin: 0;\r\n                                font-size: 14px;\r\n                                line-height: 1.8;\r\n                                word-break: break-word;\r\n                                mso-line-height-alt: 25px;\r\n                                margin-top: 0;\r\n                                margin-bottom: 0;\r\n                              \"\r\n                            >\r\n                              <span style=\"font-size: 14px\"\r\n                                >We received a request to reset your password.\r\n                                Click the button below to reset your\r\n                                password.</span\r\n                              >\r\n                            </p>\r\n                          </div>\r\n                        </div>\r\n                        <div\r\n                          align=\"center\"\r\n                          class=\"button-container\"\r\n                          style=\"\r\n                            padding-top: 10px;\r\n                            padding-right: 10px;\r\n                            padding-bottom: 10px;\r\n                            padding-left: 10px;\r\n                          \"\r\n                        >\r\n                          <!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\"><tr><td style=\"padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px\" align=\"center\"><v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" target=\"_blank\" href={{validationLink}} style=\"height:31.5pt;width:390pt;v-text-anchor:middle;\" arcsize=\"12%\" stroke=\"false\" fillcolor=\"#2270ee\"><w:anchorlock/><v:textbox inset=\"0,0,0,0\"><center style=\"color:#ffffff; font-family:Arial, sans-serif; font-size:14px\"><!\r\n                          [endif]--><a\r\n                            href=\"{{validationLink}}\"\r\n                            target=\"_blank\"\r\n                            style=\"\r\n                              -webkit-text-size-adjust: none;\r\n                              text-decoration: none;\r\n                              display: block;\r\n                              color: #ffffff;\r\n                              background-color: #2270ee;\r\n                              border-radius: 5px;\r\n                              -webkit-border-radius: 5px;\r\n                              -moz-border-radius: 5px;\r\n                              width: 100%;\r\n                              width: calc(100% - 2px);\r\n                              border-top: 1px solid #2270ee;\r\n                              border-right: 1px solid #2270ee;\r\n                              border-bottom: 1px solid #2270ee;\r\n                              border-left: 1px solid #2270ee;\r\n                              padding-top: 5px;\r\n                              padding-bottom: 5px;\r\n                              font-family: 'Helvetica Neue', Helvetica, Arial,\r\n                                sans-serif;\r\n                              text-align: center;\r\n                              mso-border-alt: none;\r\n                              word-break: keep-all;\r\n                            \"\r\n                            target=\"_blank\"\r\n                            ><span\r\n                              style=\"\r\n                                padding-left: 20px;\r\n                                padding-right: 20px;\r\n                                font-size: 14px;\r\n                                display: inline-block;\r\n                                letter-spacing: undefined;\r\n                              \"\r\n                              ><span\r\n                                style=\"\r\n                                  font-size: 16px;\r\n                                  line-height: 2;\r\n                                  word-break: break-word;\r\n                                  mso-line-height-alt: 32px;\r\n                                \"\r\n                                ><span\r\n                                  style=\"font-size: 14px; line-height: 28px\"\r\n                                  >Reset Password</span\r\n                                ></span\r\n                              ></span\r\n                            ></a\r\n                          >\r\n                          <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->\r\n                        </div>\r\n                        <!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 15px; padding-bottom: 15px; font-family: Arial, sans-serif\"><![endif]-->\r\n                        <div\r\n                          style=\"\r\n                            color: #444445;\r\n                            font-family: Arial, Helvetica Neue, Helvetica,\r\n                              sans-serif;\r\n                            line-height: 1.2;\r\n                            padding-top: 15px;\r\n                            padding-right: 10px;\r\n                            padding-bottom: 15px;\r\n                            padding-left: 10px;\r\n                          \"\r\n                        >\r\n                          <div\r\n                            class=\"txtTinyMce-wrapper\"\r\n                            style=\"\r\n                              font-size: 14px;\r\n                              line-height: 1.2;\r\n                              color: #444445;\r\n                              font-family: Arial, Helvetica Neue, Helvetica,\r\n                                sans-serif;\r\n                              mso-line-height-alt: 17px;\r\n                            \"\r\n                          >\r\n                            <p\r\n                              style=\"\r\n                                margin: 0;\r\n                                font-size: 12px;\r\n                                line-height: 1.2;\r\n                                word-break: break-word;\r\n                                mso-line-height-alt: 14px;\r\n                                margin-top: 0;\r\n                                margin-bottom: 0;\r\n                              \"\r\n                            >\r\n                              <span style=\"font-size: 12px\"\r\n                                >If you didn't request a password reset please\r\n                                ignore this email. Your password will not\r\n                                change.</span\r\n                              >\r\n                            </p>\r\n                          </div>\r\n                        </div>\r\n                        <!--[if mso]></td></tr></table><![endif]-->\r\n                        <!--[if (!mso)&(!IE)]><!-->\r\n                      </div>\r\n                      <!--<![endif]-->\r\n                    </div>\r\n                  </div>\r\n                  <!--[if (mso)|(IE)]></td></tr></table><![endif]-->\r\n                  <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n    <!--[if (IE)]></div><![endif]-->\r\n  </body>\r\n</html>";

const verifyEmailTemplate = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional //EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\r\n\r\n<html\r\n  xmlns=\"http://www.w3.org/1999/xhtml\"\r\n  xmlns:o=\"urn:schemas-microsoft-com:office:office\"\r\n  xmlns:v=\"urn:schemas-microsoft-com:vml\"\r\n>\r\n  <head>\r\n    <!--[if gte mso 9\r\n      ]><xml\r\n        ><o:OfficeDocumentSettings\r\n          ><o:AllowPNG /><o:PixelsPerInch\r\n            >96</o:PixelsPerInch\r\n          ></o:OfficeDocumentSettings\r\n        ></xml\r\n      ><!\r\n    [endif]-->\r\n    <meta content=\"text/html; charset=utf-8\" http-equiv=\"Content-Type\" />\r\n    <meta content=\"width=device-width\" name=\"viewport\" />\r\n    <!--[if !mso]><!-->\r\n    <meta content=\"IE=edge\" http-equiv=\"X-UA-Compatible\" />\r\n    <!--<![endif]-->\r\n    <title></title>\r\n    <!--[if !mso]><!-->\r\n    <!--<![endif]-->\r\n    <style type=\"text/css\">\r\n      body {\r\n        margin: 0;\r\n        padding: 0;\r\n      }\r\n\r\n      table,\r\n      td,\r\n      tr {\r\n        vertical-align: top;\r\n        border-collapse: collapse;\r\n      }\r\n\r\n      * {\r\n        line-height: inherit;\r\n      }\r\n\r\n      a[x-apple-data-detectors=\"true\"] {\r\n        color: inherit !important;\r\n        text-decoration: none !important;\r\n      }\r\n    </style>\r\n    <style id=\"media-query\" type=\"text/css\">\r\n      @media (max-width: 520px) {\r\n        .block-grid,\r\n        .col {\r\n          min-width: 320px !important;\r\n          max-width: 100% !important;\r\n          display: block !important;\r\n        }\r\n\r\n        .block-grid {\r\n          width: 100% !important;\r\n        }\r\n\r\n        .col {\r\n          width: 100% !important;\r\n        }\r\n\r\n        .col_cont {\r\n          margin: 0 auto;\r\n        }\r\n\r\n        img.fullwidth,\r\n        img.fullwidthOnMobile {\r\n          max-width: 100% !important;\r\n        }\r\n\r\n        .no-stack .col {\r\n          min-width: 0 !important;\r\n          display: table-cell !important;\r\n        }\r\n\r\n        .no-stack.two-up .col {\r\n          width: 50% !important;\r\n        }\r\n\r\n        .no-stack .col.num2 {\r\n          width: 16.6% !important;\r\n        }\r\n\r\n        .no-stack .col.num3 {\r\n          width: 25% !important;\r\n        }\r\n\r\n        .no-stack .col.num4 {\r\n          width: 33% !important;\r\n        }\r\n\r\n        .no-stack .col.num5 {\r\n          width: 41.6% !important;\r\n        }\r\n\r\n        .no-stack .col.num6 {\r\n          width: 50% !important;\r\n        }\r\n\r\n        .no-stack .col.num7 {\r\n          width: 58.3% !important;\r\n        }\r\n\r\n        .no-stack .col.num8 {\r\n          width: 66.6% !important;\r\n        }\r\n\r\n        .no-stack .col.num9 {\r\n          width: 75% !important;\r\n        }\r\n\r\n        .no-stack .col.num10 {\r\n          width: 83.3% !important;\r\n        }\r\n\r\n        .video-block {\r\n          max-width: none !important;\r\n        }\r\n\r\n        .mobile_hide {\r\n          min-height: 0px;\r\n          max-height: 0px;\r\n          max-width: 0px;\r\n          display: none;\r\n          overflow: hidden;\r\n          font-size: 0px;\r\n        }\r\n\r\n        .desktop_hide {\r\n          display: block !important;\r\n          max-height: none !important;\r\n        }\r\n      }\r\n    </style>\r\n    <style id=\"icon-media-query\" type=\"text/css\">\r\n      @media (max-width: 520px) {\r\n        .icons-inner {\r\n          text-align: center;\r\n        }\r\n\r\n        .icons-inner td {\r\n          margin: 0 auto;\r\n        }\r\n      }\r\n    </style>\r\n  </head>\r\n  <body\r\n    class=\"clean-body\"\r\n    style=\"\r\n      margin: 0;\r\n      padding: 0;\r\n      -webkit-text-size-adjust: 100%;\r\n      background-color: #ffffff;\r\n    \"\r\n  >\r\n    <!--[if IE]><div class=\"ie-browser\"><![endif]-->\r\n    <table\r\n      bgcolor=\"#FFFFFF\"\r\n      cellpadding=\"0\"\r\n      cellspacing=\"0\"\r\n      class=\"nl-container\"\r\n      role=\"presentation\"\r\n      style=\"\r\n        table-layout: fixed;\r\n        vertical-align: top;\r\n        min-width: 320px;\r\n        border-spacing: 0;\r\n        border-collapse: collapse;\r\n        mso-table-lspace: 0pt;\r\n        mso-table-rspace: 0pt;\r\n        background-color: #ffffff;\r\n        width: 100%;\r\n      \"\r\n      valign=\"top\"\r\n      width=\"100%\"\r\n    >\r\n      <tbody>\r\n        <tr style=\"vertical-align: top\" valign=\"top\">\r\n          <td style=\"word-break: break-word; vertical-align: top\" valign=\"top\">\r\n            <!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td align=\"center\" style=\"background-color:#FFFFFF\"><![endif]-->\r\n            <div style=\"background-color: transparent\">\r\n              <div\r\n                class=\"block-grid\"\r\n                style=\"\r\n                  min-width: 320px;\r\n                  max-width: 500px;\r\n                  overflow-wrap: break-word;\r\n                  word-wrap: break-word;\r\n                  word-break: break-word;\r\n                  margin: 0 auto;\r\n                  background-color: transparent;\r\n                \"\r\n              >\r\n                <div\r\n                  style=\"\r\n                    border-collapse: collapse;\r\n                    display: table;\r\n                    width: 100%;\r\n                    background-color: transparent;\r\n                  \"\r\n                >\r\n                  <!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:500px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->\r\n                  <!--[if (mso)|(IE)]><td align=\"center\" width=\"500\" style=\"background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->\r\n                  <div\r\n                    class=\"col num12\"\r\n                    style=\"\r\n                      min-width: 320px;\r\n                      max-width: 500px;\r\n                      display: table-cell;\r\n                      vertical-align: top;\r\n                      width: 500px;\r\n                    \"\r\n                  >\r\n                    <div class=\"col_cont\" style=\"width: 100% !important\">\r\n                      <!--[if (!mso)&(!IE)]><!-->\r\n                      <div\r\n                        style=\"\r\n                          border-top: 0px solid transparent;\r\n                          border-left: 0px solid transparent;\r\n                          border-bottom: 0px solid transparent;\r\n                          border-right: 0px solid transparent;\r\n                          padding-top: 5px;\r\n                          padding-bottom: 5px;\r\n                          padding-right: 0px;\r\n                          padding-left: 0px;\r\n                        \"\r\n                      >\r\n                        <!--<![endif]-->\r\n                        <table\r\n                          cellpadding=\"0\"\r\n                          cellspacing=\"0\"\r\n                          role=\"presentation\"\r\n                          style=\"\r\n                            table-layout: fixed;\r\n                            vertical-align: top;\r\n                            border-spacing: 0;\r\n                            border-collapse: collapse;\r\n                            mso-table-lspace: 0pt;\r\n                            mso-table-rspace: 0pt;\r\n                          \"\r\n                          valign=\"top\"\r\n                          width=\"100%\"\r\n                        >\r\n                          <tr style=\"vertical-align: top\" valign=\"top\">\r\n                            <td\r\n                              align=\"center\"\r\n                              style=\"\r\n                                word-break: break-word;\r\n                                vertical-align: top;\r\n                                padding-bottom: 20px;\r\n                                padding-left: 10px;\r\n                                padding-right: 10px;\r\n                                padding-top: 10px;\r\n                                text-align: center;\r\n                                width: 100%;\r\n                              \"\r\n                              valign=\"top\"\r\n                              width=\"100%\"\r\n                            >\r\n                              <h1\r\n                                style=\"\r\n                                  color: #444445;\r\n                                  direction: ltr;\r\n                                  font-family: 'Helvetica Neue', Helvetica,\r\n                                    Arial, sans-serif;\r\n                                  font-size: 20px;\r\n                                  font-weight: normal;\r\n                                  letter-spacing: normal;\r\n                                  line-height: 120%;\r\n                                  text-align: left;\r\n                                  margin-top: 0;\r\n                                  margin-bottom: 0;\r\n                                \"\r\n                              >\r\n                                <strong>Verify your email address</strong>\r\n                              </h1>\r\n                            </td>\r\n                          </tr>\r\n                        </table>\r\n                        <!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif\"><![endif]-->\r\n                        <div\r\n                          style=\"\r\n                            color: #444445;\r\n                            font-family: Arial, Helvetica Neue, Helvetica,\r\n                              sans-serif;\r\n                            line-height: 1.8;\r\n                            padding-top: 10px;\r\n                            padding-right: 10px;\r\n                            padding-bottom: 10px;\r\n                            padding-left: 10px;\r\n                          \"\r\n                        >\r\n                          <div\r\n                            class=\"txtTinyMce-wrapper\"\r\n                            style=\"\r\n                              font-size: 14px;\r\n                              line-height: 1.8;\r\n                              color: #444445;\r\n                              font-family: Arial, Helvetica Neue, Helvetica,\r\n                                sans-serif;\r\n                              mso-line-height-alt: 25px;\r\n                            \"\r\n                          >\r\n                            <p\r\n                              style=\"\r\n                                margin: 0;\r\n                                font-size: 14px;\r\n                                line-height: 1.8;\r\n                                word-break: break-word;\r\n                                mso-line-height-alt: 25px;\r\n                                margin-top: 0;\r\n                                margin-bottom: 0;\r\n                              \"\r\n                            >\r\n                              <span style=\"font-size: 14px\"\r\n                                >Thank you for signing up! Please click the button below\r\n                                to verify your email address.</span\r\n                              >\r\n                            </p>\r\n                          </div>\r\n                        </div>\r\n                        <!--[if mso]></td></tr></table><![endif]-->\r\n                        <div\r\n                          align=\"center\"\r\n                          class=\"button-container\"\r\n                          style=\"\r\n                            padding-top: 10px;\r\n                            padding-right: 10px;\r\n                            padding-bottom: 10px;\r\n                            padding-left: 10px;\r\n                          \"\r\n                        >\r\n                          <!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\"><tr><td style=\"padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px\" align=\"center\"><v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" target=\"_blank\" href={{validationLink}} style=\"height:31.5pt;width:390pt;v-text-anchor:middle;\" arcsize=\"12%\" stroke=\"false\" fillcolor=\"#2270ee\"><w:anchorlock/><v:textbox inset=\"0,0,0,0\"><center style=\"color:#ffffff; font-family:Arial, sans-serif; font-size:14px\"><!\r\n                          [endif]--><a\r\n                            href={{validationLink}}\r\n\t\t\t\t\t\t\ttarget=\"_blank\"\r\n                            style=\"\r\n                              -webkit-text-size-adjust: none;\r\n                              text-decoration: none;\r\n                              display: block;\r\n                              color: #ffffff;\r\n                              background-color: #2270ee;\r\n                              border-radius: 5px;\r\n                              -webkit-border-radius: 5px;\r\n                              -moz-border-radius: 5px;\r\n                              width: 100%;\r\n                              width: calc(100% - 2px);\r\n                              border-top: 1px solid #2270ee;\r\n                              border-right: 1px solid #2270ee;\r\n                              border-bottom: 1px solid #2270ee;\r\n                              border-left: 1px solid #2270ee;\r\n                              padding-top: 5px;\r\n                              padding-bottom: 5px;\r\n                              font-family: 'Helvetica Neue', Helvetica, Arial,\r\n                                sans-serif;\r\n                              text-align: center;\r\n                              mso-border-alt: none;\r\n                              word-break: keep-all;\r\n                            \"\r\n                            target=\"_blank\"\r\n                            ><span\r\n                              style=\"\r\n                                padding-left: 20px;\r\n                                padding-right: 20px;\r\n                                font-size: 14px;\r\n                                display: inline-block;\r\n                                letter-spacing: undefined;\r\n                              \"\r\n                              ><span\r\n                                style=\"\r\n                                  font-size: 16px;\r\n                                  line-height: 2;\r\n                                  word-break: break-word;\r\n                                  mso-line-height-alt: 32px;\r\n                                \"\r\n                                ><span\r\n                                  style=\"font-size: 14px; line-height: 28px\"\r\n                                  >Verify Email</span\r\n                                ></span\r\n                              ></span\r\n                            ></a\r\n                          >\r\n                          <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->\r\n                        </div>\r\n                      <!--<![endif]-->\r\n                    </div>\r\n                  </div>\r\n                  <!--[if (mso)|(IE)]></td></tr></table><![endif]-->\r\n                  <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n    <!--[if (IE)]></div><![endif]-->\r\n  </body>\r\n</html>";

const loginTemplate = "<sqm-hero background=\"https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80\">\r\n  <sqm-portal-login></sqm-portal-login>\r\n</sqm-hero>\r\n";

const registerTemplate = "<sqm-hero\r\n  background=\"https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80\"\r\n>\r\n  <sqm-portal-register>\r\n    <sqm-name-fields slot=\"formData\"></sqm-name-fields>\r\n  </sqm-portal-register>\r\n</sqm-hero>\r\n";

const forgotPasswordTemplate = "<sqm-hero background=\"https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80\">\r\n  <sqm-portal-forgot-password\r\n    email-label=\"Business Email\"\r\n  ></sqm-portal-forgot-password>\r\n</sqm-hero>\r\n";

const resetPasswordTemplate = "<sqm-portal-reset-password confirm-password=\"true\"></sqm-portal-reset-password>\r\n";

const emailVerifiedTemplate = "<sqm-portal-verify-email></sqm-portal-verify-email>\r\n";

const emailVerificationTemplate = "<sqm-portal-protected-route redirect-to=\"/login\"></sqm-portal-protected-route>\r\n<sqm-portal-email-verification></sqm-portal-email-verification>\r\n";

var marked = createCommonjsModule(function (module, exports) {
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2021, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */

/**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */

(function (global, factory) {
  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory() :
  typeof undefined === 'function' && undefined.amd ? undefined(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.marked = factory());
}(commonjsGlobal, (function () { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);

    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var defaults$5 = {exports: {}};

  function getDefaults$1() {
    return {
      baseUrl: null,
      breaks: false,
      extensions: null,
      gfm: true,
      headerIds: true,
      headerPrefix: '',
      highlight: null,
      langPrefix: 'language-',
      mangle: true,
      pedantic: false,
      renderer: null,
      sanitize: false,
      sanitizer: null,
      silent: false,
      smartLists: false,
      smartypants: false,
      tokenizer: null,
      walkTokens: null,
      xhtml: false
    };
  }

  function changeDefaults$1(newDefaults) {
    defaults$5.exports.defaults = newDefaults;
  }

  defaults$5.exports = {
    defaults: getDefaults$1(),
    getDefaults: getDefaults$1,
    changeDefaults: changeDefaults$1
  };

  /**
   * Helpers
   */
  var escapeTest = /[&<>"']/;
  var escapeReplace = /[&<>"']/g;
  var escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
  var escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
  var escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  var getEscapeReplacement = function getEscapeReplacement(ch) {
    return escapeReplacements[ch];
  };

  function escape$2(html, encode) {
    if (encode) {
      if (escapeTest.test(html)) {
        return html.replace(escapeReplace, getEscapeReplacement);
      }
    } else {
      if (escapeTestNoEncode.test(html)) {
        return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
      }
    }

    return html;
  }

  var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

  function unescape$1(html) {
    // explicitly match decimal, hex, and named HTML entities
    return html.replace(unescapeTest, function (_, n) {
      n = n.toLowerCase();
      if (n === 'colon') return ':';

      if (n.charAt(0) === '#') {
        return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
      }

      return '';
    });
  }

  var caret = /(^|[^\[])\^/g;

  function edit$1(regex, opt) {
    regex = regex.source || regex;
    opt = opt || '';
    var obj = {
      replace: function replace(name, val) {
        val = val.source || val;
        val = val.replace(caret, '$1');
        regex = regex.replace(name, val);
        return obj;
      },
      getRegex: function getRegex() {
        return new RegExp(regex, opt);
      }
    };
    return obj;
  }

  var nonWordAndColonTest = /[^\w:]/g;
  var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

  function cleanUrl$1(sanitize, base, href) {
    if (sanitize) {
      var prot;

      try {
        prot = decodeURIComponent(unescape$1(href)).replace(nonWordAndColonTest, '').toLowerCase();
      } catch (e) {
        return null;
      }

      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
        return null;
      }
    }

    if (base && !originIndependentUrl.test(href)) {
      href = resolveUrl(base, href);
    }

    try {
      href = encodeURI(href).replace(/%25/g, '%');
    } catch (e) {
      return null;
    }

    return href;
  }

  var baseUrls = {};
  var justDomain = /^[^:]+:\/*[^/]*$/;
  var protocol = /^([^:]+:)[\s\S]*$/;
  var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

  function resolveUrl(base, href) {
    if (!baseUrls[' ' + base]) {
      // we can ignore everything in base after the last slash of its path component,
      // but we might need to add _that_
      // https://tools.ietf.org/html/rfc3986#section-3
      if (justDomain.test(base)) {
        baseUrls[' ' + base] = base + '/';
      } else {
        baseUrls[' ' + base] = rtrim$1(base, '/', true);
      }
    }

    base = baseUrls[' ' + base];
    var relativeBase = base.indexOf(':') === -1;

    if (href.substring(0, 2) === '//') {
      if (relativeBase) {
        return href;
      }

      return base.replace(protocol, '$1') + href;
    } else if (href.charAt(0) === '/') {
      if (relativeBase) {
        return href;
      }

      return base.replace(domain, '$1') + href;
    } else {
      return base + href;
    }
  }

  var noopTest$1 = {
    exec: function noopTest() {}
  };

  function merge$2(obj) {
    var i = 1,
        target,
        key;

    for (; i < arguments.length; i++) {
      target = arguments[i];

      for (key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          obj[key] = target[key];
        }
      }
    }

    return obj;
  }

  function splitCells$1(tableRow, count) {
    // ensure that every cell-delimiting pipe has a space
    // before it to distinguish it from an escaped pipe
    var row = tableRow.replace(/\|/g, function (match, offset, str) {
      var escaped = false,
          curr = offset;

      while (--curr >= 0 && str[curr] === '\\') {
        escaped = !escaped;
      }

      if (escaped) {
        // odd number of slashes means | is escaped
        // so we leave it alone
        return '|';
      } else {
        // add space before unescaped |
        return ' |';
      }
    }),
        cells = row.split(/ \|/);
    var i = 0; // First/last cell in a row cannot be empty if it has no leading/trailing pipe

    if (!cells[0].trim()) {
      cells.shift();
    }

    if (!cells[cells.length - 1].trim()) {
      cells.pop();
    }

    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count) {
        cells.push('');
      }
    }

    for (; i < cells.length; i++) {
      // leading or trailing whitespace is ignored per the gfm spec
      cells[i] = cells[i].trim().replace(/\\\|/g, '|');
    }

    return cells;
  } // Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
  // /c*$/ is vulnerable to REDOS.
  // invert: Remove suffix of non-c chars instead. Default falsey.


  function rtrim$1(str, c, invert) {
    var l = str.length;

    if (l === 0) {
      return '';
    } // Length of suffix matching the invert condition.


    var suffLen = 0; // Step left until we fail to match the invert condition.

    while (suffLen < l) {
      var currChar = str.charAt(l - suffLen - 1);

      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }

    return str.substr(0, l - suffLen);
  }

  function findClosingBracket$1(str, b) {
    if (str.indexOf(b[1]) === -1) {
      return -1;
    }

    var l = str.length;
    var level = 0,
        i = 0;

    for (; i < l; i++) {
      if (str[i] === '\\') {
        i++;
      } else if (str[i] === b[0]) {
        level++;
      } else if (str[i] === b[1]) {
        level--;

        if (level < 0) {
          return i;
        }
      }
    }

    return -1;
  }

  function checkSanitizeDeprecation$1(opt) {
    if (opt && opt.sanitize && !opt.silent) {
      console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
    }
  } // copied from https://stackoverflow.com/a/5450113/806777


  function repeatString$1(pattern, count) {
    if (count < 1) {
      return '';
    }

    var result = '';

    while (count > 1) {
      if (count & 1) {
        result += pattern;
      }

      count >>= 1;
      pattern += pattern;
    }

    return result + pattern;
  }

  var helpers = {
    escape: escape$2,
    unescape: unescape$1,
    edit: edit$1,
    cleanUrl: cleanUrl$1,
    resolveUrl: resolveUrl,
    noopTest: noopTest$1,
    merge: merge$2,
    splitCells: splitCells$1,
    rtrim: rtrim$1,
    findClosingBracket: findClosingBracket$1,
    checkSanitizeDeprecation: checkSanitizeDeprecation$1,
    repeatString: repeatString$1
  };

  var defaults$4 = defaults$5.exports.defaults;
  var rtrim = helpers.rtrim,
      splitCells = helpers.splitCells,
      _escape = helpers.escape,
      findClosingBracket = helpers.findClosingBracket;

  function outputLink(cap, link, raw, lexer) {
    var href = link.href;
    var title = link.title ? _escape(link.title) : null;
    var text = cap[1].replace(/\\([\[\]])/g, '$1');

    if (cap[0].charAt(0) !== '!') {
      lexer.state.inLink = true;
      var token = {
        type: 'link',
        raw: raw,
        href: href,
        title: title,
        text: text,
        tokens: lexer.inlineTokens(text, [])
      };
      lexer.state.inLink = false;
      return token;
    } else {
      return {
        type: 'image',
        raw: raw,
        href: href,
        title: title,
        text: _escape(text)
      };
    }
  }

  function indentCodeCompensation(raw, text) {
    var matchIndentToCode = raw.match(/^(\s+)(?:```)/);

    if (matchIndentToCode === null) {
      return text;
    }

    var indentToCode = matchIndentToCode[1];
    return text.split('\n').map(function (node) {
      var matchIndentInNode = node.match(/^\s+/);

      if (matchIndentInNode === null) {
        return node;
      }

      var indentInNode = matchIndentInNode[0];

      if (indentInNode.length >= indentToCode.length) {
        return node.slice(indentToCode.length);
      }

      return node;
    }).join('\n');
  }
  /**
   * Tokenizer
   */


  var Tokenizer_1 = /*#__PURE__*/function () {
    function Tokenizer(options) {
      this.options = options || defaults$4;
    }

    var _proto = Tokenizer.prototype;

    _proto.space = function space(src) {
      var cap = this.rules.block.newline.exec(src);

      if (cap) {
        if (cap[0].length > 1) {
          return {
            type: 'space',
            raw: cap[0]
          };
        }

        return {
          raw: '\n'
        };
      }
    };

    _proto.code = function code(src) {
      var cap = this.rules.block.code.exec(src);

      if (cap) {
        var text = cap[0].replace(/^ {1,4}/gm, '');
        return {
          type: 'code',
          raw: cap[0],
          codeBlockStyle: 'indented',
          text: !this.options.pedantic ? rtrim(text, '\n') : text
        };
      }
    };

    _proto.fences = function fences(src) {
      var cap = this.rules.block.fences.exec(src);

      if (cap) {
        var raw = cap[0];
        var text = indentCodeCompensation(raw, cap[3] || '');
        return {
          type: 'code',
          raw: raw,
          lang: cap[2] ? cap[2].trim() : cap[2],
          text: text
        };
      }
    };

    _proto.heading = function heading(src) {
      var cap = this.rules.block.heading.exec(src);

      if (cap) {
        var text = cap[2].trim(); // remove trailing #s

        if (/#$/.test(text)) {
          var trimmed = rtrim(text, '#');

          if (this.options.pedantic) {
            text = trimmed.trim();
          } else if (!trimmed || / $/.test(trimmed)) {
            // CommonMark requires space before trailing #s
            text = trimmed.trim();
          }
        }

        var token = {
          type: 'heading',
          raw: cap[0],
          depth: cap[1].length,
          text: text,
          tokens: []
        };
        this.lexer.inline(token.text, token.tokens);
        return token;
      }
    };

    _proto.hr = function hr(src) {
      var cap = this.rules.block.hr.exec(src);

      if (cap) {
        return {
          type: 'hr',
          raw: cap[0]
        };
      }
    };

    _proto.blockquote = function blockquote(src) {
      var cap = this.rules.block.blockquote.exec(src);

      if (cap) {
        var text = cap[0].replace(/^ *> ?/gm, '');
        return {
          type: 'blockquote',
          raw: cap[0],
          tokens: this.lexer.blockTokens(text, []),
          text: text
        };
      }
    };

    _proto.list = function list(src) {
      var cap = this.rules.block.list.exec(src);

      if (cap) {
        var raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine, line, lines, itemContents;
        var bull = cap[1].trim();
        var isordered = bull.length > 1;
        var list = {
          type: 'list',
          raw: '',
          ordered: isordered,
          start: isordered ? +bull.slice(0, -1) : '',
          loose: false,
          items: []
        };
        bull = isordered ? "\\d{1,9}\\" + bull.slice(-1) : "\\" + bull;

        if (this.options.pedantic) {
          bull = isordered ? bull : '[*+-]';
        } // Get next list item


        var itemRegex = new RegExp("^( {0,3}" + bull + ")((?: [^\\n]*| *)(?:\\n[^\\n]*)*(?:\\n|$))"); // Get each top-level item

        while (src) {
          if (this.rules.block.hr.test(src)) {
            // End list if we encounter an HR (possibly move into itemRegex?)
            break;
          }

          if (!(cap = itemRegex.exec(src))) {
            break;
          }

          lines = cap[2].split('\n');

          if (this.options.pedantic) {
            indent = 2;
            itemContents = lines[0].trimLeft();
          } else {
            indent = cap[2].search(/[^ ]/); // Find first non-space char

            indent = cap[1].length + (indent > 4 ? 1 : indent); // intented code blocks after 4 spaces; indent is always 1

            itemContents = lines[0].slice(indent - cap[1].length);
          }

          blankLine = false;
          raw = cap[0];

          if (!lines[0] && /^ *$/.test(lines[1])) {
            // items begin with at most one blank line
            raw = cap[1] + lines.slice(0, 2).join('\n') + '\n';
            list.loose = true;
            lines = [];
          }

          var nextBulletRegex = new RegExp("^ {0," + Math.min(3, indent - 1) + "}(?:[*+-]|\\d{1,9}[.)])");

          for (i = 1; i < lines.length; i++) {
            line = lines[i];

            if (this.options.pedantic) {
              // Re-align to follow commonmark nesting rules
              line = line.replace(/^ {1,4}(?=( {4})*[^ ])/g, '  ');
            } // End list item if found start of new bullet


            if (nextBulletRegex.test(line)) {
              raw = cap[1] + lines.slice(0, i).join('\n') + '\n';
              break;
            } // Until we encounter a blank line, item contents do not need indentation


            if (!blankLine) {
              if (!line.trim()) {
                // Check if current line is empty
                blankLine = true;
              } // Dedent if possible


              if (line.search(/[^ ]/) >= indent) {
                itemContents += '\n' + line.slice(indent);
              } else {
                itemContents += '\n' + line;
              }

              continue;
            } // Dedent this line


            if (line.search(/[^ ]/) >= indent || !line.trim()) {
              itemContents += '\n' + line.slice(indent);
              continue;
            } else {
              // Line was not properly indented; end of this item
              raw = cap[1] + lines.slice(0, i).join('\n') + '\n';
              break;
            }
          }

          if (!list.loose) {
            // If the previous item ended with a blank line, the list is loose
            if (endsWithBlankLine) {
              list.loose = true;
            } else if (/\n *\n *$/.test(raw)) {
              endsWithBlankLine = true;
            }
          } // Check for task list items


          if (this.options.gfm) {
            istask = /^\[[ xX]\] /.exec(itemContents);

            if (istask) {
              ischecked = istask[0] !== '[ ] ';
              itemContents = itemContents.replace(/^\[[ xX]\] +/, '');
            }
          }

          list.items.push({
            type: 'list_item',
            raw: raw,
            task: !!istask,
            checked: ischecked,
            loose: false,
            text: itemContents
          });
          list.raw += raw;
          src = src.slice(raw.length);
        } // Do not consume newlines at end of final item. Alternatively, make itemRegex *start* with any newlines to simplify/speed up endsWithBlankLine logic


        list.items[list.items.length - 1].raw = raw.trimRight();
        list.items[list.items.length - 1].text = itemContents.trimRight();
        list.raw = list.raw.trimRight();
        var l = list.items.length; // Item child tokens handled here at end because we needed to have the final item to trim it first

        for (i = 0; i < l; i++) {
          this.lexer.state.top = false;
          list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);

          if (list.items[i].tokens.some(function (t) {
            return t.type === 'space';
          })) {
            list.loose = true;
            list.items[i].loose = true;
          }
        }

        return list;
      }
    };

    _proto.html = function html(src) {
      var cap = this.rules.block.html.exec(src);

      if (cap) {
        var token = {
          type: 'html',
          raw: cap[0],
          pre: !this.options.sanitizer && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
          text: cap[0]
        };

        if (this.options.sanitize) {
          token.type = 'paragraph';
          token.text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]);
          token.tokens = [];
          this.lexer.inline(token.text, token.tokens);
        }

        return token;
      }
    };

    _proto.def = function def(src) {
      var cap = this.rules.block.def.exec(src);

      if (cap) {
        if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
        var tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
        return {
          type: 'def',
          tag: tag,
          raw: cap[0],
          href: cap[2],
          title: cap[3]
        };
      }
    };

    _proto.table = function table(src) {
      var cap = this.rules.block.table.exec(src);

      if (cap) {
        var item = {
          type: 'table',
          header: splitCells(cap[1]).map(function (c) {
            return {
              text: c
            };
          }),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          rows: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
        };

        if (item.header.length === item.align.length) {
          item.raw = cap[0];
          var l = item.align.length;
          var i, j, k, row;

          for (i = 0; i < l; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }

          l = item.rows.length;

          for (i = 0; i < l; i++) {
            item.rows[i] = splitCells(item.rows[i], item.header.length).map(function (c) {
              return {
                text: c
              };
            });
          } // parse child tokens inside headers and cells
          // header child tokens


          l = item.header.length;

          for (j = 0; j < l; j++) {
            item.header[j].tokens = [];
            this.lexer.inlineTokens(item.header[j].text, item.header[j].tokens);
          } // cell child tokens


          l = item.rows.length;

          for (j = 0; j < l; j++) {
            row = item.rows[j];

            for (k = 0; k < row.length; k++) {
              row[k].tokens = [];
              this.lexer.inlineTokens(row[k].text, row[k].tokens);
            }
          }

          return item;
        }
      }
    };

    _proto.lheading = function lheading(src) {
      var cap = this.rules.block.lheading.exec(src);

      if (cap) {
        var token = {
          type: 'heading',
          raw: cap[0],
          depth: cap[2].charAt(0) === '=' ? 1 : 2,
          text: cap[1],
          tokens: []
        };
        this.lexer.inline(token.text, token.tokens);
        return token;
      }
    };

    _proto.paragraph = function paragraph(src) {
      var cap = this.rules.block.paragraph.exec(src);

      if (cap) {
        var token = {
          type: 'paragraph',
          raw: cap[0],
          text: cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1],
          tokens: []
        };
        this.lexer.inline(token.text, token.tokens);
        return token;
      }
    };

    _proto.text = function text(src) {
      var cap = this.rules.block.text.exec(src);

      if (cap) {
        var token = {
          type: 'text',
          raw: cap[0],
          text: cap[0],
          tokens: []
        };
        this.lexer.inline(token.text, token.tokens);
        return token;
      }
    };

    _proto.escape = function escape(src) {
      var cap = this.rules.inline.escape.exec(src);

      if (cap) {
        return {
          type: 'escape',
          raw: cap[0],
          text: _escape(cap[1])
        };
      }
    };

    _proto.tag = function tag(src) {
      var cap = this.rules.inline.tag.exec(src);

      if (cap) {
        if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
          this.lexer.state.inLink = true;
        } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
          this.lexer.state.inLink = false;
        }

        if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.lexer.state.inRawBlock = true;
        } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.lexer.state.inRawBlock = false;
        }

        return {
          type: this.options.sanitize ? 'text' : 'html',
          raw: cap[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0]
        };
      }
    };

    _proto.link = function link(src) {
      var cap = this.rules.inline.link.exec(src);

      if (cap) {
        var trimmedUrl = cap[2].trim();

        if (!this.options.pedantic && /^</.test(trimmedUrl)) {
          // commonmark requires matching angle brackets
          if (!/>$/.test(trimmedUrl)) {
            return;
          } // ending angle bracket cannot be escaped


          var rtrimSlash = rtrim(trimmedUrl.slice(0, -1), '\\');

          if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
            return;
          }
        } else {
          // find closing parenthesis
          var lastParenIndex = findClosingBracket(cap[2], '()');

          if (lastParenIndex > -1) {
            var start = cap[0].indexOf('!') === 0 ? 5 : 4;
            var linkLen = start + cap[1].length + lastParenIndex;
            cap[2] = cap[2].substring(0, lastParenIndex);
            cap[0] = cap[0].substring(0, linkLen).trim();
            cap[3] = '';
          }
        }

        var href = cap[2];
        var title = '';

        if (this.options.pedantic) {
          // split pedantic href and title
          var link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

          if (link) {
            href = link[1];
            title = link[3];
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : '';
        }

        href = href.trim();

        if (/^</.test(href)) {
          if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
            // pedantic allows starting angle bracket without ending angle bracket
            href = href.slice(1);
          } else {
            href = href.slice(1, -1);
          }
        }

        return outputLink(cap, {
          href: href ? href.replace(this.rules.inline._escapes, '$1') : href,
          title: title ? title.replace(this.rules.inline._escapes, '$1') : title
        }, cap[0], this.lexer);
      }
    };

    _proto.reflink = function reflink(src, links) {
      var cap;

      if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
        var link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
        link = links[link.toLowerCase()];

        if (!link || !link.href) {
          var text = cap[0].charAt(0);
          return {
            type: 'text',
            raw: text,
            text: text
          };
        }

        return outputLink(cap, link, cap[0], this.lexer);
      }
    };

    _proto.emStrong = function emStrong(src, maskedSrc, prevChar) {
      if (prevChar === void 0) {
        prevChar = '';
      }

      var match = this.rules.inline.emStrong.lDelim.exec(src);
      if (!match) return; // _ can't be between two alphanumerics. \p{L}\p{N} includes non-english alphabet/numbers as well

      if (match[3] && prevChar.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/)) return;
      var nextChar = match[1] || match[2] || '';

      if (!nextChar || nextChar && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar))) {
        var lLength = match[0].length - 1;
        var rDelim,
            rLength,
            delimTotal = lLength,
            midDelimTotal = 0;
        var endReg = match[0][0] === '*' ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
        endReg.lastIndex = 0; // Clip maskedSrc to same section of string as src (move to lexer?)

        maskedSrc = maskedSrc.slice(-1 * src.length + lLength);

        while ((match = endReg.exec(maskedSrc)) != null) {
          rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
          if (!rDelim) continue; // skip single * in __abc*abc__

          rLength = rDelim.length;

          if (match[3] || match[4]) {
            // found another Left Delim
            delimTotal += rLength;
            continue;
          } else if (match[5] || match[6]) {
            // either Left or Right Delim
            if (lLength % 3 && !((lLength + rLength) % 3)) {
              midDelimTotal += rLength;
              continue; // CommonMark Emphasis Rules 9-10
            }
          }

          delimTotal -= rLength;
          if (delimTotal > 0) continue; // Haven't found enough closing delimiters
          // Remove extra characters. *a*** -> *a*

          rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal); // Create `em` if smallest delimiter has odd char count. *a***

          if (Math.min(lLength, rLength) % 2) {
            var _text = src.slice(1, lLength + match.index + rLength);

            return {
              type: 'em',
              raw: src.slice(0, lLength + match.index + rLength + 1),
              text: _text,
              tokens: this.lexer.inlineTokens(_text, [])
            };
          } // Create 'strong' if smallest delimiter has even char count. **a***


          var text = src.slice(2, lLength + match.index + rLength - 1);
          return {
            type: 'strong',
            raw: src.slice(0, lLength + match.index + rLength + 1),
            text: text,
            tokens: this.lexer.inlineTokens(text, [])
          };
        }
      }
    };

    _proto.codespan = function codespan(src) {
      var cap = this.rules.inline.code.exec(src);

      if (cap) {
        var text = cap[2].replace(/\n/g, ' ');
        var hasNonSpaceChars = /[^ ]/.test(text);
        var hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);

        if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
          text = text.substring(1, text.length - 1);
        }

        text = _escape(text, true);
        return {
          type: 'codespan',
          raw: cap[0],
          text: text
        };
      }
    };

    _proto.br = function br(src) {
      var cap = this.rules.inline.br.exec(src);

      if (cap) {
        return {
          type: 'br',
          raw: cap[0]
        };
      }
    };

    _proto.del = function del(src) {
      var cap = this.rules.inline.del.exec(src);

      if (cap) {
        return {
          type: 'del',
          raw: cap[0],
          text: cap[2],
          tokens: this.lexer.inlineTokens(cap[2], [])
        };
      }
    };

    _proto.autolink = function autolink(src, mangle) {
      var cap = this.rules.inline.autolink.exec(src);

      if (cap) {
        var text, href;

        if (cap[2] === '@') {
          text = _escape(this.options.mangle ? mangle(cap[1]) : cap[1]);
          href = 'mailto:' + text;
        } else {
          text = _escape(cap[1]);
          href = text;
        }

        return {
          type: 'link',
          raw: cap[0],
          text: text,
          href: href,
          tokens: [{
            type: 'text',
            raw: text,
            text: text
          }]
        };
      }
    };

    _proto.url = function url(src, mangle) {
      var cap;

      if (cap = this.rules.inline.url.exec(src)) {
        var text, href;

        if (cap[2] === '@') {
          text = _escape(this.options.mangle ? mangle(cap[0]) : cap[0]);
          href = 'mailto:' + text;
        } else {
          // do extended autolink path validation
          var prevCapZero;

          do {
            prevCapZero = cap[0];
            cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
          } while (prevCapZero !== cap[0]);

          text = _escape(cap[0]);

          if (cap[1] === 'www.') {
            href = 'http://' + text;
          } else {
            href = text;
          }
        }

        return {
          type: 'link',
          raw: cap[0],
          text: text,
          href: href,
          tokens: [{
            type: 'text',
            raw: text,
            text: text
          }]
        };
      }
    };

    _proto.inlineText = function inlineText(src, smartypants) {
      var cap = this.rules.inline.text.exec(src);

      if (cap) {
        var text;

        if (this.lexer.state.inRawBlock) {
          text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0];
        } else {
          text = _escape(this.options.smartypants ? smartypants(cap[0]) : cap[0]);
        }

        return {
          type: 'text',
          raw: cap[0],
          text: text
        };
      }
    };

    return Tokenizer;
  }();

  var noopTest = helpers.noopTest,
      edit = helpers.edit,
      merge$1 = helpers.merge;
  /**
   * Block-Level Grammar
   */

  var block$1 = {
    newline: /^(?: *(?:\n|$))+/,
    code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
    fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
    hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3}bull)( [^\n]+?)?(?:\n|$)/,
    html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?(?:\\?>\\n*|$)' // (3)
    + '|<![A-Z][\\s\\S]*?(?:>\\n*|$)' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (6)
    + '|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) open tag
    + '|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) closing tag
    + ')',
    def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
    table: noopTest,
    lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
    // regex template, placeholders will be replaced according to different paragraph
    // interruption rules of commonmark and the original markdown spec:
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html| +\n)[^\n]+)*)/,
    text: /^[^\n]+/
  };
  block$1._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
  block$1._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
  block$1.def = edit(block$1.def).replace('label', block$1._label).replace('title', block$1._title).getRegex();
  block$1.bullet = /(?:[*+-]|\d{1,9}[.)])/;
  block$1.listItemStart = edit(/^( *)(bull) */).replace('bull', block$1.bullet).getRegex();
  block$1.list = edit(block$1.list).replace(/bull/g, block$1.bullet).replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))').replace('def', '\\n+(?=' + block$1.def.source + ')').getRegex();
  block$1._tag = 'address|article|aside|base|basefont|blockquote|body|caption' + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption' + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe' + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option' + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr' + '|track|ul';
  block$1._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
  block$1.html = edit(block$1.html, 'i').replace('comment', block$1._comment).replace('tag', block$1._tag).replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  block$1.paragraph = edit(block$1._paragraph).replace('hr', block$1.hr).replace('heading', ' {0,3}#{1,6} ').replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
  .replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', block$1._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();
  block$1.blockquote = edit(block$1.blockquote).replace('paragraph', block$1.paragraph).getRegex();
  /**
   * Normal Block Grammar
   */

  block$1.normal = merge$1({}, block$1);
  /**
   * GFM Block Grammar
   */

  block$1.gfm = merge$1({}, block$1.normal, {
    table: '^ *([^\\n ].*\\|.*)\\n' // Header
    + ' {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?' // Align
    + '(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)' // Cells

  });
  block$1.gfm.table = edit(block$1.gfm.table).replace('hr', block$1.hr).replace('heading', ' {0,3}#{1,6} ').replace('blockquote', ' {0,3}>').replace('code', ' {4}[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', block$1._tag) // tables can be interrupted by type (6) html blocks
  .getRegex();
  /**
   * Pedantic grammar (original John Gruber's loose markdown specification)
   */

  block$1.pedantic = merge$1({}, block$1.normal, {
    html: edit('^ *(?:comment *(?:\\n|\\s*$)' + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))').replace('comment', block$1._comment).replace(/tag/g, '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub' + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)' + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b').getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: noopTest,
    // fences not supported
    paragraph: edit(block$1.normal._paragraph).replace('hr', block$1.hr).replace('heading', ' *#{1,6} *[^\n]').replace('lheading', block$1.lheading).replace('blockquote', ' {0,3}>').replace('|fences', '').replace('|list', '').replace('|html', '').getRegex()
  });
  /**
   * Inline-Level Grammar
   */

  var inline$1 = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: noopTest,
    tag: '^comment' + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
    // CDATA section
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
    nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
    reflinkSearch: 'reflink|nolink(?!\\()',
    emStrong: {
      lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
      //        (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
      //        () Skip orphan delim inside strong    (1) #***                (2) a***#, a***                   (3) #***a, ***a                 (4) ***#              (5) #***#                 (6) a***a
      rDelimAst: /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
      rDelimUnd: /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/ // ^- Not allowed for _

    },
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: noopTest,
    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
    punctuation: /^([\spunctuation])/
  }; // list of punctuation marks from CommonMark spec
  // without * and _ to handle the different emphasis markers * and _

  inline$1._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~';
  inline$1.punctuation = edit(inline$1.punctuation).replace(/punctuation/g, inline$1._punctuation).getRegex(); // sequences em should skip over [title](link), `code`, <html>

  inline$1.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
  inline$1.escapedEmSt = /\\\*|\\_/g;
  inline$1._comment = edit(block$1._comment).replace('(?:-->|$)', '-->').getRegex();
  inline$1.emStrong.lDelim = edit(inline$1.emStrong.lDelim).replace(/punct/g, inline$1._punctuation).getRegex();
  inline$1.emStrong.rDelimAst = edit(inline$1.emStrong.rDelimAst, 'g').replace(/punct/g, inline$1._punctuation).getRegex();
  inline$1.emStrong.rDelimUnd = edit(inline$1.emStrong.rDelimUnd, 'g').replace(/punct/g, inline$1._punctuation).getRegex();
  inline$1._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
  inline$1._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
  inline$1._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
  inline$1.autolink = edit(inline$1.autolink).replace('scheme', inline$1._scheme).replace('email', inline$1._email).getRegex();
  inline$1._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
  inline$1.tag = edit(inline$1.tag).replace('comment', inline$1._comment).replace('attribute', inline$1._attribute).getRegex();
  inline$1._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  inline$1._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
  inline$1._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
  inline$1.link = edit(inline$1.link).replace('label', inline$1._label).replace('href', inline$1._href).replace('title', inline$1._title).getRegex();
  inline$1.reflink = edit(inline$1.reflink).replace('label', inline$1._label).getRegex();
  inline$1.reflinkSearch = edit(inline$1.reflinkSearch, 'g').replace('reflink', inline$1.reflink).replace('nolink', inline$1.nolink).getRegex();
  /**
   * Normal Inline Grammar
   */

  inline$1.normal = merge$1({}, inline$1);
  /**
   * Pedantic Inline Grammar
   */

  inline$1.pedantic = merge$1({}, inline$1.normal, {
    strong: {
      start: /^__|\*\*/,
      middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      endAst: /\*\*(?!\*)/g,
      endUnd: /__(?!_)/g
    },
    em: {
      start: /^_|\*/,
      middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
      endAst: /\*(?!\*)/g,
      endUnd: /_(?!_)/g
    },
    link: edit(/^!?\[(label)\]\((.*?)\)/).replace('label', inline$1._label).getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace('label', inline$1._label).getRegex()
  });
  /**
   * GFM Inline Grammar
   */

  inline$1.gfm = merge$1({}, inline$1.normal, {
    escape: edit(inline$1.escape).replace('])', '~|])').getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
  });
  inline$1.gfm.url = edit(inline$1.gfm.url, 'i').replace('email', inline$1.gfm._extended_email).getRegex();
  /**
   * GFM + Line Breaks Inline Grammar
   */

  inline$1.breaks = merge$1({}, inline$1.gfm, {
    br: edit(inline$1.br).replace('{2,}', '*').getRegex(),
    text: edit(inline$1.gfm.text).replace('\\b_', '\\b_| {2,}\\n').replace(/\{2,\}/g, '*').getRegex()
  });
  var rules = {
    block: block$1,
    inline: inline$1
  };

  var Tokenizer$1 = Tokenizer_1;
  var defaults$3 = defaults$5.exports.defaults;
  var block = rules.block,
      inline = rules.inline;
  var repeatString = helpers.repeatString;
  /**
   * smartypants text replacement
   */

  function smartypants(text) {
    return text // em-dashes
    .replace(/---/g, "\u2014") // en-dashes
    .replace(/--/g, "\u2013") // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018") // closing singles & apostrophes
    .replace(/'/g, "\u2019") // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C") // closing doubles
    .replace(/"/g, "\u201D") // ellipses
    .replace(/\.{3}/g, "\u2026");
  }
  /**
   * mangle email addresses
   */


  function mangle(text) {
    var out = '',
        i,
        ch;
    var l = text.length;

    for (i = 0; i < l; i++) {
      ch = text.charCodeAt(i);

      if (Math.random() > 0.5) {
        ch = 'x' + ch.toString(16);
      }

      out += '&#' + ch + ';';
    }

    return out;
  }
  /**
   * Block Lexer
   */


  var Lexer_1 = /*#__PURE__*/function () {
    function Lexer(options) {
      this.tokens = [];
      this.tokens.links = Object.create(null);
      this.options = options || defaults$3;
      this.options.tokenizer = this.options.tokenizer || new Tokenizer$1();
      this.tokenizer = this.options.tokenizer;
      this.tokenizer.options = this.options;
      this.tokenizer.lexer = this;
      this.inlineQueue = [];
      this.state = {
        inLink: false,
        inRawBlock: false,
        top: true
      };
      var rules = {
        block: block.normal,
        inline: inline.normal
      };

      if (this.options.pedantic) {
        rules.block = block.pedantic;
        rules.inline = inline.pedantic;
      } else if (this.options.gfm) {
        rules.block = block.gfm;

        if (this.options.breaks) {
          rules.inline = inline.breaks;
        } else {
          rules.inline = inline.gfm;
        }
      }

      this.tokenizer.rules = rules;
    }
    /**
     * Expose Rules
     */


    /**
     * Static Lex Method
     */
    Lexer.lex = function lex(src, options) {
      var lexer = new Lexer(options);
      return lexer.lex(src);
    }
    /**
     * Static Lex Inline Method
     */
    ;

    Lexer.lexInline = function lexInline(src, options) {
      var lexer = new Lexer(options);
      return lexer.inlineTokens(src);
    }
    /**
     * Preprocessing
     */
    ;

    var _proto = Lexer.prototype;

    _proto.lex = function lex(src) {
      src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ');
      this.blockTokens(src, this.tokens);
      var next;

      while (next = this.inlineQueue.shift()) {
        this.inlineTokens(next.src, next.tokens);
      }

      return this.tokens;
    }
    /**
     * Lexing
     */
    ;

    _proto.blockTokens = function blockTokens(src, tokens) {
      var _this = this;

      if (tokens === void 0) {
        tokens = [];
      }

      if (this.options.pedantic) {
        src = src.replace(/^ +$/gm, '');
      }

      var token, lastToken, cutSrc, lastParagraphClipped;

      while (src) {
        if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some(function (extTokenizer) {
          if (token = extTokenizer.call({
            lexer: _this
          }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }

          return false;
        })) {
          continue;
        } // newline


        if (token = this.tokenizer.space(src)) {
          src = src.substring(token.raw.length);

          if (token.type) {
            tokens.push(token);
          }

          continue;
        } // code


        if (token = this.tokenizer.code(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1]; // An indented code block cannot interrupt a paragraph.

          if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.text;
            this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
          } else {
            tokens.push(token);
          }

          continue;
        } // fences


        if (token = this.tokenizer.fences(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // heading


        if (token = this.tokenizer.heading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // hr


        if (token = this.tokenizer.hr(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // blockquote


        if (token = this.tokenizer.blockquote(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // list


        if (token = this.tokenizer.list(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // html


        if (token = this.tokenizer.html(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // def


        if (token = this.tokenizer.def(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];

          if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.raw;
            this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
          } else if (!this.tokens.links[token.tag]) {
            this.tokens.links[token.tag] = {
              href: token.href,
              title: token.title
            };
          }

          continue;
        } // table (gfm)


        if (token = this.tokenizer.table(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // lheading


        if (token = this.tokenizer.lheading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // top-level paragraph
        // prevent paragraph consuming extensions by clipping 'src' to extension start


        cutSrc = src;

        if (this.options.extensions && this.options.extensions.startBlock) {
          (function () {
            var startIndex = Infinity;
            var tempSrc = src.slice(1);
            var tempStart = void 0;

            _this.options.extensions.startBlock.forEach(function (getStartIndex) {
              tempStart = getStartIndex.call({
                lexer: this
              }, tempSrc);

              if (typeof tempStart === 'number' && tempStart >= 0) {
                startIndex = Math.min(startIndex, tempStart);
              }
            });

            if (startIndex < Infinity && startIndex >= 0) {
              cutSrc = src.substring(0, startIndex + 1);
            }
          })();
        }

        if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
          lastToken = tokens[tokens.length - 1];

          if (lastParagraphClipped && lastToken.type === 'paragraph') {
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.text;
            this.inlineQueue.pop();
            this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
          } else {
            tokens.push(token);
          }

          lastParagraphClipped = cutSrc.length !== src.length;
          src = src.substring(token.raw.length);
          continue;
        } // text


        if (token = this.tokenizer.text(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];

          if (lastToken && lastToken.type === 'text') {
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.text;
            this.inlineQueue.pop();
            this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
          } else {
            tokens.push(token);
          }

          continue;
        }

        if (src) {
          var errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);

          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }

      this.state.top = true;
      return tokens;
    };

    _proto.inline = function inline(src, tokens) {
      this.inlineQueue.push({
        src: src,
        tokens: tokens
      });
    }
    /**
     * Lexing/Compiling
     */
    ;

    _proto.inlineTokens = function inlineTokens(src, tokens) {
      var _this2 = this;

      if (tokens === void 0) {
        tokens = [];
      }

      var token, lastToken, cutSrc; // String with links masked to avoid interference with em and strong

      var maskedSrc = src;
      var match;
      var keepPrevChar, prevChar; // Mask out reflinks

      if (this.tokens.links) {
        var links = Object.keys(this.tokens.links);

        if (links.length > 0) {
          while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
            if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) {
              maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
            }
          }
        }
      } // Mask out other blocks


      while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      } // Mask out escaped em & strong delimiters


      while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + '++' + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
      }

      while (src) {
        if (!keepPrevChar) {
          prevChar = '';
        }

        keepPrevChar = false; // extensions

        if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some(function (extTokenizer) {
          if (token = extTokenizer.call({
            lexer: _this2
          }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }

          return false;
        })) {
          continue;
        } // escape


        if (token = this.tokenizer.escape(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // tag


        if (token = this.tokenizer.tag(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];

          if (lastToken && token.type === 'text' && lastToken.type === 'text') {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }

          continue;
        } // link


        if (token = this.tokenizer.link(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // reflink, nolink


        if (token = this.tokenizer.reflink(src, this.tokens.links)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];

          if (lastToken && token.type === 'text' && lastToken.type === 'text') {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }

          continue;
        } // em & strong


        if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // code


        if (token = this.tokenizer.codespan(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // br


        if (token = this.tokenizer.br(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // del (gfm)


        if (token = this.tokenizer.del(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // autolink


        if (token = this.tokenizer.autolink(src, mangle)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // url (gfm)


        if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // text
        // prevent inlineText consuming extensions by clipping 'src' to extension start


        cutSrc = src;

        if (this.options.extensions && this.options.extensions.startInline) {
          (function () {
            var startIndex = Infinity;
            var tempSrc = src.slice(1);
            var tempStart = void 0;

            _this2.options.extensions.startInline.forEach(function (getStartIndex) {
              tempStart = getStartIndex.call({
                lexer: this
              }, tempSrc);

              if (typeof tempStart === 'number' && tempStart >= 0) {
                startIndex = Math.min(startIndex, tempStart);
              }
            });

            if (startIndex < Infinity && startIndex >= 0) {
              cutSrc = src.substring(0, startIndex + 1);
            }
          })();
        }

        if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
          src = src.substring(token.raw.length);

          if (token.raw.slice(-1) !== '_') {
            // Track prevChar before string of ____ started
            prevChar = token.raw.slice(-1);
          }

          keepPrevChar = true;
          lastToken = tokens[tokens.length - 1];

          if (lastToken && lastToken.type === 'text') {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }

          continue;
        }

        if (src) {
          var errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);

          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }

      return tokens;
    };

    _createClass(Lexer, null, [{
      key: "rules",
      get: function get() {
        return {
          block: block,
          inline: inline
        };
      }
    }]);

    return Lexer;
  }();

  var defaults$2 = defaults$5.exports.defaults;
  var cleanUrl = helpers.cleanUrl,
      escape$1 = helpers.escape;
  /**
   * Renderer
   */

  var Renderer_1 = /*#__PURE__*/function () {
    function Renderer(options) {
      this.options = options || defaults$2;
    }

    var _proto = Renderer.prototype;

    _proto.code = function code(_code, infostring, escaped) {
      var lang = (infostring || '').match(/\S*/)[0];

      if (this.options.highlight) {
        var out = this.options.highlight(_code, lang);

        if (out != null && out !== _code) {
          escaped = true;
          _code = out;
        }
      }

      _code = _code.replace(/\n$/, '') + '\n';

      if (!lang) {
        return '<pre><code>' + (escaped ? _code : escape$1(_code, true)) + '</code></pre>\n';
      }

      return '<pre><code class="' + this.options.langPrefix + escape$1(lang, true) + '">' + (escaped ? _code : escape$1(_code, true)) + '</code></pre>\n';
    };

    _proto.blockquote = function blockquote(quote) {
      return '<blockquote>\n' + quote + '</blockquote>\n';
    };

    _proto.html = function html(_html) {
      return _html;
    };

    _proto.heading = function heading(text, level, raw, slugger) {
      if (this.options.headerIds) {
        return '<h' + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + '</h' + level + '>\n';
      } // ignore IDs


      return '<h' + level + '>' + text + '</h' + level + '>\n';
    };

    _proto.hr = function hr() {
      return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
    };

    _proto.list = function list(body, ordered, start) {
      var type = ordered ? 'ol' : 'ul',
          startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
      return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
    };

    _proto.listitem = function listitem(text) {
      return '<li>' + text + '</li>\n';
    };

    _proto.checkbox = function checkbox(checked) {
      return '<input ' + (checked ? 'checked="" ' : '') + 'disabled="" type="checkbox"' + (this.options.xhtml ? ' /' : '') + '> ';
    };

    _proto.paragraph = function paragraph(text) {
      return '<p>' + text + '</p>\n';
    };

    _proto.table = function table(header, body) {
      if (body) body = '<tbody>' + body + '</tbody>';
      return '<table>\n' + '<thead>\n' + header + '</thead>\n' + body + '</table>\n';
    };

    _proto.tablerow = function tablerow(content) {
      return '<tr>\n' + content + '</tr>\n';
    };

    _proto.tablecell = function tablecell(content, flags) {
      var type = flags.header ? 'th' : 'td';
      var tag = flags.align ? '<' + type + ' align="' + flags.align + '">' : '<' + type + '>';
      return tag + content + '</' + type + '>\n';
    } // span level renderer
    ;

    _proto.strong = function strong(text) {
      return '<strong>' + text + '</strong>';
    };

    _proto.em = function em(text) {
      return '<em>' + text + '</em>';
    };

    _proto.codespan = function codespan(text) {
      return '<code>' + text + '</code>';
    };

    _proto.br = function br() {
      return this.options.xhtml ? '<br/>' : '<br>';
    };

    _proto.del = function del(text) {
      return '<del>' + text + '</del>';
    };

    _proto.link = function link(href, title, text) {
      href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);

      if (href === null) {
        return text;
      }

      var out = '<a href="' + escape$1(href) + '"';

      if (title) {
        out += ' title="' + title + '"';
      }

      out += '>' + text + '</a>';
      return out;
    };

    _proto.image = function image(href, title, text) {
      href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);

      if (href === null) {
        return text;
      }

      var out = '<img src="' + href + '" alt="' + text + '"';

      if (title) {
        out += ' title="' + title + '"';
      }

      out += this.options.xhtml ? '/>' : '>';
      return out;
    };

    _proto.text = function text(_text) {
      return _text;
    };

    return Renderer;
  }();

  /**
   * TextRenderer
   * returns only the textual part of the token
   */

  var TextRenderer_1 = /*#__PURE__*/function () {
    function TextRenderer() {}

    var _proto = TextRenderer.prototype;

    // no need for block level renderers
    _proto.strong = function strong(text) {
      return text;
    };

    _proto.em = function em(text) {
      return text;
    };

    _proto.codespan = function codespan(text) {
      return text;
    };

    _proto.del = function del(text) {
      return text;
    };

    _proto.html = function html(text) {
      return text;
    };

    _proto.text = function text(_text) {
      return _text;
    };

    _proto.link = function link(href, title, text) {
      return '' + text;
    };

    _proto.image = function image(href, title, text) {
      return '' + text;
    };

    _proto.br = function br() {
      return '';
    };

    return TextRenderer;
  }();

  /**
   * Slugger generates header id
   */

  var Slugger_1 = /*#__PURE__*/function () {
    function Slugger() {
      this.seen = {};
    }

    var _proto = Slugger.prototype;

    _proto.serialize = function serialize(value) {
      return value.toLowerCase().trim() // remove html tags
      .replace(/<[!\/a-z].*?>/ig, '') // remove unwanted chars
      .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '').replace(/\s/g, '-');
    }
    /**
     * Finds the next safe (unique) slug to use
     */
    ;

    _proto.getNextSafeSlug = function getNextSafeSlug(originalSlug, isDryRun) {
      var slug = originalSlug;
      var occurenceAccumulator = 0;

      if (this.seen.hasOwnProperty(slug)) {
        occurenceAccumulator = this.seen[originalSlug];

        do {
          occurenceAccumulator++;
          slug = originalSlug + '-' + occurenceAccumulator;
        } while (this.seen.hasOwnProperty(slug));
      }

      if (!isDryRun) {
        this.seen[originalSlug] = occurenceAccumulator;
        this.seen[slug] = 0;
      }

      return slug;
    }
    /**
     * Convert string to unique id
     * @param {object} options
     * @param {boolean} options.dryrun Generates the next unique slug without updating the internal accumulator.
     */
    ;

    _proto.slug = function slug(value, options) {
      if (options === void 0) {
        options = {};
      }

      var slug = this.serialize(value);
      return this.getNextSafeSlug(slug, options.dryrun);
    };

    return Slugger;
  }();

  var Renderer$1 = Renderer_1;
  var TextRenderer$1 = TextRenderer_1;
  var Slugger$1 = Slugger_1;
  var defaults$1 = defaults$5.exports.defaults;
  var unescape = helpers.unescape;
  /**
   * Parsing & Compiling
   */

  var Parser_1 = /*#__PURE__*/function () {
    function Parser(options) {
      this.options = options || defaults$1;
      this.options.renderer = this.options.renderer || new Renderer$1();
      this.renderer = this.options.renderer;
      this.renderer.options = this.options;
      this.textRenderer = new TextRenderer$1();
      this.slugger = new Slugger$1();
    }
    /**
     * Static Parse Method
     */


    Parser.parse = function parse(tokens, options) {
      var parser = new Parser(options);
      return parser.parse(tokens);
    }
    /**
     * Static Parse Inline Method
     */
    ;

    Parser.parseInline = function parseInline(tokens, options) {
      var parser = new Parser(options);
      return parser.parseInline(tokens);
    }
    /**
     * Parse Loop
     */
    ;

    var _proto = Parser.prototype;

    _proto.parse = function parse(tokens, top) {
      if (top === void 0) {
        top = true;
      }

      var out = '',
          i,
          j,
          k,
          l2,
          l3,
          row,
          cell,
          header,
          body,
          token,
          ordered,
          start,
          loose,
          itemBody,
          item,
          checked,
          task,
          checkbox,
          ret;
      var l = tokens.length;

      for (i = 0; i < l; i++) {
        token = tokens[i]; // Run any renderer extensions

        if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
          ret = this.options.extensions.renderers[token.type].call({
            parser: this
          }, token);

          if (ret !== false || !['space', 'hr', 'heading', 'code', 'table', 'blockquote', 'list', 'html', 'paragraph', 'text'].includes(token.type)) {
            out += ret || '';
            continue;
          }
        }

        switch (token.type) {
          case 'space':
            {
              continue;
            }

          case 'hr':
            {
              out += this.renderer.hr();
              continue;
            }

          case 'heading':
            {
              out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
              continue;
            }

          case 'code':
            {
              out += this.renderer.code(token.text, token.lang, token.escaped);
              continue;
            }

          case 'table':
            {
              header = ''; // header

              cell = '';
              l2 = token.header.length;

              for (j = 0; j < l2; j++) {
                cell += this.renderer.tablecell(this.parseInline(token.header[j].tokens), {
                  header: true,
                  align: token.align[j]
                });
              }

              header += this.renderer.tablerow(cell);
              body = '';
              l2 = token.rows.length;

              for (j = 0; j < l2; j++) {
                row = token.rows[j];
                cell = '';
                l3 = row.length;

                for (k = 0; k < l3; k++) {
                  cell += this.renderer.tablecell(this.parseInline(row[k].tokens), {
                    header: false,
                    align: token.align[k]
                  });
                }

                body += this.renderer.tablerow(cell);
              }

              out += this.renderer.table(header, body);
              continue;
            }

          case 'blockquote':
            {
              body = this.parse(token.tokens);
              out += this.renderer.blockquote(body);
              continue;
            }

          case 'list':
            {
              ordered = token.ordered;
              start = token.start;
              loose = token.loose;
              l2 = token.items.length;
              body = '';

              for (j = 0; j < l2; j++) {
                item = token.items[j];
                checked = item.checked;
                task = item.task;
                itemBody = '';

                if (item.task) {
                  checkbox = this.renderer.checkbox(checked);

                  if (loose) {
                    if (item.tokens.length > 0 && item.tokens[0].type === 'paragraph') {
                      item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;

                      if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                        item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                      }
                    } else {
                      item.tokens.unshift({
                        type: 'text',
                        text: checkbox
                      });
                    }
                  } else {
                    itemBody += checkbox;
                  }
                }

                itemBody += this.parse(item.tokens, loose);
                body += this.renderer.listitem(itemBody, task, checked);
              }

              out += this.renderer.list(body, ordered, start);
              continue;
            }

          case 'html':
            {
              // TODO parse inline content if parameter markdown=1
              out += this.renderer.html(token.text);
              continue;
            }

          case 'paragraph':
            {
              out += this.renderer.paragraph(this.parseInline(token.tokens));
              continue;
            }

          case 'text':
            {
              body = token.tokens ? this.parseInline(token.tokens) : token.text;

              while (i + 1 < l && tokens[i + 1].type === 'text') {
                token = tokens[++i];
                body += '\n' + (token.tokens ? this.parseInline(token.tokens) : token.text);
              }

              out += top ? this.renderer.paragraph(body) : body;
              continue;
            }

          default:
            {
              var errMsg = 'Token with "' + token.type + '" type was not found.';

              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
        }
      }

      return out;
    }
    /**
     * Parse Inline Tokens
     */
    ;

    _proto.parseInline = function parseInline(tokens, renderer) {
      renderer = renderer || this.renderer;
      var out = '',
          i,
          token,
          ret;
      var l = tokens.length;

      for (i = 0; i < l; i++) {
        token = tokens[i]; // Run any renderer extensions

        if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
          ret = this.options.extensions.renderers[token.type].call({
            parser: this
          }, token);

          if (ret !== false || !['escape', 'html', 'link', 'image', 'strong', 'em', 'codespan', 'br', 'del', 'text'].includes(token.type)) {
            out += ret || '';
            continue;
          }
        }

        switch (token.type) {
          case 'escape':
            {
              out += renderer.text(token.text);
              break;
            }

          case 'html':
            {
              out += renderer.html(token.text);
              break;
            }

          case 'link':
            {
              out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
              break;
            }

          case 'image':
            {
              out += renderer.image(token.href, token.title, token.text);
              break;
            }

          case 'strong':
            {
              out += renderer.strong(this.parseInline(token.tokens, renderer));
              break;
            }

          case 'em':
            {
              out += renderer.em(this.parseInline(token.tokens, renderer));
              break;
            }

          case 'codespan':
            {
              out += renderer.codespan(token.text);
              break;
            }

          case 'br':
            {
              out += renderer.br();
              break;
            }

          case 'del':
            {
              out += renderer.del(this.parseInline(token.tokens, renderer));
              break;
            }

          case 'text':
            {
              out += renderer.text(token.text);
              break;
            }

          default:
            {
              var errMsg = 'Token with "' + token.type + '" type was not found.';

              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
        }
      }

      return out;
    };

    return Parser;
  }();

  var Lexer = Lexer_1;
  var Parser = Parser_1;
  var Tokenizer = Tokenizer_1;
  var Renderer = Renderer_1;
  var TextRenderer = TextRenderer_1;
  var Slugger = Slugger_1;
  var merge = helpers.merge,
      checkSanitizeDeprecation = helpers.checkSanitizeDeprecation,
      escape = helpers.escape;
  var getDefaults = defaults$5.exports.getDefaults,
      changeDefaults = defaults$5.exports.changeDefaults,
      defaults = defaults$5.exports.defaults;
  /**
   * Marked
   */

  function marked(src, opt, callback) {
    // throw error in case of non string input
    if (typeof src === 'undefined' || src === null) {
      throw new Error('marked(): input parameter is undefined or null');
    }

    if (typeof src !== 'string') {
      throw new Error('marked(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected');
    }

    if (typeof opt === 'function') {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});
    checkSanitizeDeprecation(opt);

    if (callback) {
      var highlight = opt.highlight;
      var tokens;

      try {
        tokens = Lexer.lex(src, opt);
      } catch (e) {
        return callback(e);
      }

      var done = function done(err) {
        var out;

        if (!err) {
          try {
            if (opt.walkTokens) {
              marked.walkTokens(tokens, opt.walkTokens);
            }

            out = Parser.parse(tokens, opt);
          } catch (e) {
            err = e;
          }
        }

        opt.highlight = highlight;
        return err ? callback(err) : callback(null, out);
      };

      if (!highlight || highlight.length < 3) {
        return done();
      }

      delete opt.highlight;
      if (!tokens.length) return done();
      var pending = 0;
      marked.walkTokens(tokens, function (token) {
        if (token.type === 'code') {
          pending++;
          setTimeout(function () {
            highlight(token.text, token.lang, function (err, code) {
              if (err) {
                return done(err);
              }

              if (code != null && code !== token.text) {
                token.text = code;
                token.escaped = true;
              }

              pending--;

              if (pending === 0) {
                done();
              }
            });
          }, 0);
        }
      });

      if (pending === 0) {
        done();
      }

      return;
    }

    try {
      var _tokens = Lexer.lex(src, opt);

      if (opt.walkTokens) {
        marked.walkTokens(_tokens, opt.walkTokens);
      }

      return Parser.parse(_tokens, opt);
    } catch (e) {
      e.message += '\nPlease report this to https://github.com/markedjs/marked.';

      if (opt.silent) {
        return '<p>An error occurred:</p><pre>' + escape(e.message + '', true) + '</pre>';
      }

      throw e;
    }
  }
  /**
   * Options
   */


  marked.options = marked.setOptions = function (opt) {
    merge(marked.defaults, opt);
    changeDefaults(marked.defaults);
    return marked;
  };

  marked.getDefaults = getDefaults;
  marked.defaults = defaults;
  /**
   * Use Extension
   */

  marked.use = function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var opts = merge.apply(void 0, [{}].concat(args));
    var extensions = marked.defaults.extensions || {
      renderers: {},
      childTokens: {}
    };
    var hasExtensions;
    args.forEach(function (pack) {
      // ==-- Parse "addon" extensions --== //
      if (pack.extensions) {
        hasExtensions = true;
        pack.extensions.forEach(function (ext) {
          if (!ext.name) {
            throw new Error('extension name required');
          }

          if (ext.renderer) {
            // Renderer extensions
            var prevRenderer = extensions.renderers ? extensions.renderers[ext.name] : null;

            if (prevRenderer) {
              // Replace extension with func to run new extension but fall back if false
              extensions.renderers[ext.name] = function () {
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  args[_key2] = arguments[_key2];
                }

                var ret = ext.renderer.apply(this, args);

                if (ret === false) {
                  ret = prevRenderer.apply(this, args);
                }

                return ret;
              };
            } else {
              extensions.renderers[ext.name] = ext.renderer;
            }
          }

          if (ext.tokenizer) {
            // Tokenizer Extensions
            if (!ext.level || ext.level !== 'block' && ext.level !== 'inline') {
              throw new Error("extension level must be 'block' or 'inline'");
            }

            if (extensions[ext.level]) {
              extensions[ext.level].unshift(ext.tokenizer);
            } else {
              extensions[ext.level] = [ext.tokenizer];
            }

            if (ext.start) {
              // Function to check for start of token
              if (ext.level === 'block') {
                if (extensions.startBlock) {
                  extensions.startBlock.push(ext.start);
                } else {
                  extensions.startBlock = [ext.start];
                }
              } else if (ext.level === 'inline') {
                if (extensions.startInline) {
                  extensions.startInline.push(ext.start);
                } else {
                  extensions.startInline = [ext.start];
                }
              }
            }
          }

          if (ext.childTokens) {
            // Child tokens to be visited by walkTokens
            extensions.childTokens[ext.name] = ext.childTokens;
          }
        });
      } // ==-- Parse "overwrite" extensions --== //


      if (pack.renderer) {
        (function () {
          var renderer = marked.defaults.renderer || new Renderer();

          var _loop = function _loop(prop) {
            var prevRenderer = renderer[prop]; // Replace renderer with func to run extension, but fall back if false

            renderer[prop] = function () {
              for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
              }

              var ret = pack.renderer[prop].apply(renderer, args);

              if (ret === false) {
                ret = prevRenderer.apply(renderer, args);
              }

              return ret;
            };
          };

          for (var prop in pack.renderer) {
            _loop(prop);
          }

          opts.renderer = renderer;
        })();
      }

      if (pack.tokenizer) {
        (function () {
          var tokenizer = marked.defaults.tokenizer || new Tokenizer();

          var _loop2 = function _loop2(prop) {
            var prevTokenizer = tokenizer[prop]; // Replace tokenizer with func to run extension, but fall back if false

            tokenizer[prop] = function () {
              for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
              }

              var ret = pack.tokenizer[prop].apply(tokenizer, args);

              if (ret === false) {
                ret = prevTokenizer.apply(tokenizer, args);
              }

              return ret;
            };
          };

          for (var prop in pack.tokenizer) {
            _loop2(prop);
          }

          opts.tokenizer = tokenizer;
        })();
      } // ==-- Parse WalkTokens extensions --== //


      if (pack.walkTokens) {
        var walkTokens = marked.defaults.walkTokens;

        opts.walkTokens = function (token) {
          pack.walkTokens.call(_this, token);

          if (walkTokens) {
            walkTokens(token);
          }
        };
      }

      if (hasExtensions) {
        opts.extensions = extensions;
      }

      marked.setOptions(opts);
    });
  };
  /**
   * Run callback for every token
   */


  marked.walkTokens = function (tokens, callback) {
    var _loop3 = function _loop3() {
      var token = _step.value;
      callback(token);

      switch (token.type) {
        case 'table':
          {
            for (var _iterator2 = _createForOfIteratorHelperLoose(token.header), _step2; !(_step2 = _iterator2()).done;) {
              var cell = _step2.value;
              marked.walkTokens(cell.tokens, callback);
            }

            for (var _iterator3 = _createForOfIteratorHelperLoose(token.rows), _step3; !(_step3 = _iterator3()).done;) {
              var row = _step3.value;

              for (var _iterator4 = _createForOfIteratorHelperLoose(row), _step4; !(_step4 = _iterator4()).done;) {
                var _cell = _step4.value;
                marked.walkTokens(_cell.tokens, callback);
              }
            }

            break;
          }

        case 'list':
          {
            marked.walkTokens(token.items, callback);
            break;
          }

        default:
          {
            if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) {
              // Walk any extensions
              marked.defaults.extensions.childTokens[token.type].forEach(function (childTokens) {
                marked.walkTokens(token[childTokens], callback);
              });
            } else if (token.tokens) {
              marked.walkTokens(token.tokens, callback);
            }
          }
      }
    };

    for (var _iterator = _createForOfIteratorHelperLoose(tokens), _step; !(_step = _iterator()).done;) {
      _loop3();
    }
  };
  /**
   * Parse Inline
   */


  marked.parseInline = function (src, opt) {
    // throw error in case of non string input
    if (typeof src === 'undefined' || src === null) {
      throw new Error('marked.parseInline(): input parameter is undefined or null');
    }

    if (typeof src !== 'string') {
      throw new Error('marked.parseInline(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected');
    }

    opt = merge({}, marked.defaults, opt || {});
    checkSanitizeDeprecation(opt);

    try {
      var tokens = Lexer.lexInline(src, opt);

      if (opt.walkTokens) {
        marked.walkTokens(tokens, opt.walkTokens);
      }

      return Parser.parseInline(tokens, opt);
    } catch (e) {
      e.message += '\nPlease report this to https://github.com/markedjs/marked.';

      if (opt.silent) {
        return '<p>An error occurred:</p><pre>' + escape(e.message + '', true) + '</pre>';
      }

      throw e;
    }
  };
  /**
   * Expose
   */


  marked.Parser = Parser;
  marked.parser = Parser.parse;
  marked.Renderer = Renderer;
  marked.TextRenderer = TextRenderer;
  marked.Lexer = Lexer;
  marked.lexer = Lexer.lex;
  marked.Tokenizer = Tokenizer;
  marked.Slugger = Slugger;
  marked.parse = marked;
  var marked_1 = marked;

  return marked_1;

})));
});

const LoginReadme = "# sqm-portal-login\r\n\r\n\r\n\r\n<!-- Auto Generated Below -->\r\n\r\n\r\n## Properties\r\n\r\n| Property              | Attribute               | Description | Type                                                                                                                                                                                                                                                            | Default                     |\r\n| --------------------- | ----------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |\r\n| `demoData`            | --                      |             | `{ states?: { error: string; loading: boolean; forgotPasswordPath: string; registerPath: string; }; content?: { forgotPasswordButton?: any; secondaryButton?: any; emailLabel?: string; passwordLabel?: string; submitLabel?: string; pageLabel?: string; }; }` | `undefined`                 |\r\n| `emailLabel`          | `email-label`           |             | `string`                                                                                                                                                                                                                                                        | `\"Email\"`                   |\r\n| `forgotPasswordLabel` | `forgot-password-label` |             | `string`                                                                                                                                                                                                                                                        | `\"Forgot Password?\"`        |\r\n| `forgotPasswordPath`  | `forgot-password-path`  |             | `string`                                                                                                                                                                                                                                                        | `\"/forgotPassword\"`         |\r\n| `nextPage`            | `next-page`             |             | `string`                                                                                                                                                                                                                                                        | `\"/\"`                       |\r\n| `pageLabel`           | `page-label`            |             | `string`                                                                                                                                                                                                                                                        | `\"Sign in to your account\"` |\r\n| `passwordLabel`       | `password-label`        |             | `string`                                                                                                                                                                                                                                                        | `\"Password\"`                |\r\n| `registerLabel`       | `register-label`        |             | `string`                                                                                                                                                                                                                                                        | `\"Register\"`                |\r\n| `registerPath`        | `register-path`         |             | `string`                                                                                                                                                                                                                                                        | `\"/register\"`               |\r\n| `submitLabel`         | `submit-label`          |             | `string`                                                                                                                                                                                                                                                        | `\"Sign In\"`                 |\r\n\r\n\r\n## Dependencies\r\n\r\n### Used by\r\n\r\n - [sqm-stencilbook](../sqm-stencilbook)\r\n\r\n### Depends on\r\n\r\n- [sqm-form-message](../sqm-form-message)\r\n\r\n### Graph\r\n```mermaid\r\ngraph TD;\r\n  sqm-portal-login --> sqm-form-message\r\n  sqm-stencilbook --> sqm-portal-login\r\n  style sqm-portal-login fill:#f9f,stroke:#333,stroke-width:4px\r\n```\r\n\r\n----------------------------------------------\r\n\r\n*Built with [StencilJS](https://stenciljs.com/)*\r\n";

const ReferralIframeReadme = "# sqm-referral-iframe\r\n\r\n\r\n\r\n<!-- Auto Generated Below -->\r\n\r\n\r\n## Properties\r\n\r\n| Property       | Attribute       | Description | Type                                                                                                                           | Default     |\r\n| -------------- | --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------- |\r\n| `demoData`     | --              |             | `{ states?: { content: { iframeSrc: string; iframeHeight: string; iframeWidth: string; }; }; data?: { shareCode: string; }; }` | `undefined` |\r\n| `iframeHeight` | `iframe-height` |             | `string`                                                                                                                       | `\"100%\"`    |\r\n| `iframeSrc`    | `iframe-src`    |             | `string`                                                                                                                       | `undefined` |\r\n| `iframeWidth`  | `iframe-width`  |             | `string`                                                                                                                       | `\"100%\"`    |\r\n\r\n\r\n## Dependencies\r\n\r\n### Used by\r\n\r\n - [sqm-stencilbook](../sqm-stencilbook)\r\n\r\n### Graph\r\n```mermaid\r\ngraph TD;\r\n  sqm-stencilbook --> sqm-referral-iframe\r\n  style sqm-referral-iframe fill:#f9f,stroke:#333,stroke-width:4px\r\n```\r\n\r\n----------------------------------------------\r\n\r\n*Built with [StencilJS](https://stenciljs.com/)*\r\n";

const ForgotPasswordReadme = "# sqm-portal-forgot-password\r\n\r\n\r\n\r\n<!-- Auto Generated Below -->\r\n\r\n\r\n## Properties\r\n\r\n| Property       | Attribute       | Description                                                          | Type                                                                                                                                                                                        | Default                    |\r\n| -------------- | --------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |\r\n| `demoData`     | --              |                                                                      | `{ states?: { error: string; loading: boolean; success: boolean; loginPath: string; }; content?: { secondaryButton: any; messageSlot: any; emailLabel?: string; submitLabel?: string; }; }` | `undefined`                |\r\n| `emailLabel`   | `email-label`   |                                                                      | `string`                                                                                                                                                                                    | `\"Email\"`                  |\r\n| `loginPath`    | `login-path`    |                                                                      | `string`                                                                                                                                                                                    | `\"/login\"`                 |\r\n| `redirectPath` | `redirect-path` | The page that users are redirected to from the password reset email. | `string`                                                                                                                                                                                    | `\"/resetPassword\"`         |\r\n| `submitLabel`  | `submit-label`  |                                                                      | `string`                                                                                                                                                                                    | `\"Request Password Reset\"` |\r\n\r\n\r\n## Dependencies\r\n\r\n### Depends on\r\n\r\n- [sqm-form-message](../sqm-form-message)\r\n\r\n### Graph\r\n```mermaid\r\ngraph TD;\r\n  sqm-portal-forgot-password --> sqm-form-message\r\n  style sqm-portal-forgot-password fill:#f9f,stroke:#333,stroke-width:4px\r\n```\r\n\r\n----------------------------------------------\r\n\r\n*Built with [StencilJS](https://stenciljs.com/)*\r\n";

const RegisterReadme = "# sqm-portal-register\r\n\r\n\r\n\r\n<!-- Auto Generated Below -->\r\n\r\n\r\n## Properties\r\n\r\n| Property                   | Attribute                    | Description                                                        | Type                                                                                                                                                                                                                                                                                                                                                                                                                                   | Default              |\r\n| -------------------------- | ---------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |\r\n| `confirmPassword`          | `confirm-password`           |                                                                    | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                              | `false`              |\r\n| `confirmPasswordLabel`     | `confirm-password-label`     |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                                               | `\"Confirm Password\"` |\r\n| `demoData`                 | --                           |                                                                    | `{ states?: { error: string; loading: boolean; confirmPassword: boolean; hideInputs: boolean; validationState?: FormState; enablePasswordValidation?: boolean; loginPath: string; }; refs?: { formRef: any; }; content?: { formData?: VNode; terms?: VNode; passwordField?: VNode; secondaryButton?: VNode; emailLabel?: string; passwordLabel?: string; submitLabel?: string; pageLabel?: string; confirmPasswordLabel: string; }; }` | `undefined`          |\r\n| `emailLabel`               | `email-label`                |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                                               | `\"Email\"`            |\r\n| `enablePasswordValidation` | `enable-password-validation` |                                                                    | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                              | `true`               |\r\n| `hideInputs`               | `hide-inputs`                |                                                                    | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                              | `false`              |\r\n| `loginLabel`               | `login-label`                |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                                               | `\"Sign in\"`          |\r\n| `loginPath`                | `login-path`                 |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                                               | `\"/login\"`           |\r\n| `nextPage`                 | `next-page`                  |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                                               | `\"/\"`                |\r\n| `pageLabel`                | `page-label`                 |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                                               | `\"Register\"`         |\r\n| `passwordLabel`            | `password-label`             |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                                               | `\"Password\"`         |\r\n| `redirectPath`             | `redirect-path`              | The page that users are redirected to from the verification email. | `string`                                                                                                                                                                                                                                                                                                                                                                                                                               | `\"/verifyEmail\"`     |\r\n| `submitLabel`              | `submit-label`               |                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                                               | `\"Register\"`         |\r\n\r\n\r\n## Dependencies\r\n\r\n### Used by\r\n\r\n - [sqm-stencilbook](../sqm-stencilbook)\r\n\r\n### Depends on\r\n\r\n- [sqm-form-message](../sqm-form-message)\r\n- [sqm-password-field](../sqm-password-field)\r\n\r\n### Graph\r\n```mermaid\r\ngraph TD;\r\n  sqm-portal-register --> sqm-form-message\r\n  sqm-portal-register --> sqm-password-field\r\n  sqm-stencilbook --> sqm-portal-register\r\n  style sqm-portal-register fill:#f9f,stroke:#333,stroke-width:4px\r\n```\r\n\r\n----------------------------------------------\r\n\r\n*Built with [StencilJS](https://stenciljs.com/)*\r\n";

const EditProfileReadme = "# sqm-portal-profile\r\n\r\n\r\n\r\n<!-- Auto Generated Below -->\r\n\r\n\r\n## Properties\r\n\r\n| Property                 | Attribute                   | Description | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Default                  |\r\n| ------------------------ | --------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |\r\n| `countrytext`            | `countrytext`               |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `\"Country\"`              |\r\n| `demoData`               | --                          |             | `{ states?: { success: boolean; loading: boolean; submitDisabled: boolean; showCountry: boolean; formState: { country: string; firstName: string; lastName: string; errors: any; error: string; }; user: { id: string; accountId: string; firstName: string; lastName: string; email: string; countryCode: string; }; text: { firstnametext: string; lastnametext: string; emailtext: string; countrytext: string; editProfileHeader: string; editProfileSubHeader: string; submitChangeButtonText: string; }; }; }` | `undefined`              |\r\n| `editProfileHeader`      | `edit-profile-header`       |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `\"Edit your profile\"`    |\r\n| `editProfileSubHeader`   | `edit-profile-sub-header`   |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `\"Personal Information\"` |\r\n| `emailtext`              | `emailtext`                 |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `\"Email\"`                |\r\n| `firstnametext`          | `firstnametext`             |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `\"First Name\"`           |\r\n| `lastnametext`           | `lastnametext`              |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `\"Last Name\"`            |\r\n| `showCountry`            | `show-country`              |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `true`                   |\r\n| `submitChangeButtonText` | `submit-change-button-text` |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `\"Submit Changes\"`       |\r\n\r\n\r\n## Dependencies\r\n\r\n### Depends on\r\n\r\n- [sqm-form-message](../sqm-form-message)\r\n\r\n### Graph\r\n```mermaid\r\ngraph TD;\r\n  sqm-portal-profile --> sqm-form-message\r\n  style sqm-portal-profile fill:#f9f,stroke:#333,stroke-width:4px\r\n```\r\n\r\n----------------------------------------------\r\n\r\n*Built with [StencilJS](https://stenciljs.com/)*\r\n";

const ResetPasswordReadme = "# sqm-portal-reset-password\r\n\r\n\r\n\r\n<!-- Auto Generated Below -->\r\n\r\n\r\n## Properties\r\n\r\n| Property                    | Attribute                      | Description                                                                                      | Type                                                                                                                                                                                                                                                                                                                                                                                                 | Default                 |\r\n| --------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |\r\n| `confirmPassword`           | `confirm-password`             |                                                                                                  | `boolean`                                                                                                                                                                                                                                                                                                                                                                                            | `false`                 |\r\n| `confirmPasswordFieldLabel` | `confirm-password-field-label` |                                                                                                  | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `\"Confirm Password\"`    |\r\n| `continueButtonText`        | `continue-button-text`         | Displayed after a successful password reset                                                      | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `\"Continue\"`            |\r\n| `demoData`                  | --                             |                                                                                                  | `{ states?: { error: string; loading: boolean; reset: boolean; confirmPassword: boolean; oobCodeValidating: boolean; oobCodeValid: boolean; passwordDemoData?: PasswordFieldViewDemoProps; content: { passwordResetHeader: string; resetPasswordHeader: string; continueButtonText: string; resetPasswordButtonText: string; confirmPasswordFieldLabel: string; passwordFieldLabel: string; }; }; }` | `undefined`             |\r\n| `failedPage`                | `failed-page`                  | The page that users are redirected to if the reset fails due to outdated password reset attempt. | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `\"/\"`                   |\r\n| `nextPage`                  | `next-page`                    | The page that users are redirected to when the password reset succeeds.                          | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `\"/\"`                   |\r\n| `passwordFieldLabel`        | `password-field-label`         |                                                                                                  | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `\"New Password\"`        |\r\n| `passwordResetHeader`       | `password-reset-header`        | Displayed after a successful password reset                                                      | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `\"Password reset\"`      |\r\n| `resetPasswordButtonText`   | `reset-password-button-text`   |                                                                                                  | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `\"Reset Password\"`      |\r\n| `resetPasswordHeader`       | `reset-password-header`        |                                                                                                  | `string`                                                                                                                                                                                                                                                                                                                                                                                             | `\"Reset your password\"` |\r\n\r\n\r\n## Dependencies\r\n\r\n### Depends on\r\n\r\n- [sqm-form-message](../sqm-form-message)\r\n- [sqm-password-field](../sqm-password-field)\r\n\r\n### Graph\r\n```mermaid\r\ngraph TD;\r\n  sqm-portal-reset-password --> sqm-form-message\r\n  sqm-portal-reset-password --> sqm-password-field\r\n  style sqm-portal-reset-password fill:#f9f,stroke:#333,stroke-width:4px\r\n```\r\n\r\n----------------------------------------------\r\n\r\n*Built with [StencilJS](https://stenciljs.com/)*\r\n";

const EmailVerificationReadme = "# sqm-portal-email-verification\r\n\r\n\r\n\r\n<!-- Auto Generated Below -->\r\n\r\n\r\n## Properties\r\n\r\n| Property                  | Attribute                   | Description                                                        | Type                                                                                                                                                                                        | Default                                                                                           |\r\n| ------------------------- | --------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |\r\n| `demoData`                | --                          |                                                                    | `{ states?: { error: string; loading: boolean; success: boolean; }; content?: { email: string; verifyMessage: string; emailVerificationHeader: string; resendEmailButtonText: string; }; }` | `undefined`                                                                                       |\r\n| `emailVerificationHeader` | `email-verification-header` |                                                                    | `string`                                                                                                                                                                                    | `\"Verify your email\"`                                                                             |\r\n| `redirectPath`            | `redirect-path`             | The page that users are redirected to from the verification email. | `string`                                                                                                                                                                                    | `\"/verifyEmail\"`                                                                                  |\r\n| `resendEmailButtonText`   | `resend-email-button-text`  |                                                                    | `string`                                                                                                                                                                                    | `\"Re-send Email\"`                                                                                 |\r\n| `verifyMessage`           | `verify-message`            |                                                                    | `string`                                                                                                                                                                                    | `\"A verification email was sent to {email}. Please verify your email to continue to the portal.\"` |\r\n\r\n\r\n## Dependencies\r\n\r\n### Depends on\r\n\r\n- [sqm-form-message](../sqm-form-message)\r\n\r\n### Graph\r\n```mermaid\r\ngraph TD;\r\n  sqm-portal-email-verification --> sqm-form-message\r\n  style sqm-portal-email-verification fill:#f9f,stroke:#333,stroke-width:4px\r\n```\r\n\r\n----------------------------------------------\r\n\r\n*Built with [StencilJS](https://stenciljs.com/)*\r\n";

const EmailVerifiedReadme = "# sqm-portal-verify-email\r\n\r\n\r\n\r\n<!-- Auto Generated Below -->\r\n\r\n\r\n## Properties\r\n\r\n| Property     | Attribute     | Description                                                                                       | Type                                                                                                 | Default     |\r\n| ------------ | ------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------- |\r\n| `demoData`   | --            |                                                                                                   | `{ states?: { error: string; loading: boolean; verified: boolean; }; data?: { oobCode: string; }; }` | `undefined` |\r\n| `failedPage` | `failed-page` | The page that users are redirected to if verification fails due to outdated verification attempt. | `string`                                                                                             | `\"/\"`       |\r\n| `nextPage`   | `next-page`   | The page that users are redirected to when the verification succeeds.                             | `string`                                                                                             | `\"/\"`       |\r\n\r\n\r\n## Dependencies\r\n\r\n### Depends on\r\n\r\n- [sqm-form-message](../sqm-form-message)\r\n\r\n### Graph\r\n```mermaid\r\ngraph TD;\r\n  sqm-portal-verify-email --> sqm-form-message\r\n  style sqm-portal-verify-email fill:#f9f,stroke:#333,stroke-width:4px\r\n```\r\n\r\n----------------------------------------------\r\n\r\n*Built with [StencilJS](https://stenciljs.com/)*\r\n";

const PortalTemplates_stories = {
  title: "Templates / Portal",
};
// slot="footer"
// support-email="john@foodservicerewards.com"
// terms-link="example.com"
// faq-link="example.com"
// padding="large"
// show-powered-by="false"
// powered-by-link="https://www.saasquatch.com/"
function useTemplate(templateString) {
  const [editedTemplate, setEditedTemplate] = useState(templateString);
  const [previewTemplate, setPreviewTemplate] = useState(templateString);
  return {
    states: { previewTemplate, editedTemplate },
    callbacks: { setEditedTemplate, setPreviewTemplate },
  };
}
function TemplateView(props) {
  const { states, callbacks, readme } = props;
  return [
    h$1("textarea", { style: { width: "100%", height: "300px" }, onChange: (e) => callbacks.setEditedTemplate(e.target.value) }, states.editedTemplate),
    h$1("button", { onClick: () => callbacks.setPreviewTemplate(states.editedTemplate) }, "Update Preview"),
    readme ? (h$1("details", null,
      h$1("summary", null, "Props readme"),
      h$1("div", { innerHTML: marked(readme) }))) : (""),
    h$1("div", { innerHTML: states.previewTemplate }),
  ];
}
function Buttons({ callbacks, states, template }) {
  return (h$1("div", null,
    h$1("button", { onClick: () => callbacks.setPreviewTemplate(states.editedTemplate) }, "Update Preview"),
    h$1("button", { style: { marginLeft: "10px" }, onClick: () => callbacks.setPreviewTemplate(template) }, "Preview Dashboard")));
}
function DefaultTemplateView(props) {
  const { states, callbacks } = props;
  return (h$1("div", { style: { height: "50vh" } },
    h$1("textarea", { style: { width: "100%", height: "300px" }, onChange: (e) => callbacks.setEditedTemplate(e.target.value) }, states.editedTemplate),
    h$1(Buttons, { states: states, callbacks: callbacks, template: props.template }),
    h$1("h2", null, "Navigation"),
    h$1("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(9, 80px)",
        gridGap: "10px",
      } },
      h$1("button", { onClick: () => dn.push("/") }, "Dashboard"),
      props.leadSubmit && (h$1("button", { onClick: () => dn.push("/refer") }, "Submit a Referral")),
      h$1("button", { onClick: () => dn.push("/activity") }, "Activity"),
      h$1("button", { onClick: () => dn.push("/editProfile") }, "Edit Profile"),
      h$1("button", { onClick: () => dn.push("/login") }, "Login"),
      h$1("button", { onClick: () => dn.push("/register") }, "Register"),
      h$1("button", { onClick: () => dn.push("/emailVerification") }, "Email Verification"),
      h$1("button", { onClick: () => dn.push("/verifyEmail") }, "Verify Email"),
      h$1("button", { onClick: () => dn.push("/forgotPassword") }, "Forgot Password"),
      h$1("button", { onClick: () => dn.push("/resetPassword") }, "Reset Password")),
    h$1("br", null),
    h$1("div", { innerHTML: states.previewTemplate })));
}
const DefaultPortal = createHookStory(() => {
  const { states, callbacks } = useTemplate(portalTemplate);
  return (h$1(DefaultTemplateView, { states: states, callbacks: callbacks, template: portalTemplateWithDashboard }));
});
const MultiProgramPortal = createHookStory(() => {
  const { states, callbacks } = useTemplate(multiProgramTemplate);
  return (h$1(DefaultTemplateView, { states: states, callbacks: callbacks, template: multiProgramTemplateWithDashboard }));
});
const LeadSubmitPortal = createHookStory(() => {
  const { states, callbacks } = useTemplate(portalLeadSubmitTemplate);
  return (h$1(DefaultTemplateView, { states: states, callbacks: callbacks, template: portalLeadSubmitTemplateWithDashboard, leadSubmit: true }));
});
const Login = createHookStory(() => {
  const { states, callbacks } = useTemplate(loginTemplate);
  return (h$1(TemplateView, { states: states, callbacks: callbacks, readme: LoginReadme }));
});
const ForgotPassword = createHookStory(() => {
  const { states, callbacks } = useTemplate(forgotPasswordTemplate);
  return (h$1(TemplateView, { states: states, callbacks: callbacks, readme: ForgotPasswordReadme }));
});
const Register = createHookStory(() => {
  const { states, callbacks } = useTemplate(registerTemplate);
  return (h$1(TemplateView, { states: states, callbacks: callbacks, readme: RegisterReadme }));
});
const Dashboard = createHookStory(() => {
  const { states, callbacks } = useTemplate(dashboardTemplate);
  return h$1(TemplateView, { states: states, callbacks: callbacks });
});
const LeadSubmitIframe = createHookStory(() => {
  const { states, callbacks } = useTemplate(leadSubmitTemplate);
  return (h$1(TemplateView, { states: states, callbacks: callbacks, readme: ReferralIframeReadme }));
});
const Activity = createHookStory(() => {
  const { states, callbacks } = useTemplate(activityTemplate);
  return h$1(TemplateView, { states: states, callbacks: callbacks });
});
const EditProfile = createHookStory(() => {
  const { states, callbacks } = useTemplate(editProfileTemplate);
  return (h$1(TemplateView, { states: states, callbacks: callbacks, readme: EditProfileReadme }));
});
const ResetPassword = createHookStory(() => {
  const { states, callbacks } = useTemplate(resetPasswordTemplate);
  return (h$1(TemplateView, { states: states, callbacks: callbacks, readme: ResetPasswordReadme }));
});
const EmailVerification = createHookStory(() => {
  const { states, callbacks } = useTemplate(emailVerificationTemplate);
  return (h$1(TemplateView, { states: states, callbacks: callbacks, readme: EmailVerificationReadme }));
});
const EmailVerified = createHookStory(() => {
  const { states, callbacks } = useTemplate(emailVerifiedTemplate);
  return (h$1(TemplateView, { states: states, callbacks: callbacks, readme: EmailVerifiedReadme }));
});
const Widget = createHookStory(() => {
  return (h$1("sqb-widget", { "widget-type": "p/Vacay-referral/w/referrerWidget", demoData: {
      data: {
        html: dashboardTemplate,
      },
    } }));
});
const ResetPasswordEmail = createHookStory(() => {
  const { states, callbacks } = useTemplate(resetPasswordEmailTemplate);
  return h$1(TemplateView, { states: states, callbacks: callbacks });
});
const VerifyEmail = createHookStory(() => {
  const { states, callbacks } = useTemplate(verifyEmailTemplate);
  return h$1(TemplateView, { states: states, callbacks: callbacks });
});

const PortalTemplates = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': PortalTemplates_stories,
  DefaultPortal: DefaultPortal,
  MultiProgramPortal: MultiProgramPortal,
  LeadSubmitPortal: LeadSubmitPortal,
  Login: Login,
  ForgotPassword: ForgotPassword,
  Register: Register,
  Dashboard: Dashboard,
  LeadSubmitIframe: LeadSubmitIframe,
  Activity: Activity,
  EditProfile: EditProfile,
  ResetPassword: ResetPassword,
  EmailVerification: EmailVerification,
  EmailVerified: EmailVerified,
  Widget: Widget,
  ResetPasswordEmail: ResetPasswordEmail,
  VerifyEmail: VerifyEmail
});

const ProgramMenu_stories = {
  title: "Program Menu",
};
const OneProgram = createHookStory(() => {
  return (h$1("sqm-program-menu", null,
    h$1("sl-menu-item", { value: "referral-program" }, "Referral Program")));
});
const TwoProgram = createHookStory(() => {
  return (h$1("sqm-program-menu", null,
    h$1("sl-menu-item", { value: "referral-program" }, "Referral Program"),
    h$1("sl-menu-item", { value: "partner-program" }, "Partner Program")));
});
const FiveProgram = createHookStory(() => {
  return (h$1("sqm-program-menu", null,
    h$1("sl-menu-item", { value: "program1" }, "Program 1"),
    h$1("sl-menu-item", { value: "program2" }, "Program 2"),
    h$1("sl-menu-item", { value: "program3" }, "Program 3"),
    h$1("sl-menu-item", { value: "program4" }, "Program 4"),
    h$1("sl-menu-item", { value: "program5" }, "Program 5")));
});
const ProgramMenuWithSwitch = createHookStory(() => {
  return (h$1("div", null,
    h$1("sqb-program-section", { "program-id": "Vacay-referral" },
      h$1("sqm-program-menu", null,
        h$1("sl-menu-item", { value: "Vacay-referral" }, "Vacay-referral"),
        h$1("sl-menu-item", { value: "vacay-affiliates" }, "vacay-affiliates")),
      h$1("sqb-program-switch", null,
        h$1("template", { "program-id": "Vacay-referral" },
          h$1("sqb-widget", { "widget-type": "p/Vacay-referral/w/referrerWidget", demoData: {
              data: { html: dashboardTemplate },
            } })),
        h$1("template", { "program-id": "vacay-affiliates" },
          h$1("sqb-widget", { "widget-type": "p/vacay-affiliates/w/referrerWidget", demoData: {
              data: { html: dashboardTemplate },
            } }))))));
});

const ProgramMenu = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ProgramMenu_stories,
  OneProgram: OneProgram,
  TwoProgram: TwoProgram,
  FiveProgram: FiveProgram,
  ProgramMenuWithSwitch: ProgramMenuWithSwitch
});

const PoweredByImg_stories = {
  title: "Powered By",
};
const Default$1 = () => {
  return h$1(PoweredByImg$1, null);
};
const CustomColor = () => {
  return h$1(PoweredByImg$1, { color: "salmon" });
};
const CustomWidthAndHeight = () => {
  return h$1(PoweredByImg$1, { width: 300, height: 50 });
};

const PoweredByImg = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': PoweredByImg_stories,
  Default: Default$1,
  CustomColor: CustomColor,
  CustomWidthAndHeight: CustomWidthAndHeight
});

const scenario$4 = "Feature: Portal Footer\r\n\r\n    Background: A user is viewing the portal\r\n        Given a hosted portal\r\n        And a user is viewing the portal\r\n        And the portal has a footer\r\n\r\n    Scenario Outline: FAQ and T&C links/text are configurable and open in a new page when clicked\r\n        Given the footer has prop \"terms-link\" with value \"https://example.com/terms\"\r\n        And prop \"terms-text\" with value \"Terms and Conditions\"\r\n        And prop \"faq-link\" with value \"https://example.com/FAQ\"\r\n        And prop \"faq-text\" with value \"Visit FAQ\"\r\n        When a user clicks on the \"Visit FAQ\" link\r\n        Then they will be redirected to \"https://example.com/FAQ\" in a new page\r\n        When they go back to the portal\r\n        And click on the \"Terms and Conditions\" link\r\n        Then they will be redirected to \"https://example.com/terms\" in a new page\r\n\r\n    Scenario Outline: FAQ/T&C Links are not shown if a link is not provided\r\n        Given the footer does not have <linkProp>\r\n        But it <mayHave> <textProp> with <value>\r\n        Then the <link> will not be shown in the footer\r\n        Examples:\r\n            | linkProp   | mayHave      | textProp  | value                | link     |\r\n            | terms-link | has          | termsText | Terms and Conditions | T&C Link |\r\n            | faq-link   | has          | faqText   | Visit FAQ            | FAQ Link |\r\n            | terms-link | doesn't have |           |                      | T&C Link |\r\n            | faq-link   | doesn't have |           |                      | FAQ Link |\r\n\r\n    Scenario Outline: The support email and text is configurable but has a default\r\n        Given the footer <mayHave> <emailPropWithValue>\r\n        And the footer <mayAlsoHave> <textPropWithValue>\r\n        Then the footer's support email text is <renderedEmailText>\r\n        And the email address will be a mailto link with <mailtoEmail>\r\n        When the user clicks on the email address mailto Link\r\n        Then the users preferred email client will open with a draft email to <mailtoEmail>\r\n        Examples:\r\n            | mayHave      | emailPropWithValue     | mayAlsoHave  | textPropWithValue                  | mailtoEmail            | renderedEmailText                                 |\r\n            | has          | support@saasquatch.com | has          | For support please contact {email} | support@saasquatch.com | For support please contact support@saasquatch.com |\r\n            | doesn't have | N/A                    | doesn't have | N/A                                | support@example.com    | For program support, contact support@example.com  |\r\n\r\n    Scenario Outline: Powered by SaaSquatch is shown by default\r\n        Given the footer <mayHaveProp> \"show-powered-by\" with <value>\r\n        Then the powered by SaaSquatch image <mayBeShown>\r\n        Examples:\r\n            | mayHaveProp       | value | mayBeShown  |\r\n            | has prop          | true  | is shown    |\r\n            | has prop          | false | isn't shown |\r\n            | has prop          | test  | is shown    |\r\n            | has prop          |       | is shown    |\r\n            | doesn't have prop |       | is shown    |\r\n\r\n    Scenario: Powered By Saasquatch links out to \"https://saasquatch.com\"\r\n        Given the footer has the powered by SaaSquatch image\r\n        When a user clicks on it\r\n        Then they will be redirected to \"https://saasquatch.com\" in a new page";

const PortalFooter_stories = {
  title: "Portal Footer",
  parameters: {
    scenario: scenario$4,
  },
};
const defaultProps = {
  supportEmail: "support@example.com",
  supportText: "For program support, contact {email}",
  showPoweredBy: true,
  poweredByLink: "https://saasquatch.com",
  paddingTop: "large",
  paddingRight: "large",
  paddingBottom: "large",
  paddingLeft: "large",
};
const DefaultFooter = () => h$1(PortalFooterView, Object.assign({}, defaultProps));
const FooterWithTerms = () => (h$1(PortalFooterView, Object.assign({}, defaultProps, { termsLink: "https://example.com", termsText: "Terms and Conditions" })));
const FooterWithFAQ = () => (h$1(PortalFooterView, Object.assign({}, defaultProps, { faqLink: "https://example.com", faqText: "FAQ" })));
const FooterWithTermsAndFAQ = () => (h$1(PortalFooterView, Object.assign({}, defaultProps, { termsLink: "https://example.com", termsText: "Terms and Conditions", faqLink: "https://example.com", faqText: "FAQ" })));
const FooterNoPoweredBy = () => (h$1(PortalFooterView, Object.assign({}, defaultProps, { termsLink: "https://example.com", termsText: "Terms and Conditions", faqLink: "https://example.com", faqText: "FAQ", showPoweredBy: false })));

const PortalFooter = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': PortalFooter_stories,
  DefaultFooter: DefaultFooter,
  FooterWithTerms: FooterWithTerms,
  FooterWithFAQ: FooterWithFAQ,
  FooterWithTermsAndFAQ: FooterWithTermsAndFAQ,
  FooterNoPoweredBy: FooterNoPoweredBy
});

const scenario$3 = "Feature: Hero Unit\r\n\r\n    Background: A portal with a hero unit exists\r\n        Given a hosted portal\r\n        And the portal has hero unit on the login page\r\n        And a user is viewing the login page\r\n\r\n    Scenario: The hero unit defaults to a single column layout\r\n        Given a hero unit does not have a \"columns\" prop\r\n        But the following html is wrapped by the hero unit\r\n            \"\"\"\r\n            <sqm-portal-login></sqm-portal-login>\r\n            <div slot=\"secondary-column\">\r\n            <h1 style=\"text-align:center\">Get Referring!</h1>\r\n            <p style=\"text-align:center\">\r\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\r\n            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim\r\n            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\r\n            aliquip ex ea commodo consequat. Duis aute irure dolor in\r\n            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\r\n            pariatur.\r\n            </p>\r\n            </div>\r\n            \"\"\"\r\n        Then only a single column will be displayed\r\n        And within it will be the login component\r\n\r\n    Scenario Outline: The hero unit supports single or dual column layouts\r\n        Given a hero unit with prop \"columns\" having <columnValue>\r\n        And it wraps <html>\r\n        Then the hero unit displays <columnValue> columns\r\n        Examples:\r\n            | columnValue | html                                                                                              |\r\n            | 1           | <h1>Column 1!</h1>                                                                                |\r\n            | 2           | <h1>Column 1!</h1><div slot=\"secondary-column\"><h1 style=\"text-align:center\">Column 2!</h1></div> |\r\n\r\n    Scenario: HTML to be displayed in the second column comes from the \"secondary-column\" slot\r\n        Given a hero unit with \"columns\" \"2\"\r\n        And the following html\r\n            \"\"\"\r\n            <h1>Column 1!</h1>\r\n            <div>\r\n            <h1 style=\"text-align:center\">Column 2!</h1>\r\n            </div>\r\n            \"\"\"\r\n        When the hero unit is rendered\r\n        Then only one column is displayed with content\r\n        And column 1 will contain the \"Column 1!\" text\r\n        And column 1 will contain the \"Column 2!\" text\r\n        When the div for column two is updated to have 'slot=\"secondary-column\"'\r\n        Then the two columns are displayed with content\r\n        And column 1 will contain the \"Column 1!\" text\r\n        And column 2 will contain the \"Column 2!\" text\r\n\r\n    Scenario Outline: A background for the hero unit can be set as an image or colour\r\n        Given a hero unit with <backgroundPropValue>\r\n        Then the background will be <background>\r\n        Examples:\r\n            | background                                                  | background               |\r\n            | https://images.unsplash.com/photo-1599676821464-3555954838d | image of misty mountains |\r\n            | LightSlateGrey                                              | light slate grey         |\r\n            | #00FF00                                                     | green                    |\r\n            | rgb(128,0,128)                                              | purple                   |\r\n\r\n    Scenario Outline: Wrap Direction can be configured for mobile experiences\r\n        Given a hero unit with the following HTML\r\n            \"\"\"\r\n            <h1>Column 1!</h1>\r\n            <div slot=\"secondary-column\">\r\n            <h1 style=\"text-align:center\">Column 2!</h1>\r\n            </div>\r\n            \"\"\"\r\n        And prop \"wrap-direction\" has <value>\r\n        When the window width is less than 600px\r\n        Then the two columns will stack\r\n        And <column> will be on top\r\n        Examples:\r\n            | value        | column |\r\n            | wrap         | 1      |\r\n            | wrap-reverse | 2      |\r\n            |              | 1      |";

const Hero_stories = {
  title: "Hero Layout",
  parameters: {
    scenario: scenario$3,
  },
};
const LoginOneColumn = () => {
  const props = {
    states: {
      columns: 1,
      wrapDirection: "wrap",
      paddingSize: "large",
    },
    content: {
      primaryColumn: [
        h$1("h1", { style: { textAlign: "center" } }, "Get Referring!"),
        h$1("sqm-portal-login", null),
      ],
    },
  };
  return (h$1("div", { style: { height: "800px" } },
    h$1(HeroView, Object.assign({}, props))));
};
const LoginOneColumnWithColor = () => {
  const props = {
    states: {
      columns: 1,
      wrapDirection: "wrap",
      paddingSize: "large",
      background: "LightSlateGrey",
    },
    content: {
      primaryColumn: h$1("sqm-portal-login", null),
    },
  };
  return (h$1("div", { style: { height: "800px" } },
    h$1(HeroView, Object.assign({}, props))));
};
const LoginOneColumnWithImage = () => {
  const props = {
    states: {
      columns: 1,
      wrapDirection: "wrap",
      paddingSize: "large",
      background: "https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80",
    },
    content: { primaryColumn: h$1("sqm-portal-login", null) },
  };
  return (h$1("div", { style: { height: "800px" } },
    h$1(HeroView, Object.assign({}, props))));
};
const TwoColumnLoginLargePadding = () => {
  const props = {
    states: {
      columns: 2,
      wrapDirection: "wrap",
      paddingSize: "large",
      background: "https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80",
      secondaryBackground: "LightSlateGrey",
    },
    content: {
      primaryColumn: h$1("sqm-portal-login", null),
      secondaryColumn: (h$1("div", null,
        h$1("h1", { style: { textAlign: "center" } }, "Get Referring!"),
        h$1("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."))),
    },
  };
  return (h$1("div", { style: { height: "800px" } },
    h$1(HeroView, Object.assign({}, props))));
};
const TwoColumnLoginMediumPadding = () => {
  const props = {
    states: {
      columns: 2,
      wrapDirection: "wrap",
      paddingSize: "medium",
      background: "https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80",
      secondaryBackground: "LightSlateGrey",
    },
    content: {
      primaryColumn: h$1("sqm-portal-login", null),
      secondaryColumn: (h$1("div", null,
        h$1("h1", { style: { textAlign: "center" } }, "Get Referring!"),
        h$1("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."))),
    },
  };
  return (h$1("div", { style: { height: "800px" } },
    h$1(HeroView, Object.assign({}, props))));
};
const TwoColumnLoginSmallPadding = () => {
  const props = {
    states: {
      columns: 2,
      wrapDirection: "wrap",
      paddingSize: "small",
      background: "https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80",
      secondaryBackground: "LightSlateGrey",
    },
    content: {
      primaryColumn: h$1("sqm-portal-login", null),
      secondaryColumn: (h$1("div", null,
        h$1("h1", { style: { textAlign: "center" } }, "Get Referring!"),
        h$1("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."))),
    },
  };
  return (h$1("div", { style: { height: "800px" } },
    h$1(HeroView, Object.assign({}, props))));
};
const TwoColumnLoginNoPadding = () => {
  const props = {
    states: {
      columns: 2,
      wrapDirection: "wrap",
      paddingSize: "none",
      background: "https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80",
      secondaryBackground: "LightSlateGrey",
    },
    content: {
      primaryColumn: h$1("sqm-portal-login", null),
      secondaryColumn: (h$1("div", null,
        h$1("h1", { style: { textAlign: "center" } }, "Get Referring!"),
        h$1("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."))),
    },
  };
  return (h$1("div", { style: { height: "800px" } },
    h$1(HeroView, Object.assign({}, props))));
};
const TwoColumnLoginReverseWrap = () => {
  const props = {
    states: {
      columns: 2,
      wrapDirection: "wrap-reverse",
      background: "LightSlateGrey",
      paddingSize: "large",
      secondaryBackground: "https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80",
    },
    content: {
      primaryColumn: h$1("sqm-portal-change-password", null),
      secondaryColumn: (h$1("div", null,
        h$1("h1", { style: { textAlign: "center" } }, "Get Referring!"),
        h$1("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."))),
    },
  };
  return (h$1("div", { style: { height: "800px" } },
    h$1(HeroView, Object.assign({}, props))));
};
const TwoColumnLoginWithImgElement = () => {
  const props = {
    states: {
      columns: 2,
      wrapDirection: "wrap",
      paddingSize: "large",
    },
    content: {
      primaryColumn: (h$1("div", null,
        h$1("h1", { style: { textAlign: "center" } }, "Get Referring!"),
        h$1("sqm-portal-login", null))),
      secondaryColumn: (h$1("div", null,
        h$1("img", { src: "https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" }),
        h$1("p", null, "Pellentesque mauris urna, lacinia non turpis sed, pulvinar congue ligula. Sed mattis condimentum eros nec vulputate. Cras consectetur eget libero at viverra. Aliquam suscipit feugiat ante sit amet sagittis. Fusce pulvinar interdum odio ut dapibus. Nulla aliquet ultricies augue nec dignissim. Morbi vulputate hendrerit sem."))),
    },
  };
  return (h$1("div", { style: { height: "800px" } },
    h$1(HeroView, Object.assign({}, props))));
};

const Hero = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': Hero_stories,
  LoginOneColumn: LoginOneColumn,
  LoginOneColumnWithColor: LoginOneColumnWithColor,
  LoginOneColumnWithImage: LoginOneColumnWithImage,
  TwoColumnLoginLargePadding: TwoColumnLoginLargePadding,
  TwoColumnLoginMediumPadding: TwoColumnLoginMediumPadding,
  TwoColumnLoginSmallPadding: TwoColumnLoginSmallPadding,
  TwoColumnLoginNoPadding: TwoColumnLoginNoPadding,
  TwoColumnLoginReverseWrap: TwoColumnLoginReverseWrap,
  TwoColumnLoginWithImgElement: TwoColumnLoginWithImgElement
});

const scenario$2 = "@owner:sam\r\n@author:sam\r\n\r\nFeature: Referral Iframe\r\n\r\n  Used to provide an external form for submitting referral leads using the current user's referral code\r\n\r\n  Background: A user is logged in\r\n    Given there is a logged in user\r\n\r\n  @motivating\r\n  Scenario: Referral code is passed to the iframe as a query parameter\r\n    Given the \"iframe-src\" is \"https://example.com\"\r\n    And the user has navigated to \"/refer\"\r\n    And the user's referral code is \"BOBBYREFER\"\r\n    When the iframe content is loaded\r\n    Then the iframe url will be \"https://example.com?rsCode=BOBBYREFER\"\r\n\r\n  @ui\r\n  Scenario Outline: The height and width of the iFrame can be controlled via props\r\n    Given the \"iframe-src\" is \"https://example.com\"\r\n    And the iframe content is 1000x1000\r\n    And the \"iframe-height\" is set to <heightValue>\r\n    And the \"iframe-width\" is set to <widthValue>\r\n    Then the content of the iframe will be displayed with scrollbars\r\n    And the dimension of the iFrame displayed will be 500x500\r\n    When the \"iframe-height\" is set to <heightValue>\r\n    And the \"iframe-width\" is set to <widthValue>\r\n    Then the full content of the iframe will be displayed on the page\r\n    And the dimension of the iFrame displayed will be 1000x1000\r\n    Examples:\r\n      | heightValue | widthValue |\r\n      | 500px       | 500px      |\r\n      | 50%         | 50%        |\r\n\r\n  @minutae\r\n  Scenario Outline: The iFrame will fail fast if a iFrame source isn't provided\r\n    Given \"iframe-src\" <mayBeAnAttribute>\r\n    And it <mayHaveValue>\r\n    When a user views the referral iFrame component\r\n    Then an alert with an error message is displayed in place of the iFrame\r\n    And it has a details section\r\n    When \"More details\" is clicked\r\n    Then the following information will be displayed\r\n      | component being used |\r\n      | missing attribute(s) |\r\n\r\n    Examples:\r\n      | mayBeAnAttribute    | mayHaveValue |\r\n      | is not an attribute | N/A          |\r\n      | is an attribute     | \"\"           |\r\n      | is an attribute     |              |";

const ReferralIframe_stories = {
  title: "Referral Iframe",
  parameters: {
    scenario: scenario$2,
  },
};
const props$2 = {
  data: {
    shareCode: "BOBBYREFER",
  },
  states: {
    content: {
      iframeSrc: "https://example.com",
      iframeHeight: "100%",
      iframeWidth: "100%",
    },
  },
};
const ReferralIframe = () => {
  return (h$1("div", { style: { width: "1000px", height: "1000px" } },
    h$1(ReferralIframeView, Object.assign({}, props$2))));
};
const ReferralIframeError = () => {
  return (h$1("div", { style: { width: "1000px", height: "1000px" } },
    h$1("sqm-referral-iframe", null)));
};

const ReferralIframe$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ReferralIframe_stories,
  ReferralIframe: ReferralIframe,
  ReferralIframeError: ReferralIframeError
});

const scenario$1 = "@owner:sam\r\n@author:sam\r\n\r\nFeature: Name Fields\r\n\r\n  Fields to be used to fill the first and last name of a user during registration\r\n\r\n  Background:\r\n    Given the current page is \"/register\"\r\n\r\n  @motivating\r\n  Scenario: Both first name and last name are required\r\n    Given the email field has valid input\r\n    And the password field has valid input\r\n    And first name field is empty\r\n    And last name field is empty\r\n    When register is clicked\r\n    Then the name fields will be highlighted in red\r\n    And the error messages will say \"Cannot be empty\"\r\n\r\n  @motivating\r\n  Scenario: First and last name are upserted with the SaaSquatch user\r\n    Given all fields have been filled with data\r\n      | firstName | lastName  | email           | password        |\r\n      | Bob       | Testerson | bob@example.com | SecurePassword1 |\r\n    When register is clicked\r\n    Then the email verification page will be loaded\r\n    And the user will be upserted\r\n    And the SaaSquatch user will contain data\r\n      | firstName | lastName  | email           |\r\n      | Bob       | Testerson | bob@example.com |\r\n\r\n";

const NameFields_stories = {
  title: "Name Fields",
  parameters: {
    scenario: scenario$1,
  },
};
const props$1 = {
  states: {
    validationErrors: undefined,
    content: {
      firstNameLabel: "First Name",
      lastNameLabel: "Last Name",
    },
  },
};
const errorProps = {
  states: {
    validationErrors: {
      firstName: "Cannot be empty",
      lastName: "Cannot be empty",
    },
    content: {
      firstNameLabel: "First Name",
      lastNameLabel: "Last Name",
    },
  },
};
const NameFields = () => {
  return h$1(NameFieldsView, Object.assign({}, props$1));
};
const NameFieldsWithErrors = () => {
  return h$1(NameFieldsView, Object.assign({}, errorProps));
};

const NameFields$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': NameFields_stories,
  NameFields: NameFields,
  NameFieldsWithErrors: NameFieldsWithErrors
});

const baseResponse = (data, stage = "chooseReward", selectedItem = null, selectedStep = null, error = false, loading = false, fueltank = null) => ({
  states: {
    content: {
      text: {
        buttonText: "Exchange Rewards",
        notAvailableError: "{unavailableReasonCode, select, US_TAX {US Tax limit} INSUFFICIENT_REDEEMABLE_CREDIT {{sourceValue} required} AVAILABILITY_PREDICATE {Not available} other {unavailableReasonCode} }",
        chooseRewardTitle: "Rewards",
        chooseAmountTitle: "Select",
        confirmationTitle: "Confirm",
        rewardTitle: "Choose a reward",
        cancelText: "Cancel",
        backText: "Back",
        continueText: "Continue",
        continueToConfirmationText: "Continue to confirmation",
        redeemText: "Redeem",
        redeemTitle: "Confirm and redeem",
        redemptionSuccessText: "Redeemed {sourceValue} for {destinationValue}",
        doneText: "Done",
        toolTipText: "Copied!",
        selectText: "Select amount to receive",
        sourceAmountMessage: "{ruleType, select, FIXED_GLOBAL_REWARD {{sourceValue}} other {{sourceMinValue} to {sourceMaxValue}}}",
        rewardRedeemedText: "Reward redeemed",
        redemptionError: "An error occured trying to redeem this reward. Please try again",
        promoCode: "Promo code",
        skeletonCardNum: 8,
        rewardNameTitle: "Reward Name",
        rewardAmountTitle: "Reward Amount",
        costTitle: "Cost",
      },
    },
    redeemStage: stage,
    amount: 0,
    exchangeError: error,
    loading: loading,
    selectedItem: selectedItem,
    selectedStep: selectedStep,
    open: false,
  },
  data: {
    exchangeList: data,
    fuelTankCode: fueltank,
  },
  callbacks: {
    exchangeReward: null,
    resetState: null,
    setStage: null,
    setExchangeState: null,
    copyFuelTankCode: null,
    refs: null,
  },
  refs: null,
});
const baseReward = {
  key: "",
  name: "",
  description: "Description of reward. Lorem ipsum dolor sit amet, consectetur adipiscing. Id nec semper sapien dignissim rhoncus nunc.",
  imageUrl: "",
  available: true,
  unavailableReasonCode: null,
  ruleType: "FIXED_GLOBAL_REWARD",
  sourceUnit: "POINT",
  sourceValue: 10,
  prettySourceValue: "10 SaaSquatch Points",
  sourceMinValue: null,
  prettySourceMinValue: null,
  sourceMaxValue: null,
  prettySourceMaxValue: null,
  destinationMinValue: null,
  prettyDestinationMinValue: null,
  destinationMaxValue: null,
  prettyDestinationMaxValue: null,
  globalRewardKey: "",
  destinationUnit: null,
  steps: [],
};
const notEnoughPoints = {
  available: false,
  unavailableReasonCode: "INSUFFICIENT_REDEEMABLE_CREDIT",
};
const usTax = {
  available: false,
  unavailableReasonCode: "US_TAX",
};
const selected = {
  key: "r1",
};
const imageUrl = (props) => ({
  imageUrl: props,
});
const name = (props) => ({
  name: props,
});
const description = (props) => ({
  description: props,
});
const fixedValue = (props) => ({
  prettySourceValue: props,
});
const variableValue = (min, max, unit) => ({
  ruleType: "VARIABLE_CREDIT_REWARD",
  sourceMinValue: min,
  prettySourceMinValue: min + " " + unit,
  sourceMaxValue: max,
  prettySourceMaxValue: max + " " + unit,
});
const data = [
  {
    ...baseReward,
    ...name("Free swag with a promo code"),
    ...imageUrl("https://i.imgur.com/n7vC4BR.png"),
    ...fixedValue("40 SaaSquatch Points"),
  },
  {
    ...baseReward,
    ...selected,
    ...name("Visa® Prepaid Card USD"),
    ...imageUrl("https://i.imgur.com/veHErQX.png"),
    ...variableValue(20, 80, "Points"),
  },
  {
    ...baseReward,
    ...name("A very exclusive gift box"),
    ...imageUrl("https://i.imgur.com/93BvEgH.png"),
    ...fixedValue("30 SaaSquatch Points"),
  },
  {
    ...baseReward,
    ...name("$50 Store credit"),
    ...imageUrl("https://i.imgur.com/WkCMVSE.png"),
    ...fixedValue("100 SaaSquatch Points"),
  },
  {
    ...baseReward,
    ...name("Variable amount of store credit"),
    ...imageUrl("https://i.imgur.com/Jn2fE0s.png"),
    ...variableValue(20, 100, "Points"),
  },
  {
    ...baseReward,
    ...notEnoughPoints,
    ...name("A very rare cactus"),
    ...imageUrl("https://i.imgur.com/hhlF2Ey.png"),
    ...fixedValue("2000 SaaSquatch Points"),
  },
  {
    ...baseReward,
    ...usTax,
    ...name("$1000 Store credit with a really super long name in the front page"),
    ...imageUrl("https://i.imgur.com/y9HSls1.png"),
    ...fixedValue("2000 SaaSquatch Long Points"),
  },
  {
    ...baseReward,
    ...notEnoughPoints,
    ...name("A holiday gift box"),
    ...imageUrl("https://i.imgur.com/dWEdB3p.png"),
    ...fixedValue("100 SaaSquatch Points"),
  },
];
const rewardExchange = {
  ...baseResponse(data),
};
const rewardExchangeSelected = {
  ...baseResponse(data, "chooseReward", {
    ...baseReward,
    ...selected,
    ...name("Visa® Prepaid Card USD"),
    ...imageUrl("https://i.imgur.com/veHErQX.png"),
    ...variableValue(20, 80, "Points"),
  }),
};
const stepsData = (start, end, inc) => {
  const steps = [];
  for (let i = start; i <= end; i += inc) {
    steps.push({
      sourceValue: i,
      prettySourceValue: i + " SaaSquatch Points",
      destinationValue: i,
      prettyDestinationValue: "$" + i,
      available: true,
      unavailableReasonCode: null,
    });
  }
  return steps;
};
const baseStep = (dst, dstUnit, src, srcUnit, available = true) => ({
  destinationValue: dst,
  prettyDestinationValue: dstUnit + dst,
  sourceValue: src,
  prettySourceValue: src + " " + srcUnit,
  available: available,
  unavailableReasonCode: null,
});
const chooseAmountVariable = {
  ...baseResponse(data, "chooseAmount", {
    ...baseReward,
    ...name("Visa® Prepaid Card USD"),
    ...imageUrl("https://i.imgur.com/veHErQX.png"),
    ...variableValue(20, 80, "Points"),
    steps: [
      baseStep(20, "$", 40, "Points"),
      baseStep(30, "$", 60, "Points"),
      baseStep(40, "$", 80, "Points"),
      baseStep(50, "$", 100, "Points"),
      baseStep(60, "$", 120, "Points"),
    ],
  }),
};
const chooseAmountVariableDisabled$1 = {
  ...baseResponse(data, "chooseAmount", {
    ...baseReward,
    ...name("Visa® Prepaid Card USD"),
    ...imageUrl("https://i.imgur.com/veHErQX.png"),
    ...variableValue(20, 80, "Points"),
    steps: [
      baseStep(20, "$", 40, "Points"),
      baseStep(30, "$", 60, "Points"),
      baseStep(40, "$", 80, "Points", false),
      baseStep(50, "$", 100, "Points", false),
      baseStep(60, "$", 120, "Points", false),
    ],
  }),
};
const chooseAmountFixed = {
  ...baseResponse(data, "chooseAmount", {
    ...baseReward,
    ...name("Free swag with a promo code"),
    ...imageUrl("https://i.imgur.com/n7vC4BR.png"),
    ...fixedValue("40 SaaSquatch Points"),
  }),
};
const confirmFixed = {
  ...baseResponse(data, "confirmation", {
    ...baseReward,
    ...name("Free swag with a promo code"),
    ...imageUrl("https://i.imgur.com/n7vC4BR.png"),
    ...fixedValue("40 SaaSquatch Points"),
  }),
};
const confirmVariable = {
  ...baseResponse(data, "confirmation", {
    ...baseReward,
    ...name("Visa® Prepaid Card USD"),
    ...imageUrl("https://i.imgur.com/veHErQX.png"),
    ...variableValue(20, 80, "Points"),
  }, baseStep(20, "$", 40, "Points")),
};
const error$1 = {
  ...baseResponse(data, "confirmation", {
    ...baseReward,
    ...name("Visa® Prepaid Card USD"),
    ...imageUrl("https://i.imgur.com/veHErQX.png"),
    ...variableValue(20, 80, "Points"),
  }, baseStep(20, "$", 40, "Points"), true),
};
const success = {
  ...baseResponse(data, "success", {
    ...baseReward,
    ...name("Free swag with a promo code"),
    ...imageUrl("https://i.imgur.com/n7vC4BR.png"),
    ...fixedValue("40 SaaSquatch Points"),
  }, undefined, undefined, undefined, "4ah2-hh46-gk7r"),
};
const successVariable = {
  ...baseResponse(data, "success", {
    ...baseReward,
    ...name("Visa® Prepaid Card USD"),
    ...imageUrl("https://i.imgur.com/93BvEgH.png"),
    ...variableValue(20, 80, "Points"),
  }, baseStep(20, "$", 40, "Points")),
};
const loading = {
  ...baseResponse(null, "chooseReward", null, null, false, true),
};

const RewardExchangeList_stories = {
  title: "Components/Reward Exchange List",
};
const StoryBase = (props) => () => {
  return (h$1(RewardExchangeView, Object.assign({}, props))
  // <Resizer>
  // </Resizer>
  );
};
const ChooseReward = StoryBase(rewardExchange);
const ChooseRewardSelected = StoryBase(rewardExchangeSelected);
const ChooseAmount = StoryBase(chooseAmountFixed);
const ChooseAmountVariable = StoryBase(chooseAmountVariable);
const chooseAmountVariableDisabled = StoryBase(chooseAmountVariableDisabled$1);
const Confirm = StoryBase(confirmFixed);
const ConfirmVariable = StoryBase(confirmVariable);
const Error$1 = StoryBase(error$1);
const SuccessPromo = StoryBase(success);
const SuccessVariable = StoryBase(successVariable);
const Loading = StoryBase(loading);

const RewardExchangeList = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': RewardExchangeList_stories,
  ChooseReward: ChooseReward,
  ChooseRewardSelected: ChooseRewardSelected,
  ChooseAmount: ChooseAmount,
  ChooseAmountVariable: ChooseAmountVariable,
  chooseAmountVariableDisabled: chooseAmountVariableDisabled,
  Confirm: Confirm,
  ConfirmVariable: ConfirmVariable,
  Error: Error$1,
  SuccessPromo: SuccessPromo,
  SuccessVariable: SuccessVariable,
  Loading: Loading
});

const ProgramExplainer_stories = {
  title: "Components/Program Explainer",
};
const OneStep = () => {
  return (h$1("sqm-program-explainer", { header: "How it works" },
    h$1("sqm-program-explainer-step", { header: "Get up to $1250 for inviting friends to Klip", description: "Share your referral link with a friend and earn up to $1250", icon: "person-plus-fill" }),
    h$1("sqm-program-explainer-step", { header: "Earn points for using Klip", description: "Complete tasks like uploading your first video or sharing videos with friends", icon: "server" }),
    h$1("sqm-program-explainer-step", { header: "Redeem rewards with your points", description: "Redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America", icon: "people-fill" })));
};
const Custom = () => {
  return (h$1("sqm-program-explainer", { header: "How it works", "text-color": "#fffc4b", "background-color": "#ff7f7f" },
    h$1("sqm-program-explainer-step", { header: "Get up to $1250 for inviting friends to Klip", description: "Share your referral link with a friend and earn up to $1250", icon: "person-plus-fill" }),
    h$1("sqm-program-explainer-step", { header: "Earn points for using Klip", description: "Complete tasks like uploading your first video or sharing videos with friends", icon: "server" }),
    h$1("sqm-program-explainer-step", { header: "Redeem rewards with your points", description: "Redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America", icon: "people-fill" })));
};
// export const TwoSteps = () => {
//   return (
//     <ProgramExplainerView {...props}>
//       <ProgramExplainerStepView {...steps1} />
//       <ProgramExplainerStepView {...steps2} />
//     </ProgramExplainerView>
//   );
// };
// export const ThreeSteps = () => {
//   return (
//     <ProgramExplainerView {...props}>
//       <ProgramExplainerStepView {...steps1} />
//       <ProgramExplainerStepView {...steps2} />
//       <ProgramExplainerStepView {...steps3} />
//     </ProgramExplainerView>
//   );
// };

const ProgramExplainer = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ProgramExplainer_stories,
  OneStep: OneStep,
  Custom: Custom
});

const ProgramExplainerStep_stories = {
  title: "Components/Program Explainer Step",
};
const ProgramExplainerStep = () => {
  return (h$1("sqm-program-explainer-step", { header: "Get up to $1250 for inviting friends to Klip", description: "Send your referral link to a friend or share it through email, Twitter, or Facebook", icon: "person-plus-fill" }));
};
const ProgramExplainerStepCustom = () => {
  return (h$1("sqm-program-explainer-step", { header: "Invite your friends to Klip", description: "Send your referral link to a friend or share it through email, Twitter, or Facebook", "image-url": "https://i.imgur.com/Uqn3aXw.png", "text-color": "#fffc4b", "background-color": "#ff7f7f" }));
};

const ProgramExplainerStep$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ProgramExplainerStep_stories,
  ProgramExplainerStep: ProgramExplainerStep,
  ProgramExplainerStepCustom: ProgramExplainerStepCustom
});

const SqmBrand_stories = {
  title: "Components/Brand",
};
const SampleComponents = () => (h$1("div", { style: { padding: "10px", border: "5px solid #EEE" } },
  h$1("div", { style: { display: "flex", gap: "5px", padding: "5px" } },
    h$1("sl-button", { type: "default" }, "Default"),
    h$1("sl-button", { type: "primary" }, "Primary"),
    h$1("sl-button", { type: "success" }, "Success"),
    h$1("sl-button", { type: "neutral" }, "Neutral"),
    h$1("sl-button", { type: "warning" }, "Warning"),
    h$1("sl-button", { type: "danger" }, "Danger")),
  h$1("div", { style: { display: "flex", gap: "5px", padding: "5px" } },
    h$1("sl-badge", { type: "primary" }, "Primary"),
    h$1("sl-badge", { type: "success" }, "Success"),
    h$1("sl-badge", { type: "neutral" }, "Neutral"),
    h$1("sl-badge", { type: "warning" }, "Warning"),
    h$1("sl-badge", { type: "danger" }, "Danger")),
  h$1("div", { class: "color-palette" },
    h$1("div", { class: "color-palette__name" },
      "Primary",
      h$1("br", null),
      h$1("code", null,
        "--sl-color-primary-",
        h$1("em", null, `{n}`))),
    h$1("div", { style: { display: "flex", gap: "5px" } },
      h$1(ColorSwatch, { depth: 50 }),
      h$1(ColorSwatch, { depth: 100 }),
      h$1(ColorSwatch, { depth: 200 }),
      h$1(ColorSwatch, { depth: 300 }),
      h$1(ColorSwatch, { depth: 400 }),
      h$1(ColorSwatch, { depth: 500 }),
      h$1(ColorSwatch, { depth: 600 }),
      h$1(ColorSwatch, { depth: 700 }),
      h$1(ColorSwatch, { depth: 800 }),
      h$1(ColorSwatch, { depth: 900 }),
      h$1(ColorSwatch, { depth: 950 })))));
const Examples = () => {
  return (h$1("div", null,
    h$1(SampleComponents, null),
    h$1("sqm-brand", { "brand-color": "#FF0000" },
      h$1(SampleComponents, null)),
    h$1("sqm-brand", { "brand-color": "#00FF00" },
      h$1(SampleComponents, null)),
    h$1("sqm-brand", { "brand-color": "#0000FF" },
      h$1(SampleComponents, null)),
    h$1("sqm-brand", { "brand-color": "#000000" },
      h$1(SampleComponents, null))));
};
const Nested = () => {
  return (h$1("div", null,
    "Default ",
    h$1(SampleComponents, null),
    h$1("sqm-brand", { "brand-color": "#FF0000" },
      "Red:",
      h$1(SampleComponents, null),
      h$1("sqm-brand", { "brand-color": "#00FF00" },
        "Green:",
        h$1(SampleComponents, null),
        h$1("sqm-brand", { "brand-color": "#0000FF" },
          "Blue:",
          h$1(SampleComponents, null),
          h$1("sqm-brand", { "brand-color": "#000000" },
            "Black:",
            h$1(SampleComponents, null)))))));
};
function ColorSwatch({ depth }) {
  return (h$1("div", { style: {
      backgroundColor: `var(--sl-color-primary-${depth})`,
      color: `var(--sl-color-neutral-${1000 - depth})`,
      width: "50px",
      height: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    } }, depth));
}
const Fonts = () => {
  return (h$1("div", null,
    h$1(SampleComponents, null),
    h$1("sqm-brand", { "brand-font": "Roboto" },
      "Roboto",
      h$1(SampleComponents, null)),
    h$1("sqm-brand", { "brand-font": "Open Sans" },
      "Open Sans",
      h$1(SampleComponents, null)),
    h$1("sqm-brand", { "brand-font": "Lato" },
      "Lato",
      h$1(SampleComponents, null)),
    h$1("sqm-brand", { "brand-font": "Oswald" },
      "Oswald",
      h$1(SampleComponents, null))));
};

const BrandStories = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': SqmBrand_stories,
  Examples: Examples,
  Nested: Nested,
  Fonts: Fonts
});

const CardFeed_stories = {
  title: "Components/Card Feed",
};
const props = {
  width: 347,
  gap: 24,
};
const taskCardProps = {
  content: {
    rewardAmount: "20",
    rewardUnit: "SaaSquatch Points",
    cardTitle: "Complete a survey",
    description: "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    repeatable: false,
    showProgressBar: false,
    steps: false,
    completedText: "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}",
    buttonText: "Take survey",
    buttonLink: "https://example.com/",
    openNewTab: false,
    showExpiry: false,
    rewardDuration: null,
    expiryMessage: "Ends {endDate}",
    startsOnMessage: "Starts {startDate}",
    endedMessage: "Ended {endDate}",
    finite: 0,
    goal: 1,
    locale: "en"
  },
  states: { progress: 0, loading: false, loadingEvent: false },
};
const coupleActions = {
  content: {
    rewardAmount: "40",
    rewardUnit: "SaaSquatch Points",
    cardTitle: "Comment on 5 articles",
    description: "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    repeatable: false,
    showProgressBar: true,
    completedText: "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}",
    steps: true,
    buttonText: "Take survey",
    buttonLink: "https://example.com/",
    openNewTab: false,
    showExpiry: false,
    rewardDuration: null,
    expiryMessage: "Ends {endDate}",
    startsOnMessage: "Starts {startDate}",
    endedMessage: "Ended {endDate}",
    finite: 0,
    goal: 5,
    locale: "en"
  },
  states: { progress: 1, loading: false, loadingEvent: false },
};
const manyActions = {
  content: {
    rewardAmount: "150",
    rewardUnit: "SaaSquatch Points",
    cardTitle: "Spend $500 at our Store",
    description: "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    repeatable: false,
    showProgressBar: true,
    steps: false,
    completedText: "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}",
    progressBarUnit: "$",
    buttonText: "Take survey",
    buttonLink: "https://example.com/",
    openNewTab: false,
    showExpiry: false,
    rewardDuration: null,
    expiryMessage: "Ends {endDate}",
    startsOnMessage: "Starts {startDate}",
    endedMessage: "Ended {endDate}",
    finite: 0,
    goal: 500,
    locale: "en"
  },
  states: {
    progress: 100,
    loading: false,
    loadingEvent: false,
  },
};
const TaskCardGrid = () => {
  return (h$1(CardFeedView, Object.assign({}, props),
    h$1(TaskCardView, Object.assign({}, taskCardProps)),
    h$1("div", null,
      h$1(TaskCardView, Object.assign({}, coupleActions))),
    h$1("div", null,
      h$1("div", null,
        h$1(TaskCardView, Object.assign({}, taskCardProps)))),
    h$1(TaskCardView, Object.assign({}, coupleActions)),
    h$1(TaskCardView, Object.assign({}, coupleActions)),
    h$1("div", null,
      h$1(TaskCardView, Object.assign({}, coupleActions))),
    h$1("div", null,
      h$1("div", null,
        h$1(TaskCardView, Object.assign({}, taskCardProps)))),
    h$1(TaskCardView, Object.assign({}, manyActions))));
};

const CardFeed = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': CardFeed_stories,
  TaskCardGrid: TaskCardGrid
});

const scenario = "Feature: Portal Container\r\n\r\n\r\n    Scenario: Horizontal content overflows, but does not stretch\r\n\r\n        Bad elements should not affect other elements in the page\r\n\r\n        Given there are two element in the container\r\n        And the first is small\r\n        And the second would stretch the container wider than it's parent\r\n        Then the second one is clipped\r\n        And the first one doesn't stretch\r\n\r\n    @landmine\r\n    Scenario: `max-width` is required for displaying as a row\r\n        Given I have `direction` to \"row\"\r\n        And I have not set a `max-width`\r\n        Then it will display as a column\r\n";

const PortalContainer_stories = {
  title: "Components/Portal Container",
  parameters: {
    scenario,
  },
};
const TooWideColumn = () => (h$1("div", { style: { width: "200px", border: "1px dashed grey" } },
  h$1("sqm-portal-container", null,
    h$1("div", { style: { background: "grey", border: "1px solid red" } }, "Small"),
    h$1("div", { style: { background: "lightblue", width: "1000px" } }, "Too wide, content goes off the side of the page for ever and is hidden."))));
const TooWideRow = () => (h$1("div", { style: { width: "500px", border: "1px dashed grey" } },
  h$1("sqm-portal-container", { direction: "row", "min-width": "160px" },
    h$1("sqm-share-button", { icon: "envelope", medium: "email", size: "medium", class: "hydrated" }, "Email a friend"),
    h$1("sqm-share-button", { medium: "twitter", size: "medium", class: "hydrated" }, "Tweet about us"),
    h$1("sqm-share-button", { medium: "facebook", size: "medium", class: "hydrated" }, "Share on Facebook"))));
const HalfWidth = () => (h$1("div", { style: { width: "1000px", border: "1px dashed grey" } },
  h$1("sqm-portal-container", { direction: "row", minWidth: "160px", maxWidth: "50%" },
    h$1("sqm-share-button", { icon: "envelope", medium: "email", size: "medium", class: "hydrated" }, "Email a friend"),
    h$1("sqm-share-button", { medium: "twitter", size: "medium", class: "hydrated" }, "Tweet about us"),
    h$1("sqm-share-button", { medium: "facebook", size: "medium", class: "hydrated" }, "Share on Facebook"))));
const FullWidth = () => (h$1("div", { style: { width: "1000px", border: "1px dashed grey" } },
  h$1("sqm-portal-container", { direction: "row", maxWidth: "100%" },
    h$1("sqm-share-button", { icon: "envelope", medium: "email", size: "medium", class: "hydrated" }, "Email a friend"),
    h$1("sqm-share-button", { medium: "twitter", size: "medium", class: "hydrated" }, "Tweet about us"),
    h$1("sqm-share-button", { medium: "facebook", size: "medium", class: "hydrated" }, "Share on Facebook"))));

const PortalContainer = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': PortalContainer_stories,
  TooWideColumn: TooWideColumn,
  TooWideRow: TooWideRow,
  HalfWidth: HalfWidth,
  FullWidth: FullWidth
});

const RewardsTableCell_stories = {
  title: "Components/Rewards Table Cell",
};
const rewardsData = {
  id: "61c100117a82a376d8804166",
  type: "CREDIT",
  value: 19,
  unit: "TESTUNIT",
  name: null,
  dateGiven: 1640038417468,
  dateExpires: null,
  dateCancelled: null,
  dateRedeemed: null,
  dateScheduledFor: null,
  fuelTankCode: null,
  fuelTankType: null,
  currency: null,
  prettyValue: "19 Points",
  prettyValueNumber: "19",
  prettyAvailableNumber: "19",
  prettyRedeemedNumber: "0",
  statuses: ["AVAILABLE"],
  globalRewardKey: null,
  rewardSource: "MANUAL",
  prettyRedeemedCredit: "0 Points",
  prettyAssignedCredit: "19 Points",
  prettyAvailableValue: "19 Points",
  exchangedRewardRedemptionTransaction: null,
  referral: null,
  rewardRedemptionTransactions: {
    data: null,
  },
};
const RewardsCellCreditFull = () => {
  return (h$1("sqm-rewards-table-reward-cell", { reward: { ...rewardsData }, availableText: "19 Points remaining" }));
};
const partial = {
  prettyAvailableValue: "10 Points",
  prettyRedeemedCredit: "9 Points",
  prettyRedeemedNumber: "9",
  dateRedeemed: 1640038417468,
};
const RewardsCellCreditPartial = () => {
  return (h$1("sqm-rewards-table-reward-cell", { reward: { ...rewardsData, ...partial }, availableText: "10 Points remaining" }));
};
const empty = {
  prettyAvailableValue: "0 Points",
  prettyRedeemedCredit: "19 Points",
  prettyRedeemedNumber: "19",
  dateRedeemed: 1640038417468,
};
const RewardsCellCreditEmpty = () => {
  return (h$1("sqm-rewards-table-reward-cell", { reward: { ...rewardsData, ...empty }, availableText: "0 Points remaining" }));
};
const singleRedeemed = {
  prettyValue: "1 Points",
  prettyValueNumber: "1",
  prettyAvailableNumber: "1",
  prettyAvailableValue: "0 Points",
  prettyRedeemedCredit: "1 Points",
  prettyRedeemedNumber: "1",
  dateRedeemed: 1640038417468,
};
const RewardsCellSingleRedeemed = () => {
  return (h$1("sqm-rewards-table-reward-cell", { reward: { ...rewardsData, ...singleRedeemed } }));
};
const RewardsCellNonCredit = () => {
  return (h$1("sqm-rewards-table-reward-cell", { reward: { ...rewardsData, type: "FUELTANK", prettyValue: "SaaSquatch Giftcard" } }));
};
const SourceCellText = () => {
  return (h$1("sqm-rewards-table-source-cell", { reward: rewardsData, rewardSourceText: "Manual" }));
};
const exchange = {
  exchangedRewardRedemptionTransaction: {
    id: "61c100117a82a376d88041196",
    creditRedeemed: 1,
    prettyRedeemedCredit: "1 Money",
    unit: "TESTUNIT",
    dateRedeemed: 1640038417173,
    redeemedRewards: null,
    exchangedRewards: null,
  },
};
const SourceCellExchange = () => {
  return (h$1("sqm-rewards-table-source-cell", { reward: { ...rewardsData, ...exchange }, rewardExchangeText: "Reward Exchange" }));
};
const johnDoe = {
  firstName: "John",
  lastName: "Doe",
  imageUrl: null,
};
const anon = {
  firstName: "",
  lastName: "",
  imageUrl: null,
};
const referral = (user = null) => {
  return {
    rewardSource: "FRIEND_SIGNUP",
    referral: {
      id: "123",
      dateConverted: 1640038417173,
      dateReferralStarted: 1640038417173,
      dateReferralPaid: 1640038417173,
      dateReferralEnded: null,
      moderationStatus: null,
      rewards: null,
      referrerUser: user,
      referredUser: user,
    },
  };
};
const referred = (user = null) => {
  return {
    rewardSource: "REFERRED",
    referral: {
      id: "123",
      dateConverted: 1640038417173,
      dateReferralStarted: 1640038417173,
      dateReferralPaid: 1640038417173,
      dateReferralEnded: null,
      moderationStatus: null,
      rewards: null,
      referrerUser: user,
      referredUser: user,
    },
  };
};
const SourceCellReferral = () => {
  return (h$1("sqm-rewards-table-source-cell", { reward: { ...rewardsData, ...referral(johnDoe) }, referralText: "Referral to" }));
};
const SourceCellReferred = () => {
  return (h$1("sqm-rewards-table-source-cell", { reward: { ...rewardsData, ...referred(johnDoe) }, referralText: "Referred by" }));
};
const SourceCellAnonymousUser = () => {
  return (h$1("sqm-rewards-table-source-cell", { reward: { ...rewardsData, ...referral(anon) }, referralText: "Referral to", anonymousUserText: "Anonymous User" }));
};
const SourceCellDeletedUser = () => {
  return (h$1("sqm-rewards-table-source-cell", { reward: { ...rewardsData, ...referral(null) }, referralText: "Referral to", deletedUserText: "Deleted User" }));
};
const StatusCellAvailable = () => {
  return (h$1("sqm-rewards-table-status-cell", { statusText: "Available", reward: rewardsData }));
};
const expire = {
  dateExpires: 1640038417468,
};
const StatusCellAvailableExpiry = () => {
  return (h$1("sqm-rewards-table-status-cell", { statusText: "Available", reward: { ...rewardsData, ...expire }, expiryText: "Expires" }));
};
const redeemed = {
  statuses: ["REDEEMED"],
  dateRedeemed: 1640038417468,
};
const StatusCellRedeemed = () => {
  return (h$1("sqm-rewards-table-status-cell", { statusText: "Redeemed", reward: { ...rewardsData, ...redeemed } }));
};
const cancelled = {
  statuses: ["CANCELLED"],
  dateCancelled: 1640038417468,
};
const StatusCellCancelled = () => {
  return (h$1("sqm-rewards-table-status-cell", { statusText: "Cancelled", reward: { ...rewardsData, ...cancelled } }));
};
const expired = {
  statuses: ["EXPIRED"],
  dateExpires: 1640038417468,
};
const StatusCellExpired = () => {
  return (h$1("sqm-rewards-table-status-cell", { statusText: "Expired", reward: { ...rewardsData, ...expired } }));
};
const pending = {
  statuses: ["PENDING"],
};
const StatusCellPending = () => {
  return (h$1("sqm-rewards-table-status-cell", { statusText: "Pending", reward: { ...rewardsData, ...pending } }));
};
const DateCell = () => {
  return (h$1("sqm-rewards-table-date-cell", { date: 1640038417468 }));
};
const EmptyCell$1 = () => {
  return h$1("sqm-rewards-table-date-cell", null);
};

const RewardsTableCell = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': RewardsTableCell_stories,
  RewardsCellCreditFull: RewardsCellCreditFull,
  RewardsCellCreditPartial: RewardsCellCreditPartial,
  RewardsCellCreditEmpty: RewardsCellCreditEmpty,
  RewardsCellSingleRedeemed: RewardsCellSingleRedeemed,
  RewardsCellNonCredit: RewardsCellNonCredit,
  SourceCellText: SourceCellText,
  SourceCellExchange: SourceCellExchange,
  SourceCellReferral: SourceCellReferral,
  SourceCellReferred: SourceCellReferred,
  SourceCellAnonymousUser: SourceCellAnonymousUser,
  SourceCellDeletedUser: SourceCellDeletedUser,
  StatusCellAvailable: StatusCellAvailable,
  StatusCellAvailableExpiry: StatusCellAvailableExpiry,
  StatusCellRedeemed: StatusCellRedeemed,
  StatusCellCancelled: StatusCellCancelled,
  StatusCellExpired: StatusCellExpired,
  StatusCellPending: StatusCellPending,
  DateCell: DateCell,
  EmptyCell: EmptyCell$1
});

const RewardsTable_stories = {
  title: "Components/Rewards Table",
};
const test = {
  states: {
    hasNext: true,
    hasPrev: false,
    show: "rows",
    namespace: "sqm-rewards-table",
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: "Prev",
      moreLabel: "Next",
    },
    hiddenColumns: "0",
    smBreakpoint: 599,
    mdBreakpoint: 899,
  },
  callbacks: {},
  elements: {
    columns: ["Reward", "Status", "Source", "Date received"],
    rows: [
      [
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-reward-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            reward: {
              id: "5cae6b16cc540e209db45cfa",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934550726,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6b0fcc540e209db45b53",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6b0ce4b0d81c67b78e82",
                  firstName: "Aaron",
                  lastName: "Hernandez",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            redeemedText: "{redeemedAmount} redeemed",
            availableText: "{availableAmount} available",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-status-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            statusText: "{status, select, AVAILABLE {Available} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }",
            reward: {
              id: "5cae6b16cc540e209db45cfa",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934550726,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6b0fcc540e209db45b53",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6b0ce4b0d81c67b78e82",
                  firstName: "Aaron",
                  lastName: "Hernandez",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            expiryText: "Expires on ",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-source-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            reward: {
              id: "5cae6b16cc540e209db45cfa",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934550726,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6b0fcc540e209db45b53",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6b0ce4b0d81c67b78e82",
                  firstName: "Aaron",
                  lastName: "Hernandez",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            anonymousUserText: "Anonymous User",
            deletedUserText: "Deleted User",
            rewardExchangeText: "Reward Exchange",
            referralText: "{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}",
            rewardSourceText: "{rewardSource, select, MANUAL {Manual} AUTOMATED {Automated} other {}}",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-date-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            date: 1554934550726,
          },
          $key$: null,
          $name$: null,
        },
      ],
      [
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-reward-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            reward: {
              id: "5cae6ab7cc540e209db456cc",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934455495,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6a92cc540e209db45106",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6a8fe4b0d81c67b78e60",
                  firstName: "Brian",
                  lastName: "Mendez",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            redeemedText: "{redeemedAmount} redeemed",
            availableText: "{availableAmount} available",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-status-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            statusText: "{status, select, AVAILABLE {Available} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }",
            reward: {
              id: "5cae6ab7cc540e209db456cc",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934455495,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6a92cc540e209db45106",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6a8fe4b0d81c67b78e60",
                  firstName: "Brian",
                  lastName: "Mendez",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            expiryText: "Expires on ",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-source-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            reward: {
              id: "5cae6ab7cc540e209db456cc",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934455495,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6a92cc540e209db45106",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6a8fe4b0d81c67b78e60",
                  firstName: "Brian",
                  lastName: "Mendez",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            anonymousUserText: "Anonymous User",
            deletedUserText: "Deleted User",
            rewardExchangeText: "Reward Exchange",
            referralText: "{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}",
            rewardSourceText: "{rewardSource, select, MANUAL {Manual} AUTOMATED {Automated} other {}}",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-date-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            date: 1554934455495,
          },
          $key$: null,
          $name$: null,
        },
      ],
      [
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-reward-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            reward: {
              id: "5cae6a46cc540e209db44cf2",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934342984,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6a42cc540e209db44b5a",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6a40e4b0d81c67b78e3e",
                  firstName: "Loretta",
                  lastName: "Harper",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            redeemedText: "{redeemedAmount} redeemed",
            availableText: "{availableAmount} available",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-status-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            statusText: "{status, select, AVAILABLE {Available} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }",
            reward: {
              id: "5cae6a46cc540e209db44cf2",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934342984,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6a42cc540e209db44b5a",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6a40e4b0d81c67b78e3e",
                  firstName: "Loretta",
                  lastName: "Harper",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            expiryText: "Expires on ",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-source-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            reward: {
              id: "5cae6a46cc540e209db44cf2",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934342984,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6a42cc540e209db44b5a",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6a40e4b0d81c67b78e3e",
                  firstName: "Loretta",
                  lastName: "Harper",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            anonymousUserText: "Anonymous User",
            deletedUserText: "Deleted User",
            rewardExchangeText: "Reward Exchange",
            referralText: "{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}",
            rewardSourceText: "{rewardSource, select, MANUAL {Manual} AUTOMATED {Automated} other {}}",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-date-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            date: 1554934342984,
          },
          $key$: null,
          $name$: null,
        },
      ],
    ],
    emptyElement: {
      $flags$: 0,
      $tag$: "slot",
      $text$: null,
      $elm$: null,
      $children$: [
        {
          $flags$: 0,
          $tag$: "div",
          $text$: null,
          $elm$: null,
          $children$: [
            {
              $flags$: 0,
              $tag$: "sqm-text",
              $text$: null,
              $elm$: null,
              $children$: [
                {
                  $flags$: 0,
                  $tag$: "h3",
                  $text$: null,
                  $elm$: null,
                  $children$: [
                    {
                      $flags$: 0,
                      $tag$: null,
                      $text$: "No Rewards Yet",
                      $elm$: null,
                      $children$: null,
                      $attrs$: null,
                      $key$: null,
                      $name$: null,
                    },
                  ],
                  $attrs$: {
                    style: {
                      color: "#777777",
                    },
                  },
                  $key$: null,
                  $name$: null,
                },
              ],
              $attrs$: null,
              $key$: null,
              $name$: null,
            },
          ],
          $attrs$: {
            style: {
              width: "100%",
            },
          },
          $key$: null,
          $name$: null,
        },
      ],
      $attrs$: {
        name: "empty",
      },
      $key$: null,
      $name$: "empty",
    },
    loadingElement: {
      $flags$: 0,
      $tag$: "slot",
      $text$: null,
      $elm$: null,
      $children$: [
        {
          $flags$: 0,
          $tag$: "sqm-table-row",
          $text$: null,
          $elm$: null,
          $children$: [
            {
              $flags$: 0,
              $tag$: "sqm-table-cell",
              $text$: null,
              $elm$: null,
              $children$: [
                {
                  $flags$: 0,
                  $tag$: "sl-skeleton",
                  $text$: null,
                  $elm$: null,
                  $children$: null,
                  $attrs$: null,
                  $key$: null,
                  $name$: null,
                },
              ],
              $attrs$: {
                colspan: 5,
              },
              $key$: null,
              $name$: null,
            },
          ],
          $attrs$: null,
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-table-row",
          $text$: null,
          $elm$: null,
          $children$: [
            {
              $flags$: 0,
              $tag$: "sqm-table-cell",
              $text$: null,
              $elm$: null,
              $children$: [
                {
                  $flags$: 0,
                  $tag$: "sl-skeleton",
                  $text$: null,
                  $elm$: null,
                  $children$: null,
                  $attrs$: null,
                  $key$: null,
                  $name$: null,
                },
              ],
              $attrs$: {
                colspan: 5,
              },
              $key$: null,
              $name$: null,
            },
          ],
          $attrs$: null,
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-table-row",
          $text$: null,
          $elm$: null,
          $children$: [
            {
              $flags$: 0,
              $tag$: "sqm-table-cell",
              $text$: null,
              $elm$: null,
              $children$: [
                {
                  $flags$: 0,
                  $tag$: "sl-skeleton",
                  $text$: null,
                  $elm$: null,
                  $children$: null,
                  $attrs$: null,
                  $key$: null,
                  $name$: null,
                },
              ],
              $attrs$: {
                colspan: 5,
              },
              $key$: null,
              $name$: null,
            },
          ],
          $attrs$: null,
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-table-row",
          $text$: null,
          $elm$: null,
          $children$: [
            {
              $flags$: 0,
              $tag$: "sqm-table-cell",
              $text$: null,
              $elm$: null,
              $children$: [
                {
                  $flags$: 0,
                  $tag$: "sl-skeleton",
                  $text$: null,
                  $elm$: null,
                  $children$: null,
                  $attrs$: null,
                  $key$: null,
                  $name$: null,
                },
              ],
              $attrs$: {
                colspan: 5,
              },
              $key$: null,
              $name$: null,
            },
          ],
          $attrs$: null,
          $key$: null,
          $name$: null,
        },
      ],
      $attrs$: {
        name: "loading",
      },
      $key$: null,
      $name$: "loading",
    },
  },
};
const Tab = () => {
  return h$1("sqm-rewards-table-date-cell", null);
};
const EmptyCell = () => {
  return h$1("sqm-rewards-table-date-cell", null);
};

const RewardsTable = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': RewardsTable_stories,
  Tab: Tab,
  EmptyCell: EmptyCell
});

const UseReferralTable_stories = {
  title: "Hooks / useReferralTable",
};
function setupGraphQL() {
  const id = "testestest";
  const accountId = id;
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a8b41jotf8a1v",
    appDomain: "https://staging.referralsaasquatch.com",
    // programId,
  };
  useEffect(() => {
    ae$1({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InRlc3Rlc3Rlc3QiLCJpZCI6InRlc3Rlc3Rlc3QifX0.qYnU5hNeIj9C_G3NogfG7btgCPGZC7JRXY0MG6a63zs",
    });
    return () => {
      window.widgetIdent = undefined;
      ae$1(undefined);
    };
  }, []);
  return { id, accountId };
}
function setupGraphQLKlip({ token, id }) {
  const accountId = id;
  // const programId = "klip-referral-program";
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a74miwdpofztj",
    appDomain: "https://staging.referralsaasquatch.com",
    // programId,
  };
  useEffect(() => {
    ae$1({
      accountId,
      id,
      jwt: token,
    });
    return () => {
      window.widgetIdent = undefined;
      ae$1(undefined);
    };
  }, []);
  return { id, accountId };
}
const ReferralTable = createHookStory(() => {
  setupGraphQL();
  A$1("sam-partner-test-2");
  const props = {
    listType: "",
    render: () => { },
    disconnectedCallback: () => { },
    ignored: true,
  };
  return (h$1("sqm-referral-table", null,
    h$1("sqm-referral-table-user-column", null),
    h$1("sqm-referral-table-status-column", null),
    h$1("sqm-referral-table-date-column", null),
    h$1("sqm-referral-table-rewards-column", null)));
});
const ReferralTableEn = createHookStory(() => {
  setupGraphQLKlip({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InNhbWVuZ2xpc2giLCJpZCI6InNhbWVuZ2xpc2gifX0._6OTVF3gcipu_ibgthUNr5UHwC-2E_lhCENI5HpYvcw",
    id: "samenglish",
  });
  A$1("klip-referral-program");
  const props = {
    listType: "",
    render: () => { },
    disconnectedCallback: () => { },
    ignored: true,
  };
  return (h$1("sqm-referral-table", { "per-page": "4" },
    h$1("sqm-referral-table-user-column", { "column-title": "User" }),
    h$1("sqm-referral-table-status-column", { "column-title": "Referral Status" }),
    h$1("sqm-referral-table-rewards-column", null),
    h$1("sqm-referral-table-date-column", { "column-title": "Date Referred", "date-shown": "dateReferralStarted" })));
});
const ReferralTableTr = createHookStory(() => {
  setupGraphQLKlip({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InNhbXR1cmtleSIsImlkIjoic2FtdHVya2V5In19.usSMe0RWg8W5FtwcvJayvAlxTw6vMxjTyWXaP8jI8_U",
    id: "samturkey",
  });
  A$1("klip-referral-program");
  const props = {
    listType: "",
    render: () => { },
    disconnectedCallback: () => { },
    ignored: true,
  };
  return (h$1("sqm-referral-table", { "more-label": "Daha", "prev-label": "\u00D6ncesi", "empty-state-text": "Hen\u00FCz \u00D6d\u00FCl Yok", "per-page": "4" },
    h$1("sqm-referral-table-user-column", { "column-title": "Kullan\u0131c\u0131lar", "anonymous-user": "Anonim Kullan\u0131c\u0131", "deleted-user": "Silinmi\u015F Kullan\u0131c\u0131" }),
    h$1("sqm-referral-table-status-column", { "column-title": "Durumu", "converted-status-text": "D\u00F6n\u00FC\u015Ft\u00FCr", "in-progress-status-text": "Devam etmekte" }),
    h$1("sqm-referral-table-rewards-column", { "column-title": "\u00D6d\u00FCller", "status-text": "{status, select, AVAILABLE {Mevcut} CANCELLED {\u0130ptal edildi} PENDING {Bekliyor} EXPIRED {S\u00FCresi doldu} REDEEMED {Kullan\u0131ld\u0131} other {M\u00FCsait de\u011Fil} }", "status-long-text": "{status, select, AVAILABLE {\u00D6d\u00FCl s\u00FCresi doluyor} CANCELLED {\u00D6d\u00FCl iptal edildi} PENDING {\u00FCzerinde mevcut} EXPIRED {\u00D6d\u00FCl\u00FCn s\u00FCresi doldu} other {M\u00FCsait de\u011Fil} }", "reward-received-text": "\u00D6d\u00FCl \u015Fu tarihte al\u0131nd\u0131:" }),
    h$1("sqm-referral-table-date-column", { "column-title": "Tarih", "date-shown": "dateReferralStarted" })));
});
const ReferralTableFr = createHookStory(() => {
  setupGraphQLKlip({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InNhbWZyZW5jaCIsImlkIjoic2FtZnJlbmNoIn19.cwhasHpfU5MLV4vGbCQcazb6p19iSw5pD2zyrVHgePg",
    id: "samfrench",
  });
  A$1("klip-referral-program");
  const props = {
    listType: "",
    render: () => { },
    disconnectedCallback: () => { },
    ignored: true,
  };
  return (h$1("sqm-referral-table", { "more-label": "Plus", "prev-label": "Pr\u00E9c\u00E9dent", "empty-state-text": "Aucune R\u00E9f\u00E9rence Maintenant", "per-page": "4" },
    h$1("sqm-referral-table-user-column", { "column-title": "Utilisateur", "anonymous-user": "Utilisateur Anonyme", "deleted-user": "Utilisateur Supprim\u00E9" }),
    h$1("sqm-referral-table-status-column", { "column-title": "Statut de Parrainage", "converted-status-text": "Converti", "in-progress-status-text": "En cours" }),
    h$1("sqm-referral-table-rewards-column", { "column-title": "R\u00E9compenses", "status-text": "{status, select, AVAILABLE {Disponible} CANCELLED {Annul\u00E9} PENDING {En attente} EXPIRED {Expir\u00E9} REDEEMED {Rachet\u00E9} other {Indisponible} }", "status-long-text": "{status, select, AVAILABLE {R\u00E9compense expirant sur} CANCELLED {R\u00E9compense annul\u00E9e sur} PENDING {Disponible sur} EXPIRED {R\u00E9compense expir\u00E9e sur} other {Indisponible} }", "reward-received-text": "R\u00E9compense re\u00E7ue" }),
    h$1("sqm-referral-table-date-column", { "column-title": "Date de R\u00E9f\u00E9rence", "date-shown": "dateReferralStarted" })));
});

const UseReferralTable = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': UseReferralTable_stories,
  ReferralTable: ReferralTable,
  ReferralTableEn: ReferralTableEn,
  ReferralTableTr: ReferralTableTr,
  ReferralTableFr: ReferralTableFr
});

const HeroImage_stories = {
  title: "Components/Hero Image",
};
const OverlayHeader = () => {
  return (h$1("sqm-hero-image", { "image-url": "https://i.imgur.com/bTwu1Um.png", header: "Klip Rewards", layout: "overlay" }));
};
const OverlayDescription = () => {
  return (h$1("sqm-hero-image", { "image-url": "https://i.imgur.com/bTwu1Um.png", header: "Klip Rewards", description: "Refer friends or complete tasks while using Klip to earn rewards", layout: "overlay" }));
};
const OverlayButton = () => {
  return (h$1("sqm-hero-image", { "image-url": "https://i.imgur.com/bTwu1Um.png", header: "Klip Rewards", description: "Refer friends or complete tasks while using Klip to earn rewards", "button-text": "Start earning", layout: "overlay" }));
};
const OverlayLong = () => {
  return (h$1("sqm-hero-image", { "image-url": "https://i.imgur.com/bTwu1Um.png", header: "Klip Rewards", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", "button-text": "Start earning", layout: "overlay" }));
};
const OverlayLeft = () => {
  return (h$1("sqm-hero-image", { "image-url": "https://i.imgur.com/bTwu1Um.png", header: "Klip Rewards", description: "Refer friends or complete tasks while using Klip to earn rewards", "button-text": "Start earning", layout: "overlay", "image-pos": "left" }));
};
const OverlayCenter = () => {
  return (h$1("sqm-hero-image", { "image-url": "https://i.imgur.com/bTwu1Um.png", header: "Klip Rewards", description: "Refer friends or complete tasks while using Klip to earn rewards", "button-text": "Start earning", layout: "overlay", "image-pos": "center" }));
};
const OverlayRight = () => {
  return (h$1("sqm-hero-image", { "image-url": "https://i.imgur.com/bTwu1Um.png", header: "Klip Rewards", description: "Refer friends or complete tasks while using Klip to earn rewards", "button-text": "Start earning", layout: "overlay", "image-pos": "right" }));
};
const OverlayCustom = () => {
  return (h$1("sqm-hero-image", { "image-url": "https://i.imgur.com/bTwu1Um.png", header: "Klip Rewards", description: "Refer friends or complete tasks while using Klip to earn rewards", "button-text": "Start earning", "text-color": "#fffc4b", "overlay-color": "#ff7f7f", "overlay-opacity": "0.9", layout: "overlay" }));
};
const Columns = () => {
  return (h$1("sqm-hero-image", { "image-url": "https://i.imgur.com/yr6ER3R.png", header: "Klip Rewards", description: "Refer friends or complete tasks while using Klip to earn rewards", "button-text": "Start earning", layout: "columns" }));
};
const ColumnsReverse = () => {
  return (h$1("sqm-hero-image", { "image-url": "https://i.imgur.com/yr6ER3R.png", header: "Klip Rewards", description: "Refer friends or complete tasks while using Klip to earn rewards", "button-text": "Start earning", layout: "columns", imagePos: "right", imageMobilePos: "bottom" }));
};
const ColumnsCustom = () => {
  return (h$1("sqm-hero-image", { "image-url": "https://i.imgur.com/yr6ER3R.png", header: "Klip Rewards", description: "Refer friends or complete tasks while using Klip to earn rewards", "button-text": "Start earning", layout: "columns", "text-color": "#fffc4b", "background-color": "#ff7f7f" }));
};

const HeroImage = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': HeroImage_stories,
  OverlayHeader: OverlayHeader,
  OverlayDescription: OverlayDescription,
  OverlayButton: OverlayButton,
  OverlayLong: OverlayLong,
  OverlayLeft: OverlayLeft,
  OverlayCenter: OverlayCenter,
  OverlayRight: OverlayRight,
  OverlayCustom: OverlayCustom,
  Columns: Columns,
  ColumnsReverse: ColumnsReverse,
  ColumnsCustom: ColumnsCustom
});

const ReferralCard_stories = {
  title: "Components/Referral Card",
};
const media = (slot) => {
  return (h$1("sqm-portal-container", { gap: "large", slot: slot },
    "Get rewarded when your friend uses Klip",
    h$1("sqm-image", { "image-url": "https://i.imgur.com/IqB7GeS.png" })));
};
const sharebutton = (slot) => {
  return (h$1("sqm-portal-container", { gap: "large", slot: slot },
    h$1("sqm-text", null, "Choose how you want to share:"),
    h$1("sqm-text", null,
      //@ts-ignore
      h$1("p", { light: true }, "Your unique referral link:"),
      h$1("sqm-share-code", null)),
    h$1("sqm-share-button", { medium: "email", icon: "envelope", backgroundcolor: "#666666", textcolor: "#fff" }, "Share via email"),
    h$1("sqm-share-button", { medium: "facebook", backgroundcolor: "#0671E6", textcolor: "#fff" }, "Share on Facebook"),
    h$1("sqm-share-button", { medium: "twitter", backgroundcolor: "#47ACDF", textcolor: "#fff" }, "Tweet about us")));
};
const timeline = (slot, count) => {
  return (h$1("sqm-timeline", { slot: slot, icon: "circle" },
    count > 0 && (h$1("sqm-timeline-entry", { reward: "75", unit: "points", desc: "Your friends signs up for a free trial" })),
    count > 1 && (h$1("sqm-timeline-entry", { reward: "$50", unit: "visa giftcard", desc: "Your friends signs up for Klip Personal" })),
    count > 2 && (h$1("sqm-timeline-entry", { reward: "$200", unit: "visa giftcard", desc: "Your friend qualifies as a good fit for Klip Team" })),
    count > 3 && (h$1("sqm-timeline-entry", { reward: "$1000", unit: "visa giftcard", desc: "Your friend purchases Klip Team" }))));
};
const ReferralCardA = () => {
  return (h$1("sqm-referral-card", null,
    media("left"),
    sharebutton("right")));
};
const ReferralCardB = () => {
  return (h$1("sqm-referral-card", null,
    timeline("left", 2),
    sharebutton("right")));
};
const ReferralCardC = () => {
  return (h$1("sqm-referral-card", null,
    timeline("left", 3),
    sharebutton("right")));
};
const ReferralCardDStart = () => {
  return (h$1("sqm-referral-card", { "vertical-alignment": "start" },
    timeline("left", 4),
    sharebutton("right")));
};
const ReferralCardDCenter = () => {
  return (h$1("sqm-referral-card", { "vertical-alignment": "center" },
    timeline("left", 4),
    sharebutton("right")));
};
const ReferralCardDEnd = () => {
  return (h$1("sqm-referral-card", { "vertical-alignment": "end" },
    timeline("left", 4),
    sharebutton("right")));
};
const ReferralCardAFlipped = () => {
  return (h$1("sqm-referral-card", null,
    media("right"),
    sharebutton("left")));
};
const ReferralCardBFlipped = () => {
  return (h$1("sqm-referral-card", null,
    timeline("right", 2),
    sharebutton("left")));
};
const ReferralCardCFlipped = () => {
  return (h$1("sqm-referral-card", null,
    timeline("right", 3),
    sharebutton("left")));
};
const ReferralCardDFlipped = () => {
  return (h$1("sqm-referral-card", null,
    timeline("right", 4),
    sharebutton("left")));
};
const TimelineWith1Reward = () => {
  return (h$1("div", null,
    h$1("sqm-timeline", null,
      h$1("sqm-timeline-entry", { reward: "75", unit: "points", desc: "Your friends signs up for a free trial" })),
    h$1("br", null),
    " ",
    h$1("hr", null),
    " ",
    h$1("br", null),
    h$1("sqm-timeline", { icon: "circle" },
      h$1("sqm-timeline-entry", { reward: "75", unit: "points", desc: "Your friends signs up for a free trial" }))));
};
const TimelineWith2Rewards = () => {
  return (h$1("div", null,
    h$1("sqm-timeline", null,
      h$1("sqm-timeline-entry", { reward: "75", unit: "points", desc: "Your friends signs up for a free trial" }),
      h$1("sqm-timeline-entry", { reward: "$50", unit: "visa giftcard", desc: "Your friends signs up for Klip Personal" })),
    h$1("br", null),
    " ",
    h$1("hr", null),
    " ",
    h$1("br", null),
    h$1("sqm-timeline", { icon: "circle" },
      h$1("sqm-timeline-entry", { reward: "75", unit: "points", desc: "Your friends signs up for a free trial" }),
      h$1("sqm-timeline-entry", { reward: "$50", unit: "visa giftcard", desc: "Your friends signs up for Klip Personal" }))));
};
const TimelineWith3Rewards = () => {
  return (h$1("div", null,
    h$1("sqm-timeline", null,
      h$1("sqm-timeline-entry", { reward: "75", unit: "points", desc: "Your friends signs up for a free trial" }),
      h$1("sqm-timeline-entry", { reward: "$50", unit: "visa giftcard", desc: "Your friends signs up for Klip Personal" }),
      h$1("sqm-timeline-entry", { reward: "$200", unit: "visa giftcard", desc: "Your friend qualifies as a good fit for Klip Team" })),
    h$1("br", null),
    " ",
    h$1("hr", null),
    " ",
    h$1("br", null),
    h$1("sqm-timeline", { icon: "circle" },
      h$1("sqm-timeline-entry", { reward: "75", unit: "points", desc: "Your friends signs up for a free trial" }),
      h$1("sqm-timeline-entry", { reward: "$50", unit: "visa giftcard", desc: "Your friends signs up for Klip Personal" }),
      h$1("sqm-timeline-entry", { reward: "$200", unit: "visa giftcard", desc: "Your friend qualifies as a good fit for Klip Team" }))));
};
const TimelineWith4Rewards = () => {
  return (h$1("div", null,
    h$1("sqm-timeline", null,
      h$1("sqm-timeline-entry", { reward: "75", unit: "points", desc: "Your friends signs up for a free trial" }),
      h$1("sqm-timeline-entry", { reward: "$50", unit: "visa giftcard", desc: "Your friends signs up for Klip Personal" }),
      h$1("sqm-timeline-entry", { reward: "$200", unit: "visa giftcard", desc: "Your friend qualifies as a good fit for Klip Team" }),
      h$1("sqm-timeline-entry", { reward: "$1000", unit: "visa giftcard", desc: "Your friend purchases Klip Team" })),
    h$1("br", null),
    " ",
    h$1("hr", null),
    " ",
    h$1("br", null),
    h$1("sqm-timeline", { icon: "circle" },
      h$1("sqm-timeline-entry", { reward: "75", unit: "points", desc: "Your friends signs up for a free trial" }),
      h$1("sqm-timeline-entry", { reward: "$50", unit: "visa giftcard", desc: "Your friends signs up for Klip Personal" }),
      h$1("sqm-timeline-entry", { reward: "$200", unit: "visa giftcard", desc: "Your friend qualifies as a good fit for Klip Team" }),
      h$1("sqm-timeline-entry", { reward: "$1000", unit: "visa giftcard", desc: "Your friend purchases Klip Team" }))));
};

const ReferralCard = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ReferralCard_stories,
  ReferralCardA: ReferralCardA,
  ReferralCardB: ReferralCardB,
  ReferralCardC: ReferralCardC,
  ReferralCardDStart: ReferralCardDStart,
  ReferralCardDCenter: ReferralCardDCenter,
  ReferralCardDEnd: ReferralCardDEnd,
  ReferralCardAFlipped: ReferralCardAFlipped,
  ReferralCardBFlipped: ReferralCardBFlipped,
  ReferralCardCFlipped: ReferralCardCFlipped,
  ReferralCardDFlipped: ReferralCardDFlipped,
  TimelineWith1Reward: TimelineWith1Reward,
  TimelineWith2Rewards: TimelineWith2Rewards,
  TimelineWith3Rewards: TimelineWith3Rewards,
  TimelineWith4Rewards: TimelineWith4Rewards
});

const Image_stories = {
  title: "Components/Image",
};
const Image = () => {
  return h$1("sqm-image", { "image-url": "https://i.imgur.com/tn47wOj.png" });
};
const ImageAlignLeft = () => {
  return h$1("sqm-image", { "image-url": "https://i.imgur.com/tn47wOj.png", align: "left" });
};
const ImageAlignCenter = () => {
  return (h$1("sqm-image", { "image-url": "https://i.imgur.com/tn47wOj.png", align: "center" }));
};
const ImageAlignRight = () => {
  return (h$1("sqm-image", { "image-url": "https://i.imgur.com/tn47wOj.png", align: "right" }));
};
const ImageMarginLeft = () => {
  return h$1("sqm-image", { "image-url": "https://i.imgur.com/tn47wOj.png", left: "100px" });
};
const ImageMarginRight = () => {
  return (h$1("sqm-image", { "image-url": "https://i.imgur.com/tn47wOj.png", right: "100px" }));
};
const ImageBackground = () => {
  return (h$1("sqm-image", { "image-url": "https://i.imgur.com/tn47wOj.png", "background-color": "firebrick" }));
};

const Image$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': Image_stories,
  Image: Image,
  ImageAlignLeft: ImageAlignLeft,
  ImageAlignCenter: ImageAlignCenter,
  ImageAlignRight: ImageAlignRight,
  ImageMarginLeft: ImageMarginLeft,
  ImageMarginRight: ImageMarginRight,
  ImageBackground: ImageBackground
});

const TitledSection_stories = {
  title: "Components/Titled Section",
};
const AlignLeft = () => {
  return (h$1("sqm-titled-section", { align: "left" },
    h$1("sqm-text", { slot: "label" },
      h$1("h3", null, "Earn more rewards")),
    h$1("sqm-text", { slot: "content" },
      h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))));
};
const AlignCenter = () => {
  return (h$1("sqm-titled-section", { align: "center" },
    h$1("sqm-text", { slot: "label" },
      h$1("h3", null, "Earn more rewards")),
    h$1("sqm-text", { slot: "content" },
      h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))));
};
const AlignRight = () => {
  return (h$1("sqm-titled-section", { align: "right" },
    h$1("sqm-text", { slot: "label" },
      h$1("h3", null, "Earn more rewards")),
    h$1("sqm-text", { slot: "content" },
      h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))));
};
const Padding = () => {
  return (h$1("div", null,
    h$1("h3", null, "None"),
    h$1("sqm-titled-section", { padding: "none" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "xxx-small"),
    h$1("sqm-titled-section", { padding: "xxx-small" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "xx-small"),
    h$1("sqm-titled-section", { padding: "xx-small" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "x-small"),
    h$1("sqm-titled-section", { padding: "x-small" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "small"),
    h$1("sqm-titled-section", { padding: "small" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "medium"),
    h$1("sqm-titled-section", { padding: "medium" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "large"),
    h$1("sqm-titled-section", { padding: "large" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "x-large"),
    h$1("sqm-titled-section", { padding: "x-large" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "xx-large"),
    h$1("sqm-titled-section", { padding: "xx-large" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "xxx-large"),
    h$1("sqm-titled-section", { padding: "xxx-large" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "xxxx-large"),
    h$1("sqm-titled-section", { padding: "xxxx-large" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America")))));
};
const LabelMargin = () => {
  return (h$1("div", null,
    h$1("h3", null, "None"),
    h$1("sqm-titled-section", { "label-margin": "none" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "xxx-small"),
    h$1("sqm-titled-section", { "label-margin": "xxx-small" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "xx-small"),
    h$1("sqm-titled-section", { "label-margin": "xx-small" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "x-small"),
    h$1("sqm-titled-section", { "label-margin": "x-small" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "small"),
    h$1("sqm-titled-section", { "label-margin": "small" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "medium"),
    h$1("sqm-titled-section", { "label-margin": "medium" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "large"),
    h$1("sqm-titled-section", { "label-margin": "large" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "x-large"),
    h$1("sqm-titled-section", { "label-margin": "x-large" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "xx-large"),
    h$1("sqm-titled-section", { "label-margin": "xx-large" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "xxx-large"),
    h$1("sqm-titled-section", { "label-margin": "xxx-large" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"))),
    h$1("br", null),
    h$1("hr", null),
    h$1("br", null),
    h$1("h3", null, "xxxx-large"),
    h$1("sqm-titled-section", { "label-margin": "xxxx-large" },
      h$1("sqm-text", { slot: "label" },
        h$1("h3", null, "Earn more rewards")),
      h$1("sqm-text", { slot: "content" },
        h$1("p", null, "Get points while using Klip. Use those points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America")))));
};

const TitledSection = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': TitledSection_stories,
  AlignLeft: AlignLeft,
  AlignCenter: AlignCenter,
  AlignRight: AlignRight,
  Padding: Padding,
  LabelMargin: LabelMargin
});

/**
 *
 * Themes
 *
 * Export only valid CSS. Those will be injected into style tags.
 *
 * Useful links:
 *  - https://brandcolors.net/
 *  - Shoelace color generator: https://codepen.io/claviska/full/QWveRgL
 *
 */
//
const Default = `
 // No CSS
`;
const Orangey = `
:root{
    ${autoColorScaleCss("orange")}
}
`;
const Netflix = `
:root{
    ${autoColorScaleCss("#e50914")}
}
`;
const SaaSquatchCorporate = `
:root{
    ${autoColorScaleCss("#65bd60")}
    --sl-font-sans: Arial;
}
`;
const NYTimes = `
:root{
    ${autoColorScaleCss("black")}
    --sl-font-sans: Georgia, 'Times New Roman', serif;
}
`;
const Klip = `
:root{
    ${autoColorScaleCss("#4225C4")};
}

`;

const Themes = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Default: Default,
  Orangey: Orangey,
  Netflix: Netflix,
  SaaSquatchCorporate: SaaSquatchCorporate,
  NYTimes: NYTimes,
  Klip: Klip
});

function deepFreeze(obj) {
    if (obj instanceof Map) {
        obj.clear = obj.delete = obj.set = function () {
            throw new Error('map is read-only');
        };
    } else if (obj instanceof Set) {
        obj.add = obj.clear = obj.delete = function () {
            throw new Error('set is read-only');
        };
    }

    // Freeze self
    Object.freeze(obj);

    Object.getOwnPropertyNames(obj).forEach(function (name) {
        var prop = obj[name];

        // Freeze prop if it is an object
        if (typeof prop == 'object' && !Object.isFrozen(prop)) {
            deepFreeze(prop);
        }
    });

    return obj;
}

var deepFreezeEs6 = deepFreeze;
var _default = deepFreeze;
deepFreezeEs6.default = _default;

/** @implements CallbackResponse */
class Response {
  /**
   * @param {CompiledMode} mode
   */
  constructor(mode) {
    // eslint-disable-next-line no-undefined
    if (mode.data === undefined) mode.data = {};

    this.data = mode.data;
    this.isMatchIgnored = false;
  }

  ignoreMatch() {
    this.isMatchIgnored = true;
  }
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapeHTML(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * performs a shallow merge of multiple objects into one
 *
 * @template T
 * @param {T} original
 * @param {Record<string,any>[]} objects
 * @returns {T} a single new object
 */
function inherit(original, ...objects) {
  /** @type Record<string,any> */
  const result = Object.create(null);

  for (const key in original) {
    result[key] = original[key];
  }
  objects.forEach(function(obj) {
    for (const key in obj) {
      result[key] = obj[key];
    }
  });
  return /** @type {T} */ (result);
}

/**
 * @typedef {object} Renderer
 * @property {(text: string) => void} addText
 * @property {(node: Node) => void} openNode
 * @property {(node: Node) => void} closeNode
 * @property {() => string} value
 */

/** @typedef {{kind?: string, sublanguage?: boolean}} Node */
/** @typedef {{walk: (r: Renderer) => void}} Tree */
/** */

const SPAN_CLOSE = '</span>';

/**
 * Determines if a node needs to be wrapped in <span>
 *
 * @param {Node} node */
const emitsWrappingTags = (node) => {
  return !!node.kind;
};

/** @type {Renderer} */
class HTMLRenderer {
  /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */
  constructor(parseTree, options) {
    this.buffer = "";
    this.classPrefix = options.classPrefix;
    parseTree.walk(this);
  }

  /**
   * Adds texts to the output stream
   *
   * @param {string} text */
  addText(text) {
    this.buffer += escapeHTML(text);
  }

  /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */
  openNode(node) {
    if (!emitsWrappingTags(node)) return;

    let className = node.kind;
    if (!node.sublanguage) {
      className = `${this.classPrefix}${className}`;
    }
    this.span(className);
  }

  /**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */
  closeNode(node) {
    if (!emitsWrappingTags(node)) return;

    this.buffer += SPAN_CLOSE;
  }

  /**
   * returns the accumulated buffer
  */
  value() {
    return this.buffer;
  }

  // helpers

  /**
   * Builds a span element
   *
   * @param {string} className */
  span(className) {
    this.buffer += `<span class="${className}">`;
  }
}

/** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} | string} Node */
/** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} } DataNode */
/**  */

class TokenTree {
  constructor() {
    /** @type DataNode */
    this.rootNode = { children: [] };
    this.stack = [this.rootNode];
  }

  get top() {
    return this.stack[this.stack.length - 1];
  }

  get root() { return this.rootNode; }

  /** @param {Node} node */
  add(node) {
    this.top.children.push(node);
  }

  /** @param {string} kind */
  openNode(kind) {
    /** @type Node */
    const node = { kind, children: [] };
    this.add(node);
    this.stack.push(node);
  }

  closeNode() {
    if (this.stack.length > 1) {
      return this.stack.pop();
    }
    // eslint-disable-next-line no-undefined
    return undefined;
  }

  closeAllNodes() {
    while (this.closeNode());
  }

  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }

  /**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */
  walk(builder) {
    // this does not
    return this.constructor._walk(builder, this.rootNode);
    // this works
    // return TokenTree._walk(builder, this.rootNode);
  }

  /**
   * @param {Renderer} builder
   * @param {Node} node
   */
  static _walk(builder, node) {
    if (typeof node === "string") {
      builder.addText(node);
    } else if (node.children) {
      builder.openNode(node);
      node.children.forEach((child) => this._walk(builder, child));
      builder.closeNode(node);
    }
    return builder;
  }

  /**
   * @param {Node} node
   */
  static _collapse(node) {
    if (typeof node === "string") return;
    if (!node.children) return;

    if (node.children.every(el => typeof el === "string")) {
      // node.text = node.children.join("");
      // delete node.children;
      node.children = [node.children.join("")];
    } else {
      node.children.forEach((child) => {
        TokenTree._collapse(child);
      });
    }
  }
}

/**
  Currently this is all private API, but this is the minimal API necessary
  that an Emitter must implement to fully support the parser.

  Minimal interface:

  - addKeyword(text, kind)
  - addText(text)
  - addSublanguage(emitter, subLanguageName)
  - finalize()
  - openNode(kind)
  - closeNode()
  - closeAllNodes()
  - toHTML()

*/

/**
 * @implements {Emitter}
 */
class TokenTreeEmitter extends TokenTree {
  /**
   * @param {*} options
   */
  constructor(options) {
    super();
    this.options = options;
  }

  /**
   * @param {string} text
   * @param {string} kind
   */
  addKeyword(text, kind) {
    if (text === "") { return; }

    this.openNode(kind);
    this.addText(text);
    this.closeNode();
  }

  /**
   * @param {string} text
   */
  addText(text) {
    if (text === "") { return; }

    this.add(text);
  }

  /**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */
  addSublanguage(emitter, name) {
    /** @type DataNode */
    const node = emitter.root;
    node.kind = name;
    node.sublanguage = true;
    this.add(node);
  }

  toHTML() {
    const renderer = new HTMLRenderer(this, this.options);
    return renderer.value();
  }

  finalize() {
    return true;
  }
}

/**
 * @param {string} value
 * @returns {RegExp}
 * */
function escape(value) {
  return new RegExp(value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'm');
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function source(re) {
  if (!re) return null;
  if (typeof re === "string") return re;

  return re.source;
}

/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}

/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] } args
 * @returns {string}
 */
function either(...args) {
  const joined = '(' + args.map((x) => source(x)).join("|") + ")";
  return joined;
}

/**
 * @param {RegExp} re
 * @returns {number}
 */
function countMatchGroups(re) {
  return (new RegExp(re.toString() + '|')).exec('').length - 1;
}

/**
 * Does lexeme start with a regular expression match at the beginning
 * @param {RegExp} re
 * @param {string} lexeme
 */
function startsWith(re, lexeme) {
  const match = re && re.exec(lexeme);
  return match && match.index === 0;
}

// BACKREF_RE matches an open parenthesis or backreference. To avoid
// an incorrect parse, it additionally matches the following:
// - [...] elements, where the meaning of parentheses and escapes change
// - other escape sequences, so we do not misparse escape sequences as
//   interesting elements
// - non-matching or lookahead parentheses, which do not capture. These
//   follow the '(' with a '?'.
const BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;

// join logically computes regexps.join(separator), but fixes the
// backreferences so they continue to match.
// it also places each individual regular expression into it's own
// match group, keeping track of the sequencing of those match groups
// is currently an exercise for the caller. :-)
/**
 * @param {(string | RegExp)[]} regexps
 * @param {string} separator
 * @returns {string}
 */
function join(regexps, separator = "|") {
  let numCaptures = 0;

  return regexps.map((regex) => {
    numCaptures += 1;
    const offset = numCaptures;
    let re = source(regex);
    let out = '';

    while (re.length > 0) {
      const match = BACKREF_RE.exec(re);
      if (!match) {
        out += re;
        break;
      }
      out += re.substring(0, match.index);
      re = re.substring(match.index + match[0].length);
      if (match[0][0] === '\\' && match[1]) {
        // Adjust the backreference.
        out += '\\' + String(Number(match[1]) + offset);
      } else {
        out += match[0];
        if (match[0] === '(') {
          numCaptures++;
        }
      }
    }
    return out;
  }).map(re => `(${re})`).join(separator);
}

// Common regexps
const MATCH_NOTHING_RE = /\b\B/;
const IDENT_RE = '[a-zA-Z]\\w*';
const UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
const NUMBER_RE = '\\b\\d+(\\.\\d+)?';
const C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
const BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
const RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

/**
* @param { Partial<Mode> & {binary?: string | RegExp} } opts
*/
const SHEBANG = (opts = {}) => {
  const beginShebang = /^#![ ]*\//;
  if (opts.binary) {
    opts.begin = concat(
      beginShebang,
      /.*\b/,
      opts.binary,
      /\b.*/);
  }
  return inherit({
    className: 'meta',
    begin: beginShebang,
    end: /$/,
    relevance: 0,
    /** @type {ModeCallback} */
    "on:begin": (m, resp) => {
      if (m.index !== 0) resp.ignoreMatch();
    }
  }, opts);
};

// Common modes
const BACKSLASH_ESCAPE = {
  begin: '\\\\[\\s\\S]', relevance: 0
};
const APOS_STRING_MODE = {
  className: 'string',
  begin: '\'',
  end: '\'',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
const QUOTE_STRING_MODE = {
  className: 'string',
  begin: '"',
  end: '"',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
const PHRASAL_WORDS_MODE = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
/**
 * Creates a comment mode
 *
 * @param {string | RegExp} begin
 * @param {string | RegExp} end
 * @param {Mode | {}} [modeOptions]
 * @returns {Partial<Mode>}
 */
const COMMENT = function(begin, end, modeOptions = {}) {
  const mode = inherit(
    {
      className: 'comment',
      begin,
      end,
      contains: []
    },
    modeOptions
  );
  mode.contains.push(PHRASAL_WORDS_MODE);
  mode.contains.push({
    className: 'doctag',
    begin: '(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):',
    relevance: 0
  });
  return mode;
};
const C_LINE_COMMENT_MODE = COMMENT('//', '$');
const C_BLOCK_COMMENT_MODE = COMMENT('/\\*', '\\*/');
const HASH_COMMENT_MODE = COMMENT('#', '$');
const NUMBER_MODE = {
  className: 'number',
  begin: NUMBER_RE,
  relevance: 0
};
const C_NUMBER_MODE = {
  className: 'number',
  begin: C_NUMBER_RE,
  relevance: 0
};
const BINARY_NUMBER_MODE = {
  className: 'number',
  begin: BINARY_NUMBER_RE,
  relevance: 0
};
const CSS_NUMBER_MODE = {
  className: 'number',
  begin: NUMBER_RE + '(' +
    '%|em|ex|ch|rem' +
    '|vw|vh|vmin|vmax' +
    '|cm|mm|in|pt|pc|px' +
    '|deg|grad|rad|turn' +
    '|s|ms' +
    '|Hz|kHz' +
    '|dpi|dpcm|dppx' +
    ')?',
  relevance: 0
};
const REGEXP_MODE = {
  // this outer rule makes sure we actually have a WHOLE regex and not simply
  // an expression such as:
  //
  //     3 / something
  //
  // (which will then blow up when regex's `illegal` sees the newline)
  begin: /(?=\/[^/\n]*\/)/,
  contains: [{
    className: 'regexp',
    begin: /\//,
    end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [
      BACKSLASH_ESCAPE,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [BACKSLASH_ESCAPE]
      }
    ]
  }]
};
const TITLE_MODE = {
  className: 'title',
  begin: IDENT_RE,
  relevance: 0
};
const UNDERSCORE_TITLE_MODE = {
  className: 'title',
  begin: UNDERSCORE_IDENT_RE,
  relevance: 0
};
const METHOD_GUARD = {
  // excludes method names from keyword processing
  begin: '\\.\\s*' + UNDERSCORE_IDENT_RE,
  relevance: 0
};

/**
 * Adds end same as begin mechanics to a mode
 *
 * Your mode must include at least a single () match group as that first match
 * group is what is used for comparison
 * @param {Partial<Mode>} mode
 */
const END_SAME_AS_BEGIN = function(mode) {
  return Object.assign(mode,
    {
      /** @type {ModeCallback} */
      'on:begin': (m, resp) => { resp.data._beginMatch = m[1]; },
      /** @type {ModeCallback} */
      'on:end': (m, resp) => { if (resp.data._beginMatch !== m[1]) resp.ignoreMatch(); }
    });
};

var MODES = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MATCH_NOTHING_RE: MATCH_NOTHING_RE,
    IDENT_RE: IDENT_RE,
    UNDERSCORE_IDENT_RE: UNDERSCORE_IDENT_RE,
    NUMBER_RE: NUMBER_RE,
    C_NUMBER_RE: C_NUMBER_RE,
    BINARY_NUMBER_RE: BINARY_NUMBER_RE,
    RE_STARTERS_RE: RE_STARTERS_RE,
    SHEBANG: SHEBANG,
    BACKSLASH_ESCAPE: BACKSLASH_ESCAPE,
    APOS_STRING_MODE: APOS_STRING_MODE,
    QUOTE_STRING_MODE: QUOTE_STRING_MODE,
    PHRASAL_WORDS_MODE: PHRASAL_WORDS_MODE,
    COMMENT: COMMENT,
    C_LINE_COMMENT_MODE: C_LINE_COMMENT_MODE,
    C_BLOCK_COMMENT_MODE: C_BLOCK_COMMENT_MODE,
    HASH_COMMENT_MODE: HASH_COMMENT_MODE,
    NUMBER_MODE: NUMBER_MODE,
    C_NUMBER_MODE: C_NUMBER_MODE,
    BINARY_NUMBER_MODE: BINARY_NUMBER_MODE,
    CSS_NUMBER_MODE: CSS_NUMBER_MODE,
    REGEXP_MODE: REGEXP_MODE,
    TITLE_MODE: TITLE_MODE,
    UNDERSCORE_TITLE_MODE: UNDERSCORE_TITLE_MODE,
    METHOD_GUARD: METHOD_GUARD,
    END_SAME_AS_BEGIN: END_SAME_AS_BEGIN
});

// Grammar extensions / plugins
// See: https://github.com/highlightjs/highlight.js/issues/2833

// Grammar extensions allow "syntactic sugar" to be added to the grammar modes
// without requiring any underlying changes to the compiler internals.

// `compileMatch` being the perfect small example of now allowing a grammar
// author to write `match` when they desire to match a single expression rather
// than being forced to use `begin`.  The extension then just moves `match` into
// `begin` when it runs.  Ie, no features have been added, but we've just made
// the experience of writing (and reading grammars) a little bit nicer.

// ------

// TODO: We need negative look-behind support to do this properly
/**
 * Skip a match if it has a preceding dot
 *
 * This is used for `beginKeywords` to prevent matching expressions such as
 * `bob.keyword.do()`. The mode compiler automatically wires this up as a
 * special _internal_ 'on:begin' callback for modes with `beginKeywords`
 * @param {RegExpMatchArray} match
 * @param {CallbackResponse} response
 */
function skipIfhasPrecedingDot(match, response) {
  const before = match.input[match.index - 1];
  if (before === ".") {
    response.ignoreMatch();
  }
}


/**
 * `beginKeywords` syntactic sugar
 * @type {CompilerExt}
 */
function beginKeywords(mode, parent) {
  if (!parent) return;
  if (!mode.beginKeywords) return;

  // for languages with keywords that include non-word characters checking for
  // a word boundary is not sufficient, so instead we check for a word boundary
  // or whitespace - this does no harm in any case since our keyword engine
  // doesn't allow spaces in keywords anyways and we still check for the boundary
  // first
  mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')(?!\\.)(?=\\b|\\s)';
  mode.__beforeBegin = skipIfhasPrecedingDot;
  mode.keywords = mode.keywords || mode.beginKeywords;
  delete mode.beginKeywords;

  // prevents double relevance, the keywords themselves provide
  // relevance, the mode doesn't need to double it
  // eslint-disable-next-line no-undefined
  if (mode.relevance === undefined) mode.relevance = 0;
}

/**
 * Allow `illegal` to contain an array of illegal values
 * @type {CompilerExt}
 */
function compileIllegal(mode, _parent) {
  if (!Array.isArray(mode.illegal)) return;

  mode.illegal = either(...mode.illegal);
}

/**
 * `match` to match a single expression for readability
 * @type {CompilerExt}
 */
function compileMatch(mode, _parent) {
  if (!mode.match) return;
  if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");

  mode.begin = mode.match;
  delete mode.match;
}

/**
 * provides the default 1 relevance to all modes
 * @type {CompilerExt}
 */
function compileRelevance(mode, _parent) {
  // eslint-disable-next-line no-undefined
  if (mode.relevance === undefined) mode.relevance = 1;
}

// keywords that should have no default relevance value
const COMMON_KEYWORDS = [
  'of',
  'and',
  'for',
  'in',
  'not',
  'or',
  'if',
  'then',
  'parent', // common variable name
  'list', // common variable name
  'value' // common variable name
];

const DEFAULT_KEYWORD_CLASSNAME = "keyword";

/**
 * Given raw keywords from a language definition, compile them.
 *
 * @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
 * @param {boolean} caseInsensitive
 */
function compileKeywords(rawKeywords, caseInsensitive, className = DEFAULT_KEYWORD_CLASSNAME) {
  /** @type KeywordDict */
  const compiledKeywords = {};

  // input can be a string of keywords, an array of keywords, or a object with
  // named keys representing className (which can then point to a string or array)
  if (typeof rawKeywords === 'string') {
    compileList(className, rawKeywords.split(" "));
  } else if (Array.isArray(rawKeywords)) {
    compileList(className, rawKeywords);
  } else {
    Object.keys(rawKeywords).forEach(function(className) {
      // collapse all our objects back into the parent object
      Object.assign(
        compiledKeywords,
        compileKeywords(rawKeywords[className], caseInsensitive, className)
      );
    });
  }
  return compiledKeywords;

  // ---

  /**
   * Compiles an individual list of keywords
   *
   * Ex: "for if when while|5"
   *
   * @param {string} className
   * @param {Array<string>} keywordList
   */
  function compileList(className, keywordList) {
    if (caseInsensitive) {
      keywordList = keywordList.map(x => x.toLowerCase());
    }
    keywordList.forEach(function(keyword) {
      const pair = keyword.split('|');
      compiledKeywords[pair[0]] = [className, scoreForKeyword(pair[0], pair[1])];
    });
  }
}

/**
 * Returns the proper score for a given keyword
 *
 * Also takes into account comment keywords, which will be scored 0 UNLESS
 * another score has been manually assigned.
 * @param {string} keyword
 * @param {string} [providedScore]
 */
function scoreForKeyword(keyword, providedScore) {
  // manual scores always win over common keywords
  // so you can force a score of 1 if you really insist
  if (providedScore) {
    return Number(providedScore);
  }

  return commonKeyword(keyword) ? 0 : 1;
}

/**
 * Determines if a given keyword is common or not
 *
 * @param {string} keyword */
function commonKeyword(keyword) {
  return COMMON_KEYWORDS.includes(keyword.toLowerCase());
}

// compilation

/**
 * Compiles a language definition result
 *
 * Given the raw result of a language definition (Language), compiles this so
 * that it is ready for highlighting code.
 * @param {Language} language
 * @param {{plugins: HLJSPlugin[]}} opts
 * @returns {CompiledLanguage}
 */
function compileLanguage(language, { plugins }) {
  /**
   * Builds a regex with the case sensativility of the current language
   *
   * @param {RegExp | string} value
   * @param {boolean} [global]
   */
  function langRe(value, global) {
    return new RegExp(
      source(value),
      'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : '')
    );
  }

  /**
    Stores multiple regular expressions and allows you to quickly search for
    them all in a string simultaneously - returning the first match.  It does
    this by creating a huge (a|b|c) regex - each individual item wrapped with ()
    and joined by `|` - using match groups to track position.  When a match is
    found checking which position in the array has content allows us to figure
    out which of the original regexes / match groups triggered the match.

    The match object itself (the result of `Regex.exec`) is returned but also
    enhanced by merging in any meta-data that was registered with the regex.
    This is how we keep track of which mode matched, and what type of rule
    (`illegal`, `begin`, end, etc).
  */
  class MultiRegex {
    constructor() {
      this.matchIndexes = {};
      // @ts-ignore
      this.regexes = [];
      this.matchAt = 1;
      this.position = 0;
    }

    // @ts-ignore
    addRule(re, opts) {
      opts.position = this.position++;
      // @ts-ignore
      this.matchIndexes[this.matchAt] = opts;
      this.regexes.push([opts, re]);
      this.matchAt += countMatchGroups(re) + 1;
    }

    compile() {
      if (this.regexes.length === 0) {
        // avoids the need to check length every time exec is called
        // @ts-ignore
        this.exec = () => null;
      }
      const terminators = this.regexes.map(el => el[1]);
      this.matcherRe = langRe(join(terminators), true);
      this.lastIndex = 0;
    }

    /** @param {string} s */
    exec(s) {
      this.matcherRe.lastIndex = this.lastIndex;
      const match = this.matcherRe.exec(s);
      if (!match) { return null; }

      // eslint-disable-next-line no-undefined
      const i = match.findIndex((el, i) => i > 0 && el !== undefined);
      // @ts-ignore
      const matchData = this.matchIndexes[i];
      // trim off any earlier non-relevant match groups (ie, the other regex
      // match groups that make up the multi-matcher)
      match.splice(0, i);

      return Object.assign(match, matchData);
    }
  }

  /*
    Created to solve the key deficiently with MultiRegex - there is no way to
    test for multiple matches at a single location.  Why would we need to do
    that?  In the future a more dynamic engine will allow certain matches to be
    ignored.  An example: if we matched say the 3rd regex in a large group but
    decided to ignore it - we'd need to started testing again at the 4th
    regex... but MultiRegex itself gives us no real way to do that.

    So what this class creates MultiRegexs on the fly for whatever search
    position they are needed.

    NOTE: These additional MultiRegex objects are created dynamically.  For most
    grammars most of the time we will never actually need anything more than the
    first MultiRegex - so this shouldn't have too much overhead.

    Say this is our search group, and we match regex3, but wish to ignore it.

      regex1 | regex2 | regex3 | regex4 | regex5    ' ie, startAt = 0

    What we need is a new MultiRegex that only includes the remaining
    possibilities:

      regex4 | regex5                               ' ie, startAt = 3

    This class wraps all that complexity up in a simple API... `startAt` decides
    where in the array of expressions to start doing the matching. It
    auto-increments, so if a match is found at position 2, then startAt will be
    set to 3.  If the end is reached startAt will return to 0.

    MOST of the time the parser will be setting startAt manually to 0.
  */
  class ResumableMultiRegex {
    constructor() {
      // @ts-ignore
      this.rules = [];
      // @ts-ignore
      this.multiRegexes = [];
      this.count = 0;

      this.lastIndex = 0;
      this.regexIndex = 0;
    }

    // @ts-ignore
    getMatcher(index) {
      if (this.multiRegexes[index]) return this.multiRegexes[index];

      const matcher = new MultiRegex();
      this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
      matcher.compile();
      this.multiRegexes[index] = matcher;
      return matcher;
    }

    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }

    considerAll() {
      this.regexIndex = 0;
    }

    // @ts-ignore
    addRule(re, opts) {
      this.rules.push([re, opts]);
      if (opts.type === "begin") this.count++;
    }

    /** @param {string} s */
    exec(s) {
      const m = this.getMatcher(this.regexIndex);
      m.lastIndex = this.lastIndex;
      let result = m.exec(s);

      // The following is because we have no easy way to say "resume scanning at the
      // existing position but also skip the current rule ONLY". What happens is
      // all prior rules are also skipped which can result in matching the wrong
      // thing. Example of matching "booger":

      // our matcher is [string, "booger", number]
      //
      // ....booger....

      // if "booger" is ignored then we'd really need a regex to scan from the
      // SAME position for only: [string, number] but ignoring "booger" (if it
      // was the first match), a simple resume would scan ahead who knows how
      // far looking only for "number", ignoring potential string matches (or
      // future "booger" matches that might be valid.)

      // So what we do: We execute two matchers, one resuming at the same
      // position, but the second full matcher starting at the position after:

      //     /--- resume first regex match here (for [number])
      //     |/---- full match here for [string, "booger", number]
      //     vv
      // ....booger....

      // Which ever results in a match first is then used. So this 3-4 step
      // process essentially allows us to say "match at this position, excluding
      // a prior rule that was ignored".
      //
      // 1. Match "booger" first, ignore. Also proves that [string] does non match.
      // 2. Resume matching for [number]
      // 3. Match at index + 1 for [string, "booger", number]
      // 4. If #2 and #3 result in matches, which came first?
      if (this.resumingScanAtSamePosition()) {
        if (result && result.index === this.lastIndex) ; else { // use the second matcher result
          const m2 = this.getMatcher(0);
          m2.lastIndex = this.lastIndex + 1;
          result = m2.exec(s);
        }
      }

      if (result) {
        this.regexIndex += result.position + 1;
        if (this.regexIndex === this.count) {
          // wrap-around to considering all matches again
          this.considerAll();
        }
      }

      return result;
    }
  }

  /**
   * Given a mode, builds a huge ResumableMultiRegex that can be used to walk
   * the content and find matches.
   *
   * @param {CompiledMode} mode
   * @returns {ResumableMultiRegex}
   */
  function buildModeRegex(mode) {
    const mm = new ResumableMultiRegex();

    mode.contains.forEach(term => mm.addRule(term.begin, { rule: term, type: "begin" }));

    if (mode.terminatorEnd) {
      mm.addRule(mode.terminatorEnd, { type: "end" });
    }
    if (mode.illegal) {
      mm.addRule(mode.illegal, { type: "illegal" });
    }

    return mm;
  }

  /** skip vs abort vs ignore
   *
   * @skip   - The mode is still entered and exited normally (and contains rules apply),
   *           but all content is held and added to the parent buffer rather than being
   *           output when the mode ends.  Mostly used with `sublanguage` to build up
   *           a single large buffer than can be parsed by sublanguage.
   *
   *             - The mode begin ands ends normally.
   *             - Content matched is added to the parent mode buffer.
   *             - The parser cursor is moved forward normally.
   *
   * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
   *           never matched) but DOES NOT continue to match subsequent `contains`
   *           modes.  Abort is bad/suboptimal because it can result in modes
   *           farther down not getting applied because an earlier rule eats the
   *           content but then aborts.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is added to the mode buffer.
   *             - The parser cursor is moved forward accordingly.
   *
   * @ignore - Ignores the mode (as if it never matched) and continues to match any
   *           subsequent `contains` modes.  Ignore isn't technically possible with
   *           the current parser implementation.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is ignored.
   *             - The parser cursor is not moved forward.
   */

  /**
   * Compiles an individual mode
   *
   * This can raise an error if the mode contains certain detectable known logic
   * issues.
   * @param {Mode} mode
   * @param {CompiledMode | null} [parent]
   * @returns {CompiledMode | never}
   */
  function compileMode(mode, parent) {
    const cmode = /** @type CompiledMode */ (mode);
    if (mode.isCompiled) return cmode;

    [
      // do this early so compiler extensions generally don't have to worry about
      // the distinction between match/begin
      compileMatch
    ].forEach(ext => ext(mode, parent));

    language.compilerExtensions.forEach(ext => ext(mode, parent));

    // __beforeBegin is considered private API, internal use only
    mode.__beforeBegin = null;

    [
      beginKeywords,
      // do this later so compiler extensions that come earlier have access to the
      // raw array if they wanted to perhaps manipulate it, etc.
      compileIllegal,
      // default to 1 relevance if not specified
      compileRelevance
    ].forEach(ext => ext(mode, parent));

    mode.isCompiled = true;

    let keywordPattern = null;
    if (typeof mode.keywords === "object") {
      keywordPattern = mode.keywords.$pattern;
      delete mode.keywords.$pattern;
    }

    if (mode.keywords) {
      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
    }

    // both are not allowed
    if (mode.lexemes && keywordPattern) {
      throw new Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");
    }

    // `mode.lexemes` was the old standard before we added and now recommend
    // using `keywords.$pattern` to pass the keyword pattern
    keywordPattern = keywordPattern || mode.lexemes || /\w+/;
    cmode.keywordPatternRe = langRe(keywordPattern, true);

    if (parent) {
      if (!mode.begin) mode.begin = /\B|\b/;
      cmode.beginRe = langRe(mode.begin);
      if (mode.endSameAsBegin) mode.end = mode.begin;
      if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
      if (mode.end) cmode.endRe = langRe(mode.end);
      cmode.terminatorEnd = source(mode.end) || '';
      if (mode.endsWithParent && parent.terminatorEnd) {
        cmode.terminatorEnd += (mode.end ? '|' : '') + parent.terminatorEnd;
      }
    }
    if (mode.illegal) cmode.illegalRe = langRe(/** @type {RegExp | string} */ (mode.illegal));
    if (!mode.contains) mode.contains = [];

    mode.contains = [].concat(...mode.contains.map(function(c) {
      return expandOrCloneMode(c === 'self' ? mode : c);
    }));
    mode.contains.forEach(function(c) { compileMode(/** @type Mode */ (c), cmode); });

    if (mode.starts) {
      compileMode(mode.starts, parent);
    }

    cmode.matcher = buildModeRegex(cmode);
    return cmode;
  }

  if (!language.compilerExtensions) language.compilerExtensions = [];

  // self is not valid at the top-level
  if (language.contains && language.contains.includes('self')) {
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  }

  // we need a null object, which inherit will guarantee
  language.classNameAliases = inherit(language.classNameAliases || {});

  return compileMode(/** @type Mode */ (language));
}

/**
 * Determines if a mode has a dependency on it's parent or not
 *
 * If a mode does have a parent dependency then often we need to clone it if
 * it's used in multiple places so that each copy points to the correct parent,
 * where-as modes without a parent can often safely be re-used at the bottom of
 * a mode chain.
 *
 * @param {Mode | null} mode
 * @returns {boolean} - is there a dependency on the parent?
 * */
function dependencyOnParent(mode) {
  if (!mode) return false;

  return mode.endsWithParent || dependencyOnParent(mode.starts);
}

/**
 * Expands a mode or clones it if necessary
 *
 * This is necessary for modes with parental dependenceis (see notes on
 * `dependencyOnParent`) and for nodes that have `variants` - which must then be
 * exploded into their own individual modes at compile time.
 *
 * @param {Mode} mode
 * @returns {Mode | Mode[]}
 * */
function expandOrCloneMode(mode) {
  if (mode.variants && !mode.cachedVariants) {
    mode.cachedVariants = mode.variants.map(function(variant) {
      return inherit(mode, { variants: null }, variant);
    });
  }

  // EXPAND
  // if we have variants then essentially "replace" the mode with the variants
  // this happens in compileMode, where this function is called from
  if (mode.cachedVariants) {
    return mode.cachedVariants;
  }

  // CLONE
  // if we have dependencies on parents then we need a unique
  // instance of ourselves, so we can be reused with many
  // different parents without issue
  if (dependencyOnParent(mode)) {
    return inherit(mode, { starts: mode.starts ? inherit(mode.starts) : null });
  }

  if (Object.isFrozen(mode)) {
    return inherit(mode);
  }

  // no special dependency issues, just return ourselves
  return mode;
}

var version = "10.7.3";

// @ts-nocheck

function hasValueOrEmptyAttribute(value) {
  return Boolean(value || value === "");
}

function BuildVuePlugin(hljs) {
  const Component = {
    props: ["language", "code", "autodetect"],
    data: function() {
      return {
        detectedLanguage: "",
        unknownLanguage: false
      };
    },
    computed: {
      className() {
        if (this.unknownLanguage) return "";

        return "hljs " + this.detectedLanguage;
      },
      highlighted() {
        // no idea what language to use, return raw code
        if (!this.autoDetect && !hljs.getLanguage(this.language)) {
          console.warn(`The language "${this.language}" you specified could not be found.`);
          this.unknownLanguage = true;
          return escapeHTML(this.code);
        }

        let result = {};
        if (this.autoDetect) {
          result = hljs.highlightAuto(this.code);
          this.detectedLanguage = result.language;
        } else {
          result = hljs.highlight(this.language, this.code, this.ignoreIllegals);
          this.detectedLanguage = this.language;
        }
        return result.value;
      },
      autoDetect() {
        return !this.language || hasValueOrEmptyAttribute(this.autodetect);
      },
      ignoreIllegals() {
        return true;
      }
    },
    // this avoids needing to use a whole Vue compilation pipeline just
    // to build Highlight.js
    render(createElement) {
      return createElement("pre", {}, [
        createElement("code", {
          class: this.className,
          domProps: { innerHTML: this.highlighted }
        })
      ]);
    }
    // template: `<pre><code :class="className" v-html="highlighted"></code></pre>`
  };

  const VuePlugin = {
    install(Vue) {
      Vue.component('highlightjs', Component);
    }
  };

  return { Component, VuePlugin };
}

/* plugin itself */

/** @type {HLJSPlugin} */
const mergeHTMLPlugin = {
  "after:highlightElement": ({ el, result, text }) => {
    const originalStream = nodeStream(el);
    if (!originalStream.length) return;

    const resultNode = document.createElement('div');
    resultNode.innerHTML = result.value;
    result.value = mergeStreams(originalStream, nodeStream(resultNode), text);
  }
};

/* Stream merging support functions */

/**
 * @typedef Event
 * @property {'start'|'stop'} event
 * @property {number} offset
 * @property {Node} node
 */

/**
 * @param {Node} node
 */
function tag(node) {
  return node.nodeName.toLowerCase();
}

/**
 * @param {Node} node
 */
function nodeStream(node) {
  /** @type Event[] */
  const result = [];
  (function _nodeStream(node, offset) {
    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (child.nodeType === 3) {
        offset += child.nodeValue.length;
      } else if (child.nodeType === 1) {
        result.push({
          event: 'start',
          offset: offset,
          node: child
        });
        offset = _nodeStream(child, offset);
        // Prevent void elements from having an end tag that would actually
        // double them in the output. There are more void elements in HTML
        // but we list only those realistically expected in code display.
        if (!tag(child).match(/br|hr|img|input/)) {
          result.push({
            event: 'stop',
            offset: offset,
            node: child
          });
        }
      }
    }
    return offset;
  })(node, 0);
  return result;
}

/**
 * @param {any} original - the original stream
 * @param {any} highlighted - stream of the highlighted source
 * @param {string} value - the original source itself
 */
function mergeStreams(original, highlighted, value) {
  let processed = 0;
  let result = '';
  const nodeStack = [];

  function selectStream() {
    if (!original.length || !highlighted.length) {
      return original.length ? original : highlighted;
    }
    if (original[0].offset !== highlighted[0].offset) {
      return (original[0].offset < highlighted[0].offset) ? original : highlighted;
    }

    /*
    To avoid starting the stream just before it should stop the order is
    ensured that original always starts first and closes last:

    if (event1 == 'start' && event2 == 'start')
      return original;
    if (event1 == 'start' && event2 == 'stop')
      return highlighted;
    if (event1 == 'stop' && event2 == 'start')
      return original;
    if (event1 == 'stop' && event2 == 'stop')
      return highlighted;

    ... which is collapsed to:
    */
    return highlighted[0].event === 'start' ? original : highlighted;
  }

  /**
   * @param {Node} node
   */
  function open(node) {
    /** @param {Attr} attr */
    function attributeString(attr) {
      return ' ' + attr.nodeName + '="' + escapeHTML(attr.value) + '"';
    }
    // @ts-ignore
    result += '<' + tag(node) + [].map.call(node.attributes, attributeString).join('') + '>';
  }

  /**
   * @param {Node} node
   */
  function close(node) {
    result += '</' + tag(node) + '>';
  }

  /**
   * @param {Event} event
   */
  function render(event) {
    (event.event === 'start' ? open : close)(event.node);
  }

  while (original.length || highlighted.length) {
    let stream = selectStream();
    result += escapeHTML(value.substring(processed, stream[0].offset));
    processed = stream[0].offset;
    if (stream === original) {
      /*
      On any opening or closing tag of the original markup we first close
      the entire highlighted node stack, then render the original tag along
      with all the following original tags at the same offset and then
      reopen all the tags on the highlighted stack.
      */
      nodeStack.reverse().forEach(close);
      do {
        render(stream.splice(0, 1)[0]);
        stream = selectStream();
      } while (stream === original && stream.length && stream[0].offset === processed);
      nodeStack.reverse().forEach(open);
    } else {
      if (stream[0].event === 'start') {
        nodeStack.push(stream[0].node);
      } else {
        nodeStack.pop();
      }
      render(stream.splice(0, 1)[0]);
    }
  }
  return result + escapeHTML(value.substr(processed));
}

/*

For the reasoning behind this please see:
https://github.com/highlightjs/highlight.js/issues/2880#issuecomment-747275419

*/

/**
 * @type {Record<string, boolean>}
 */
const seenDeprecations = {};

/**
 * @param {string} message
 */
const error = (message) => {
  console.error(message);
};

/**
 * @param {string} message
 * @param {any} args
 */
const warn = (message, ...args) => {
  console.log(`WARN: ${message}`, ...args);
};

/**
 * @param {string} version
 * @param {string} message
 */
const deprecated = (version, message) => {
  if (seenDeprecations[`${version}/${message}`]) return;

  console.log(`Deprecated as of ${version}. ${message}`);
  seenDeprecations[`${version}/${message}`] = true;
};

/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/

const escape$1 = escapeHTML;
const inherit$1 = inherit;
const NO_MATCH = Symbol("nomatch");

/**
 * @param {any} hljs - object that is extended (legacy)
 * @returns {HLJSApi}
 */
const HLJS = function(hljs) {
  // Global internal variables used within the highlight.js library.
  /** @type {Record<string, Language>} */
  const languages = Object.create(null);
  /** @type {Record<string, string>} */
  const aliases = Object.create(null);
  /** @type {HLJSPlugin[]} */
  const plugins = [];

  // safe/production mode - swallows more errors, tries to keep running
  // even if a single syntax or parse hits a fatal error
  let SAFE_MODE = true;
  const fixMarkupRe = /(^(<[^>]+>|\t|)+|\n)/gm;
  const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
  /** @type {Language} */
  const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: 'Plain text', contains: [] };

  // Global options used when within external APIs. This is modified when
  // calling the `hljs.configure` function.
  /** @type HLJSOptions */
  let options = {
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: 'hljs-',
    tabReplace: null,
    useBR: false,
    languages: null,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: TokenTreeEmitter
  };

  /* Utility functions */

  /**
   * Tests a language name to see if highlighting should be skipped
   * @param {string} languageName
   */
  function shouldNotHighlight(languageName) {
    return options.noHighlightRe.test(languageName);
  }

  /**
   * @param {HighlightedHTMLElement} block - the HTML element to determine language for
   */
  function blockLanguage(block) {
    let classes = block.className + ' ';

    classes += block.parentNode ? block.parentNode.className : '';

    // language-* takes precedence over non-prefixed class names.
    const match = options.languageDetectRe.exec(classes);
    if (match) {
      const language = getLanguage(match[1]);
      if (!language) {
        warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
        warn("Falling back to no-highlight mode for this block.", block);
      }
      return language ? match[1] : 'no-highlight';
    }

    return classes
      .split(/\s+/)
      .find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
  }

  /**
   * Core highlighting function.
   *
   * OLD API
   * highlight(lang, code, ignoreIllegals, continuation)
   *
   * NEW API
   * highlight(code, {lang, ignoreIllegals})
   *
   * @param {string} codeOrlanguageName - the language to use for highlighting
   * @param {string | HighlightOptions} optionsOrCode - the code to highlight
   * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   * @param {CompiledMode} [continuation] - current continuation mode, if any
   *
   * @returns {HighlightResult} Result - an object that represents the result
   * @property {string} language - the language name
   * @property {number} relevance - the relevance score
   * @property {string} value - the highlighted HTML code
   * @property {string} code - the original raw code
   * @property {CompiledMode} top - top of the current mode stack
   * @property {boolean} illegal - indicates whether any illegal matches were found
  */
  function highlight(codeOrlanguageName, optionsOrCode, ignoreIllegals, continuation) {
    let code = "";
    let languageName = "";
    if (typeof optionsOrCode === "object") {
      code = codeOrlanguageName;
      ignoreIllegals = optionsOrCode.ignoreIllegals;
      languageName = optionsOrCode.language;
      // continuation not supported at all via the new API
      // eslint-disable-next-line no-undefined
      continuation = undefined;
    } else {
      // old API
      deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
      deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
      languageName = codeOrlanguageName;
      code = optionsOrCode;
    }

    /** @type {BeforeHighlightContext} */
    const context = {
      code,
      language: languageName
    };
    // the plugin can change the desired language or the code to be highlighted
    // just be changing the object it was passed
    fire("before:highlight", context);

    // a before plugin can usurp the result completely by providing it's own
    // in which case we don't even need to call highlight
    const result = context.result
      ? context.result
      : _highlight(context.language, context.code, ignoreIllegals, continuation);

    result.code = context.code;
    // the plugin can change anything in result to suite it
    fire("after:highlight", result);

    return result;
  }

  /**
   * private highlight that's used internally and does not fire callbacks
   *
   * @param {string} languageName - the language to use for highlighting
   * @param {string} codeToHighlight - the code to highlight
   * @param {boolean?} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   * @param {CompiledMode?} [continuation] - current continuation mode, if any
   * @returns {HighlightResult} - result of the highlight operation
  */
  function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
    /**
     * Return keyword data if a match is a keyword
     * @param {CompiledMode} mode - current mode
     * @param {RegExpMatchArray} match - regexp match data
     * @returns {KeywordData | false}
     */
    function keywordData(mode, match) {
      const matchText = language.case_insensitive ? match[0].toLowerCase() : match[0];
      return Object.prototype.hasOwnProperty.call(mode.keywords, matchText) && mode.keywords[matchText];
    }

    function processKeywords() {
      if (!top.keywords) {
        emitter.addText(modeBuffer);
        return;
      }

      let lastIndex = 0;
      top.keywordPatternRe.lastIndex = 0;
      let match = top.keywordPatternRe.exec(modeBuffer);
      let buf = "";

      while (match) {
        buf += modeBuffer.substring(lastIndex, match.index);
        const data = keywordData(top, match);
        if (data) {
          const [kind, keywordRelevance] = data;
          emitter.addText(buf);
          buf = "";

          relevance += keywordRelevance;
          if (kind.startsWith("_")) {
            // _ implied for relevance only, do not highlight
            // by applying a class name
            buf += match[0];
          } else {
            const cssClass = language.classNameAliases[kind] || kind;
            emitter.addKeyword(match[0], cssClass);
          }
        } else {
          buf += match[0];
        }
        lastIndex = top.keywordPatternRe.lastIndex;
        match = top.keywordPatternRe.exec(modeBuffer);
      }
      buf += modeBuffer.substr(lastIndex);
      emitter.addText(buf);
    }

    function processSubLanguage() {
      if (modeBuffer === "") return;
      /** @type HighlightResult */
      let result = null;

      if (typeof top.subLanguage === 'string') {
        if (!languages[top.subLanguage]) {
          emitter.addText(modeBuffer);
          return;
        }
        result = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
        continuations[top.subLanguage] = /** @type {CompiledMode} */ (result.top);
      } else {
        result = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
      }

      // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Use case in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.
      if (top.relevance > 0) {
        relevance += result.relevance;
      }
      emitter.addSublanguage(result.emitter, result.language);
    }

    function processBuffer() {
      if (top.subLanguage != null) {
        processSubLanguage();
      } else {
        processKeywords();
      }
      modeBuffer = '';
    }

    /**
     * @param {Mode} mode - new mode to start
     */
    function startNewMode(mode) {
      if (mode.className) {
        emitter.openNode(language.classNameAliases[mode.className] || mode.className);
      }
      top = Object.create(mode, { parent: { value: top } });
      return top;
    }

    /**
     * @param {CompiledMode } mode - the mode to potentially end
     * @param {RegExpMatchArray} match - the latest match
     * @param {string} matchPlusRemainder - match plus remainder of content
     * @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
     */
    function endOfMode(mode, match, matchPlusRemainder) {
      let matched = startsWith(mode.endRe, matchPlusRemainder);

      if (matched) {
        if (mode["on:end"]) {
          const resp = new Response(mode);
          mode["on:end"](match, resp);
          if (resp.isMatchIgnored) matched = false;
        }

        if (matched) {
          while (mode.endsParent && mode.parent) {
            mode = mode.parent;
          }
          return mode;
        }
      }
      // even if on:end fires an `ignore` it's still possible
      // that we might trigger the end node because of a parent mode
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, match, matchPlusRemainder);
      }
    }

    /**
     * Handle matching but then ignoring a sequence of text
     *
     * @param {string} lexeme - string containing full match text
     */
    function doIgnore(lexeme) {
      if (top.matcher.regexIndex === 0) {
        // no more regexs to potentially match here, so we move the cursor forward one
        // space
        modeBuffer += lexeme[0];
        return 1;
      } else {
        // no need to move the cursor, we still have additional regexes to try and
        // match at this very spot
        resumeScanAtSamePosition = true;
        return 0;
      }
    }

    /**
     * Handle the start of a new potential mode match
     *
     * @param {EnhancedMatch} match - the current match
     * @returns {number} how far to advance the parse cursor
     */
    function doBeginMatch(match) {
      const lexeme = match[0];
      const newMode = match.rule;

      const resp = new Response(newMode);
      // first internal before callbacks, then the public ones
      const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
      for (const cb of beforeCallbacks) {
        if (!cb) continue;
        cb(match, resp);
        if (resp.isMatchIgnored) return doIgnore(lexeme);
      }

      if (newMode && newMode.endSameAsBegin) {
        newMode.endRe = escape(lexeme);
      }

      if (newMode.skip) {
        modeBuffer += lexeme;
      } else {
        if (newMode.excludeBegin) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (!newMode.returnBegin && !newMode.excludeBegin) {
          modeBuffer = lexeme;
        }
      }
      startNewMode(newMode);
      // if (mode["after:begin"]) {
      //   let resp = new Response(mode);
      //   mode["after:begin"](match, resp);
      // }
      return newMode.returnBegin ? 0 : lexeme.length;
    }

    /**
     * Handle the potential end of mode
     *
     * @param {RegExpMatchArray} match - the current match
     */
    function doEndMatch(match) {
      const lexeme = match[0];
      const matchPlusRemainder = codeToHighlight.substr(match.index);

      const endMode = endOfMode(top, match, matchPlusRemainder);
      if (!endMode) { return NO_MATCH; }

      const origin = top;
      if (origin.skip) {
        modeBuffer += lexeme;
      } else {
        if (!(origin.returnEnd || origin.excludeEnd)) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (origin.excludeEnd) {
          modeBuffer = lexeme;
        }
      }
      do {
        if (top.className) {
          emitter.closeNode();
        }
        if (!top.skip && !top.subLanguage) {
          relevance += top.relevance;
        }
        top = top.parent;
      } while (top !== endMode.parent);
      if (endMode.starts) {
        if (endMode.endSameAsBegin) {
          endMode.starts.endRe = endMode.endRe;
        }
        startNewMode(endMode.starts);
      }
      return origin.returnEnd ? 0 : lexeme.length;
    }

    function processContinuations() {
      const list = [];
      for (let current = top; current !== language; current = current.parent) {
        if (current.className) {
          list.unshift(current.className);
        }
      }
      list.forEach(item => emitter.openNode(item));
    }

    /** @type {{type?: MatchType, index?: number, rule?: Mode}}} */
    let lastMatch = {};

    /**
     *  Process an individual match
     *
     * @param {string} textBeforeMatch - text preceeding the match (since the last match)
     * @param {EnhancedMatch} [match] - the match itself
     */
    function processLexeme(textBeforeMatch, match) {
      const lexeme = match && match[0];

      // add non-matched text to the current mode buffer
      modeBuffer += textBeforeMatch;

      if (lexeme == null) {
        processBuffer();
        return 0;
      }

      // we've found a 0 width match and we're stuck, so we need to advance
      // this happens when we have badly behaved rules that have optional matchers to the degree that
      // sometimes they can end up matching nothing at all
      // Ref: https://github.com/highlightjs/highlight.js/issues/2140
      if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
        // spit the "skipped" character that our regex choked on back into the output sequence
        modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
        if (!SAFE_MODE) {
          /** @type {AnnotatedError} */
          const err = new Error('0 width match regex');
          err.languageName = languageName;
          err.badRule = lastMatch.rule;
          throw err;
        }
        return 1;
      }
      lastMatch = match;

      if (match.type === "begin") {
        return doBeginMatch(match);
      } else if (match.type === "illegal" && !ignoreIllegals) {
        // illegal match, we do not continue processing
        /** @type {AnnotatedError} */
        const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');
        err.mode = top;
        throw err;
      } else if (match.type === "end") {
        const processed = doEndMatch(match);
        if (processed !== NO_MATCH) {
          return processed;
        }
      }

      // edge case for when illegal matches $ (end of line) which is technically
      // a 0 width match but not a begin/end match so it's not caught by the
      // first handler (when ignoreIllegals is true)
      if (match.type === "illegal" && lexeme === "") {
        // advance so we aren't stuck in an infinite loop
        return 1;
      }

      // infinite loops are BAD, this is a last ditch catch all. if we have a
      // decent number of iterations yet our index (cursor position in our
      // parsing) still 3x behind our index then something is very wrong
      // so we bail
      if (iterations > 100000 && iterations > match.index * 3) {
        const err = new Error('potential infinite loop, way more iterations than matches');
        throw err;
      }

      /*
      Why might be find ourselves here?  Only one occasion now.  An end match that was
      triggered but could not be completed.  When might this happen?  When an `endSameasBegin`
      rule sets the end rule to a specific match.  Since the overall mode termination rule that's
      being used to scan the text isn't recompiled that means that any match that LOOKS like
      the end (but is not, because it is not an exact match to the beginning) will
      end up here.  A definite end match, but when `doEndMatch` tries to "reapply"
      the end rule and fails to match, we wind up here, and just silently ignore the end.

      This causes no real harm other than stopping a few times too many.
      */

      modeBuffer += lexeme;
      return lexeme.length;
    }

    const language = getLanguage(languageName);
    if (!language) {
      error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
      throw new Error('Unknown language: "' + languageName + '"');
    }

    const md = compileLanguage(language, { plugins });
    let result = '';
    /** @type {CompiledMode} */
    let top = continuation || md;
    /** @type Record<string,CompiledMode> */
    const continuations = {}; // keep continuations for sub-languages
    const emitter = new options.__emitter(options);
    processContinuations();
    let modeBuffer = '';
    let relevance = 0;
    let index = 0;
    let iterations = 0;
    let resumeScanAtSamePosition = false;

    try {
      top.matcher.considerAll();

      for (;;) {
        iterations++;
        if (resumeScanAtSamePosition) {
          // only regexes not matched previously will now be
          // considered for a potential match
          resumeScanAtSamePosition = false;
        } else {
          top.matcher.considerAll();
        }
        top.matcher.lastIndex = index;

        const match = top.matcher.exec(codeToHighlight);
        // console.log("match", match[0], match.rule && match.rule.begin)

        if (!match) break;

        const beforeMatch = codeToHighlight.substring(index, match.index);
        const processedCount = processLexeme(beforeMatch, match);
        index = match.index + processedCount;
      }
      processLexeme(codeToHighlight.substr(index));
      emitter.closeAllNodes();
      emitter.finalize();
      result = emitter.toHTML();

      return {
        // avoid possible breakage with v10 clients expecting
        // this to always be an integer
        relevance: Math.floor(relevance),
        value: result,
        language: languageName,
        illegal: false,
        emitter: emitter,
        top: top
      };
    } catch (err) {
      if (err.message && err.message.includes('Illegal')) {
        return {
          illegal: true,
          illegalBy: {
            msg: err.message,
            context: codeToHighlight.slice(index - 100, index + 100),
            mode: err.mode
          },
          sofar: result,
          relevance: 0,
          value: escape$1(codeToHighlight),
          emitter: emitter
        };
      } else if (SAFE_MODE) {
        return {
          illegal: false,
          relevance: 0,
          value: escape$1(codeToHighlight),
          emitter: emitter,
          language: languageName,
          top: top,
          errorRaised: err
        };
      } else {
        throw err;
      }
    }
  }

  /**
   * returns a valid highlight result, without actually doing any actual work,
   * auto highlight starts with this and it's possible for small snippets that
   * auto-detection may not find a better match
   * @param {string} code
   * @returns {HighlightResult}
   */
  function justTextHighlightResult(code) {
    const result = {
      relevance: 0,
      emitter: new options.__emitter(options),
      value: escape$1(code),
      illegal: false,
      top: PLAINTEXT_LANGUAGE
    };
    result.emitter.addText(code);
    return result;
  }

  /**
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:

  - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - second_best (object with the same structure for second-best heuristically
    detected language, may be absent)

    @param {string} code
    @param {Array<string>} [languageSubset]
    @returns {AutoHighlightResult}
  */
  function highlightAuto(code, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    const plaintext = justTextHighlightResult(code);

    const results = languageSubset.filter(getLanguage).filter(autoDetection).map(name =>
      _highlight(name, code, false)
    );
    results.unshift(plaintext); // plaintext is always an option

    const sorted = results.sort((a, b) => {
      // sort base on relevance
      if (a.relevance !== b.relevance) return b.relevance - a.relevance;

      // always award the tie to the base language
      // ie if C++ and Arduino are tied, it's more likely to be C++
      if (a.language && b.language) {
        if (getLanguage(a.language).supersetOf === b.language) {
          return 1;
        } else if (getLanguage(b.language).supersetOf === a.language) {
          return -1;
        }
      }

      // otherwise say they are equal, which has the effect of sorting on
      // relevance while preserving the original ordering - which is how ties
      // have historically been settled, ie the language that comes first always
      // wins in the case of a tie
      return 0;
    });

    const [best, secondBest] = sorted;

    /** @type {AutoHighlightResult} */
    const result = best;
    result.second_best = secondBest;

    return result;
  }

  /**
  Post-processing of the highlighted markup:

  - replace TABs with something more useful
  - replace real line-breaks with '<br>' for non-pre containers

    @param {string} html
    @returns {string}
  */
  function fixMarkup(html) {
    if (!(options.tabReplace || options.useBR)) {
      return html;
    }

    return html.replace(fixMarkupRe, match => {
      if (match === '\n') {
        return options.useBR ? '<br>' : match;
      } else if (options.tabReplace) {
        return match.replace(/\t/g, options.tabReplace);
      }
      return match;
    });
  }

  /**
   * Builds new class name for block given the language name
   *
   * @param {HTMLElement} element
   * @param {string} [currentLang]
   * @param {string} [resultLang]
   */
  function updateClassName(element, currentLang, resultLang) {
    const language = currentLang ? aliases[currentLang] : resultLang;

    element.classList.add("hljs");
    if (language) element.classList.add(language);
  }

  /** @type {HLJSPlugin} */
  const brPlugin = {
    "before:highlightElement": ({ el }) => {
      if (options.useBR) {
        el.innerHTML = el.innerHTML.replace(/\n/g, '').replace(/<br[ /]*>/g, '\n');
      }
    },
    "after:highlightElement": ({ result }) => {
      if (options.useBR) {
        result.value = result.value.replace(/\n/g, "<br>");
      }
    }
  };

  const TAB_REPLACE_RE = /^(<[^>]+>|\t)+/gm;
  /** @type {HLJSPlugin} */
  const tabReplacePlugin = {
    "after:highlightElement": ({ result }) => {
      if (options.tabReplace) {
        result.value = result.value.replace(TAB_REPLACE_RE, (m) =>
          m.replace(/\t/g, options.tabReplace)
        );
      }
    }
  };

  /**
   * Applies highlighting to a DOM node containing code. Accepts a DOM node and
   * two optional parameters for fixMarkup.
   *
   * @param {HighlightedHTMLElement} element - the HTML element to highlight
  */
  function highlightElement(element) {
    /** @type HTMLElement */
    let node = null;
    const language = blockLanguage(element);

    if (shouldNotHighlight(language)) return;

    // support for v10 API
    fire("before:highlightElement",
      { el: element, language: language });

    node = element;
    const text = node.textContent;
    const result = language ? highlight(text, { language, ignoreIllegals: true }) : highlightAuto(text);

    // support for v10 API
    fire("after:highlightElement", { el: element, result, text });

    element.innerHTML = result.value;
    updateClassName(element, language, result.language);
    element.result = {
      language: result.language,
      // TODO: remove with version 11.0
      re: result.relevance,
      relavance: result.relevance
    };
    if (result.second_best) {
      element.second_best = {
        language: result.second_best.language,
        // TODO: remove with version 11.0
        re: result.second_best.relevance,
        relavance: result.second_best.relevance
      };
    }
  }

  /**
   * Updates highlight.js global options with the passed options
   *
   * @param {Partial<HLJSOptions>} userOptions
   */
  function configure(userOptions) {
    if (userOptions.useBR) {
      deprecated("10.3.0", "'useBR' will be removed entirely in v11.0");
      deprecated("10.3.0", "Please see https://github.com/highlightjs/highlight.js/issues/2559");
    }
    options = inherit$1(options, userOptions);
  }

  /**
   * Highlights to all <pre><code> blocks on a page
   *
   * @type {Function & {called?: boolean}}
   */
  // TODO: remove v12, deprecated
  const initHighlighting = () => {
    if (initHighlighting.called) return;
    initHighlighting.called = true;

    deprecated("10.6.0", "initHighlighting() is deprecated.  Use highlightAll() instead.");

    const blocks = document.querySelectorAll('pre code');
    blocks.forEach(highlightElement);
  };

  // Higlights all when DOMContentLoaded fires
  // TODO: remove v12, deprecated
  function initHighlightingOnLoad() {
    deprecated("10.6.0", "initHighlightingOnLoad() is deprecated.  Use highlightAll() instead.");
    wantsHighlight = true;
  }

  let wantsHighlight = false;

  /**
   * auto-highlights all pre>code elements on the page
   */
  function highlightAll() {
    // if we are called too early in the loading process
    if (document.readyState === "loading") {
      wantsHighlight = true;
      return;
    }

    const blocks = document.querySelectorAll('pre code');
    blocks.forEach(highlightElement);
  }

  function boot() {
    // if a highlight was requested before DOM was loaded, do now
    if (wantsHighlight) highlightAll();
  }

  // make sure we are in the browser environment
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('DOMContentLoaded', boot, false);
  }

  /**
   * Register a language grammar module
   *
   * @param {string} languageName
   * @param {LanguageFn} languageDefinition
   */
  function registerLanguage(languageName, languageDefinition) {
    let lang = null;
    try {
      lang = languageDefinition(hljs);
    } catch (error$1) {
      error("Language definition for '{}' could not be registered.".replace("{}", languageName));
      // hard or soft error
      if (!SAFE_MODE) { throw error$1; } else { error(error$1); }
      // languages that have serious errors are replaced with essentially a
      // "plaintext" stand-in so that the code blocks will still get normal
      // css classes applied to them - and one bad language won't break the
      // entire highlighter
      lang = PLAINTEXT_LANGUAGE;
    }
    // give it a temporary name if it doesn't have one in the meta-data
    if (!lang.name) lang.name = languageName;
    languages[languageName] = lang;
    lang.rawDefinition = languageDefinition.bind(null, hljs);

    if (lang.aliases) {
      registerAliases(lang.aliases, { languageName });
    }
  }

  /**
   * Remove a language grammar module
   *
   * @param {string} languageName
   */
  function unregisterLanguage(languageName) {
    delete languages[languageName];
    for (const alias of Object.keys(aliases)) {
      if (aliases[alias] === languageName) {
        delete aliases[alias];
      }
    }
  }

  /**
   * @returns {string[]} List of language internal names
   */
  function listLanguages() {
    return Object.keys(languages);
  }

  /**
    intended usage: When one language truly requires another

    Unlike `getLanguage`, this will throw when the requested language
    is not available.

    @param {string} name - name of the language to fetch/require
    @returns {Language | never}
  */
  function requireLanguage(name) {
    deprecated("10.4.0", "requireLanguage will be removed entirely in v11.");
    deprecated("10.4.0", "Please see https://github.com/highlightjs/highlight.js/pull/2844");

    const lang = getLanguage(name);
    if (lang) { return lang; }

    const err = new Error('The \'{}\' language is required, but not loaded.'.replace('{}', name));
    throw err;
  }

  /**
   * @param {string} name - name of the language to retrieve
   * @returns {Language | undefined}
   */
  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }

  /**
   *
   * @param {string|string[]} aliasList - single alias or list of aliases
   * @param {{languageName: string}} opts
   */
  function registerAliases(aliasList, { languageName }) {
    if (typeof aliasList === 'string') {
      aliasList = [aliasList];
    }
    aliasList.forEach(alias => { aliases[alias.toLowerCase()] = languageName; });
  }

  /**
   * Determines if a given language has auto-detection enabled
   * @param {string} name - name of the language
   */
  function autoDetection(name) {
    const lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }

  /**
   * Upgrades the old highlightBlock plugins to the new
   * highlightElement API
   * @param {HLJSPlugin} plugin
   */
  function upgradePluginAPI(plugin) {
    // TODO: remove with v12
    if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
      plugin["before:highlightElement"] = (data) => {
        plugin["before:highlightBlock"](
          Object.assign({ block: data.el }, data)
        );
      };
    }
    if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
      plugin["after:highlightElement"] = (data) => {
        plugin["after:highlightBlock"](
          Object.assign({ block: data.el }, data)
        );
      };
    }
  }

  /**
   * @param {HLJSPlugin} plugin
   */
  function addPlugin(plugin) {
    upgradePluginAPI(plugin);
    plugins.push(plugin);
  }

  /**
   *
   * @param {PluginEvent} event
   * @param {any} args
   */
  function fire(event, args) {
    const cb = event;
    plugins.forEach(function(plugin) {
      if (plugin[cb]) {
        plugin[cb](args);
      }
    });
  }

  /**
  Note: fixMarkup is deprecated and will be removed entirely in v11

  @param {string} arg
  @returns {string}
  */
  function deprecateFixMarkup(arg) {
    deprecated("10.2.0", "fixMarkup will be removed entirely in v11.0");
    deprecated("10.2.0", "Please see https://github.com/highlightjs/highlight.js/issues/2534");

    return fixMarkup(arg);
  }

  /**
   *
   * @param {HighlightedHTMLElement} el
   */
  function deprecateHighlightBlock(el) {
    deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
    deprecated("10.7.0", "Please use highlightElement now.");

    return highlightElement(el);
  }

  /* Interface definition */
  Object.assign(hljs, {
    highlight,
    highlightAuto,
    highlightAll,
    fixMarkup: deprecateFixMarkup,
    highlightElement,
    // TODO: Remove with v12 API
    highlightBlock: deprecateHighlightBlock,
    configure,
    initHighlighting,
    initHighlightingOnLoad,
    registerLanguage,
    unregisterLanguage,
    listLanguages,
    getLanguage,
    registerAliases,
    requireLanguage,
    autoDetection,
    inherit: inherit$1,
    addPlugin,
    // plugins for frameworks
    vuePlugin: BuildVuePlugin(hljs).VuePlugin
  });

  hljs.debugMode = function() { SAFE_MODE = false; };
  hljs.safeMode = function() { SAFE_MODE = true; };
  hljs.versionString = version;

  for (const key in MODES) {
    // @ts-ignore
    if (typeof MODES[key] === "object") {
      // @ts-ignore
      deepFreezeEs6(MODES[key]);
    }
  }

  // merge all the modes/regexs into our main object
  Object.assign(hljs, MODES);

  // built-in plugins, likely to be moved out of core in the future
  hljs.addPlugin(brPlugin); // slated to be removed in v11
  hljs.addPlugin(mergeHTMLPlugin);
  hljs.addPlugin(tabReplacePlugin);
  return hljs;
};

// export an "instance" of the highlighter
var highlight = HLJS({});

var core = highlight;

/*
 Language: Gherkin
 Author: Sam Pikesley (@pikesley) <sam.pikesley@theodi.org>
 Description: Gherkin is the format for cucumber specifications. It is a domain specific language which helps you to describe business behavior without the need to go into detail of implementation.
 Website: https://cucumber.io/docs/gherkin/
 */

function gherkin(hljs) {
  return {
    name: 'Gherkin',
    aliases: ['feature'],
    keywords: 'Feature Background Ability Business\ Need Scenario Scenarios Scenario\ Outline Scenario\ Template Examples Given And Then But When',
    contains: [
      {
        className: 'symbol',
        begin: '\\*',
        relevance: 0
      },
      {
        className: 'meta',
        begin: '@[^@\\s]+'
      },
      {
        begin: '\\|',
        end: '\\|\\w*$',
        contains: [
          {
            className: 'string',
            begin: '[^|]+'
          }
        ]
      },
      {
        className: 'variable',
        begin: '<',
        end: '>'
      },
      hljs.HASH_COMMENT_MODE,
      {
        className: 'string',
        begin: '"""',
        end: '"""'
      },
      hljs.QUOTE_STRING_MODE
    ]
  };
}

var gherkin_1 = gherkin;

core.registerLanguage("gherkin", gherkin_1);
const CucumberAddon = ({ story }, children) => {
  var _a;
  let code = (_a = story.parent.parameters) === null || _a === void 0 ? void 0 : _a.scenario;
  let result;
  try {
    result = core.highlight("gherkin", code);
  }
  catch (e) {
    // No scenario or invalid. Ignoring.
  }
  return (h$1("div", null,
    h$1("details", null,
      h$1("summary", null, "Specs"),
      result && h$1("pre", { innerHTML: result.value })),
    children));
};

const stories = [
  ShareButton,
  ShareLink,
  BigStat,
  Leaderboard,
  LeaderboardRank,
  UseShareLink,
  UseShareButton,
  UseBigStat,
  UseEditProfile,
  UseLeaderboard,
  Router,
  PortalFrame,
  EditProfile$2,
  FormMessage,
  NewPortal,
  SidebarItem,
  NavigationSidebar,
  PortalLogin,
  PortalRegister,
  PortalForgotPassword,
  PortalEmailVerification,
  PortalResetPassword,
  PortalVerifyEmail,
  AssetCard,
  DividedLayout,
  ChangePassword,
  PortalProfile,
  ReferralTable$1,
  ReferralTableCell,
  ReferralTableRewardsCell,
  UserName,
  PasswordField,
  TaskCard$1,
  PortalTemplates,
  ProgramMenu,
  PoweredByImg,
  PortalFooter,
  Hero,
  ReferralIframe$1,
  NameFields$1,
  RewardExchangeList,
  UseRewardExchangeList,
  UseTaskCard,
  UseRewardsTable,
  ProgramExplainer,
  ProgramExplainerStep$1,
  BrandStories,
  CardFeed,
  PortalContainer,
  RewardsTableCell,
  RewardsTable,
  UseReferralTable,
  HeroImage,
  ReferralCard,
  Image$1,
  TitledSection,
];
let StencilStorybook = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    h$2(this);
  }
  disconnectedCallback() { }
  render() {
    const { class: Style, children } = f(stories, {
      h: h$1,
      title: "Mint Components",
      addons: [CucumberAddon, ShadowViewAddon, HookStoryAddon],
    });
    const [selectedTheme, setSelected] = useState("Default");
    const [checkerboard, setCheckerboard] = useState(true);
    const themes = Object.keys(Themes);
    const theme = Themes[selectedTheme];
    return (h$1(Host, { class: Style, onClick: {} }, h$1("div", { style: {
        position: "absolute",
        top: "0",
        right: "0",
        zIndex: "999999",
      } }, "Branding:", h$1("select", { onChange: (e) => setSelected(e.target.value) }, themes.map((t) => (h$1("option", { selected: t === selectedTheme }, t)))), h$1("div", null, h$1("div", null)), h$1(ColorScale, null), h$1("br", null), h$1("input", { type: "checkbox", id: "checkerboard", onClick: () => setCheckerboard(!checkerboard), onChange: () => document.documentElement.style.setProperty("--checker-color-1", checkerboard ? "#ebebeb" : "#ffffff00") }), h$1("label", { htmlFor: "checkerboard" }, "Checkerboard?")), h$1("style", null, theme), h$1("style", null, ResizerStylesheet), children));
  }
};
function ColorScale() {
  return (h$1("span", null, h$1(ColorToken, null), h$1(ColorToken, { type: "success" }), h$1(ColorToken, { type: "warning" }), h$1(ColorToken, { type: "danger" }), h$1(ColorToken, { type: "neutral" })));
}
function ColorToken({ type = "primary" }) {
  return (h$1("span", { style: {
      background: `var(--sl-color-${type}-500)`,
      width: "1em",
      marginRight: "2px",
      padding: "0 4px",
    }, title: type }, type.charAt(0)));
}

export { StencilStorybook as sqm_stencilbook };
