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
   * Label text for first name input
   * @uiName First name label
   */
  @Prop() firstName: string = "First name";
  /**
   * Label text for last name input
   * @uiName Last name label
   */
  @Prop() lastName: string = "Last name";
  /**
   * Label text for email input
   * @uiName Email label
   */
  @Prop() email: string = "Email";
  /**
   * Label text for country input
   * @uiName Country label
   */
  @Prop() country: string = "Country";
  /**
   * Label text for currency input
   * @uiName Currency label
   */
  @Prop() currency: string = "Currency";

  /**
   * Help text shown underneath currency input
   * @uiName Currency help text
   */
  @Prop() currencyHelpText: string = "Choose your preferred payout currency";
  /**
   * Label text for tax and banking collection checkbox
   * @uiName Tax and banking label
   */
  @Prop() allowBankingCollection: string =
    "I have read the terms and conditions and allow impact.com to collect my tax and banking information";
  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Tax form step text
   */
  @Prop() formStep: string = "Step {current} of {total}";
  /**
   * Heading text shown above the forms inputs.
   * @uiName Form heading text
   */
  @Prop() personalInformation: string = "Personal Information";
  /**
   * Text shown inside of submit button
   * @uiName Submit button text
   */
  @Prop() continueButton: string = "Continue";
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
   * Label text for terms and conditions
   * @uiName Terms and conditions label text
   */
  @Prop() termsAndConditionsLabel: string = "Terms and conditions";
  /**
   * Required error text shown at the bottom of field inputs
   * @uiName Field inputs error text
   */
  @Prop() fieldRequiredError: string = "{fieldName} is required";

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
      step,
      setStep,
      onSubmit: () => {},
      onRadioClick: (value: string) => {},
      text: props.getTextProps(),
      refs: {
        formRef: { current: null },
        currencyRef: { current: null },
      },
      data: {
        currencies: [{ currencyCode: "CAD", displayName: "CAD" }],
        countries: [{ countryCode: "CA", displayName: "Canada" }],
      },
      callbacks: {
        setCurrencySearch: (c) => console.log(c),
        setCountrySearch: (c) => console.log(c),
        onFormChange: () => {},
      },
      states: {
        disabled: false,
        loading: false,
        isPartner: false,
        isUser: false,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
