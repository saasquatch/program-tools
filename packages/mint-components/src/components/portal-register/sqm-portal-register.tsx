import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, State } from "@stencil/core";
import {
  PortalRegisterView,
  PortalRegisterViewProps,
} from "./sqm-portal-register-view";
import { usePortalRegister } from "./usePortalRegister";

/**
 * @uiName Portal Register
 */
@Component({
  tag: "sqm-portal-register",
  styleUrl: "sqm-portal-register.scss",
  shadow: true,
})
export class PortalRegister {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, refs } =
      false && isDemo() ? useRegisterDemo() : usePortalRegister();
    return <PortalRegisterView states={states} refs={refs} />;
  }
}
function useRegisterDemo(): PortalRegisterViewProps {
  return {
    states: { error: "", loading: false },
    refs: { formRef: {} },
  };
}
