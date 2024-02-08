import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useState } from "@saasquatch/universal-hooks";
import { Component, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { UserNameViewProps } from "../sqm-tax-and-cash/sqm-tax-and-cash-view";
import {
  UserInfoFormView,
  UserInfoFormViewProps,
} from "./sqm-user-info-form-view";
import { useUserInfoForm, UseUserInfoFormResult } from "./useUserInfoForm";
import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/data";

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
   * Label text for tax and banking collection checkbox
   * @uiName Tax and banking label
   */
  @Prop() allowBankingCollection: string = "I agree to the terms";
  /**
   * Heading text for the tax and banking collection checkbox
   * @uiName Tax and banking collection checkbox heading
   */
  @Prop() taxAndBankingCollection: string = "Continue";
  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Tax form step text
   */
  @Prop() formStep: string = "Step 1 of 4";
  /**
   * Heading text shown above the forms inputs.
   * @uiName Form heading text
   */
  @Prop() personalInformation: string = "Personal Information";
  /**
   * Label text for the business entity radio button
   * @uiName Business entity radio button label
   */
  @Prop() businessEntity: string = "I represent a business entity";
  /**
   * Label text for the individual participant radio button
   * @uiName Individual participant radio button label
   */
  @Prop() individualParticipant: string = "I am an individual participant";
  /**
   * Heading text for the participant type radio buttons
   * @uiName Participant type radio buttons heading
   */
  @Prop() participantType: string = "Participant type";
  /**
   * Text shown inside of submit button
   * @uiName Submit button text
   */
  @Prop() submitButton: string = "Continue";
  /**
   * Error text shown at the bottom of the first name input
   * @uiName First name input error text
   */
  @Prop() firstNameError: string = "Enter a first name";
  /**
   * Error text shown at the bottom of the last name input
   * @uiName Last name input error text
   */
  @Prop() lastNameError: string = "Enter a last name";
  /**
   * Error text shown at the bottom of the email input
   * @uiName Email input error text
   */
  @Prop() emailError: string = "Enter a valid email";
  /**
   * Error text shown at the bottom of the country input
   * @uiName Country input error text
   */
  @Prop() countryError: string = "Select a country";
  /**
   * Error text shown at the bottom of the currency input
   * @uiName Currency input error text
   */
  @Prop() currencyError: string = "Select a currency";
  /**
   * Error text shown at the bottom of the tax and banking collection checkbox
   * @uiName Tax and banking collection checkbox error text
   */
  @Prop() allowBankingCollectionError: string = "This field is required";
  /**
   * Error text shown at the bottom of the participant type checkbox
   * @uiName Participant type checkbox error text
   */
  @Prop() participantTypeError: string = "Select a participant type";

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
        firstName: props.firstNameError,
        lastName: props.lastNameError,
        email: props.emailError,
        countryCode: props.countryError,
        currency: props.currencyError,
        allowBankingCollection: props.allowBankingCollectionError,
        participantType: props.participantTypeError,
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
            onSubmit: props.onSubmit,
            onRadioClick: props.onRadioClick,
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
  const [participantType, setParticipantType] = useState(null);

  return deepmerge(
    {
      step,
      setStep,
      onSubmit: () => {},
      onRadioClick: (value: string) => {
        setParticipantType(value);
      },
      text: props.getTextProps(),
      refs: {
        formRef: { current: null },
      },
      data: {
        currencies: [{ currencyCode: "CAD", displayName: "CAD" }],
        countries: [{ countryCode: "CA", displayName: "Canada" }],
      },
      states: {
        disabled: false,
        formState: { participantType },
        loading: false,
        isPartner: false,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
