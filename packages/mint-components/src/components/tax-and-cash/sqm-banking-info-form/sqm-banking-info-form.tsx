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
  @Prop() toPaypalAccount: string =
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

    const formMap = {
      0: {
        input: (
          <sl-input
            required
            label={props.text.beneficiaryAccountNameLabel}
            name="/beneficiaryAccountName"
            id="beneficiaryAccountName"
            type="text"
            {...(errors?.beneficiaryAccountName && {
              class: "error-input",
              helpText: this.getValidationErrorMessage(
                props.text.beneficiaryAccountNameLabel
              ),
            })}
          ></sl-input>
        ),
      },
      1: {
        input: (
          <sl-select
            required
            label={props.text.bankAccountTypeLabel}
            name="/bankAccountType"
            id="bankAccountType"
            {...(errors?.bankAccountType && {
              class: "error-input",
              helpText: this.getValidationErrorMessage(
                props.text.bankAccountTypeLabel
              ),
            })}
          >
            <sl-menu-item value="CHECKING">
              {props.text.checkingSelectItemLabel}
            </sl-menu-item>
            <sl-menu-item value="SAVINGS">
              {props.text.savingsSelectItemLabel}
            </sl-menu-item>
          </sl-select>
        ),
      },
      2: {
        input: (
          <sl-input
            required
            label={props.text.bankAccountNumberLabel}
            name="/bankAccountNumber"
            id="bankAccountNumber"
            type="text"
            {...(errors?.bankAccountNumber && {
              class: "error-input",
              helpText: this.getValidationErrorMessage(
                props.text.bankAccountNumberLabel
              ),
            })}
          ></sl-input>
        ),
      },
      3: {
        input: (
          <sl-input
            required
            label={props.text.ibanLabel}
            name="/iban"
            id="iban"
            type="text"
            {...(errors?.iban && {
              class: "error-input",
              helpText: this.getValidationErrorMessage(props.text.ibanLabel),
            })}
          ></sl-input>
        ),
      },

      4: {
        input: (
          <sl-input
            required
            label={props.text.swiftCodeLabel}
            name="/swiftCode"
            id="swiftCode"
            type="text"
            {...(errors?.swiftCode && {
              class: "error-input",
              helpText: this.getValidationErrorMessage(
                props.text.swiftCodeLabel
              ),
            })}
          ></sl-input>
        ),
      },
      5: {
        input: (
          <sl-input
            required
            label={
              routingCodeLabels[props.states.bankCountry] ||
              props.text.routingCodeLabel
            }
            name="/routingCode"
            id="routingCode"
            type="text"
            {...(errors?.routingCode && {
              class: "error-input",
              helpText: this.getValidationErrorMessage(
                routingCodeLabels[props.states.bankCountry] ||
                  props.text.routingCodeLabel
              ),
            })}
          ></sl-input>
        ),
      },
      6: {
        input: (
          <sl-input
            required
            label={props.text.bankNameLabel}
            name="/bankName"
            id="bankName"
            type="text"
            {...(errors?.bankName && {
              class: "error-input",
              helpText: this.getValidationErrorMessage(
                props.text.bankNameLabel
              ),
            })}
          ></sl-input>
        ),
      },
      7: {
        input: (
          <sl-select
            required
            label={props.text.classificationLabel}
            name="/beneficiaryClassification"
            id="beneficiaryClassification"
            {...(errors?.beneficiaryClassification && {
              class: "error-input",
              helpText: this.getValidationErrorMessage(
                props.text.classificationLabel
              ),
            })}
          >
            <sl-menu-item value="BUSINESS">
              {props.text.businessSelectItemLabel}
            </sl-menu-item>
            <sl-menu-item value="INDIVIDUAL">
              {props.text.individualSelectItemLabel}
            </sl-menu-item>
            <sl-menu-item value="FOREIGN">
              {props.text.foreignSelectItemLabel}
            </sl-menu-item>
          </sl-select>
        ),
      },
      8: {
        input: (
          <sl-select
            required
            label={props.text.classificationCPFLabel}
            name="/beneficiaryClassification"
            id="beneficiaryClassification"
            {...(errors?.beneficiaryClassification && {
              class: "error-input",
              helpText: this.getValidationErrorMessage(
                props.text.classificationCPFLabel
              ),
            })}
          >
            <sl-menu-item value="CPF">CPF</sl-menu-item>
            <sl-menu-item value="CNPJ">CNPJ</sl-menu-item>
          </sl-select>
        ),
      },
      9: {
        input: (
          <sl-input
            required
            label={props.text.patronymicNameLabel}
            name="/patronymicName"
            id="patronymicName"
            type="text"
            {...(errors?.patronymicName && {
              class: "error-input",
              helpText: this.getValidationErrorMessage(
                props.text.patronymicNameLabel
              ),
            })}
          ></sl-input>
        ),
      },
      10: {
        input: (
          <sl-input
            label={props.text.voCodeLabel}
            name="/voCode"
            id="voCode"
            type="text"
            {...(errors?.voCode && {
              class: "error-input",
              helpText: this.getValidationErrorMessage(props.text.voCodeLabel),
            })}
          ></sl-input>
        ),
      },
      11: {
        input: (
          <sl-input
            required
            label={props.text.agencyCodeLabel}
            name="/agencyCode"
            id="agencyCode"
            type="text"
            {...(errors?.agencyCode && {
              class: "error-input",
              helpText: this.getValidationErrorMessage(
                props.text.agencyCodeLabel
              ),
            })}
          ></sl-input>
        ),
      },
      12: {
        input: (
          <div>
            <sl-input
              required
              //todo: add prop for label
              label={"bankAddress"}
              name="/bankAddress"
              id="bankAddress"
              type="text"
              {...(errors?.bankAddress && {
                class: "error-input",
                helpText: this.getValidationErrorMessage(
                  props.text.bankAddressLabel
                ),
              })}
            ></sl-input>
            <sl-input
              required
              //todo: add prop for label
              label={"bankCity"}
              name="/bankCity"
              id="bankCity"
              type="text"
              {...(errors?.bankCity && {
                class: "error-input",
                helpText: this.getValidationErrorMessage(
                  props.text.bankCityLabel
                ),
              })}
            ></sl-input>
            <sl-input
              required
              //todo: add prop for label
              label={"bankProvinceState"}
              name="/bankProvinceState"
              id="bankProvinceState"
              type="text"
              {...(errors?.bankProvinceState && {
                class: "error-input",
                helpText: this.getValidationErrorMessage(
                  props.text.bankProvinceStateLabel
                ),
              })}
            ></sl-input>
            <sl-input
              required
              //todo: add prop for label
              label={"bankPostalCode"}
              name="/bankPostalCode"
              id="bankPostalCode"
              type="text"
              {...(errors?.bankPostalCode && {
                class: "error-input",
                helpText: this.getValidationErrorMessage(
                  props.text.bankPostalCodeLabel
                ),
              })}
            ></sl-input>
          </div>
        ),
      },
      13: {
        input: (
          <sl-input
            required
            label={props.text.branchCodeLabel}
            name="/branchCode"
            id="branchCode"
            type="text"
            {...(errors?.branchCode && {
              class: "error-input",
              helpText: this.getValidationErrorMessage(
                props.text.branchCodeLabel
              ),
            })}
          ></sl-input>
        ),
      },
      14: {
        input: (
          <sl-select
            required
            label={props.text.classificationLabel}
            name="/beneficiaryClassification"
            id="beneficiaryClassification"
            {...(errors?.beneficiaryClassification && {
              class: "error-input",
              helpText: this.getValidationErrorMessage(
                props.text.classificationLabel
              ),
            })}
          >
            <sl-menu-item value="BUSINESS">BUSINESS</sl-menu-item>
            <sl-menu-item value="INDIVIDUAL">INDIVIDUAL</sl-menu-item>
            <sl-menu-item value="FOREIGN">FOREIGN</sl-menu-item>
          </sl-select>
        ),
      },
    };

    const inputFields = getFormInputs({
      bitset: props.demo.bitset || props.states.bitset,
      formMap,
    });

    return (
      <Host>
        {/* demo */}
        {/* <sl-input
          value={props.demo.bitset}
          onInput={(e) => props.demo.setBitset(Number(e.target.value))}
        /> */}
        {props.demo.showInputs && (
          <sl-select
            name="/currency"
            value={props.demo.currency}
            onSl-select={(e) => {
              props.demo.setCurrency(e.detail?.item?.value);
              props.callbacks.setBankCountry("");
            }}
          >
            <sl-menu-item value="USD">USD</sl-menu-item>
            <sl-menu-item value="GBP">GBP</sl-menu-item>
            <sl-menu-item value="AUD">AUD</sl-menu-item>
            <sl-menu-item value="CAD">CAD</sl-menu-item>
            <sl-menu-item value="EUR">EUR</sl-menu-item>
            <sl-menu-item value="JPY">JPY</sl-menu-item>
          </sl-select>
        )}
        {/*  */}
        <BankingInfoFormView
          callbacks={props.callbacks}
          text={props.text}
          states={props.states}
          refs={props.refs}
          slots={{
            formInputsSlot: inputFields?.map(({ input }) => {
              return input;
            }),
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
                {mockPaymentOptions[
                  props.demo.currency || props.states.currency
                ]?.map((paymentOption) => {
                  // @ts-ignore
                  const countryDisplayName = new Intl.DisplayNames(
                    [props.states.intlLocale],
                    { type: "region" }
                  ).of(paymentOption.country);

                  return (
                    <sl-menu-item value={paymentOption?.country}>
                      {countryDisplayName}
                    </sl-menu-item>
                  );
                })}
              </sl-select>
            ),
            paymentMethodSlot: (
              <sl-input
                label={props.text.paymentMethod}
                placeholder={props.states.paymentMethodFeeLabel}
                disabled
              ></sl-input>
            ),
            paymentThresholdSelectSlot: (
              <sl-select
                label={props.text.paymentThresholdSelectLabel}
                name="/balanceThreshold"
                id="balanceThreshold"
                {...(errors?.balanceThreshold && {
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
                label={props.text.paymentDaySelectLabel}
                name="/fixedDay"
                id="fixedDay"
                {...(errors?.fixedDay && {
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
  const defaultChecked = props.demoData?.states?.formState?.checked;
  const defaultCurrency = props.demoData?.demo?.currency;
  const defaultCountry = props.demoData?.states?.bankCountry;

  const [checked, setChecked] = useState<
    "toBankAccount" | "toPaypalAccount" | undefined
  >(defaultChecked);

  const [currency, setCurrency] = useState(defaultCurrency);
  const [bankCountry, setBankCountry] = useState(defaultCountry);

  const currentPaymentOption = mockPaymentOptions[currency]?.find(
    (paymentOption) => {
      if (paymentOption.country === bankCountry) return true;
      return false;
    }
  );

  const bitset =
    currentPaymentOption?.withdrawalId || props.demoData?.demo?.bitset || 0;

  console.log("demo hook", {
    demoData: props.demoData,
    currentPaymentOption,
    currency,
    bankCountry,
    bitset,
  });

  useEffect(() => {
    if (defaultChecked !== checked) setChecked(defaultChecked);
    if (defaultCurrency !== currency) setCurrency(defaultCurrency);
    if (defaultCountry !== bankCountry) setBankCountry(defaultCountry);
  }, [defaultChecked, defaultCurrency, defaultCountry]);

  const feeCap = paypalFeeMap[currency] || "";

  const paymentMethodFeeMap = {
    ACH: "EFT Withdrawal (free)",
    WIRE: `FX Wire (Processing Fee ${currency}${
      currentPaymentOption?.defaultFxFee || 0
    })`,
  };

  const paymentMethodFeeLabel =
    paymentMethodFeeMap[currentPaymentOption?.withdrawalSetting];

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
          checked,
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
            balanceThreshold: false,
            fixedDay: false,
          },
        },
        intlLocale: "en",
        bitset,
        bankCountry,
      },
      demo: {
        showInputs: props.demoData?.showInputs,
        currency,
        setCurrency,
      },
      callbacks: {
        onSubmit: async () => {},
        setBankCountry,
        setChecked,
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
