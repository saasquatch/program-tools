import { Component, h, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";

const vanillaStyle = `
  sqm-text {
    display: block;
  }

  sqm-text h1 {
    font-size: var(--sl-font-size-xxx-large);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-800);
    margin: 0;
  }

  sqm-text h2 {
    font-size: var(--sl-font-size-xx-large);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-800);
    margin: 0;
  }

  sqm-text h3 {
    font-size: var(--sl-font-size-x-large);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-800);
    margin: 0;
  }

  sqm-text h4 {
    font-size: var(--sl-font-size-large);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-800);
    margin: 0;
  }

  sqm-text p {
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-800);
    margin: 0;
  }

  sqm-text sub {
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-400);
    margin: 0;
  }
`;

/**
 * @uiName Text
 * @slots [{"name":"", "title":"Text"}]
 * @slotEditor richText
 * @canvasRenderer always-replace
 * @exampleGroup Typography
 * @example H1 - <sqm-text><h1>H1 Header Text</h1></sqm-text>
 * @example H2 - <sqm-text><h2>H2 Header Text</h2></sqm-text>
 * @example H3 - <sqm-text><h3>H3 Header Text</h3></sqm-text>
 * @example H4 - <sqm-text><h4>H4 Header Text</h4></sqm-text>
 * @example Paragraph - <sqm-text><p>Paragraph Text</p></sqm-text>
 * @canvasRenderer always-replace
 */
@Component({
  tag: "sqm-text",
  shadow: false,
})
export class Text {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  componentWillLoad() {}

  render() {
    return (
      <div>
        <style>{vanillaStyle}</style>
        <slot />
      </div>
    );
  }
}
