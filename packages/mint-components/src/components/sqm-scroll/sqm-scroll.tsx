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

  // SL Default Props
  // @Prop() variant: string; - our version of SL uses 'type' as above
  @Prop() size: string;
  @Prop() outline: boolean;
  @Prop() pill: boolean;
  @Prop() href: string;
  @Prop() circle: boolean;
  @Prop() name: string;
  @Prop() target: string;
  @Prop() download: string;
  @Prop() disabled: boolean;
  @Prop() caret: boolean;
  @Prop() loading: boolean;
  @Prop() iconSlot: string;
  @Prop() iconName: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { callbacks } = useScroll(this);

    return (
      <Host style={{ display: "contents" }}>
        <sl-button
          type={this.buttonType}
          onClick={callbacks.scroll}
          size={this.size}
          outline={this.outline}
          pill={this.pill}
          href={this.href}
          circle={this.circle}
          name={this.name}
          target={this.target}
          download={this.download}
          disabled={this.disabled}
          caret={this.caret}
          loading={this.loading}
        >
          {this.iconSlot && this.iconName && (
            <sl-icon slot={this.iconSlot} name={this.iconName}></sl-icon>
          )}
          {this.buttonText}
        </sl-button>
      </Host>
    );
  }
}
