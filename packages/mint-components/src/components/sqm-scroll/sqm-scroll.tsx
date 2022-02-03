import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, Host, State } from "@stencil/core";

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
    return (
      <Host style={{ display: "block" }}>
        <sl-button
          type={this.buttonType}
          onClick={() =>
            document
              .querySelector(this.scrollTagName || `#${this.scrollId}`)
              .scrollIntoView({ behavior: this.scrollAnimation })
          }
        >
          {this.buttonText}
        </sl-button>
      </Host>
    );
  }
}
