import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";

export interface TaxFormStepThreeAViewProps {
  states: {
    loading: boolean;
    submitDisabled: boolean;
    formState: {
      completedTaxForm: boolean;
      errors?: any;
    };
  };
  callbacks: {
    onShowDocumentType: () => void;
    toggleFormSubmitted: () => void;
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
  DescriptionText: {
    color: "var(--sl-color-neutral-500)",
  },
  BoldText: {
    fontWeight: "bold",
  },
  SecondaryBtn: {
    "&::part(base)": {
      color: "var(--sl-color-gray-800) !important",
    },
  },
  AlertInnerContainer: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "8px",
  },
  Container: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: "16px",
  },
  Link: {
    color: "#14B1F7",
    textDecoration: "none",
    "&:visited": {
      color: "#14B1F7",
    },
    "&:hover": {
      textDecoration: "underline",
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

    sl-alert::part(base) {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      padding: 20px;
    }

    sl-alert::part(message) {
      padding: 0px;
    }
  `;

export const DocusignFormView = (props: TaxFormStepThreeAViewProps) => {
  const {
    states,
    states: { formState },
    callbacks,
    text,
  } = props;

  const { classes } = sheet;

  return (
    <div class={classes.Container}>
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
      <h5 class={classes.BoldText}>W9 Tax Form</h5>
      <p>
        Participants based in the US and partnering with US-based brands need to
        submit a W9 form.
        <a onClick={props.callbacks.onShowDocumentType} class={classes.Link}>
          Not based in the US?
        </a>
      </p>
      <sl-alert
        exportparts="base: alert-base, icon:alert-icon"
        class="Info"
        type="primary"
        open
      >
        <div class={classes.AlertInnerContainer}>
          <sl-icon slot="icon" name="clock"></sl-icon>
          Complete and submit your tax form to save your information
        </div>
      </sl-alert>

      <slot name="docusign-iframe"></slot>
      <div>
        <p class={classes.BoldText}>Form submission</p>
        <sl-checkbox
          onSl-change={callbacks.toggleFormSubmitted}
          checked={formState.completedTaxForm}
        >
          I have completed and submitted my tax form
        </sl-checkbox>
      </div>

      <div class={classes.BtnContainer}>
        <sl-button
          type="primary"
          loading={states.loading}
          disabled={states.submitDisabled}
          submit
          onClick={callbacks.onSubmit}
          exportparts="base: primarybutton-base"
        >
          {text.submitButton}
        </sl-button>
        <sl-button
          class={classes.SecondaryBtn}
          type="text"
          loading={states.loading}
          disabled={states.loading}
          onClick={() => {
            callbacks.onBack();
          }}
          exportparts="base: secondarybutton-base"
        >
          {text.backButton}
        </sl-button>
      </div>
    </div>
  );
};
