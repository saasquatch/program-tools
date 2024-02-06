import { isDemo, useHost } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, State, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { LoadingSkeleton } from "../../../tables/TableSlots";
import {
  getContextValueName,
  useParentState,
} from "../../../utils/useParentState";
import { UserNameViewProps } from "./sqm-tax-and-cash-view";
import { useTaxAndCash } from "./useTaxAndCash";
import { TAX_CONTEXT_NAMESPACE } from "./data";

/**
 * @uiName Tax And Cash
 * @exampleGroup Tax and Cash Components
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
    const inDemoMode = isDemo();
    const props = inDemoMode ? useTaxAndCashDemo(this) : useTaxAndCash();

    if (props.loading) return <LoadingSkeleton />;

    return (
      <Host>
        {inDemoMode && (
          <div>
            <button onClick={() => props.setStep(getPrevStep(props.step))}>
              Preview preview step
            </button>{" "}
            <button onClick={() => props.setStep(getNextStep(props.step))}>
              Preview next step
            </button>
          </div>
        )}
        <sqm-context-router contextName={props.namespace}>
          <slot />
        </sqm-context-router>
      </Host>
    );
  }
}

function getNextStep(step: string) {
  if (step === "/1") return "/2";
  if (step === "/2") return "/3/W9";
  if (step.includes("/3")) return "/4";
  if (step === "/4") return "/submitted";
  if (step === "/loading") return "/1";
  return "/loading";
}

function getPrevStep(step: string) {
  if (step === "/1") return "/1";
  if (step === "/2") return "/1";
  if (step.includes("/3")) return "/2";
  if (step === "/4") return "/3/W9";
  if (step === "/submitted") return "/4";
  if (step === "/loading") return "/1";
  return "/loading";
}

function useTaxAndCashDemo(props: TaxAndCash) {
  const host = useHost();
  const [step, setStep] = useParentState<string>({
    namespace: TAX_CONTEXT_NAMESPACE,
    initialValue: "/1",
  });
  return deepmerge(
    {
      namespace: getContextValueName(TAX_CONTEXT_NAMESPACE),
      step,
      setStep,
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
