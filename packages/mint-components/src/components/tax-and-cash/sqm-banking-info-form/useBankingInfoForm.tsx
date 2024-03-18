import {
  useLocale,
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useRef, useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { gql } from "graphql-request";
import JSONPointer from "jsonpointer";
import { intl } from "../../../global/global";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useParent, useParentValue } from "../../../utils/useParentState";
import {
  FINANCE_NETWORK_SETTINGS_NAMESPACE,
  FinanceNetworkSetting,
  FinanceNetworkSettingsQuery,
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
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

type RoutingCodeLabels = {
  AU: string;
  CA: string;
  CZ: string;
  HK: string;
  SG: string;
  US: string;
  NZ: string;
  ZA: string;
  IN: string;
  CNY: string;
};

type TaxpayerIdLabels = {
  AR: string;
  KR: string;
};

export function getFormMap({
  props,
  getValidationErrorMessage,
}: {
  props: BankingInfoFormViewProps | Omit<any, "text" | "callbacks">;
  getValidationErrorMessage: (props: {
    type: "required" | "invalid";
    label: string;
  }) => string;
}) {
  const { errors, ...formState } = props.states.formState;

  const country = props.states.bankCountry;

  return {
    0: {
      input: (
        <sl-input
          required
          label={props.text.beneficiaryAccountNameLabel}
          name="/beneficiaryAccountName"
          id="beneficiaryAccountName"
          key="beneficiaryAccountName"
          type="text"
          {...(errors?.inputErrors?.beneficiaryAccountName && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.beneficiaryAccountName?.type,
              label: props.text.beneficiaryAccountNameLabel,
            }),
          })}
        ></sl-input>
      ),
    },
    1: {
      input: (
        <sl-select
          required
          label={props.text.bankAccountTypeLabel}
          name="/bankAccountType"
          id="bankAccountType"
          key="bankAccountType"
          {...(errors?.inputErrors?.bankAccountType && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.bankAccountType?.type,
              label: props.text.bankAccountTypeLabel,
            }),
          })}
        >
          <sl-menu-item value="CHECKING">
            {props.text.checkingSelectItemLabel}
          </sl-menu-item>
          <sl-menu-item value="SAVINGS">
            {props.text.savingsSelectItemLabel}
          </sl-menu-item>
        </sl-select>
      ),
    },
    2: {
      input: (
        <sl-input
          required
          label={props.text.bankAccountNumberLabel}
          name="/bankAccountNumber"
          id="bankAccountNumber"
          key="bankAccountNumber"
          value={formState.bankAccountNumber}
          type="text"
          {...(errors?.inputErrors?.bankAccountNumber && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.bankAccountNumber?.type,
              label: props.text.bankAccountNumberLabel,
            }),
          })}
        ></sl-input>
      ),
    },
    3: {
      input: (
        <sl-input
          required
          label={props.text.ibanLabel}
          name="/bankAccountNumber"
          id="iban"
          key="iban"
          type="text"
          value={formState.bankAccountNumber}
          {...(errors?.inputErrors?.bankAccountNumber && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.bankAccountNumber?.type,
              label: props.text.ibanLabel,
            }),
          })}
        ></sl-input>
      ),
    },

    4: {
      input: (
        <sl-input
          required
          label={props.text.swiftCodeLabel}
          name="/swiftCode"
          id="swiftCode"
          key="swiftCode"
          type="text"
          {...(errors?.inputErrors?.swiftCode && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.swiftCode?.type,
              label: props.text.swiftCodeLabel,
            }),
          })}
        ></sl-input>
      ),
    },
    5: {
      input: (
        <sl-input
          required
          label={intl.formatMessage(
            {
              id: "routingCodeText",
              defaultMessage: props.text.routingCodeLabel,
            },
            {
              country,
            }
          )}
          name="/routingCode"
          id="routingCode"
          key="routingCode"
          type="text"
          {...(errors?.inputErrors?.routingCode && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.routingCode?.type,
              label: intl.formatMessage(
                {
                  id: "routingCodeErrorText",
                  defaultMessage: props.text.routingCodeLabel,
                },
                {
                  country,
                }
              ),
            }),
          })}
        ></sl-input>
      ),
    },
    6: {
      input: (
        <sl-input
          required
          label={props.text.bankNameLabel}
          name="/bankName"
          id="bankName"
          key="bankName"
          type="text"
          {...(errors?.inputErrors?.bankName && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.bankName?.type,
              label: props.text.bankNameLabel,
            }),
          })}
        ></sl-input>
      ),
    },
    7: {
      input: [
        <sl-select
          required
          label={props.text.classificationLabel}
          name="/beneficiaryClassification"
          id="beneficiaryClassification"
          key="beneficiaryClassification"
          {...(errors?.inputErrors?.beneficiaryClassification && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.beneficiaryClassification?.type,
              label: props.text.classificationLabel,
            }),
          })}
        >
          <sl-menu-item value="BUSINESS">
            {props.text.businessSelectItemLabel}
          </sl-menu-item>
          <sl-menu-item value="INDIVIDUAL">
            {props.text.individualSelectItemLabel}
          </sl-menu-item>
          <sl-menu-item value="FOREIGN">
            {props.text.foreignSelectItemLabel}
          </sl-menu-item>
        </sl-select>,
        <sl-input
          required
          label={intl.formatMessage(
            {
              id: "fxWireText",
              defaultMessage: props.text.taxPayerIdLabel,
            },
            {
              country,
            }
          )}
          type="text"
          name="/taxPayerId"
          id="taxPayerId"
          key="taxPayerId"
          {...(errors?.inputErrors?.taxPayerId && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.taxPayerId?.type,
              label: props.text.taxPayerIdLabel,
            }),
          })}
        ></sl-input>,
      ],
    },
    8: {
      input: (
        <sl-select
          required
          label={props.text.classificationCPFLabel}
          name="/beneficiaryClassification"
          id="beneficiaryClassification"
          key="beneficiaryClassification"
          {...(errors?.inputErrors?.beneficiaryClassification && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.beneficiaryClassification?.type,
              label: props.text.classificationCPFLabel,
            }),
          })}
        >
          <sl-menu-item value="CPF">CPF</sl-menu-item>
          <sl-menu-item value="CNPJ">CNPJ</sl-menu-item>
        </sl-select>
      ),
    },
    9: {
      input: (
        <sl-input
          key="patronymicName"
          required
          label={props.text.patronymicNameLabel}
          name="/patronymicName"
          id="patronymicName"
          type="text"
          {...(errors?.inputErrors?.patronymicName && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.patronymicName?.type,
              label: props.text.patronymicNameLabel,
            }),
          })}
        ></sl-input>
      ),
    },
    10: {
      input: (
        <sl-input
          key="voCode"
          label={props.text.voCodeLabel}
          name="/voCode"
          id="voCode"
          type="text"
          {...(errors?.inputErrors?.voCode && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.voCode?.type,
              label: props.text.voCodeLabel,
            }),
          })}
        ></sl-input>
      ),
    },
    11: {
      input: (
        <sl-input
          required
          label={props.text.agencyCodeLabel}
          name="/agencyCode"
          id="agencyCode"
          key="agencyCode"
          type="text"
          {...(errors?.inputErrors?.agencyCode && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.agencyCode?.type,
              label: props.text.agencyCodeLabel,
            }),
          })}
        ></sl-input>
      ),
    },
    12: {
      input: [
        <sl-input
          required
          label={props.text.bankAddressLabel}
          name="/bankAddress"
          id="bankAddress"
          key="bankAddress"
          type="text"
          {...(errors?.inputErrors?.bankAddress && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.bankAddress?.type,
              label: props.text.bankAddressLabel,
            }),
          })}
        ></sl-input>,
        <sl-input
          required
          label={props.text.bankCityLabel}
          name="/bankCity"
          id="bankCity"
          key="bankCity"
          type="text"
          {...(errors?.inputErrors?.bankCity && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.bankCity?.type,
              label: props.text.bankCityLabel,
            }),
          })}
        ></sl-input>,
        <sl-input
          required
          label={props.text.bankStateLabel}
          name="/bankState"
          id="bankState"
          key="bankState"
          type="text"
          {...(errors?.inputErrors?.bankState && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.bankState?.type,
              label: props.text.bankStateLabel,
            }),
          })}
        ></sl-input>,
        <sl-input
          required
          label={props.text.bankPostalCodeLabel}
          name="/bankPostalCode"
          id="bankPostalCode"
          key="bankPostalCode"
          type="text"
          {...(errors?.inputErrors?.bankPostalCode && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.bankPostalCode?.type,
              label: props.text.bankPostalCodeLabel,
            }),
          })}
        ></sl-input>,
      ],
    },
    13: {
      input: (
        <sl-input
          required
          label={props.text.branchCodeLabel}
          name="/branchCode"
          id="branchCode"
          key="branchCode"
          type="text"
          {...(errors?.inputErrors?.branchCode && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.branchCode?.type,
              label: props.text.branchCodeLabel,
            }),
          })}
        ></sl-input>
      ),
    },
    14: {
      input: (
        <sl-select
          required
          label={props.text.classificationLabel}
          name="/beneficiaryClassification"
          id="beneficiaryClassification"
          key="beneficiaryClassification"
          {...(errors?.inputErrors?.beneficiaryClassification && {
            class: "error-input",
            helpText: getValidationErrorMessage({
              type: errors?.inputErrors?.beneficiaryClassification?.type,
              label: props.text.classificationLabel,
            }),
          })}
        >
          <sl-menu-item value="BUSINESS">
            {props.text.businessSelectItemLabel}
          </sl-menu-item>
          <sl-menu-item value="INDIVIDUAL">
            {props.text.individualSelectItemLabel}
          </sl-menu-item>
          <sl-menu-item value="FOREIGN">
            {props.text.foreignSelectItemLabel}
          </sl-menu-item>
        </sl-select>
      ),
    },
  };
}

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
  const locale = useLocale();
  const user = useUserIdentity();

  const formRef = useRef<HTMLFormElement>(null);

  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);
  const context = useParentValue<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);

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

  const currency = userData?.user?.impactConnection?.publisher?.currency || "";

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

  const intlLocale = locale?.replace("_", "-") || "en";

  // filter out any duplicate countries and null countryCode
  const availableCountries = new Set(
    paymentOptions?.map((option) => option.countryCode).filter((value) => value)
  );

  // build list of country codes and names
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

    const currentPaymentOption = paymentOptions?.find(
      (paymentOption) => paymentOption.countryCode === initialData.bankCountry
    );

    setCurrentPaymentOption(currentPaymentOption);
    setPaymentScheduleChecked(initialData.paymentSchedulingType);
    setFormState(initialData);
    setPaymentMethodChecked(
      initialData.paymentMethod === "PAYPAL"
        ? "toPayPalAccount"
        : "toBankAccount"
    );
    updateBankCountry(currentPaymentOption?.countryCode);
  }, [paymentOptions, userData, setCurrentPaymentOption, setFormState]);

  const updateBankCountry = (bankCountry: string) => {
    const currentPaymentOption = paymentOptions?.find((paymentOption) => {
      if (paymentOption.countryCode === bankCountry) return true;
      return false;
    });

    setFormState((p) => ({ bankCountry, ...p }));
    setCurrentPaymentOption(currentPaymentOption);
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
      return;
    }

    setLoading(true);
    try {
      if (!currentPaymentOption) throw new Error("No currentPaymentOption");

      const response = await saveWithdrawalSettings({
        setImpactPublisherWithdrawalSettingsInput: {
          user: {
            id: user.id,
            accountId: user.accountId,
          },
          ...formData,
          paymentMethod: getPaymentMethod(currentPaymentOption),
          paymentSchedulingType: paymentScheduleChecked,
        } as SetImpactPublisherWithdrawalSettingsInput,
      });
      if (!response || (response as Error)?.message) {
        throw new Error();
      } else if (
        !(response as SetImpactPublisherWithdrawalSettingsResult)
          .setImpactPublisherWithdrawalSettings?.success
      ) {
        console.error(
          "Validation failed: ",
          (response as SetImpactPublisherWithdrawalSettingsResult)
            .setImpactPublisherWithdrawalSettings?.validationErrors
        );

        const validationErrors = (
          response as SetImpactPublisherWithdrawalSettingsResult
        ).setImpactPublisherWithdrawalSettings?.validationErrors;

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

      await refetch();

      setStep("/dashboard");
    } catch (e) {
      console.error(e);
      setErrors({ general: true });
    } finally {
      setLoading(false);
    }
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
      onBack: () => setStep("/dashboard"),
    },
    states: {
      step: step?.replace("/", ""),
      hideSteps: !!context.hideSteps,
      saveDisabled: !paymentMethodChecked || !paymentScheduleChecked,
      locale,
      isPartner:
        !!userData?.user?.impactConnection?.publisher?.withdrawalSettings,
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
      countries,
      hasPayPal,
    },
    refs: {
      formRef,
    },
  };
}
