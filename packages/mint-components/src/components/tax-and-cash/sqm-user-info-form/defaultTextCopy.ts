import { IndirectDetailsSlotViewProps } from "./small-views/IndirectTaxDetailsView";
import { UserInfoFormViewProps } from "./sqm-user-info-form-view";
import { TaxDocumentSubmittedProps } from "../sqm-tax-document-submitted/sqm-tax-document-submitted-view";
import { IndirectTaxFormViewProps } from "../sqm-indirect-tax-form/sqm-indirect-tax-form-view";
import { DocumentTypeFormViewProps } from "../sqm-document-type-form/sqm-document-type-form-view";
import { DocusignFormViewProps } from "../sqm-docusign-form/sqm-docusign-form-view";

// ! IMPORTANT: These objects cannot be used as default values for component props
// !            Stencil doesn't handle the import when passing the prop default to raisins for editability.

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
    subRegionTaxNumber: "asdf", // TODO:
    selectedRegion: "Country is required",
    province: "Province is required",
    indirectTaxNumber: "Indirect Tax is required",
    subRegion: "Sub-region is required"
  },
};
