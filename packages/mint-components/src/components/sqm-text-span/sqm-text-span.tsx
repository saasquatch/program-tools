import { Component, h, Host, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { TextSpanView } from "./sqm-text-span-view";

/**
 * @uiName Text Span
 */
@Component({
  tag: "sqm-text-span",
  shadow: false,
})
export class Text {
  @State()
  ignored = true;

  @Prop() text: string;

  @Prop() type: "p" | "subtext" | "h1" | "h2" | "h3" | "h4";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  componentWillLoad() {}

  render() {
    return <TextSpanView type={this.type}>{this.text}</TextSpanView>;
  }
}
