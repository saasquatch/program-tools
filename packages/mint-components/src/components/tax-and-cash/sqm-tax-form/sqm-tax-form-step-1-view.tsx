import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";

export interface TaxFormStepOneProps {
  states: {
    loading: boolean;
    submitDisabled: boolean;
    formState: {
      firstName?: string;
      lastName?: string;
      email?: string;
      countryCode?: string;
      currency?: string;
      indirectTaxNumber?: string;
      allowBankingCollection?: boolean;
      participantType: "individualParticipant" | "businessEntity" | undefined;
      errors?: any;
      error?: string;
    };
  };
  callbacks: {
    onSubmit: (props: any) => void;
  };
  text: {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    currency: string;
    indirectTaxNumber: string;
    allowBankingCollection: string;
    step: string;
    stepOf: string;
    personalInformation: string;
    individualParticipant: string;
    businessEntity: string;
    participantType: string;
    taxAndBankingCollection: string;
    submitButton: string;
    error: {
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

export const TaxFormStepOneView = (props: TaxFormStepOneProps) => {
  const {
    states,
    states: { formState },
    callbacks,
    text,
    refs,
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
          <p>
            {text.step} 1 {text.stepOf} 4
          </p>
          <h3>{text.personalInformation}</h3>
        </div>
      </div>
      <div class={classes.InputContainer}>
        <sl-input
          exportparts="label: input-label"
          value={formState.firstName}
          label={text.firstName}
          disabled={states.loading}
          {...(formState.errors?.firstName && {
            class: classes.ErrorInput,
            helpText: text.error.firstName,
          })}
          id="firstName"
          name="/firstName"
        />
        <sl-input
          exportparts="label: input-label"
          value={formState.lastName}
          label={text.lastName}
          disabled={states.loading}
          {...(formState.errors?.lastName && {
            class: classes.ErrorInput,
            helpText: text.error.lastName,
          })}
          id="lastName"
          name="/lastName"
        />
        <sl-input
          exportparts="label: input-label"
          value={formState.email}
          label={text.email}
          disabled={states.loading}
          {...(formState.errors?.email && {
            class: classes.ErrorInput,
            helpText: text.error.email,
          })}
          id="email"
          name="/email"
        />

        <sl-input
          exportparts="label: input-label"
          value={formState.countryCode}
          label={text.country}
          disabled={states.loading}
          {...(formState.errors?.countryCode && {
            class: classes.ErrorInput,
            helpText: text.error.countryCode,
          })}
          id="country"
          name="/country"
        />
        <sl-input
          exportparts="label: input-label"
          value={formState.currency}
          label={text.currency}
          disabled={states.loading}
          {...(formState.errors?.currency && {
            class: classes.ErrorInput,
            helpText: text.error.currency,
          })}
          id="currency"
          name="/currency"
        />
        <div class={classes.CheckboxWrapper}>
          <p class={classes.BoldText}>{text.participantType}</p>
          <sl-radio-group label="Select an option" name="a" value="3">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <sl-radio
                value="individualParticipant"
                exportparts="base: radio-base"
              >
                {text.individualParticipant}
              </sl-radio>
              <sl-radio value="businessEntity" exportparts="base: radio-base">
                {text.businessEntity}
              </sl-radio>
              {formState.errors?.participantType && (
                <p class={classes.ErrorText}>{text.error.participantType}</p>
              )}
            </div>
          </sl-radio-group>
        </div>
        <div class={classes.CheckboxWrapper}>
          <p class={classes.BoldText}> {text.taxAndBankingCollection}</p>
          <sl-checkbox
            exportparts="label: input-label"
            value={formState.allowBankingCollection}
            checked={formState.allowBankingCollection === true}
            disabled={states.loading}
            // Copied from edit form, may need to keep
            // {...(formState.errors?.allowBankingCollection &&
            // formState.errors?.allowBankingCollection.status !== "valid"
            //   ? { class: "errors?tyles", helpText: "Cannot be empty" }
            //   : [])}
            id="allowBankingCollection"
            name="/allowBankingCollection"
          >
            {text.allowBankingCollection}
          </sl-checkbox>
          {formState.errors?.allowBankingCollection && (
            <p class={classes.ErrorText}>{text.error.allowBankingCollection}</p>
          )}
        </div>
      </div>
      <sl-button
        type="primary"
        loading={states.loading}
        disabled={states.submitDisabled}
        submit
        exportparts="base: primarybutton-base"
      >
        {text.submitButton}
      </sl-button>
    </sl-form>
  );
};

// export default TaxFormStepOneView;
