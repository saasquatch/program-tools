import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import { getProps } from "../../../utils/utils";
import { indirectTaxFormText } from "../sqm-user-info-form/defaultTextCopy";
import {
  IndirectDetailsSlotView,
  OtherRegionSlotView,
} from "../sqm-user-info-form/small-views/IndirectTaxDetailsView";
import { IndirectTaxFormView } from "./sqm-indirect-tax-form-view";
import { useIndirectTaxForm } from "./useIndirectTaxForm";

@Component({
  tag: "sqm-indirect-tax-form",
  shadow: true,
})
export class IndirectTaxForm {
  @Prop() formStep: string = indirectTaxFormText.formStep;
  @Prop() indirectTax: string = indirectTaxFormText.indirectTax;
  @Prop() indirectTaxDescription: string =
    indirectTaxFormText.indirectTaxDescription;
  @Prop() indirectTaxDetails: string = indirectTaxFormText.indirectTaxDetails;
  @Prop() indirectTaxDetailsDescription: string =
    indirectTaxFormText.indirectTaxDetailsDescription;
  @Prop() hstCanada: string = indirectTaxFormText.hstCanada;
  @Prop() otherRegion: string = indirectTaxFormText.otherRegion;
  @Prop() notRegistered: string = indirectTaxFormText.notRegistered;
  @Prop() submitButton: string = indirectTaxFormText.submitButton;
  @Prop() backButton: string = indirectTaxFormText.backButton;
  @Prop() taxDetailsError: string = indirectTaxFormText.error.taxDetails;

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

    console.log({ props });

    const hstSlot = (
      <IndirectDetailsSlotView
        states={{
          formState: { registeredIn, errors: props.errors },
          loading: props.loading,
          hide: props.option !== "hstCanada",
        }}
        data={{ countries: props.countries }}
        text={{}}
      ></IndirectDetailsSlotView>
    );

    const otherRegionSlot = (
      <OtherRegionSlotView
        states={{
          hide: props.option !== "otherRegion",
          formState: { registeredIn, errors: props.errors },
          loading: props.loading,
        }}
        data={{ countries: props.countries }}
        text={{}}
      />
    );

    return (
      <Host>
        <IndirectTaxFormView
          callbacks={{
            onBack: props.onBack,
            onChange: props.onChange,
            onSubmit: props.onSubmit,
          }}
          states={{
            formState: { checked: props.option },
            loading: props.loading,
            submitDisabled: props.loading || props.submitDisabled,
            registeredInCanadaDetailsSlot: hstSlot,
            registeredInDifferentCountryDetailsSlot: otherRegionSlot,
          }}
          text={props.text}
          refs={{ formRef: props.formRef }}
        />
      </Host>
    );
  }
}
