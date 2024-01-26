import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import { useTaxFormStepTwo } from "./useTaxFormStepTwo";
import { getProps } from "../../../utils/utils";
import { TaxFormStepTwoView } from "./sqm-tax-form-step-2-view";
import { IndirectDetailsSlotView } from "./small-views/IndirectTaxDetailsView";

@Component({
  tag: "sqm-tax-form-step-2",
  shadow: true,
})
export class TaxFormStepTwo {
  @Prop() step: string = "Step";
  @Prop() stepOf: string = "of";
  @Prop() indirectTax: string = "Indirect Taxes";
  @Prop() indirectTaxDescription: string = "TODO";
  @Prop() indirectTaxDetails: string = "Indirect Tax Details";
  @Prop() indirectTaxDetailsDescription: string = "TODO";
  @Prop() hstCanada: string = "I am registered for HST Canada";
  @Prop() otherRegion: string =
    "I am registered for Indirect Tax in a different Country / Region";
  @Prop() notRegistered: string = "I am not registered for Indirect Tax";
  @Prop() submitButton: string = "Continue";
  @Prop() backButton: string = "Back";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const props = useTaxFormStepTwo(getProps(this));

    const registeredIn =
      props.option === "hstCanada"
        ? "canada"
        : props.option === "otherRegion"
        ? "otherRegion"
        : null;

    const sharedSlot = (
      <IndirectDetailsSlotView
        callbacks={{
          onChange: (e) => {
            console.log("slot change:", e);
          },
        }}
        states={{ formState: { registeredIn }, loading: props.loading }}
        text={{}}
      ></IndirectDetailsSlotView>
    );

    return (
      <Host>
        <TaxFormStepTwoView
          callbacks={{
            onBack: props.onBack,
            onChange: props.setOption,
            onSubmit: props.onSubmit,
          }}
          states={{
            formState: { checked: props.option },
            loading: props.loading,
            submitDisabled: props.loading || props.submitDisabled,
            registeredInCanadaDetailsSlot: sharedSlot,
            registeredInDifferentCountryDetailsSlot: sharedSlot,
          }}
          text={props.text}
          refs={{ formRef: props.formRef }}
        />
      </Host>
    );
  }
}
