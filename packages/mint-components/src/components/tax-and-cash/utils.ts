import { intl } from "../../global/global";
import { TaxDocumentType } from "./data";
import { PHONE_EXTENSIONS } from "./phoneExtensions";

function stripLeadingZero(d: string) {
  return d.startsWith("0") ? d.slice(1) : d;
}

/**
 * Mirrors Impact's I18nPhoneNumberParams validation rules per country.
 * Returns true when the phone number is valid for the given the phoneNumberCountryCode country.
 */
export function isValidI18nPhoneNumber(
  phoneCountryCode: string | undefined,
  phoneNumber: string | undefined
): boolean {

  if (!phoneCountryCode || !phoneNumber?.trim()) return false;

  const country = phoneCountryCode.toUpperCase();
  const digits = phoneNumber.replace(/\D/g, "");

  switch (country) {
    case "US":
    case "CA": {
      // strip a single leading "1", then exactly 10 digits
      const n = digits.startsWith("1") ? digits.slice(1) : digits;
      return n.length === 10;
    }
    case "AU":
      // 9 or 10 digits
      return digits.length === 9 || digits.length === 10;
    case "NZ": {
      // trim "640" country prefix or leading "0" (only when >9 digits),
      // then 8–10 digits
      let n = digits;
      if (n.length > 9) {
        if (n.startsWith("640")) n = n.slice(3);
        else if (n.startsWith("0")) n = n.slice(1);
      }
      return n.length >= 8 && n.length <= 10;
    }
    case "GB":
      // >= 6 digits after stripping a single leading "0", no dialing-code check
      return stripLeadingZero(digits).length >= 6;
    default: {
      // All other countries: strip a single leading "0", then >= 6 digits
      if (stripLeadingZero(digits).length < 6) return false;
      // If input starts with "+", the dialing code (first whitespace-split
      // token) must match the selected country exactly. Splits on first
      // whitespace, so "+4420 7946 0958" supplies "4420" (not "44") and fails.
      if (phoneNumber.trim().startsWith("+")) {
        const supplied = phoneNumber.trim().split(/\s/)[0].slice(1);
        const expected = PHONE_EXTENSIONS[country]?.dial_code?.replace(
          /^\+/,
          ""
        );
        return expected === supplied;
      }
      return true;
    }
  }
}

export function validTaxDocument(requiredType: TaxDocumentType | undefined) {
  const validTypes = ["W9", "W8BENE", "W8BEN"];
  if (validTypes.includes(requiredType)) return true;
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
