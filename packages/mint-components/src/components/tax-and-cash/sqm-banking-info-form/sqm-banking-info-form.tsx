import { isDemo } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, State, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { BankingInfoFormView } from "./sqm-banking-info-form-view";
import { getFormInputs, useBankingInfoForm } from "./useBankingInfoForm";
import { mockPaymentOptions } from "./mockData";

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
   * Heading text for the payment method section
   * @uiName Payment method heading text
   */
  @Prop() paymentMethod: string = "Payment Method";

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

  // This will come from form state eventually
  errors = {};

  render() {
    const props = isDemo()
      ? useDemoBankingInfoForm(this)
      : useBankingInfoForm(getProps(this));

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
            label={props.text.beneficiaryAccountNameLabel}
            name="/beneficiaryAccountName"
            id="beneficiaryAccountName"
            type="text"
          ></sl-input>
        ),
      },
      1: {
        input: (
          <sl-input
            label={props.text.bankAccountTypeLabel}
            name="/bankAccountType"
            id="bankAccountType"
            type="text"
          ></sl-input>
        ),
      },
      2: {
        input: (
          <sl-input
            label={props.text.bankAccountNumberLabel}
            name="/bankAccountNumber"
            id="bankAccountNumber"
            type="text"
          ></sl-input>
        ),
      },
      3: {
        input: (
          <sl-input
            label={props.text.ibanLabel}
            name="/iban"
            id="iban"
            type="text"
          ></sl-input>
        ),
      },

      4: {
        input: (
          <sl-input
            label={props.text.swiftCodeLabel}
            name="/swiftCode"
            id="swiftCode"
            type="text"
          ></sl-input>
        ),
      },
      5: {
        input: (
          <sl-input
            label={
              routingCodeLabels[props.states.bankCountry] ||
              props.text.routingCodeLabel
            }
            name="/routingCode"
            id="routingCode"
            type="text"
          ></sl-input>
        ),
      },
      6: {
        input: (
          <sl-input
            label={props.text.bankNameLabel}
            name="/bankName"
            id="bankName"
            type="text"
          ></sl-input>
        ),
      },
      7: {
        input: (
          <sl-select
            label={props.text.classificationLabel}
            name="/beneficiaryClassification"
            id="beneficiaryClassification"
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
            label={props.text.classificationCPFLabel}
            name="/beneficiaryClassification"
            id="beneficiaryClassification"
          >
            <sl-menu-item value="CPF">CPF</sl-menu-item>
            <sl-menu-item value="CNPJ">CNPJ</sl-menu-item>
          </sl-select>
        ),
      },
      9: {
        input: (
          <sl-input
            label={props.text.patronymicNameLabel}
            name="/patronymicName"
            id="patronymicName"
            type="text"
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
          ></sl-input>
        ),
      },
      11: {
        input: (
          <sl-input
            label={props.text.agencyCodeLabel}
            name="/agencyCode"
            id="agencyCode"
            type="text"
          ></sl-input>
        ),
      },
      12: {
        input: (
          <div>
            <sl-input
              label={"bankAddress"}
              name="/bankAddress"
              id="bankAddress"
              type="text"
            ></sl-input>
            <sl-input
              label={"bankCity"}
              name="/bankCity"
              id="bankCity"
              type="text"
            ></sl-input>
            <sl-input
              label={"bankProvinceState"}
              name="/bankProvinceState"
              id="bankProvinceState"
              type="text"
            ></sl-input>
            <sl-input
              label={"bankPostalCode"}
              name="/bankPostalCode"
              id="bankPostalCode"
              type="text"
            ></sl-input>
          </div>
        ),
      },
      13: {
        input: (
          <sl-input
            label={props.text.branchCodeLabel}
            name="/branchCode"
            id="branchCode"
            type="text"
          ></sl-input>
        ),
      },
      14: {
        error: false,
        input: (
          <sl-select
            label={props.text.classificationLabel}
            name="/beneficiaryClassification"
            id="beneficiaryClassification"
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
        />
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
        </sl-select> */}
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
              <label htmlFor="/bankCountry">
                Bank Location Country
                <sl-select
                  name="/bankCountry"
                  id="bankCountry"
                  value={props.states.bankCountry}
                  onSl-select={(e) =>
                    props.callbacks.setBankCountry(e.detail?.item?.value)
                  }
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
              </label>
            ),
            paymentMethodSlot: (
              <sl-input
                label={props.text.paymentMethod}
                placeholder="EFT Withdrawal"
                disabled
              ></sl-input>
            ),
          }}
        />
      </Host>
    );
  }
}

function useDemoBankingInfoForm(props: BankingInfoForm) {
  const [option, setOption] = useState(undefined);

  return deepmerge(
    {
      states: {
        isPartner: false,
        disabled: false,
        loading: false,
        hideSteps: false,
        feeCap: "USD20.00",
        formState: {
          checked: option,
          errors: {
            general: false,
          },
        },
        intlLocale: "en",
      },
      demo: {
        bitset: 39,
      },
      callbacks: {
        onSubmit: async () => {},
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
