import { isDemo, navigation } from "@saasquatch/component-boilerplate";
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

  @Prop()
  emailLabel = "Email";

  @Prop()
  passwordLabel = "Password";

  @Prop()
  submitLabel = "Register";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks } = isDemo()
      ? useRegisterDemo(this)
      : usePortalRegister(this);
    const content = {
      formData: <slot name="formData"></slot>,
      secondaryButton: (
        <slot name="secondaryButton">
          <sl-button
            type="text"
            disabled={states.loading}
            onClick={() => navigation.push("/login")}
          >
            Sign In
          </sl-button>
        </slot>
      ),
      emailLabel: this.emailLabel,
      passwordLabel: this.passwordLabel,
      submitLabel: this.submitLabel,
    };
    return (
      <PortalRegisterView
        states={states}
        callbacks={callbacks}
        content={content}
      ></PortalRegisterView>
    );
  }
}
function useRegisterDemo({
  nextPage,
  nextPageUrlParameter,
}): Pick<PortalRegisterViewProps, "states" | "callbacks"> {
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
