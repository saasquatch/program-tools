import { isDemo } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import {
  PartnerInfoModalView,
  PartnerInfoModalViewProps,
} from "./sqm-partner-info-modal-view";

/**
 * @uiName Partner Info Modal
 * @exampleGroup Tax and Cash
 * @validParents ["sqm-portal-container", "sqm-portal-frame", "div", "sqb-program-section", "sqb-conditional-section"]
 * @example Partner Info Modal - <sqm-partner-info-modal></sqm-partner-info-modal>
 */
@Component({
  tag: "sqm-partner-info-modal",
  shadow: true,
})
export class PartnerInfoModal {
  /**
   * Header text when user has no existing partner
   *
   * @uiName New partner header
   * @uiWidget textArea
   */
  @Prop()
  modalBrandHeader: string = "Welcome to {brandName} Program!";

  /**
   * Description for new partner setup
   *
   * @uiName New partner description
   * @uiWidget textArea
   */
  @Prop()
  descriptionNewPartner: string =
    "We just need a bit more information about you before you start earning cash!";

  /**
   * Description for existing partner confirmation
   *
   * @uiName Existing partner description
   * @uiWidget textArea
   */
  @Prop()
  descriptionExistingPartner: string =
    "We noticed you are already an Impact.com partner, please confirm your information.";

  /**
   * @uiName Country label
   */
  @Prop()
  countryLabel: string = "Country";

  /**
   * @uiName Currency label
   */
  @Prop()
  currencyLabel: string = "Currency";

  /**
   * @uiName Submit button label
   */
  @Prop()
  submitButtonLabel: string = "Submit";

  /**
   * @uiName Confirm button label
   */
  @Prop()
  confirmButtonLabel: string = "Confirm";

  /**
   * @uiName Search country placeholder
   */
  @Prop()
  searchCountryPlaceholder: string = "Search for a country";

  /**
   * @uiName Search currency placeholder
   */
  @Prop()
  searchCurrencyPlaceholder: string = "Search for a currency";

  /**
   * @uiName Network error text
   * @uiWidget textArea
   */
  @Prop()
  networkErrorText: string = "An error occurred. Please try again.";

  /**
   * @uiName Missing fields error text
   * @uiWidget textArea
   */
  @Prop()
  missingFieldsErrorText: string = "Please select both a country and currency.";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PartnerInfoModalViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    // AL: TODO add usePartnerInfoModal
    const props = useDemoPartnerInfoModal(this);

    return <PartnerInfoModalView {...props} />;
  }
}

function useDemoPartnerInfoModal(
  props: PartnerInfoModal,
): PartnerInfoModalViewProps {
  const [countryCode, setCountryCode] = useState("US");
  const [currency, setCurrency] = useState("");
  const [error, setError] = useState("");

  const demoCountries = [
    { countryCode: "US", displayName: "United States" },
    { countryCode: "CA", displayName: "Canada" },
    { countryCode: "GB", displayName: "United Kingdom" },
    { countryCode: "AU", displayName: "Australia" },
    { countryCode: "DE", displayName: "Germany" },
  ];

  const demoCurrencies = [
    { currencyCode: "USD", displayName: "US Dollar" },
    { currencyCode: "CAD", displayName: "Canadian Dollar" },
    { currencyCode: "GBP", displayName: "British Pound" },
    { currencyCode: "EUR", displayName: "Euro" },
    { currencyCode: "AUD", displayName: "Australian Dollar" },
  ];

  return deepmerge(
    {
      states: {
        brandName: "Test Brand",
        open: true,
        loading: false,
        submitting: false,
        isExistingPartner: false,
        countryCode,
        currency,
        error,
        success: false,
        filteredCountries: demoCountries,
        filteredCurrencies: demoCurrencies,
      },
      callbacks: {
        onCountryChange: (e: any) => {
          const value = e?.detail?.item?.__value;
          if (value) {
            setCountryCode(value);
            setCurrency("");
          }
        },
        onCurrencyChange: (e: any) => {
          const value = e?.detail?.item?.__value;
          if (value) setCurrency(value);
        },
        onCountrySearch: () => {},
        onCurrencySearch: () => {},
        onSubmit: () => {
          if (!countryCode || !currency) {
            setError(props.missingFieldsErrorText);
            return;
          }
          setError("");
        },
        onClose: () => {},
      },
      text: {
        modalBrandHeader: props.modalBrandHeader,
        descriptionNewPartner: props.descriptionNewPartner,
        descriptionExistingPartner: props.descriptionExistingPartner,
        countryLabel: props.countryLabel,
        currencyLabel: props.currencyLabel,
        submitButtonLabel: props.submitButtonLabel,
        confirmButtonLabel: props.confirmButtonLabel,
        searchCountryPlaceholder: props.searchCountryPlaceholder,
        searchCurrencyPlaceholder: props.searchCurrencyPlaceholder,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a },
  );
}
