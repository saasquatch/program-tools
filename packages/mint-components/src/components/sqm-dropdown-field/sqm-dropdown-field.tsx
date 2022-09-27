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
 * @uiName Form Dropdown Field
 * @validParents ["sqm-portal-register","sqm-portal-registration-form"]
 * @slots [{"name":"", "title":"Drop Down Option"}]
 * @exampleGroup Microsite Components
 * @example Form Dropdown Field - <sqm-dropdown-field dropdown-label="Select an option" error-message="Select an option"><sl-menu-item value="option-1">Option 1</sl-menu-item><sl-menu-item value="option-2">Option 2</sl-menu-item><sl-menu-item value="option-3">Option 3</sl-menu-item></sqm-dropdown-field>
 */
@Component({
  tag: "sqm-dropdown-field",
})
export class DropdownField {
  @State()
  ignored = true;

  /**
   * This name is used as the key for this form field on submission. The name must be unique within this specific form.
   * @uiName Dropdown Name Attribute
   * @required
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
   * @uiName Optional
   * @default
   */
  @Prop() dropdownOptional?: boolean = false;

  /**
   * @undocumented
   * @uiType object
   */
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
      return (
        <RequiredPropsError
          missingProps={missingProps}
          heading={"An error occured while loading this form"}
          subheading={
            "A technical problem prevented this drop down field from loading. Please contact us with the link to this page."
          }
          description={"Values for the following attributes are missing:"}
        >
          <slot />
        </RequiredPropsError>
      );
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
        registrationFormState: {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
