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
import { useState } from "@saasquatch/universal-hooks";

/**
 * @uiName Microsite Password Change
 */
@Component({
  tag: "sqm-portal-change-password",
  shadow: true,
})
export class PortalChangePassword {
  @State()
  ignored = true;

  /**
   * @uiName Change Password Modal Header
   */
  @Prop() modalChangePasswordHeader: string = "Change Password";

  /**
   * Found in modal
   *
   * @uiName Cancel Button Text
   */
  @Prop() cancelText: string = "Cancel";

  /**
   * Found in modal
   *
   * @uiName Change Password Button Text
   */
  @Prop() changePasswordButtonText: string = "Change Password";

  /**
   * Found in modal
   *
   * @uiName New Password Field Label
   */
  @Prop() passwordFieldLabel: string = "New Password";

  /**
   * Found in modal
   *
   * @uiName Confirm Password Label
   */
  @Prop()
  confirmPasswordFieldLabel: string = "Confirm New Password";

  /**
   * Successful password change message
   *
   * @uiName Successful Password Change Message
   * @uiWidget textArea
   */
  @Prop() successMessage: string = "Your password has been updated.";

  /**
   * Portal change password section header
   *
   * @uiName Change Password Header
   */
  @Prop() portalChangePasswordHeader: string = "Password";

  /**
   * @uiName Change Password Button Text
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
  const [open, setOpen] = useState(false);

  return deepmerge(
    {
      states: {
        open,
        error: "",
        content: {
          modalChangePasswordHeader: props.modalChangePasswordHeader,
          cancelText: props.cancelText,
          changePasswordButtonText: props.changePasswordButtonText,
          passwordFieldLabel: props.passwordFieldLabel,
          confirmPasswordFieldLabel: props.confirmPasswordFieldLabel,
          successMessage: props.successMessage,
          portalChangePasswordHeader: props.portalChangePasswordHeader,
          portalChangePasswordButtonText: props.portalChangePasswordButtonText,
        },
      },
      callbacks: {
        setOpen: (update) => setOpen(update),
        submit: (e) => console.log("Submit", e),
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
