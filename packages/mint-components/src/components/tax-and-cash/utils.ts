import { CountryCode, parsePhoneNumberFromString } from "libphonenumber-js";
import { intl } from "../../global/global";
import { ImpactPublisher, TaxDocumentType } from "./data";

/**
 * Normalize user input to the domestic form Impact stores: digits only,
 * with the country dial code and trunk-zero prefix removed.
 */
export function toDomesticNumber(
  phoneCountryCode: string | undefined,
  input: string | undefined,
): string {
  if (!input) return "";
  const parsed = parsePhoneNumberFromString(
    input,
    phoneCountryCode?.toUpperCase() as CountryCode,
  );
  return (parsed?.nationalNumber as string) ?? input.replace(/\D/g, "");
}

/**
 * Validates a phone number against both libphonenumber-js's per-country
 * pattern rules AND Impact's I18nPhoneNumber length rules, applied to the
 * sanitized value we'll submit.
 */
export function isValidI18nPhoneNumber(
  phoneCountryCode: string | undefined,
  phoneNumber: string | undefined,
): boolean {
  if (!phoneCountryCode || !phoneNumber?.trim()) return false;
  const country = phoneCountryCode.toUpperCase() as CountryCode;
  const parsed = parsePhoneNumberFromString(phoneNumber, country);
  if (!parsed?.isValid()) return false;
  return passesImpactBackendLengthCheck(
    country,
    toDomesticNumber(country, phoneNumber),
  );
}

/**
 * Mirrors estalea.bucket.phone.I18nPhoneNumber.isValidI18nPhoneNumber()
 * length rules on the already-sanitized (digits-only) submission value.
 */
function passesImpactBackendLengthCheck(
  country: string,
  digits: string,
): boolean {
  if (!digits) return false;
  switch (country) {
    case "US":
    case "CA": {
      const n = digits.startsWith("1") ? digits.slice(1) : digits;
      return n.length === 10;
    }
    case "AU":
      return digits.length === 9 || digits.length === 10;
    case "NZ": {
      let n = digits;
      if (n.length > 9) {
        if (n.startsWith("640")) n = n.slice(3);
        else if (n.startsWith("0")) n = n.slice(1);
      }
      return n.length >= 8 && n.length <= 10;
    }
    default:
      return stripLeadingZero(digits).length >= 6;
  }
}

function stripLeadingZero(digits: string): string {
  return digits.startsWith("0") ? digits.slice(1) : digits;
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
    },
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

/** The minimum balance Impact requires before it will issue a payout, e.g. "USD50.00". */
export function formatPayoutThreshold(
  publisher: ImpactPublisher | null | undefined,
): string | undefined {
  const threshold = publisher?.withdrawalSettings?.paymentThreshold;
  if (!threshold) return undefined;

  return `${publisher?.currency ?? ""}${threshold}`;
}

/** Impact reports balance and threshold as decimal strings; no threshold means no minimum applies. */
export function isBalanceUnderPayoutThreshold(
  publisher: ImpactPublisher | null | undefined,
): boolean {
  if (!publisher?.withdrawalSettings?.paymentThreshold) return false;

  const threshold = Number(publisher.withdrawalSettings.paymentThreshold);
  const balance = Number(publisher.payoutsAccount?.balance);
  if (!Number.isFinite(threshold) || !Number.isFinite(balance)) return false;

  return balance < threshold;
}
