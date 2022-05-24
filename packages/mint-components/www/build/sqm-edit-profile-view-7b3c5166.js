import { h } from './index-832bd454.js';

const EditProfileView = (props) => {
  var _a, _b, _c, _d;
  const { states, callbacks } = props;
  const { text } = states;
  const { errors } = states.formState;
  if (states.showEdit) {
    return (h("div", { class: `CardWrapper ${!states.showEdit && "ShowEdit"}` },
      h("h2", { style: {
          fontSize: "var(--sl-font-size-x-large)",
          margin: "0px",
          textAlign: "center",
        } }, text.editprofileheader),
      h("form", { class: "FormWrapper", onSubmit: callbacks.onSubmit },
        h("div", { class: "FormSection" },
          states.formState.error && (h("sqm-form-message", { type: "error", exportparts: "erroralert-icon" },
            h("div", { part: "erroralert-text" }, states.formState.error))),
          h("sl-input", Object.assign({ exportparts: "label: input-label", value: states.formState.firstName, onInput: callbacks.onChange, label: text.firstnametext, disabled: states.loading }, (errors.firstName && errors.firstName.status !== "valid"
            ? { class: "ErrorStyles", helpText: "Cannot be empty" }
            : []), { id: "firstName", name: "firstName", error: errors.firstName && errors.firstName.status !== "valid"
              ? errors.firstName.message
              : undefined })),
          h("sl-input", Object.assign({ exportparts: "label: input-label", value: states.formState.lastName, onInput: callbacks.onChange, label: text.lastnametext, disabled: states.loading, id: "lastName", name: "lastName" }, (errors.lastName && errors.lastName.status !== "valid"
            ? { class: "ErrorStyles", helpText: "Cannot be empty" }
            : []), { error: errors.lastName && errors.lastName.status !== "valid"
              ? errors.lastName.message
              : undefined }))),
        text.showregion && states.formState.currentRegion && (h("sl-input", { exportparts: "label: input-label", disabled: true, value: states.formState.currentRegion, label: text.currentregiontext, id: "currentRegion", name: "currentRegion" })),
        h("div", { class: "ButtonWrapper" },
          h("sl-button", { onClick: () => {
              callbacks.setShowEdit(false);
            }, exportparts: "base: defaultbutton-base" }, text.canceltext),
          h("sl-button", { type: "primary", loading: states.loading, disabled: states.submitDisabled, onClick: (e) => {
              callbacks.onSubmit(e);
            }, submit: true, exportparts: "base: primarybutton-base" }, text.updatetext)))));
  }
  return (h("div", { class: `CardWrapper FormWrapper ${!states.showEdit && "ShowEdit"}` },
    h("div", { class: "FormSection" },
      h("h2", { style: {
          fontSize: "var(--sl-font-size-x-large",
          marginBottom: "0px",
          textAlign: "center",
        } }, text.editprofileheader),
      h("div", null,
        h("p", { style: { fontSize: "var(--sl-font-size-medium)" } }, (_a = states.user) === null || _a === void 0 ? void 0 :
          _a.firstName,
          " ", (_b = states.user) === null || _b === void 0 ? void 0 :
          _b.lastName),
        h("p", { style: { fontSize: "var(--sl-font-size-medium)" }, title: (_c = states.user) === null || _c === void 0 ? void 0 : _c.email }, (_d = states.user) === null || _d === void 0 ? void 0 : _d.email))),
    h("sl-button", { type: "primary", loading: states.loading, onClick: () => {
        callbacks.resetForm();
        callbacks.setShowEdit(true);
      }, exportparts: "base: primarybutton-base" }, text.editprofiletext)));
};

export { EditProfileView as E };
