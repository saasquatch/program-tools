import { useRef, useState } from "@saasquatch/universal-hooks";
import { useParent } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { BankingInfoForm } from "./sqm-banking-info-form";
import JSONPointer from "jsonpointer";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useLocale } from "@saasquatch/component-boilerplate";
import { mockPaymentOptions } from "./mockData";

export const paypalFeeMap = {
  USD: "USD20.00",
  GBP: "GBP30.00",
  EUR: "EUR35.00",
  AUD: "AUD60.00",
  CAD: "CAD50.00",
  NZD: "NZD60.00",
  HKD: "HKD320.00",
  DKK: "DKK250.00",
  ILS: "ILS160.00",
  MXN: "MXN600.00",
  RUB: "RUB1200.00",
  PHP: "PHP2000.00",
  JPY: "JPY2000.00",
};

export function getFormInputs({ props, formMap }) {
  const binary = (props.demo.bitset || props.states.bitset)
    .toString(2)
    .padStart(Object.keys(formMap).length, "0");

  const binaryToParse = binary.split("").reverse().join("");

  const inputFields = [...binaryToParse].reduce((agg, num, idx) => {
    const number = Number(num);
    const inputFound = formMap[idx];
    if (!number || !inputFound) return agg;
    return [...agg, inputFound];
  }, []);

  return inputFields;
}

export function useBankingInfoForm(props: BankingInfoForm) {
  const locale = useLocale();
  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);

  const { data: userData, refetch } =
    useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);

  /** mock data */
  const [bitset, setBitset] = useState(0);
  const [currency, setCurrency] = useState("CAD");
  /** */

  const [bankCountry, setBankCountry] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const [option, setOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const onSubmit = async (event: any) => {
    let formData: Record<string, string> = {};
    let validationErrors: Record<string, string> = {};

    const controls = event.target.getFormControls();

    controls.forEach((control) => {
      if (!control.name || !control.id) return;

      const key = control.name;
      const value = control.value;
      JSONPointer.set(formData, key, value);

      if (control.required && !value) {
        JSONPointer.set(validationErrors, key, true);
      }
    });

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) {
      return;
    }

    setLoading(true);
    try {
      console.log({ formData });

      // const result = await connectImpactPartner({
      //   vars: {
      //     userId: user.id,
      //     accountId: user.accountId,
      //     firstName: userForm.firstName,
      //     lastName: userForm.lastName,
      //     country: userForm.countryCode, // TODO: May need formatting
      //     currency: userForm.currency,
      //     ...fields,
      //   },
      // });
      // if (!result || (result as Error)?.message) throw new Error();

      // setStep("/3");
    } catch (e) {
      setErrors({ general: true });
    } finally {
      setLoading(false);
    }
  };

  const feeCap = paypalFeeMap[currency] || "";

  const currentPaymentOption = mockPaymentOptions[currency]?.find(
    (paymentOption) => {
      if (paymentOption.country === bankCountry) return true;
      return false;
    }
  );

  return {
    step: step,
    setStep: setStep,

    text: { ...props, error: {} },

    callbacks: {
      onSubmit,
      onChange: setOption,
      setBankCountry,
    },
    states: {
      locale,
      intlLocale: locale?.replace("_", "-") || "en",
      isPartner: !!userData?.user?.impactPartner,
      feeCap,
      disabled: false,
      loading: false,
      hideSteps: false,
      formState: {
        checked: "toBankAccount" as "toBankAccount" | "toPaypalAccount",
        errors,
      },
      bitset: currentPaymentOption?.withdrawalId || 0,
      bankCountry,
    },
    refs: {
      formRef,
    },
    demo: {
      bitset,
      setBitset,
      currency,
      setCurrency,
    },
  };
}
