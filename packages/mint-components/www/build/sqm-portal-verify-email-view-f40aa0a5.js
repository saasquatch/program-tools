import { h } from './index-832bd454.js';
import { A as AuthWrapper, a as AuthColumn } from './mixins-d2de6ff8.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { T as TextSpanView } from './sqm-text-span-view-6c68cc9a.js';

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
function PortalVerifyEmailView(props) {
  const { states, data, callbacks } = props;
  if (states.verified) {
    return (h("div", { class: sheet.classes.Wrapper },
      h("style", { type: "text/css" },
        vanillaStyle,
        styleString),
      h(TextSpanView, { type: "h3" }, "Verify your email"),
      h("sqm-form-message", { exportparts: "success-icon" },
        h("div", { part: "successalert-text" }, "Your email has been verified and you are being redirected. If you are not redirected, please click Continue.")),
      h("sl-button", { class: sheet.classes.ContinueButton, onClick: callbacks.gotoNextPage, loading: states.loading, exportparts: "base: primarybutton-base", type: "primary" }, "Continue")));
  }
  if (states.error || !data.oobCode) {
    return (h("div", { class: sheet.classes.Wrapper },
      h("style", { type: "text/css" }, styleString),
      h(TextSpanView, { type: "h3" }, "Verify your email"),
      h("sqm-form-message", { type: "error", exportparts: "erroralert-icon" },
        h("div", { part: "erroralert-text" }, "The email verification code is invalid or has expired, please try again.")),
      h("sl-button", { class: sheet.classes.ContinueButton, onClick: callbacks.failed, loading: states.loading, exportparts: "base: primarybutton-base", type: "primary" }, "Continue")));
  }
}

export { PortalVerifyEmailView as P };
