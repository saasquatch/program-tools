import { h } from "@stencil/core";

export default {
  title: "Components/Microsite Password Field",
};

export const Start = () => {
  return (
    <sqm-password-field
      demoData={{
        initValue: "",
        states: {
          enableValidation: true,
          registrationFormState: {
            validationErrors: {},
          },
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
          registrationFormState: {
            validationErrors: { password: "Cannot be empty" },
          },
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
          registrationFormState: {
            validationErrors: { password: "Incomplete" },
          },
          content: {
            fieldLabel: "Password",
          },
        },
      }}
    ></sqm-password-field>
  );
};
