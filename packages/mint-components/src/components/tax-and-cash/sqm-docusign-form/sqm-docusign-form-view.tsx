import { VNode, h } from "@stencil/core";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";
import { TaxDocumentType } from "../sqm-tax-and-cash/data";

export interface DocusignFormViewProps {
  states: {
    loading: boolean;
    submitDisabled: boolean;
    disabled: boolean;
    hideSteps: boolean;
    formState: {
      completedTaxForm: boolean;
      taxFormExpired: boolean;
      errors?: any;
    };
    documentType: TaxDocumentType;
    hideBackButton: boolean;
  };
  slots: {
    docusignExpiredSlot?: VNode;
    docusignIframeSlot: VNode;
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
    "&::part(label)": {
      padding: "0px",
      margin: "0px",
    },
  },
  ErrorAlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-red-100)",
      borderTop: "none",
      padding: "0 16px",
    },

    "& sl-icon::part(base)": {
      color: "var(--sl-color-danger-500)",
    },
  },
  InfoAlert: {
    "&::part(base)": {
      backgroundColor: "transparent",
      borderTop: "none",
      padding: "0px",
      marginBottom: "16px",
      border: "none",
    },

    "&::part(message)": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "10px",
      height: "max-content",
    },

    "& sl-icon::part(base)": {
      color: "var(--sl-color-sky-500)",
    },
  },
  Container: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: "16px",
  },
  Link: {
    color: "var(--sl-color-sky-500)",
    textDecoration: "none",
    "&:visited": {
      color: "var(--sl-color-sky-500)",
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

    a {
      cursor: pointer;
    }


  `;

export const DocusignFormView = (props: DocusignFormViewProps) => {
  const {
    states,
    states: { formState, documentType },
    callbacks,
    text,
    slots,
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
          {!states.hideSteps && <p>{text.formStep}</p>}
          <h3>{text.taxForm}</h3>
        </div>
      </div>
      {formState.errors?.general && (
        <sl-alert type="warning" open class={sheet.classes.ErrorAlertContainer}>
          <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
          <strong>{text.error.generalTitle}</strong>
          <br />
          {text.error.generalDescription}
        </sl-alert>
      )}
      <div>
        <h5 class={classes.BoldText}>
          {intl.formatMessage(
            { id: "tax-form-label", defaultMessage: text.taxFormLabel },
            { documentType }
          )}
        </h5>
        <p>
          {intl.formatMessage(
            {
              id: "tax-form-description",
              defaultMessage: text.taxFormDescription,
            },
            { documentType }
          )}{" "}
          <a onClick={callbacks.onShowDocumentType} class={classes.Link}>
            {text.notBasedInUS}
          </a>
        </p>
      </div>

      <div>
        <sl-alert
          exportparts="base: alert-base, icon:alert-icon"
          type="primary"
          open
          class={classes.InfoAlert}
        >
          <sl-icon slot="icon" name="info-circle"></sl-icon>
          {text.banner}
        </sl-alert>
        {slots.docusignIframeSlot}

        {states.hideBackButton && (
          <div class={classes.BtnContainer}>
            <sl-button
              class={classes.SecondaryBtn}
              type="text"
              loading={states.loading}
              disabled={states.loading}
              onClick={callbacks.onBack}
              exportparts="base: secondarybutton-base"
            >
              {text.backButton}
            </sl-button>
          </div>
        )}
      </div>
    </div>
  );
};
