import { Component, h, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";

const vanillaStyle = `
  sqm-text {
    display: block;
    color: var(--sqm-text);
  }

  sqm-text h1 {
    font-size: var(--sl-font-size-xxx-large);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sqm-text);
    margin: 0;
  }

  sqm-text h2 {
    font-size: var(--sl-font-size-xx-large);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sqm-text);
    margin: 0;
  }

  sqm-text h3 {
    font-size: var(--sl-font-size-x-large);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sqm-text);
    margin: 0;
  }

  sqm-text h4 {
    font-size: var(--sl-font-size-large);
    font-weight: var(--sl-font-weight-bold);
    color: var(--sqm-text);
    margin: 0;
  }

  sqm-text p {
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sqm-text);
    margin: 0;
  }

  sqm-text sub {
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sqm-text);
    margin: 0;
  }
`;

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
