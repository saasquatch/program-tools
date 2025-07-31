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
      border:
        "var(--sqm-border-thickness) solid var(--sqm-danger-color-border)",
      borderRadius: "var(--sqm-input-border-radius)",
    },

    "&::part(help-text)": {
      color: "var(--sqm-danger-color-text)",
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

*::part(primarybutton-base),
sl-button[type="primary"]::part(base) {
  font-family: var(--sqm-primary-font);
  width: 100%;
  background-color: var(--sqm-primary-button-background);
  color: var(--sqm-primary-button-color);
  border-color: var(--sqm-primary-button-color-border);
  border-radius: var(--sqm-primary-button-radius);
}

*::part(primarybutton-base):hover,
sl-button[type="primary"]::part(base):hover{
  background-color: var(--sqm-primary-button-background-hover);
  border-color: var(--sqm-primary-button-border-color-hover);
  color: var(--sqm-primary-button-color-hover);
}


*::part(primarybutton-base):focus,
sl-button[type="primary"]::part(base):focus {
  box-shadow: none;
}

*::part(secondarybutton-base),
sl-button[type="secondary"]::part(base) {
font-family: var(--sqm-primary-font);
  background-color: var(--sqm-secondary-button-background);
  color: var(--sqm-secondary-button-color);
  border-color: var(--sqm-secondary-button-color-border);
  border-radius: var(--sqm-secondary-button-radius);
}

*::part(secondarybutton-base):hover,
sl-button[type="secondary"]::part(base):hover {
  background-color: var(--sqm-secondary-button-background-hover);
  color: var(--sqm-secondary-button-color-hover);
  border-color: var(--sqm-secondary-button-border-color-hover);
}

*::part(input-label), *::part(select-label), *::part(textarea-label){
  font-family: var(--sqm-primary-font);
  font-size: var(--sqm-input-label-font-size, var(--sl-input-font-size-small));
  font-weight: var(--sl-font-weight-semibold);
  color: var(--sqm-input-label-color, var(--sqm-text), black);
}

*::part(input-base), *::part(select-base), *::part(textarea-base){
  font-family: var(--sqm-primary-font);
  background-color: var(--sqm-input-background, #fff);
  border-radius: var(--sqm-input-border-radius, var(--sl-input-border-radius-large), 0.25rem);
  color: var(--sqm-input-color, white);
  border-width: var(--sqm-border-thickness, 1px);
}

*::part(input-base):hover, *::part(select-base):hover, *::part(textarea-base):hover{
  border-color: var(--sqm-border-color-hover);
}

*::part(input-base):focus, *::part(select-base):focus, *::part(textarea-base):focus{
  border-color: var(--sqm-border-color-focus);
}

sqm-name-fields::part(input-base) {
  font-family: var(--sqm-primary-font);
  background-color: var(--sqm-input-background, #fff);
  border-radius: var(--sqm-input-border-radius, var(--sl-input-border-radius-large), 0.25rem);
  color: var(--sqm-input-color, white);
  border-width: var(--sqm-border-thickness, 1px);
}

sl-input::part(base):focus,
sl-select::part(form-control-wrapper):focus,
sl-textarea::part(textarea-label):focus {
  border-color: var(--sqm-border-color-focus);
}

*::part(input-label):disabled, *::part(select-label):disabled, *::part(textarea-label):disabled{
  background: var(--sqm-input-disabled-background, #f5f5f5);
  color: var(--sqm-input-disabled-color, var(--sl-color-gray-600));
}

*::part(input):-webkit-autofill {
  box-shadow: 0 0 0 50px var(--sqm-input-background, #fff) inset !important;
  -webkit-text-fill-color: var(--sqm-input-color, white) !important;
}

*::part(input):-webkit-autofill:hover {
  box-shadow: 0 0 0 50px var(--sqm-input-background, #fff) inset !important;
  -webkit-text-fill-color: var(--sqm-input-color, white) !important;
}

*::part(input):-webkit-autofill:focus {
  box-shadow: 0 0 0 50px var(--sqm-input-background, #fff) inset !important;
  -webkit-text-fill-color: var(--sqm-input-color, white) !important;
}

*::part(input)::placeholder,
*::part(select)::placeholder, 
*::part(textarea)::placeholder {
  font-family: var(--sqm-primary-font);
  color: var(--sqm-text-subdued);
}

*::part(input)::-webkit-input-placeholder,
*::part(select)::-webkit-input-placeholder,
*::part(textarea)::-webkit-input-placeholder {
  font-family: var(--sqm-primary-font);
  color: var(--sqm-text-subdued);
}

*::part(input)::-moz-placeholder,
*::part(select)::-moz-placeholder,
*::part(textarea)::-moz-placeholder {
  font-family: var(--sqm-primary-font);
  opacity: 1; /* Firefox adds an opacity to placeholders by default */
  color: var(--sqm-text-subdued);
}

*::part(input)::-ms-input-placeholder,
*::part(select)::-ms-input-placeholder,
*::part(textarea)::-ms-input-placeholder {
  font-family: var(--sqm-primary-font);
  color: var(--sqm-text-subdued);
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
