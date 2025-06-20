import { h } from "@stencil/core";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";
import { GeneralLoadingView } from "../TaxForm.stories";
import { FORM_STEPS } from "../sqm-tax-and-cash/data";
import { formatErrorMessage, validateBillingField } from "../utils";
import { PHONE_EXTENSIONS } from "../phoneExtensions";

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
      border: "1px solid var(--sqm-danger-color-icon)",
      borderRadius: "var(--sl-input-border-radius-medium)",
    },

    "&::part(help-text)": {
      color: "var(--sqm-danger-color-icon)",
    },
  },
  ErrorText: {
    color: "var(--sqm-danger-color-icon)",
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
      backgroundColor: "var(--sqm-danger-color-background)",
      border: "none",
      padding: "0 16px",
      color: "var(--sqm-danger-color-text)",
      marginBottom: "16px",
    },

    "& sl-icon::part(base)": {
      color: "var(--sqm-danger-color-icon)",
    },
  },
  PartnerAlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sqm-informative-color-background)",
      borderTop: "none",
      padding: "0 16px",
      border: "none",
      color: "var(--sqm-informative-color-text)",
      marginBottom: "16px",
    },

    "& sl-icon::part(base)": {
      color: "var(--sqm-informative-color-icon)",
    },
  },
  PageDescriptionText: {
    color: "var(--sqm-text-subdued)",
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
    a {
      color: var(--sqm-text);
      color: inherit !important;
      text-decoration: underline;
    }

    p {
      line-height: 18px;
      font-size: var(--sl-font-size-small);
    }

    sl-radio-group::part(base) {
      display: flex;
      flex-direction: column;
    }

    sl-select#phoneNumberCountryCode::part(menu) {
      min-width: 250px;
    }

    /* Corrected: Target sl-button::part(base) for primary button */
    sl-button[type="primary"]::part(base){
        background-color: var(--sqm-primary-button-background);
        color: var(--sqm-primary-button-color);
        border-color: var(--sqm-primary-button-color-border);
        border-radius: var(--sqm-primary-button-radius);
    }

    sl-button[type="primary"]::part(base):hover{
        background-color: var(--sqm-primary-button-background-hover);
    }

    sl-button[type="primary"]::part(base):focus{
        box-shadow: none;
    }

    /* Corrected: Target sl-button::part(base) for secondary button */
    sl-button[type="secondary"]::part(base){
        background-color: var(--sqm-secondary-button-background);
        color: var(--sqm-secondary-button-color);
        border-color: var(--sqm-secondary-button-color-border);
        border-radius: var(--sqm-secondary-button-radius);
    }

    sl-button[type="secondary"]::part(base):hover{
        background-color: var(--sqm-secondary-button-background-hover);
    }

    /* Corrected: Target sl-button::part(base) for tertiary button */
    sl-button[type="tertiary"]::part(base){
        color: var(--sqm-text, var(--sl-color-neutral-800));
        width: max-content;
        display: flex;
        margin: auto;
    }

    sl-button[type="tertiary"]::part(base):hover{
        color: #1ed760;
    }

    /* Corrected: This rule was duplicated and possibly redundant, ensure only one focus rule for primary buttons */
    /* If you only have one primary button, this is the better way to apply global button styling */
    /* sl-button[type="primary"]::part(base):focus{
        box-shadow: none;
    } */


    /* Corrected: Target sl-input, sl-select, sl-textarea labels */
    sl-input::part(label),
    sl-select::part(label),
    sl-textarea::part(label){
      font-size: var(--sqm-input-label-font-size, var(--sl-input-font-size-small));
      font-weight: var(--sl-font-weight-semibold);
      color: var(--sqm-input-label-color, var(--sqm-text), black);
    }

    /* Corrected: Target sl-input, sl-select, sl-textarea base elements */
    sl-input::part(base),
    sl-dropdown::part(base),
    sl-textarea::part(base){
      background-color: var(--sqm-input-background, #fff);
      border-radius: var(--sqm-input-border-radius, var(--sl-input-border-radius-large), 0.25rem);
      color: var(--sqm-input-color, white);
      border-width: var(--sqm-border-width, 1px);
      border-style: solid; 
      border-color: var(--sqm-input-border-color, #ccc); 
    }


    sl-select::part(menu) {
      background: var(--sqm-input-background, inherit);
      // border-radius: var(--sqm-border-radius-normal);
      color: var(--sqm-input-color, inherit);
      border:none;
    }

    sl-select::part(panel) {
      border-radius: var(--sqm-border-radius-normal);
    }

    /* Corrected: sl-select::part(base), sl-textarea::part(base), removed border-color: none */
    sl-input::part(base):focus,
    sl-select::part(base):focus, /* Corrected part name for sl-select */
    sl-textarea::part(base):focus { /* Corrected part name for sl-textarea */
      /* border-color: none; -- REMOVED: Invalid property value */
      border: var(--sqm-input-focus-border, 1px solid var(--sl-input-border-color-focus, #007bff)); /* Added fallback for --sl-input-border-color-focus */
    }

    /* Corrected: Target [disabled] host element then its part */
    sl-input[disabled]::part(label),
    sl-select[disabled]::part(label),
    sl-textarea[disabled]::part(label){
      color: var(--sqm-input-disabled-color, var(--sl-color-gray-600));
    }
    /* Add rules for the disabled base parts if you want background/border */
    sl-input[disabled]::part(base),
    sl-select[disabled]::part(base),
    sl-textarea[disabled]::part(base){
      background: var(--sqm-input-disabled-background, #f5f5f5);
      border-color: var(--sl-input-border-color-disabled, #e0e0e0); /* Example disabled border color */
    }


    /* Corrected: Target sl-input::part(input) for autofill */
    sl-input::part(input):-webkit-autofill {
      box-shadow: 0 0 0 50px var(--sqm-input-background, #fff) inset !important;
      -webkit-text-fill-color: var(--sqm-input-color, white) !important;
    }

    sl-input::part(input):-webkit-autofill:hover {
      box-shadow: 0 0 0 50px var(--sqm-input-background, #fff) inset !important;
      -webkit-text-fill-color: var(--sqm-input-color, white) !important;
    }

    sl-input::part(input):-webkit-autofill:focus {
      box-shadow: 0 0 0 50px var(--sqm-input-background, #fff) inset !important;
      -webkit-text-fill-color: var(--sqm-input-color, white) !important;
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
        <a href={text.termsAndConditionsLink} target="_blank">
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
                class="ErrorInput"
                exportparts="label: input-label, base: input-base"
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
                exportparts="label: input-label, base: input-base"
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
              <div class={classes.PhoneInputsSection}>
                <p>{text.phoneNumber}</p>
                <div class={classes.PhoneInputsContainer}>
                  <sl-select
                    id="phoneNumberCountryCode"
                    exportparts="label: input-label, base: input-base"
                    name="/phoneNumberCountryCode"
                    value={formState.phoneNumberCountryCode}
                    disabled={states.disabled || states.isPartner}
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
                    value={formState.phoneNumber}
                    validationError={({ value }) => {
                      // Naive phone number validation
                      validateBillingField(/[a-zA-Z]+/, value) &&
                        formatErrorMessage(
                          text.phoneNumber,
                          text.error.fieldInvalidError
                        );
                    }}
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
                disabled={states.disabled || states.isPartner}
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
                exportparts="label: input-label, base: input-base"
                id="postalCode"
                name="/postalCode"
                value={formState.postalCode}
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
                exportparts="label: input-label, base: input-base"
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
                  exportparts="label: input-label, base: input-base"
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
