import { VNode, h } from "@stencil/core";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";
import { FORM_STEPS, TaxDocumentType } from "../sqm-tax-and-cash/data";
import { ParticipantType } from "./useDocusignForm";

export interface DocusignFormViewProps {
  states: {
    step: string;
    loading: boolean;
    urlLoading: boolean;
    disabled: boolean;
    hideSteps: boolean;
    participantTypeDisabled: boolean;
    loadingError?: boolean;
    showExitButton: boolean;
    showModal: boolean;
    formState: {
      taxFormExpired: boolean;
      participantType: "individualParticipant" | "businessEntity" | undefined;
      errors?: {
        participantType?: boolean;
        general?: boolean;
      };
    };
    documentType: TaxDocumentType;
    documentTypeString: string;
  };
  slots: {
    docusignExpiredSlot?: VNode;
    docusignIframeSlot: VNode;
  };
  callbacks: {
    onExit: () => void;
    setParticipantType: (p: ParticipantType) => void;
    onModalOpen: () => void;
    onModalClose: () => void;
  };
  text: {
    exitButton: string;
    formStep: string;
    taxForm: string;
    taxFormLabel: string;
    taxFormDescription: string;
    taxFormDescriptionIndividualParticipant: string;
    taxFormDescriptionBusinessEntity?: string;
    docusignExpired: string;
    docusignSessionWarning: string;
    businessEntity: string;
    individualParticipant: string;
    participantType: string;
    taxAndPayoutsDescription: string;
    supportLink: string;
    modalTitle: string;
    modalDescription: string;
    modalButtonText: string;
    error: {
      generalTitle: string;
      generalDescription: string;
      participantType: string;
      loadingErrorAlertHeader: string;
      loadingErrorAlertDescription: string;
    };
  };
}

const style = {
  ModalTitleContainer: {
    display: "flex",
    gap: "var(--sl-spacing-small)",
    alignItems: "center",
  },
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
  CheckboxWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  InfoIcon: {
    height: "24px",
    width: "24px",
  },
  RadioText: {
    fontSize: "var(--sl-font-size-small)",
  },
  PageDescriptionText: {
    color: "var(--sl-color-neutral-500)",
    fontSize: "var(--sl-font-size-medium)",
  },
  Dialog: {
    "&::part(panel)": {
      maxWidth: "420px",
    },

    "&::part(title)": {
      fontSize: "var(--sl-font-size-large)",
      fontWeight: "600",
    },
    "&::part(body)": {
      padding: "0 var(--sl-spacing-x-large) 0 var(--sl-spacing-x-large)",
      fontSize: "var(--sl-font-size-small)",
    },
    "&::part(footer)": {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sl-spacing-small)",
      marginBottom: "var(--sl-spacing-xx-small)",
      alignItems: "center",
      flex: "1",
    },
  },
  DialogButton: { margin: "auto", width: "100%" },
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
    states: { formState, documentTypeString },
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
      <sl-dialog
        class={sheet.classes.Dialog}
        open={states.showModal}
        onSl-hide={callbacks.onModalClose}
      >
        <div class={classes.ModalTitleContainer} slot="label">
          <sl-icon
            name="info-circle"
            style={{ color: "var(--sl-color-info-500)" }}
          />
          <h2 style={{ fontSize: "var(--sl-font-size-large)" }}>
            {text.modalTitle}
          </h2>
        </div>
        <p>
          {intl.formatMessage(
            {
              id: "modalText",
              defaultMessage: text.modalDescription,
            },
            {
              br: <br />,
            }
          )}
        </p>
        <sl-button
          slot="footer"
          type="primary"
          class={sheet.classes.DialogButton}
          onClick={callbacks.onModalClose}
          exportparts="base: primarybutton-base"
        >
          {text.modalButtonText}
        </sl-button>
      </sl-dialog>
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
          <h3>{text.taxForm}</h3>
          <p class={classes.PageDescriptionText}>
            {text.taxAndPayoutsDescription}
          </p>
        </div>
      </div>
      {states.loadingError && (
        <div>
          <sl-alert
            exportparts="base: alert-base, icon:alert-icon"
            type="danger"
            open
            class={sheet.classes.ErrorAlertContainer}
          >
            <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
            <strong>{text.error.loadingErrorAlertHeader}</strong>
            <br />
            {intl.formatMessage(
              {
                id: "loadingErrorAlertDescription",
                defaultMessage: text.error.loadingErrorAlertDescription,
              },
              {
                supportLink: (
                  <a
                    target="_blank"
                    href={`mailto:advocate-support@impact.com`}
                  >
                    {text.supportLink}
                  </a>
                ),
              }
            )}
          </sl-alert>
        </div>
      )}
      {formState.errors?.general && (
        <sl-alert
          exportparts="base: alert-base, icon:alert-icon"
          type="warning"
          open
          class={sheet.classes.ErrorAlertContainer}
        >
          <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
          <strong>{text.error.generalTitle}</strong>
          <br />
          {intl.formatMessage(
            {
              id: "generalDescription",
              defaultMessage: text.error.generalDescription,
            },
            {
              supportLink: (
                <a target="_blank" href={`mailto:advocate-support@impact.com`}>
                  {text.supportLink}
                </a>
              ),
            }
          )}
        </sl-alert>
      )}

      <div>
        <div>
          <h5 class={classes.BoldText}>
            {intl.formatMessage(
              { id: "tax-form-label", defaultMessage: text.taxFormLabel },
              { documentType: documentTypeString }
            )}
          </h5>
          <p>
            {intl.formatMessage(
              {
                id: "tax-form-description",
                defaultMessage:
                  states.documentType === "W9"
                    ? text.taxFormDescription
                    : formState.participantType === "individualParticipant"
                    ? text.taxFormDescriptionIndividualParticipant
                    : text.taxFormDescriptionBusinessEntity,
              },
              { documentType: documentTypeString }
            )}
          </p>
        </div>
        <div>{slots.docusignIframeSlot}</div>
        <div class={classes.BtnContainer}>
          {states.showExitButton && (
            <sl-button
              type="primary"
              exportparts="base: primarybutton-base"
              onClick={callbacks.onExit}
            >
              {text.exitButton}
            </sl-button>
          )}
        </div>
      </div>
    </div>
  );
};
