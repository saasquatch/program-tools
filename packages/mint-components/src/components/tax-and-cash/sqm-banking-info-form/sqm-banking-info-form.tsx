import { isDemo, useSetParent } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import { Component, Host, Prop, State, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";
import { getProps } from "../../../utils/utils";
import { TAX_CONTEXT_NAMESPACE } from "../data";
import { getFormMap } from "./formDefinitions";
import { mockPaymentOptions } from "./mockData";
import {
  BankingInfoFormView,
  BankingInfoFormViewProps,
} from "./sqm-banking-info-form-view";
import {
  getFormInputs,
  paypalFeeMap,
  useBankingInfoForm,
} from "./useBankingInfoForm";

/**
 * @uiName Banking Information Form
 * @exampleGroup Common Components
 *
 */
@Component({
  tag: "sqm-banking-info-form",
  shadow: false,
})
export class BankingInfoForm {
  @State() ignored = true;

  /**
   * @uiName Setup progress
   */
  @Prop() formStep: string = "Step {step} of {count}";

  /**
   * @uiName Step 4 title
   */
  @Prop() taxAndPayouts: string = "Payouts";

  /**
   * Displayed at the top of the page on all set up steps.
   * @uiName Page description
   */
  @Prop() taxAndPayoutsDescription: string =
    "Submit your tax documents and add your banking information to receive your rewards.";

  /**
   * @uiName Direct to bank payout option
   */
  @Prop() directlyToBankAccount: string = "Directly to my bank account";

  /**
   * @uiName PayPal payout option
   */
  @Prop() toPayPalAccount: string =
    "PayPal (2% processing fee capped to {feeCap})";
  /**
   * @uiName Threshold balance payment schedule option
   */
  @Prop() paymentScheduleBalanceThreshold: string =
    "Pay me when my balance reaches a threshold";
  /**
   * @uiName Fixed day payment schedule option
   */
  @Prop() paymentScheduleFixedDay: string =
    "Pay me on a fixed day of the month";

  /**
   * Let the participant choose what day of the month they’ll get paid
   * @uiName Payment day field label
   */
  @Prop() paymentDaySelectLabel: string = "Payment Day";

  /**
   * Participant use this field to select the balance at which they want to be paid
   * @uiName Payment threshold field label
   */
  @Prop() paymentThresholdSelectLabel: string = "Payment Threshold";
  /**
   * One of two payment day options
   * @uiName First of month payday option
   */
  @Prop() paymentDayFirstOfMonthLabelText: string = "1st of the month";
  /**
   * Label text for the payment day select option for the fifteenth of the month
   * @uiName Fifteenth of month payday option
   */
  @Prop() paymentDayFifteenthOfMonthLabelText: string = "15th of the month";
  /**
   * @uiName Payment method section header
   */
  @Prop() paymentMethod: string = "Payment method";
  /**
   * @uiName Payment schedule section header
   */
  @Prop() paymentSchedule: string = "Payment schedule";
  /**
   * @uiName Payment method section description
   */
  @Prop() paymentMethodSubtext: string =
    "Payouts will be sent from our referral program provider, impact.com.";
  /**
   * Displayed to participants who choose PayPal as their payout method
   * @uiName PayPal email field label
   */
  @Prop() payPalInputLabel: string = "PayPal email";
  /**
   * @uiName Bank country field label
   */
  @Prop() bankLocationLabel: string = "Bank country location";
  /**
   * @uiName Beneficiary account field label
   */
  @Prop() beneficiaryAccountNameLabel: string = "Account holder name";
  /**
   * @uiName Beneficiary account field description
   */
  @Prop() beneficiaryAccountNameDescription: string =
    "The beneficiary name of your bank account. Ensure this matches the name on your tax form.";
  /**
   * @uiName Bank account type field label
   */
  @Prop() bankAccountTypeLabel: string = "Bank account type";

  /**
   * @uiName Checking account option
   */
  @Prop() checkingSelectItemLabel: string = "Checking";

  /**
   * @uiName Savings account options
   */
  @Prop() savingsSelectItemLabel: string = "Savings";

  /**
   * @uiName Bank account number field label
   */
  @Prop() bankAccountNumberLabel: string = "Bank account number";
  /**
   * @uiName IBAN field label
   */
  @Prop() ibanLabel: string = "IBAN";

  /**
   * @uiName SWIFT code field label
   */
  @Prop() swiftCodeLabel: string = "SWIFT code";

  /**
   * @uiName Routing code field label
   */
  @Prop() routingCodeLabel: string =
    "{bankCountry, select, AU {BSB number} CA {Routing number} CZ {Bank code} HK {Clearing code} SG {Clearing code} US {ABA routing number} NZ {BSB number} ZA {Bank/Branch number} IN {IFSC} CNY {CNAPS} other {Routing code} }";

  /**
   * @uiName Bank name field label
   */
  @Prop() bankNameLabel: string = "Bank Name";

  /**
   * @uiName Classification entity field label
   */
  @Prop() classificationEntityLabel: string = "Classification Entity";

  /**
   * One of three options listed for the classification field
   * @uiName Business classification option
   */
  @Prop() businessSelectItemLabel: string = "Business";

  /**
   * One of three options listed for the classification field
   * @uiName Individual classification option
   */
  @Prop() individualSelectItemLabel: string = "Individual";

  /**
   * One of three options listed for the classification field
   * @uiName Foreign classification option
   */
  @Prop() foreignSelectItemLabel: string = "Foreign";

  /**
   * @uiName Classification CPF field label
   */
  @Prop() classificationCPFLabel: string = "Classification CPF";

  /**
   * @uiName Patronymic name field label
   */
  @Prop() patronymicNameLabel: string = "Patronymic name";

  /**
   * @uiName VO code field label
   */
  @Prop() voCodeLabel: string = "VO code";

  /**
   * @uiName Agency code field label
   */
  @Prop() agencyCodeLabel: string = "Agency code";

  /**
   * @uiName Branch code field label
   */
  @Prop() branchCodeLabel: string = "Branch code";

  /**
   * Label text for the classification input field
   * @uiName Classification field label
   */
  @Prop() classificationLabel: string = "Classification";

  /**
   * @uiName Taxpayer ID field label
   */
  @Prop() taxPayerIdLabel: string =
    "{country, select, AR {CUIT/CUIL} KR {Classification ID} other { Beneficiary INN } }";

  /**
   * @uiName Bank address field label
   */
  @Prop() bankAddressLabel: string = "Bank address";
  /**
   * @uiName Bank city field label
   */
  @Prop() bankCityLabel: string = "Bank city";
  /**
   * @uiName Bank province/state field label
   */
  @Prop() bankStateLabel: string = "Bank province/state";
  /**
   * @uiName Bank postal code field label
   */
  @Prop() bankPostalCodeLabel: string = "Bank postal code";
  /**
   * Default payment method to the participants’ bank account.
   * @uiName EFT withdrawal payment method
   */
  @Prop() eftWithdrawalLabel: string = "EFT withdrawal (free)";

  /**
   * @uiName FX Wire Processing fee text
   */
  @Prop() fxWireProcessingFeeLabel: string =
    "FX Wire (Processing Fee {currency}{defaultFxFee}.00)";

  /**
   * Placeholder text displayed in the country search dropdown
   * @uiName Country field placeholder text
   */
  @Prop() searchForCountryText: string = "Search for country..";

  /**
   * Part of the alert displayed at the top of the page if the participant is already a registered partner on impact.com.
   * @uiName Participant is a partner alert title
   * @uiWidget textArea
   */
  @Prop() isPartnerAlertHeader: string =
    "An account with this email already exists with our referral program provider, impact.com";

  /**
   * Part of the alert displayed at the top of the page if the participant is already a registered partner on impact.com.
   * @uiName Participant is a partner alert description
   * @uiWidget textArea
   */
  @Prop() isPartnerAlertDescription: string =
    "If you don’t recognize this referral program provider or believe this is a mistake, please contact our {supportLink} or sign up for this referral program with a different email.";
  /**
   * Text for verify email dialog
   * @uiName Verify email header
   */
  @Prop() verifyEmailHeaderText: string = "Verify your email";
  /**
   * @uiName Verify code widget header text
   */
  @Prop() verifyEmailDescriptionText: string =
    "Verify your email to update your payment settings. Enter the code sent to {email} from our referral provider, impact.com.";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Form submission error message title
   * @uiWidget textArea
   */
  @Prop() generalErrorTitle: string =
    "There was a problem submitting your information";

  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Form submission error message description
   * @uiWidget textArea
   */
  @Prop() generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact our {supportLink}.";
  /**
   * Displayed under a field that is missing required information.
   * @uiName Empty form field error message
   */
  @Prop() fieldRequiredError: string = "{fieldName} is required";
  /**
   * Displayed under a field when it has an invalid entry.
   * @uiName Form field error message
   */
  @Prop() fieldInvalidError: string = "{fieldName} is invalid";
  /**
   * @uiName Support link text
   */
  @Prop() supportLink: string = "support team";
  /**
   * @uiName Continue button label
   */
  @Prop() continueButton: string = "Save";
  /**
   * Text for the back button in the form
   * @uiName Back button label
   */
  @Prop() backButton: string = "Back";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Page load error message title
   * @uiWidget textArea
   */
  @Prop() loadingErrorAlertHeader: string =
    "There was a problem loading your form";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Page load error message description
   * @uiWidget textArea
   */
  @Prop() loadingErrorAlertDescription: string =
    "Please refresh the page and try again. If this problem continues, contact Support.";

  /**
   * @uiName Information modal title
   */
  @Prop() modalTitle: string = "Important Note";

  /**
   * @uiName Information modal description text
   */
  @Prop() modalDescription: string =
    "Updating payment information places your account and payouts on hold for up to 48 hours while we verify your change. Payments scheduled during the hold period are skipped.";

  /**
   * @uiName Information modal button text
   */
  @Prop() modalButtonText: string = "I understand, update my information";

  // ──────────────────────────────────────────────────────────────────
  // Per-field validation error messages
  // Each prop uses ICU select on {errorCode} to pick the right message.
  // Error codes are short frontend keys mapped from the API error codes.
  // The `other` branch displays the raw API message directly via {errorCode},
  // which is already human-readable English (e.g. "Invalid Routing Code").
  // ──────────────────────────────────────────────────────────────────

  /**
   * Error messages for the beneficiary / account holder name field.
   * Supports error codes: empty, invalidCharacters, numeric, tooLong,
   * nonEnglish, businessNameMismatch, nameMismatch, businessPayeeMismatch, payeeMismatch
   * @uiName Beneficiary account name error
   * @uiWidget textArea
   */
  @Prop() beneficiaryAccountNameError: string =
    "{errorCode, select, empty {Account holder name is required} invalidCharacters {Account holder name contains invalid characters} numeric {Account holder name cannot be purely numeric} tooLong {Account holder name must be 70 characters or fewer} nonEnglish {Account holder name must contain only English characters for this currency} businessNameMismatch {Beneficiary name must match the name on your tax document} nameMismatch {Beneficiary name must match the name on your tax document} businessPayeeMismatch {Payee name must match the name on your tax document} payeeMismatch {Payee name must match the name on your tax document} other {{errorCode}}}";

  /**
   * Error messages for the bank account number / IBAN field.
   * Supports error codes: empty, invalidUk, invalid, ibanEmpty,
   * ibanAlphanumeric, ibanInvalid, ibanCountryMismatch
   * @uiName Bank account number / IBAN error
   * @uiWidget textArea
   */
  @Prop() bankAccountNumberError: string =
    "{errorCode, select, empty {Account number is required} invalidUk {Please enter a valid UK account number} invalid {Account number is invalid} ibanEmpty {IBAN is required} ibanAlphanumeric {IBAN must contain only letters and numbers} ibanInvalid {IBAN is invalid} ibanCountryMismatch {UK accounts must use an IBAN starting with GB} other {{errorCode}}}";

  /**
   * Error messages for the routing code / sort code / BSB field.
   * Supports error codes: invalidBsb, invalidSortCode, empty, invalid
   * @uiName Routing code error
   * @uiWidget textArea
   */
  @Prop() routingCodeError: string =
    "{errorCode, select, invalidBsb {Please enter a valid BSB number} invalidSortCode {Please enter a valid sort code} empty {Routing number is required} invalid {Routing number is invalid} other {{errorCode}}}";

  /**
   * Error messages for the SWIFT / BIC code field.
   * Supports error codes: empty, alphanumeric, invalid
   * @uiName SWIFT code error
   * @uiWidget textArea
   */
  @Prop() swiftCodeError: string =
    "{errorCode, select, empty {SWIFT/BIC code is required} alphanumeric {SWIFT/BIC code must contain only letters and numbers} invalid {SWIFT/BIC code is invalid} other {{errorCode}}}";

  /**
   * Error messages for the bank account type field.
   * Supports error codes: empty
   * @uiName Bank account type error
   * @uiWidget textArea
   */
  @Prop() bankAccountTypeError: string =
    "{errorCode, select, empty {Bank account type is required} other {{errorCode}}}";

  /**
   * Error messages for the bank name field.
   * Supports error codes: empty
   * @uiName Bank name error
   * @uiWidget textArea
   */
  @Prop() bankNameError: string =
    "{errorCode, select, empty {Bank name is required} other {{errorCode}}}";

  /**
   * Error messages for the tax payer ID / classification entity field.
   * Supports error codes: empty, emptyAr, emptyKr, alphanumeric, alphanumericAr,
   * alphanumericKr, invalid, invalidAr, invalidKr, invalidKzt, cnpjTooShort, cpfTooShort
   * @uiName Tax payer ID error
   * @uiWidget textArea
   */
  @Prop() taxPayerIdError: string =
    "{errorCode, select, empty {Tax payer ID is required} emptyAr {CUIT/CUIL is required} emptyKr {Classification ID is required} alphanumeric {Tax payer ID must contain only letters and numbers} alphanumericAr {CUIT/CUIL must contain only letters and numbers} alphanumericKr {Classification ID must contain only letters and numbers} invalid {Tax payer ID is invalid} invalidAr {CUIT/CUIL must be 11 characters} invalidKr {Classification ID length is invalid} invalidKzt {Tax payer ID must be 12 characters for KZT} cnpjTooShort {CNPJ must be at least 14 characters} cpfTooShort {CPF must be at least 11 characters} other {{errorCode}}}";

  /**
   * Error messages for the patronymic name field.
   * Supports error codes: empty, alphanumeric
   * @uiName Patronymic name error
   * @uiWidget textArea
   */
  @Prop() patronymicNameError: string =
    "{errorCode, select, empty {Patronymic name is required} alphanumeric {Patronymic name must contain only letters and numbers} other {{errorCode}}}";

  /**
   * Error messages for the VO code field.
   * Supports error codes: empty, alphanumeric
   * @uiName VO code error
   * @uiWidget textArea
   */
  @Prop() voCodeError: string =
    "{errorCode, select, empty {VO code is required} alphanumeric {VO code must contain only letters and numbers} other {{errorCode}}}";

  /**
   * Error messages for the agency code field.
   * Supports error codes: empty, alphanumeric, tooShort
   * @uiName Agency code error
   * @uiWidget textArea
   */
  @Prop() agencyCodeError: string =
    "{errorCode, select, empty {Agency code is required} alphanumeric {Agency code must contain only letters and numbers} tooShort {Agency code must be at least 5 characters} other {{errorCode}}}";

  /**
   * Error messages for the bank address field.
   * Supports error codes: empty
   * @uiName Bank address error
   * @uiWidget textArea
   */
  @Prop() bankAddressError: string =
    "{errorCode, select, empty {Bank address is required} other {{errorCode}}}";

  /**
   * Error messages for the bank city field.
   * Supports error codes: empty
   * @uiName Bank city error
   * @uiWidget textArea
   */
  @Prop() bankCityError: string =
    "{errorCode, select, empty {Bank city is required} other {{errorCode}}}";

  /**
   * Error messages for the bank province/state field.
   * Supports error codes: empty
   * @uiName Bank province/state error
   * @uiWidget textArea
   */
  @Prop() bankStateError: string =
    "{errorCode, select, empty {Bank province/state is required} other {{errorCode}}}";

  /**
   * Error messages for the bank postal code field.
   * Supports error codes: empty
   * @uiName Bank postal code error
   * @uiWidget textArea
   */
  @Prop() bankPostalCodeError: string =
    "{errorCode, select, empty {Bank postal code is required} other {{errorCode}}}";

  /**
   * Error messages for the branch code field.
   * Supports error codes: invalid
   * @uiName Branch code error
   * @uiWidget textArea
   */
  @Prop() branchCodeError: string =
    "{errorCode, select, invalid {Branch code is invalid} other {{errorCode}}}";

  /**
   * Error messages for the branch name field.
   * Supports error codes: empty
   * @uiName Branch name error
   * @uiWidget textArea
   */
  @Prop() branchNameError: string =
    "{errorCode, select, empty {Branch name is required} other {{errorCode}}}";

  /**
   * Error messages for the classification code field.
   * Supports error codes: empty, invalidKzt
   * @uiName Classification code error
   * @uiWidget textArea
   */
  @Prop() classificationCodeError: string =
    "{errorCode, select, empty {Classification code is required} invalidKzt {Classification code must be exactly 2 characters} other {{errorCode}}}";

  /**
   * Error messages for the PayPal email field.
   * Supports error codes: empty, unsupportedCurrency, invalidEmail, verificationIncomplete
   * @uiName PayPal email error
   * @uiWidget textArea
   */
  @Prop() paypalEmailError: string =
    "{errorCode, select, empty {PayPal email is required} unsupportedCurrency {PayPal is not supported for this currency} invalidEmail {Please enter a valid email address} verificationIncomplete {PayPal verification is not complete} other {{errorCode}}}";

  /**
   * Error messages for the payment threshold field.
   * Supports error codes: empty, invalid
   * @uiName Payment threshold error
   * @uiWidget textArea
   */
  @Prop() paymentThresholdError: string =
    "{errorCode, select, empty {Payment threshold is required} invalid {Payment threshold is invalid} other {{errorCode}}}";

  /**
   * Error messages for the payment day field.
   * Supports error codes: empty, invalid
   * @uiName Payment day error
   * @uiWidget textArea
   */
  @Prop() paymentDayError: string =
    "{errorCode, select, empty {Payment day is required} invalid {Payment day must be the 1st or the 15th} other {{errorCode}}}";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<BankingInfoFormViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  getTextProps() {
    const props = getProps(this);

    return {
      ...props,
      error: {
        generalTitle: props.generalErrorTitle,
        generalDescription: props.generalErrorDescription,
        loadingErrorAlertDescription: props.loadingErrorAlertDescription,
        loadingErrorAlertHeader: props.loadingErrorAlertHeader,
      },
      errorMessages: {
        beneficiaryAccountName: props.beneficiaryAccountNameError,
        bankAccountNumber: props.bankAccountNumberError,
        routingCode: props.routingCodeError,
        swiftCode: props.swiftCodeError,
        bankAccountType: props.bankAccountTypeError,
        bankName: props.bankNameError,
        taxPayerId: props.taxPayerIdError,
        patronymicName: props.patronymicNameError,
        voCode: props.voCodeError,
        agencyCode: props.agencyCodeError,
        bankAddress: props.bankAddressError,
        bankCity: props.bankCityError,
        bankState: props.bankStateError,
        bankPostalCode: props.bankPostalCodeError,
        branchCode: props.branchCodeError,
        branchName: props.branchNameError,
        beneficiaryClassification: props.classificationCodeError,
        paypalEmailAddress: props.paypalEmailError,
        paymentThreshold: props.paymentThresholdError,
        paymentDay: props.paymentDayError,
      },
    };
  }

  render() {
    const props = isDemo()
      ? useDemoBankingInfoForm(this)
      : useBankingInfoForm(this);

    const { errors } = props.states.formState;

    const fieldRequiredError = this.fieldRequiredError;
    const fieldInvalidError = this.fieldInvalidError;

    function getValidationErrorMessage({
      type,
      label,
      errorCode,
      fieldName,
    }: {
      type: "required" | "invalid";
      label: string;
      errorCode?: string;
      fieldName?: string;
    }) {
      // If we have a specific error code from the API, try to use
      // the per-field ICU error message template for a rich message
      if (type === "invalid" && errorCode && fieldName) {
        const errorTemplate = props.text.errorMessages?.[fieldName];
        if (errorTemplate) {
          return intl.formatMessage(
            {
              id: `fieldError-${fieldName}-${errorCode}`,
              defaultMessage: errorTemplate,
            },
            {
              errorCode,
              fieldName: label,
            }
          );
        }
      }

      if (type === "required") {
        return intl.formatMessage(
          {
            id: `requiredText-${label}`,
            defaultMessage: fieldRequiredError,
          },
          {
            fieldName: label,
          }
        );
      }
      if (type === "invalid") {
        return intl.formatMessage(
          {
            id: `invalidText-${label}`,
            defaultMessage: fieldInvalidError,
          },
          {
            fieldName: label,
          }
        );
      }
      return "";
    }

    const formMap = getFormMap({
      props,
      getValidationErrorMessage,
      bankCountry: props.states.bankCountry,
    });

    const inputFields = getFormInputs({
      bitset: props.states.bitset,
      formMap,
    });

    const style = {
      Dialog: {
        position: "relative",
        "&::part(panel)": {
          maxWidth: "420px",
        },
        "&::part(title)": {
          padding:
            "var(--sl-spacing-large) var(--sl-spacing-large) 0 var(--sl-spacing-large)",
        },
        "&::part(base)": {
          position: "absolute",
        },
        "&::part(close-button)": {
          marginBottom: "var(--sl-spacing-large)",
        },
        "&::part(body)": {
          padding: "0 var(--sl-spacing-large) 0 var(--sl-spacing-large)",
          fontSize: "var(--sl-font-size-small)",
        },
        "&::part(footer)": {
          display: "flex",
          flexDirection: "column",
          gap: "var(--sl-spacing-small)",
          marginBottom: "var(--sl-spacing-xx-small)",
          alignItems: "center",
          flex: "1",
        },
      },
      SearchInput: {
        padding: "var(--sl-spacing-x-small)",
      },
    };
    const sheet = createStyleSheet(style);
    const styleString = sheet.toString();
    const verifyDescription = intl.formatMessage(
      {
        id: "codeResentSuccessfully",
        defaultMessage: props.text.verifyEmailDescriptionText,
      },
      {
        email: props.states.email,
      }
    );

    const vanillaStyle = `
      sl-menu-item::part(base) {
      color: var(--sqm-input-color);
    }
     sl-menu-item::part(base):hover {
      background-color: var(--sqm-input-border-color-hover);
    }
    `;

    return (
      <Host>
        {/* Force it to de-render every time to avoid state issues with inputs */}
        <style type="text/css">{styleString}</style>
        <style type="text/css">{vanillaStyle}</style>
        {props.states.isPartner && props.states.showVerification ? (
          <sl-dialog
            class={sheet.classes.Dialog}
            open={true}
            onSl-hide={props.callbacks.onVerificationHide}
            label={props.text.verifyEmailHeaderText}
          >
            <sqm-code-verification
              verifyCodeHeaderText={verifyDescription}
              reverifyCodeHeaderText={verifyDescription}
              onVerification={props.callbacks.onVerification}
            ></sqm-code-verification>
          </sl-dialog>
        ) : null}
        <BankingInfoFormView
          callbacks={props.callbacks}
          text={props.text}
          states={props.states}
          refs={props.refs}
          slots={{
            formInputsSlot: inputFields?.map(({ input }) => input),
            countryInputSlot: (
              <sl-select
                label={props.text.bankLocationLabel}
                disabled={props.states.saveLoading}
                required
                name="/bankCountry"
                id="bankCountry"
                value={props.states.formState.bankCountry || ""}
                onSl-select={(e) =>
                  props.callbacks.setBankCountry(e.detail?.item?.value)
                }
                {...(errors?.inputErrors?.bankCountry && {
                  class: "error-input",
                  helpText: getValidationErrorMessage({
                    type: errors?.inputErrors?.bankCountry?.type,
                    label: props.text.bankLocationLabel,
                    errorCode: errors?.inputErrors?.bankCountry?.errorCode,
                    fieldName: "bankCountry",
                  }),
                })}
              >
                <sl-input
                  disabled={props.states.saveLoading}
                  class={sheet.classes.SearchInput}
                  placeholder={this.searchForCountryText}
                  onKeyDown={(e) => {
                    // Stop shoelace intercepting key presses
                    e.stopPropagation();
                  }}
                  onSl-input={(e) => {
                    props.callbacks.setCountrySearch(e.target.value);
                  }}
                ></sl-input>
                {props.states.countries?.map((country) => {
                  return (
                    <sl-menu-item value={country.countryCode}>
                      {country.displayName}
                    </sl-menu-item>
                  );
                })}
                {props.states?.allCountries?.map((c) => (
                  <sl-menu-item
                    value={c.countryCode}
                    style={{ display: "none" }}
                  >
                    {c.displayName}
                  </sl-menu-item>
                ))}
              </sl-select>
            ),
            paymentMethodSlot: (
              <sl-input
                key="paymentMethod"
                label={props.text.paymentMethod}
                placeholder={props.states.paymentMethodFeeLabel}
                disabled
              ></sl-input>
            ),
            paymentThresholdSelectSlot: (
              <sl-select
                required
                disabled={props.states.saveLoading}
                label={props.text.paymentThresholdSelectLabel}
                name="/paymentThreshold"
                id="paymentThreshold"
                value={props.states?.formState?.paymentThreshold || ""}
                {...(errors?.inputErrors?.paymentThreshold && {
                  class: "error-input",
                  helpText: getValidationErrorMessage({
                    type: errors?.inputErrors?.paymentThreshold?.type,
                    label: props.text.paymentThresholdSelectLabel,
                    errorCode: errors?.inputErrors?.paymentThreshold?.errorCode,
                    fieldName: "paymentThreshold",
                  }),
                })}
              >
                {props.states.thresholds.map((t) => (
                  <sl-menu-item
                    value={t}
                  >{`${props.states.currency}${t}`}</sl-menu-item>
                ))}
              </sl-select>
            ),
            paymentFixedDaySelectSlot: (
              <sl-select
                required
                disabled={props.states.saveLoading}
                label={props.text.paymentDaySelectLabel}
                value={props.states?.formState?.paymentDay || ""}
                name="/paymentDay"
                id="paymentDay"
                {...(errors?.inputErrors?.paymentDay && {
                  class: "error-input",
                  helpText: getValidationErrorMessage({
                    type: errors?.inputErrors?.paymentDay?.type,
                    label: props.text.paymentDaySelectLabel,
                    errorCode: errors?.inputErrors?.paymentDay?.errorCode,
                    fieldName: "paymentDay",
                  }),
                })}
              >
                <sl-menu-item value={"1"}>
                  {props.text.paymentDayFirstOfMonthLabelText}
                </sl-menu-item>
                <sl-menu-item value={"15"}>
                  {props.text.paymentDayFifteenthOfMonthLabelText}
                </sl-menu-item>
              </sl-select>
            ),
            paypalInputSlot: (
              <sl-input
                required
                disabled={props.states.saveLoading}
                value={props.states?.formState?.paypalEmailAddress || ""}
                label={props.text.payPalInputLabel}
                key="paypalEmailAddress"
                name="/paypalEmailAddress"
                id="paypalEmailAddress"
                type="text"
                {...(props.states.formState?.errors?.inputErrors
                  ?.paypalEmailAddress && {
                  class: "error-input",
                  helpText: getValidationErrorMessage({
                    type: props.states.formState?.errors?.inputErrors
                      ?.paypalEmailAddress?.type,
                    label: props.text.payPalInputLabel,
                    errorCode:
                      props.states.formState?.errors?.inputErrors
                        ?.paypalEmailAddress?.errorCode,
                    fieldName: "paypalEmailAddress",
                  }),
                })}
              ></sl-input>
            ),
          }}
        />
      </Host>
    );
  }
}

function useDemoBankingInfoForm(
  props: BankingInfoForm
): BankingInfoFormViewProps {
  const defaultPaymentMethodChecked =
    props.demoData?.states?.formState?.paymentMethodChecked;
  const defaultPaymentScheduleChecked =
    props.demoData?.states?.formState?.paymentScheduleChecked;
  const defaultCurrency = props.demoData?.states?.currency;
  const defaultCountry = props.demoData?.states?.formState?.bankCountry;

  const setStep = useSetParent(TAX_CONTEXT_NAMESPACE);
  const [paymentMethodChecked, setPaymentMethodChecked] = useState<
    "toBankAccount" | "toPayPalAccount" | undefined
  >(undefined);
  const [paymentScheduleChecked, setPaymentScheduleChecked] = useState<
    "BALANCE_THRESHOLD" | "FIXED_DAY" | undefined
  >(undefined);

  const [currency, setCurrency] = useState(defaultCurrency);
  const [bankCountry, setBankCountry] = useState(defaultCountry);

  const currentPaymentOption = mockPaymentOptions[currency]?.find(
    (paymentOption) => {
      if (paymentOption.countryCode === bankCountry) return true;
      return false;
    }
  );

  const bitset =
    currentPaymentOption?.withdrawalSettingId ||
    props.demoData?.states?.bitset ||
    0;

  useEffect(() => {
    if (defaultPaymentMethodChecked !== paymentMethodChecked)
      setPaymentMethodChecked(defaultPaymentMethodChecked);
    if (defaultPaymentScheduleChecked !== paymentScheduleChecked)
      setPaymentScheduleChecked(defaultPaymentScheduleChecked);
    if (defaultCurrency !== currency) setCurrency(defaultCurrency);
    if (defaultCountry !== bankCountry) setBankCountry(defaultCountry);
  }, [defaultPaymentMethodChecked, defaultCurrency, defaultCountry]);

  const feeCap = paypalFeeMap[currency] || "";

  const paymentMethodFeeMap = {
    ACH: props.eftWithdrawalLabel,
    WIRE: intl.formatMessage(
      { id: "fxWireText", defaultMessage: props.fxWireProcessingFeeLabel },
      {
        currency,
        defaultFxFee: currentPaymentOption?.defaultFxFee || "0",
      }
    ),
  };

  const paymentMethodFeeLabel =
    paymentMethodFeeMap[currentPaymentOption?.defaultFinancePaymentMethodId];

  return deepmerge(
    {
      states: {
        step: "4",
        isPartner: false,
        disabled: false,
        loading: false,
        saveLoading: false,
        hideSteps: false,
        hideBackButton: false,
        feeCap,
        thresholds: [],
        paymentMethodFeeLabel,
        formState: {
          paymentMethodChecked,
          paymentScheduleChecked,
          errors: {
            general: false,
            beneficiaryAccountName: false,
            bankAccountType: false,
            bankAccountNumber: false,
            iban: false,
            swiftCode: false,
            routingCode: false,
            bankName: false,
            beneficiaryClassification: false,
            patronymicName: false,
            voCode: false,
            agencyCode: false,
            bankAddress: false,
            bankCity: false,
            bankState: false,
            bankPostalCode: false,
            branchCode: false,
            paymentThreshold: false,
            paymentDay: false,
          },
        },
        bitset,
        bankCountry,
        currency,
        setCurrency,
        hasPayPal: true,
        showModal: false,
      },
      callbacks: {
        onVerificationHide: () => {},
        onSubmit: async () => {
          setStep("/dashboard");
        },
        setBankCountry,
        setPaymentMethodChecked,
        setPaymentScheduleChecked,
        setCountrySearch: () => {},
        onBack: async () => setStep("/dashboard"),
        onVerification: () => {},
        onModalOpen: () => {},
        onModalClose: () => {},
      },
      text: props.getTextProps(),
      refs: {
        formRef: { current: null },
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
