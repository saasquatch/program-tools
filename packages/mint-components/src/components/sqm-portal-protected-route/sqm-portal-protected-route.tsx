import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { h, Component, Prop, State, Host } from "@stencil/core";
import { usePortalProtectedRoute } from "./usePortalProtectedRoute";

/**
 * @uiName Microsite Protected Route
 * @validParents ["sqm-portal-container","div","sqm-divided-layout","sqm-brand","template", "sqb-program-section", "sqb-conditional-section"]
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
   * Redirect participants to this page they are not logged in.
   *
   * @uiName Unauthenticated participant redirect
   */
  @Prop()
  redirectTo: string = "/";

  /**
   * @uiName Require email verification
   */
  @Prop()
  requireEmailVerification: boolean = false;

  /**
   * Redirect participants to this page when email verification is required but they have not verified their email.
   *
   * @uiName Unverified participant redirect
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
