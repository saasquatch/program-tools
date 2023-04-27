import { h, Component, State, Prop, Host } from "@stencil/core";
export interface RouteProps {
  path: string;
}

/**
 * @uiName Route
 * @slots [{"name":"","title":"Content"}]
 */
@Component({
  tag: "sqm-route",
  shadow: true,
})
export class SqmRoute {
  @State()
  ignored = true;

  /**
   * Page Path URL for this route.
   * @uiName Navigation path name
   */
  @Prop() path: string;

  disconnectedCallback() {}

  render() {
    return <Host style={{ display: "contents" }}></Host>;
  }
}
