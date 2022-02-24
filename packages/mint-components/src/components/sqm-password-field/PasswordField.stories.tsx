import { h } from "@stencil/core";

export default {
  title: "Components/Portal Password Field",
};

export const Start = () => {
  return (
    <sqm-password-field
      demoData={{
        initValue: "",
        states: {
          enableValidation: true,
          validationErrors: {},
          content: {
            fieldLabel: "Password",
          },
        },
      }}
    ></sqm-password-field>
  );
};

export const EmptyError = () => {
  return (
    <sqm-password-field
      demoData={{
        initValue: "",
        states: {
          enableValidation: true,
          validationErrors: { password: "Cannot be empty" },
          content: {
            fieldLabel: "Password",
          },
        },
      }}
    ></sqm-password-field>
  );
};

export const ValidationError = () => {
  return (
    <sqm-password-field
      demoData={{
        initValue: "asdf",
        states: {
          enableValidation: true,
          validationErrors: { password: "Incomplete" },
          content: {
            fieldLabel: "Password",
          },
        },
      }}
    ></sqm-password-field>
  );
};
