import { IndirectDetailsSlotViewProps } from "./small-views/IndirectTaxDetailsView";
import { TaxFormStepOneProps } from "./sqm-tax-form-step-1-view";
import { TaxDocumentSubmittedProps } from "./sqm-tax-document-submitted-view";

export const indirectDetailsSlotText: IndirectDetailsSlotViewProps["text"] = {
  selectedRegion: "Country / Region of Indirect Tax",
  vatNumber: "VAT number",
  province: "Province",
  indirectTaxNumber: "Indirect Tax",
};

export const taxFormStepOneText: TaxFormStepOneProps["text"] = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  country: "Country",
  currency: "Currency",
  indirectTaxNumber: "Tax Number",
  allowBankingCollection: "I agree to the terms",
  submitButton: "Submit",
  step: "Step",
  stepOf: "of",
  personalInformation: "Personal Information",
  participantType: "Participant type",
  businessEntity: "I represent a business entity",
  individualParticipant: "I am an individual participant",
  taxAndBankingCollection: "Tax and banking collection",
  error: {
    firstName: "Enter a first name",
    lastName: "Enter a last name",
    email: "Enter a valid email",
    countryCode: "Select a country",
    currency: "Select a currency",
    allowBankingCollection: "This field is required",
    participantType: "Select a participant type",
  },
};

export const taxFormDocumentSubmittedText: TaxDocumentSubmittedProps["text"] = {
  statusTextActive: "Active",
  statusTextNotActive: "Not Active",
  statusTextNotVerified: "Not Verified",
  statusTextExpired: "Expired",
  badgeTextSubmittedOn: "Submitted on",
  badgeTextAwaitingReview: "Awaiting review. Submitted on",
  badgeTextExpiredOn: "Expired on",
  taxAlertHeader:
    "Your {documentType} tax form has personal information that doesn't match your profile.",
  taxAlertMessage: "Please resubmit a new {documentType} form.",
  bankingInformationSectionHeader: "Banking Information",
  taxDocumentSectionHeader: "Tax documents",
  taxDocumentSectionSubHeader: "{documentType} Tax Form",
  newFormButton: "Submit New Form",
};
