import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";

export interface TaxFormStepTwoProps {
  states: {
    loading: boolean;
    submitDisabled: boolean;
    formState: {
      checked: "hstCanada" | "otherRegion" | "notRegistered" | undefined;
      errors?: any;
      error?: string;
    };
    registeredInCanadaDetailsSlot?: VNode;
    registeredInDifferentCountryDetailsSlot?: VNode;
  };
  callbacks: {
    onSubmit: (props: any) => void;
    onChange: (e) => void;
    onBack: () => void;
  };
  text: {
    step: string;
    stepOf: string;
    indirectTax: string;
    indirectTaxDescription: string;
    indirectTaxDetails: string;
    indirectTaxDetailsDescription: string;
    hstCanada: string;
    otherRegion: string;
    notRegistered: string;
    submitButton: string;
    backButton: string;
  };
}

const style = {
  FormWrapper: {},
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
  BtnContainer: {},
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const vanillaStyle = `
    :host{
      display: block;   
    }
    * {
        p {
            margin: 0;
        }
    }
    // sl-checkbox::part(base) {

    //     position: absolute;
    //     top: 16px;
    //     right: 16px;
    // }
    // sl-checkbox::part(control) {
    //     border-radius: 50%;
    // }
  `;

export const TaxFormStepTwoView = (props: TaxFormStepTwoProps) => {
  const {
    states,
    states: { formState },
    callbacks,
    text,
  } = props;

  const { classes } = sheet;

  return (
    <form class="FormWrapper" onSubmit={callbacks.onSubmit}>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div>
        <div>
          <p>
            {text.step} 2 {text.stepOf} 4
          </p>
          <h3>{text.indirectTax}</h3>
        </div>
        <p>{text.indirectTaxDescription}</p>

        <div>
          <h4>{text.indirectTaxDetails}</h4>
          <p>{text.indirectTaxDetailsDescription}</p>
        </div>
      </div>
      <div class={classes.CheckboxContainer}>
        <sl-checkbox
          exportparts="label: input-label"
          value={formState.checked === "hstCanada"}
          checked={formState.checked === "hstCanada"}
          onInput={callbacks.onChange}
          disabled={states.loading}
          id="hstCanada"
          name="hstCanada"
        >
          {text.hstCanada}
        </sl-checkbox>
        {formState.checked === "hstCanada" &&
          states.registeredInCanadaDetailsSlot}
        <sl-checkbox
          exportparts="label: input-label"
          value={formState.checked === "otherRegion"}
          checked={formState.checked === "otherRegion"}
          onInput={callbacks.onChange}
          disabled={states.loading}
          id="otherRegion"
          name="otherRegion"
        >
          {text.otherRegion}
        </sl-checkbox>
        {formState.checked === "otherRegion" &&
          states.registeredInDifferentCountryDetailsSlot}
        <sl-checkbox
          exportparts="label: input-label"
          value={formState.checked === "notRegistered"}
          checked={formState.checked === "notRegistered"}
          onInput={callbacks.onChange}
          disabled={states.loading}
          id="notRegistered"
          name="notRegistered"
        >
          {text.notRegistered}
        </sl-checkbox>
      </div>
      <div class={classes.BtnContainer}>
        <sl-button
          type="secondary"
          loading={states.loading}
          disabled={states.submitDisabled}
          onClick={() => {
            callbacks.onBack();
          }}
          exportparts="base: secondarybutton-base"
        >
          {text.backButton}
        </sl-button>
        <sl-button
          type="primary"
          loading={states.loading}
          disabled={states.submitDisabled}
          onClick={(e) => {
            callbacks.onSubmit(e);
          }}
          submit
          exportparts="base: primarybutton-base"
        >
          {text.submitButton}
        </sl-button>
      </div>
    </form>
  );
};
