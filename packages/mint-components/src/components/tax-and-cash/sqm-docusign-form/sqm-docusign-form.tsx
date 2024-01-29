import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { TaxFormStepTwoProps } from "../sqm-indirect-tax-form/sqm-indirect-tax-form-view";
import { useDocusignForm } from "./useDocusignForm";
import { DocusignFormView } from "./sqm-docusign-form-view";

/**
 * @uiName Tax And Cash
 * @exampleGroup Common Components
 * @example User Name Display - <sqm-user-name fallback="Anonymous User" loading-text="..."></sqm-user-name>
 */
@Component({
  tag: "sqm-docusign-form",
  shadow: false,
})
export class DocusignForm {
  @State() ignored = true;

  @Prop() step: string = "Step";
  @Prop() stepOf: string = "of";
  @Prop() taxForm: string = "Tax Form";
  @Prop() submitButton: string = "Continue";
  @Prop() backButton: string = "Back";
  @Prop() formSubmissionError: string = "Form could not submit";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<TaxFormStepTwoProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    // const props = isDemo() ? useUserNameDemo(this) : useUserName();
    const props = useDocusignForm(getProps(this));

    return (
      <Host>
        <DocusignFormView
          callbacks={props.callbacks}
          states={props.states}
          text={props.text}
        />
      </Host>
    );
  }
}

function useTaxAndCashDemo(props) {
  return deepmerge({}, props.demoData || {}, { arrayMerge: (_, a) => a });
}
