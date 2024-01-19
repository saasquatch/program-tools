import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { UserNameViewProps } from "./sqm-tax-and-cash-view";
import { useTaxAndCash } from "./useTaxAndCash";
import { DemoData } from "../../../global/demo";

/**
 * @uiName Tax And Cash
 * @exampleGroup Common Components
 * @example User Name Display - <sqm-user-name fallback="Anonymous User" loading-text="..."></sqm-user-name>
 */
@Component({
  tag: "sqm-tax-and-cash",
  shadow: false,
})
export class TaxAndCash {
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
    // const props = isDemo() ? useUserNameDemo(this) : useUserName();
    const props = useTaxAndCash();

    console.log({ props, step: props.step });
    return (
      <div>
        <sqm-context-router contextName={props.namespace}>
          <slot />
        </sqm-context-router>
      </div>
    );
  }
}

function useTaxAndCashDemo(props: TaxAndCash): UserNameViewProps {
  return deepmerge({}, props.demoData || {}, { arrayMerge: (_, a) => a });
}
