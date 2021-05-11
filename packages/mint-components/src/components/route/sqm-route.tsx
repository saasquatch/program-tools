import { h, Component, State, Prop, Host } from "@stencil/core";
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

  disconnectedCallback() {}

  render() {
    return <Host style={{ display: "contents" }}></Host>;
  }
}
