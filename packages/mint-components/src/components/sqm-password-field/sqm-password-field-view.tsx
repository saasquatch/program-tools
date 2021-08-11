import { h } from "@stencil/core";
import { ErrorStyles } from "../../global/mixins";
import jss from "jss";
import preset from "jss-preset-default";

export interface PortalPasswordFieldViewProps {
  states: {
    validationErrors: Record<string, string>;
    content: {
      fieldLabel: string;
    };
  };
  callbacks: {
    validateNewPassword: (password: string) => void;
  };
}

const style = {
  InputContainer: {
    "& > :not(:last-child)": {
      "margin-bottom": "20px",
    },
  },

  FormNamesContainer: {
    display: "flex",

    "& > *": {
      flex: "1 1 0%",
    },

    "& > :not(:last-child)": {
      "margin-right": "var(--sl-spacing-large)",
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
:host([hidden]): {
  display: none;
}
`;

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function PortalResetPasswordView(props: PortalPasswordFieldViewProps) {
  const { states, callbacks } = props;

  console.log(states);

  return (
    <div>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <sl-input
        exportparts="label: input-label"
        type="password"
        name="/password"
        label={states.content.fieldLabel || "Password"}
        required
        validationError={({ value }) => {
          if (!value) {
            return "Cannot be empty";
          }
          if (value.length < 6) {
            return "Password must be at least 6 characters";
          }
        }}
        {...(states.validationErrors?.password
          ? {
              class: sheet.classes.ErrorStyle,
              helpText: states.validationErrors?.password || "Cannot be empty",
            }
          : [])}
      ></sl-input>
    </div>
  );
}
