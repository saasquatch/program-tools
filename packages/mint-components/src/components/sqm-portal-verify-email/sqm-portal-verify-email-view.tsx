import { h } from "@stencil/core";
import { AuthColumn, AuthWrapper } from "../../global/mixins";
import jss from "jss";
import preset from "jss-preset-default";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";

export interface PortalVerifyEmailViewProps {
  states: {
    error: string;
    loading: boolean;
    verified: boolean;
  };
  data: {
    oobCode: string;
  };
  callbacks: {
    gotoNextPage: () => void;
    failed: () => void;
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

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function PortalVerifyEmailView(props: PortalVerifyEmailViewProps) {
  const { states, data, callbacks } = props;

  if (states.verified) {
    return (
      <div class={sheet.classes.Wrapper}>
        <style type="text/css">
          {vanillaStyle}
          {styleString}
        </style>
        <TextSpanView type="h3">Verify your email</TextSpanView>
        <sqm-form-message exportparts="success-icon">
          <div part="successalert-text">
            Your email has been verified and you are being redirected. If you
            are not redirected, please click Continue.
          </div>
        </sqm-form-message>
        <sl-button
          class={sheet.classes.ContinueButton}
          onClick={callbacks.gotoNextPage}
          loading={states.loading}
          exportparts="base: primarybutton-base"
          type="primary"
        >
          Continue
        </sl-button>
      </div>
    );
  }

  if (states.error || !data.oobCode) {
    return (
      <div class={sheet.classes.Wrapper}>
        <style type="text/css">{styleString}</style>
        <TextSpanView type="h3">Verify your email</TextSpanView>
        <sqm-form-message type="error" exportparts="erroralert-icon">
          <div part="erroralert-text">
            The email verification code is invalid or has expired, please try
            again.
          </div>
        </sqm-form-message>
        <sl-button
          class={sheet.classes.ContinueButton}
          onClick={callbacks.failed}
          loading={states.loading}
          exportparts="base: primarybutton-base"
          type="primary"
        >
          Continue
        </sl-button>
      </div>
    );
  }
}
