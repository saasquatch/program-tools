import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";

/**
 * @uiName Text
 * @validParents ["sqm-portal-container","div","sqm-divided-layout","sqm-brand","template","sqm-hero","sqm-big-stat","span","sqm-text-span","sqb-program-section","sqb-conditional-section"]
 * @slots [{"name":"", "title":"Text"}]
 * @slotEditor richText
 * @canvasRenderer always-replace
 */
@Component({
  tag: "sqm-text",
  shadow: false,
})
export class Text {
  @State()
  ignored = true;

  /**
   * Font size in pixels
   * @uiName Font Size
   * @uiType number
   */
  @Prop() fontSize?: number;

  /**
   * @uiName Text Color
   * @uiWidget color
   * @format color
   */
  @Prop() textColor?: string;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  componentWillLoad() {}

  render() {
    const vanillaStyle = `
    sqm-text {
      display: block;
      color: ${this.textColor || "var(--sqm-text)"};
    }

    sqm-text h1 {
      font-size: ${
        this.fontSize ? `${this.fontSize}px` : "var(--sl-font-size-xxx-large)"
      };
      font-weight: var(--sl-font-weight-semibold);
      color: ${this.textColor || "var(--sqm-text)"};
      margin: 0;
    }

    sqm-text h2 {
      font-size: ${
        this.fontSize ? `${this.fontSize}px` : "var(--sl-font-size-xx-large)"
      };
      font-weight: var(--sl-font-weight-semibold);
      color: ${this.textColor || "var(--sqm-text)"};
      margin: 0;
    }

    sqm-text h3 {
      font-size: ${
        this.fontSize ? `${this.fontSize}px` : "var(--sl-font-size-x-large)"
      };
      font-weight: var(--sl-font-weight-semibold);
      color: ${this.textColor || "var(--sqm-text)"};
      margin: 0;
    }

    sqm-text h4 {
      font-size: ${
        this.fontSize ? `${this.fontSize}px` : "var(--sl-font-size-large)"
      };
      font-weight: var(--sl-font-weight-bold);
      color: ${this.textColor || "var(--sqm-text)"};
      margin: 0;
    }

    sqm-text p {
      font-size: ${
        this.fontSize ? `${this.fontSize}px` : "var(--sl-font-size-medium)"
      };
      font-weight: var(--sl-font-weight-normal);
      color: ${this.textColor || "var(--sqm-text)"};
      margin: 0;
    }

    sqm-text sub {
      font-size: ${
        this.fontSize ? `${this.fontSize}px` : "var(--sl-font-size-small)"
      };
      font-weight: var(--sl-font-weight-normal);
      color: ${this.textColor || "var(--sqm-text)"};
      margin: 0;
    }
    `;
    return (
      <div>
        <style>{vanillaStyle}</style>
        <slot />
      </div>
    );
  }
}
