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
  shadow: true,
})
export class PortalPasswordField {
  @State()
  ignored = true;

  @Prop()
  fieldLabel: string = "Password";

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
      states: {},
      callbacks: {
        validateNewPassword: () => {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
