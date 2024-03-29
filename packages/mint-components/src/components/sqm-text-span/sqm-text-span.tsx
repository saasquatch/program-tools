import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { TextSpanView } from "./sqm-text-span-view";

/**
 * @uiName Text Span
 * @canvasRenderer always-replace
 */
@Component({
  tag: "sqm-text-span",
  shadow: false,
})
export class Text {
  @State()
  ignored = true;

  /**
   * @uiName Text
   */
  @Prop() text: string;

  /**
   * @uiName Type
   * @uiType string
   * @uiEnum ["p", "subtext", "h1", "h2", "h3", "h4"]
   * @uiEnumNames ["Paragraph", "Subtext", "Header 1", "Header 2", "Header 3", "Header 4"]
   */
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
