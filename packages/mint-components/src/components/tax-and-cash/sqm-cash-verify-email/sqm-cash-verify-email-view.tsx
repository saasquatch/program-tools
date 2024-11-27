import { VNode, h } from "@stencil/core";
import { AuthColumn, AuthWrapper } from "../../../global/mixins";
import { createStyleSheet } from "../../../styling/JSS";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";
import { useEffect, useRef, useState } from "@saasquatch/universal-hooks";

export interface CashVerifyEmailViewProps {
  states: {
    error: string;
    loading: boolean;
    success: boolean;
    verified: boolean;
    email: string;
    codeSent: boolean;
    verifyFailed?: boolean;
  };
  data: {
    oobCode: string;
  };
  callbacks: {};
  text: {
    cashVerifyHeaderText: string;
    cashVerifySubHeaderText: string;
    verifyCodeSubHeaderText: string;
    reverifyCodeSubHeaderText: string;
    resendVerifyCodeText: string;
    useDifferentEmailText: string;
    verifyText: string;
    sendCodeText: string;
    email: string;
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

export function CashVerifyEmailView(props: CashVerifyEmailViewProps) {
  const { states, data, callbacks, text } = props;

  if (states.loading) return;

  // AL: slot in tax-and-cash-form when verified

  if (states.verified) {
    return <slot></slot>;
  }

  return (
    <div class={sheet.classes.Wrapper} part="sqm-base">
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      {states.verifyFailed && (
        <sl-alert type="danger" open>
          {" "}
          <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
          The code you have entered is invalid.
        </sl-alert>
      )}
      <div class={sheet.classes.HeaderContainer}>
        {" "}
        <TextSpanView type="h2">{text.cashVerifyHeaderText}</TextSpanView>
        <TextSpanView type="p">
          {states.codeSent
            ? text.verifyCodeSubHeaderText
            : text.cashVerifySubHeaderText}
        </TextSpanView>
      </div>
      {states.codeSent ? (
        <div class={sheet.classes.InputsContainer}>
          <div style={{ display: "flex", gap: "var(--sl-spacing-medium)" }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <sl-input
                style={{ maxWidth: "40px" }}
                maxLength={1}
                key={index}
              ></sl-input>
            ))}
          </div>
          <sl-button
            class={sheet.classes.ContinueButton}
            // onClick={callbacks.submitCode
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {text.verifyText}
          </sl-button>
        </div>
      ) : (
        <div class={sheet.classes.InputsContainer}>
          {" "}
          <sl-input
            exportparts="label: input-label, base: input-base"
            // value={state.email}
            label={text.email}
            id="email"
            name="/email"
            required
          />
          <sl-button
            class={sheet.classes.ContinueButton}
            // onClick={callbacks.submitCode
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {text.sendCodeText}
          </sl-button>
        </div>
      )}
      {states.codeSent && (
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
      )}
    </div>
  );

  // if (states.error || !data.oobCode) {
  //   return <div></div>;
  // }
}
