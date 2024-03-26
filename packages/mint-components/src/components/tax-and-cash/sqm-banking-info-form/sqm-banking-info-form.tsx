import { isDemo } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import { Component, Host, Prop, State, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { mockPaymentOptions } from "./mockData";
import {
  BankingInfoFormView,
  BankingInfoFormViewProps,
} from "./sqm-banking-info-form-view";
import {
  getFormInputs,
  getFormMap,
  paypalFeeMap,
  useBankingInfoForm,
} from "./useBankingInfoForm";
import { intl } from "../../../global/global";
import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/data";

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
   * Text for the option to receive payments directly to a bank account
   * @uiName Directly to bank account option text
   */
  @Prop() directlyToBankAccount: string = "Directly to my bank account";

  /**
   * @uiName PayPal payout option
   */
  @Prop() toPayPalAccount: string =
    "PayPal (2% processing fee capped to {feeCap})";
  /**
   * Text for the option to receive payments at a specific balance threshold
   * @uiName Payment schedule balance threshold text
   */
  @Prop() paymentScheduleBalanceThreshold: string =
    "Pay me when my balance reaches a threshold";
  /**
   * Text for the option to receive payments on a specific day of the month
   * @uiName Payment schedule fixed day text
   */
  @Prop() paymentScheduleFixedDay: string =
    "Pay me on a fixed day of the month";

  /**
   * Label text for the payment day select
   * @uiName Payment day select label
   */
  @Prop() paymentDaySelectLabel: string = "Payment Day";

  /**
   * Label text for the payment day select
   * @uiName Payment day select label
   */
  @Prop() paymentThresholdSelectLabel: string = "Payment Threshold";
  /**
   * Label text for the payment day select option for the first of the month
   * @uiName First of month label text
   */
  @Prop() paymentDayFirstOfMonthLabelText: string = "1st of the month";
  /**
   * Label text for the payment day select option for the fifteenth of the month
   * @uiName Fifteenth of month label text
   */
  @Prop() paymentDayFifteenthOfMonthLabelText: string = "15th of the month";
  /**
   * Heading text for the payment method section
   * @uiName Payment method heading text
   */
  @Prop() paymentMethod: string = "Payment method";
  /**
   * Heading text for the payment schedule section
   * @uiName Payment schedule heading text
   */
  @Prop() paymentSchedule: string = "Payment schedule";
  /**
   * Subtext for the payment method section
   * @uiName Payment method subtext
   */
  @Prop() paymentMethodSubtext: string =
    "Payouts will be sent on the first day of each month from our referral program provider, impact.com.";
  /**
   * Label text for the PayPal email input field
   * @uiName PayPal email input label
   */
  @Prop() payPalInputLabel: string = "PayPal email";
  /**
   * Label text for the bank country location input field
   * @uiName Bank country location input label
   */
  @Prop() bankLocationLabel: string = "Bank country location";
  /**
   * Label text for the beneficiary account name input field
   * @uiName Beneficiary account name input label
   */
  @Prop() beneficiaryAccountNameLabel: string = "Beneficiary account name";

  /**
   * Label text for the bank account type input field
   * @uiName Bank account type input label
   */
  @Prop() bankAccountTypeLabel: string = "Bank account type";

  /**
   * Label text for the checking account type select item
   * @uiName Checking select item label
   */
  @Prop() checkingSelectItemLabel: string = "Checking";

  /**
   * Label text for the savings account type select item
   * @uiName Savings select item label
   */
  @Prop() savingsSelectItemLabel: string = "Savings";

  /**
   * Label text for the bank account number input field
   * @uiName Bank account number input label
   */
  @Prop() bankAccountNumberLabel: string = "Bank account number";
  /**
   * Label text for the IBAN input field
   * @uiName IBAN input label
   */
  @Prop() ibanLabel: string = "IBAN";

  /**
   * Label text for the SWIFT code input field
   * @uiName SWIFT code input label
   */
  @Prop() swiftCodeLabel: string = "SWIFT code";

  /**
   * Label text for the routing code input field
   * @uiName Routing code input label
   */
  @Prop() routingCodeLabel: string =
    "{bankCountry, select, AU {BSB number} CA {Routing number} CZ {Bank code} HK {Clearing code} SG {Clearing code} US {ABA routing number} NZ {BSB number} ZA {Bank/Branch number} IN {IFSC} CNY {CNAPS} other {Routing code} }";

  /**
   * Label text for the bank name input field
   * @uiName Bank name input label
   */
  @Prop() bankNameLabel: string = "Bank Name";

  /**
   * Label text for the classification entity input field
   * @uiName Classification entity input label
   */
  @Prop() classificationEntityLabel: string = "Classification Entity";

  /**
   * Label text for the business select item
   * @uiName Business select item label
   */
  @Prop() businessSelectItemLabel: string = "Business";

  /**
   * Label text for the individual select item
   * @uiName Individual select item label
   */
  @Prop() individualSelectItemLabel: string = "Individual";

  /**
   * Label text for the foreign select item
   * @uiName Foreign select item label
   */
  @Prop() foreignSelectItemLabel: string = "Foreign";

  /**
   * Label text for the classification CPF input field
   * @uiName Classification CPF input label
   */
  @Prop() classificationCPFLabel: string = "Classification CPF";

  /**
   * Label text for the patronymic name input field
   * @uiName Patronymic name input label
   */
  @Prop() patronymicNameLabel: string = "Patronymic name";

  /**
   * @uiName VO code field label
   */
  @Prop() voCodeLabel: string = "VO code";

  /**
   * Label text for the agency code input field
   * @uiName Agency code input label
   */
  @Prop() agencyCodeLabel: string = "Agency code";

  /**
   * Label text for the branch code input field
   * @uiName Branch code input label
   */
  @Prop() branchCodeLabel: string = "Branch code";

  /**
   * Label text for the classification input field
   * @uiName Classification input label
   */
  @Prop() classificationLabel: string = "Classification";

  /**
   * @uiName Taxpayer ID field label
   */
  @Prop() taxPayerIdLabel: string =
    "{country, select, AR {CUIT/CUIL} KR {Classification ID} other { Beneficiary INN } }";

  /**
   * Label text for the Bank Address input
   * @uiName Bank Address input item label
   */
  @Prop() bankAddressLabel: string = "Bank address";
  /**
   * Label text for the Bank City input
   * @uiName Bank City Label input label
   */
  @Prop() bankCityLabel: string = "Bank city";
  /**
   * Label text for the Bank Province / State input
   * @uiName Bank Province / State input label
   */
  @Prop() bankStateLabel: string = "Bank province/state";
  /**
   * Label text for the Bank Postal Code
   * @uiName Bank Postal Code input label
   */
  @Prop() bankPostalCodeLabel: string = "Bank postal code";
  /**
   * @uiName EFT Withdrawal label text
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
                    <sl-menu-item value={country.code}>
                      {country.name}
                    </sl-menu-item>
                  );
                })}
                {props.states?.allCountries?.map((c) => (
                  <sl-menu-item value={c.code} style={{ display: "none" }}>
                    {c.name}
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
