import { h } from "@stencil/core";
import { AuthButtonsContainer, Column, gap, HostBlock, Wrapper } from "../../global/mixins";
import jss from "jss";
import preset from "jss-preset-default";
import { PresetText } from "../../functional-components/PresetText";

export interface PortalResetPasswordViewProps {
  states: {
    error: string;
    loading: boolean;
    reset: boolean;
    confirmPassword?: boolean;
    oobCodeValidating: boolean;
    oobCodeValid: boolean;
  };
  callbacks: {
    submit: (node: any) => void;
    gotoNextPage: () => void;
    failed: () => void;
  };
}

const style = {
  Wrapper: {
    ...Wrapper,
    "max-width": "500px",
    ...Column,
    ...gap({ direction: "column", size: "var(--sl-spacing-xxx-large)" }),
  },
  Column: {
    ...Column,
    ...gap({ direction: "column", size: "var(--sl-spacing-xxx-large)" }),
  },
  ButtonsContainer: AuthButtonsContainer
};

const vanillaStyle = `
:host {
  margin: 0 auto;
  width: 100%";
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
  return (
    <div class={sheet.classes.Wrapper}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <PresetText type="h2">
        {states.reset ? "Password Reset" : "Reset your password"}
      </PresetText>
      <sl-form class={sheet.classes.Column} onSl-submit={callbacks.submit}>
        {props.states.error && (
          <sqm-form-message type="error" exportparts="erroralert-icon">
            <div part="erroralert-text">{props.states.error}</div>
          </sqm-form-message>
        )}
        {!states.reset && (
          <sl-input
            exportparts="label: input-label"
            type="password"
            name="/password"
            label="Password"
            disabled={states.loading}
            required
          ></sl-input>
        )}
        {!states.reset && states.confirmPassword && (
          <sl-input
            exportparts="label: input-label"
            type="password"
            name="/confirmPassword"
            label="Confirm Password"
            disabled={states.loading}
            required
          ></sl-input>
        )}
        <div class={sheet.classes.ButtonsContainer}>
          <sl-button
            submit
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {states.reset ? "Continue" : "Reset Password"}
          </sl-button>
        </div>
      </sl-form>
    </div>
  );
}
