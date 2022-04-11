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
   * @uiName Dropdown Name Attribute
   */
  @Prop() dropdownName: string;

  /**
   * @uiName Dropdown Label
   */
  @Prop() dropdownLabel: string = "Select an option";
  /**
   * @uiName Unselected Error Message
   */
  @Prop() errorMessage: string = "Select an option";

  /**
   * @uiName Dropdown Required
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

    const { states } = isDemo()
      ? useDropdownFieldDemo(this)
      : useDropdownField();
    return (
      <DropdownFieldView states={states} content={content}></DropdownFieldView>
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
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
