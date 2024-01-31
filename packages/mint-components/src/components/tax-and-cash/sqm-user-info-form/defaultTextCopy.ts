import { IndirectDetailsSlotViewProps } from "./small-views/IndirectTaxDetailsView";
import { UserInfoFormViewProps } from "./sqm-user-info-form-view";
import { TaxDocumentSubmittedProps } from "../sqm-tax-document-submitted/sqm-tax-document-submitted-view";
import { IndirectTaxFormViewProps } from "../sqm-indirect-tax-form/sqm-indirect-tax-form-view";
import { DocumentTypeFormViewProps } from "../sqm-document-type-form/sqm-document-type-form-view";
import { DocusignFormViewProps } from "../sqm-docusign-form/sqm-docusign-form-view";

export const indirectDetailsSlotText: IndirectDetailsSlotViewProps["text"] = {
  selectedRegion: "Country / Region of Indirect Tax",
  vatNumber: "VAT number",
  province: "Province",
  indirectTaxNumber: "Indirect Tax",
};

export const userInfoText: UserInfoFormViewProps["text"] = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  country: "Country",
  currency: "Currency",
  allowBankingCollection: "I agree to the terms",
  submitButton: "Submit",
  formStep: "Step 1 of 4",
  personalInformation: "Personal Information",
  participantType: "Participant type",
  businessEntity: "I represent a business entity",
  individualParticipant: "I am an individual participant",
  taxAndBankingCollection: "Tax and banking collection",
  error: {
    generalTitle: "There was a problem submitting your information",
    generalDescription:
      "Please review your information and try again. If this problem continues, contact Support.",
    firstName: "Enter a first name",
    lastName: "Enter a last name",
    email: "Enter a valid email",
    countryCode: "Select a country",
    currency: "Select a currency",
    allowBankingCollection: "This field is required",
    participantType: "Select a participant type",
  },
};

export const indirectTaxFormText: IndirectTaxFormViewProps["text"] = {
  formStep: "Step 2 of 4",
  indirectTax: "Indirect Tax",
  indirectTaxDescription:
    "Indirect Taxes (e.g. VAT, HST, GST) are transactional based taxes that are required to be levied by service providers by most tax authorities.",
  indirectTaxDetails: "Indirect Tax Details",
  indirectTaxDetailsDescription:
    "Not sure if you are registered for indirect tax? Contact our Support team to find out more.",
  hstCanada: "I am registered for HST in Canada",
  otherRegion:
    "I am registered for Indirect Tax in a different Country / Region",
  notRegistered: "I am not registered for Indirect Tax",
  submitButton: "Continue",
  backButton: "Back",
  error: {
    generalTitle: "There was a problem submitting your information",
    generalDescription:
      "Please review your information and try again. If this problem continues, contact Support.",
    taxDetails: "This field is required",
  },
};

export const docusignFormText: DocusignFormViewProps["text"] = {
  formStep: "Step 3 of 4",
  taxForm: "Tax form",
  taxFormLabel: "{documentType} Tax Form",
  taxFormDescription:
    "Participants based in the US and partnering with US-based brands need to submit a {documentType} form.",
  notBasedInUS: "Not based in the US?",
  banner: "Complete and submit your tax form to save your information",
  checkboxLabel: "Form submission",
  checkboxDescription: "I have completed and submitted my tax form",
  submitButton: "Continue",
  backButton: "Back",
  error: {
    generalTitle: "There was a problem submitting your information",
    generalDescription:
      "Please review your information and try again. If this problem continues, contact Support.",
  },
};

export const documentTypeFormText: DocumentTypeFormViewProps["text"] = {
  formStep: "Step 3 of 4",
  taxForm: "Tax form",
  backButton: "Back",
  submitButton: "Continue",
  formLabel: "Select a tax form",
  w9Label: "W9",
  w9Description:
    "W9 For participants based in the US, joining the referral program of a US-based company.",
  w8Label: "W8-Ben",
  w8Description:
    "W8-BEN For individuals residing outside of the US, joining the referral program of a US-based company.",
  w8ELabel: "W8-BEN-E",
  w8EDescription:
    "W8-BEN-E For participants residing outside of the US who represent a business entity, joining the referral program of a US-based company.",
  error: {
    generalTitle: "There was a problem submitting your information",
    generalDescription:
      "Please review your information and try again. If this problem continues, contact Support.",
    formSubmission: "error",
  },
};

export const taxFormDocumentSubmittedText: TaxDocumentSubmittedProps["text"] = {
  statusTextActive: "Active",
  statusTextNotActive: "Invalid Tax Form",
  statusTextNotVerified: "Not Verified",
  statusTextExpired: "Expired",
  badgeTextSubmittedOn: "Submitted on {dateSubmitted}",
  badgeTextAwaitingReview: "Awaiting review. Submitted on {dateSubmitted}.",
  badgeTextExpiredOn: "Expired on {dateExpired}.",
  badgeTextExpiringSoon: ", expiring on {dateExpired}.",
  invalidForm:
    "Ensure your information matches your profile and resubmit a new document.",
  taxAlertHeaderNotActive:
    "Your {documentType} tax form has personal information that doesn't match your profile.",
  taxAlertHeaderExpiredOn: "Your {documentType} tax form has expired.",
  taxAlertHeaderExpiringSoon:
    "Your {documentType} tax form expires on {dateExpired}",
  taxAlertMessage: "Please resubmit a new {documentType} form.",
  taxAlertMessageExpiringSoon:
    "Please submit a new {documentType} form to continue receiving your rewards",
  bankingInformationSectionHeader: "Banking Information",
  taxDocumentSectionHeader: "Tax documents",
  taxDocumentSectionSubHeader: "{documentType} Tax Documents",
  newFormButton: "Submit New Form",
  error: {
    generalTitle: "There was a problem submitting your information",
    generalDescription:
      "Please review your information and try again. If this problem continues, contact Support.",
  },
};
