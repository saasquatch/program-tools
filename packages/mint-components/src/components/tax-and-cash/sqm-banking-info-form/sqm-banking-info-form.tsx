import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, State, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { BankingInfoFormView } from "./sqm-banking-info-form-view";
import { getIndex, useBankingInfoForm } from "./useBankingInfoForm";

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
  @Prop() taxAndPayouts: string = "Tax and Payouts";
  @Prop() taxAndPayoutsDescription: string =
    "Submit your tax documents and add your banking information to receive your rewards.";
  @Prop() directlyToBankAccount: string = "Directly to my bank account";
  @Prop() toPaypalAccount: string = "To my PayPal account";
  @Prop() paymentMethod: string = "Payment Method";
  @Prop() submitButton: string = "Save";

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
    // const props = isDemo()
    //   ? useDemoBankingInfoForm(this)
    //   : useBankingInfoForm(getProps(this));

    const props = useBankingInfoForm(getProps(this));

    console.log({ props });

    const formMap = {
      0: {
        label: "BENEFICIARY_ACCOUNT_NAME",
        input: <sl-input name="/beneficiaryAccountName" type="text"></sl-input>,
      },
      1: {
        label: "BANK_ACCOUNT_TYPE",
        input: <sl-input name="/bankAccountType" type="text"></sl-input>,
      },
      2: {
        label: "BANK_ACCOUNT_NUMBER",
        input: <sl-input name="/bankAccountNumber" type="text"></sl-input>,
      },
      3: {
        label: "IBAN",
        input: <sl-input name="/beneficiaryAccountName" type="text"></sl-input>,
      },

      4: {
        label: "SWIFT_CODE",
        input: <sl-input name="/swiftCode" type="text"></sl-input>,
      },
      5: {
        label: "ROUTING_CODE",
        input: <sl-input name="/routingCode" type="text"></sl-input>,
      },
      6: {
        label: "BANK_NAME",
        input: <sl-input name="/bankName" type="text"></sl-input>,
      },
      7: {
        label: "CLASSIFICATION_ENTITY",
        input: (
          <sl-input name="/beneficiaryClassification" type="text"></sl-input>
        ),
      },
      8: {
        label: "CLASSIFICATION_CPF",
        input: (
          <sl-input name="/beneficiaryClassification" type="text"></sl-input>
        ),
      },
      9: {
        label: "PATRONYMICNAME",
        input: <sl-input name="/patronymicName" type="text"></sl-input>,
      },
      10: {
        label: "VOCODE",
        input: <sl-input name="/voCode" type="text"></sl-input>,
      },
      11: {
        label: "AGENCYCODE",
        input: <sl-input name="/agencyCode" type="text"></sl-input>,
      },
      12: {
        label: "BANKADDRESS",
        input: <sl-input name="/bankAddress" type="text"></sl-input>,
      },
      13: {
        label: "BRANCHCODE",
        input: <sl-input name="/branchCode" type="text"></sl-input>,
      },
      14: {
        label: "CLASSIFICATION",
        input: (
          <sl-input name="/beneficiaryClassification" type="text"></sl-input>
        ),
      },
    };

    const binary = props.demo.bitset
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
        <sl-input
          value={props.demo.bitset}
          onInput={(e) => props.demo.setBitset(Number(e.target.value))}
        />
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
