import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useState } from "@saasquatch/universal-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import {
  IndirectDetailsSlotView,
  OtherRegionSlotView,
} from "../sqm-user-info-form/small-views/IndirectTaxDetailsView";
import {
  IndirectTaxFormView,
  IndirectTaxFormViewProps,
} from "./sqm-indirect-tax-form-view";
import {
  UseIndirectTaxFormResult,
  useIndirectTaxForm,
} from "./useIndirectTaxForm";
import { INDIRECT_TAX_COUNTRIES } from "../countries";
import { INDIRECT_TAX_PROVINCES } from "../provinces";

/**
 * @uiName Indirect Tax Form
 * @exampleGroup Tax and Cash Components
 */
@Component({
  tag: "sqm-indirect-tax-form",
  shadow: true,
})
export class IndirectTaxForm {
  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Indirect tax form step text
   */
  @Prop() formStep: string = "Step 2 of 4";
  /**
   * Heading text shown at the top of the page
   * @uiName Indirect tax heading text
   */
  @Prop() indirectTax: string = "Indirect Tax";
  /**
   * Subtext shown at the top of the page
   * @uiName Indirect tax sub text
   */
  @Prop() indirectTaxDescription: string =
    "Indirect taxes (e.g. VAT, HST, GST) are transactional based taxes collected by business and retailers on behalf of governments. Any rewards you receive may be subject to indirect taxes based on your country.";
  /**
   * Heading text shown above the tax details radio buttons
   * @uiName Indirect tax details heading
   */
  @Prop() indirectTaxDetails: string = "Indirect Tax Details";
  /**
   * Sub text shown above the tax details radio buttons
   * @uiName Indirect tax details sub text
   */
  @Prop() indirectTaxDetailsDescription: string =
    "If you are in the US, you are most likely not registered for Indirect Tax. Not sure if you are registered for indirect tax? Contact our Support team to find out more.";
  /**
   * Label text for the HST Canada radio button
   * @uiName HST Canada radio button label
   */
  @Prop() hstCanada: string = "I am registered for HST in Canada";
  /**
   * Label text for the other region radio button
   * @uiName Other region radio button label
   */
  @Prop() otherRegion: string =
    "I am registered for Indirect Tax in a different Country / Region";
  /**
   * Label text for the not registered radio button
   * @uiName Not registered radio button label
   */
  @Prop() notRegistered: string = "I am not registered for Indirect Tax";
  /**
   * Label text for the Selected Region select input
   * @uiName Selected region select input label
   */
  @Prop() selectedRegion: string = "Country / Region of Indirect Tax";
  /**
   * Label text for the VAT Number input
   * @uiName VAT Number input label
   */
  @Prop() vatNumber: string = "VAT number";
  /**
   * Label text for the Province select input
   * @uiName Province select input label
   */
  @Prop() province: string = "Province";

  /**
   * Label text for the Indirect Tax Number input
   * @uiName Indirect Tax Number input label
   */
  @Prop() indirectTaxNumber: string = "Indirect Tax";

  /**
   * Alert header text shown in alert if user is already a registered partner
   * @uiName Participant is partner title
   */
  @Prop() isPartnerAlertHeader: string =
    "An account with this email already exists with our referral program provider, impact.com";

  /**
   * Alert description text shown in alert if user is already a registered partner
   * @uiName Participant is partner description
   */
  @Prop() isPartnerAlertDescription: string =
    "If you don’t recognize this referral program provider or believe this is a mistake, please contact Support or sign up for this referral program with a different email.";

  /**
   * Text shown inside of submit button
   * @uiName Submit button text
   */
  @Prop() submitButton: string = "Continue";
  /**
   * Text shown inside of back button
   * @uiName Back button text
   */
  @Prop() backButton: string = "Back";
  /**
   * Error text shown below the tax details radio buttons
   * @uiName Indirect tax details error text
   */
  @Prop() taxDetailsError: string = "This field is required";
  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName General error title
   */
  @Prop() generalErrorTitle: string =
    "There was a problem submitting your information";
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName General error text
   */
  @Prop() generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";
  /**
   * Error text shown below the Selected Region select input
   * @uiName Selected Region error text
   */
  @Prop() selectedRegionError: string = "Country is required";
  /**
   * Error text shown below the VAT Number input
   * @uiName VAT Number error text
   */
  @Prop() vatNumberError: string = "VAT number is required";
  /**
   * Error text shown below the Selected Region select input
   * @uiName Province error text
   */
  @Prop() provinceError: string = "Province is required";
  /**
   * Error text shown below the Indirect Tax Number select input
   * @uiName Indirect Tax Number error text
   */
  @Prop() indirectTaxNumberError: string = "Indirect Tax is required";

  /**
   * @undocumented
   * @uiType object
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
        selectedRegion: props.selectedRegion,
        vatNumber: props.vatNumber,
        province: props.province,
        indirectTaxNumber: props.indirectTaxNumber,
        error: {
          selectedRegion: props.selectedRegionError,
          vatNumber: props.vatNumberError,
          province: props.provinceError,
          indirectTaxNumber: props.indirectTaxNumberError,
        },
      },
    };
  }

  render() {
    const props = isDemo()
      ? useDemoIndirectTaxForm(this)
      : useIndirectTaxForm(this);

    const registeredInCanadaDetailsSlot = (
      <IndirectDetailsSlotView
        states={{
          formState: props.slotProps.formState,
          hide: props.states.formState.checked !== "hstCanada",
          loading: props.states.loading,
        }}
        data={{ provinces: props.data.provinces }}
        text={props.text.slotText}
      ></IndirectDetailsSlotView>
    );

    const registeredInDifferentCountryDetailsSlot = (
      <OtherRegionSlotView
        states={{
          hide: props.states.formState.checked !== "otherRegion",
          formState: props.slotProps.formState,
          loading: props.states.loading,
        }}
        data={{
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
            registeredInCanadaDetailsSlot,
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

  console.log(props, "indrecttestprops");

  return deepmerge(
    {
      states: {
        disabled: false,
        loading: false,
        isPartner: false,
        errors: {},
        formState: {
          checked: option,
        },
      },
      callbacks: {
        onBack: () => {},
        onSubmit: async () => {},
        onChange: setOption,
      },
      data: {
        countries: INDIRECT_TAX_COUNTRIES,
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