// 3 = ACH
// 5 = WIRE
// 7 = PAYPAL
type PaymentOptions = {
  [key: string]: {
    countryCode: string;
    currency: string;
    defaultFinancePaymentMethodId: 3 | 5 | 7;
    withdrawalSettingId: number;
    defaultFxFee?: number;
  }[];
};

export const mockPaymentOptions: PaymentOptions = {
  CAD: [
    {
      countryCode: "CA",
      currency: "CAD",
      defaultFinancePaymentMethodId: 3,
      withdrawalSettingId: 37,
    },
    {
      countryCode: "CA",
      currency: "CAD",
      defaultFinancePaymentMethodId: 7,
      withdrawalSettingId: 37,
    },
  ],
  AUD: [
    {
      countryCode: "US",
      currency: "AUD",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 23,
    },
    {
      countryCode: "CA",
      currency: "AUD",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 21,
    },
    {
      countryCode: "ES",
      currency: "AUD",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 25,
    },
    {
      countryCode: "IE",
      currency: "AUD",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 25,
    },
    {
      countryCode: "GB",
      currency: "AUD",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 25,
    },
    {
      countryCode: "JP",
      currency: "AUD",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 21,
    },
    {
      countryCode: "AR",
      currency: "AUD",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 21,
    },
    {
      countryCode: "AU",
      currency: "AUD",
      defaultFinancePaymentMethodId: 3,
      withdrawalSettingId: 37,
    },
    {
      countryCode: "AU",
      currency: "AUD",
      defaultFinancePaymentMethodId: 7,
      withdrawalSettingId: 37,
    },
  ],
  EUR: [
    {
      countryCode: "US",
      currency: "EUR",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 23,
    },
    {
      countryCode: "CA",
      currency: "EUR",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 21,
    },
    {
      countryCode: "ES",
      currency: "EUR",
      defaultFinancePaymentMethodId: 3,
      withdrawalSettingId: 25,
    },
    {
      countryCode: "IE",
      currency: "EUR",
      defaultFinancePaymentMethodId: 3,
      withdrawalSettingId: 25,
    },
    {
      countryCode: "GB",
      currency: "EUR",
      defaultFinancePaymentMethodId: 3,
      withdrawalSettingId: 25,
    },
    {
      countryCode: "JP",
      currency: "EUR",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 21,
    },
    {
      countryCode: "AU",
      currency: "EUR",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 21,
    },
    {
      countryCode: "AR",
      currency: "EUR",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 21,
    },
    {
      countryCode: "NL",
      currency: "EUR",
      defaultFinancePaymentMethodId: 7,
      withdrawalSettingId: 25,
    },
  ],
  GBP: [
    {
      countryCode: "US",
      currency: "GBP",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 23,
    },
    {
      countryCode: "CA",
      currency: "GBP",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 21,
    },
    {
      countryCode: "ES",
      currency: "GBP",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 25,
    },
    {
      countryCode: "IE",
      currency: "GBP",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 25,
    },
    {
      countryCode: "GB",
      currency: "GBP",
      defaultFinancePaymentMethodId: 3,
      withdrawalSettingId: 25,
    },
    {
      countryCode: "JP",
      currency: "GBP",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 21,
    },
    {
      countryCode: "AU",
      currency: "GBP",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 21,
    },
    {
      countryCode: "AR",
      currency: "GBP",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 21,
    },
    {
      countryCode: "GB",
      currency: "GBP",
      defaultFinancePaymentMethodId: 7,
      withdrawalSettingId: 25,
    },
  ],
  USD: [
    {
      countryCode: "US",
      currency: "USD",
      defaultFinancePaymentMethodId: 3,
      withdrawalSettingId: 39,
    },
    {
      countryCode: "CA",
      currency: "USD",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 21,
    },
    {
      countryCode: "ES",
      currency: "USD",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 25,
    },
    {
      countryCode: "IE",
      currency: "USD",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 25,
    },
    {
      countryCode: "GB",
      currency: "USD",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 25,
    },
    {
      countryCode: "JP",
      currency: "USD",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 21,
    },
    {
      countryCode: "AU",
      currency: "USD",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 21,
    },
    {
      countryCode: "AR",
      currency: "USD",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 21,
    },
    {
      countryCode: "US",
      currency: "USD",
      defaultFinancePaymentMethodId: 7,
      withdrawalSettingId: 39,
    },
  ],
  JPY: [
    {
      countryCode: "JP",
      currency: "JPY",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 8279,
    },
    {
      countryCode: "JP",
      currency: "JPY",
      defaultFinancePaymentMethodId: 7,
      withdrawalSettingId: 8279,
    },
  ],
  KRW: [
    {
      countryCode: "KR",
      currency: "KRW",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 149,
    },
  ],
  MYR: [
    {
      countryCode: "MY",
      currency: "MYR",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 16405,
    },
  ],
  MXN: [
    {
      countryCode: "MX",
      currency: "MXN",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 4181,
    },
    {
      countryCode: "MX",
      currency: "MXN",
      defaultFinancePaymentMethodId: 7,
      withdrawalSettingId: 4181,
    },
  ],
  RUB: [
    {
      countryCode: "RU",
      currency: "RUB",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 1685,
    },
    {
      countryCode: "RU",
      currency: "RUB",
      defaultFinancePaymentMethodId: 7,
      withdrawalSettingId: 1717,
    },
  ],
  ARS: [
    {
      countryCode: "AR",
      currency: "ARS",
      defaultFinancePaymentMethodId: 5,
      withdrawalSettingId: 149,
    },
  ],
};
