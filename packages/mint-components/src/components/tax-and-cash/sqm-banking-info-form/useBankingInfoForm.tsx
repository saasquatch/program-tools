import {
  useHost,
  useLocale,
  useMutation,
  useParent,
  useParentQueryValue,
  useParentValue,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useRef, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import JSONPointer, { set } from "jsonpointer";
import { intl } from "../../../global/global";
import { VERIFICATION_EVENT_KEY } from "../../sqm-widget-verification/keys";
import {
  FINANCE_NETWORK_SETTINGS_NAMESPACE,
  FinanceNetworkSetting,
  FinanceNetworkSettingsQuery,
  SORTED_COUNTRIES_NAMESPACE,
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  TaxCountry,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../data";
import { TAX_FORM_UPDATED_EVENT_KEY } from "../eventKeys";
import { BankingInfoForm } from "./sqm-banking-info-form";
import { BankingInfoFormViewProps } from "./sqm-banking-info-form-view";

// Hardcoded in Impact backend
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
  // Fields that are auto-filled
  bankCountry?: string;
  bankAccountNumber?: string;
  paypalEmailAddress?: string;
  paymentMethod?: string;
  paymentThreshold?: string;
  paymentSchedulingType?: "FIXED_DAY" | "BALANCE_THRESHOLD";
  paymentDay?: string;

  // Fields that aren't...
  beneficiaryAccountName?: string;
  beneficiaryClassification?:
    | "BUSINESS"
    | "INDIVIDUAL"
    | "FOREIGN"
    | "CPF"
    | "CNPJ";
  beneficiaryAlternativeName?: string;
  beneficiaryTaxPayerId?: string;
  bankAccountType?: "CHECKING" | "SAVINGS" | "NOT_SET";
  swiftCode?: string;
  routingCode?: string;
  voCode?: string;
  agencyCode?: string;
  bankAddress?: string;
  bankPostalCode?: string;
  bankCity?: string;
  bankState?: string;
  branchCode?: string;
  // TODO These fields aren't settable in the mutation
  bankName?: string;
  patronymicName?: string;
};

export function getFormInputs({ bitset, formMap }) {
  // Convert bitset to binary representation
  const binary = bitset.toString(2).padStart(Object.keys(formMap).length, "0");

  // Reverse to match order of docs
  // https://docs.google.com/document/d/1db8BnXK4NXN8LcX1U0-GBcnq57X3_XKmFBZijLOIYt4
  const inputFields = [...binary].reverse().reduce((agg, num, idx) => {
    if (!Number(num) || !formMap[idx]) return agg;
    return [...agg, formMap[idx]];
  }, []);

  return inputFields;
}

type SetImpactPublisherWithdrawalSettingsResult = {
  setImpactPublisherWithdrawalSettings: {
    success: boolean;
    validationErrors: { field: string; message: string }[];
  };
};
type SetImpactPublisherWithdrawalSettingsInput = {
  user: {
    id: string;
    accountId: string;
  };
  paymentMethod: "PAYPAL" | "BANKING_TRANSFER";
  paymentSchedulingType?: "BALANCE_THRESHOLD" | "FIXED_DAY";
  paymentThreshold?: string;
  paymentDay?: string;
} & BankingInfoFormData;

type UpdateImpactPublisherWithdrawalSettingsInput =
  SetImpactPublisherWithdrawalSettingsInput & { accessKey: string };
type UpdateImpactPublisherWithdrawalSettingsResult = {
  updateImpactPublisherWithdrawalSettings: {
    success: boolean;
    validationErrors: { field: string; message: string }[];
  };
};

const SAVE_WITHDRAWAL_SETTINGS = gql`
  mutation setImpactPublisherWithdrawalSettings(
    $setImpactPublisherWithdrawalSettingsInput: SetImpactPublisherWithdrawalSettingsInput!
  ) {
    setImpactPublisherWithdrawalSettings(
      setImpactPublisherWithdrawalSettingsInput: $setImpactPublisherWithdrawalSettingsInput
    ) {
      success
      validationErrors {
        field
        message
      }
    }
  }
`;

const UPDATE_WITHDRAWAL_SETTINGS = gql`
  mutation updateImpactPublisherWithdrawalSettings(
    $updateImpactPublisherWithdrawalSettingsInput: UpdateImpactPublisherWithdrawalSettingsInput!
  ) {
    updateImpactPublisherWithdrawalSettings(
      updateImpactPublisherWithdrawalSettingsInput: $updateImpactPublisherWithdrawalSettingsInput
    ) {
      success
      validationErrors {
        field
        message
      }
    }
  }
`;

function getPaymentMethod(paymentOption: FinanceNetworkSetting | undefined) {
  if (
    paymentOption.defaultFinancePaymentMethodId === 3 ||
    paymentOption.defaultFinancePaymentMethodId === 5
  )
    return "BANK_TRANSFER";

  if (paymentOption.defaultFinancePaymentMethodId === 7) return "PAYPAL";
  return "";
}

function parseImpactThreshold(threshold: string) {
  // Impact returns a "10.00" decimal string for threshold
  const parsed = Number.parseInt(threshold);
  if (isNaN(parsed)) return undefined;

  return parsed.toString();
}

export function useBankingInfoForm(
  props: BankingInfoForm
): BankingInfoFormViewProps {
  const host = useHost();
  const locale = useLocale();
  const user = useUserIdentity();

  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);
  const context = useParentValue<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);
  const countries = useParentValue<TaxCountry[]>(SORTED_COUNTRIES_NAMESPACE);

  const formRef = useRef<HTMLFormElement>(null);

  const {
    data: paymentOptionsData,
    loading: paymentOptionsLoading,
    errors: paymentOptionsError,
  } = useParentQueryValue<FinanceNetworkSettingsQuery>(
    FINANCE_NETWORK_SETTINGS_NAMESPACE
  );
  const {
    data: userData,
    refetch,
    errors: userError,
  } = useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);
  const [saveWithdrawalSettings] =
    useMutation<SetImpactPublisherWithdrawalSettingsResult>(
      SAVE_WITHDRAWAL_SETTINGS
    );
  const [updateWithdrawalSettings] =
    useMutation<UpdateImpactPublisherWithdrawalSettingsResult>(
      UPDATE_WITHDRAWAL_SETTINGS
    );

  const [showVerification, setShowVerification] = useState(false);
  const [currentFormData, setCurrentFormData] = useState(null);
  const [formState, setFormState] = useState<BankingInfoFormData>({});
  const [currentPaymentOption, setCurrentPaymentOption] =
    useState<null | FinanceNetworkSetting>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [_paymentMethodChecked, _setPaymentMethodChecked] = useState<
    "toBankAccount" | "toPayPalAccount" | undefined
  >(undefined);
  const [paymentScheduleChecked, setPaymentScheduleChecked] = useState<
    "BALANCE_THRESHOLD" | "FIXED_DAY" | undefined
  >(undefined);
  const [countrySearch, setCountrySearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries || []);
  const [showModal, setShowModal] = useState(false);

  const currency = userData?.user?.impactConnection?.publisher?.currency || "";
  const isPartner =
    !!userData?.user?.impactConnection?.publisher?.withdrawalSettings;

  const feeCap = paypalFeeMap[currency] || "";

  const paymentOptions = paymentOptionsData?.impactFinanceNetworkSettings?.data;

  const paymentMethodFeeMap = {
    [ACH_PAYMENT_METHOD]: props.eftWithdrawalLabel,
    [WIRE_PAYMENT_METHOD]: intl.formatMessage(
      {
        id: "fxWireText",
        defaultMessage: props.fxWireProcessingFeeLabel,
      },
      {
        currency: currency,
        defaultFxFee: currentPaymentOption?.defaultFxFee || 0,
      }
    ),
  };
  const paymentMethodFeeLabel =
    paymentMethodFeeMap[currentPaymentOption?.defaultFinancePaymentMethodId];

  const hasPayPal = !!paymentOptions?.find(
    (option) => option.defaultFinancePaymentMethodId === PAYPAL_PAYMENT_METHOD
  );

  const paymentMethodChecked = !hasPayPal
    ? "toBankAccount"
    : _paymentMethodChecked;

  useEffect(() => {
    if (!userData) return;
    if (!paymentOptions) return;

    const publisherCountry =
      userData?.user?.impactConnection?.publisher?.countryCode;
    const withdrawalSettings =
      userData?.user?.impactConnection?.publisher?.withdrawalSettings;
    // Use currentPaymentOption and initialise form with userData
    let initialData: BankingInfoFormData = {
      bankCountry: withdrawalSettings?.bankCountry || publisherCountry,
      paymentMethod: "BANK_TRANSFER",
    };

    if (
      withdrawalSettings &&
      userData.user?.impactConnection?.publisher?.brandedSignup
    ) {
      initialData = {
        ...initialData,
        paymentMethod: withdrawalSettings.paymentMethod,
        paypalEmailAddress: withdrawalSettings.paypalEmailAddress,
        paymentSchedulingType: withdrawalSettings.paymentSchedulingType,
        paymentThreshold: parseImpactThreshold(
          withdrawalSettings.paymentThreshold
        ),
        paymentDay: withdrawalSettings.paymentDay,
      };
    }

    const currentPaymentOption = paymentOptions?.find((paymentOption) => {
      if (initialData.paymentMethod === "PAYPAL") {
        if (paymentOption.defaultFinancePaymentMethodId === 7) {
          return true;
        }
      } else {
        if (paymentOption.countryCode === initialData.bankCountry) return true;
      }
      return false;
    });

    if (initialData.paymentMethod !== "PAYPAL")
      updateBankCountry(currentPaymentOption?.countryCode);

    setPaymentMethodChecked(
      initialData.paymentMethod === "PAYPAL"
        ? "toPayPalAccount"
        : "toBankAccount"
    );
    setCurrentPaymentOption(currentPaymentOption);
    setPaymentScheduleChecked(initialData.paymentSchedulingType);
    setFormState(initialData);
  }, [paymentOptions, userData, setCurrentPaymentOption, setFormState]);

  useEffect(() => {
    if (!countries?.length) return;
    if (countrySearch.trim() === "") {
      setFilteredCountries(countries || []);
    } else {
      setFilteredCountries(
        countries.filter((c) =>
          c.displayName.toLowerCase().includes(countrySearch.toLowerCase())
        ) || []
      );
    }
  }, [countrySearch, countries]);

  const updateBankCountry = (bankCountry: string) => {
    const currentPaymentOption = paymentOptions?.find((paymentOption) => {
      if (paymentOption.countryCode === bankCountry) return true;
      return false;
    });

    setFormState((p) => ({ ...p, bankCountry }));
    setCurrentPaymentOption(currentPaymentOption);
  };

  const runMutation = async (formData: any, token: string | undefined) => {
    setLoading(true);
    try {
      if (!currentPaymentOption) throw new Error("No currentPaymentOption");

      const body = {
        user: {
          id: user.id,
          accountId: user.accountId,
        },
        ...formData,
        paymentMethod: getPaymentMethod(currentPaymentOption),
        paymentSchedulingType: paymentScheduleChecked,
      };

      let response: any = null;
      let success: any = null;
      let validationErrors: any = null;

      // Call difference mutations based on whether the user is updating
      // the info for setting it for the first time
      if (isPartner) {
        if (!token) return; // Require token for this mutation

        response = await updateWithdrawalSettings({
          updateImpactPublisherWithdrawalSettingsInput: {
            ...body,
            accessKey: token,
          } as UpdateImpactPublisherWithdrawalSettingsInput,
        });
        success = (response as UpdateImpactPublisherWithdrawalSettingsResult)
          ?.updateImpactPublisherWithdrawalSettings?.success;
        validationErrors = (
          response as UpdateImpactPublisherWithdrawalSettingsResult
        )?.updateImpactPublisherWithdrawalSettings?.validationErrors;
      } else {
        response = await saveWithdrawalSettings({
          setImpactPublisherWithdrawalSettingsInput: {
            ...body,
          } as SetImpactPublisherWithdrawalSettingsInput,
        });
        success = (response as SetImpactPublisherWithdrawalSettingsResult)
          ?.setImpactPublisherWithdrawalSettings?.success;
        validationErrors = (
          response as SetImpactPublisherWithdrawalSettingsResult
        )?.setImpactPublisherWithdrawalSettings?.validationErrors;
      }

      if (!response || (response as Error)?.message) {
        throw new Error();
      } else if (!success) {
        console.error("Validation failed: ", validationErrors);

        const mappedValidationErrors = validationErrors?.reduce(
          (agg, error) => {
            return {
              ...agg,

              [error.field]: {
                type: "invalid",
              },
            };
          },
          {}
        );

        setErrors({
          inputErrors: { ...mappedValidationErrors },
          general: true,
        });
        return;
      }

      // Fire form change event
      window.dispatchEvent(new Event(TAX_FORM_UPDATED_EVENT_KEY));

      await refetch();
      setStep("/dashboard");
    } catch (e) {
      console.error(e);
      setErrors({ general: true });
    } finally {
      setLoading(false);
    }
  };

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
        JSONPointer.set(validationErrors, key, { type: "required" });
      }
    });

    setErrors({ inputErrors: validationErrors });
    if (Object.keys(validationErrors).length) {
      setShowModal(false);
      return;
    }

    let token = undefined;
    if (isPartner) {
      setShowModal(false);
      setShowVerification(true);
      token = await new Promise((res: (arg: string) => void) => {
        const cb = (e: CustomEvent) => {
          e.stopPropagation();
          host.removeEventListener(VERIFICATION_EVENT_KEY, cb);
          res(e.detail.token);
        };
        host.addEventListener(VERIFICATION_EVENT_KEY, cb);
      });
      setShowVerification(false);
    }
    await runMutation(formData, token);
    setShowModal(false);
    window.location.hash = "";
  };

  const onVerification = async (token: string | null) => {
    host.dispatchEvent(
      new CustomEvent(VERIFICATION_EVENT_KEY, {
        detail: { token },
        bubbles: false,
      })
    );
  };

  function setPaymentMethodChecked(
    paymentMethod: "toBankAccount" | "toPayPalAccount"
  ) {
    _setPaymentMethodChecked(paymentMethod);

    if (paymentMethod === "toPayPalAccount") {
      const currentPaymentOption = paymentOptions?.find((paymentOption) => {
        if (paymentOption.defaultFinancePaymentMethodId === 7) return true;
        return false;
      });
      setCurrentPaymentOption(currentPaymentOption);
    } else if (paymentMethod === "toBankAccount") {
      const currentPaymentOption = paymentOptions?.find(
        (paymentOption) => paymentOption.countryCode === formState.bankCountry
      );
      setCurrentPaymentOption(currentPaymentOption);
    }
  }

  return {
    text: props.getTextProps(),
    callbacks: {
      onSubmit,
      setBankCountry: updateBankCountry,
      setPaymentMethodChecked,
      setPaymentScheduleChecked,
      onBack: () => {
        // return to dashboard
        if (window.location.hash) {
          window.location.hash = "";
        } else {
          setStep("/dashboard");
        }
      },
      setCountrySearch,
      onVerification,
      onVerificationHide: () => onVerification(null),
      onModalClose: () => setShowModal(false),
      onModalOpen: () => setShowModal(true),
    },
    states: {
      showVerification,
      step: step?.replace("/", ""),
      hideSteps: !!context.hideSteps,
      saveDisabled: !paymentMethodChecked || !paymentScheduleChecked,
      locale,
      isPartner,
      feeCap,
      paymentMethodFeeLabel,
      disabled: loading,
      hideBackButton: !context.overrideBackStep,
      loading: !paymentOptions,
      saveLoading: loading,
      hideBanking:
        paymentMethodChecked !== "toBankAccount" || !paymentMethodChecked,
      hidePayPal:
        paymentMethodChecked !== "toPayPalAccount" || !paymentMethodChecked,
      loadingError: !!userError?.message || !!paymentOptionsError?.message,
      formState: {
        ...formState,
        paymentMethodChecked,
        paymentScheduleChecked,
        errors,
      },
      currentPaymentOption,
      bitset: currentPaymentOption?.withdrawalSettingId || 0,
      currency,
      thresholds: currentPaymentOption?.thresholdOptions?.split(",") || [],
      countries: filteredCountries,
      allCountries: countries,
      hasPayPal,
      bankCountry: formState.bankCountry,
      countrySearch,
      email: userData?.user?.email,
      showModal,
    },
    refs: {
      formRef,
    },
  };
}

export type UseBankingInfoFormResult = ReturnType<typeof useBankingInfoForm>;
