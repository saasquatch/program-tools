import { IndirectDetailsSlotViewProps } from "./small-views/IndirectTaxDetailsView";

// ! IMPORTANT: These objects cannot be used as default values for component props
// !            Stencil doesn't handle the import when passing the prop default to raisins for editability.
// !            Therefore, this is for storybook only.

export const indirectDetailsSlotText: IndirectDetailsSlotViewProps["text"] = {
  selectedRegion: "Country / Region of Indirect Tax",
  province: "Province",
  indirectTaxNumber: "Indirect Tax",
  isRegisteredQST: "I am registered for QST Tax",
  isRegisteredSubRegionIncomeTax:
    "I am an individual registered for Income Tax purposes in Spain, and withholding tax will apply to any payments made to me.",
  qstNumber: "QST Number",
  subRegion: "Sub-region",
  subRegionTaxNumberLabel: "Income Tax Number",
  error: {
    indirectTaxNumber: "Indirect Tax is required",
    fieldRequiredError: "{fieldName} is required",
  },
};
