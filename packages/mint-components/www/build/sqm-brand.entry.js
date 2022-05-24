import { r as registerInstance, h as h$1, j as Host } from './index-832bd454.js';
import { n as h, i as useEffect } from './stencil-hooks.module-f4b05383.js';
import { a as autoColorScaleCss } from './AutoColor-a6e72867.js';

/**
 * Build a font CSS URL using the Google Fonts CSS API
 *
 * Docs: https://developers.google.com/fonts/docs/css2
 *
 * @param fonts - the font family or families to load
 * @returns url to a .css file
 */
function buildFontsCssUrl(...fonts) {
  const queryString = fonts.map(f => `family=${encodeURIComponent(f)}`).join("&");
  return `https://fonts.googleapis.com/css2?${queryString}`;
}

let BrandComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    h(this);
  }
  disconnectedCallback() { }
  render() {
    var _a, _b;
    const brandColor = (_a = this.brandColor) !== null && _a !== void 0 ? _a : "#FFF";
    const css = autoColorScaleCss(brandColor);
    const sanitizedFont = ((_b = this.brandFont) !== null && _b !== void 0 ? _b : "").trim() || undefined;
    useEffect(() => {
      if (!sanitizedFont) {
        // Nothing required in default case.
        return;
      }
      const sheet = document.createElement("link");
      sheet.setAttribute("href", buildFontsCssUrl(sanitizedFont));
      sheet.setAttribute("rel", "stylesheet");
      document.head.appendChild(sheet);
      return () => document.head.removeChild(sheet);
    }, [sanitizedFont]);
    const font = sanitizedFont !== null && sanitizedFont !== void 0 ? sanitizedFont : "";
    return (h$1(Host, null, h$1("style", null, `
          :host{
            display: contents;
          }
          /* 
          Selects any element placed inside a slot
           - resets css variable inheritence for fonts
          
          */
          ::slotted(*) {
            --sl-font-sans: "${font}", arial;
            --sl-input-font-family: "${font}", arial;
            --sl-tooltip-font-family: "${font}", arial;
            font-family:  "${font}", arial;

            ${css}
            --sl-focus-ring-color-primary: var(--sl-color-primary-100);
            --sl-input-border-color-focus: var(--sl-color-primary-500);
            --sl-color-primary-hue: var(--sl-color-primary-500);
          }`), h$1("slot", null)));
  }
};

export { BrandComponent as sqm_brand };
