import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/data";
import { BankingInfoForm } from "./sqm-banking-info-form";

export function useBankingInfoForm(props: BankingInfoForm) {
  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);

  return {
    step: step,
    setStep: setStep,
    text: { ...props },
  };
}
