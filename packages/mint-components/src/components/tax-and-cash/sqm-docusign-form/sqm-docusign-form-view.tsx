import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { intl } from "../../../global/global";
import { TaxDocumentType } from "../sqm-tax-document-submitted/sqm-tax-document-submitted-view";

export interface DocusignFormViewProps {
  states: {
    loading: boolean;
    submitDisabled: boolean;
    formState: {
      completedTaxForm: boolean;
      errors?: any;
    };
    documentType?: TaxDocumentType;
  };
  callbacks: {
    onShowDocumentType: () => void;
    toggleFormSubmitted: () => void;
    onSubmit: (props: any) => void;
    onBack: () => void;
  };
  text: {
    formStep: string;
    taxForm: string;
    taxFormLabel: string;
    taxFormDescription: string;
    notBasedInUS: string;
    banner: string;
    checkboxLabel: string;
    checkboxDescription: string;
    submitButton: string;
    backButton: string;
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

export const DocusignFormView = (props: DocusignFormViewProps) => {
  const {
    states,
    states: { formState, documentType },
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
          <p>{text.formStep}</p>
          <h3>{text.taxForm}</h3>
        </div>
      </div>
      <h5 class={classes.BoldText}>
        {intl.formatMessage(
          { id: "tax-form-label", defaultMessage: text.taxFormLabel },
          { documentType }
        )}
      </h5>
      <p>
        {text.taxFormDescription}
        <a onClick={callbacks.onShowDocumentType} class={classes.Link}>
          {text.notBasedInUS}
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
          {text.banner}
        </div>
      </sl-alert>

      <slot name="docusign-iframe"></slot>
      <div>
        <p class={classes.BoldText}>{text.checkboxLabel}</p>
        <sl-checkbox checked={formState.completedTaxForm}>
          {text.checkboxDescription}
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
