import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import {
  DropdownFieldView,
  DropdownFieldViewProps,
} from "./sqm-dropdown-field-view";
import { useDropdownField } from "./useDropdownField";

/**
 * @uiName Dropdown Field
 */
@Component({
  tag: "sqm-dropdown-field",
})
export class DropdownField {
  @State()
  ignored = true;

  /**
   * @uiName Dropdown name attribute
   */
  @Prop() dropdownName: string;

  /**
   * @uiName Dropdown label
   */
  @Prop() dropdownLabel: string = "Select an option";
  /**
   * @uiName Unchecked error message
   */
  @Prop() errorMessage: string = "Must select an option";

  /**
   * @uiName Required
   */
  @Prop() dropdownRequired?: boolean = true;

  /** @undocumented */
  @Prop() demoData?: DemoData<DropdownFieldViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const content = {
      ...getProps(this),
      selectOptions: <slot></slot>,
    };

    const { states, callbacks } = isDemo()
      ? useDropdownFieldDemo(this)
      : useDropdownField();
    return (
      <DropdownFieldView
        states={states}
        content={content}
        callbacks={callbacks}
      ></DropdownFieldView>
    );
  }
}
function useDropdownFieldDemo(
  props: DropdownField
): Partial<DropdownFieldViewProps> {
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
