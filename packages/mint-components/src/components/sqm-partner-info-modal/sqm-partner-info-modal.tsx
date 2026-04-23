import { isDemo } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { parseStates } from "../../utils/parseStates";
import { getProps } from "../../utils/utils";
import {
  PartnerInfoModalContentView,
  PartnerInfoModalView,
  PartnerInfoModalViewProps,
} from "./sqm-partner-info-modal-view";
import {
  PartnerInfoModalResult,
  usePartnerInfoModal,
} from "./usePartnerInfoModal";

/**
 * @uiName Partner Info Modal
 * @exampleGroup Tax and Cash
 * @validParents ["sqm-portal-container", "sqm-portal-frame", "div", "sqm-divided-layout", "sqb-program-section", "sqb-conditional-section"]
 * @example Partner Info Modal - <sqm-partner-info-modal></sqm-partner-info-modal>
 */
@Component({
  tag: "sqm-partner-info-modal",
  shadow: true,
})
export class PartnerInfoModal {
  /**
   * Brand name shown in the modal header
   *
   * @uiName Brand name
   */
  @Prop()
  brandName: string = "";

  /**
   * Header text when user has no existing partner
   *
   * @uiName New partner header
   * @uiWidget textArea
   */
  @Prop()
  modalHeader: string = "Let's get you ready for rewards";

  /**
   * Header text when user has an existing partner
   *
   * @uiName Existing partner header
   * @uiWidget textArea
   */
  @Prop()
  modalHeaderExistingPartner: string = "We found an existing account";

  /**
   * Description for new partner setup
   *
   * @uiName New partner description
   * @uiWidget textArea
   */
  @Prop()
  descriptionNewPartner: string =
    "Confirm your country and currency now to get your future rewards faster.";

  /**
   * Description for existing partner confirmation
   *
   * @uiName Existing partner description
   * @uiWidget textArea
   */
  @Prop()
  descriptionExistingPartner: string =
    "We found an account with this email on our referral program provider, impact.com. Please confirm your country and currency now to get your future rewards faster.";

  /**
   * Support description for existing partner confirmation
   *
   * @uiName Existing partner support description
   * @uiWidget textArea
   */
  @Prop()
  supportDescriptionExistingPartner: string =
    "If this is a mistake, please contact Support or sign up for this referral program with a different email.";

  /**
   * Edit the property called terms and conditions text to change what's displayed for {termsAndConditionsLink}.
   * @uiName Terms and conditions checkbox
   */
  @Prop() allowBankingCollection: string =
    "I have read the {termsAndConditionsLink} and allow impact.com to collect my tax and banking information";
  /**
   * The link text that appears in the terms and conditions checkbox
   * @uiName Terms and conditions text
   * @uiWidget textArea
   */
  @Prop() termsAndConditionsLabel: string = "terms and conditions";
  /**
   * The link that appears in the terms and conditions checkbox
   * @uiName Terms and conditions link
   */
  @Prop() termsAndConditionsLink: string =
    "https://terms.advocate.impact.com/PayoutTermsAndConditions.html";
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
   * Used to render in another modal.
   * @undocumented
   */
  @Prop() inModal: boolean = false;

  /**
   * @undocumented
   * @componentState { "title": "New partner", "props": { "states": { "open": true, "isExistingPartner": false } } }
   * @componentState { "title": "Existing partner", "props": { "states": { "open": true, "isExistingPartner": true, "countryCode": "US", "currency": "USD" } } }
   * @componentState { "title": "Connected (hidden)", "props": { "states": { "open": false } } }
   */
  @Prop() stateController: string = "{}";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PartnerInfoModalResult>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  getTextProps() {
    return getProps(this);
  }

  render() {
    const props = isDemo()
      ? useDemoPartnerInfoModal(this)
      : usePartnerInfoModal(this);

    if (this.inModal) {
      return <PartnerInfoModalContentView {...props} />;
    }

    return <PartnerInfoModalView {...props} />;
  }
}

function useDemoPartnerInfoModal(
  props: PartnerInfoModal,
): PartnerInfoModalViewProps {
  const [countryCode, setCountryCode] = useState("US");
  const [currency, setCurrency] = useState("");
  const [error, setError] = useState("");
  const [allowBankingCollection, setAllowBankingCollection] = useState(false);

  const parsed = parseStates(props.stateController);
  const stateOverride = parsed?.["sqm-partner-info-modal"] || parsed || {};

  // @ts-ignore
  return deepmerge(
    {
      states: {
        brandName: "Test Brand",
        open: false,
        loading: false,
        submitting: false,
        isExistingPartner: false,
        countryCode,
        currency,
        error,
        success: false,
        filteredCountries: [],
        filteredCurrencies: [],
        allowBankingCollection,
        checkboxError: "",
        disabled: false,
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
        onCheckboxChange: (e: any) => {
          setAllowBankingCollection(e.target.checked);
        },
        setCountrySearch: () => {},
        setCurrencySearch: () => {},
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
        modalHeader: props.modalHeader,
        descriptionNewPartner: props.descriptionNewPartner,
        descriptionExistingPartner: props.descriptionExistingPartner,
        countryLabel: props.countryLabel,
        currencyLabel: props.currencyLabel,
        submitButtonLabel: props.submitButtonLabel,
        confirmButtonLabel: props.confirmButtonLabel,
        searchCountryPlaceholder: props.searchCountryPlaceholder,
        searchCurrencyPlaceholder: props.searchCurrencyPlaceholder,
        supportDescriptionExistingPartner:
          props.supportDescriptionExistingPartner,
        modalHeaderExistingPartner: props.modalHeaderExistingPartner,
      },
    },
    props.demoData || stateOverride,
    { arrayMerge: (_, a) => a },
  );
}
