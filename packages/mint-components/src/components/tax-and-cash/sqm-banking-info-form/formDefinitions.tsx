import { h } from "@stencil/core";
import { intl } from "../../../global/global";
import { BankingInfoFormViewProps } from "./sqm-banking-info-form-view";

export function getFormMap({
  props,
  getValidationErrorMessage,
  bankCountry,
}: {
  props: BankingInfoFormViewProps | Omit<any, "text" | "callbacks">;
  getValidationErrorMessage: (props: {
    type: "required" | "invalid";
    label: string;
  }) => string;
  bankCountry?: string;
}) {
  const { errors, ...formState } = props.states.formState;

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
          help-text={props.text.beneficiaryAccountNameDescription}
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
              bankCountry,
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
                  bankCountry,
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
              bankCountry,
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
