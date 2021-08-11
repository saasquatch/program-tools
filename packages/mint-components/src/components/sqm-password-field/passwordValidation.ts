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
  if (errors.length) {
    const message = getErrorMessage(errors);
    return message;
  }
};

const getErrorMessage = (errorKeys: string[]): string => {
  if (!errorKeys.length) return "";
  const errorStrings = errorKeys.map((key) => {
    switch (key) {
      case "min":
        return "be a minimum of 8 characters";
      case "uppercase":
        return "contain at least 1 uppercase character";
      case "lowercase":
        return "contain at least 1 lowercase character";
      case "has":
        return "contain at least 1 number or symbol";
      default:
        return "";
    }
  });

  const joinList = (list: string[]): string => {
    if (list.length === 1) {
      return list[0];
    }
    if (list.length === 2) {
      return `${list[0]} and ${list[1]}`;
    }
    if (list.length > 2) {
      const last = list.pop();
      return `${list.join(", ")}, and ${last}`;
    }
    return "";
  };

  return `Password must ${joinList(errorStrings)}.`;
};
