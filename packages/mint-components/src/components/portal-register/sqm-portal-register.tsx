import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
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

  @Prop()
  nextPage = "/";

  @Prop()
  nextPageUrlParameter = "nextPage";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks } =
      false && isDemo() ? useRegisterDemo(this) : usePortalRegister(this);
    return <PortalRegisterView states={states} callbacks={callbacks} />;
  }
}
function useRegisterDemo({
  nextPage,
  nextPageUrlParameter,
}): PortalRegisterViewProps {
  return {
    states: { error: "", loading: false },
    callbacks: {
      submit: async (_event) => {
        nextPage;
        nextPageUrlParameter;
      },
    },
  };
}
