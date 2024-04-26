import { h } from "@stencil/core";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";
import { GeneralLoadingView } from "../TaxForm.stories";
import { FORM_STEPS } from "../sqm-tax-and-cash/data";
import { formatErrorMessage } from "../utils";

export interface UserInfoFormViewProps {
  states: {
    step?: string;
    loading: boolean;
    disabled: boolean;
    isPartner: boolean;
    isUser: boolean;
    hideSteps: boolean;
    hideState: boolean;
    loadingError?: boolean;
    formState: {
      firstName?: string;
      lastName?: string;
      email?: string;
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
    phoneExtension: string;
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
    taxAndPayoutsDescription: string;
    error: {
      generalTitle: string;
      generalDescription: string;
      addressInvalidCharacterError: string;
      phoneNumberInvalidError: string;
      fieldRequiredError: string;
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
      width: 450px;
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

  const bankingCollectionText = intl.formatMessage(
    {
      id: "bankingCollectionText",
      defaultMessage: text.allowBankingCollection,
    },
    {
      termsAndConditionsLink: (
        <a href="https://app.impact.com/" target="_blank">
          {text.termsAndConditionsLabel}
        </a>
      ),
    }
  );

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
            {text.error.loadingErrorAlertDescription}
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
              {text.error.generalDescription}
            </sl-alert>
          )}
          {(states.isPartner || states.isUser) && (
            <sl-alert
              type="primary"
              open
              class={sheet.classes.PartnerAlertContainer}
              exportparts="base: alert-base, icon:alert-icon"
            >
              <sl-icon slot="icon" name="info-circle"></sl-icon>
              <strong>{text.isPartnerAlertHeader}</strong>
              <br />
              {text.isPartnerAlertDescription}
            </sl-alert>
          )}

          <div>
            <div class={classes.InputContainer}>
              <sl-input
                exportparts="label: input-label"
                value={formState.firstName}
                label={text.firstName}
                disabled={states.disabled || states.isUser || states.isPartner}
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
                exportparts="label: input-label"
                value={formState.lastName}
                label={text.lastName}
                disabled={states.disabled || states.isUser || states.isPartner}
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
                exportparts="label: input-label"
                value={formState.email}
                label={text.email}
                disabled={true}
                id="email"
                name="/email"
                required
              />

              <sl-select
                id="countryCode"
                exportparts="label: input-label"
                name="/countryCode"
                label={text.country}
                value={formState.countryCode}
                disabled={states.disabled || states.isPartner}
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
              <div style={{ display: "flex", gap: "4px" }}>
                <sl-select
                  id="phoneNumberCountryCode"
                  exportparts="label: input-label"
                  name="/phoneNumberCountryCode"
                  label={text.phoneExtension}
                  value={formState.phoneNumberCountryCode}
                  disabled={states.disabled || states.isPartner}
                  ref={(el: HTMLFormElement) =>
                    (refs.phoneCountryRef.current = el)
                  }
                  // Hide error text since input is too small
                  {...(formState.errors?.phoneNumberCountryCode
                    ? {
                        class: classes.ErrorInput,
                        // helpText: formatErrorMessage(
                        //   text.phoneExtension,
                        //   formState.errors.phoneCountry
                        // ),
                      }
                    : {})}
                  required
                  onSl-select={(e) => callbacks.onFormChange("phoneCountry", e)}
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
                    <sl-menu-item
                      style={{ width: "500px" }}
                      value={c.countryCode}
                    >
                      <div
                        slot="prefix"
                        style={{ marginRight: "8px" }}
                      >{`${c.displayName} `}</div>
                      +111
                    </sl-menu-item>
                  ))}
                  {data?.allCountries?.map((c) => (
                    <sl-menu-item
                      value={c.countryCode}
                      style={{ display: "none" }}
                    >
                      <div
                        slot="prefix"
                        style={{ marginRight: "8px" }}
                      >{`${c.displayName} `}</div>
                      +1
                    </sl-menu-item>
                  ))}
                </sl-select>
                <sl-input
                  exportparts="label: input-label"
                  label={text.phoneNumber}
                  id="phoneNumber"
                  name="/phoneNumber"
                  style={{ width: "362px" }}
                  validationError={({ value }) =>
                    // Naive phone number validation
                    !/^[^A-Z]+$/i.test(value) &&
                    text.error.phoneNumberInvalidError
                  }
                  disabled={states.disabled || states.isPartner}
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
              <sl-input
                exportparts="label: input-label"
                label={text.address}
                id="address"
                name="/address"
                validationError={({ value }) =>
                  // Checks for non-ASCII characters
                  !/^[\x20-\xFF]+$/.test(value) &&
                  text.error.addressInvalidCharacterError
                }
                disabled={states.disabled || states.isPartner}
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
                exportparts="label: input-label"
                label={text.city}
                id="city"
                name="/city"
                disabled={states.disabled || states.isPartner}
                {...(formState.errors?.city
                  ? {
                      class: classes.ErrorInput,
                      helpText: formatErrorMessage(
                        text.city,
                        text.error.fieldRequiredError
                      ),
                    }
                  : {})}
                required
              ></sl-input>
              {!states.hideState && (
                <sl-select
                  label={regionLabel}
                  exportparts="label: input-label"
                  id="state"
                  name="/state"
                  disabled={states.disabled || states.isPartner}
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
                exportparts="label: input-label"
                id="postalCode"
                name="/postalCode"
                disabled={states.disabled || states.isPartner}
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
                exportparts="label: input-label"
                name="/currency"
                label={text.currency}
                menu
                value={formState.currency}
                disabled={states.disabled || states.isPartner}
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

              <div class={classes.CheckboxWrapper}>
                <sl-checkbox
                  exportparts="label: input-label"
                  checked={formState.allowBankingCollection === true}
                  onSl-change={(e) => {
                    e.target.value = e.target.checked;
                  }}
                  disabled={states.isPartner ? false : states.disabled}
                  required
                  value={formState.allowBankingCollection}
                  id="allowBankingCollection"
                  name="/allowBankingCollection"
                >
                  {bankingCollectionText}
                </sl-checkbox>
                {formState.errors?.allowBankingCollection && (
                  <p class={classes.ErrorText}>
                    {formatErrorMessage(
                      text.termsAndConditionsLabel,
                      formState.errors.allowBankingCollection
                    )}
                  </p>
                )}
              </div>
            </div>
            <sl-button
              type="primary"
              disabled={states.isPartner ? false : states.disabled}
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
