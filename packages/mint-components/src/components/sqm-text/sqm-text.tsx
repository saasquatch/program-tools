import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { insertCSS } from "../../insertcss";
import debugFn from "debug";

const debug = debugFn("sq:global");

const textStyles = `
  sqm-text {
    display: block;
  }

  sqm-text h1 {
    font-size: 36px;
    font-weight: 600;
    color: #555555;
    margin: 0;
  }

  sqm-text h2 {
    font-size: 24px;
    font-weight: 600;
    color: #555555;
    margin: 0;
  }

  sqm-text h3 {
    font-size: 18px;
    font-weight: 600;
    color: #555555;
    margin: 0;
  }

  sqm-text h4 {
    font-size: 13px;
    font-weight: 600;
    color: #555555;
    margin: 0;
  }

  sqm-text p {
    font-size: 14px;
    font-weight: 400;
    color: #555555;
    margin: 0;
  }

  sqm-text p[light] {
    font-size: 12px;
    font-weight: 400;
    color: #777777;
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
    return <slot />
  }
}
