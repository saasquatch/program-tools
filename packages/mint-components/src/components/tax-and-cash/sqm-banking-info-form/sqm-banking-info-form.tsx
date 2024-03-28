import { isDemo } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import { Component, Host, Prop, State, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { intl } from "../../../global/global";
import { useParent } from "../../../utils/useParentState";
import { getProps } from "../../../utils/utils";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/data";
import { getFormMap } from "./formDefinitions";
import { mockPaymentOptions } from "./mockData";
import {
  BankingInfoFormView,
  BankingInfoFormViewProps,
} from "./sqm-banking-info-form-view";
import {
  getFormInputs,
  paypalFeeMap,
  useBankingInfoForm,
} from "./useBankingInfoForm";

/**
 * @uiName Banking Information Form
 * @exampleGroup Common Components
 *
 */
@Component({
  tag: "sqm-banking-info-form",
  shadow: false,
})
export class BankingInfoForm {
  @State() ignored = true;

  /**
   * @uiName Setup progress
   */
  @Prop() formStep: string = "Step {step} of {count}";

  /**
   * @uiName Step 4 title
   */
  @Prop() taxAndPayouts: string = "Payouts";

  /**
   * Displayed at the top of the page on all set up steps and on the dashboard.
   * @uiName Page description
   */
  @Prop() taxAndPayoutsDescription: string =
    "Submit your tax documents and add your banking information to receive your rewards.";

  /**
   * @uiName Direct to bank payout option
   */
  @Prop() directlyToBankAccount: string = "Directly to my bank account";

  /**
   * @uiName PayPal payout option
   */
  @Prop() toPayPalAccount: string =
    "PayPal (2% processing fee capped to {feeCap})";
  /**
   * @uiName Threshold balance payment schedule option
   */
  @Prop() paymentScheduleBalanceThreshold: string =
    "Pay me when my balance reaches a threshold";
  /**
   * @uiName Fixed day payment schedule option
   */
  @Prop() paymentScheduleFixedDay: string =
    "Pay me on a fixed day of the month";

  /**
   * Let the participant choose what day of the month they’ll get paid
   * @uiName Payment day field label
   */
  @Prop() paymentDaySelectLabel: string = "Payment Day";

  /**
   * Participant use this field to select the balance at which they want to be paid
   * @uiName Payment threshold field label
   */
  @Prop() paymentThresholdSelectLabel: string = "Payment Threshold";
  /**
   * One of two payment day options
   * @uiName First of month payday option
   */
  @Prop() paymentDayFirstOfMonthLabelText: string = "1st of the month";
  /**
   * Label text for the payment day select option for the fifteenth of the month
   * @uiName Fifteenth of month payday option
   */
  @Prop() paymentDayFifteenthOfMonthLabelText: string = "15th of the month";
  /**
   * @uiName Payment method section header
   */
  @Prop() paymentMethod: string = "Payment method";
  /**
   * @uiName Payment schedule section header
   */
  @Prop() paymentSchedule: string = "Payment schedule";
  /**
   * @uiName Payment method section description
   */
  @Prop() paymentMethodSubtext: string =
    "Payouts will be sent from our referral program provider, impact.com.";
  /**
   * Displayed to participants who choose PayPal as their payout method
   * @uiName PayPal email field label
   */
  @Prop() payPalInputLabel: string = "PayPal email";
  /**
   * @uiName Bank country field label
   */
  @Prop() bankLocationLabel: string = "Bank country location";
  /**
   * @uiName Beneficiary account field label
   */
  @Prop() beneficiaryAccountNameLabel: string = "Beneficiary account name";

  /**
   * @uiName Bank account type field label
   */
  @Prop() bankAccountTypeLabel: string = "Bank account type";

  /**
   * @uiName Checking account option
   */
  @Prop() checkingSelectItemLabel: string = "Checking";

  /**
   * @uiName Savings account options
   */
  @Prop() savingsSelectItemLabel: string = "Savings";

  /**
   * @uiName Bank account number field label
   */
  @Prop() bankAccountNumberLabel: string = "Bank account number";
  /**
   * @uiName IBAN field label
   */
  @Prop() ibanLabel: string = "IBAN";

  /**
   * @uiName SWIFT code field label
   */
  @Prop() swiftCodeLabel: string = "SWIFT code";

  /**
   * @uiName Routing code field label
   */
  @Prop() routingCodeLabel: string =
    "{bankCountry, select, AU {BSB number} CA {Routing number} CZ {Bank code} HK {Clearing code} SG {Clearing code} US {ABA routing number} NZ {BSB number} ZA {Bank/Branch number} IN {IFSC} CNY {CNAPS} other {Routing code} }";

  /**
   * @uiName Bank name field label
   */
  @Prop() bankNameLabel: string = "Bank Name";

  /**
   * @uiName Classification entity field label
   */
  @Prop() classificationEntityLabel: string = "Classification Entity";

  /**
   * One of three options listed for the classification field
   * @uiName Business classification option
   */
  @Prop() businessSelectItemLabel: string = "Business";

  /**
   * One of three options listed for the classification field
   * @uiName Individual classification option
   */
  @Prop() individualSelectItemLabel: string = "Individual";

  /**
   * One of three options listed for the classification field
   * @uiName Foreign classification option
   */
  @Prop() foreignSelectItemLabel: string = "Foreign";

  /**
   * @uiName Classification CPF field label
   */
  @Prop() classificationCPFLabel: string = "Classification CPF";

  /**
   * @uiName Patronymic name field label
   */
  @Prop() patronymicNameLabel: string = "Patronymic name";

  /**
   * @uiName VO code field label
   */
  @Prop() voCodeLabel: string = "VO code";

  /**
   * @uiName Agency code field label
   */
  @Prop() agencyCodeLabel: string = "Agency code";

  /**
   * @uiName Branch code field label
   */
  @Prop() branchCodeLabel: string = "Branch code";

  /**
   * Label text for the classification input field
   * @uiName Classification field label
   */
  @Prop() classificationLabel: string = "Classification";

  /**
   * @uiName Taxpayer ID field label
   */
  @Prop() taxPayerIdLabel: string =
    "{country, select, AR {CUIT/CUIL} KR {Classification ID} other { Beneficiary INN } }";

  /**
   * @uiName Bank address field label
   */
  @Prop() bankAddressLabel: string = "Bank address";
  /**
   * @uiName Bank city field label
   */
  @Prop() bankCityLabel: string = "Bank city";
  /**
   * @uiName Bank province/state field label
   */
  @Prop() bankStateLabel: string = "Bank province/state";
  /**
   * @uiName Bank postal code field label
   */
  @Prop() bankPostalCodeLabel: string = "Bank postal code";
  /**
   * Default payment method to the participants’ bank account.
   * @uiName EFT withdrawal payment method
   */
  @Prop() eftWithdrawalLabel: string = "EFT withdrawal (free)";

  /**
   * @uiName FX Wire Processing fee text
   */
  @Prop() fxWireProcessingFeeLabel: string =
    "FX Wire (Processing Fee {currency}{defaultFxFee}.00)";

  /**
   * Placeholder text displayed in the country search dropdown
   * @uiName Country field placeholder text
   */
  @Prop() searchForCountryText: string = "Search for country..";

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
    "If you don’t recognize this referral program provider or believe this is a mistake, please contact our Support team or sign up for this referral program with a different email.";

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
   * @uiName Continue button label
   */
  @Prop() continueButton: string = "Save";
  /**
   * Text for the back button in the form
   * @uiName Back button label
   */
  @Prop() backButton: string = "Back";
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
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<BankingInfoFormViewProps>;

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
        loadingErrorAlertDescription: props.loadingErrorAlertDescription,
        loadingErrorAlertHeader: props.loadingErrorAlertHeader,
      },
    };
  }

  render() {
    const props = isDemo()
      ? useDemoBankingInfoForm(this)
      : useBankingInfoForm(this);

    const { errors } = props.states.formState;

    const fieldRequiredError = this.fieldRequiredError;
    const fieldInvalidError = this.fieldInvalidError;

    function getValidationErrorMessage({
      type,
      label,
    }: {
      type: "required" | "invalid";
      label: string;
    }) {
      if (type === "required") {
        return intl.formatMessage(
          {
            id: `requiredText-${label}`,
            defaultMessage: fieldRequiredError,
          },
          {
            fieldName: label,
          }
        );
      }
      if (type === "invalid") {
        return intl.formatMessage(
          {
            id: `invalidText-${label}`,
            defaultMessage: fieldInvalidError,
          },
          {
            fieldName: label,
          }
        );
      }
      return "";
    }

    const formMap = getFormMap({
      props,
      getValidationErrorMessage,
      bankCountry: props.states.bankCountry,
    });

    const inputFields = getFormInputs({
      bitset: props.states.bitset,
      formMap,
    });

    const searchStyle = {
      SearchInput: {
        padding: "var(--sl-spacing-x-small)",
      },
    };

    return (
      <Host>
        <BankingInfoFormView
          callbacks={props.callbacks}
          text={props.text}
          states={props.states}
          refs={props.refs}
          slots={{
            formInputsSlot: inputFields?.map(({ input }) => input),
            countryInputSlot: (
              <sl-select
                label={props.text.bankLocationLabel}
                required
                name="/bankCountry"
                id="bankCountry"
                value={props.states.formState.bankCountry || ""}
                onSl-select={(e) =>
                  props.callbacks.setBankCountry(e.detail?.item?.value)
                }
                {...(errors?.inputErrors?.bankCountry && {
                  class: "error-input",
                  helpText: getValidationErrorMessage({
                    type: errors?.inputErrors?.bankCountry?.type,
                    label: props.text.bankLocationLabel,
                  }),
                })}
              >
                <sl-input
                  class={searchStyle.SearchInput}
                  placeholder={this.searchForCountryText}
                  onKeyDown={(e) => {
                    // Stop shoelace intercepting key presses
                    e.stopPropagation();
                  }}
                  onSl-input={(e) => {
                    props.callbacks.setCountrySearch(e.target.value);
                  }}
                ></sl-input>
                {props.states.countries?.map((country) => {
                  return (
                    <sl-menu-item value={country.countryCode}>
                      {country.displayName}
                    </sl-menu-item>
                  );
                })}
                {props.states?.allCountries?.map((c) => (
                  <sl-menu-item
                    value={c.countryCode}
                    style={{ display: "none" }}
                  >
                    {c.displayName}
                  </sl-menu-item>
                ))}
              </sl-select>
            ),
            paymentMethodSlot: (
              <sl-input
                key="paymentMethod"
                label={props.text.paymentMethod}
                placeholder={props.states.paymentMethodFeeLabel}
                disabled
              ></sl-input>
            ),
            paymentThresholdSelectSlot: (
              <sl-select
                required
                label={props.text.paymentThresholdSelectLabel}
                name="/paymentThreshold"
                id="paymentThreshold"
                value={props.states?.formState?.paymentThreshold || ""}
                {...(errors?.inputErrors?.paymentThreshold && {
                  class: "error-input",
                  helpText: getValidationErrorMessage({
                    type: errors?.inputErrors?.paymentThreshold?.type,
                    label: props.text.paymentThresholdSelectLabel,
                  }),
                })}
              >
                {props.states.thresholds.map((t) => (
                  <sl-menu-item
                    value={t}
                  >{`${props.states.currency}${t}`}</sl-menu-item>
                ))}
              </sl-select>
            ),
            paymentFixedDaySelectSlot: (
              <sl-select
                required
                label={props.text.paymentDaySelectLabel}
                value={props.states?.formState?.paymentDay || ""}
                name="/paymentDay"
                id="paymentDay"
                {...(errors?.inputErrors?.paymentDay && {
                  class: "error-input",
                  helpText: getValidationErrorMessage({
                    type: errors?.inputErrors?.paymentDay?.type,
                    label: props.text.paymentDaySelectLabel,
                  }),
                })}
              >
                <sl-menu-item value={"1"}>
                  {props.text.paymentDayFirstOfMonthLabelText}
                </sl-menu-item>
                <sl-menu-item value={"15"}>
                  {props.text.paymentDayFifteenthOfMonthLabelText}
                </sl-menu-item>
              </sl-select>
            ),
            paypalInputSlot: (
              <sl-input
                required
                value={props.states?.formState?.paypalEmailAddress || ""}
                label={props.text.payPalInputLabel}
                key="paypalEmailAddress"
                name="/paypalEmailAddress"
                id="paypalEmailAddress"
                type="text"
                {...(props.states.formState?.errors?.inputErrors
                  ?.paypalEmailAddress && {
                  class: "error-input",
                  helpText: getValidationErrorMessage({
                    type: props.states.formState?.errors?.inputErrors
                      ?.paypalEmailAddress?.type,
                    label: props.text.payPalInputLabel,
                  }),
                })}
              ></sl-input>
            ),
          }}
        />
      </Host>
    );
  }
}

