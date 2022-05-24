import { h } from './index-832bd454.js';
import { A as AuthWrapper, a as AuthColumn, H as HostBlock, b as AuthButtonsContainer, E as ErrorStyles } from './mixins-d2de6ff8.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { T as TextSpanView } from './sqm-text-span-view-6c68cc9a.js';

const style = {
  Wrapper: { ...AuthWrapper, "max-width": "600px" },
  Column: AuthColumn,
  HostBlock: HostBlock,
  ":host": {
    margin: "0 auto",
    width: "100%",
  },
  ButtonsContainer: AuthButtonsContainer,
  ErrorStyle: ErrorStyles,
};
const vanillaStyle = `
sqm-portal-register {
  margin: 0 auto;
  width: 100%;
  display: block;
}

:host{
  display: block;
}

:host([hidden]) {
  display: none;
}
`;
const sheet = createStyleSheet(style);
const styleString = sheet.toString();
function PortalRegisterView(props) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const { states, refs, callbacks, content } = props;
  if (states.error) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
  return (h("div", { class: sheet.classes.Wrapper },
    h("style", { type: "text/css" },
      vanillaStyle,
      styleString),
    h(TextSpanView, { type: "h3" }, content.pageLabel),
    h("sl-form", { class: sheet.classes.Column, "onSl-submit": callbacks.submit, ref: (el) => (refs.formRef.current = el), novalidate: true },
      states.error && (h("sqm-form-message", { type: "error", exportparts: "erroralert-icon" },
        h("div", { part: "erroralert-text" }, props.states.error))),
      content.formData,
      !states.hideInputs && (h("sl-input", Object.assign({ exportparts: "label: input-label", type: "email", name: "/email", label: content.emailLabel || "Email", disabled: states.loading, required: true, validationError: ({ value }) => {
          if (!value) {
            return "Cannot be empty";
          }
          // this matches shoelace validation, but could be better
          if (!value.includes("@")) {
            return "Must be a valid email address";
          }
        } }, (((_b = (_a = states.validationState) === null || _a === void 0 ? void 0 : _a.validationErrors) === null || _b === void 0 ? void 0 : _b.email)
        ? {
          class: sheet.classes.ErrorStyle,
          helpText: ((_d = (_c = states.validationState) === null || _c === void 0 ? void 0 : _c.validationErrors) === null || _d === void 0 ? void 0 : _d.email) ||
            "Cannot be empty",
        }
        : [])))),
      !states.hideInputs && (h("sqm-password-field", { fieldLabel: content.passwordLabel, "enable-validation": states.enablePasswordValidation })),
      content.passwordField,
      !states.hideInputs && states.confirmPassword && (h("sl-input", Object.assign({ exportparts: "label: input-label", type: "password", name: "/confirmPassword", label: content.confirmPasswordLabel, disabled: states.loading, required: true }, (((_f = (_e = states.validationState) === null || _e === void 0 ? void 0 : _e.validationErrors) === null || _f === void 0 ? void 0 : _f.confirmPassword)
        ? {
          class: sheet.classes.ErrorStyle,
          helpText: ((_h = (_g = states.validationState) === null || _g === void 0 ? void 0 : _g.validationErrors) === null || _h === void 0 ? void 0 : _h.confirmPassword) ||
            "Cannot be empty",
        }
        : [])))),
      content.terms,
      h("div", { class: sheet.classes.ButtonsContainer },
        h("sl-button", { submit: true, loading: states.loading, exportparts: "base: primarybutton-base", type: "primary" }, content.submitLabel || "Register"),
        content.secondaryButton))));
}

export { PortalRegisterView as P };
