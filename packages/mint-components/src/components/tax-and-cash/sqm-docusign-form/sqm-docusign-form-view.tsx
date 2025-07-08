import { VNode, h } from "@stencil/core";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";
import { FORM_STEPS, TaxDocumentType } from "../data";
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
    color: "var(--sqm-danger-color-icon)",
    marginTop: "10px",
  },
  DescriptionText: {
    color: "var(--sl-color-neutral-500)",
  },
  BoldText: {
    fontWeight: "bold",
  },
  ErrorAlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sqm-danger-color-background)",
      border: "none",
      padding: "0 16px",
      color: "var(--sqm-danger-color-text)",
      marginBottom: "16px",
    },

    "& sl-icon::part(base)": {
      color: "var(--sqm-danger-color-icon)",
    },
  },
  InfoAlert: {
    "&::part(base)": {
      backgroundColor: "var(--sqm-informative-color-background)",
      borderTop: "none",
      padding: "0 16px",
      border: "none",
      color: "var(--sqm-informative-color-text)",
      marginBottom: "16px",
    },

    "& sl-icon::part(base)": {
      color: "var(--sqm-informative-color-icon)",
    },
  },
  Container: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: "16px",
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
    color: "var(--sqm-text-subdued)",
    fontSize: "var(--sl-font-size-medium)",
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

    a {
      cursor: pointer;
      color: var(--sqm-text);
      text-decoration: underline;
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
