import { h, Component, State, Prop, Host } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useRoute } from "./useRoute";

export interface RouteProps {
  path: string;
}

/**
 * @uiName Route (for pages)
 */
@Component({
  tag: "sqm-route",
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
    const { states } = useRoute(this);
    return states.currentPath === states.path ? <slot /> : <Host></Host>;
  }
}
