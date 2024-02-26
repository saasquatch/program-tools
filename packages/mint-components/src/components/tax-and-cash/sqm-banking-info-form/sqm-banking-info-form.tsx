import { isDemo } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import { Component, Host, Prop, State, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { mockPaymentOptions } from "./mockData";
import { BankingInfoFormView } from "./sqm-banking-info-form-view";
import {
  getFormInputs,
  getFormMap,
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
   * Subtext shown at the top of the page, used to show the current step of the tax form.
   * @uiName Form step text
   */
  @Prop() formStep: string = "Step 3 of 4";

  /**
   * Heading text shown at the top of the page
   * @uiName Tax and Payouts heading text
   */
  @Prop() taxAndPayouts: string = "Tax and Payouts";

  /**
   * Text shown at the top of the page next to the tax and payouts label text
   * @uiName Tax and Payouts label text
   */
  @Prop() taxAndPayoutsDescription: string =
    "Submit your tax documents and add your banking information to receive your rewards.";

  /**
   * Text for the option to receive payments directly to a bank account
   * @uiName Directly to bank account option text
   */
  @Prop() directlyToBankAccount: string = "Directly to my bank account";

  /**
   * Text for the option to receive payments to a PayPal account with processing fee details
   * @uiName PayPal option text with processing fee placeholder
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
  @Prop() paymentMethod: string = "Payment Method";
  /**
   * Heading text for the payment schedule section
   * @uiName Payment schedule heading text
   */
  @Prop() paymentSchedule: string = "Payment Schedule";
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
  @Prop() payPalInputLabel: string = "PayPal Email";

  /**
   * Text for the save button in the form
   * @uiName Save button text
   */
  @Prop() submitButton: string = "Save";
  /**
   * Label text for the bank country location input field
   * @uiName Bank country location input label
   */
  @Prop() bankLocationLabel: string = "Bank Country Location";
  /**
   * Label text for the beneficiary account name input field
   * @uiName Beneficiary account name input label
   */
  @Prop() beneficiaryAccountNameLabel: string = "Beneficiary Account Name";

  /**
   * Label text for the bank account type input field
   * @uiName Bank account type input label
   */
  @Prop() bankAccountTypeLabel: string = "Bank Account Type";

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
  @Prop() bankAccountNumberLabel: string = "Bank Account Number";
  /**
   * Label text for the IBAN input field
   * @uiName IBAN input label
   */
  @Prop() ibanLabel: string = "IBAN";

  /**
   * Label text for the SWIFT code input field
   * @uiName SWIFT code input label
   */
  @Prop() swiftCodeLabel: string = "SWIFT Code";

  /**
   * Label text for the routing code input field
   * @uiName Routing code input label
   */
  @Prop() routingCodeLabel: string = "Routing Code";

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
   * Header text for the alert when the user is identified as a partner
   * @uiName Partner identification alert header
   */
  @Prop() isPartnerAlertHeader: string =
    "An account with this email already exists with our referral program provider, impact.com";

  /**
   * Description text for the alert when the user is identified as a partner
   * @uiName Partner identification alert description
   */
  @Prop() isPartnerAlertDescription: string =
    "If you don’t recognize this referral program provider or believe this is a mistake, please contact Support or sign up for this referral program with a different email.";

  /**
   * Label text for the classification CPF input field
   * @uiName Classification CPF input label
   */
  @Prop() classificationCPFLabel: string = "Classification CPF";

  /**
   * Label text for the patronymic name input field
   * @uiName Patronymic name input label
   */
  @Prop() patronymicNameLabel: string = "Patronymic Name";

  /**
   * Label text for the VO code input field
   * @uiName VO code input label
   */
  @Prop() voCodeLabel: string = "VO Code";

  /**
   * Label text for the agency code input field
   * @uiName Agency code input label
   */
  @Prop() agencyCodeLabel: string = "Agency Code";

  /**
   * Label text for the branch code input field
   * @uiName Branch code input label
   */
  @Prop() branchCodeLabel: string = "Branch Code";

  /**
   * Label text for the classification input field
   * @uiName Classification input label
   */
  @Prop() classificationLabel: string = "Classification";

  /**
   * Label text for the Taxpayer ID input field
   * @uiName Taxpayer ID input label
   */
  @Prop() taxPayerIdLabel: string = "Taxpayer ID";

  /**
   * Label text for the Bank Address input
   * @uiName Bank Address input item label
   */
  @Prop() bankAddressLabel: string = "Bank Address";
  /**
   * Label text for the Bank City input
   * @uiName Bank City Label input label
   */
  @Prop() bankCityLabel: string = "Bank City";
  /**
   * Label text for the Bank Province State input
   * @uiName Bank Province State input label
   */
  @Prop() bankProvinceStateLabel: string = "Bank Province State";
  /**
   * Label text for the Bank Postal Code
   * @uiName  Bank Postal Code input label
   */
  @Prop() bankPostalCodeLabel: string = "Bank Postal Code";
  /**
   * Title text for a general form submission error
   * @uiName General form submission error title
   */
  @Prop() generalErrorTitle: string =
    "There was a problem submitting your information";

  /**
   * Description text for a general form submission error
   * @uiName General form submission error description
   */
  @Prop() generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<any>;

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
      },
    };
  }

  // need to make this translatable
  getValidationErrorMessage(inputLabel: string) {
    return `${inputLabel} is required`;
  }

  render() {
    const props = isDemo()
      ? useDemoBankingInfoForm(this)
      : useBankingInfoForm(getProps(this));

    const { errors } = props.states.formState;

    console.log({ props });

    // TODO: may need to make these translatable
    const routingCodeLabels = {
      AU: "BSB Number",
      CA: "Routing Number",
      CZ: "Bank Code",
      HK: "Clearing Code",
      SG: "Clearing Code",
      US: "ABA Routing Number",
      NZ: "BSB Number",
      ZA: "Bank/Branch Number",
      IN: "IFSC",
      CNY: "CNAPS",
    };

    const formMap = getFormMap({ props, routingCodeLabels });

    const inputFields = getFormInputs({
      bitset: props.states.bitset,
      formMap,
    });

    return (
      <Host>
        {/* demo */}
        {props.states.showInputs && (
          <sl-select
            name="/currency"
            value={props.states.currency}
            onSl-select={(e) => {
              props.callbacks.setCurrency(e.detail?.item?.value);
              props.callbacks.setBankCountry("");
            }}
          >
            <sl-menu-item value="USD">USD</sl-menu-item>
            <sl-menu-item value="GBP">GBP</sl-menu-item>
            <sl-menu-item value="AUD">AUD</sl-menu-item>
            <sl-menu-item value="CAD">CAD</sl-menu-item>
            <sl-menu-item value="EUR">EUR</sl-menu-item>
            <sl-menu-item value="JPY">JPY</sl-menu-item>
            <sl-menu-item value="KRW">KRW</sl-menu-item>
            <sl-menu-item value="MYR">MYR</sl-menu-item>
            <sl-menu-item value="MXN">MXN</sl-menu-item>
            <sl-menu-item value="RUB">RUB</sl-menu-item>
            <sl-menu-item value="ARS">ARS</sl-menu-item>
          </sl-select>
        )}
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
                value={props.states.bankCountry}
                onSl-select={(e) =>
                  props.callbacks.setBankCountry(e.detail?.item?.value)
                }
                {...(errors?.bankCountry && {
                  class: "error-input",
                  helpText: this.getValidationErrorMessage(
                    props.text.bankLocationLabel
                  ),
                })}
              >
                {/* TODO: mock data should come from the backend when available */}
                {props.states.countries?.map((country) => {
                  return (
                    <sl-menu-item value={country.code}>
                      {country.name}
                    </sl-menu-item>
                  );
                })}
              </sl-select>
            ),
            paymentMethodSlot: (
              <sl-input
                name="/paymentMethod"
                id="paymentMethod"
                label={props.text.paymentMethod}
                placeholder={props.states.paymentMethodFeeLabel}
                disabled
                value={
                  props.states.currentPaymentOption?.paymentMethod
                    ? "BANK_TRANSFER"
                    : ""
                }
              ></sl-input>
            ),
            paymentThresholdSelectSlot: (
              <sl-select
                required
                label={props.text.paymentThresholdSelectLabel}
                name="/paymentThreshold"
                id="paymentThreshold"
                {...(errors?.paymentThreshold && {
                  class: "error-input",
                  helpText: this.getValidationErrorMessage(
                    props.text.paymentThresholdSelectLabel
                  ),
                })}
              >
                {/* TODO: Unhardcode this list */}
                <sl-menu-item value="1st">10 USD</sl-menu-item>
                <sl-menu-item value="15th">20 USD</sl-menu-item>
              </sl-select>
            ),
            paymentFixedDaySelectSlot: (
              <sl-select
                required
                label={props.text.paymentDaySelectLabel}
                name="/paymentDay"
                id="paymentDay"
                {...(errors?.paymentDay && {
                  class: "error-input",
                  helpText: this.getValidationErrorMessage(
                    props.text.paymentDaySelectLabel
                  ),
                })}
              >
                <sl-menu-item value="1st">
                  {props.text.paymentDayFirstOfMonthLabelText}
                </sl-menu-item>
                <sl-menu-item value="15th">
                  {props.text.paymentDayFifteenthOfMonthLabelText}
                </sl-menu-item>
              </sl-select>
            ),
          }}
        />
      </Host>
    );
  }
}

