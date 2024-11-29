import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";

export interface WidgetCodeVerificationViewProps {
  states: {
    loading: boolean;
    email: string;
    verifyFailed?: boolean;
  };
  refs: {
    codeWrapperRef: any;
  };
  callbacks: {
    submitCode: () => Promise<void>;
  };
  text: {
    cashVerifyHeaderText: string;
    verifyCodeSubHeaderText: string;
    reverifyCodeSubHeaderText: string;
    resendVerifyCodeText: string;
    useDifferentEmailText: string;
    verifyText: string;
    invalidCodeText: string;
  };
}

const style = {
  Wrapper: {
    maxWidth: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "var(--sl-spacing-medium)",
  },
  HeaderContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
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
    },
  },
  ContinueButton: {
    width: "100%",
  },
  FooterContainer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
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

  if (states.loading) return;

  return (
    <div class={sheet.classes.Wrapper} part="sqm-base">
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      {states.verifyFailed && (
        <sl-alert type="danger" open>
          <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
          {text.invalidCodeText}
        </sl-alert>
      )}
      <div class={sheet.classes.HeaderContainer}>
        <TextSpanView type="h2">{text.cashVerifyHeaderText}</TextSpanView>
        <TextSpanView type="p">{text.verifyCodeSubHeaderText}</TextSpanView>
      </div>
      <div class={sheet.classes.InputsContainer}>
        <div ref={refs.codeWrapperRef} class={sheet.classes.CodeInputContainer}>
          <sl-input class={sheet.classes.CodeInput} name="code"></sl-input>
          <sl-input class={sheet.classes.CodeInput} name="code"></sl-input>
          <sl-input class={sheet.classes.CodeInput} name="code"></sl-input>
          <sl-input class={sheet.classes.CodeInput} name="code"></sl-input>
          <sl-input class={sheet.classes.CodeInput} name="code"></sl-input>
          <sl-input class={sheet.classes.CodeInput} name="code"></sl-input>
        </div>
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
        {!states.verifyFailed && (
          <TextSpanView type="p">{text.resendVerifyCodeText}</TextSpanView>
        )}
        <TextSpanView type="p">
          <a href="/" style={{ textDecoration: "none" }}>
            {text.useDifferentEmailText}
          </a>
        </TextSpanView>
      </div>
    </div>
  );
}
