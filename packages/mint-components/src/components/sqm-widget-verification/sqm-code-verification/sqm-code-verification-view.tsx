import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";
import { ErrorStyles } from "../../../global/mixins";
import { intl } from "../../../global/global";

export interface WidgetCodeVerificationViewProps {
  states: {
    initialiseLoading: boolean;
    loading: boolean;
    email: string;
    verifyFailed?: boolean;
    emailResent: boolean;
  };
  refs: {
    codeWrapperRef: any;
  };
  callbacks: {
    submitCode: () => Promise<void>;
    resendEmail: () => Promise<void>;
  };
  text: {
    verifyCodeHeaderText: string;
    reverifyCodeHeaderText: string;
    resendCodeText: string;
    verifyText: string;
    invalidCodeText: string;
    codeResentSuccessfullyText: string;
    resendCodeLabel: string;
  };
}

const style = {
  Wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--sl-spacing-medium)",
    maxWidth: "550px",
  },
  HeaderContainer: {
    display: "flex",
    flexDirection: "column",
  },
  InputsContainer: {
    display: "flex",
    gap: "var(--sl-spacing-medium)",
    position: "relative",
    flexDirection: "column",
  },
  CodeInputContainer: {
    display: "flex",
    gap: "var(--sl-spacing-medium)",
  },
  CodeInput: {
    maxWidth: "40px",
    "&::part(base)": {
      borderRadius: "4px !important",
    },
    "&::part(input)": {
      margin: "0",
      padding: "0 var(--sl-input-spacing-small)",
      fontSize: "var(--sl-font-size-large)",
    },
  },
  CodeInputError: {
    ...ErrorStyles,
    maxWidth: "40px",
    "&::part(base)": {
      borderRadius: "4px !important",
    },
    "&::part(input)": {
      margin: "0",
      padding: "0 var(--sl-input-spacing-small)",
      fontSize: "var(--sl-font-size-large)",
    },
  },
  ErrorText: {
    color: "var(--sqm-danger-color-text)",
    fontSize: "var(--sl-font-size-small)",
    margin: "0",
  },
  ContinueButton: {
    width: "100%",
    maxWidth: "100px",
  },
  FooterContainer: {
    display: "flex",
    flexDirection: "column",
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
};

const vanillaStyle = `
:host {
  display: block;
}
:host([hidden]): {
  display: none;
}


`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function WidgetCodeVerificationView(
  props: WidgetCodeVerificationViewProps
) {
  const { states, refs, callbacks, text } = props;

  const resendCodeText = intl.formatMessage(
    {
      id: "resendCodeText",
      defaultMessage: text.resendCodeText,
    },
    {
      resendCodeLink: (
        <a
          href={""}
          style={{
            textDecoration: "underline",
            color: "inherit",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.preventDefault();
            callbacks.resendEmail();
          }}
        >
          {text.resendCodeLabel}
        </a>
      ),
    }
  );

  const codeResentSuccessfully = intl.formatMessage(
    {
      id: "codeResentSuccessfully",
      defaultMessage: text.codeResentSuccessfullyText,
    },
    {
      email: states.email,
    }
  );

  const inputClass = states.verifyFailed
    ? sheet.classes.CodeInputError
    : sheet.classes.CodeInput;

  return (
    <div part="sqm-base">
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <div class={sheet.classes.Wrapper}>
        <div class={sheet.classes.HeaderContainer}>
          <TextSpanView type="p">
            {intl.formatMessage(
              {
                id: `emailHeaderText`,
                defaultMessage: states.verifyFailed
                  ? text.reverifyCodeHeaderText
                  : text.verifyCodeHeaderText,
              },
              { email: states.email }
            )}
          </TextSpanView>
        </div>
        {states.emailResent && (
          <sqm-form-message type="success" exportparts="successalert-icon">
            <b>{codeResentSuccessfully}</b>
          </sqm-form-message>
        )}
        <div class={sheet.classes.InputsContainer}>
          <div
            ref={refs.codeWrapperRef}
            class={sheet.classes.CodeInputContainer}
          >
            <sl-input class={inputClass} name="code"></sl-input>
            <sl-input class={inputClass} name="code"></sl-input>
            <sl-input class={inputClass} name="code"></sl-input>
            <sl-input class={inputClass} name="code"></sl-input>
            <sl-input class={inputClass} name="code"></sl-input>
            <sl-input class={inputClass} name="code"></sl-input>
          </div>
          {states.verifyFailed && (
            <p class={sheet.classes.ErrorText}>{text.invalidCodeText}</p>
          )}
          <sl-button
            class={sheet.classes.ContinueButton}
            onClick={callbacks.submitCode}
            disabled={states.loading || states.initialiseLoading}
            loading={states.loading || states.initialiseLoading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {text.verifyText}
          </sl-button>
        </div>
        <div class={sheet.classes.FooterContainer}>
          <TextSpanView type="p">{resendCodeText}</TextSpanView>
        </div>
      </div>
    </div>
  );
}
