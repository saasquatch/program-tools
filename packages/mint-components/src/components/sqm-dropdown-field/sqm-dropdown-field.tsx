import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { RequiredPropsError } from "../../utils/RequiredPropsError";
import { getMissingProps, getProps } from "../../utils/utils";
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
   * @uiName Unselected error message
   */
  @Prop() errorMessage: string = "Select an option";

  /**
   * @uiName Optional
   */
  @Prop() dropdownOptional?: boolean = false;

  /** @undocumented */
  @Prop() demoData?: DemoData<DropdownFieldViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const missingProps = getMissingProps([
      {
        attribute: "dropdown-name",
        value: this.dropdownName,
      },
    ]);

    if (!isDemo() && missingProps) {
      return <RequiredPropsError missingProps={missingProps} />;
    }

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
