import { VNode, h } from "@stencil/core";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";
import { FORM_STEPS } from "../data";

export interface IndirectTaxFormViewProps {
  states: {
    step?: string;
    loading: boolean;
    disabled: boolean;
    isPartner: boolean;
    hideSteps: boolean;
    loadingError: boolean;
    formState: {
      checked?: "hstCanada" | "otherRegion" | "notRegistered";
      errors?: {
        general?: boolean;
      };
    };
  };
  slots: {
    registeredInCanadaDetailsSlot?: VNode;
    registeredInDifferentCountryDetailsSlot?: VNode;
  };
  callbacks: {
    onSubmit: (props: any) => Promise<void>;
    onChange: (e) => void;
    onBack: () => void;
  };
  text: {
    formStep: string;
    indirectTax: string;
    indirectTaxDescription: string;
    indirectTaxDetails: string;
    isPartnerAlertHeader: string;
    isPartnerAlertDescription: string;
    otherRegion: string;
    otherRegionSubtext: string;
    notRegistered: string;
    notRegisteredSubtext: string;
    cannotChangeInfoAlert: string;
    continueButton: string;
    backButton: string;
    taxAndPayoutsDescription: string;
    supportLink: string;
    error: {
      generalTitle: string;
      generalDescription: string;
      fieldRequiredError: string;
      loadingErrorAlertHeader: string;
      loadingErrorAlertDescription: string;
    };
  };
  refs: {
    formRef: any;
  };
}

const style = {
  FormWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  RadioContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: "var(--sl-spacing-medium)",
    marginBottom: "16px",

    "& sl-radio::part(base)": {
      alignItems: "start",
    },
  },
  InnerRadioContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--sl-spacing-medium)",
    width: "100%",
  },
  RadioContent: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--sl-spacing-xx-small)",
    fontSize: "var(--sl-font-size-small)",
    color: "var(--sqm-text)",
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
    color: "var(--sqm-text-subdued)",
  },

  InfoWarningIcon: {
    height: "26px",
    width: "26px",
  },
  PageDescriptionText: {
    color: "var(--sqm-text-subdued)",
    fontSize: "var(--sl-font-size-medium)",
    marginBottom: "var(--sl-spacing-small)",
  },

  PrimaryButton: {
    "&::part(base)": {
      background: "var(--sqm-primary-button-background)",
      color: "var(--sqm-primary-button-color)",
      borderColor: "var(--sqm-primary-button-color-border)",
      borderRadius: "var(--sqm-primary-button-radius)",
    },

    "&::part(base):hover": {
      background: "var(--sqm-primary-button-background-hover)",
    },
  },

  SecondaryButton: {
    "&::part(base)": {
      background: "var(--sqm-secondary-button-background)",
      color: "var(--sqm-secondary-button-color)",
      borderColor: "var(--sqm-secondary-button-color-border)",
      borderRadius: "var(--sqm-secondary-button-radius)",
      width: "max-content",
      display: "flex",
      margin: "auto",
    },

    "&::part(base):hover": {
      color: "var(--sqm-text)",
      background: "var(--sqm-secondary-button-background-hover)",
    },
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const vanillaStyle = `
    :host{
      display: block;   
    }

    hr {
      border: var(--sqm-border-thickness, 1px) solid var(--sqm-border-color);
    }

    a {
      color: inherit;
      text-decoration: underline;
      cursor: pointer;
    }

    * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
    }

  `;

export const IndirectTaxFormView = (props: IndirectTaxFormViewProps) => {
  const {
    states,
    states: { formState },
    callbacks,
    text,
    refs,
    slots,
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
          {!states.hideSteps && (
            <p>
              {" "}
              {intl.formatMessage(
                {
                  id: "formStep",
                  defaultMessage: text.formStep,
                },
                { step: states.step, count: FORM_STEPS }
              )}
            </p>
          )}
          <h3>{text.indirectTax}</h3>
          <p class={classes.PageDescriptionText}>
            {text.taxAndPayoutsDescription}
          </p>
          <p class={classes.DescriptionText}>{text.indirectTaxDescription}</p>
        </div>
        {states.loadingError && (
          <div>
            <sqm-form-message type="error">
              <p part="alert-title">{text.error.loadingErrorAlertHeader}</p>
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
            </sqm-form-message>
          </div>
        )}
        {formState.errors?.general && (
          <sqm-form-message type="error">
            <p part="alert-title">{text.error.generalTitle}</p>
            {intl.formatMessage(
              {
                id: "generalDescription",
                defaultMessage: text.error.generalDescription,
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
          </sqm-form-message>
        )}
        {states.isPartner && (
          <sqm-form-message type="info">
            <p part="alert-title">{text.isPartnerAlertHeader}</p>
            {intl.formatMessage(
              {
                id: "isPartnerAlertDescription",
                defaultMessage: text.isPartnerAlertDescription,
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
          </sqm-form-message>
        )}
        <div>
          <h4>{text.indirectTaxDetails}</h4>
        </div>
      </div>
      {states.loading ? (
        <sl-spinner style={{ fontSize: "50px", margin: "40px" }}></sl-spinner>
      ) : (
        <div>
          <div class={classes.RadioContainer}>
            <div class={classes.InnerRadioContainer}>
              <sl-radio
                exportparts="base: radio-base"
                name="/checked"
                value="notRegistered"
                id="notRegistered"
                checked={formState.checked === "notRegistered"}
                onInput={() => callbacks.onChange("notRegistered")}
                disabled={states.disabled || states.isPartner}
              >
                <div class={classes.RadioContent}>
                  {text.notRegistered}
                  <p class={classes.DescriptionText}>
                    {text.notRegisteredSubtext}
                  </p>
                </div>
              </sl-radio>
              <sl-radio
                exportparts="base: radio-base"
                name="/checked"
                value="otherRegion"
                id="otherRegion"
                checked={formState.checked === "otherRegion"}
                onInput={() => callbacks.onChange("otherRegion")}
                disabled={states.disabled || states.isPartner}
              >
                <div class={classes.RadioContent}>
                  {text.otherRegion}
                  <p class={classes.DescriptionText}>
                    {text.otherRegionSubtext}
                  </p>
                </div>
              </sl-radio>
              {slots.registeredInDifferentCountryDetailsSlot}
            </div>
          </div>
          <sqm-form-message type="info">
            {intl.formatMessage(
              {
                id: "cannotChangeInfoAlert",
                defaultMessage: text.cannotChangeInfoAlert,
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
          </sqm-form-message>
          <div class={classes.BtnContainer}>
            <sl-button
              class={classes.PrimaryButton}
              type="primary"
              disabled={states.disabled}
              submit
              exportparts="base: primarybutton-base"
            >
              {text.continueButton}
            </sl-button>
            <sl-button
              class={classes.SecondaryButton}
              type="text"
              disabled={states.disabled}
              onClick={callbacks.onBack}
              exportparts="base: secondarybutton-base"
            >
              {text.backButton}
            </sl-button>
          </div>
        </div>
      )}
    </sl-form>
  );
};
