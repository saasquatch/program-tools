const SENSITIVE_FIELD_PATTERNS = [
  "name",
  "address",
  "city",
  "state",
  "province",
  "region",
  "postal",
  "zip",
  "phone",
  "tax",
  "account",
  "iban",
  "swift",
  "routing",
  "beneficiary",
  "paypal",
  "bank",
  "card",
  "payment",
];

export function shouldMaskSensitiveField(field?: string): boolean {
  if (!field) {
    return false;
  }

  const normalized = field.toLowerCase();
  return SENSITIVE_FIELD_PATTERNS.some((pattern) =>
    normalized.includes(pattern)
  );
}

export function sensitiveMaskAttrs(enabled: boolean): Record<string, string> {
  return enabled
    ? {
        "data-sqm-sensitive": "true",
      }
    : {};
}
