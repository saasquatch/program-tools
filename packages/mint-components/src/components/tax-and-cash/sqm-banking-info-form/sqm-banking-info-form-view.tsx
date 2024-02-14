import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";

export interface BankingInfoFormViewProps {
  states: {
    loading: boolean;
    disabled: boolean;
    hideSteps: boolean;
    formState: {
      checked: "toBankAccount" | "toPaypalAccount" | undefined;
      errors?: any;
    };
  };
  slots: {
    formInputsSlot?: VNode;
  };
  callbacks: {
    onSubmit: (props: any) => Promise<void>;
    onChange: (e) => void;
  };
  text: {
    formStep: string;
    taxAndPayouts: string;
    taxAndPayoutsDescription: string;
    directlyToBankAccount: string;
    toPaypalAccount: string;
    paymentMethod: string;
    submitButton: string;

    error: {};
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

export const BankingInfoFormView = (props: BankingInfoFormViewProps) => {
  const {
    states,
    states: { formState },
    callbacks,
    text,
    refs,
    slots,
  } = props;

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
          <h3>{text.taxAndPayouts}</h3>
          <p>{text.taxAndPayoutsDescription}</p>
        </div>
        {/* {formState.errors?.general && (
          <sl-alert type="warning" open class={sheet.classes.AlertContainer}>
            <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
            <strong>{text.error.generalTitle}</strong>
            <br />
            {text.error.generalDescription}
          </sl-alert>
        )} */}
        {/* {states.isPartner && (
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
        )} */}
        <div>
          <h4>{text.paymentMethod}</h4>
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
                checked={formState.checked === "toBankAccount"}
                onInput={() => callbacks.onChange("toBankAccount")}
                disabled={states.disabled}
                id="toBankAccount"
                name="/toBankAccount"
              >
                {text.directlyToBankAccount}
              </sl-checkbox>
              {formState.checked === "toBankAccount" && slots.formInputsSlot}
              <sl-checkbox
                class={classes.Checkbox}
                exportparts="label: input-label"
                checked={formState.checked === "toPaypalAccount"}
                onInput={() => callbacks.onChange("toPaypalAccount")}
                disabled={states.disabled}
                id="toPaypalAccount"
                name="/toPaypalAccount"
              >
                {text.toPaypalAccount}
              </sl-checkbox>
              {formState.checked === "toPaypalAccount" && slots.formInputsSlot}
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
          </div>
        </div>
      )}
    </sl-form>
  );
};
