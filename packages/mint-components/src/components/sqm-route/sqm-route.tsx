import { h, Component, State, Prop, Host } from "@stencil/core";
export interface RouteProps {
  path: string;
}

/**
 * @uiName Route
 * @validParents ["sqm-portal-container","div","sqm-divided-layout","sqm-brand","template","sqm-hero","sqm-tab"]
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
