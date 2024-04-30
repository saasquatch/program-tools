import { h } from "@stencil/core";
import {
  AuthButtonsContainer,
  AuthColumn,
  AuthWrapper,
} from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";
import { PasswordFieldViewDemoProps } from "../sqm-password-field/sqm-password-field";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";

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
      meetsRequirementsText?: string;
      doesNotMeetRequirementsText?: string;
      minErrorText?: string;
      uppercaseErrorText?: string;
      lowercaseErrorText?: string;
      hasErrorText?: string;
      resetSuccessText?: string;
      passwordMismatchText?: string;
      codeInvalidText?: string;
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
  display: block;
}
:host([hidden]): {
  display: none;
}
`;

const sheet = createStyleSheet(style);
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
          <div part="successalert-text">{states.content.resetSuccessText}</div>
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
          <div part="erroralert-text">{states.content.codeInvalidText}</div>
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
            meetsRequirementsText={states.content.meetsRequirementsText}
            doesNotMeetRequirementsText={
              states.content.doesNotMeetRequirementsText
            }
            minErrorText={states.content.minErrorText}
            uppercaseErrorText={states.content.uppercaseErrorText}
            lowercaseErrorText={states.content.lowercaseErrorText}
            hasErrorText={states.content.hasErrorText}
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
