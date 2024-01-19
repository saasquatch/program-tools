import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { UserNameViewProps } from "../sqm-tax-and-cash/sqm-tax-and-cash-view";
import { TaxFormStepOneView } from "./sqm-tax-form-step-1-view";
import { useTaxForm } from "./useTaxForm";

/**
 * @uiName Tax And Cash
 * @exampleGroup Common Components
 * @example User Name Display - <sqm-user-name fallback="Anonymous User" loading-text="..."></sqm-user-name>
 */
@Component({
  tag: "sqm-tax-form",
  shadow: false,
})
export class TaxForm {
  @State() ignored = true;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UserNameViewProps>;

  @Prop()
  firstName: string = "First name";
  @Prop() lastName: string = "Last name";
  @Prop() email: string = "Email";
  @Prop() country: string = "Country";
  @Prop() currency: string = "Currency";
  @Prop() indirectTaxNumber: string = "Tax Number";
  @Prop() allowBankingCollection: string = "I agree to the terms";
  @Prop() submitButton: string = "Submit";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    // const props = isDemo() ? useUserNameDemo(this) : useUserName();
    const props = useTaxForm(getProps(this));

    return (
      <Host>
        <TaxFormStepOneView
          states={{
            loading: false,
            submitDisabled: false,
            formState: {
              firstName: "",
              lastName: "",
              email: "",
              country: "",
              currency: "",
              indirectTaxNumber: "",
              allowBankingCollection: false,
              errors: undefined,
              error: "",
            },
          }}
          callbacks={{
            onSubmit: () => props.setStep("/2"),
            onChange: function (e: any): void {
              throw new Error("Function not implemented.");
            },
          }}
          text={{
            ...props.text,
          }}
        />
      </Host>
    );
  }
}

function useTaxAndCashDemo(props: TaxForm) {
  return deepmerge({}, props.demoData || {}, { arrayMerge: (_, a) => a });
}
