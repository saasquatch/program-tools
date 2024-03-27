import { intl } from "../../global/global";
import { TaxDocumentType } from "./sqm-tax-and-cash/data";

export const objectIsFull = (obj: Record<string, unknown>) => {
  return !Object.keys(obj).find((k) => obj[k] == undefined);
};

export const taxTypeToName = (taxType: TaxDocumentType) => {
  switch (taxType) {
    case "W9":
      return "W-9";
    case "W8BEN":
      return "W-8 BEN";
    case "W8BENE":
      return "W-8 BEN-E";
    default:
      return "";
  }
};

export const getIsRequiredErrorMessage = (
  fieldName: string,
  errorMessage: string
) => {
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
