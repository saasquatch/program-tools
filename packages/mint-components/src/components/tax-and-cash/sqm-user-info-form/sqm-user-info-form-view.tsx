import { h } from "@stencil/core";
import { AsYouType, CountryCode } from "libphonenumber-js";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";
import { GeneralLoadingView } from "../TaxForm.stories";
import { FORM_STEPS, ImpactPublisher, ImpactUser } from "../sqm-tax-and-cash/data";
import {
  formatErrorMessage,
  isValidI18nPhoneNumber,
  validateBillingField,
} from "../utils";
import { PHONE_EXTENSIONS } from "../phoneExtensions";

export interface UserInfoFormViewProps {
  states: {
    step?: string;
    loading: boolean;
    disabled: boolean;
    isPartner: boolean;
    isUser: boolean;
    isPartnerLegacy: boolean;
    isUserLegacy: boolean;
    hideSteps: boolean;
    hideState: boolean;
    loadingError?: boolean;
    formState: {
      firstName?: string;
      lastName?: string;
      email?: string;
      address?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      phoneNumber?: string;
      phoneNumberCountryCode?: string;
      countryCode?: string;
      currency?: string;
      allowBankingCollection?: boolean;
      errors?: {
        general?: string;
        firstName?: string;
        lastName?: string;
        countryCode?: string;
        currency?: string;
        address?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        phoneNumberCountryCode?: string;
        phoneNumber?: string;
        allowBankingCollection?: string;
      };
      error?: string;
    };
  };
  data: {
    regionLabelEnum: "STATE" | "REGION" | "PROVINCE" | undefined;
    regions: { label: string; value: string }[];
    countries: {
      countryCode: string;
      displayName: string;
    }[];
    phoneCountries: {
      countryCode: string;
      displayName: string;
    }[];
    allCountries: {
      countryCode: string;
      displayName: string;
    }[];
    allCurrencies: {
      currencyCode: string;
      displayName: string;
    }[];
    currencies: {
      currencyCode: string;
      displayName: string;
    }[];
    partnerData?: ImpactPublisher;
    userData?: ImpactUser;
  };
  callbacks: {
    setCurrencySearch: (c: any) => void;
    setCountrySearch: (c: any) => void;
    setPhoneCountrySearch: (c: any) => void;
    onSubmit: (props: any) => void;
    onFormChange: (field: string, e: CustomEvent) => void;
  };
  text: {
    formStep: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    province: string;
    region: string;
    postalCode: string;
    currency: string;
    currencyHelpText: string;
    allowBankingCollection: string;
    personalInformation: string;
    continueButton: string;
    isPartnerAlertHeader: string;
    isPartnerAlertDescription: string;
    termsAndConditionsLabel: string;
    termsAndConditionsLink: string;
    taxAndPayoutsDescription: string;
    supportLink: string;
    error: {
      generalTitle: string;
      generalDescription: string;
      invalidCharacterError: string;
      fieldRequiredError: string;
      fieldInvalidError: string;
      loadingErrorAlertHeader: string;
      loadingErrorAlertDescription: string;
    };
    searchForCountryText: string;
    searchForCurrencyText: string;
  };
  refs: {
    formRef: any;
    currencyRef: any;
    phoneCountryRef: any;
  };
}

