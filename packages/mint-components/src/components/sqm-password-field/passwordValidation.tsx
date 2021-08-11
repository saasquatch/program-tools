import { h, VNode } from "@stencil/core";
import PasswordValidator from "password-validator";
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

const getErrorMessage = (errorKeys: string[], password: string): VNode => {
  const errorItems = errorKeys.map((key) => {
    switch (key) {
      case "min":
        return <li>be a minimum of 8 characters</li>;
      case "uppercase":
        return <li>contain at least 1 uppercase character</li>;
      case "lowercase":
        return <li>contain at least 1 lowercase character</li>;
      case "has":
        return <li>contain at least 1 number or symbol</li>;
      default:
        return "";
    }
  });
  if (!errorItems.length && password)
    return (
      <div>
        <b style={{ color: "green" }}>✓</b> Password has met all requirements
      </div>
    );
  return (
    <div>
      Password must meet the following requirements:
      <ul>{errorItems.map((item) => item)}</ul>
    </div>
  );
};
