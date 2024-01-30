import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";

export interface DocumentTypeFormViewProps {
  states: {
    loading: boolean;
    submitDisabled: boolean;
    formState: {
      selectedTaxForm: "w9" | "w8-ben" | "w8-ben-e" | undefined;
      errors?: any;
    };
  };
  callbacks: {
    onSubmit: (props: any) => void;
    onBack: () => void;
  };
  text: {
    formStep: string;
    taxForm: string;
    formLabel: string;
    w9Label: string;
    w9Description: string;
    w8Label: string;
    w8Description: string;
    w8ELabel: string;
    w8EDescription: string;
    submitButton: string;
    backButton: string;
    error: {
      generalTitle: string;
      generalDescription: string;
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
  LabelText: {
    fontWeight: "bold",
  },

  AlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-red-100)",
      borderTop: "none",
      padding: "0 16px",
      marginBottom: "16px",
    },

    "& sl-icon::part(base)": {
      color: "var(--sl-color-danger-500)",
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

    sl-checkbox::part(control) {
        border-radius: 50%;
    }
  `;

export const DocumentTypeFormView = (props: DocumentTypeFormViewProps) => {
  const {
    states,
    states: { formState },
    callbacks,
    text,
  } = props;

  const { classes } = sheet;

  console.log({ formState });

  return (
    <sl-form class={classes.FormWrapper} onSl-submit={callbacks.onSubmit}>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div class={classes.TextContainer}>
        <div>
          <p>{text.formStep}</p>
          <h3>{text.taxForm}</h3>
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
      <p class={classes.LabelText}>{text.formLabel}</p>

      <div class={classes.RadioContainer}>
        <sl-radio value="w9" name="/documentType">
          <p class={classes.LabelText}>{text.w9Label}</p>
          <p class={classes.DescriptionText}>{text.w9Description}</p>
        </sl-radio>
        <sl-radio value="w8-ben" name="/documentType">
          <p class={classes.LabelText}>{text.w8Label}</p>
          <p class={classes.DescriptionText}>{text.w8Description}</p>
        </sl-radio>
        <sl-radio value="w8-ben-e" name="/documentType">
          <p class={classes.LabelText}>{text.w8ELabel}</p>
          <p class={classes.DescriptionText}>{text.w8EDescription}</p>
        </sl-radio>
      </div>
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
