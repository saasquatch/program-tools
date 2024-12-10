import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";
import { ErrorStyles } from "../../../global/mixins";

export interface WidgetCodeVerificationViewProps {
  states: {
    loading: boolean;
    email: string;
    verifyFailed?: boolean;
    codeResent?: boolean;
  };
  refs: {
    codeWrapperRef: any;
  };
  callbacks: {
    submitCode: () => Promise<void>;
  };
  text: {
    verifyCodeHeaderText: string;
    reverifyCodeHeaderText: string;
    resendCodeText: string;
    useDifferentEmailText: string;
    verifyText: string;
    invalidCodeText: string;
    codeResentSuccessfullyText: string;
  };
}

const style = {
  Wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--sl-spacing-medium)",
    maxWidth: "515px",
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
    "&::part(input)": {
      margin: "0",
      padding: "0 var(--sl-input-spacing-small)",
      fontSize: "var(--sl-font-size-large)",
    },
  },
  CodeInputError: {
    ...ErrorStyles,
    maxWidth: "40px",
    "&::part(input)": {
      margin: "0",
      padding: "0 var(--sl-input-spacing-small)",
      fontSize: "var(--sl-font-size-large)",
    },
  },
  ErrorText: {
    color: "var(--sl-color-danger-500)",
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

  // CA: There is no initial loading state so this can prob be safely removed
  const renderLoadingSkeleton = () => {
    return (
      <div class={sheet.classes.Wrapper}>
        <sl-skeleton class={sheet.classes.SkeletonOne}></sl-skeleton>
        <sl-skeleton class={sheet.classes.SkeletonTwo}></sl-skeleton>
        <sl-skeleton class={sheet.classes.SkeletonThree}></sl-skeleton>
      </div>
    );
  };
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
            {states.verifyFailed
              ? text.reverifyCodeHeaderText
              : text.verifyCodeHeaderText}
          </TextSpanView>
        </div>
        {states.codeResent && (
          <sqm-form-message type="success" exportparts="successalert-icon">
            <b>{text.codeResentSuccessfullyText}</b>
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
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {text.verifyText}
          </sl-button>
        </div>
        <div class={sheet.classes.FooterContainer}>
          <TextSpanView type="p">{text.resendCodeText}</TextSpanView>
          <TextSpanView type="p">
            <a href="/" style={{ textDecoration: "none" }}>
              {text.useDifferentEmailText}
            </a>
          </TextSpanView>
        </div>
      </div>
    </div>
  );
}
