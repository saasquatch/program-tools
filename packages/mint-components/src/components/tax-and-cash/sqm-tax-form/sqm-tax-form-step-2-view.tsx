import { VNode, h } from "@stencil/core";

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

export const TaxFormStepTwoView = (props: TaxFormStepTwoProps) => {
  const {
    states,
    states: { formState },
    callbacks,
    text,
  } = props;

  return (
    <form class="FormWrapper" onSubmit={callbacks.onSubmit}>
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
      <sl-checkbox
        exportparts="label: input-label"
        value={formState.checked === "hstCanada"}
        onInput={callbacks.onChange}
        disabled={states.loading}
        id="hstCanada"
        name="hstCanada"
      >
        {text.hstCanada}
      </sl-checkbox>
      <sl-checkbox
        exportparts="label: input-label"
        value={formState.checked === "otherRegion"}
        onInput={callbacks.onChange}
        disabled={states.loading}
        id="otherRegion"
        name="otherRegion"
      >
        {text.otherRegion}
      </sl-checkbox>
      <sl-checkbox
        exportparts="label: input-label"
        value={formState.checked === "notRegistered"}
        onInput={callbacks.onChange}
        disabled={states.loading}
        id="notRegistered"
        name="notRegistered"
      >
        {text.notRegistered}
      </sl-checkbox>
      <div class="BtnContainer">
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
