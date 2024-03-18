import { h } from "@stencil/core";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";
import { GeneralLoadingView } from "../TaxForm.stories";
import { FORM_STEPS } from "../sqm-tax-and-cash/data";
import { getIsRequiredErrorMessage } from "../utils";

export interface UserInfoFormViewProps {
  states: {
    step?: string;
    loading: boolean;
    disabled: boolean;
    isPartner: boolean;
    isUser: boolean;
    hideSteps: boolean;
    loadingError?: boolean;
    formState: {
      firstName?: string;
      lastName?: string;
      email?: string;
      countryCode?: string;
      currency?: string;
      allowBankingCollection?: boolean;
      errors?: {
        general?: boolean;
        firstName?: boolean;
        lastName?: boolean;
        countryCode?: boolean;
        currency?: boolean;
        allowBankingCollection?: boolean;
      };
      error?: string;
    };
  };
  data: {
    countries: {
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
    onSubmit: (props: any) => void;
    onFormChange: (field: string, e: CustomEvent) => void;
  };
  text: {
    formStep: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    currency: string;
    currencyHelpText: string;
    allowBankingCollection: string;
    personalInformation: string;
    continueButton: string;
    isPartnerAlertHeader: string;
    isPartnerAlertDescription: string;
    termsAndConditionsLabel: string;
    error: {
      generalTitle: string;
      generalDescription: string;
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
        <a href="https://example.com/" target="_blank">
          {text.termsAndConditionsLabel}
        </a>
      ),
    }
  );

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
                      helpText: getIsRequiredErrorMessage(
                        text.firstName,
                        text.error.fieldRequiredError
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
                      helpText: getIsRequiredErrorMessage(
                        text.lastName,
                        text.error.fieldRequiredError
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
                      helpText: getIsRequiredErrorMessage(
                        text.country,
                        text.error.fieldRequiredError
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
                  ></sl-menu-item>
                ))}
              </sl-select>
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
                      helpText: getIsRequiredErrorMessage(
                        text.currency,
                        text.error.fieldRequiredError
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
                  ></sl-menu-item>
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
                    {getIsRequiredErrorMessage(
                      text.termsAndConditionsLabel,
                      text.error.fieldRequiredError
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
