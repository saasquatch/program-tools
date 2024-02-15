import { useRef, useState } from "@saasquatch/universal-hooks";
import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/data";
import { BankingInfoForm } from "./sqm-banking-info-form";

export function getIndex(binary, idx) {
  return binary.length - idx - 1;
}

export function useBankingInfoForm(props: BankingInfoForm) {
  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);

  const [bitset, setBitset] = useState(42);

  const formRef = useRef<HTMLFormElement>(null);
  const [option, setOption] = useState(null);

  return {
    step: step,
    setStep: setStep,

    text: { ...props, error: {} },

    callbacks: {
      onSubmit: async () => {},
      onChange: setOption,
    },
    states: {
      disabled: false,
      loading: false,
      hideSteps: false,
      formState: {
        checked: "toBankAccount" as "toBankAccount" | "toPaypalAccount",
        errors: {
          general: false,
        },
      },
    },
    refs: {
      formRef,
    },
    demo: {
      bitset,
      setBitset,
    },
  };
}
