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

  @Prop() formStep: string = "Step 4 of 4";
  @Prop() taxAndPayouts: string = "Payouts";
  @Prop() taxAndPayoutsDescription: string =
    "Submit your tax documents and add your banking information to receive your rewards.";
  @Prop() directlyToBankAccount: string = "Directly to my bank account";
  @Prop() toPaypalAccount: string =
    "PayPal (2% processing fee capped to {feeCap})";
  @Prop() paymentMethod: string = "Payment Method";
  @Prop() payPalInputLabel: string = "PayPal Email";
  @Prop() submitButton: string = "Save";
  @Prop() beneficiaryAccountNameLabel: string = "Beneficiary Account Name";
  @Prop() bankAccountTypeLabel: string = "Bank Account Type";
  @Prop() bankAccountNumberLabel: string = "Bank Account Number";
  @Prop() ibanLabel: string = "Iban";
  @Prop() swiftCodeLabel: string = "Swift Code";
  @Prop() routingCodeLabel: string = "Routing Code";
  @Prop() bankNameLabel: string = "Bank Name";
  @Prop() classificationEntityLabel: string = "Classification Entity";
  @Prop() businessSelectItemLabel: string = "Business";
  @Prop() individualSelectItemLabel: string = "Individual";
  @Prop() foreignSelectItemLabel: string = "Foreign";
  @Prop() isPartnerAlertHeader: string =
    "An account with this email already exists with our referral program provider, impact.com";
  @Prop() isPartnerAlertDescription: string =
    "If you don’t recognize this referral program provider or believe this is a mistake, please contact Support or sign up for this referral program with a different email.";
  @Prop() classificationCPFLabel: string = "Classification CPF";
  @Prop() patronymicNameLabel: string = "Patronymic Name";
  @Prop() voCodeLabel: string = "Vo Code";
  @Prop() agencyCodeLabel: string = "Agency Code";
  @Prop() branchCodeLabel: string = "Branch Code";
  @Prop() classificationLabel: string = "Classification";
  // @Prop() generalErrorTitle: string =
  //   "There was a problem submitting your information";
  // @Prop() generalErrorDescription: string =
  //   "Please review your information and try again. If this problem continues, contact Support.";

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
      error: {},
    };
  }

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

    const inputFields = getFormInputs({ props, formMap });

    return (
      <Host>
        {/* demo */}
        <sl-input
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
        </sl-select>
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
              <div>
                <label>
                  Payment Method <span>EFT Withdrawal</span>
                </label>
              </div>
            ),
          }}
        />
      </Host>
    );
  }
}

function useDemoBankingInfoForm(props: BankingInfoForm) {
  const [option, setOption] = useState(null);

  return deepmerge(
    {
      states: {
        isPartner: false,
        disabled: false,
        loading: false,
        hideSteps: false,
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
        onChange: setOption,
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
