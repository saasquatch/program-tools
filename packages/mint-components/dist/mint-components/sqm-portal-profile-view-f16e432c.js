import { h } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { P as PortalContainerView } from './sqm-portal-container-view-79dfef65.js';
import { T as TextSpanView } from './sqm-text-span-view-6c68cc9a.js';
import { i as intl } from './global-b1f18590.js';

function PortalProfileView(props) {
  var _a, _b, _c, _d, _e;
  const { states, callbacks } = props;
  const { text, formState } = states;
  const { errors, error } = formState;
  const style = {
    FormStyle: {
      "& >*:not(:last-child)": {
        "margin-bottom": "32px",
      },
    },
    Error: {
      "&::part(erroralert-base)": {
        "margin-bottom": "32px",
      },
    },
    NameInputStyle: {
      "&:not(:last-child)": {
        "margin-right": "var(--sl-spacing-medium)",
      },
    },
  };
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const country = ((_a = states.user) === null || _a === void 0 ? void 0 : _a.countryCode)
    ? intl.formatDisplayName((_b = states.user) === null || _b === void 0 ? void 0 : _b.countryCode, {
      type: "region",
    })
    : "";
  return (h(PortalContainerView, Object.assign({}, {
    direction: "row",
    padding: "xxx-large",
    gap: "xxx-large",
    minWidth: "600px",
  }),
    h("style", { type: "text/css" }, styleString),
    h(TextSpanView, Object.assign({}, { type: "h1" }), text.editProfileHeader),
    h(TextSpanView, Object.assign({}, { type: "h2" }), text.editProfileSubHeader),
    h("form", { class: sheet.classes.FormStyle, onSubmit: callbacks.onSubmit },
      states.success && (h("sqm-form-message", { exportparts: "success-icon" },
        h("div", { part: "successalert-text" }, "Your profile has been successfully updated."))),
      error && (h("sqm-form-message", { class: sheet.classes.Error, type: "error", exportparts: "erroralert-icon" },
        h("div", { part: "erroralert-text" }, error))),
      h(PortalContainerView, Object.assign({}, {
        direction: "row",
        padding: "none",
        gap: "32px",
        minWidth: "50%",
      }),
        h("sl-input", Object.assign({ class: sheet.classes.NameInputStyle, exportparts: "label: input-label", value: (_c = states.user) === null || _c === void 0 ? void 0 : _c.firstName, onInput: callbacks.onChange, label: text.firstnametext, disabled: states.loading }, ((errors === null || errors === void 0 ? void 0 : errors.firstName) && (errors === null || errors === void 0 ? void 0 : errors.firstName.status) !== "valid"
          ? { class: "ErrorStyles", helpText: "Cannot be empty" }
          : []), { id: "firstName", name: "firstName", error: (errors === null || errors === void 0 ? void 0 : errors.firstName) && (errors === null || errors === void 0 ? void 0 : errors.firstName.status) !== "valid"
            ? errors === null || errors === void 0 ? void 0 : errors.firstName.message
            : undefined })),
        h("sl-input", Object.assign({ class: sheet.classes.NameInputStyle, exportparts: "label: input-label", value: (_d = states.user) === null || _d === void 0 ? void 0 : _d.lastName, onInput: callbacks.onChange, label: text.lastnametext, disabled: states.loading, id: "lastName", name: "lastName" }, ((errors === null || errors === void 0 ? void 0 : errors.lastName) && (errors === null || errors === void 0 ? void 0 : errors.lastName.status) !== "valid"
          ? { class: "ErrorStyles", helpText: "Cannot be empty" }
          : []), { error: (errors === null || errors === void 0 ? void 0 : errors.lastName) && (errors === null || errors === void 0 ? void 0 : errors.lastName.status) !== "valid"
            ? errors === null || errors === void 0 ? void 0 : errors.lastName.message
            : undefined }))),
      h("sl-input", { label: text.emailtext, value: (_e = states.user) === null || _e === void 0 ? void 0 : _e.email, exportparts: "label: input-label", disabled: true }),
      states.showCountry && (h("sl-input", { label: text.countrytext, value: country, exportparts: "label: input-label", disabled: true })),
      h("sl-button", { type: "primary", loading: states.loading, disabled: states.submitDisabled, onClick: (e) => {
          callbacks.onSubmit(e);
        }, submit: true }, text.submitChangeButtonText))));
}

export { PortalProfileView as P };
