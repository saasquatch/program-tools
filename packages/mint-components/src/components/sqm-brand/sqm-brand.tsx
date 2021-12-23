import { withHooks } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import { Component, h, Host, Prop } from "@stencil/core";
import { buildFontsCssUrl } from "../../fonts/GoogleFonts";
import { autoColorScaleCss } from "../sqm-stencilbook/AutoColor";

/**
 *
 * @uiName Brand Container
 * @slot Controls the brand color and font of Mint Components wrapped by the container.
 */
@Component({
  tag: "sqm-brand",
  shadow: true,
})
export class BrandComponent {
  /**
   * Controls the primary brand color used in the Mint Components library. Note that this
   * does not affect vanilla components or other component libraries.
   *
   * @uiName Brand Color
   */
  @Prop() brandColor: string;

  /**
   * The brand font that you want to use
   *
   * @uiName Brand Font
   */
  @Prop() brandFont: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const brandColor = this.brandColor ?? "inherit";
    const css = autoColorScaleCss(brandColor);
    const sanitizedFont = (this.brandFont ?? "").trim() || undefined;

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

    const font = sanitizedFont ?? "inherit";

    return (
      <Host>
        <style>{`
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
          }`}</style>
        <slot />
      </Host>
    );
  }
}
