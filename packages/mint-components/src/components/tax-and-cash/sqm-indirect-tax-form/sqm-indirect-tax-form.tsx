import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import { getProps } from "../../../utils/utils";
import { IndirectDetailsSlotView } from "../sqm-user-info-form/small-views/IndirectTaxDetailsView";
import {
  IndirectTaxFormView,
  TaxFormStepTwoProps,
} from "./sqm-indirect-tax-form-view";
import { useIndirectTaxForm } from "./useIndirectTaxForm";
import { taxFormStepTwoText } from "../sqm-user-info-form/defaultTextCopy";

@Component({
  tag: "sqm-indirect-tax-form",
  shadow: true,
})
export class TaxFormStepTwo {
  @Prop() step: string = taxFormStepTwoText.step;
  @Prop() stepOf: string = taxFormStepTwoText.stepOf;
  @Prop() indirectTax: string = taxFormStepTwoText.indirectTax;
  @Prop() indirectTaxDescription: string =
    taxFormStepTwoText.indirectTaxDescription;
  @Prop() indirectTaxDetails: string = taxFormStepTwoText.indirectTaxDetails;
  @Prop() indirectTaxDetailsDescription: string =
    taxFormStepTwoText.indirectTaxDetailsDescription;
  @Prop() hstCanada: string = taxFormStepTwoText.hstCanada;
  @Prop() otherRegion: string = taxFormStepTwoText.otherRegion;
  @Prop() notRegistered: string = taxFormStepTwoText.notRegistered;
  @Prop() submitButton: string = taxFormStepTwoText.submitButton;
  @Prop() backButton: string = taxFormStepTwoText.backButton;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const props = useIndirectTaxForm(getProps(this));

    const registeredIn =
      props.option === "hstCanada"
        ? "canada"
        : props.option === "otherRegion"
        ? "otherRegion"
        : null;

    const sharedSlot = (
      <IndirectDetailsSlotView
        callbacks={{
          onChange: () => {},
        }}
        states={{
          formState: { registeredIn, errors: props.errors },
          loading: props.loading,
        }}
        data={{ countries: props.countries }}
        text={{}}
      ></IndirectDetailsSlotView>
    );

    return (
      <Host>
        <IndirectTaxFormView
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
