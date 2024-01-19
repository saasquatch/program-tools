import { h } from "@stencil/core";

export interface TaxFormStepTwoProps {
  states: {
    loading: boolean;
    submitDisabled: boolean;
    formState: {
      checked?: "w9" | "w8" | "w8e";
      errors?: any;
      error?: string;
    };
  };
  callbacks: {
    onSubmit: (props: any) => void;
    onChange: (e) => void;
    onBack: () => void;
  };
  text: {
    w9: string;
    w8: string;
    w8e: string;
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
      <sl-checkbox
        exportparts="label: input-label"
        value={formState.checked === "w9"}
        onInput={callbacks.onChange}
        disabled={states.loading}
        id="w9"
        name="w9"
      >
        {text.w9}
      </sl-checkbox>
      <sl-checkbox
        exportparts="label: input-label"
        value={formState.checked === "w8"}
        onInput={callbacks.onChange}
        disabled={states.loading}
        id="w8"
        name="w8"
      >
        {text.w8}
      </sl-checkbox>
      <sl-checkbox
        exportparts="label: input-label"
        value={formState.checked === "w8e"}
        onInput={callbacks.onChange}
        disabled={states.loading}
        id="w8e"
        name="w8e"
      >
        {text.w8e}
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
