import { h } from "@stencil/core";
import {
  PortalRegisterView,
  PortalRegisterViewProps,
} from "../sqm-portal-register/sqm-portal-register-view";
import { InputFieldView, InputFieldViewProps } from "./sqm-input-field-view";
import scenario from "./sqm-input-field.feature";

export default {
  title: "Components/Input Field",
  parameters: {
    scenario,
  },
};

const defaultProps: InputFieldViewProps = {
  states: {
    validationErrors: {},
  },
  content: {
    fieldName: "field",
    fieldLabel: "My Custom Input",
    fieldType: "text",
    fieldOptional: true,
    errorMessage: "Cannot be empty",
  },
};

const defaultRegisterProps: PortalRegisterViewProps = {
  states: {
    error: "",
    loading: false,
    confirmPassword: true,
    hideInputs: false,
    loginPath: "/login",
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => {},
  },
  refs: {
    formRef: {},
  },
  content: { pageLabel: "Register", confirmPasswordLabel: "Confirm Password" },
};

export const Default = () => <InputFieldView {...defaultProps} />;

export const CustomLabel = () => (
  <InputFieldView
    {...defaultProps}
    content={{ ...defaultProps.content, fieldLabel: "My Label" }}
  />
);

export const Error = () => (
  <InputFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      validationErrors: {
        field: "Cannot be empty",
      },
    }}
  />
);

export const CustomError = () => (
  <InputFieldView
    {...defaultProps}
    content={{
      ...defaultProps.content,
      errorMessage: "A value must be entered to continue",
    }}
    states={{
      ...defaultProps.states,
      validationErrors: {
        field: "Cannot be empty",
      },
    }}
  />
);

export const DateType = () => {
  return (
    <InputFieldView
      {...defaultProps}
      content={{
        ...defaultProps.content,
        fieldLabel: "Date",
        fieldType: "date",
      }}
    />
  );
};

export const TelType = () => {
  return (
    <InputFieldView
      {...defaultProps}
      content={{
        ...defaultProps.content,
        fieldLabel: "Phone Number",
        fieldType: "tel",
      }}
    />
  );
};

export const RegistrationField = () => (
  <PortalRegisterView
    {...defaultRegisterProps}
    content={{
      ...defaultRegisterProps.content,
      formData: <InputFieldView {...defaultProps} />,
    }}
  />
);

export const RegistrationFieldCustomLabel = () => (
  <PortalRegisterView
    {...defaultRegisterProps}
    content={{
      ...defaultRegisterProps.content,
      formData: (
        <InputFieldView
          {...defaultProps}
          content={{
            ...defaultProps.content,
            fieldLabel: "Data",
          }}
        />
      ),
    }}
  />
);
