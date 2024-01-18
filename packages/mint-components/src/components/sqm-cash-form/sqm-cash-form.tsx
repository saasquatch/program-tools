import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { UserNameViewProps } from "../sqm-tax-and-cash/sqm-tax-and-cash-view";
import { LoadingSkeleton } from "../../tables/TableSlots";
import { useTaxForm } from "../sqm-tax-form/useTaxForm";

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
    const props = useTaxForm();

    console.log({ props });
    if (props.loading) return <LoadingSkeleton />;
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
