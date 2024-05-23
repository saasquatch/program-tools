import { h } from "@stencil/core";
import { AuthColumn, AuthWrapper } from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";

export interface PortalVerifyEmailViewProps {
  states: {
    error: string;
    loading: boolean;
    success: boolean;
    verified: boolean;
  };
  data: {
    oobCode: string;
  };
  callbacks: {
    gotoNextPage: () => void;
    failed: () => void;
  };
  content: {
    verifySuccessText?: string;
    verifyEmailText?: string;
    verifyInvalidText?: string;
    continueText?: string;
  };
}

const style = {
  Wrapper: AuthWrapper,
  Column: AuthColumn,
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

export function PortalVerifyEmailView(props: PortalVerifyEmailViewProps) {
  const { states, data, callbacks, content } = props;

  if (states.loading) return;

  if (states.success) {
    return (
      <div class={sheet.classes.Wrapper} part="sqm-base">
        <style type="text/css">
          {vanillaStyle}
          {styleString}
        </style>
        <TextSpanView type="h3">{content.verifyEmailText}</TextSpanView>
        <sqm-form-message exportparts="success-icon">
          <div part="successalert-text">{content.verifySuccessText}</div>
        </sqm-form-message>
        <sl-button
          class={sheet.classes.ContinueButton}
          onClick={callbacks.gotoNextPage}
          loading={states.loading}
          exportparts="base: primarybutton-base"
          type="primary"
        >
          {content.continueText}
        </sl-button>
      </div>
    );
  }

  if (states.error || !data.oobCode) {
    return (
      <div class={sheet.classes.Wrapper} part="sqm-base">
        <style type="text/css">{styleString}</style>
        <TextSpanView type="h3">{content.verifyEmailText}</TextSpanView>
        <sqm-form-message type="error" exportparts="erroralert-icon">
          <div part="erroralert-text">{content.verifyInvalidText}</div>
        </sqm-form-message>
        <sl-button
          class={sheet.classes.ContinueButton}
          onClick={callbacks.failed}
          loading={states.loading}
          exportparts="base: primarybutton-base"
          type="primary"
        >
          {content.continueText}
        </sl-button>
      </div>
    );
  }
}
