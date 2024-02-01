import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { UserNameViewProps } from "../sqm-tax-and-cash/sqm-tax-and-cash-view";
import { userInfoText } from "./defaultTextCopy";
import { UserInfoFormView } from "./sqm-user-info-form-view";
import { useUserInfoForm } from "./useUserInfoForm";
import { useState } from "@saasquatch/universal-hooks";
import { isDemo } from "@saasquatch/component-boilerplate";

/**
 * @uiName Tax And Cash
 * @exampleGroup Common Components
 * @example User Name Display - <sqm-user-name fallback="Anonymous User" loading-text="..."></sqm-user-name>
 */
@Component({
  tag: "sqm-user-info-form",
  shadow: true,
})
export class TaxForm {
  @State() ignored = true;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UserNameViewProps>;
  /**
   * Label text for first name input
   * @uiName First name label
   */
  @Prop()
  firstName: string = userInfoText.firstName;
  /**
   * Label text for last name input
   * @uiName Last name label
   */
  @Prop() lastName: string = userInfoText.lastName;
  /**
   * Label text for email input
   * @uiName Email label
   */
  @Prop() email: string = userInfoText.email;
  /**
   * Label text for country input
   * @uiName Country label
   */
  @Prop() country: string = userInfoText.country;
  /**
   * Label text for currency input
   * @uiName Currency label
   */
  @Prop() currency: string = userInfoText.currency;
  /**
   * Label text for tax and banking collection checkbox
   * @uiName Tax and banking label
   */
  @Prop() allowBankingCollection: string = userInfoText.allowBankingCollection;
  /**
   * Heading text for the tax and banking collection checkbox
   * @uiName Tax and banking collection checkbox heading
   */
  @Prop() taxAndBankingCollection: string =
    userInfoText.taxAndBankingCollection;
  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Tax form step text
   */
  @Prop() formStep: string = userInfoText.formStep;
  /**
   * Heading text shown above the forms inputs.
   * @uiName Form heading text
   */
  @Prop() personalInformation: string = userInfoText.personalInformation;
  /**
   * Label text for the business entity radio button
   * @uiName Business entity radio button label
   */
  @Prop() businessEntity: string = userInfoText.businessEntity;
  /**
   * Label text for the individual participant radio button
   * @uiName Individual participant radio button label
   */
  @Prop() individualParticipant: string = userInfoText.individualParticipant;
  /**
   * Heading text for the participant type radio buttons
   * @uiName Participant type radio buttons heading
   */
  @Prop() participantType: string = userInfoText.participantType;
  /**
   * Text shown inside of submit button
   * @uiName Submit button text
   */
  @Prop() submitButton: string = userInfoText.submitButton;
  /**
   * Error text shown at the bottom of the first name input
   * @uiName First name input error text
   */
  @Prop() firstNameError: string = userInfoText.error.firstName;
  /**
   * Error text shown at the bottom of the last name input
   * @uiName Last name input error text
   */
  @Prop() lastNameError: string = userInfoText.error.lastName;
  /**
   * Error text shown at the bottom of the email input
   * @uiName Email input error text
   */
  @Prop() emailError: string = userInfoText.error.email;
  /**
   * Error text shown at the bottom of the country input
   * @uiName Country input error text
   */
  @Prop() countryError: string = userInfoText.error.countryCode;
  /**
   * Error text shown at the bottom of the currency input
   * @uiName Currency input error text
   */
  @Prop() currencyError: string = userInfoText.error.currency;
  /**
   * Error text shown at the bottom of the tax and banking collection checkbox
   * @uiName Tax and banking collection checkbox error text
   */
  @Prop() allowBankingCollectionError: string =
    userInfoText.error.allowBankingCollection;
  /**
   * Error text shown at the bottom of the participant type checkbox
   * @uiName Participant type checkbox error text
   */
  @Prop() participantTypeError: string = userInfoText.error.participantType;

  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName General error title
   */
  @Prop() generalErrorTitle: string = userInfoText.error.generalTitle;
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName General error text
   */
  @Prop() generalErrorDescription: string =
    userInfoText.error.generalDescription;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const props = isDemo()
      ? useDemoUserInfoForm(getProps(this))
      : useUserInfoForm(getProps(this));

    return (
      <Host>
        <UserInfoFormView
          data={props.data}
          states={{
            disabled: false,
            //@ts-ignore
            formState: props.formState,
          }}
          callbacks={{
            onSubmit: props.onSubmit,
            onRadioClick: props.onRadioClick,
          }}
          //@ts-ignore
          text={props.text}
          refs={props.refs}
        />
      </Host>
    );
  }
}

function useDemoUserInfoForm(props: TaxForm) {
  const [participantType, setParticipantType] = useState(null);

  return deepmerge(
    {
      step: "/1",
      setStep: () => {},
      onSubmit: () => {},
      onRadioClick: (value: string) => {
        setParticipantType(value);
      },
      text: {
        ...props,
        error: {
          firstName: props.firstNameError,
          lastName: props.lastNameError,
          email: props.emailError,
          countryCode: props.countryError,
          currency: props.currencyError,
          allowBankingCollection: props.allowBankingCollectionError,
          participantType: props.participantTypeError,
        },
      },
      refs: {
        formRef: { current: null },
      },
      data: {
        currencies: [{ currencyCode: "CAD", displayName: "CAD" }],
        countries: [{ countryCode: "CA", displayName: "Canada" }],
      },
      states: {
        loading: false,
      },
      formState: { participantType },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
