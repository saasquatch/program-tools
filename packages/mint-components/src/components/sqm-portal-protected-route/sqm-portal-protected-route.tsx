import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { h, Component, Prop, State, Host } from "@stencil/core";
import { usePortalProtectedRoute } from "./usePortalProtectedRoute";

/**
 * @uiName Portal Protected Route
 */
@Component({
  tag: "sqm-portal-protected-route",
  shadow: true,
})
export class PortalProtectedRoute {
  @State()
  ignored = true;

  @Prop()
  redirectTo = "/";

  @Prop()
  requireEmailVerification = false;

  @Prop()
  redirectToUnverified = "/emailVerification";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const hasUser = isDemo()
      ? usePortalProtectedRouteDemo(this)
      : usePortalProtectedRoute(this);

    return (
      <Host style={{ display: hasUser ? "contents" : "none" }}>
        <slot />
      </Host>
    );
  }
}

function usePortalProtectedRouteDemo({}) {
  return true;
}
