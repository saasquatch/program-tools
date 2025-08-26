import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { RequiredPropsError } from "../../utils/RequiredPropsError";
import { getMissingProps, getProps } from "../../utils/utils";
import {
  LeadInputFieldView,
  LeadInputFieldViewProps,
} from "./sqm-lead-input-field-view";
import { useLeadInputField } from "./useLeadInputField";

/**
 * @uiName Lead Form Input Field
 * @validParents ["sqm-lead-form"]
 * @exampleGroup Microsite Components
 * @example Lead Form Input Field - <sqm-input-field input-label="Field Label" field-type="text" error-message="Cannot be empty"></sqm-input-field>
 */
@Component({
  tag: "sqm-lead-input-field",
})
export class LeadInputField {
  @State()
  ignored = true;

  /**
   * This name is used as the key for this form field on submission. The name must be unique within this specific form.
   *
   * @uiName Input name attribute
   * @required
   */
  @Prop() fieldName: string;

  /**
   * @uiName Input label
   */
  @Prop() fieldLabel: string;

  /**
   * @uiName Optional label
   */
  @Prop() optionalLabel: string = "(optional)";

  /**
   * @uiName Input type
   * @uiType string
   * @uiEnum ["text", "date", "tel"]
   * @uiEnumNames ["Text", "Date", "Phone Number"]
   */
  @Prop() fieldType: "text" | "date" | "tel" = "text";

  /**
   * The message to be displayed when a required field is not filled.
   *
   * @uiName Required field message
   * @uiWidget textArea
   */
  @Prop() requiredFieldErrorMessage: string = "Please enter a {fieldLabel}";

  /**
   * @uiName Optional
   * @default
   */
  @Prop() fieldOptional?: boolean = false;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<LeadInputFieldViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const content = {
      ...getProps(this),
    };

    const missingProps = getMissingProps([
      {
        attribute: "field-name",
        value: this.fieldName,
      },
    ]);

    if (!isDemo() && missingProps) {
      return (
        <RequiredPropsError
          missingProps={missingProps}
          heading={"An error occured while loading this form"}
          subheading={
            "A technical problem prevented this input field from loading. Please contact us with the link to this page."
          }
          description={"Values for the following attributes are missing:"}
        />
      );
    }
    const { states } = isDemo()
      ? useLeadInputFieldDemo(this)
      : useLeadInputField();
    return (
      <LeadInputFieldView
        states={states}
        content={content}
      ></LeadInputFieldView>
    );
  }
}
function useLeadInputFieldDemo(
  props: LeadInputField
): Partial<LeadInputFieldViewProps> {
  return deepmerge(
    {
      states: {
        leadForState: {},
      },
      content: {
        fieldName: props.fieldName,
        fieldLabel: props.fieldLabel,
        fieldType: props.fieldType,
        requiredFieldErrorMessage: props.requiredFieldErrorMessage,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
