import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { h, Component, Prop, State, Host } from "@stencil/core";
import { usePortalProtectedRoute } from "./usePortalProtectedRoute";

/**
 * @uiName Microsite Protected Route
 * @slots [{"name":"","title":"Route Content"}]
 */
@Component({
  tag: "sqm-portal-protected-route",
  shadow: true,
})
export class PortalProtectedRoute {
  @State()
  ignored = true;

  /**
   * Redirect participants to this path they are not logged in.
   * 
   * @uiName Redirect Path
   */
  @Prop()
  redirectTo: string = "/";

  /**
   * @uiName Require Email Verification
   */
  @Prop()
  requireEmailVerification: boolean = false;

  /**
   * Redirect participants to this path when email verification is required but they have not verified their email.
   * 
   * @uiName Unverified Participant Redirect Path
   */
  @Prop()
  redirectToUnverified: string = "/emailVerification";

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
