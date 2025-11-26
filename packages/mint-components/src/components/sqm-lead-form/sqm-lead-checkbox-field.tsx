import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { RequiredPropsError } from "../../utils/RequiredPropsError";
import { getMissingProps, getProps } from "../../utils/utils";
import {
  LeadCheckboxFieldView,
  LeadCheckboxFieldViewProps,
} from "./sqm-lead-checkbox-field-view";
import { useLeadCheckboxField } from "./useCheckboxField";

/**
 * @uiName Lead Form Checkbox Field
 * @validParents ["sqm-lead-form"]
 */
@Component({
  tag: "sqm-lead-checkbox-field",
})
export class LeadCheckboxField {
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
  @Prop() checkboxLabelLink?: string = "https://example.com";

  /**
   * @uiName Checkbox label link lext
   */
  @Prop() checkboxLabelLinkText?: string = "Terms and Conditions";

  /**
   * @uiName Unchecked error message
   */
  @Prop() errorMessage?: string = "Must be checked";

  /**
   * @uiName Optional
   */
  @Prop() checkboxOptional?: boolean = false;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<LeadCheckboxFieldViewProps>;

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

    const { states } = isDemo()
      ? useLeadCheckboxFieldDemo(this)
      : useLeadCheckboxField();
    return (
      <LeadCheckboxFieldView
        states={states}
        content={content}
      ></LeadCheckboxFieldView>
    );
  }
}
function useLeadCheckboxFieldDemo(
  props: LeadCheckboxField
): Partial<LeadCheckboxFieldViewProps> {
  return deepmerge(
    {
      states: {
        leadFormState: {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
