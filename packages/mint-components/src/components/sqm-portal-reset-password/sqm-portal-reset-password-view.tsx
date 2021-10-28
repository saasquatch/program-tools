import { h } from "@stencil/core";
import {
  AuthButtonsContainer,
  AuthColumn,
  AuthWrapper,
} from "../../global/mixins";
import jss from "jss";
import preset from "jss-preset-default";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";
import { PasswordFieldViewDemoProps } from "../sqm-password-field/sqm-password-field";

export interface PortalResetPasswordViewProps {
  states: {
    error: string;
    loading: boolean;
    reset: boolean;
    confirmPassword: boolean;
    oobCodeValidating: boolean;
    oobCodeValid: boolean;
    passwordDemoData?: PasswordFieldViewDemoProps;
    content: {
      passwordResetHeader: string;
      resetPasswordHeader: string;
      continueButtonText: string;
      resetPasswordButtonText: string;
      confirmPasswordFieldLabel: string;
      passwordFieldLabel: string;
    };
  };
  callbacks: {
    submit: (node: any) => void;
    gotoNextPage: () => void;
    failed: () => void;
  };
}

const style = {
  Wrapper: AuthWrapper,
  Column: AuthColumn,
  ButtonsContainer: AuthButtonsContainer,

  Banner: {
    "&::part(erroralert-base)": {
      margin: "15px 0px",
    },
  },

  CodeError: {
    "&::part(erroralert-base)": {
      "margin-bottom": "15px",
    },
  },

  CodeSuccess: {
    "&::part(successalert-base)": {
      "margin-bottom": "15px",
    },
  },

  ContinueButton: {
    width: "100%",
  },
};

const vanillaStyle = `
:host {
  margin: 0 auto;
  width: 100%;
  display: block;
}
:host([hidden]): {
  display: none;
}
`;

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function PortalResetPasswordView(props: PortalResetPasswordViewProps) {
  const { states, callbacks } = props;

  if (states.reset) {
    return (
      <div class={`${sheet.classes.Wrapper} ${sheet.classes.Column}`}>
        <style type="text/css">{styleString}</style>
        <TextSpanView type="h3">
          {states.content.resetPasswordHeader}
        </TextSpanView>
        <sqm-form-message
          class={sheet.classes.CodeSuccess}
          exportparts="success-icon"
        >
          <div part="successalert-text">
            Your password has been reset and you are being redirected. If you
            are not redirected, please click Continue.
          </div>
        </sqm-form-message>
        <div>
          <sl-button
            class={sheet.classes.ContinueButton}
            onClick={callbacks.gotoNextPage}
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {states.content.continueButtonText}
          </sl-button>
        </div>
      </div>
    );
  }

  if (states.oobCodeValidating) {
    return <div />;
  }

  if (!states.oobCodeValid) {
    return (
      <div class={`${sheet.classes.Wrapper} ${sheet.classes.Column}`}>
        <style type="text/css">{styleString}</style>
        <sqm-form-message
          class={sheet.classes.CodeError}
          type="error"
          exportparts="erroralert-icon"
        >
          <div part="erroralert-text">
            The password reset code is invalid or has expired, please try again.
          </div>
        </sqm-form-message>
        <div>
          <sl-button
            class={sheet.classes.ContinueButton}
            onClick={callbacks.failed}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {states.content.continueButtonText}
          </sl-button>
        </div>
      </div>
    );
  }

  return (
    <div class={sheet.classes.Wrapper}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <TextSpanView type="h2">
        {states.reset
          ? states.content.passwordResetHeader
          : states.content.resetPasswordHeader}
      </TextSpanView>
      <sl-form class={sheet.classes.Column} onSl-submit={callbacks.submit}>
        {props.states.error && (
          <sqm-form-message
            type="error"
            class={sheet.classes.Banner}
            exportparts="erroralert-icon"
          >
            <div part="erroralert-text">{props.states.error}</div>
          </sqm-form-message>
        )}
        {!states.reset && (
          <sqm-password-field
            fieldLabel={states.content.passwordFieldLabel}
            demoData={states.passwordDemoData}
          ></sqm-password-field>
        )}
        {!states.reset && states.confirmPassword && (
          <sl-input
            exportparts="label: input-label"
            type="password"
            name="/confirmPassword"
            label={states.content.confirmPasswordFieldLabel}
            disabled={states.loading}
            required
          ></sl-input>
        )}
        <div class={sheet.classes.ButtonsContainer}>
          <sl-button
            class={sheet.classes.ContinueButton}
            submit
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {states.reset
              ? states.content.continueButtonText
              : states.content.resetPasswordButtonText}
          </sl-button>
        </div>
      </sl-form>
    </div>
  );
}
