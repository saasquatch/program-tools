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
 * @example Form Password Field - <sqm-password-field field-label="Password"></sqm-password-field>
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
   * Disable live password validation
   * @uiName Disable Validation
   */
  @Prop() disableValidation: boolean = false;

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
        enableValidation: !props.disableValidation,
        dynamicValidation,
        validationErrors: props?.demoData?.states?.validationErrors || {},
        registrationFormState: {},
        content: {
          fieldLabel: props.fieldLabel,
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
