import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { intl } from "../../../global/global";
import { FORM_STEPS } from "../sqm-tax-and-cash/data";

export interface IndirectTaxFormViewProps {
  states: {
    step?: string;
    loading: boolean;
    disabled: boolean;
    isPartner: boolean;
    hideSteps: boolean;
    // AL TODO: loadingError
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
    indirectTaxDetailsDescription: string;
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

    "& sl-radio::part(base)": {
      alignItems: "start",
    },
  },
  InnerRadioContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--sl-spacing-medium)",
  },
  RadioContent: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--sl-spacing-xx-small)",
    fontSize: "var(--sl-font-size-small)",
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
  SecondaryBtn: {
    "&::part(base)": {
      color: "var(--sl-color-gray-800) !important",
    },
  },
  AlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-red-100)",
      borderTop: "none",
      padding: "0 16px",
    },

    "& sl-icon::part(base)": {
      color: "var(--sl-color-danger-500)",
    },
  },
  CannotChangeAlertContainer: {
    maxWidth: "797px",
  },
  PartnerAlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-sky-100)",
      borderTop: "none",
      padding: "0 16px",
    },
    "& sl-icon::part(base)": {
      color: "var(--sl-color-blue-500)",
    },
  },
  InfoAlert: {
    marginTop: "var(--sl-spacing-large)",
    "&::part(base)": {
      backgroundColor: "transparent",
      borderTop: "none",
      padding: "0px",
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
      color: "var(--sl-color-yellow-500)",
    },
  },
  InfoWarningIcon: {
    height: "26px",
    width: "26px",
  },
  PageDescriptionText: {
    color: "var(--sl-color-neutral-500)",
    fontSize: "var(--sl-font-size-medium)",
    marginBottom: "var(--sl-spacing-small)",
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
            <sl-alert
              exportparts="base: alert-base, icon:alert-icon"
              type="danger"
              open
              class={sheet.classes.AlertContainer}
            >
              <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
              <strong>{text.error.loadingErrorAlertHeader}</strong>
              <br />
              {text.error.loadingErrorAlertDescription}
            </sl-alert>
          </div>
        )}
        {formState.errors?.general && (
          <sl-alert
            exportparts="base: alert-base, icon:alert-icon"
            type="warning"
            open
            class={sheet.classes.AlertContainer}
          >
            <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
            <strong>{text.error.generalTitle}</strong>
            <br />
            {text.error.generalDescription}
          </sl-alert>
        )}
        {states.isPartner && (
          <sl-alert
            type="primary"
            open
            class={sheet.classes.PartnerAlertContainer}
            exportparts="base: alert-base, icon:alert-icon"
          >
            <sl-icon slot="icon" name="info-circle"></sl-icon>
            <strong>{text.isPartnerAlertHeader}</strong>
            <br />
            {text.isPartnerAlertDescription}
          </sl-alert>
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
          <div class={classes.CannotChangeAlertContainer}>
            <sl-alert
              exportparts="base: alert-base, icon:alert-icon"
              type="primary"
              open
              class={classes.InfoAlert}
            >
              <sl-icon
                class={classes.InfoWarningIcon}
                slot="icon"
                name="exclamation-triangle"
              ></sl-icon>
              {text.cannotChangeInfoAlert}
            </sl-alert>
          </div>
          <div class={classes.BtnContainer}>
            <sl-button
              type="primary"
              disabled={states.disabled}
              submit
              exportparts="base: primarybutton-base"
            >
              {text.continueButton}
            </sl-button>
            <sl-button
              class={classes.SecondaryBtn}
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
