import { useLocale } from "@saasquatch/component-boilerplate";
import { useRef, useState } from "@saasquatch/universal-hooks";
import JSONPointer from "jsonpointer";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useParent } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { mockPaymentOptions } from "./mockData";
import { BankingInfoForm } from "./sqm-banking-info-form";
import { BankingInfoFormViewProps } from "./sqm-banking-info-form-view";

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

const ACH_PAYMENT_METHOD = 3;
const WIRE_PAYMENT_METHOD = 5;
const PAYPAL_PAYMENT_METHOD = 7;

export type BankingInfoFormData = {
  bankCountry?: string;
  paypalEmail?: string;
  beneficiaryAccountName?: string;
  bankAccountType?: string;
  bankAccountNumber?: string;
  iban?: string;
  swiftCode?: string;
  routingCode?: string;
  bankName?: string;
  beneficiaryClassification?:
    | "BUSINESS"
    | "INDIVIDUAL"
    | "FOREIGN"
    | "CPF"
    | "CNPJ";
  patronymicName?: string;
  voCode?: string;
  agencyCode?: string;
  bankAddress?: string;
  bankCity?: string;
  bankProvinceState?: string;
  bankPostalCode?: string;
  branchCode?: string;
};

export function getFormInputs({ bitset, formMap }) {
  // Convert bitset to binary representation
  const binary = bitset.toString(2).padStart(Object.keys(formMap).length, "0");

  // Reverse to match order of docs
  // https://docs.google.com/document/d/1db8BnXK4NXN8LcX1U0-GBcnq57X3_XKmFBZijLOIYt4
  const binaryToParse = binary.split("").reverse().join("");

  // return input for each 1 found in binary
  const inputFields = [...binaryToParse].reduce((agg, num, idx) => {
    const number = Number(num);
    const inputFound = formMap[idx];
    if (!number || !inputFound) return agg;
    return [...agg, inputFound];
  }, []);

  return inputFields;
}

export function useBankingInfoForm(
  props: BankingInfoForm
): BankingInfoFormViewProps {
  const locale = useLocale();
  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);

  const { data: userData, refetch } =
    useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);

  /** mock data */
  const [currency, setCurrency] = useState("CAD");
  /** */

  const [bankCountry, setBankCountry] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [_paymentMethodChecked, setPaymentMethodChecked] = useState<
    "toBankAccount" | "toPaypalAccount" | undefined
  >(undefined);
  const [paymentScheduleChecked, setPaymentScheduleChecked] = useState<
    "balanceThreshold" | "fixedDay" | undefined
  >(undefined);

  const onSubmit = async (event: any) => {
    let formData: BankingInfoFormData = {};
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

      // TODO: wire up mutation
      // await upsertBankDetails({bankDetails:formData})

      // setStep("/submitted");
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

  const paymentMethodFeeMap = {
    3: "EFT Withdrawal (free)",
    5: `FX Wire (Processing Fee ${currency}${
      currentPaymentOption?.defaultFxFee || 0
    })`,
  };
  const paymentMethodFeeLabel =
    paymentMethodFeeMap[currentPaymentOption?.paymentMethod];

  console.log({ userData });

  const intlLocale = locale?.replace("_", "-") || "en";

  const paymentOptions = mockPaymentOptions[currency];
  paymentOptions;

  const availableCountries = new Set(
    paymentOptions.map((option) => option.country)
  );

  const countries = Array.from(availableCountries)?.map((country) => {
    // @ts-ignore DisplayNames not in Intl type
    const name = new Intl.DisplayNames([intlLocale], {
      type: "region",
    }).of(country);

    return {
      code: country,
      name,
    };
  });

  const hasPayPal = !!paymentOptions.find(
    (option) => option.paymentMethod === PAYPAL_PAYMENT_METHOD
  );

  const paymentMethodChecked = !hasPayPal
    ? "toBankAccount"
    : _paymentMethodChecked;

  return {
    text: {
      ...props,
      error: {
        generalTitle: props.generalErrorTitle,
        generalDescription: props.generalErrorDescription,
      },
    },
    callbacks: {
      onSubmit,
      setBankCountry,
      setPaymentMethodChecked,
      setPaymentScheduleChecked,
      setCurrency,
    },
    states: {
      locale,
      intlLocale,
      isPartner: !!userData?.user?.impactConnection,
      feeCap,
      paymentMethodFeeLabel,
      disabled: loading,
      loading,
      hideSteps: false,
      hideBanking: paymentMethodChecked !== "toBankAccount",
      hidePayPal: paymentMethodChecked !== "toPaypalAccount",
      formState: {
        paymentMethodChecked,
        paymentScheduleChecked,
        errors,
      },
      bitset: currentPaymentOption?.withdrawalId || 0,
      bankCountry,
      currency: userData?.user?.impactConnection?.publisher?.currency,
      showInputs: true,
      countries,
      hasPayPal,
    },
    refs: {
      formRef,
    },
  };
}
