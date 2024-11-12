import { intl } from "../../global/global";
import { TaxDocumentType } from "./sqm-tax-and-cash/data";

export function validTaxDocument(
  requiredType: TaxDocumentType | undefined,
  currentType: TaxDocumentType | undefined
) {
  if (requiredType === "W9" && currentType === "W9") return true;
  if (
    (requiredType === "W8BEN" || requiredType === "W8BENE") &&
    (currentType === "W8BEN" || currentType === "W8BENE")
  )
    return true;
  return false;
}

export const objectIsFull = (obj: Record<string, unknown>) => {
  return !Object.keys(obj).find((k) => obj[k] == undefined);
};

export const taxTypeToName = (taxType: TaxDocumentType) => {
  switch (taxType) {
    case "W9":
      return "W-9";
    case "W8BEN":
    case "W8BENE":
      return "W-8";
    default:
      return "";
  }
};

export function validateBillingField(regex: RegExp, value: string) {
  const trimmed = value.trim();
  const idx = trimmed.search(regex);

  return idx > -1;
}

export const formatErrorMessage = (fieldName: string, errorMessage: string) => {
  return intl.formatMessage(
    {
      id: fieldName,
      defaultMessage: errorMessage,
    },
    {
      fieldName,
    }
  );
};

export function getCountryObj({
  countryCode,
  locale,
}: {
  countryCode: string;
  locale: string;
}) {
  // @ts-ignore DisplayNames not in Intl type
  const displayName = new Intl.DisplayNames([locale], {
    type: "region",
  }).of(countryCode);

  return {
    countryCode,
    displayName,
  };
}
