import { useDomContext } from "@saasquatch/stencil-hooks";
import {
  TAX_AND_CASH_PAGE_STATE,
  TaxContextType,
} from "../sqm-tax-and-cash/useTaxAndCash";

export function useTaxForm() {
  const formState = useDomContext<TaxContextType>(TAX_AND_CASH_PAGE_STATE);

  console.log({ formState });

  return {
    loading: !formState,
    step: formState?.step,
    setStep: formState?.setStep,
  };
}
