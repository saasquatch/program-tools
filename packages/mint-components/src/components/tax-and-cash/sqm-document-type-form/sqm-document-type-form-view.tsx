import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";

export interface TaxFormStepThreeBViewProps {
  states: {
    loading: boolean;
    submitDisabled: boolean;
    formState: {
      formSubmisson: boolean;
      selectedTaxForm: "w9" | "w8-ben" | "w8-ben-e" | undefined;
      errors?: any;
    };
  };
  callbacks: {
    onSubmit: (props: any) => void;
    onBack: () => void;
  };
  text: {
    step: string;
    stepOf: string;
    taxForm: string;
    submitButton: string;
    backButton: string;
    error: {
      formSubmission: string;
    };
  };
}

const style = {
  FormWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  CheckboxContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: "var(--sl-spacing-xx-small)",
  },
  TitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "var(--sl-spacing-small)",
  },
  TextContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: "24px",
    paddingBottom: "16px",
  },
  BtnContainer: {
    paddingTop: "36px",
    display: "flex",
    gap: "8px",
  },
  ErrorText: {
    color: "var(--sl-color-danger-500)",
    marginTop: "10px",
  },
  SecondaryBtn: {
    "&::part(base)": {
      color: "var(--sl-color-gray-800) !important",
    },
  },
  RadioContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: "16px",
    padding: "16px",
  },
  DescriptionText: {
    color: "var(--sl-color-neutral-500)",
    lineHeight: "22px",
  },
  BoldText: {
    fontWeight: "bold",
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

    sl-checkbox::part(control) {
        border-radius: 50%;
    }
  `;

export const DocumentTypeFormView = (props: TaxFormStepThreeBViewProps) => {
  const {
    states,
    states: { formState },
    callbacks,
    text,
  } = props;

  const { classes } = sheet;

  return (
    <sl-form class={classes.FormWrapper} onSl-submit={callbacks.onSubmit}>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div class={classes.TextContainer}>
        <div>
          <p>
            {text.step} 3 {text.stepOf} 4
          </p>
          <h3>{text.taxForm}</h3>
        </div>
      </div>
      <p class={classes.BoldText}>Select a tax form</p>

      <sl-radio-group value={formState.selectedTaxForm}>
        <div class={classes.RadioContainer}>
          <sl-radio value="w9">
            <p class={classes.BoldText}>W9</p>
            <p class={classes.DescriptionText}>
              W9 For participants based in the US, joining the referral program
              of a US-based company.
            </p>
          </sl-radio>
          <sl-radio value="w8-ben">
            <p class={classes.BoldText}> W8-BEN</p>
            <p class={classes.DescriptionText}>
              W8-BEN For individuals residing outside of the US, joining the
              referral program of a US-based company.
            </p>
          </sl-radio>
          <sl-radio value="w8-ben-e">
            <p class={classes.BoldText}>W8-BEN-E</p>
            <p class={classes.DescriptionText}>
              W8-BEN-E For participants residing outside of the US who represent
              a business entity, joining the referral program of a US-based
              company.
            </p>
          </sl-radio>
        </div>
      </sl-radio-group>
      <div class={classes.BtnContainer}>
        <sl-button
          type="primary"
          loading={states.loading}
          disabled={states.submitDisabled}
          submit
          exportparts="base: primarybutton-base"
        >
          {text.submitButton}
        </sl-button>
        <sl-button
          class={classes.SecondaryBtn}
          type="text"
          loading={states.loading}
          disabled={states.submitDisabled}
          onClick={() => {
            callbacks.onBack();
          }}
          exportparts="base: secondarybutton-base"
        >
          {text.backButton}
        </sl-button>
      </div>
    </sl-form>
  );
};
