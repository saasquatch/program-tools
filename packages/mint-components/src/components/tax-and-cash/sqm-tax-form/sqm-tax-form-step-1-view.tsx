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
      allowBankingCollection?: boolean;
      participantType: "individualParticipant" | "businessEntity" | undefined;
      errors?: any;
      error?: string;
    };
  };
  callbacks: {
    onSubmit: (props: any) => void;
    onRadioClick: (value: string) => void;
  };
  text: {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    currency: string;
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

  console.log({ formState });
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
          {...(formState.errors?.firstName
            ? {
                class: classes.ErrorInput,
                helpText: formState.errors.firstName,
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
          disabled={states.loading}
          {...(formState.errors?.lastName
            ? {
                class: classes.ErrorInput,
                helpText: formState.errors.lastName,
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
          disabled={states.loading}
          {...(formState.errors?.email
            ? {
                class: classes.ErrorInput,
                helpText: formState.errors.email,
              }
            : {})}
          // {...{ helpText: formState.errors.email }}
          id="email"
          name="/email"
          required
        />

        <sl-select
          exportparts="label: input-label"
          name="/countryCode"
          label={text.country}
          value={formState.countryCode}
          {...(formState.errors?.countryCode
            ? {
                class: classes.ErrorInput,
                helpText: formState.errors.countryCode,
              }
            : {})}
          required
        >
          <sl-menu-item value="US">United States</sl-menu-item>
          <sl-menu-item value="CA">Canada</sl-menu-item>
          <sl-menu-item value="AU">Australia</sl-menu-item>
        </sl-select>
        <sl-select
          exportparts="label: input-label"
          name="/currency"
          label={text.currency}
          value={formState.currency}
          {...(formState.errors?.currency
            ? {
                class: classes.ErrorInput,
                helpText: formState.errors.currency,
              }
            : {})}
          required
        >
          <sl-menu-item value="USD">USD</sl-menu-item>
          <sl-menu-item value="CAD">CAD</sl-menu-item>
          <sl-menu-item value="AUD">AUD</sl-menu-item>
        </sl-select>

        <div class={classes.CheckboxWrapper}>
          <p class={classes.BoldText}>{text.participantType}</p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <sl-radio
              exportparts="base: radio-base"
              value="individualParticipant"
              name="/participantType"
            >
              {text.individualParticipant}
            </sl-radio>
            <sl-radio
              exportparts="base: radio-base"
              value="businessEntity"
              name="/participantType"
            >
              {text.businessEntity}
            </sl-radio>
          </div>

          {formState.errors?.participantType && (
            <p class={classes.ErrorText}>{text.error.participantType}</p>
          )}
        </div>
        <div class={classes.CheckboxWrapper}>
          <p class={classes.BoldText}> {text.taxAndBankingCollection}</p>
          <sl-checkbox
            exportparts="label: input-label"
            checked={formState.allowBankingCollection === true}
            onSl-change={(e) => {
              e.target.value = e.target.checked;
            }}
            disabled={states.loading}
            required
            // Copied from edit form, may need to keep
            // {...(formState.errors?.allowBankingCollection &&
            // formState.errors?.allowBankingCollection.status !== "valid"
            //   ? { class: "errorstyles", helpText: "Cannot be empty" }
            //   : [])}
            id="allowBankingCollection"
            name="/allowBankingCollection"
          >
            {text.allowBankingCollection}
          </sl-checkbox>
          {formState.errors?.allowBankingCollection && (
            <p class={classes.ErrorText}>
              {formState.errors.allowBankingCollection}
            </p>
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
