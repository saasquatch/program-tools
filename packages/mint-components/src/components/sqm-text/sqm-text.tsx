import { Component, h, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { insertCSS } from "../../insertcss";
import debugFn from "debug";

const debug = debugFn("sq:global");

const textStyles = `
  sqm-text {
    display: block;
  }

  sqm-text h1 {
    font-size: var(--sl-font-size-xx-large);
    font-weight: 600;
    color: var(--sl-color-gray-800);
    margin: 0;
  }

  sqm-text h2 {
    font-size: var(--sl-font-size-x-large);
    font-weight: 600;
    color: var(--sl-color-gray-800);
    margin: 0;
  }

  sqm-text h3 {
    font-size: var(--sl-font-size-large);
    font-weight: 600;
    color: var(--sl-color-gray-800);
    margin: 0;
  }

  sqm-text h4 {
    font-size: 13px;
    font-weight: 600;
    color: var(--sl-color-gray-800);
    margin: 0;
  }

  sqm-text p {
    font-size: var(--sl-font-size-small);
    font-weight: 400;
    color: var(--sl-color-gray-800);
    margin: 0;
  }

  sqm-text p[light] {
    font-size: var(--sl-font-size-small);
    font-weight: 400;
    color: var(--sl-color-gray-600);
    margin: 0;
  }
`;

/**
 * @uiName Text
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

  componentWillLoad() {
    try {
      insertCSS(textStyles);
    } catch (error) {
      debug(error);
    }
  }

  render() {
    return <slot />;
  }
}
