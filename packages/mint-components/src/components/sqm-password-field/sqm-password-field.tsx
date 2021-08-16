import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
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
  return deepmerge(
    {
      states: {
        enableValidation: true,
        content: {
          fieldLabel: "Password",
        },
      },
      callbacks: {
        onInput: (_: InputEvent) => {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
