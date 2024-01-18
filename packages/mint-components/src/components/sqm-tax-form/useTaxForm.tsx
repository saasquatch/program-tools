import { useDomContext } from "@saasquatch/stencil-hooks";
import { StateType, getContextName } from "../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/useTaxAndCash";

export function useTaxForm() {
  console.log({
    stuff: useDomContext<StateType<string>>(
      getContextName(TAX_CONTEXT_NAMESPACE)
    ),
  });

  const state = useDomContext<StateType<string>>(
    getContextName(TAX_CONTEXT_NAMESPACE)
  );

  if (!state)
    return {
      loading: true,
      step: "",
      setStep: () => {},
    };

  const [step, setStep] = state;

  return {
    loading: !state,
    step: step,
    setStep: setStep,
  };
}
