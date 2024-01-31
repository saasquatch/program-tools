import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { UserNameViewProps } from "../sqm-tax-and-cash/sqm-tax-and-cash-view";
import { userInfoText } from "./defaultTextCopy";
import { UserInfoFormView } from "./sqm-user-info-form-view";
import { useTaxForm } from "./useUserInfoForm";
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

  @Prop()
  firstName: string = userInfoText.firstName;
  @Prop() lastName: string = userInfoText.lastName;
  @Prop() email: string = userInfoText.email;
  @Prop() country: string = userInfoText.country;
  @Prop() currency: string = userInfoText.currency;
  @Prop() allowBankingCollection: string = userInfoText.allowBankingCollection;
  @Prop() formStep: string = userInfoText.formStep;
  @Prop() personalInformation: string = userInfoText.personalInformation;
  @Prop() businessEntity: string = userInfoText.businessEntity;
  @Prop() participantType: string = userInfoText.participantType;
  @Prop() individualParticipant: string = userInfoText.individualParticipant;
  @Prop() taxAndBankingCollection: string =
    userInfoText.taxAndBankingCollection;
  @Prop() submitButton: string = userInfoText.submitButton;
  @Prop() firstNameError: string = userInfoText.error.firstName;
  @Prop() lastNameError: string = userInfoText.error.lastName;
  @Prop() emailError: string = userInfoText.error.email;
  @Prop() countryError: string = userInfoText.error.countryCode;
  @Prop() currencyError: string = userInfoText.error.currency;
  @Prop() allowBankingCollectionError: string =
    userInfoText.error.allowBankingCollection;
  @Prop() participantTypeError: string = userInfoText.error.participantType;

  /**
   * The message to be displayed when a required field is not filled.
   *
   * @uiName Required field message
   * @uiWidget textArea
   */
  @Prop() generalErrorTitle: string = userInfoText.error.generalTitle;
  @Prop() generalErrorDescription: string =
    userInfoText.error.generalDescription;

  /**
   * The message to be displayed when a the form submission fails unexpectedly.
   *
   * @uiName Network error message
   * @uiWidget textArea
   */
  @Prop() networkErrorMessage: string = "Network request failed.";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const props = isDemo()
      ? useTaxAndCashDemo(getProps(this))
      : useTaxForm(getProps(this));

    return (
      <Host>
        <UserInfoFormView
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

function useTaxAndCashDemo(props: TaxForm) {
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
      states: {
        loading: false,
      },
      formState: { participantType },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
