import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { RequiredPropsError } from "../../utils/RequiredPropsError";
import { getMissingProps, getProps } from "../../utils/utils";
import {
  LeadDropdownFieldView,
  DropdownFieldViewProps,
} from "./sqm-lead-dropdown-field-view";
import { useLeadDropdownField } from "./useLeadDropdownField";

/**
 * @uiName Lead Form Dropdown Field
 * @validParents ["sqm-lead-form"]
 * @slots [{"name":"", "title":"Drop Down Option"}]
 * @exampleGroup Microsite Components
 * @example Lead Form Dropdown Field - <sqm-lead-dropdown-field dropdown-label="Select an option" required-field-error-message="Please select an option"><sl-menu-item value="option-1">Option 1</sl-menu-item><sl-menu-item value="option-2">Option 2</sl-menu-item><sl-menu-item value="option-3">Option 3</sl-menu-item></sqm-lead-dropdown-field>
 */
@Component({
  tag: "sqm-lead-dropdown-field",
})
export class LeadDropdownField {
  @State()
  ignored = true;

  /**
   * This name is used as the key for this form field on submission. The name must be unique within this specific form.
   * @uiName Dropdown name attribute
   * @required
   */
  @Prop() dropdownName: string;

  /**
   * @uiName Dropdown label
   */
  @Prop() dropdownLabel: string = "Select an option";

  /**
   * The message to be displayed when a required field is not filled.
   *
   * @uiName Required field message
   * @uiWidget textArea
   */
  @Prop() requiredFieldErrorMessage: string = "Please select a {dropdownLabel}";

  /**
   * @uiName Optional label
   */
  @Prop() optionalLabel: string = "(optional)";

  /**
   * @uiName Optional
   * @default
   */
  @Prop() dropdownOptional: boolean = false;

  /**
   * @uiName Multiple selection
   * @default
   */
  @Prop() multiple: boolean = false;

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
      ? useLeadDropdownFieldDemo(this)
      : useLeadDropdownField();
    return (
      <LeadDropdownFieldView
        states={states}
        content={content}
      ></LeadDropdownFieldView>
    );
  }
}

function useLeadDropdownFieldDemo(
  props: LeadDropdownField
): Partial<DropdownFieldViewProps> {
  return deepmerge(
    {
      states: {
        leadFormState: {},
      },
      content: {
        dropdownName: props.dropdownName,
        dropdownLabel: props.dropdownLabel,
        requiredFieldErrorMessage: props.requiredFieldErrorMessage,
        dropdownOptional: props.dropdownOptional,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
