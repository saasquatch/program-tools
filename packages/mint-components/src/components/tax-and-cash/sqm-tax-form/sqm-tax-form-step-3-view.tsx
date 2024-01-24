import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";

export interface TaxFormStepThreeProps {
  states: {
    loading: boolean;
    submitDisabled: boolean;
    formState: {
      formSubmisson: boolean;
      errors?: any;
    };
    formSlot: VNode;
  };
  callbacks: {
    onSubmit: (props: any) => void;
    onBack: () => void;
  };
  text: {
    step: string;
    stepOf: string;
    taxForm: string;
    submitButton: string;
    backButton: string;
    error: {
      formSubmittion: string;
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
  `;

export const TaxFormStepTwoView = (props: TaxFormStepThreeProps) => {
  const {
    states,
    states: { formState },
    callbacks,
    text,
    refs,
  } = props;

  const { classes } = sheet;

  return (
    <sl-form
      class={classes.FormWrapper}
      onSl-submit={callbacks.onSubmit}
      ref={(el: HTMLFormElement) => (refs.formRef.current = el)}
    >
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div class={classes.TextContainer}>
        <div>
          <p>
            {text.step} 3 {text.stepOf} 4
          </p>
          <h3>{text.taxForm}</h3>
        </div>
      </div>
      {states.formSlot}
      <div class={classes.BtnContainer}>
        <sl-button
          type="primary"
          loading={states.loading}
          disabled={states.submitDisabled}
          submit
          exportparts="base: primarybutton-base"
        >
          {text.submitButton}
        </sl-button>
        <sl-button
          class={classes.SecondaryBtn}
          type="text"
          loading={states.loading}
          disabled={states.submitDisabled}
          onClick={() => {
            callbacks.onBack();
          }}
          exportparts="base: secondarybutton-base"
        >
          {text.backButton}
        </sl-button>
      </div>
    </sl-form>
  );
};
