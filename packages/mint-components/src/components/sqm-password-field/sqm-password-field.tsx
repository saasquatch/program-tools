import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useState } from "@saasquatch/universal-hooks";
import { Component, h, Prop, State, VNode } from "@stencil/core";
import deepmerge from "deepmerge";
import { RegistrationFormState } from "../sqm-portal-registration-form/useRegistrationFormState";
import { validateNewPassword } from "./passwordValidation";
import {
  PortalPasswordFieldViewProps,
  PortalResetPasswordView,
} from "./sqm-password-field-view";
import { usePasswordField } from "./usePasswordField";

export interface PasswordFieldViewDemoProps {
  initValue: string;
  states: {
    enableValidation: boolean;
    validationErrors: Record<string, string>;
    registrationFormState: RegistrationFormState;
    content: {
      fieldLabel: string;
    };
  };
}

/**
 * @uiName Form Password Field
 * @validParents ["sqm-portal-register","sqm-portal-registration-form"]
 * @exampleGroup Microsite Components
 * @example Form Password Field - <sqm-password-field slot="formData" field-label="Password" enable-validation></sqm-password-field>
 */
@Component({
  tag: "sqm-password-field",
})
export class PortalPasswordField {
  @State()
  ignored = true;

  /**
   * Label for password field
   *
   * @uiName Password Label
   */
  @Prop()
  fieldLabel: string = "Password";

  /**
   * Enable live password validation
   * @uiName Enable Validation
   */
  @Prop() enableValidation: boolean = true;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: PasswordFieldViewDemoProps;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks } = isDemo()
      ? usePasswordFieldDemo(this)
      : usePasswordField(this);
    return <PortalResetPasswordView states={states} callbacks={callbacks} />;
  }
}

function usePasswordFieldDemo(
  props: PortalPasswordField
): PortalPasswordFieldViewProps {
  const [dynamicValidation, setDynamicValidation] = useState<VNode | string>(
    ""
  );
  const [lastValidated, setLastValidated] = useState<string>("");

  if (props.demoData && lastValidated != props?.demoData?.initValue) {
    const validation = validateNewPassword(props?.demoData?.initValue || "");
    setDynamicValidation(props?.demoData?.initValue === "" ? "" : validation);
    setLastValidated(props?.demoData?.initValue);
  }

  function onInput(input: Event) {
    const validation = validateNewPassword(
      (input.target as HTMLInputElement).value
    );
    setDynamicValidation(validation);
  }

  return deepmerge(
    {
      states: {
        enableValidation: true,
        dynamicValidation,
        validationErrors: props?.demoData?.states?.validationErrors || {},
        registrationFormState: {},
        content: {
          fieldLabel: "Password",
        },
      },
      callbacks: {
        onInput,
      },
    },
    props?.demoData?.states || {},
    { arrayMerge: (_, a) => a }
  );
}
