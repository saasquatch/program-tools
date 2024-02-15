import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";

export interface IndirectTaxFormViewProps {
  states: {
    loading: boolean;
    disabled: boolean;
    isPartner: boolean;
    hideSteps: boolean;
    formState: {
      checked: "hstCanada" | "otherRegion" | "notRegistered" | undefined;
      errors?: any;
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
    notRegistered: string;
    submitButton: string;
    backButton: string;
    error: {
      generalTitle: string;
      generalDescription: string;
      taxDetails: string;
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
  Checkbox: {
    "&::part(control)": {
      borderRadius: "50% !important",
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

  console.log(states, "indirect states");

  const { classes } = sheet;

  console.log(formState.errors);

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
          {!states.hideSteps && <p>{text.formStep}</p>}
          <h3>{text.indirectTax}</h3>
        </div>
        <p>{text.indirectTaxDescription}</p>
        {formState.errors?.general && (
          <sl-alert type="warning" open class={sheet.classes.AlertContainer}>
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
          >
            <sl-icon slot="icon" name="info-circle"></sl-icon>
            <strong>{text.isPartnerAlertHeader}</strong>
            <br />
            {text.isPartnerAlertDescription}
          </sl-alert>
        )}
        <div>
          <h4>{text.indirectTaxDetails}</h4>
          <p class={classes.DescriptionText}>
            {text.indirectTaxDetailsDescription}
          </p>
        </div>
      </div>
      {states.loading ? (
        <sl-spinner style={{ fontSize: "50px", margin: "40px" }}></sl-spinner>
      ) : (
        <div>
          <div class={classes.CheckboxContainer}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <sl-checkbox
                class={classes.Checkbox}
                exportparts="label: input-label"
                checked={formState.checked === "otherRegion"}
                onInput={() => callbacks.onChange("otherRegion")}
                disabled={states.disabled}
                id="otherRegion"
                name="/otherRegion"
              >
                {text.otherRegion}
              </sl-checkbox>
              {slots.registeredInDifferentCountryDetailsSlot}
              <sl-checkbox
                class={classes.Checkbox}
                exportparts="label: input-label"
                checked={formState.checked === "notRegistered"}
                onInput={() => callbacks.onChange("notRegistered")}
                disabled={states.disabled}
                id="notRegistered"
                name="/notRegistered"
              >
                {text.notRegistered}
              </sl-checkbox>
            </div>
          </div>
          <div class={classes.BtnContainer}>
            <sl-button
              type="primary"
              disabled={states.disabled}
              submit
              exportparts="base: primarybutton-base"
            >
              {text.submitButton}
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
