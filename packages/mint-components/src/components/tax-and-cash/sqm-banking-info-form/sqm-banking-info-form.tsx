import { isDemo } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, State, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { BankingInfoFormView } from "./sqm-banking-info-form-view";
import { useBankingInfoForm } from "./useBankingInfoForm";
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

  @Prop() classificationCPFLabel: string = "Classification CPF";
  @Prop() patronymicNameLabel: string = "Patronymic Name";
  @Prop() voCodeLabel: string = "Vo Code";
  @Prop() agencyCodeLabel: string = "Agency Code";
  @Prop() branchCodeLabel: string = "Branch Code";
  @Prop() classificationLabel: string = "Classification";

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

    // const props = useBankingInfoForm(getProps(this));

    console.log("PROPS ARE", { props }, props.text.beneficiaryAccountNameLabel);

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
        label: props.text.beneficiaryAccountNameLabel,
        input: (
          <sl-input
            name="/beneficiaryAccountName"
            id="beneficiaryAccountName"
            type="text"
          ></sl-input>
        ),
      },
      1: {
        label: props.text.bankAccountTypeLabel,
        input: (
          <sl-input
            name="/bankAccountType"
            id="bankAccountType"
            type="text"
          ></sl-input>
        ),
      },
      2: {
        label: props.text.bankAccountNumberLabel,
        input: (
          <sl-input
            name="/bankAccountNumber"
            id="bankAccountNumber"
            type="text"
          ></sl-input>
        ),
      },
      3: {
        label: props.text.ibanLabel,
        input: (
          <sl-input
            name="/beneficiaryAccountName"
            id="beneficiaryAccountName"
            type="text"
          ></sl-input>
        ),
      },

      4: {
        label: props.text.swiftCodeLabel,
        input: (
          <sl-input name="/swiftCode" id="swiftCode" type="text"></sl-input>
        ),
      },
      5: {
        label: props.text.routingCodeLabel,
        input: (
          <sl-input name="/routingCode" id="routingCode" type="text"></sl-input>
        ),
      },
      6: {
        label: props.text.bankNameLabel,
        input: <sl-input name="/bankName" id="bankName" type="text"></sl-input>,
      },
      7: {
        label: props.text.classificationLabel,
        input: (
          <sl-select
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
        label: props.text.classificationCPFLabel,
        input: (
          <sl-select
            name="/beneficiaryClassification"
            id="beneficiaryClassification"
          >
            <sl-menu-item value="CPF">CPF</sl-menu-item>
            <sl-menu-item value="CNPJ">CNPJ</sl-menu-item>
          </sl-select>
        ),
      },
      9: {
        label: props.text.patronymicNameLabel,
        input: (
          <sl-input
            name="/patronymicName"
            id="patronymicName"
            type="text"
          ></sl-input>
        ),
      },
      10: {
        label: props.text.voCodeLabel,
        input: <sl-input name="/voCode" id="voCode" type="text"></sl-input>,
      },
      11: {
        label: props.text.agencyCodeLabel,
        input: (
          <sl-input name="/agencyCode" id="agencyCode" type="text"></sl-input>
        ),
      },
      12: {
        label: "",
        input: (
          <div>
            <label htmlFor="/bankAddress">bankAddress</label>
            <sl-input
              name="/bankAddress"
              id="bankAddress"
              type="text"
            ></sl-input>
            <label htmlFor="/bankCity">bankCity</label>
            <sl-input name="/bankCity" id="bankCity" type="text"></sl-input>
            <label htmlFor="/bankProvinceState">bankProvinceState</label>
            <sl-input
              name="/bankProvinceState"
              id="bankProvinceState"
              type="text"
            ></sl-input>
            <label htmlFor="/bankPostalCode">bankPostalCode</label>
            <sl-input
              name="/bankPostalCode"
              id="bankPostalCode"
              type="text"
            ></sl-input>
          </div>
        ),
      },
      13: {
        label: props.text.branchCodeLabel,
        input: (
          <sl-input name="/branchCode" id="branchCode" type="text"></sl-input>
        ),
      },
      14: {
        label: props.text.classificationLabel,
        input: (
          <sl-select
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

    const binary = (props.demo.bitset || props.states.bitset)
      .toString(2)
      .padStart(Object.keys(formMap).length, "0");

    const binaryToParse = binary.split("").reverse().join("");

    const inputFields = [...binaryToParse].reduce((agg, num, idx) => {
      const number = Number(num);
      const inputFound = formMap[idx];
      if (!number || !inputFound) return agg;
      return [...agg, inputFound];
    }, []);

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
            formInputsSlot: inputFields?.map(({ input, label }) => {
              return (
                <label>
                  {label}
                  {input}
                </label>
              );
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
                  {mockPaymentOptions[props.demo.currency]?.map(
                    (paymentOption) => {
                      // @ts-ignore
                      const countryDisplayName = new Intl.DisplayNames(
                        [props.states.locale?.replaceAll("_", "-") || "en"],
                        { type: "region" }
                      ).of(paymentOption.country);

                      console.log({ paymentOption, countryDisplayName });
                      return (
                        <sl-menu-item value={paymentOption?.country}>
                          {countryDisplayName}
                        </sl-menu-item>
                      );
                    }
                  )}
                </sl-select>
              </label>
            ),
            paymentMethodSlot: (
              <label>
                Payment Method <span>EFT Withdrawal</span>
              </label>
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
        disabled: false,
        loading: false,
        hideSteps: false,
        formState: {
          checked: option,
          errors: {
            general: false,
          },
        },
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
