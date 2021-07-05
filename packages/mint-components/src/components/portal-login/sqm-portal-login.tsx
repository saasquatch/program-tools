import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, State } from "@stencil/core";
import { PortalLoginView, PortalLoginViewProps } from "./sqm-portal-login-view";
import { usePortalLogin } from "./usePortalLogin";

/**
 * @uiName Portal Login
 */
@Component({
  tag: "sqm-portal-login",
  styleUrl: "sqm-portal-login.scss",
  shadow: true,
})
export class PortalLogin {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, refs } =
      false && isDemo() ? useLoginDemo() : usePortalLogin();
    return <PortalLoginView states={states} refs={refs} />;
  }
}
function useLoginDemo(): PortalLoginViewProps {
  return {
    states: { error: "", loading: false },
    refs: { formRef: {} },
  };
}
