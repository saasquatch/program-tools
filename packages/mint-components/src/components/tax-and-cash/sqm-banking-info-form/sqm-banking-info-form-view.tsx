import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { intl } from "../../../global/global";

export interface BankingInfoFormViewProps {
  states: {
    loading: boolean;
    disabled: boolean;
    hideSteps: boolean;
    hideBanking?: boolean;
    hidePayPal?: boolean;
    feeCap?: string;
    isPartner: boolean;
    formState: {
      checked?: "toBankAccount" | "toPaypalAccount";
      errors?: {
        general?: boolean;
      };
    };
  };
  slots: {
    formInputsSlot?: VNode[];
    countryInputSlot?: VNode;
    paymentMethodSlot?: VNode;
  };
  callbacks: {
    setChecked: (checked: "toBankAccount" | "toPaypalAccount") => void;
    onSubmit: (props: any) => Promise<void>;
  };
  text: {
    formStep: string;
    taxAndPayouts: string;
    taxAndPayoutsDescription: string;
    directlyToBankAccount: string;
    toPaypalAccount: string;
    paymentMethod: string;
    paymentMethodSubtext: string;
    submitButton: string;
    payPalInputLabel: string;
    isPartnerAlertHeader: string;
    isPartnerAlertDescription: string;
    error: {
      generalTitle;
      generalDescription;
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
  InputContainer: {
    padding: "16px",
    margin: "16px 0px 16px 0px",
    borderTop: "1px solid var(--sl-color-gray-300)",
    borderBottom: "1px solid var(--sl-color-gray-300)",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "16px",

    "& sl-input::part(base)": {
      maxWidth: "320px",
    },

    "& sl-select::part(base)": {
      maxWidth: "320px",
    },
  },
  CheckboxSkeleton: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "var(--sl-color-gray-200)",
  },
  SmallSkeleton: {
    width: "100px",
    height: "16px",
    borderRadius: "50px",
    background: "var(--sl-color-gray-200)",
  },
  LargeSkeleton: {
    width: "320px",
    height: "40px",
    borderRadius: "50px",
    background: "var(--sl-color-gray-200)",
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

  const getLoadingSkeleton = (
    checkedValue: "toBankAccount" | "toPaypalAccount" | undefined,
    inputNumber?: number
  ) => {
    const skeletons = [];

    const flexBoxStyle = {
      display: "flex",
      gap: "8px",
    };

    if (checkedValue === undefined) {
      return (
        <div style={{ ...flexBoxStyle, flexDirection: "column", gap: "16px" }}>
          <div class={classes.SmallSkeleton} />
          <div style={{ ...flexBoxStyle, flexDirection: "row" }}>
            <div class={classes.CheckboxSkeleton} />
            <div class={classes.SmallSkeleton} />
          </div>
          <div style={{ ...flexBoxStyle, flexDirection: "row" }}>
            <div class={classes.CheckboxSkeleton} />
            <div class={classes.SmallSkeleton} />
          </div>
        </div>
      );
    }

    if (checkedValue === "toPaypalAccount") {
      return (
        <div style={{ ...flexBoxStyle, flexDirection: "column" }}>
          <div class={classes.SmallSkeleton} />
          <div class={classes.LargeSkeleton} />
        </div>
      );
    }

    Array.from({ length: inputNumber }).forEach((input, index) => {
      skeletons.push(
        <div style={{ ...flexBoxStyle, flexDirection: "column" }} key={index}>
          <div class={classes.SmallSkeleton} />
          <div class={classes.LargeSkeleton} />
        </div>
      );
    });

    return skeletons;
  };
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
          <h3 style={{ fontSize: "24px" }}>{text.taxAndPayouts}</h3>
          <p class={classes.DescriptionText}>{text.taxAndPayoutsDescription}</p>
        </div>
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
          <h4>{text.paymentMethod}</h4>
          <p class={classes.DescriptionText}>{text.paymentMethodSubtext}</p>
        </div>
      </div>
      <div>
        <div class={classes.CheckboxContainer}>
          {states.loading && formState.checked === undefined ? (
            getLoadingSkeleton(undefined)
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <sl-checkbox
                class={classes.Checkbox}
                exportparts="label: input-label"
                checked={formState.checked === "toBankAccount"}
                onInput={() => callbacks.setChecked("toBankAccount")}
                disabled={states.disabled}
                id="toBankAccount"
                name="/toBankAccount"
              >
                {text.directlyToBankAccount}
              </sl-checkbox>
              {formState.checked === "toBankAccount" && (
                <div
                  class={classes.InputContainer}
                  style={states.hideBanking ? { display: "none" } : {}}
                >
                  {states.loading
                    ? getLoadingSkeleton(
                        "toBankAccount",
                        slots.formInputsSlot.length + 2
                      )
                    : [
                        slots.countryInputSlot,
                        slots.paymentMethodSlot,
                        slots.formInputsSlot,
                      ]}
                </div>
              )}
              <sl-checkbox
                class={classes.Checkbox}
                exportparts="label: input-label"
                checked={formState.checked === "toPaypalAccount"}
                onInput={() => callbacks.setChecked("toPaypalAccount")}
                disabled={states.disabled}
                id="toPaypalAccount"
                name="/toPaypalAccount"
              >
                {intl.formatMessage(
                  {
                    id: "paypal-input-label",
                    defaultMessage: text.toPaypalAccount,
                  },
                  { feeCap: states.feeCap }
                )}
              </sl-checkbox>
              {formState.checked === "toPaypalAccount" && (
                <div
                  class={classes.InputContainer}
                  style={states.hidePayPal ? { display: "none" } : {}}
                >
                  {states.loading ? (
                    getLoadingSkeleton("toPaypalAccount")
                  ) : (
                    <sl-input
                      label={text.payPalInputLabel}
                      name="/payPalEmail"
                      id="payPalEmail"
                      type="text"
                    ></sl-input>
                  )}
                </div>
              )}
            </div>
          )}
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
    </sl-form>
  );
};
