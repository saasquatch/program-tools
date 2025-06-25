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
 * @validParents ["sqm-portal-container","div","sqm-divided-layout","sqm-brand"]
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
   * Found in modal
   *
   * @uiName Cancel button text
   */
  @Prop() cancelText: string = "Cancel";

  /**
   * Found in modal
   *
   * @uiName Change password button text
   */
  @Prop() changePasswordButtonText: string = "Change Password";

  /**
   * Found in modal
   *
   * @uiName New password field label
   */
  @Prop() passwordFieldLabel: string = "New Password";

  /**
   * Found in modal
   *
   * @uiName Confirm password Label
   */
  @Prop()
  confirmPasswordFieldLabel: string = "Confirm New Password";

  /**
   * Successful password change message
   *
   * @uiName Successful password change message
   * @uiWidget textArea
   */
  @Prop() successMessage: string = "Your password has been updated.";

  /**
   * Portal change password section header
   *
   * @uiName Change password header
   */
  @Prop() portalChangePasswordHeader: string = "Password";

  /**
   * @uiName Change password button text
   */
  @Prop() portalChangePasswordButtonText: string = "Change your password...";

  /**
   * @uiName Password requirement met
   */
  @Prop() meetsRequirementsText: string = "Password has met all requirements";

  /**
   * @uiName Password requirement failed
   */
  @Prop() doesNotMeetRequirementsText: string =
    "Password must meet the following requirements:";

  /**
   * @uiName Minimum length text
   */
  @Prop() minErrorText: string = "be a minimum of 8 characters";

  /**
   * @uiName Missing uppercase text
   */
  @Prop() uppercaseErrorText: string = "contain at least 1 uppercase character";

  /**
   * @uiName Missing lowercase text
   */
  @Prop() lowercaseErrorText: string = "contain at least 1 lowercase character";

  /**
   * @uiName Passwords don’t match error message
   */
  @Prop() nonMatchingPasswordErrorText: string =
    "contain at least 1 lowercase character";

  /**
   * @uiName Invalid user session error message
   */
  @Prop() invalidSessionErrorText: string =
    "Please log in again to change your password.";

  /**
   * @uiName Missing number or symbol text
   */
  @Prop() hasErrorText: string = "contain at least 1 number or symbol";

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
          meetsRequirementsText: props.meetsRequirementsText,
          doesNotMeetRequirementsText: props.doesNotMeetRequirementsText,
          minErrorText: props.minErrorText,
          uppercaseErrorText: props.uppercaseErrorText,
          lowercaseErrorText: props.lowercaseErrorText,
          hasErrorText: props.hasErrorText,
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
