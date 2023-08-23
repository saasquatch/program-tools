import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { RequiredPropsError } from "../../utils/RequiredPropsError";
import { getMissingProps, getProps } from "../../utils/utils";
import {
  CheckboxFieldView,
  CheckboxFieldViewProps,
} from "./sqm-checkbox-field-view";
import { useCheckboxField } from "./useCheckboxField";

/**
 * @uiName Form Checkbox Field
 * @validParents ["sqm-portal-register","sqm-portal-registration-form"]
 * @exampleGroup Microsite Components
 * @example Form Checkbox Field - <sqm-checkbox-field checkbox-label="By signing up you agree to the {labelLink}" checkbox-label-link="https://example.com" checkbox-label-link-text="Terms and Conditions" error-message="Must be checked" ></sqm-checkbox-field>
 */
@Component({
  tag: "sqm-checkbox-field",
})
export class CheckboxField {
  @State()
  ignored = true;

  /**
   * This name is used as the key for this form field on submission. The name must be unique within this specific form.
   * @uiName Checkbox name attribute
   * @required
   */
  @Prop() checkboxName: string;

  /**
   * @uiName Checkbox label
   * @uiWidget textArea
   */
  @Prop() checkboxLabel: string = "By signing up you agree to the {labelLink}";

  /**
   * Used with link text if the checkbox label contains {labelLink}
   *
   * @uiName Checkbox label link
   */
  @Prop() checkboxLabelLink: string = "https://example.com";

  /**
   * @uiName Checkbox label link lext
   */
  @Prop() checkboxLabelLinkText: string = "Terms and Conditions";

  /**
   * @uiName Unchecked error message
   */
  @Prop() errorMessage: string = "Must be checked";

  /**
   * @uiName Optional
   */
  @Prop() checkboxOptional?: boolean = false;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<CheckboxFieldViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const missingProps = getMissingProps([
      {
        attribute: "checkbox-name",
        value: this.checkboxName,
      },
    ]);

    if (!isDemo() && missingProps) {
      return (
        <RequiredPropsError
          missingProps={missingProps}
          heading={"An error occured while loading this form"}
          subheading={
            "A technical problem prevented this checkbox field from loading. Please contact us with the link to this page."
          }
          description={"Values for the following attributes are missing:"}
        />
      );
    }

    const content = {
      ...getProps(this),
    };

    const { states, callbacks } = isDemo()
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
  props: CheckboxField
): Partial<CheckboxFieldViewProps> {
  return deepmerge(
    {
      states: {
        registrationFormState: {},
        checked: false,
      },
      callbacks: {
        setChecked: () => {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
