import { IndirectDetailsSlotViewProps } from "./small-views/IndirectTaxDetailsView";
import { TaxFormStepOneProps } from "./sqm-tax-form-step-1-view";

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
};
