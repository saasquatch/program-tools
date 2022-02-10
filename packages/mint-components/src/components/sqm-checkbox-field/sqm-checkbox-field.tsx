import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import {
  CheckboxFieldView,
  CheckboxFieldViewProps,
} from "./sqm-checkbox-field-view";
import { useCheckboxField } from "./useCheckboxField";

/**
 * @uiName Name Fields
 */
@Component({
  tag: "sqm-checkbox-field",
})
export class NameFields {
  @State()
  ignored = true;

  /**
   * @uiName Checkbox name attribute
   */
  @Prop() checkboxName: string = "agreement";

  /**
   * @uiName Checkbox label
   */
  @Prop() checkboxLabel: string = "By signing up you agree to the {labelLink}";

  @Prop() checkboxLabelLink: string = "https://example.com";
  @Prop() checkboxLabelLinkText: string = "Terms and Conditions";
  /**
   * @uiName Unchecked error message
   */
  @Prop() errorMessage: string = "Must be checked";

  // TODO: should this be configurable?
  @Prop() checkboxRequired?: boolean = true;

  /** @undocumented */
  @Prop() demoData?: DemoData<CheckboxFieldViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const content = {
      ...getProps(this),
    };

    const { states, callbacks } = isDemo()
      ? useCheckboxFieldDemo(this)
      : useCheckboxField();
    return (
      <CheckboxFieldView
        states={states}
        content={content}
        callbacks={callbacks}
      ></CheckboxFieldView>
    );
  }
}
function useCheckboxFieldDemo(
  props: NameFields
): Partial<CheckboxFieldViewProps> {
  return deepmerge(
    {
      states: {
        validationErrors: [],
        checked: false,
      },
      callbacks: {
        setChecked: () => {},
      },
      refs: {
        checkboxRef: null,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
