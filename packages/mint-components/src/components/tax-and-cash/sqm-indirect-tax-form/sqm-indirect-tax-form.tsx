import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useState } from "@saasquatch/universal-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { OtherRegionSlotView } from "../sqm-user-info-form/small-views/IndirectTaxDetailsView";
import {
  IndirectTaxFormView,
  IndirectTaxFormViewProps,
} from "./sqm-indirect-tax-form-view";
import {
  UseIndirectTaxFormResult,
  useIndirectTaxForm,
} from "./useIndirectTaxForm";
import {
  INDIRECT_TAX_PROVINCES,
  INDIRECT_TAX_SPAIN_REGIONS,
} from "../subregions";

/**
 * @uiName Indirect Tax Form
 * @exampleGroup Tax and Cash Components
 */
@Component({
  tag: "sqm-indirect-tax-form",
  shadow: true,
})
export class IndirectTaxForm {
  @Prop() formStep: string = "Step 2 of 4";
  @Prop() indirectTax: string = "Indirect Tax";
  @Prop() indirectTaxDescription: string =
    "Indirect taxes (e.g. VAT, HST, GST) are transactional based taxes collected by business and retailers on behalf of governments. Any rewards you receive may be subject to indirect taxes based on your country.";
  @Prop() indirectTaxDetails: string = "Indirect Tax Details";
  @Prop() indirectTaxDetailsDescription: string =
    "If you represent a business entity, you may be registered for indirect tax. If you are based in the US you are most likely not registered. Not sure if you’re registered? Contact our Support team to find out more.";
  @Prop() otherRegion: string =
    "I am registered for Indirect Tax in a different Country / Region";
  @Prop() notRegistered: string = "I am not registered for Indirect Tax";
  @Prop() selectedRegion: string = "Country / Region of Indirect Tax";
  @Prop() province: string = "Province";
  @Prop() indirectTaxNumber: string =
    "{taxType, select, GST {GST Number} HST {HST Number} VAT {VAT Number} CT {CT Number} SST {SST Number} GENERAL {Indirect Tax Number}}";
  @Prop() isPartnerAlertHeader: string =
    "An account with this email already exists with our referral program provider, impact.com";
  @Prop() isPartnerAlertDescription: string =
    "If you don’t recognize this referral program provider or believe this is a mistake, please contact Support or sign up for this referral program with a different email.";
  @Prop() submitButton: string = "Continue";
  @Prop() backButton: string = "Back";
  @Prop() taxDetailsError: string = "This field is required";
  @Prop() generalErrorTitle: string =
    "There was a problem submitting your information";
  @Prop() generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";
  @Prop() selectedRegionError: string = "Country is required";
  @Prop() provinceError: string = "Province is required";
  @Prop() indirectTaxNumberError: string =
    "{taxType, select, GST {GST Number} HST {HST Number} VAT {VAT Number} CT {CT Number} SST {SST Number} GENERAL {Indirect Tax Number}} is required";
  @Prop() subRegionTaxNumberError: string = "Income Tax Number is required";
  @Prop() qstTaxNumberError: string = "QST Number is required";
  @Prop() subRegion: string = "Sub-region";
  @Prop() subRegionError: string = "Sub-region is required";
  @Prop() qstNumber: string = "QST Number";
  @Prop() subRegionTaxNumberLabel: string = "Income Tax Number";
  @Prop() isRegisteredQST: string = "I am registered for QST Tax";
  @Prop() isRegisteredSubRegionIncomeTax: string =
    "I am an individual registered for Income Tax purposes in Spain, and withholding tax will apply to any payments made to me.";

  /**
   * @undocumented
   */
  @Prop() demoData?: DemoData<UseIndirectTaxFormResult>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  getTextProps() {
    const props = getProps(this);

    return {
      ...props,
      error: {
        generalTitle: props.generalErrorTitle,
        generalDescription: props.generalErrorDescription,
        taxDetails: props.taxDetailsError,
      },
      slotText: {
        isRegisteredQST: props.isRegisteredQST,
        isRegisteredSubRegionIncomeTax: props.isRegisteredSubRegionIncomeTax,
        qstNumber: props.qstNumber,
        subRegion: props.subRegion,
        subRegionTaxNumberLabel: props.subRegionTaxNumberLabel,
        selectedRegion: props.selectedRegion,
        province: props.province,
        indirectTaxNumber: props.indirectTaxNumber,
        error: {
          subRegionTaxNumber: props.subRegionTaxNumberError,
          selectedRegion: props.selectedRegionError,
          province: props.provinceError,
          indirectTaxNumber: props.indirectTaxNumberError,
          subRegion: props.subRegionError,
          qstNumber: props.qstTaxNumberError,
        },
      },
    };
  }

  render() {
    const props = isDemo()
      ? useDemoIndirectTaxForm(this)
      : useIndirectTaxForm(this);

    const registeredInDifferentCountryDetailsSlot = (
      <OtherRegionSlotView
        states={{
          hide: props.states.formState.checked !== "otherRegion",
          disabled: props.states.disabled || props.states.isPartner,
          formState: props.slotProps.formState,
          loading: props.states.loading,
        }}
        callbacks={props.callbacks}
        data={{
          esRegions: props.data.esRegions,
          countries: props.data.countries,
          provinces: props.data.provinces,
        }}
        text={props.text.slotText}
      />
    );

    return (
      <Host>
        <IndirectTaxFormView
          callbacks={props.callbacks}
          states={props.states}
          refs={props.refs}
          text={props.text}
          slots={{
            registeredInDifferentCountryDetailsSlot,
          }}
        />
      </Host>
    );
  }
}

function useDemoIndirectTaxForm(
  props: IndirectTaxForm
): ReturnType<typeof useIndirectTaxForm> {
  const [option, setOption] = useState(null);

  return deepmerge(
    {
      states: {
        disabled: false,
        loading: false,
        isPartner: false,
        errors: {},
        formState: {
          checked: option,
          errors: {
            general: false,
          },
        },
      },
      callbacks: {
        onFormChange: (field: string, e: CustomEvent) =>
          console.log({ field, e }),
        onBack: () => {},
        onSubmit: async () => {},
        onQstToggle: () => {},
        onSpainToggle: () => {},
        onChange: setOption,
      },
      data: {
        esRegions: INDIRECT_TAX_SPAIN_REGIONS,
        countries: [
          {
            displayName: "United States",
            countryCode: "US",
            impactCountryCode: "US",
          },
        ],
        provinces: INDIRECT_TAX_PROVINCES,
      },
      text: props.getTextProps(),
      refs: {
        formRef: { current: null },
      },
      slotProps: {
        formState: {
          errors: {},
        },
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
