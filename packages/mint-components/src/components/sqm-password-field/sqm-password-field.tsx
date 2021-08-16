import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useState } from "@saasquatch/universal-hooks";
import { Component, h, Prop, State, VNode } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { validateNewPassword } from "./passwordValidation";
import {
  PortalPasswordFieldViewProps,
  PortalResetPasswordView,
} from "./sqm-password-field-view";
import { usePasswordField } from "./usePasswordField";

/**
 * @uiName Portal Password Field
 */
@Component({
  tag: "sqm-password-field",
})
export class PortalPasswordField {
  @State()
  ignored = true;

  @Prop()
  fieldLabel: string = "Password";

  @Prop() enableValidation: boolean = true;

  /** @undocumented */
  @Prop() demoData?: DemoData<PortalPasswordFieldViewProps>;

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
        validationErrors: {},
        content: {
          fieldLabel: "Password",
        },
      },
      callbacks: {
        onInput,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
