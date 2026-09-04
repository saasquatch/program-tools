import { h } from "@stencil/core";
import {
  TaxAndCashDashboardProps,
  TaxAndCashDashboardView,
} from "./sqm-tax-and-cash-dashboard-view";
import { taxTypeToName } from "../utils";

export default {
  title: "Components/Tax And Cash Dashboard View",
};

const defaultText: TaxAndCashDashboardProps["text"] = {
  statusTextActive: "Active",
  statusTextNotActive: "Invalid Tax Form",
  statusTextNotVerified: "Not Verified",
  statusTextRequired: "Required",
  requiredTaxForm:
    "Your payouts are on hold until you submit a {taxFormType} tax form.",
  badgeTextSubmittedOn: "Submitted on {dateSubmitted}.",
  badgeTextSubmittedOnW8:
    "Submitted on {dateSubmitted}. Valid for three years after submission.",
  badgeTextAwaitingReview: "Awaiting review. Submitted on {dateSubmitted}.",
  taxAlertHeaderNotActiveW9:
    "Your W-9 tax form has personal information that doesn't match your profile",
  taxAlertHeaderNotActiveW8: "{documentType} tax form is invalid",
  taxAlertNotActiveMessageW9: "Please resubmit a new {documentType} form.",
  taxAlertNotActiveMessageW8:
    "Your tax form may have expired or has personal information that doesn't match your profile. Please submit a new {documentType} form.",
  invalidForm: "Make sure your information is correct and submit new form.",
  bankingInformationSectionHeader: "Payout information",
  taxDocumentSectionHeader: "Tax documents",
  taxDocumentSectionSubHeader: "{documentType} tax form",
  taxDocumentSectionSubHeaderNoDocument: "Tax form",
  indirectTaxInfoSectionHeader: "Indirect tax",
  indirectTaxInfoCanada: "Registered in {province}, {country}",
  indirectTaxInfoOtherCountry: "Registered in {country}",
  indirectTaxInfoSpain: "Registered in {country}, {subRegion}",
  indirectTaxTooltipSupport:
    "To make changes to your indirect tax information, please contact our {supportLink}.",
  indirectTaxDetails: "{indirectTaxType} number: {indirectTaxNumber}",
  newFormButton: "Submit new tax form",
  editPaymentInformationButton: "Edit payout information",
  notRegisteredForTax:
    "Not registered for indirect tax. If you've previously registered with your tax authority, contact our {supportLink} to add your information to stay tax compliant.",
  qstNumber: "QST number: {qstNumber}",
  subRegionTaxNumber: "Income tax number: {subRegionTaxNumber}",
  invoiceColumnTitle: "Invoice",
  dateColumnTitle: "Date",
  earningsColumnTitle: "Earnings",
  indirectTaxColumnTitle: "Indirect tax",
  earningsAfterTaxColumnTitle: "Earnings after tax",
  invoiceDescription:
    "View and download your invoices to report your earnings and stay tax compliant.",
  invoicePrevLabel: "Prev",
  invoiceMoreLabel: "Next",
  invoiceHeader: "Invoices",
  invoiceEmptyStateHeader: "View your invoice details",
  invoiceEmptyStateText:
    "Refer a friend to view the status of your invoices and rewards earned",
  payoutFromImpact:
    "Your balance may take up to 24 hours to update. Payouts will be sent from our referral program provider, impact.com.",
  replaceTaxFormModalHeader: "Replace existing tax form",
  replaceTaxFormModalBodyText:
    "Submitting a new tax form will remove your existing form. Make sure to sign and complete your new tax form to prevent any issues with your next payout.",
  supportLink: "support team",
  cancelButton: "Cancel",
  payoutHoldAlertHeader: "Your payout is on hold",
  payoutHoldAlertDescription:
    "Please contact our {supportLink} or check your inbox for an email from our referral program provider, impact.com.",
  verificationRequiredHeader: "Verify your identity",
  verificationRequiredDescription:
    "Complete your verification to start receiving your cash rewards. It should only take a few minutes verify. If you run in to an issue verifying your identity contact our {supportLink}.",
  verificationRequiredButtonText: "Start Verification",
  verificationRequiredInternalHeader: "Identity verification in progress",
  verificationRequiredInternalDescription:
    "Identity verification submission has been received. Our system is currently performing additional checks and analyzing the results. You will be updated shortly. If you don't hear from us contact our {supportLink}.",
  verificationReviewInternalHeader: "Identity verification under review",
  verificationReviewInternalDescription:
    "Identity verification requires further review due to a potential error. Our team is reviewing the information and will update you shortly. If you don't hear from us contact our {supportLink}.",
  verificationFailedInternalHeader: "Identity verification unsuccessful",
  verificationFailedInternalDescription:
    "Identity verification has failed. Our team is reviewing the report and will contact you with further information. If you don't hear from us contact our {supportLink}.",
  w9RequiredHeader: "Your next payout is on hold",
  w9RequiredDescription:
    "You have surpassed the $2000 threshold requiring a W-9 form or have multiple accounts with impact.com. To remove the hold, please submit your W-9 form.",
  w9RequiredButtonText: "Submit W-9",
  accountReviewHeader: "Your account is under review",
  accountReviewDescription:
    "This process takes 48 hours, payouts are on hold until it's completed. You will receive an email from our referral provider, Impact.com, if any issues arise.  It contains details on how to resolve this issue. If you need further assistance, please reach out to our {supportLink}.",
  balanceUnderThresholdHeader: "Your balance is under the payout minimum",
  balanceUnderThresholdDescription:
    "Your total balance is under {minPayoutAmount}, the minimum required for payout.",
  paymentHoldOnChangeHeader: "We are reviewing your new payout settings",
  paymentHoldOnChangeDescription:
    "Your payout is temporarily on hold while we review your new payment information, this process is usually resolved within 48 hours.",
  beneficiaryNameInvalidHeader:
    "Your payment information does not match your tax form",
  beneficiaryNameInvalidDescription:
    "The account holder (beneficiary) name in your payment information does not match what was submitted in your tax form. Please review and update your payment information or tax form so that they match exactly and do not include any invalid characters. Your payouts are on hold until this is resolved.",
  beneficiaryNameMismatchHeader:
    "Your payment information does not match your tax form",
  beneficiaryNameMismatchDescription:
    "The account holder (beneficiary) name in your payment information does not match what was submitted in your tax form. Please review and update your payment information or tax form so that they match exactly and do not include any invalid characters. Your payouts are on hold until this is resolved.",
  bankTaxNameMismatchHeader:
    "Your payment information does not match your tax form",
  bankTaxNameMismatchDescription:
    "The bank account (beneficiary) name in your payment information does not match what was submitted in your tax form. Please review and update your payment information or tax form so that they match exactly and do not include any invalid characters. Your payouts are on hold until this is resolved.",
  withdrawalSettingsInvalidHeader:
    "Your payment information is incomplete or includes invalid characters",
  withdrawalSettingsInvalidDescription:
    "There are missing fields or invalid characters in your payment information. Please review your information and make sure it is correct. Your payouts are on hold until this is resolved.",
  paymentReturnedHeader: "Payout unsuccessful",
  paymentReturnedDescription:
    "Our recent payment attempt for your earnings was unsuccessful. Please review your payment information and make sure it is correct.",
  termsAndConditions: "Terms and Conditions",
  error: {
    generalTitle: "There was a problem submitting your information",
    generalDescription:
      "Please review your information and try again. If this problem continues, contact our {supportLink}.",
    loadingErrorAlertHeader: "There was a problem loading your form",
    loadingErrorAlertDescription:
      "Please refresh the page and try again. If this problem continues, contact our {supportLink}.",
  },
};

