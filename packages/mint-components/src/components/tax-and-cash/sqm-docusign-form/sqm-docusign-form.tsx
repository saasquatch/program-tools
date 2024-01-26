import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import {
  TaxFormStepTwoProps,
  TaxFormStepTwoView,
} from "../sqm-tax-form/sqm-tax-form-step-2-view";
import { useDocusignForm } from "./useDocusignForm";

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

  @Prop() w9: string = "W9";
  @Prop() w8: string = "W8-BEN";
  @Prop() w8e: string = "W8-BEN-E";
  @Prop() submitButton: string = "Continue";
  @Prop() backButton: string = "Back";

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
        <h2>HELLO</h2>
        {/* <TaxFormStepTwoView
          states={{
            loading: false,
            submitDisabled: false,
            formState: {
              checked: "hstCanada",
              errors: undefined,
              error: "",
            },
          }}
          callbacks={{
            onSubmit: () => props.setStep("/3"),
            onChange: function (e: any): void {
              throw new Error("Function not implemented.");
            },
            onBack: () => props.setStep("/1"),
          }}
          text={{ ...props.text }}
        /> */}
      </Host>
    );
  }
}

function useTaxAndCashDemo(props) {
  return deepmerge({}, props.demoData || {}, { arrayMerge: (_, a) => a });
}
