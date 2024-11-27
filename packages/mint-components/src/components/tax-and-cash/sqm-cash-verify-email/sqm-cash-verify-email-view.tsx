import { VNode, h } from "@stencil/core";
import { AuthColumn, AuthWrapper } from "../../../global/mixins";
import { createStyleSheet } from "../../../styling/JSS";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";

export interface CashVerifyEmailViewProps {
  states: {
    error: string;
    loading: boolean;
    success: boolean;
    verified: boolean;
    email: string;
    codeSent: boolean;
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
    verifyText: string;
    sendCodeText: string;
    email: string;
  };
}

const style = {
  Wrapper: {
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
  },
  Column: AuthColumn,
  ContinueButton: {
    width: "100%",
  },
  PageDescriptionText: {
    color: "var(--sl-color-neutral-500)",
    fontSize: "var(--sl-font-size-medium)",
    marginBottom: "var(--sl-spacing-small)",
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
      <div
        style={{
          display: "flex",
          gap: "var(--sl-spacing-small)",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {" "}
        <p>{text.cashVerifyHeaderText}</p>
        <p>
          {states.codeSent
            ? text.verifyCodeSubHeaderText
            : text.cashVerifySubHeaderText}
        </p>
      </div>
      {states.codeSent ? (
        <div
          style={{
            display: "flex",
            gap: "var(--sl-spacing-xx-small)",
            position: "relative",
            flexDirection: "column",
          }}
        >
          <div>
            {[0, 1, 2, 3, 4, 5].map((index) => (
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
        <div
          style={{
            display: "flex",
            gap: "var(--sl-spacing-small)",
            flexDirection: "column",
          }}
        >
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
    </div>
  );

  // if (states.error || !data.oobCode) {
  //   return <div></div>;
  // }
}