const style = {
  FormWrapper: {},
  ErrorInput: {
    "&::part(base)": {
      border: "1px solid var(--sl-color-danger-500)",
      borderRadius: "var(--sl-input-border-radius-medium)",
    },

    "&::part(help-text)": {
      color: "var(--sl-color-danger-500)",
    },
  },
  ErrorText: {
    color: "var(--sl-color-danger-500)",
    marginTop: "10px",
  },
  TextContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: "24px",
    paddingBottom: "16px",
  },

  InputContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: "24px",
    paddingBottom: "36px",
    maxWidth: "450px",
  },
  SearchInput: {
    padding: "var(--sl-spacing-x-small)",
  },
  BtnContainer: {
    paddingTop: "36px",
    display: "flex",
    gap: "8px",
  },
  CheckboxWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  DescriptionText: {
    color: "var(--sl-color-neutral-500)",
  },

  BoldText: {
    fontWeight: "bold",
  },
  RoundedCheckbox: {
    "&::part(control)": {
      borderRadius: "50%",
    },
  },
  AlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-red-100)",
      borderTop: "none",
      padding: "0 16px",
    },

    "& sl-icon::part(base)": {
      color: "var(--sl-color-danger-500)",
    },
  },
  PartnerAlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-sky-100)",
      borderTop: "none",
      padding: "0 16px",
    },
    "& sl-icon::part(base)": {
      color: "var(--sl-color-blue-500)",
    },
  },
  PageDescriptionText: {
    color: "var(--sl-color-neutral-500)",
    fontSize: "var(--sl-font-size-medium)",
  },

  PhoneInputsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    "& p": {
      fontSize: "var(--sl-font-size-small)",
      color: "var(--sl-input-label-color)",
      fontWeight: "var(--sl-font-weight-semibold)",
    },
  },

  PhoneInputsContainer: {
    display: "flex",
    gap: "4px",
    width: "100%",

    "& #phoneNumber": {
      width: "100%",
      minWidth: "0px",
    },
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const vanillaStyle = `
    :host{
      display: block;   
    }
    * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
    }

    p {
      line-height: 18px;
      color: var(--sl-color-gray-800);
       font-size: var(--sl-font-size-small);
    }

    sl-radio-group::part(base) {
      display: flex;
      flex-direction: column;
    }

    sl-select#phoneNumberCountryCode::part(menu) {
      min-width: 250px;
    }
  `;

export const UserInfoFormView = (props: UserInfoFormViewProps) => {
  const {
    states,
    states: { formState },
    callbacks,
    text,
    refs,
    data,
  } = props;
  const { classes } = sheet;

  // T&C / banking-collection checkbox lives on sqm-partner-info-modal now.

  let regionLabel = undefined;
  switch (data.regionLabelEnum) {
    case "STATE":
      regionLabel = text.state;
      break;
    case "PROVINCE":
      regionLabel = text.province;
      break;
    case "REGION":
      regionLabel = text.region;
      break;
    default:
      regionLabel = text.state;
  }

  // when creating an impact connection without sending phoneNumber data, the impactAPI defaults the value to "0000000" and the phoneNumberCountryCode to "DZ"
  function isDisabledPartnerInput(field: string) {
    if (
      data.partnerData?.phoneNumber === "0000000" &&
      (field === "phoneNumber" || field === "phoneNumberCountryCode")
    ) {
      return false;
    }
    // if bad phone number was previously saved, unlock the field so user can correct it
    if (
      (field === "phoneNumber" || field === "phoneNumberCountryCode") &&
      states.isPartner &&
      !isValidI18nPhoneNumber(
        data.partnerData?.phoneNumberCountryCode,
        data.partnerData?.phoneNumber
      )
    ) {
      return false;
    }
    return states.isPartner && !!data.partnerData?.[field];
  }

  function isDisabledUserInput(field: string) {
    return states.isUser && !!data.userData?.[field];
  }

  return (
    <sl-form
      class={classes.FormWrapper}
      onSl-submit={callbacks.onSubmit}
      ref={(el: HTMLFormElement) => (refs.formRef.current = el)}
      novalidate
    >
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      {states.loadingError && (
        <div>
          <sl-alert
            exportparts="base: alert-base, icon:alert-icon"
            type="danger"
            open
            class={sheet.classes.AlertContainer}
          >
            <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
            <strong>{text.error.loadingErrorAlertHeader}</strong>
            <br />
            {intl.formatMessage(
              {
                id: "loadingErrorAlertDescription",
                defaultMessage: text.error.loadingErrorAlertDescription,
              },
              {
                supportLink: (
                  <a
                    target="_blank"
                    href={`mailto:advocate-support@impact.com`}
                  >
                    {text.supportLink}
                  </a>
                ),
              }
            )}
          </sl-alert>
          <br />
        </div>
      )}
      {states.loading ? (
        <GeneralLoadingView />
      ) : (
        <div>
          <div class={classes.TextContainer}>
            <div>
              {!states.hideSteps && (
                <p>
                  {intl.formatMessage(
                    {
                      id: "formStep",
                      defaultMessage: text.formStep,
                    },
                    { step: states.step, count: FORM_STEPS }
                  )}
                </p>
              )}
              <h3>{text.personalInformation}</h3>
              <p class={classes.PageDescriptionText}>
                {text.taxAndPayoutsDescription}
              </p>
            </div>
          </div>
          {formState.errors?.general && (
            <sl-alert
              exportparts="base: alert-base, icon:alert-icon"
              type="warning"
              open
              class={sheet.classes.AlertContainer}
            >
              <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
              <strong>{text.error.generalTitle}</strong>
              <br />
              {intl.formatMessage(
                {
                  id: "generalDescription",
                  defaultMessage: text.error.generalDescription,
                },
                {
                  supportLink: (
                    <a
                      target="_blank"
                      href={`mailto:advocate-support@impact.com`}
                    >
                      {text.supportLink}
                    </a>
                  ),
                }
              )}
            </sl-alert>
          )}
          {(states.isPartnerLegacy || states.isUserLegacy) && (
            <sl-alert
              type="primary"
              open
              class={sheet.classes.PartnerAlertContainer}
              exportparts="base: alert-base, icon:alert-icon"
            >
              <sl-icon slot="icon" name="info-circle"></sl-icon>
              <strong>{text.isPartnerAlertHeader}</strong>
              <br />
              {intl.formatMessage(
                {
                  id: "isPartnerAlertDescription",
                  defaultMessage: text.isPartnerAlertDescription,
                },
                {
                  supportLink: (
                    <a
                      target="_blank"
                      href={`mailto:advocate-support@impact.com`}
                    >
                      {text.supportLink}
                    </a>
                  ),
                }
              )}
            </sl-alert>
          )}

          <div>
            <div class={classes.InputContainer}>
              <sl-input
                exportparts="label: input-label, base: input-base"
                value={formState.firstName}
                label={text.firstName}
                disabled={states.disabled || isDisabledUserInput("firstName")}
                {...(formState.errors?.firstName
                  ? {
                      class: classes.ErrorInput,
                      helpText: formatErrorMessage(
                        text.firstName,
                        formState.errors.firstName
                      ),
                    }
                  : {})}
                id="firstName"
                name="/firstName"
                required
              />
              <sl-input
                exportparts="label: input-label, base: input-base"
                value={formState.lastName}
                label={text.lastName}
                disabled={states.disabled || isDisabledUserInput("lastName")}
                {...(formState.errors?.lastName
                  ? {
                      class: classes.ErrorInput,
                      helpText: formatErrorMessage(
                        text.lastName,
                        formState.errors.lastName
                      ),
                    }
                  : {})}
                id="lastName"
                name="/lastName"
                required
              />
              <sl-input
                exportparts="label: input-label, base: input-base"
                value={formState.email}
                label={text.email}
                disabled={true}
                id="email"
                name="/email"
                required
              />

              <sl-select
                id="countryCode"
                exportparts="label: input-label, base: input-base"
                name="/countryCode"
                label={text.country}
                value={formState.countryCode}
                disabled={
                  states.disabled || isDisabledPartnerInput("countryCode")
                }
                {...(formState.errors?.countryCode
                  ? {
                      class: classes.ErrorInput,
                      helpText: formatErrorMessage(
                        text.country,
                        formState.errors.countryCode
                      ),
                    }
                  : {})}
                required
                onSl-select={(e) => callbacks.onFormChange("countryCode", e)}
              >
                <sl-input
                  class={classes.SearchInput}
                  placeholder={text.searchForCountryText}
                  onKeyDown={(e) => {
                    // Stop shoelace intercepting key presses
                    e.stopPropagation();
                  }}
                  onSl-input={(e) => {
                    callbacks.setCountrySearch(e.target.value);
                  }}
                ></sl-input>
                {data?.countries?.map((c) => (
                  <sl-menu-item value={c.countryCode}>
                    {c.displayName}
                  </sl-menu-item>
                ))}
                {data?.allCountries?.map((c) => (
                  <sl-menu-item
                    value={c.countryCode}
                    style={{ display: "none" }}
                  >
                    {c.displayName}
                  </sl-menu-item>
                ))}
              </sl-select>
              <div class={classes.PhoneInputsSection}>
                <p>{text.phoneNumber}</p>
                <div class={classes.PhoneInputsContainer}>
                  <sl-select
                    id="phoneNumberCountryCode"
                    exportparts="label: input-label, base: input-base"
                    name="/phoneNumberCountryCode"
                    value={formState.phoneNumberCountryCode}
                    disabled={
                      states.disabled ||
                      isDisabledPartnerInput("phoneNumberCountryCode")
                    }
                    ref={(el: HTMLFormElement) =>
                      (refs.phoneCountryRef.current = el)
                    }
                    // Hide error text since input is too small
                    {...(formState.errors?.phoneNumberCountryCode
                      ? {
                          class: classes.ErrorInput,
                        }
                      : {})}
                    required
                    onSl-select={(e) =>
                      callbacks.onFormChange("phoneCountry", e)
                    }
                  >
                    <sl-input
                      class={classes.SearchInput}
                      placeholder={text.searchForCountryText}
                      onKeyDown={(e) => {
                        // Stop shoelace intercepting key presses
                        e.stopPropagation();
                      }}
                      onSl-input={(e) => {
                        callbacks.setPhoneCountrySearch(e.target.value);
                      }}
                    ></sl-input>
                    {data?.phoneCountries?.map((c) => (
                      <sl-menu-item value={c.countryCode}>
                        <div slot="prefix">{`${
                          PHONE_EXTENSIONS[c.countryCode]?.name
                        } `}</div>
                        {PHONE_EXTENSIONS[c.countryCode]?.dial_code}
                      </sl-menu-item>
                    ))}
                    {data?.allCountries?.map((c) => (
                      <sl-menu-item
                        value={c.countryCode}
                        style={{ display: "none" }}
                      >
                        <div slot="prefix">{`${
                          PHONE_EXTENSIONS[c.countryCode]?.name
                        } `}</div>
                        {PHONE_EXTENSIONS[c.countryCode]?.dial_code}
                      </sl-menu-item>
                    ))}
                  </sl-select>
                  <sl-input
                    exportparts="label: input-label, base: input-base"
                    id="phoneNumber"
                    name="/phoneNumber"
                    value={
                      formState.phoneNumber !== null
                        ? formState.phoneNumber
                        : ""
                    }
                    onSl-input={(e) => {
                      const target = e.target as HTMLInputElement;
                      const country = ((refs.phoneCountryRef.current
                        ?.value as string) || "US") as CountryCode;
                      target.value = new AsYouType(country).input(
                        target.value
                      );
                    }}
                    validationError={({ control, value, formData }) => {
                      // skip validation for values the user can't edit
                      if (control?.disabled) return undefined;
                      if (!value?.trim()) return undefined;
                      return isValidI18nPhoneNumber(
                        formData.phoneNumberCountryCode,
                        value
                      )
                        ? undefined
                        : formatErrorMessage(
                            text.phoneNumber,
                            text.error.fieldInvalidError
                          );
                    }}
                    disabled={
                      states.disabled || isDisabledPartnerInput("phoneNumber")
                    }
                    {...(formState.errors?.phoneNumber
                      ? {
                          class: classes.ErrorInput,
                          helpText: formatErrorMessage(
                            text.phoneNumber,
                            formState.errors.phoneNumber
                          ),
                        }
                      : {})}
                    required
                  ></sl-input>
                </div>
              </div>
              <sl-input
                exportparts="label: input-label, base: input-base"
                label={text.address}
                id="address"
                name="/address"
                value={formState.address}
                validationError={({ value }) =>
                  // Checks for non-ASCII characters
                  !validateBillingField(/^[\x20-\xFF]+$/, value) &&
                  formatErrorMessage(
                    text.address,
                    text.error.invalidCharacterError
                  )
                }
                disabled={
                  states.disabled || isDisabledPartnerInput("billingAddress")
                }
                {...(formState.errors?.address
                  ? {
                      class: classes.ErrorInput,
                      helpText: formatErrorMessage(
                        text.address,
                        formState.errors.address
                      ),
                    }
                  : {})}
                required
              ></sl-input>
              <sl-input
                exportparts="label: input-label, base: input-base"
                label={text.city}
                id="city"
                name="/city"
                value={formState.city}
                validationError={({ value }) =>
                  // Checks for non-ASCII characters
                  !validateBillingField(/^[\x20-\xFF]+$/, value) &&
                  formatErrorMessage(
                    text.city,
                    text.error.invalidCharacterError
                  )
                }
                disabled={
                  states.disabled || isDisabledPartnerInput("billingCity")
                }
                {...(formState.errors?.city
                  ? {
                      class: classes.ErrorInput,
                      helpText: formatErrorMessage(
                        text.city,
                        formState.errors.city
                      ),
                    }
                  : {})}
                required
              ></sl-input>
              {!states.hideState && (
                <sl-select
                  label={regionLabel}
                  exportparts="label: input-label, base: input-base"
                  id="state"
                  name="/state"
                  value={formState.state}
                  disabled={
                    states.disabled || isDisabledPartnerInput("billingState")
                  }
                  {...(formState.errors?.state
                    ? {
                        class: classes.ErrorInput,
                        helpText: formatErrorMessage(
                          text.state,
                          formState.errors.state
                        ),
                      }
                    : {})}
                  required
                >
                  {data.regions?.map((r) => (
                    <sl-menu-item value={r.value}>{r.label}</sl-menu-item>
                  ))}
                </sl-select>
              )}
              <sl-input
                label={text.postalCode}
                exportparts="label: input-label, base: input-base"
                id="postalCode"
                name="/postalCode"
                value={formState.postalCode}
                disabled={
                  states.disabled ||
                  isDisabledPartnerInput("billingPostalCode")
                }
                {...(formState.errors?.postalCode
                  ? {
                      class: classes.ErrorInput,
                      helpText: formatErrorMessage(
                        text.postalCode,
                        formState.errors.postalCode
                      ),
                    }
                  : {})}
                required
              ></sl-input>
              <sl-select
                id="currency"
                exportparts="label: input-label, base: input-base"
                name="/currency"
                label={text.currency}
                menu
                value={formState.currency}
                disabled={states.disabled || isDisabledPartnerInput("currency")}
                helpText={text.currencyHelpText}
                {...(formState.errors?.currency
                  ? {
                      class: classes.ErrorInput,
                      helpText: formatErrorMessage(
                        text.currency,
                        formState.errors.currency
                      ),
                    }
                  : {})}
                required
                ref={(el: HTMLFormElement) => (refs.currencyRef.current = el)}
              >
                <sl-input
                  class={classes.SearchInput}
                  placeholder={text.searchForCurrencyText}
                  onKeyDown={(e) => {
                    // Stop shoelace intercepting key presses
                    e.stopPropagation();
                  }}
                  onSl-input={(e) => {
                    callbacks.setCurrencySearch(e.target.value);
                  }}
                />
                {data?.currencies?.map((c) => (
                  <sl-menu-item value={c.currencyCode}>
                    {c.currencyCode} - {c.displayName}
                  </sl-menu-item>
                ))}
                {data?.allCurrencies?.map((c) => (
                  <sl-menu-item
                    value={c.currencyCode}
                    style={{ display: "none" }}
                  >
                    {c.currencyCode} - {c.displayName}
                  </sl-menu-item>
                ))}
              </sl-select>
            </div>
            <sl-button
              type="primary"
              disabled={states.disabled}
              submit
              exportparts="base: primarybutton-base"
            >
              {text.continueButton}
            </sl-button>
          </div>
        </div>
      )}
    </sl-form>
  );
};
