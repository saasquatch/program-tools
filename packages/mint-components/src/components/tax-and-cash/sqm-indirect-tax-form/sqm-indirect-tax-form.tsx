import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useState } from "@saasquatch/universal-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { OtherRegionSlotView } from "../sqm-user-info-form/small-views/IndirectTaxDetailsView";
import { IndirectTaxFormView } from "./sqm-indirect-tax-form-view";
import {
  UseIndirectTaxFormResult,
  useIndirectTaxForm,
} from "./useIndirectTaxForm";
import {
  INDIRECT_TAX_PROVINCES,
  INDIRECT_TAX_SPAIN_REGIONS,
} from "../subregions";
import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/data";

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
   * Subtext shown at the top of the page, used to show the current step of the tax form.
   * @uiName Form step text
   */
  @Prop() formStep: string = "Step {step} of {count}";

  /**
   * Heading text shown at the top of the page
   * @uiName Indirect tax heading text
   */
  @Prop() indirectTax: string = "Indirect Tax";

  /**
   * Text shown at the top of the page below to the indirect tax header
   * @uiName Indirect tax label text
   */
  @Prop() indirectTaxDescription: string =
    "Indirect taxes (e.g. VAT, HST, GST) are transactional based taxes collected by business and retailers on behalf of governments. Any rewards you receive may be subject to indirect taxes based on your country.";

  /**
   * Heading text for the indirect tax details section
   * @uiName Indirect tax details heading text
   */
  @Prop() indirectTaxDetails: string = "Indirect tax details";

  /**
   * Text shown below the indirect tax details heading text
   * @uiName Indirect tax details subtext
   */
  @Prop() indirectTaxDetailsDescription: string =
    "Participants representing businesses based in countries that enforce indirect taxes (e.g. VAT, HST, GST) must add their indirect tax details to stay tax compliant.";

  /**
   * Text for the option indicating registration for indirect tax
   * @uiName Registered for indirect tax option text
   */
  @Prop() otherRegion: string = "Registered for indirect tax";

  /**
   * Subtext for the option indicating registration for indirect tax in a different region
   * @uiName Registered for indirect tax in a different region option sub-text
   */
  @Prop() otherRegionSubtext: string =
    "If you represent a business based outside of the US you may be registered. If you’re not sure, contact our Support team to find out more.";

  /**
   * Text for the option indicating not being registered for indirect tax
   * @uiName Not registered for indirect tax option text
   */
  @Prop() notRegistered: string = "Not registered for indirect tax";

  /**
   * Subtext for the option indicating not being registered for indirect tax
   * @uiName Not registered for indirect tax option sub-text
   */
  @Prop() notRegisteredSubtext: string =
    "If you’re joining this referral program as an individual or you’re based in the US, then you’re not registered.";

  /**
   * Label text for the country/region select input
   * @uiName Selected country/region label
   */
  @Prop() selectedRegion: string = "Country / region of indirect tax";

  /**
   * Label text for the province input
   * @uiName Province input label
   */
  @Prop() province: string = "Province";

  /**
   * Label text for the indirect tax number input with a dynamic placeholder based on tax type
   * @uiName Indirect tax number input label
   */
  @Prop() indirectTaxNumber: string =
    "{taxType, select, GST {GST number} HST {HST number} VAT {VAT number} CT {CT number} SST {SST number} GENERAL {Indirect tax number}}";

  /**
   * Label text for the QST number input field
   * @uiName QST number input label
   */
  @Prop() qstNumber: string = "QST number";

  /**
   * Text for the option indicating registration for QST tax
   * @uiName Registered for QST tax option text
   */
  @Prop() isRegisteredQST: string = "I am registered for QST Tax";

  /**
   * Text for the option indicating registration for sub-region income tax
   * @uiName Registered for sub-region income tax option text
   */
  @Prop() isRegisteredSubRegionIncomeTax: string =
    "I am an individual registered for Income Tax purposes in Spain, and withholding tax will apply to any payments made to me.";
  /**
   * Label text for the sub-region input field
   * @uiName Sub-region input label
   */
  @Prop() subRegion: string = "Sub-region";
  /**
   * Label text for the sub-region tax number input field
   * @uiName Sub-region tax number input label
   */
  @Prop() subRegionTaxNumberLabel: string = "Income tax number";

  /**
   * Text for the back button in the form
   * @uiName Back button text
   */
  @Prop() backButton: string = "Back";
  /**
   * Alert text indicating participant cannot change info after it has been submitted
   * @uiName Cannot change info Alert text
   */
  @Prop() cannotChangeInfoAlert: string =
    "Changes to your personal and indirect tax information can only be made through our Support team after you complete this step. Make sure these are correct before continuing.";
  /**
   * Error message for the indirect tax number input field with a dynamic placeholder based on tax type
   * @uiName Indirect tax number error message
   */
  @Prop() indirectTaxNumberError: string =
    "{taxType, select, GST {GST number} HST {HST number} VAT {VAT number} CT {CT number} SST {SST number} GENERAL {Indirect tax number}} is required";

  /**
   * Placeholder text displayed in the country search dropdown
   * @uiName Search for country text
   */
  @Prop() searchForCountryText: string = "Search for country..";

  /**
   * Required error text shown at the bottom of field inputs
   * @uiName Field inputs error text
   */
  @Prop() fieldRequiredError: string = "{fieldName} is required";
  /**
   * Header text for the alert when the user is identified as a partner
   * @uiName Partner identification alert header
   */
  @Prop() isPartnerAlertHeader: string =
    "An account with this email already exists with our referral program provider, impact.com";

  /**
   * Description text for the alert when the user is identified as a partner
   * @uiName Partner identification alert description
   */
  @Prop() isPartnerAlertDescription: string =
    "If you don’t recognize this referral program provider or believe this is a mistake, please contact Support or sign up for this referral program with a different email.";

  /**
   * Text for the continue button in the form
   * @uiName Continue button text
   */
  @Prop() continueButton: string = "Continue";

  /**
   * Title text for a general form submission error
   * @uiName General form submission error title
   */
  @Prop() generalErrorTitle: string =
    "There was a problem submitting your information";

  /**
   * Description text for a general form submission error
   * @uiName General form submission error description
   */
  @Prop() generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";
  /**
   * Alert header shown if there is a problem loading a form
   * @uiName Loading error alert header
   */
  @Prop() loadingErrorAlertHeader: string =
    "There was a problem loading your form";
  /**
   * Alert description shown if there is a problem loading a form
   * @uiName Loading error alert description
   */
  @Prop() loadingErrorAlertDescription: string =
    "Please refresh the page and try again. If this problem continues, contact Support.";

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
        fieldRequiredError: props.fieldRequiredError,
        loadingErrorAlertHeader: props.loadingErrorAlertHeader,
        loadingErrorAlertDescription: props.loadingErrorAlertDescription,
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
          indirectTaxNumber: props.indirectTaxNumberError,
          fieldRequiredError: props.fieldRequiredError,
        },
        searchForCountryText: props.searchForCountryText,
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
          allCountries: props.data.allCountries,
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
  const [step, setStep] = useParent(TAX_CONTEXT_NAMESPACE);
  const [option, setOption] = useState(null);
  const [demoFormState, setDemoFormState] = useState<any>({});

  return deepmerge(
    {
      states: {
        step: "2",
        disabled: false,
        loading: false,
        isPartner: false,
        loadingError: false,
        errors: {},
        formState: {
          checked: option,
          errors: {
            general: false,
          },
        },
      },
      callbacks: {
        onFormChange: (field: string, e: CustomEvent) => {
          const value = e.detail?.item?.__value;
          if (!value) console.error("Could not detect select change");
          setDemoFormState((p) => ({ ...p, [field]: value }));
        },
        onBack: () => {
          setStep("/1");
        },
        onSubmit: async () => {
          setStep("/3");
        },
        onQstToggle: () =>
          setDemoFormState((p) => ({ ...p, hasQst: !p.hasQst })),
        onSpainToggle: () =>
          setDemoFormState((p) => ({
            ...p,
            hasSubRegionTaxNumber: !p.hasSubRegionTaxNumber,
          })),
        onChange: setOption,
        setCountrySearch: (c) => console.log(c),
      },
      data: {
        esRegions: INDIRECT_TAX_SPAIN_REGIONS,
        countries: [
          {
            countryCode: "CA",
            displayName: "Canada",
          },
          {
            countryCode: "ES",
            displayName: "Spain",
          },
          {
            countryCode: "UK",
            displayName: "United Kingdom",
          },
          {
            countryCode: "US",
            displayName: "United States",
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
          ...demoFormState,
          errors: {
            selectedRegion: true,
            province: true,
            subRegion: true,
            qstNumber: true,
            subRegionTaxNumber: true,
            indirectTaxNumber: true,
          },
        },
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
