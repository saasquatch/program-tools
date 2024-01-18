import { useHost } from "@saasquatch/component-boilerplate";
import {
  getContextValueName,
  useParentState,
} from "../../../utils/useParentState";

export const TAX_CONTEXT_NAMESPACE = "sq:tax-and-cash";

export type TaxContextType = {
  step: string;
  setStep: (value: string) => void;
};
export function useTaxAndCash() {
  const host = useHost();

  const [step, setStep] = useParentState<string>({
    host,
    namespace: TAX_CONTEXT_NAMESPACE,
    initialValue: "/1",
  });

  console.log({ step });

  return {
    step,
    setStep,
    namespace: getContextValueName(TAX_CONTEXT_NAMESPACE),
  };
}
