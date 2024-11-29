import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";

export interface WidgetEmailVerificationViewProps {
  states: {
    error: string;
    loading: boolean;
  };
  callbacks: {
    submitEmail: (e: any) => Promise<void>;
  };
  text: {
    cashVerifyHeaderText: string;
    cashVerifySubHeaderText: string;
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

export function WidgetEmailVerificationView(
  props: WidgetEmailVerificationViewProps
) {
  const { states, callbacks, text } = props;

  if (states.loading) return;

  return (
    <div class={sheet.classes.Wrapper} part="sqm-base">
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      {
        // TODO: Error state for when sending the email fails
      }
      <div class={sheet.classes.HeaderContainer}>
        <TextSpanView type="h2">{text.cashVerifyHeaderText}</TextSpanView>
        <TextSpanView type="p">{text.cashVerifySubHeaderText}</TextSpanView>
      </div>

      <sl-form onSl-submit={callbacks.submitEmail}>
        <div class={sheet.classes.InputsContainer}>
          <sl-input
            exportparts="label: input-label, base: input-base"
            label={text.email}
            type="email"
            id="email"
            name="email"
            required
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
  );

  // if (states.error || !data.oobCode) {
  //   return <div></div>;
  // }
}
