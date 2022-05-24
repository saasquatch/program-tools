import { h } from './index-832bd454.js';
import { A as AuthWrapper, a as AuthColumn, b as AuthButtonsContainer } from './mixins-d2de6ff8.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { T as TextSpanView } from './sqm-text-span-view-6c68cc9a.js';

const style = {
  Wrapper: AuthWrapper,
  Column: { ...AuthColumn },
  ButtonsContainer: AuthButtonsContainer,
  SecondaryButton: {
    cursor: "pointer",
    width: "25%",
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
function PortalForgotPasswordView(props) {
  const { states, callbacks, content } = props;
  return (h("div", { class: sheet.classes.Wrapper },
    h("style", { type: "text/css" },
      vanillaStyle,
      styleString),
    h(TextSpanView, { type: "h3" }, content.messageSlot),
    h("sl-form", { class: sheet.classes.Column, "onSl-submit": callbacks.submit },
      props.states.error && (h("sqm-form-message", { type: "error", exportparts: "erroralert-icon" },
        h("div", { part: "erroralert-text" }, props.states.error))),
      props.states.success && (h("sqm-form-message", { type: "success", exportparts: "successalert-icon" },
        h("div", { part: "successalert-text" }, "If an account with that email exists, a password reset email will be sent."))),
      h("sl-input", { exportparts: "label: input-label", type: "email", name: "/email", label: content.emailLabel || "Email", disabled: states.loading, required: true }),
      h("div", { class: sheet.classes.ButtonsContainer },
        h("sl-button", { submit: true, loading: states.loading, exportparts: "base: primarybutton-base", type: "primary" }, content.submitLabel || "Reset Password"),
        h("div", { class: sheet.classes.SecondaryButton }, content.secondaryButton)))));
}

export { PortalForgotPasswordView as P };
