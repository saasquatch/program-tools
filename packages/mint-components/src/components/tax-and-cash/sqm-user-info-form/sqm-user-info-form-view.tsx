import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";

export interface UserInfoFormViewProps {
  states: {
    loading: boolean;
    disabled: boolean;
    isPartner: boolean;
    hideSteps: boolean;
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
    currencies: {
      currencyCode: string;
      displayName: string;
    }[];
  };
  callbacks: {
    setCurrencySearch: (c: any) => void;
    setCountrySearch: (c: any) => void;
    onSubmit: (props: any) => void;
  };
  text: {
    formStep: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    currency: string;
    allowBankingCollection: string;
    personalInformation: string;
    individualParticipant: string;
    businessEntity: string;
    participantType: string;
    taxAndBankingCollection: string;
    submitButton: string;
    isPartnerAlertHeader: string;
    isPartnerAlertDescription: string;
    error: {
      generalTitle: string;
      generalDescription: string;
      firstName: string;
      lastName: string;
      email: string;
      countryCode: string;
      currency: string;
      allowBankingCollection: string;
      participantType: string;
    };
  };
  refs: {
    formRef: any;
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
      <div class={classes.TextContainer}>
        <div>
          {!states.hideSteps && <p>{text.formStep}</p>}
          <h3>{text.personalInformation}</h3>
        </div>
      </div>
      {formState.errors?.general && (
        <sl-alert type="warning" open class={sheet.classes.AlertContainer}>
          <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
          <strong>{text.error.generalTitle}</strong>
          <br />
          {text.error.generalDescription}
        </sl-alert>
      )}
      {states.isPartner && (
        <sl-alert
          type="primary"
          open
          class={sheet.classes.PartnerAlertContainer}
        >
          <sl-icon slot="icon" name="info-circle"></sl-icon>
          <strong>{text.isPartnerAlertHeader}</strong>
          <br />
          {text.isPartnerAlertDescription}
        </sl-alert>
      )}
      {states.loading ? (
        <sl-spinner style={{ fontSize: "50px", margin: "40px" }}></sl-spinner>
      ) : (
        <div>
          <div class={classes.InputContainer}>
            <sl-input
              exportparts="label: input-label"
              value={formState.firstName}
              label={text.firstName}
              disabled={states.disabled || states.isPartner}
              {...(formState.errors?.firstName
                ? {
                    class: classes.ErrorInput,
                    helpText: text.error.firstName,
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
              disabled={states.disabled || states.isPartner}
              {...(formState.errors?.lastName
                ? {
                    class: classes.ErrorInput,
                    helpText: text.error.lastName,
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
                    helpText: text.error.countryCode,
                  }
                : {})}
              required
            >
              <sl-input
                class={classes.SearchInput}
                placeholder="Search for country.."
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
            </sl-select>
            <sl-select
              id="currency"
              exportparts="label: input-label"
              name="/currency"
              label={text.currency}
              menu
              value={formState.currency}
              disabled={states.disabled || states.isPartner}
              {...(formState.errors?.currency
                ? {
                    class: classes.ErrorInput,
                    helpText: text.error.currency,
                  }
                : {})}
              required
            >
              <sl-input
                class={classes.SearchInput}
                placeholder="Search for currency.."
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
            </sl-select>

            <div class={classes.CheckboxWrapper}>
              <p class={classes.BoldText}> {text.taxAndBankingCollection}</p>
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
                {text.allowBankingCollection}
              </sl-checkbox>
              {formState.errors?.allowBankingCollection && (
                <p class={classes.ErrorText}>
                  {text.error.allowBankingCollection}
                </p>
              )}
            </div>
          </div>
          <sl-button
            type="primary"
            disabled={states.isPartner ? false : states.disabled}
            loading={states.loading}
            submit
            exportparts="base: primarybutton-base"
          >
            {text.submitButton}
          </sl-button>
        </div>
      )}
    </sl-form>
  );
};
