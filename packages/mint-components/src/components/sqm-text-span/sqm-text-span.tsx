import { Component, h, Host, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { PresetText } from "../../functional-components/PresetText";

const vanillaStyle = `
  :host{
    display: inline;
  }
`;

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
    return (
      <Host>
        <style>{vanillaStyle}</style>
        <PresetText type={this.type}>{this.text}</PresetText>
      </Host>
    );
  }
}
