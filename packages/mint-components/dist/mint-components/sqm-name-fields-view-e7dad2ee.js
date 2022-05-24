import { h } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { E as ErrorStyles } from './mixins-d2de6ff8.js';

const style = {
  InputContainer: {
    "& > :not(:last-child)": {
      "margin-bottom": "20px",
    },
  },
  FieldsContainer: {
    "& > :not(:last-child)": {
      "margin-bottom": "var(--sl-spacing-large)",
    },
  },
  ErrorStyle: ErrorStyles,
};
const vanillaStyle = `
:host {
  margin: 0 auto;
  width: 100%;
  display: block;
}

sl-input::part(label){
  font-size: var(--sl-input-label-font-size-small);
  font-weight: var(--sl-font-weight-semibold);
}
`;
const sheet = createStyleSheet(style);
const styleString = sheet.toString();
function NameFieldsView(props) {
  const { states } = props;
  const validationErrors = states === null || states === void 0 ? void 0 : states.validationErrors;
  return (h("div", { class: sheet.classes.FieldsContainer },
    h("style", { type: "text/css" },
      vanillaStyle,
      styleString),
    h("sl-input", Object.assign({ exportparts: "label: input-label", name: "/firstName", type: "text", label: states.content.firstNameLabel, required: true }, ((validationErrors === null || validationErrors === void 0 ? void 0 : validationErrors.firstName)
      ? {
        class: sheet.classes.ErrorStyle,
        helpText: (validationErrors === null || validationErrors === void 0 ? void 0 : validationErrors.firstName) || "Cannot be empty",
      }
      : []))),
    h("sl-input", Object.assign({ exportparts: "label: input-label", name: "/lastName", type: "text", label: states.content.lastNameLabel, required: true }, ((validationErrors === null || validationErrors === void 0 ? void 0 : validationErrors.lastName)
      ? {
        class: sheet.classes.ErrorStyle,
        helpText: (validationErrors === null || validationErrors === void 0 ? void 0 : validationErrors.lastName) || "Cannot be empty",
      }
      : [])))));
}

export { NameFieldsView as N };
