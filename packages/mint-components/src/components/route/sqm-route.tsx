import { h, Component, State, Prop, Host } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
export interface RouteProps {
  path: string;
}

/**
 * @uiName Route (for pages)
 */
@Component({
  tag: "sqm-route",
  shadow: true,
})
export class StencilStorybook {
  @State()
  ignored = true;

  /**
   * @uiName Navigation path name
   */
  @Prop() path: string;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    return (
      <Host style={{ display: "contents" }}>
        <slot />
      </Host>
    );
  }
}
