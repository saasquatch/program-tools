import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import {
  PortalChangePasswordViewProps,
  PortalChangePasswordView,
} from "./sqm-portal-change-password-view";
import { usePortalChangePassword } from "./usePortalChangePassword";
import { isDemo } from "@saasquatch/component-boilerplate";
import { DemoData } from "../../global/demo";
import deepmerge from "deepmerge";

/**
 * @uiName Portal Profile
 */
@Component({
  tag: "sqm-portal-change-password",
  shadow: true,
})
export class PortalChangePassword {
  @State()
  ignored = true;

  /**
   * @uiName Change password modal header
   */
  @Prop() modalChangePasswordHeader: string = "Change Password";

  /**
   * @uiName Modal cancel password change button text
   */
  @Prop() cancelText: string = "Cancel";

  /**
   * @uiName Modal change password button text
   */
  @Prop() changePasswordButtonText: string = "Change Password";

  /**
   * @uiName Password input field label
   */
  @Prop() passwordFieldLabel: string = "Password";

  /**
   * @uiName Password confirmation input field label
   */
  @Prop()
  confirmPasswordFieldLabel: string = "Confirm new password";

  /**
   * @uiName Successful password change message
   */
  @Prop() successMessage: string = "Your password has been updated.";

  /**
   * @uiName Portal change password section header
   */
  @Prop() portalChangePasswordHeader: string = "Password";

  /**
   * @uiName Portal change password button text
   */
  @Prop() portalChangePasswordButtonText: string = "Change your password...";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PortalChangePasswordViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { states, callbacks } = isDemo()
      ? usePortalChangePasswordDemo(this)
      : usePortalChangePassword(this);
    return <PortalChangePasswordView states={states} callbacks={callbacks} />;
  }
}

function usePortalChangePasswordDemo(props: PortalChangePassword) {
  return deepmerge(
    {
      states: {
        open: true,
        error: "",
        content: {
          modalChangePasswordHeader: "Change Password",
          cancelText: "Cancel",
          changePasswordButtonText: "Change Password",
          passwordFieldLabel: "Password",
          confirmPasswordFieldLabel: "Confirm new password",
          successMessage: "Your password has been updated.",
          portalChangePasswordHeader: "Password",
          portalChangePasswordButtonText: "Change your password...",
        },
      },
      callbacks: {
        setOpen: (o) => console.log(o),
        submit: (e) => console.log("Submit", e),
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
