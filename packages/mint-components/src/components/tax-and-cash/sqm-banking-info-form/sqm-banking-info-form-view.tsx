import { h, VNode } from "@stencil/core";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";
import { BankingInfoFormData } from "./useBankingInfoForm";
import { FORM_STEPS } from "../sqm-tax-and-cash/data";

export interface BankingInfoFormViewProps {
  states: {
    showVerification: boolean;
    step?: string;
    locale?: string;
    loading: boolean;
    saveLoading?: boolean;
    disabled: boolean;
    saveDisabled: boolean;
    hideSteps?: boolean;
    hasPayPal: boolean;
    hideBanking?: boolean;
    hidePayPal?: boolean;
    hideBalanceThreshold?: boolean;
    hideFixedDay?: boolean;
    hideBackButton: boolean;
    feeCap?: string;
    isPartner: boolean;
    paymentMethodFeeLabel?: string;
    loadingError: boolean;
    formState: BankingInfoFormData & {
      paymentMethodChecked?: "toBankAccount" | "toPayPalAccount";
      paymentScheduleChecked?: "BALANCE_THRESHOLD" | "FIXED_DAY";
      errors?: {
        general?: boolean;
        inputErrors?: {
          [field: string]: {
            type: "required" | "invalid";
          };
        };
      };
    };
    bitset?: number;
    currency?: string;
    thresholds: string[];
    countries?: { countryCode: string; displayName: string }[];
    allCountries?: { countryCode: string; displayName: string }[];
    currentPaymentOption?: any;
    showInputs?: boolean;
    bankCountry?: string;
    countrySearch?: string;
  };
  slots?: {
    verificationDialogSlot?: VNode;
    formInputsSlot?: VNode[];
    countryInputSlot?: VNode;
    paymentMethodSlot?: VNode;
    paymentThresholdSelectSlot?: VNode;
    paymentFixedDaySelectSlot?: VNode;
    paypalInputSlot?: VNode;
  };
  callbacks: {
    onVerificationHide: () => void;
    setPaymentMethodChecked: (
      paymentMethodChecked: "toBankAccount" | "toPayPalAccount"
    ) => void;
    setPaymentScheduleChecked: (
      paymentMethodChecked: "BALANCE_THRESHOLD" | "FIXED_DAY"
    ) => void;
    onSubmit: (props: any) => Promise<void>;
    onBack: (props: any) => void;
    setBankCountry?: (country: string) => void;
    setCurrency?: (currency: string) => void;
    setCountrySearch: (c: any) => void;
    onVerification: (token: string) => void;
  };
  text: {
    formStep: string;
    taxAndPayouts: string;
    taxAndPayoutsDescription: string;
    directlyToBankAccount: string;
    toPayPalAccount: string;
    paymentMethod: string;
    paymentMethodSubtext: string;
    continueButton: string;
    backButton: string;
    bankLocationLabel: string;
    payPalInputLabel: string;
    paymentSchedule: string;
    paymentScheduleBalanceThreshold: string;
    paymentScheduleFixedDay: string;
    paymentDaySelectLabel: string;
    paymentThresholdSelectLabel: string;
    paymentDayFirstOfMonthLabelText: string;
    paymentDayFifteenthOfMonthLabelText: string;
    isPartnerAlertHeader: string;
    isPartnerAlertDescription: string;
    error: {
      generalTitle: string;
      generalDescription: string;
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
    gap: "var(--sl-spacing-medium)",
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
  PageDescriptionText: {
    color: "var(--sl-color-neutral-500)",
    fontSize: "var(--sl-font-size-medium)",
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
  RadioContainer: {
    display: "flex",
    flexDirection: "column",
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
    "&::part(label)": {
      fontSize: "var(--sl-font-size-small)",
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
      maxWidth: "450px",
    },

    "& sl-input::part(label)": {
      fontSize: "var(--sl-font-size-small)",
    },

    "& sl-select::part(base)": {
      maxWidth: "450px",
    },

    "& sl-select::part(label)": {
      fontSize: "var(--sl-font-size-small)",
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
    width: "100%",
    maxWidth: "320px",
    height: "40px",
    borderRadius: "50px",
    background: "var(--sl-color-gray-200)",
  },
  InfoAlert: {
    "&::part(base)": {
      backgroundColor: "transparent",
      borderTop: "none",
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

    & sl-select::part(label) {
      font-size: var(--sl-font-size-small);
      font-weight: 600
    }

    p {
      line-height: 18px;
      color: var(--sl-color-gray-800);
      font-size: var(--sl-font-size-small);
    }

    /* this class is dynamically applied in controller */
    .error-input::part(base) {
      border: 1px solid var(--sl-color-danger-500);
      border-radius: var(--sl-input-border-radius-medium);
    }

    .error-input::part(help-text) {
      color: var(--sl-color-danger-500) !important;
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
    checkedValue: "toBankAccount" | "toPayPalAccount" | undefined,
    inputNumber?: number
  ) => {
    let inputNumArray = Array(inputNumber).fill(0);

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

    if (checkedValue === "toPayPalAccount") {
      return (
        <div style={{ ...flexBoxStyle, flexDirection: "column" }}>
          <div class={classes.SmallSkeleton} />
          <div class={classes.LargeSkeleton} />
        </div>
      );
    }

    const skeletons = inputNumArray.map((_, idx) => (
      <div style={{ ...flexBoxStyle, flexDirection: "column" }} key={idx}>
        <div class={classes.SmallSkeleton} />
        <div class={classes.LargeSkeleton} />
      </div>
    ));

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
          <h3 style={{ fontSize: "24px" }}>{text.taxAndPayouts}</h3>
          <p class={classes.PageDescriptionText}>
            {text.taxAndPayoutsDescription}
          </p>
        </div>
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
        {/* Don't show the warning if returning to edit */}
        {states.isPartner && !states.hideSteps && (
          <sl-alert
            exportparts="base: alert-base, icon:alert-icon"
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
          {states.loading && formState.paymentMethodChecked === undefined ? (
            getLoadingSkeleton(undefined)
          ) : (
            <div class={classes.RadioContainer}>
              {states.hasPayPal && (
                <sl-radio
                  class={classes.Checkbox}
                  exportparts="label: input-label, base: input-base"
                  checked={formState.paymentMethodChecked === "toBankAccount"}
                  onInput={() =>
                    callbacks.setPaymentMethodChecked("toBankAccount")
                  }
                  disabled={states.disabled}
                  id="toBankAccount"
                  name="/toBankAccount"
                >
                  {text.directlyToBankAccount}
                </sl-radio>
              )}

              {formState.paymentMethodChecked === "toBankAccount" && (
                <div
                  class={classes.InputContainer}
                  style={states.hideBanking ? { display: "none" } : {}}
                >
                  {states.loading
                    ? getLoadingSkeleton(
                        "toBankAccount",
                        slots.formInputsSlot.length + 3
                      )
                    : [
                        slots.countryInputSlot,
                        slots.paymentMethodSlot,
                        slots.formInputsSlot,
                      ]}
                </div>
              )}
              {states.hasPayPal && (
                <sl-radio
                  class={classes.Checkbox}
                  exportparts="label: input-label, base: input-base"
                  checked={formState.paymentMethodChecked === "toPayPalAccount"}
                  onInput={() =>
                    callbacks.setPaymentMethodChecked("toPayPalAccount")
                  }
                  disabled={states.disabled}
                  id="toPayPalAccount"
                  name="/toPayPalAccount"
                >
                  {intl.formatMessage(
                    {
                      id: "paypal-input-label",
                      defaultMessage: text.toPayPalAccount,
                    },
                    { feeCap: states.feeCap }
                  )}
                </sl-radio>
              )}
              {formState.paymentMethodChecked === "toPayPalAccount" && (
                <div
                  class={classes.InputContainer}
                  style={states.hidePayPal ? { display: "none" } : {}}
                >
                  {states.loading
                    ? getLoadingSkeleton("toPayPalAccount")
                    : slots.paypalInputSlot}
                </div>
              )}
              <div style={{ paddingTop: "24px", paddingBottom: "12px" }}>
                <h4>{text.paymentSchedule}</h4>
              </div>
              <sl-radio
                class={classes.Checkbox}
                exportparts="label: input-label, base: input-base"
                checked={
                  formState.paymentScheduleChecked === "BALANCE_THRESHOLD"
                }
                onInput={() =>
                  callbacks.setPaymentScheduleChecked("BALANCE_THRESHOLD")
                }
                disabled={states.disabled}
                id="paymentSchedulingType"
                name="/paymentSchedulingType"
                value={"BALANCE_THRESHOLD"}
              >
                {text.paymentScheduleBalanceThreshold}
              </sl-radio>
              {formState.paymentScheduleChecked === "BALANCE_THRESHOLD" && (
                <div
                  class={classes.InputContainer}
                  style={states.hideBalanceThreshold ? { display: "none" } : {}}
                >
                  {states.loading
                    ? getLoadingSkeleton("toPayPalAccount")
                    : slots.paymentThresholdSelectSlot}
                </div>
              )}

              <sl-radio
                class={classes.Checkbox}
                exportparts="label: input-label, base: input-base"
                checked={formState.paymentScheduleChecked === "FIXED_DAY"}
                onInput={() => callbacks.setPaymentScheduleChecked("FIXED_DAY")}
                disabled={states.disabled}
                id="paymentSchedulingType"
                name="/paymentSchedulingType"
                value={"FIXED_DAY"}
              >
                {text.paymentScheduleFixedDay}
              </sl-radio>
              {formState.paymentScheduleChecked === "FIXED_DAY" && (
                <div
                  class={classes.InputContainer}
                  style={states.hideFixedDay ? { display: "none" } : {}}
                >
                  {states.loading
                    ? getLoadingSkeleton("toPayPalAccount")
                    : slots.paymentFixedDaySelectSlot}
                </div>
              )}
            </div>
          )}
        </div>
        <div class={classes.BtnContainer}>
          <sl-button
            type="primary"
            disabled={states.disabled || states.saveDisabled}
            loading={states.saveLoading}
            submit
            exportparts="base: primarybutton-base"
          >
            {text.continueButton}
          </sl-button>
          {!states.hideBackButton && (
            <sl-button
              exportparts="base: secondarybutton-base"
              class={classes.SecondaryBtn}
              type="text"
              onClick={callbacks.onBack}
            >
              {text.backButton}
            </sl-button>
          )}
        </div>
      </div>
    </sl-form>
  );
};