function useDemoBankingInfoForm(props: BankingInfoForm) {
  const defaultPaymentMethodChecked =
    props.demoData?.states?.formState?.paymentMethodChecked;
  const defaultPaymentScheduleChecked =
    props.demoData?.states?.formState?.paymentScheduleChecked;
  const defaultCurrency = props.demoData?.states?.currency;
  const defaultCountry = props.demoData?.states?.bankCountry;

  const [paymentMethodChecked, setPaymentMethodChecked] = useState<
    "toBankAccount" | "toPayPalAccount" | undefined
  >(undefined);
  const [paymentScheduleChecked, setPaymentScheduleChecked] = useState<
    "paymentThreshold" | "paymentDay" | undefined
  >(undefined);

  const [currency, setCurrency] = useState(defaultCurrency);
  const [bankCountry, setBankCountry] = useState(defaultCountry);

  const currentPaymentOption = mockPaymentOptions[currency]?.find(
    (paymentOption) => {
      if (paymentOption.country === bankCountry) return true;
      return false;
    }
  );

  const bitset =
    currentPaymentOption?.withdrawalId || props.demoData?.states?.bitset || 0;

  console.log("demo hook", {
    demoData: props.demoData,
    currentPaymentOption,
    currency,
    bankCountry,
    bitset,
  });

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
    ACH: "EFT Withdrawal (free)",
    WIRE: `FX Wire (Processing Fee ${currency}${
      currentPaymentOption?.defaultFxFee || 0
    })`,
  };

  const paymentMethodFeeLabel =
    paymentMethodFeeMap[currentPaymentOption?.paymentMethod];

  return deepmerge(
    {
      states: {
        isPartner: false,
        disabled: false,
        loading: false,
        hideSteps: false,
        feeCap,
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
            bankProvinceState: false,
            bankPostalCode: false,
            branchCode: false,
            paymentThreshold: false,
            paymentDay: false,
          },
        },
        bitset,
        bankCountry,
        showInputs: props.demoData?.showInputs,
        currency,
        setCurrency,
        hasPayPal: true,
      },
      callbacks: {
        onSubmit: async () => {},
        setBankCountry,
        setPaymentMethodChecked,
        setPaymentScheduleChecked,
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
