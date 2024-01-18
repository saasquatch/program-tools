import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/useTaxAndCash";

export function useTaxForm() {
  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);

  return {
    step: step,
    setStep: setStep,
  };
}
