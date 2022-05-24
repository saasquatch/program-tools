import { h } from './index-832bd454.js';
import { A as AuthWrapper, a as AuthColumn, b as AuthButtonsContainer } from './mixins-d2de6ff8.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { T as TextSpanView } from './sqm-text-span-view-6c68cc9a.js';

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
function PortalResetPasswordView(props) {
  const { states, callbacks } = props;
  if (states.reset) {
    return (h("div", { class: `${sheet.classes.Wrapper} ${sheet.classes.Column}` },
      h("style", { type: "text/css" }, styleString),
      h(TextSpanView, { type: "h3" }, states.content.resetPasswordHeader),
      h("sqm-form-message", { class: sheet.classes.CodeSuccess, exportparts: "success-icon" },
        h("div", { part: "successalert-text" }, "Your password has been reset and you are being redirected. If you are not redirected, please click Continue.")),
      h("div", null,
        h("sl-button", { class: sheet.classes.ContinueButton, onClick: callbacks.gotoNextPage, loading: states.loading, exportparts: "base: primarybutton-base", type: "primary" }, states.content.continueButtonText))));
  }
  if (states.oobCodeValidating) {
    return h("div", null);
  }
  if (!states.oobCodeValid) {
    return (h("div", { class: `${sheet.classes.Wrapper} ${sheet.classes.Column}` },
      h("style", { type: "text/css" }, styleString),
      h("sqm-form-message", { class: sheet.classes.CodeError, type: "error", exportparts: "erroralert-icon" },
        h("div", { part: "erroralert-text" }, "The password reset code is invalid or has expired, please try again.")),
      h("div", null,
        h("sl-button", { class: sheet.classes.ContinueButton, onClick: callbacks.failed, exportparts: "base: primarybutton-base", type: "primary" }, states.content.continueButtonText))));
  }
  return (h("div", { class: sheet.classes.Wrapper },
    h("style", { type: "text/css" },
      vanillaStyle,
      styleString),
    h(TextSpanView, { type: "h2" }, states.reset
      ? states.content.passwordResetHeader
      : states.content.resetPasswordHeader),
    h("sl-form", { class: sheet.classes.Column, "onSl-submit": callbacks.submit },
      props.states.error && (h("sqm-form-message", { type: "error", class: sheet.classes.Banner, exportparts: "erroralert-icon" },
        h("div", { part: "erroralert-text" }, props.states.error))),
      !states.reset && (h("sqm-password-field", { fieldLabel: states.content.passwordFieldLabel, demoData: states.passwordDemoData })),
      !states.reset && states.confirmPassword && (h("sl-input", { exportparts: "label: input-label", type: "password", name: "/confirmPassword", label: states.content.confirmPasswordFieldLabel, disabled: states.loading, required: true })),
      h("div", { class: sheet.classes.ButtonsContainer },
        h("sl-button", { class: sheet.classes.ContinueButton, submit: true, loading: states.loading, exportparts: "base: primarybutton-base", type: "primary" }, states.reset
          ? states.content.continueButtonText
          : states.content.resetPasswordButtonText)))));
}

export { PortalResetPasswordView as P };
