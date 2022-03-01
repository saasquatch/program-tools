import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import {
  DropdownFieldView,
  DropdownFieldViewProps,
} from "./sqm-dropdown-field-view";
export default {
  title: "Components/Dropdown Field",
};

const defaultProps: DropdownFieldViewProps = {
  states: {
    validationErrors: {},
  },
  content: {
    dropdownName: "options",
    dropdownLabel: "Select an option",
    errorMessage: "Must select an option",
    selectOptions: [
      <sl-menu-item value="option-1">Option 1</sl-menu-item>,
      <sl-menu-item value="option-2">Option 2</sl-menu-item>,
      <sl-menu-item value="option-3">Option 3</sl-menu-item>,
    ],
  },
};

export const Default = createHookStory(() => (
  <DropdownFieldView {...defaultProps} />
));

export const CustomLabel = createHookStory(() => (
  <DropdownFieldView
    {...defaultProps}
    content={{
      ...defaultProps.content,
      dropdownLabel: "Pick your favorite",
    }}
  />
));

export const Error = createHookStory(() => (
  <DropdownFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      validationErrors: {
        options: "Must select an option",
      },
    }}
  />
));

export const CustomError = createHookStory(() => (
  <DropdownFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      validationErrors: {
        options: "An option must be selected to continue",
      },
    }}
  />
));