function useDemoBankingInfoForm(
  props: BankingInfoForm
): BankingInfoFormViewProps {
  const defaultPaymentMethodChecked =
    props.demoData?.states?.formState?.paymentMethodChecked;
  const defaultPaymentScheduleChecked =
    props.demoData?.states?.formState?.paymentScheduleChecked;
  const defaultCurrency = props.demoData?.states?.currency;
  const defaultCountry = props.demoData?.states?.formState?.bankCountry;

  const [step, setStep] = useParent(TAX_CONTEXT_NAMESPACE);
  const [paymentMethodChecked, setPaymentMethodChecked] = useState<
    "toBankAccount" | "toPayPalAccount" | undefined
  >(undefined);
  const [paymentScheduleChecked, setPaymentScheduleChecked] = useState<
    "BALANCE_THRESHOLD" | "FIXED_DAY" | undefined
  >(undefined);

  const [currency, setCurrency] = useState(defaultCurrency);
  const [bankCountry, setBankCountry] = useState(defaultCountry);

  const currentPaymentOption = mockPaymentOptions[currency]?.find(
    (paymentOption) => {
      if (paymentOption.countryCode === bankCountry) return true;
      return false;
    }
  );

  const bitset =
    currentPaymentOption?.withdrawalSettingId ||
    props.demoData?.states?.bitset ||
    0;

  useEffect(() => {
    if (defaultPaymentMethodChecked !== paymentMethodChecked)
      setPaymentMethodChecked(defaultPaymentMethodChecked);
    if (defaultPaymentScheduleChecked !== paymentScheduleChecked)
      setPaymentScheduleChecked(defaultPaymentScheduleChecked);
    if (defaultCurrency !== currency) setCurrency(defaultCurrency);
    if (defaultCountry !== bankCountry) setBankCountry(defaultCountry);
  }, [defaultPaymentMethodChecked, defaultCurrency, defaultCountry]);

  const feeCap = paypalFeeMap[currency] || "";

  const paymentMethodFeeMap = {
    ACH: props.eftWithdrawalLabel,
    WIRE: intl.formatMessage(
      { id: "fxWireText", defaultMessage: props.fxWireProcessingFeeLabel },
      {
        currency,
        defaultFxFee: currentPaymentOption?.defaultFxFee || "0",
      }
    ),
  };

  const paymentMethodFeeLabel =
    paymentMethodFeeMap[currentPaymentOption?.defaultFinancePaymentMethodId];

  return deepmerge(
    {
      states: {
        step: "4",
        isPartner: false,
        disabled: false,
        loading: false,
        saveLoading: false,
        hideSteps: false,
        hideBackButton: false,
        feeCap,
        thresholds: [],
        paymentMethodFeeLabel,
        formState: {
          paymentMethodChecked,
          paymentScheduleChecked,
          errors: {
            general: false,
            beneficiaryAccountName: false,
            bankAccountType: false,
            bankAccountNumber: false,
            iban: false,
            swiftCode: false,
            routingCode: false,
            bankName: false,
            beneficiaryClassification: false,
            patronymicName: false,
            voCode: false,
            agencyCode: false,
            bankAddress: false,
            bankCity: false,
            bankState: false,
            bankPostalCode: false,
            branchCode: false,
            paymentThreshold: false,
            paymentDay: false,
          },
        },
        bitset,
        bankCountry,
        currency,
        setCurrency,
        hasPayPal: true,
      },
      callbacks: {
        onSubmit: async () => {
          setStep("/dashboard");
        },
        setBankCountry,
        setPaymentMethodChecked,
        setPaymentScheduleChecked,
        setCountrySearch: () => {},
        onBack: async () => console.log("back"),
      },
      text: props.getTextProps(),
      refs: {
        formRef: { current: null },
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
