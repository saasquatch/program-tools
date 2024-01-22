import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { UserNameViewProps } from "../sqm-tax-and-cash/sqm-tax-and-cash-view";
import { TaxFormStepOneView } from "./sqm-tax-form-step-1-view";
import { useTaxForm } from "./useTaxForm";
import { taxFormStepOneText } from "./defaultTextCopy";

/**
 * @uiName Tax And Cash
 * @exampleGroup Common Components
 * @example User Name Display - <sqm-user-name fallback="Anonymous User" loading-text="..."></sqm-user-name>
 */
@Component({
  tag: "sqm-tax-form",
  shadow: true,
})
export class TaxForm {
  @State() ignored = true;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UserNameViewProps>;

  @Prop()
  firstName: string = taxFormStepOneText.firstName;
  @Prop() lastName: string = taxFormStepOneText.lastName;
  @Prop() email: string = taxFormStepOneText.email;
  @Prop() country: string = taxFormStepOneText.country;
  @Prop() currency: string = taxFormStepOneText.currency;
  @Prop() indirectTaxNumber: string = taxFormStepOneText.indirectTaxNumber;
  @Prop() allowBankingCollection: string =
    taxFormStepOneText.allowBankingCollection;
  @Prop() submitButton: string = taxFormStepOneText.submitButton;

  /**
   * The message to be displayed when a required field is not filled.
   *
   * @uiName Required field message
   * @uiWidget textArea
   */
  @Prop() requiredFieldErrorMessage: string = "Cannot be empty";

  /**
   * The message to be displayed when a the form submission fails unexpectedly.
   *
   * @uiName Network error message
   * @uiWidget textArea
   */
  @Prop() networkErrorMessage: string = "Network request failed.";

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
            loading: props.loading,
            submitDisabled: false,
            formState: props.formState,
          }}
          callbacks={{
            onSubmit: props.onSubmit,
          }}
          text={props.text}
          refs={props.refs}
        />
      </Host>
    );
  }
}

function useTaxAndCashDemo(props: TaxForm) {
  return deepmerge({}, props.demoData || {}, { arrayMerge: (_, a) => a });
}
