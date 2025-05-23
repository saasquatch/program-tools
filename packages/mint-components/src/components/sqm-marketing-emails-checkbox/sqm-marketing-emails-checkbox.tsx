import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import {
  CheckboxFieldView,
  CheckboxFieldViewProps,
} from "../sqm-checkbox-field/sqm-checkbox-field-view";
import { useCheckboxField } from "../sqm-checkbox-field/useCheckboxField";

/**
 * @uiName Marketing Emails Checkbox Field
 * @validParents ["sqm-portal-register","sqm-portal-registration-form"]
 * @requiredFeatures ["MARKETING_EMAILS"]
 */
@Component({
  tag: "sqm-marketing-emails-checkbox",
})
export class MarketingEmailsCheckbox {
  @State()
  ignored = true;

  /**
   * @uiName Checkbox label
   * @uiWidget textArea
   */
  @Prop() checkboxLabel: string =
    "I would like to receive marketing and promotional emails for this referral program";

  /**
   * @undocumented
   */
  @Prop() checkboxName: string = "marketingEmailOptIn";

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
  props: MarketingEmailsCheckbox
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
