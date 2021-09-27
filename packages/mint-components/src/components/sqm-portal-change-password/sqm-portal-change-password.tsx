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
   * @uiName Header for the change password modal
   */
  @Prop() modalChangePasswordHeader: string = "Change Password";

  /**
   * @uiName Text for cancel password change text button within the modal
   */
  @Prop() cancelText: string = "Cancel";

  /**
   * @uiName Text for change password button within the modal
   */
  @Prop() changePasswordButtonText: string = "Change Password";

  /**
   * @uiName Label for password field
   */
  @Prop() passwordFieldLabel: string = "Password";

  /**
   * @uiName Label for password confirmation field
   */
  @Prop()
  confirmPasswordFieldLabel: string = "Confirm new password";

  /**
   * @uiName Message displayed upon successful password change
   */
  @Prop() successMessage: string = "Your password has been updated.";

  /**
   * @uiName Header for the change password section within the portal
   */
  @Prop() portalChangePasswordHeader: string = "Password";

  /**
   * @uiName Text for the change password button within the portal
   */
  @Prop() portalChangePasswordButtonText: string = "Change your password...";

  /** @undocumented */
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
