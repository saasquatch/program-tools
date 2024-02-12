import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { useCashForm } from "./useCashForm";
import { UserNameViewProps } from "../../sqm-user-name/sqm-user-name-view";

/**
 * @uiName Tax And Cash
 * @exampleGroup Common Components
 * @example User Name Display - <sqm-user-name fallback="Anonymous User" loading-text="..."></sqm-user-name>
 */
@Component({
  tag: "sqm-cash-form",
  shadow: false,
})
export class CashForm {
  @State() ignored = true;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UserNameViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const props = useCashForm(getProps(this));

    console.log({ props });

    return (
      <Host>
        Step 3<sl-button onClick={() => props.setStep("/2")}>back</sl-button>
        <sl-button onClick={() => props.setStep("/4")}>continue</sl-button>
      </Host>
    );
  }
}

function useTaxAndCashDemo(props: CashForm) {
  return deepmerge({}, props.demoData || {}, { arrayMerge: (_, a) => a });
}
