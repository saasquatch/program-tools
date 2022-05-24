import { h } from './index-832bd454.js';
import { i as intl } from './global-b1f18590.js';
import { A as AuthWrapper, a as AuthColumn } from './mixins-d2de6ff8.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { T as TextSpanView } from './sqm-text-span-view-6c68cc9a.js';

const style = {
  Wrapper: AuthWrapper,
  Column: { ...AuthColumn },
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
function PortalEmailVerificationView(props) {
  const { states, callbacks, content: { email, verifyMessage, emailVerificationHeader, resendEmailButtonText, }, } = props;
  return (h("div", { class: sheet.classes.Wrapper },
    h("style", { type: "text/css" },
      vanillaStyle,
      styleString),
    h(TextSpanView, { type: "h3" }, emailVerificationHeader),
    h("sl-form", { class: sheet.classes.Column, "onSl-submit": callbacks.submit },
      props.states.error && (h("sqm-form-message", { type: "error", exportparts: "erroralert-icon" },
        h("div", { part: "erroralert-text" }, props.states.error))),
      props.states.success && (h("sqm-form-message", { type: "success", exportparts: "successalert-icon" },
        h("div", { part: "successalert-text" }, "Your verification email has been resent successfully"))),
      h(TextSpanView, { type: "p" }, intl.formatMessage({
        id: "verifyMessage",
        defaultMessage: verifyMessage,
      }, {
        email: (h("span", { style: { fontWeight: "var(--sl-font-weight-semibold)" } }, email)),
      })),
      h("sl-button", { submit: true, loading: states.loading, exportparts: "base: primarybutton-base", type: "primary" }, resendEmailButtonText))));
}

export { PortalEmailVerificationView as P };
