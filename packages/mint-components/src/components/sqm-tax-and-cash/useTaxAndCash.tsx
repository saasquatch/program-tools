import { useHost } from "@saasquatch/component-boilerplate";
import { useDomContextState } from "@saasquatch/dom-context-hooks";

export const TAX_AND_CASH_PAGE_VALUE = "sq:tax-and-cash-value";

export const TAX_AND_CASH_PAGE_STATE = "sq:tax-and-cash-state";

export type TaxContextType = {
  step: string;
  setStep: (value: string) => void;
};
export function useTaxAndCash() {
  const host = useHost();

  const [step, setStep] = useDomContextState<string>(
    host,
    TAX_AND_CASH_PAGE_VALUE,
    "/1"
  );

  useDomContextState<TaxContextType>(host, TAX_AND_CASH_PAGE_STATE, {
    step,
    setStep,
  });

  console.log({ step });

  return {
    step,
    setStep,
  };
}
