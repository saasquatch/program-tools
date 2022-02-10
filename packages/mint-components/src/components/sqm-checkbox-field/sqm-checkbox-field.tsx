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
   * @uiName Last name field label
   */
  @Prop() checkboxName: string = "agreement";

  /**
   * @uiName Last name field label
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
    const labelSlot = (
      <slot>
        <p>
          By signing up you agree to the{" "}
          <a href="https://example.com" target="_blank">
            Terms and Conditions
          </a>
        </p>
      </slot>
    );

    const content = {
      ...getProps(this),
      labelSlot,
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
