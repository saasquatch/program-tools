import { h, VNode } from "@stencil/core";
import PasswordValidator from "password-validator";
import jss from "jss";
import preset from "jss-preset-default";
const passwordSchema = new PasswordValidator()
  .is()
  .min(8) // Minimum length 8
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has(/([\d`~\!@#\$%\^\&\*\(\)\-_\=\+\[\{\}\]\\\|;:'",<.>\/\?€£¥₹§±].*){1,}/); // Must contain at least 1 digit or symbol
// Taken from combining https://github.com/tarunbatra/password-validator/blob/40184970e4f65efa8aed7a64185a011a3b5d0e54/src/constants.js#L9

export const validateNewPassword = (password: string) => {
  const errors = passwordSchema.validate(password, { list: true });
  const message = getErrorMessage(errors, password);
  return message;
};

const Valid = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M6 0C2.688 0 0 2.688 0 6C0 9.312 2.688 12 6 12C9.312 12 12 9.312 12 6C12 2.688 9.312 0 6 0ZM4.8 9L1.8 6L2.646 5.154L4.8 7.302L9.354 2.748L10.2 3.6L4.8 9Z"
      fill="#259053"
    />
  </svg>
);

const Invalid = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 0C2.688 0 0 2.688 0 6C0 9.312 2.688 12 6 12C9.312 12 12 9.312 12 6C12 2.688 9.312 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.754 3.348L4.8 7.302L3.246 5.754L2.4 6.6L4.8 9L9.6 4.2L8.754 3.348Z"
      fill="#555555"
    />
  </svg>
);

const validationMessages = {
  min: "be a minimum of 8 characters",
  uppercase: "contain at least 1 uppercase character",
  lowercase: "contain at least 1 lowercase character",
  has: "contain at least 1 number or symbol",
};

const baseItem = {
  display: "flex",
  alignItems: "center",
  fontSize: "var(--sl-font-size-small)",
  "& > :not(:last-child)": {
    "margin-right": "var(--sl-spacing-x-small)",
  },
};

const style = {
  ValidationList: {
    "list-style-type": "none",
    paddingRight: "var(--sl-spacing-large)",
    margin: "var(--sl-spacing-small) 0 var(--sl-spacing-x-large)",
    "& > :not(:last-child)": {
      "margin-bottom": "var(--sl-spacing-xx-small)",
    },
    "& *": {
      "line-height": "var(--sl-line-height-dense)",
    },
  },
  ValidationItemValid: { ...baseItem, color: "var(--sl-color-success-600)" },
  ValidationItemInvalid: { ...baseItem },
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

const getErrorMessage = (errorKeys: string[], password: string): string => {
  if (!errorKeys.length && password)
    return (
      <div class={sheet.classes.ValidationItemValid}>
        <style type="text/css">{styleString}</style>
        <Valid /> <span>Password has met all requirements</span>
      </div>
    );

  return (
    <div>
      <style type="text/css">{styleString}</style>
      Password must meet the following requirements:
      <ul class={sheet.classes.ValidationList}>
        {Object.keys(validationMessages).map((errorKey) =>
          errorKeys.includes(errorKey) ? (
            <li class={sheet.classes.ValidationItemInvalid}>
              <Invalid /> <span>{validationMessages[errorKey]}</span>
            </li>
          ) : (
            <li class={sheet.classes.ValidationItemValid}>
              <Valid /> <span>{validationMessages[errorKey]}</span>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
