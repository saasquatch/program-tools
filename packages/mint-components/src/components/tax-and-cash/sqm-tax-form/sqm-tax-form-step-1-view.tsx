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
    submitButton: string;
  };
  refs: {
    formRef: any;
  };
}

const style = {
  FormWrapper: {},
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
          // Copied from edit form, may need to keep
          // {...(formState.errors?.firstName &&
          // formState.errors?.firstName.status !== "valid"
          //   ? { class: "errors?tyles", helpText: "Cannot be empty" }
          //   : [])}
          id="firstName"
          name="/firstName"
          error={
            formState.errors?.firstName &&
            formState.errors?.firstName.status !== "valid"
              ? formState.errors?.firstName.message
              : undefined
          }
        />
        <sl-input
          exportparts="label: input-label"
          value={formState.lastName}
          label={text.lastName}
          disabled={states.loading}
          // Copied from edit form, may need to keep
          // {...(formState.errors?.lastName &&
          // formState.errors?.lastName.status !== "valid"
          //   ? { class: "errors?tyles", helpText: "Cannot be empty" }
          //   : [])}
          id="lastName"
          name="/lastName"
          error={
            formState.errors?.lastName &&
            formState.errors?.lastName.status !== "valid"
              ? formState.errors?.lastName.message
              : undefined
          }
        />
        <sl-input
          exportparts="label: input-label"
          value={formState.email}
          label={text.email}
          disabled={states.loading}
          // Copied from edit form, may need to keep
          // {...(formState.errors?.email &&
          // formState.errors?.email.status !== "valid"
          //   ? { class: "errors?tyles", helpText: "Cannot be empty" }
          //   : [])}
          id="email"
          name="/email"
          error={
            formState.errors?.email &&
            formState.errors?.email.status !== "valid"
              ? formState.errors?.email.message
              : undefined
          }
        />

        <sl-input
          exportparts="label: input-label"
          value={formState.countryCode}
          label={text.country}
          disabled={states.loading}
          // Copied from edit form, may need to keep
          // {...(formState.errors?.country &&
          // formState.errors?.country.status !== "valid"
          //   ? { class: "errors?tyles", helpText: "Cannot be empty" }
          //   : [])}
          id="country"
          name="/country"
          error={
            formState.errors?.country &&
            formState.errors?.country.status !== "valid"
              ? formState.errors?.country.message
              : undefined
          }
        />
        <sl-input
          exportparts="label: input-label"
          value={formState.currency}
          label={text.currency}
          disabled={states.loading}
          // Copied from edit form, may need to keep
          // {...(formState.errors?.currency &&
          // formState.errors?.currency.status !== "valid"
          //   ? { class: "errors?tyles", helpText: "Cannot be empty" }
          //   : [])}
          id="currency"
          name="/currency"
          error={
            formState.errors?.currency &&
            formState.errors?.currency.status !== "valid"
              ? formState.errors?.currency.message
              : undefined
          }
        />
        <div class={classes.CheckboxWrapper}>
          <p class={classes.BoldText}>Participant type</p>
          <sl-radio-group label="Select an option" name="a" value="3">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <sl-radio
                value="individualParticipant"
                exportparts="base: radio-base"
              >
                I am an individual participant
              </sl-radio>
              <sl-radio value="businessEntity" exportparts="base: radio-base">
                I represent an business entity
              </sl-radio>
            </div>
          </sl-radio-group>
        </div>
        <div class={classes.CheckboxWrapper}>
          <p class={classes.BoldText}>Tax and banking collection</p>
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
            error={
              formState.errors?.allowBankingCollection &&
              formState.errors?.allowBankingCollection.status !== "valid"
                ? formState.errors?.allowBankingCollection.message
                : undefined
            }
          >
            {text.allowBankingCollection}
          </sl-checkbox>
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
