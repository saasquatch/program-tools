import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useState } from "@saasquatch/universal-hooks";
import { Component, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { useParent } from "../../../utils/useParentState";
import { getProps } from "../../../utils/utils";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/data";
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
   * @uiName Currency field label
   */
  @Prop() currency: string = "Currency";

  /**
   * @uiName Currency field help text
   */
  @Prop() currencyHelpText: string = "Choose your preferred payout currency";
  /**
   * Label text for tax and banking collection checkbox
   * @uiName Terms and conditions checkbox
   */
  @Prop() allowBankingCollection: string =
    "I have read the {termsAndConditionsLink} and allow impact.com to collect my tax and banking information";
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
    "If you don’t recognize this referral program provider or believe this is a mistake, please contact Support or sign up for this referral program with a different email.";
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
    "Please review your information and try again. If this problem continues, contact Support.";
  /**
   * @uiName Terms and conditions text
   * @uiWidget textArea
   */
  @Prop() termsAndConditionsLabel: string = "terms and conditions";
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
    "Please refresh the page and try again. If this problem continues, contact Support.";
  /**
   * Displayed at the top of the page on all set up steps and on the dashboard.
   * @uiName Page description
   */
  @Prop() taxAndPayoutsDescription: string =
    "Submit your tax documents and add your banking information to receive your rewards.";

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
        generalTitle: props.generalErrorTitle,
        generalDescription: props.generalErrorDescription,
        loadingErrorAlertHeader: props.loadingErrorAlertHeader,
        loadingErrorAlertDescription: props.loadingErrorAlertDescription,
      },
    };
  }

  render() {
    console.debug("Rendering user info form");
    const props = isDemo() ? useDemoUserInfoForm(this) : useUserInfoForm(this);

    return (
      <Host>
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
      </Host>
    );
  }
}

function useDemoUserInfoForm(props: TaxForm): UseUserInfoFormResult {
  const [step, setStep] = useParent(TAX_CONTEXT_NAMESPACE);

  return deepmerge(
    {
      setStep,
      onSubmit: () => {
        setStep("/2");
      },
      onRadioClick: () => {},
      text: props.getTextProps(),
      refs: {
        formRef: { current: null },
        currencyRef: { current: null },
      },
      data: {
        currencies: [{ currencyCode: "CAD", displayName: "CAD" }],
        allCurrencies: [{ currencyCode: "CAD", displayName: "CAD" }],
        countries: [{ countryCode: "CA", displayName: "Canada" }],
        allCountries: [{ countryCode: "CA", displayName: "Canada" }],
      },
      callbacks: {
        setCurrencySearch: (c) => console.log(c),
        setCountrySearch: (c) => console.log(c),
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
            email: true,
            firstName: true,
            lastName: true,
            countryCode: true,
            currency: true,
          },
        },
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