const defaultCallbacks: TaxAndCashDashboardProps["callbacks"] = {
  onClick: () => {},
  onVerifyClick: () => {},
  onEditPayoutInfo: () => {},
  onNewFormCancel: () => {},
  onNewFormClick: () => {},
};

const buildSlots = (
  cardStates: Record<string, unknown> = {},
): TaxAndCashDashboardProps["slots"] => ({
  payoutDetailsCardSlot: (
    <sqm-payout-details-card
      demoData={{ states: { badgeStatus: "nextPayout", ...cardStates } }}
    ></sqm-payout-details-card>
  ),
});

const defaultSlots = buildSlots();

const baseStates: TaxAndCashDashboardProps["states"] = {
  payoutStatus: "DONE",
  veriffLoading: false,
  canEditPayoutInfo: true,
  disabled: false,
  status: "ACTIVE",
  documentType: "W9",
  documentTypeString: taxTypeToName("W9"),
  dateSubmitted: "Jan 18th, 2025",
  noFormNeeded: false,
  country: "United States",
  indirectTaxType: "VAT",
  indirectTaxNumber: "123456",
  showNewFormDialog: false,
  hasHold: false,
  loading: false,
  loadingError: false,
};

// Stories not covered by TaxForm.stories.tsx (which uses sqm-tax-and-cash-dashboard WC)

