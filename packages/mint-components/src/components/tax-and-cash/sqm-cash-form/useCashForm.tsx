import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/useTaxAndCash";
import { CashForm } from "./sqm-cash-form";

export function useCashForm(props: CashForm) {
  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);

  return {
    step: step,
    setStep: setStep,
    text: { ...props },
  };
}
