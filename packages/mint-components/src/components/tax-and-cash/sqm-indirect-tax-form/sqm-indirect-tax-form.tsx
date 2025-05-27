import { isDemo, useSetParent } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useState } from "@saasquatch/universal-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/data";
import { OtherRegionSlotView } from "../sqm-user-info-form/small-views/IndirectTaxDetailsView";
import {
  INDIRECT_TAX_PROVINCES,
  INDIRECT_TAX_SPAIN_REGIONS,
} from "../subregions";
import { IndirectTaxFormView } from "./sqm-indirect-tax-form-view";
import {
  UseIndirectTaxFormResult,
  useIndirectTaxForm,
} from "./useIndirectTaxForm";

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
   * @uiName Setup progress
   */
  @Prop() formStep: string = "Step {step} of {count}";

  /**
   * @uiName Step 2 title
   */
  @Prop() indirectTax: string = "Indirect Tax";

  /**
   * Displayed under the title of this step.
   * @uiName Step 2 description
   * @uiWidget textArea
   */
  @Prop() indirectTaxDescription: string =
    "Indirect taxes (e.g. VAT, HST, GST) are transaction based taxes often applied to goods and services. Service providers are typically required to register with their tax authority and collect these taxes on behalf governments.";

  /**
   * Displayed with indirect tax registration options.
   * @uiName Indirect tax details section title
   */
  @Prop() indirectTaxDetails: string = "Indirect tax details";
  /**
   * @uiName Registered for indirect tax option
   * @uiWidget textArea
   */
  @Prop() otherRegion: string = "Registered for indirect tax";

  /**
   * Selecting this option will display fields to enter indirect tax details.
   * @uiName Registered for indirect tax option description
   */
  @Prop() otherRegionSubtext: string =
    "If you’ve registered with your tax authority, add your information to stay tax compliant.";

  /**
   * @uiName Not registered for indirect tax option
   * @uiWidget textArea
   */
  @Prop() notRegistered: string = "Not registered for indirect tax";
  /**
   * Participants based in the US are  considered not registered.
   * @uiName Not registered for indirect tax option description
   */
  @Prop() notRegisteredSubtext: string =
    "If you’ve never set up indirect tax with your tax authority, then you’re likely not considered registered.";
  /**
   * @uiName Region of indirect tax field label
   */
  @Prop() selectedRegion: string = "Country / region of indirect tax";
  /**
   * @uiName Province field label
   */
  @Prop() province: string = "Province";

  /**
   * @uiName Indirect tax number field label
   */
  @Prop() indirectTaxNumber: string =
    "{taxType, select, GST {GST number} HST {HST number} VAT {VAT number} CT {CT number} SST {SST number} GENERAL {Indirect tax number}}";

  /**
   * Displayed to participants registered for QST.
   * @uiName QST number field label
   */
  @Prop() qstNumber: string = "QST number";

  /**
   * Displayed to participants registered for indirect tax in Quebec, Canada.
   * @uiName QST tax checkbox
   */
  @Prop() isRegisteredQST: string = "I am registered for QST Tax";

  /**
   * Displayed to participants registered for indirect tax in Spain.
   * @uiName Spain income tax checkbox
   * @uiWidget textArea
   */
  @Prop() isRegisteredSubRegionIncomeTax: string =
    "I am an individual registered for Income Tax purposes in Spain, and withholding tax will apply to any payments made to me.";
  /**
   * Displayed to participants registered in Spain.
   * @uiName Sub-region of indirect tax field label
   */
  @Prop() subRegion: string = "Sub-region";
  /**
   * @uiName Income tax field label
   */
  @Prop() subRegionTaxNumberLabel: string = "Income tax number";

  /**
   * @uiName Back button label
   */
  @Prop() backButton: string = "Back";
  /**
   * Communicate that after this step, only Support can change personal and indirect tax information.
   * @uiName Submission confirmation alert
   * @uiWidget textArea
   */
  @Prop() cannotChangeInfoAlert: string =
    "Changes to your personal and indirect tax information can only be made through our {supportLink} after you complete this step. Make sure these are correct before continuing.";
  /**
   * @uiName Missing indirect tax number error message
   */
  @Prop() indirectTaxNumberError: string =
    "{taxType, select, GST {GST number} HST {HST number} VAT {VAT number} CT {CT number} SST {SST number} GENERAL {Indirect tax number}} is required";

  /**
   * Placeholder text displayed in the country search dropdown
   * @uiName Country field placeholder text
   */
  @Prop() searchForCountryText: string = "Search for country..";

  /**
   * Displayed under a field that is missing required information.
   * @uiName Empty form field error message
   */
  @Prop() fieldRequiredError: string = "{fieldName} is required";
  /**
   * Part of the alert displayed at the top of the page if the participant is already a registered partner on impact.com.
   * @uiName Participant is a partner alert title
   * @uiWidget textArea
   */
  @Prop() isPartnerAlertHeader: string =
    "An account with this email already exists with our referral program provider, impact.com";

  /**
   * Part of the alert displayed at the top of the page if the participant is already a registered partner on impact.com.
   * @uiName Participant is a partner alert description
   * @uiWidget textArea
   */
  @Prop() isPartnerAlertDescription: string =
    "If you don’t recognize this referral program provider or believe this is a mistake, please contact our {supportLink} or sign up for this referral program with a different email.";
  /**
   * @uiName Continue button label
   */
  @Prop() continueButton: string = "Continue";
  /**
   * @uiName Support link text
   */
  @Prop() supportLink: string = "support team";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Form submission error message title
   * @uiWidget textArea
   */
  @Prop() generalErrorTitle: string =
    "There was a problem submitting your information";

  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Form submission error message description
   * @uiWidget textArea
   */
  @Prop() generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact our {supportLink}.";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Page load error message title
   * @uiWidget textArea
   */
  @Prop() loadingErrorAlertHeader: string =
    "There was a problem loading your form";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Page load error message description
   * @uiWidget textArea
   */
  @Prop() loadingErrorAlertDescription: string =
    "Please refresh the page and try again. If this problem continues, contact our {supportLink}.";
  /**
   * Displayed at the top of the page on all set up steps.
   * @uiName Page description
   */
  @Prop() taxAndPayoutsDescription: string =
    "Submit your tax documents and add your banking information to receive your rewards.";

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
          isPartner: props.states.isPartner,
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
  const setStep = useSetParent(TAX_CONTEXT_NAMESPACE);
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
            selectedRegion: false,
            province: false,
            subRegion: false,
            qstNumber: false,
            subRegionTaxNumber: false,
            indirectTaxNumber: false,
          },
        },
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
