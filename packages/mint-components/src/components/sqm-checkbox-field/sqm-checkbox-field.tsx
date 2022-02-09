import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
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
   * @uiName First name field label
   */
  @Prop() checkboxLabel: string = "Agree";

  /**
   * @uiName Last name field label
   */
  @Prop() checkboxName: string = "agreement";

  /**
   * @uiName Last name field label
   */
  @Prop() errorMessage: string = "Must be checked";

  /** @undocumented */
  @Prop() demoData?: DemoData<CheckboxFieldViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, content, callbacks } = isDemo()
      ? useCheckboxFieldDemo(this)
      : useCheckboxField(this);
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
      content: {
        checkboxLabel: "Agree",
        checkboxName: "agreement",
        errorMessage: "Must be checked",
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
