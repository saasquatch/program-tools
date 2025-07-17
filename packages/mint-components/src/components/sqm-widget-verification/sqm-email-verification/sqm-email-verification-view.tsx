import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";
import { intl } from "../../../global/global";

export interface WidgetEmailVerificationViewProps {
  states: {
    error: boolean;
    initialLoading: boolean;
    loading: boolean;
    email: string;
    sendCodeError: boolean;
  };
  callbacks: {
    submitEmail: (e: any) => Promise<void>;
  };
  text: {
    verifyEmailHeaderText: string;
    sendCodeText: string;
    emailLabel: string;
    sendCodeErrorHeader: string;
    sendCodeErrorDescription: string;
    emailValidationErrorText: string;
    supportLink: string;
  };
}

const style = {
  Wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--sl-spacing-medium)",
    marginTop: "var(--sl-spacing-medium)",
  },
  InputsContainer: {
    display: "flex",
    gap: "var(--sl-spacing-medium)",
    position: "relative",
    flexDirection: "column",
    maxWidth: "320px",
  },
  ContinueButton: {
    width: "100%",
    maxWidth: "100px",
  },
  SkeletonOne: {
    width: "50%",
    height: "16px",
  },
  SkeletonTwo: {
    width: "30%",
    height: "34px",
  },
  SkeletonThree: {
    width: "15%",
    height: "24px",
  },
  ErrorInput: {
    "&::part(base)": {
      border: "1px solid var(--sl-color-danger-500)",
      borderRadius: "var(--sl-input-border-radius-medium)",
    },

    "&::part(help-text)": {
      color: "var(--sl-color-danger-500)",
    },
  },
};

const vanillaStyle = `
:host {
  display: block;
}
:host([hidden]): {
  display: none;
}

a {
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
}
`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function WidgetEmailVerificationView(
  props: WidgetEmailVerificationViewProps
) {
  const { states, callbacks, text } = props;

  const renderLoadingSkeleton = () => {
    return (
      <div class={sheet.classes.Wrapper}>
        <sl-skeleton class={sheet.classes.SkeletonOne}></sl-skeleton>
        <sl-skeleton class={sheet.classes.SkeletonTwo}></sl-skeleton>
        <sl-skeleton class={sheet.classes.SkeletonThree}></sl-skeleton>
      </div>
    );
  };

  return (
    <div part="sqm-base">
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      {states.sendCodeError && (
        <sqm-form-message type="error">
          <p part="alert-title">{text.sendCodeErrorHeader}</p>
          {intl.formatMessage(
            {
              id: "sendCodeErrorDescription",
              defaultMessage: text.sendCodeErrorDescription,
            },
            {
              supportLink: (
                <a target="_blank" href={`mailto:advocate-support@impact.com`}>
                  {text.supportLink}
                </a>
              ),
            }
          )}
        </sqm-form-message>
      )}
      {states.initialLoading ? (
        renderLoadingSkeleton()
      ) : (
        <div class={sheet.classes.Wrapper}>
          <TextSpanView type="p">{text.verifyEmailHeaderText}</TextSpanView>
          <sl-form onSl-submit={callbacks.submitEmail}>
            <div class={sheet.classes.InputsContainer}>
              <sl-input
                exportparts="label: input-label, base: input-base"
                label={text.emailLabel}
                value={states.email || ""}
                type="email"
                id="email"
                name="email"
                disabled={!!states.email || states.loading}
                {...(states.error
                  ? {
                      class: sheet.classes.ErrorInput,
                      helpText: text.emailValidationErrorText,
                    }
                  : {})}
              />
              <sl-button
                submit
                class={sheet.classes.ContinueButton}
                loading={states.loading}
                exportparts="base: primarybutton-base"
                type="primary"
              >
                {text.sendCodeText}
              </sl-button>
            </div>
          </sl-form>
        </div>
      )}
    </div>
  );
}
