import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, Host, State } from "@stencil/core";
import { useScroll } from "./useScroll";

@Component({
  tag: "sqm-scroll",
  shadow: true,
})
export class Scroll {
  @State()
  ignored = true;

  @Prop() buttonType: string = "primary";
  @Prop() buttonText: string;
  @Prop() scrollTagName?: string;
  @Prop() scrollId?: string;
  @Prop() scrollAnimation: "smooth" | "auto" = "smooth";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { callbacks } = useScroll(this);

    return (
      <Host style={{ display: "block" }}>
        <sl-button type={this.buttonType} onClick={callbacks.scroll}>
          {this.buttonText}
        </sl-button>
      </Host>
    );
  }
}
