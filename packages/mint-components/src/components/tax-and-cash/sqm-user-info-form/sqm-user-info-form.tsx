import { isDemo, useSetParent } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { parseStates } from "../../../utils/parseStates";
import { getProps } from "../../../utils/utils";
import { TAX_CONTEXT_NAMESPACE } from "../data";
import { UserInfoFormView } from "./sqm-user-info-form-view";
import { useUserInfoForm, UseUserInfoFormResult } from "./useUserInfoForm";

/**
 * @uiName User Information Form
 * @exampleGroup Tax and Cash Components
 */
@Component({
  tag: "sqm-user-info-form",
  shadow: true,
})
export class TaxForm {
  @State() ignored = true;
  /**
   * @uiName First name field label
   */
  @Prop() firstName: string = "First name";
  /**
   * @uiName Last name field label
   */
  @Prop() lastName: string = "Last name";
  /**
   * @uiName Email field label
   */
  @Prop() email: string = "Email";
  /**
   * @uiName Country field label
   */
  @Prop() country: string = "Country";
  /**
   * @uiName Phone number field label
   */
  @Prop() phoneNumber: string = "Phone number";
  /**
   * @uiName Address field label
   */
  @Prop() address: string = "Address";
  /**
   * @uiName City field label
   */
  @Prop() city: string = "City";
  /**
   * @uiName State field label
   */
  @Prop() state: string = "State";
  /**
   * @uiName State field label
   */
  @Prop() province: string = "Province";
  /**
   * @uiName State field label
   */
  @Prop() region: string = "Region";
  /**
   * @uiName Postal code field label
   */
  @Prop() postalCode: string = "Postal code";
  /**
   * @uiName Currency field label
   */
  @Prop() currency: string = "Currency";

  /**
   * @uiName Currency field help text
   */
  @Prop() currencyHelpText: string = "Choose your preferred payout currency";
  /**
   * @uiName Setup progress
   */
  @Prop() formStep: string = "Step {step} of {count}";
  /**
   * @uiName Step 1 title
   */
  @Prop() personalInformation: string = "Personal Information";
  /**
   * @uiName Continue button label
   */
  @Prop() continueButton: string = "Continue";
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
   * Placeholder text displayed in the country search dropdown
   * @uiName Country field placeholder text
   */
  @Prop() searchForCountryText: string = "Search for country..";
  /**
   * Placeholder text displayed in the currency search dropdown
   * @uiName Currency field placeholder text
   */
  @Prop() searchForCurrencyText: string = "Search for currency..";
  /**
   * Displayed under a field that is missing required information.
   * @uiName Empty form field error message
   */
  @Prop() fieldRequiredError: string = "{fieldName} is required";
  /**
   * Displayed under a field when it has an invalid entry.
   * @uiName Form field error message
   */
  @Prop() fieldInvalidError: string = "{fieldName} is invalid";
  /**
   * Displayed under Address or City fields that includes invalid characters (non-ASCII).
   * @uiName Invalid character error message
   */
  @Prop() invalidCharacterError: string =
    "{fieldName} includes characters that aren't supported.";
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
   * @uiName Support link text
   */
  @Prop() supportLink: string = "support team";

  /**
   * @uiName States
   * @parentState { "parent": "sqm-tax-and-cash", "title": "Step 1" }
   * @componentState { "title": "Errors", "props": { "states": { "loadingError": true, "formState": { "errors": { "email": true, "firstName": true, "lastName": true, "countryCode": true, "currency": true } } } } }
   * @componentState { "title": "Loading", "props": { "states": { "loading": true } } }
   */
  @Prop() stateController: string = "{}";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UseUserInfoFormResult>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  getTextProps() {
    const props = getProps(this);
    return {
      ...props,
      error: {
        fieldRequiredError: props.fieldRequiredError,
        fieldInvalidError: props.fieldInvalidError,
        generalTitle: props.generalErrorTitle,
        generalDescription: props.generalErrorDescription,
        loadingErrorAlertHeader: props.loadingErrorAlertHeader,
        loadingErrorAlertDescription: props.loadingErrorAlertDescription,
        invalidCharacterError: props.invalidCharacterError,
      },
    };
  }

  render() {
    const props = isDemo() ? useDemoUserInfoForm(this) : useUserInfoForm(this);

    return (
      <UserInfoFormView
        data={props.data}
        // @ts-ignore
        states={props.states}
        callbacks={{
          ...props.callbacks,
          onSubmit: props.onSubmit,
        }}
        text={props.text}
        refs={props.refs}
      />
    );
  }
}

function useDemoUserInfoForm(props: TaxForm): UseUserInfoFormResult {
  const setStep = useSetParent(TAX_CONTEXT_NAMESPACE);

  // @ts-ignore
  return deepmerge(
    {
      setStep,
      onSubmit: async () => {
        setStep("/2");
      },
      onRadioClick: () => {},
      text: props.getTextProps(),
      refs: {
        formRef: { current: null },
        currencyRef: { current: null },
        phoneCountryRef: { current: null },
      },
      data: {
        currencies: [{ currencyCode: "CAD", displayName: "CAD" }],
        allCurrencies: [{ currencyCode: "CAD", displayName: "CAD" }],
        countries: [{ countryCode: "CA", displayName: "Canada" }],
        phoneCountries: [{ countryCode: "CA", displayName: "Canada" }],
        allCountries: [{ countryCode: "CA", displayName: "Canada" }],
      },
      callbacks: {
        setCurrencySearch: (c) => console.log(c),
        setCountrySearch: (c) => console.log(c),
        setPhoneCountrySearch: (c) => console.log(c),
        onFormChange: () => {},
      },
      states: {
        step: "1",
        disabled: false,
        loading: false,
        isPartner: false,
        isUser: false,
        loadingError: false,
        formState: {
          errors: {
            email: false,
            firstName: false,
            lastName: false,
            countryCode: false,
            currency: false,
          },
        },
      },
    },
    props.demoData || parseStates(props.stateController) || {},
    { arrayMerge: (_, a) => a }
  );
}
