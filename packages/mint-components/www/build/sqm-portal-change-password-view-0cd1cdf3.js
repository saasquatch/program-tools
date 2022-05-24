import { h } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { P as PortalContainerView } from './sqm-portal-container-view-79dfef65.js';
import { P as PortalSectionView } from './sqm-portal-section-view-5c942599.js';
import { T as TextSpanView } from './sqm-text-span-view-6c68cc9a.js';

function PortalChangePasswordView(props) {
  const { states, callbacks } = props;
  const style = {
    Dialog: {
      padding: "0",
      "&::part(close-button)": {
        "margin-top": "var(--sl-spacing-medium)",
      },
      "&::part(body)": {
        padding: "0 var(--sl-spacing-x-large) var(--sl-spacing-x-large) var(--sl-spacing-x-large)",
      },
    },
    Error: {
      "&::part(erroralert-base)": {
        "margin-bottom": "15px",
      },
    },
    Success: {
      "&::part(successalert-base)": {
        "margin-bottom": "15px",
      },
    },
    InputContainer: {
      "& > :not(:last-child)": {
        "margin-bottom": "var(--sl-spacing-x-large)",
      },
    },
    CancelButton: {
      width: "25%",
      margin: "var(--sl-spacing-large) auto",
    },
    PasswordField: {
      marginBottom: "var(--sl-spacing-large) !important",
      display: "block",
    },
    ChangePasswordButton: {
      paddingTop: "var(--sl-spacing-x-large)",
    },
  };
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  return (h("div", null,
    h("style", { type: "text/css" }, styleString),
    h("sl-dialog", { class: sheet.classes.Dialog, open: states.open, "onSl-hide": () => callbacks.setOpen(false) },
      h(PortalSectionView, Object.assign({}, {
        labelMargin: "x-large",
        padding: "none",
        label: (h(TextSpanView, Object.assign({}, { type: "h2" }), states.content.modalChangePasswordHeader)),
        content: (h(PortalContainerView, Object.assign({}, { direction: "column", padding: "none", gap: "32px" }),
          states.error && (h("sqm-form-message", { class: sheet.classes.Error, type: "error", exportparts: "erroralert-icon" },
            h("div", { part: "erroralert-text" }, states.error))),
          states.success && (h("sqm-form-message", { class: sheet.classes.Success, type: "success", exportparts: "successalert-icon" },
            h("div", { part: "successalert-text" }, states.content.successMessage))),
          h("sl-form", { "onSl-submit": callbacks.submit },
            h("div", { class: sheet.classes.InputContainer },
              h("sqm-password-field", { exportparts: "input-label: input-label", class: sheet.classes.PasswordField, fieldLabel: states.content.passwordFieldLabel }),
              h("sl-input", { exportparts: "label: input-label", name: "/confirmPassword", label: states.content.confirmPasswordFieldLabel, required: true, togglePassword: true, disabled: states.loading, type: "password" })),
            h(PortalContainerView, Object.assign({}, { direction: "row", padding: "none", gap: "20px" }),
              h("sl-button", { class: sheet.classes.ChangePasswordButton, type: "primary", submit: true, loading: states.loading }, states.content.changePasswordButtonText),
              h("sl-button", { class: sheet.classes.CancelButton, type: "text", onClick: () => callbacks.setOpen(false) }, states.content.cancelText))))),
      }))),
    h(PortalSectionView, Object.assign({}, {
      labelMargin: "x-large",
      padding: "xxx-large",
      label: (h(TextSpanView, Object.assign({}, { type: "h2" }), states.content.portalChangePasswordHeader)),
      content: (h("sl-button", { onClick: () => callbacks.setOpen(true) }, states.content.portalChangePasswordButtonText)),
    }),
      h("style", { type: "text/css" }, styleString))));
}

export { PortalChangePasswordView as P };
