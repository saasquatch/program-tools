import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { isDemo } from "@saasquatch/component-boilerplate";
import { Component, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { useBankingInfoForm } from "./useBankingInfoForm";
import { UserNameViewProps } from "../../sqm-user-name/sqm-user-name-view";
import { BankingInfoFormView } from "./sqm-banking-info-form-view";

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
    const props = useDemoBankingInfoForm(this);
    console.log({ props });

    return (
      <Host>
        <BankingInfoFormView
          callbacks={props.callbacks}
          text={props.text}
          states={props.states}
          refs={props.refs}
          slots={{
            formInputsSlot: <div>FORM INPUTS</div>,
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
