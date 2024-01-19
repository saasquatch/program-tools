import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/useTaxAndCash";
import { DocusignForm } from "./sqm-docusign-form";

export function useDocusignForm(props: DocusignForm) {
  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);

  return {
    step: step,
    setStep: setStep,
    text: { ...props },
  };
}