// ─── Base ─────────────────────────────────────────────────────────────────────

export const ActiveW9Form = () => (
  <TaxAndCashDashboardView
    states={baseStates}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={defaultSlots}
  />
);

export const TaxFormRequired = () => (
  <TaxAndCashDashboardView
    states={{
      ...baseStates,
      status: undefined,
      documentType: "W9",
      documentTypeString: taxTypeToName("W9"),
      noFormNeeded: false,
    }}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={defaultSlots}
  />
);

// ─── Payout hold statuses not in TaxForm.stories.tsx ─────────────────────────

export const AccountUnderReview = () => (
  <TaxAndCashDashboardView
    states={{ ...baseStates, payoutStatus: "NEW_PAYEE_REVIEW" }}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={defaultSlots}
  />
);

export const PaymentHoldOnChange = () => (
  <TaxAndCashDashboardView
    states={{ ...baseStates, payoutStatus: "PAYMENT_HOLD_ON_CHANGE" }}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={defaultSlots}
  />
);

export const BalanceUnderThreshold = () => (
  <TaxAndCashDashboardView
    states={{
      ...baseStates,
      payoutStatus: "BALANCE_UNDER_THRESHOLD",
      minPayoutAmount: "USD50.00",
    }}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={buildSlots({ belowPayoutThreshold: true })}
  />
);

export const BeneficiaryNameInvalid = () => (
  <TaxAndCashDashboardView
    states={{ ...baseStates, payoutStatus: "BENEFICIARY_NAME_INVALID" }}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={defaultSlots}
  />
);

export const BeneficiaryNameMismatch = () => (
  <TaxAndCashDashboardView
    states={{ ...baseStates, payoutStatus: "BENEFICIARY_NAME_MISMATCH" }}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={defaultSlots}
  />
);

export const BankTaxNameMismatch = () => (
  <TaxAndCashDashboardView
    states={{ ...baseStates, payoutStatus: "BANK_TAX_NAME_MISMATCH" }}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={defaultSlots}
  />
);

export const WithdrawalSettingsInvalid = () => (
  <TaxAndCashDashboardView
    states={{ ...baseStates, payoutStatus: "WITHDRAWAL_SETTINGS_INVALID" }}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={defaultSlots}
  />
);

export const PaymentReturned = () => (
  <TaxAndCashDashboardView
    states={{ ...baseStates, payoutStatus: "PAYMENT_RETURNED" }}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={defaultSlots}
  />
);

export const W9ThresholdReachedHardBlock = () => (
  <TaxAndCashDashboardView
    states={{
      ...baseStates,
      payoutStatus: "OVER_W9_THRESHOLD",
      enforceUsTaxComplianceOption: "HARD_BLOCK",
      status: undefined,
    }}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={defaultSlots}
  />
);

// ─── Verification loading state ───────────────────────────────────────────────

export const VerificationRequiredLoading = () => (
  <TaxAndCashDashboardView
    states={{
      ...baseStates,
      payoutStatus: "VERIFICATION:REQUIRED",
      veriffLoading: true,
      notRegistered: true,
    }}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={defaultSlots}
  />
);

// ─── Loading and error states ─────────────────────────────────────────────────

export const Loading = () => (
  <TaxAndCashDashboardView
    states={{ ...baseStates, loading: true }}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={defaultSlots}
  />
);

export const LoadingError = () => (
  <TaxAndCashDashboardView
    states={{ ...baseStates, loadingError: true }}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={defaultSlots}
  />
);

export const GeneralError = () => (
  <TaxAndCashDashboardView
    states={{ ...baseStates, errors: { general: true } }}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={defaultSlots}
  />
);

export const Disabled = () => (
  <TaxAndCashDashboardView
    states={{ ...baseStates, disabled: true }}
    text={defaultText}
    callbacks={defaultCallbacks}
    slots={defaultSlots}
  />
);
