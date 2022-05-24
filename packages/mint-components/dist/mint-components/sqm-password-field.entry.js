import { h, r as registerInstance } from './index-832bd454.js';
import { j as jn } from './index.module-b74a7f69.js';
import { p as d, m as useState, n as h$1 } from './stencil-hooks.module-f4b05383.js';
import { c as cjs } from './cjs-e829b75b.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { E as ErrorStyles } from './mixins-d2de6ff8.js';
import './extends-c31f1eff.js';

var constants = {
  error: {
    length: 'Length should be a valid positive number',
    password: 'Password should be a valid string'
  },
  regex: {
    digits: '(\\d.*)',
    letters: '([a-zA-Z].*)',
    symbols: '([`~\\!@#\\$%\\^\\&\\*\\(\\)\\-_\\=\\+\\[\\\{\\}\\]\\\\\|;:\\\'",<.>\\/\\?€£¥₹§±].*)',
    spaces: '([\\s].*)'
  }
};

/**
 * Generic method to test regex
 *
 * @private
 * @param {string} regex - regex to test
 *                           with password
 */
var regex = constants.regex;

function _process(regexp, repeat) {
  if (repeat && repeat > 1) {
    const parsedRepeat = parseInt(repeat, 10);
    return new RegExp(regexp + '{' + parsedRepeat + ',}').test(this.password) === this.positive;
  }
  return new RegExp(regexp).test(this.password) === this.positive;
}

var lib = {

  /**
   * Method to invert the next validations
   *
   * @param {RegExp} [symbol] - custom Regex which should not be present
   */
  not: function not(symbol) {
    this.positive = false;
    if (symbol) {
      return _process.call(this, symbol);
    }
    return true;
  },

  /**
   * Method to invert the effects of not()
   *
   * @param {RegExp} [symbol] - custom Regex which should be present
   */
  has: function has(symbol) {
    this.positive = true;
    if (symbol) {
      return _process.call(this, symbol);
    }
    return true;
  },

  /**
   * Method to invert the effects of not() and
   * to make the api readable and chainable
   *
   */
  is: function is() {
    this.positive = true;
    return true;
  },

  /**
   * Method to specify a minimum length
   *
   * @param {number} num - minimum length
   */
  min: function min(num) {
    return this.password.length >= num;
  },

  /**
   * Method to specify a maximum length
   *
   * @param {number} num - maximum length
   */
  max: function max(num) {
    return this.password.length <= num;
  },

  /**
   * Method to validate the presence of digits
   *
   * @param {number} repeat - count of required digits
   */
  digits: function digits(repeat) {
    return _process.call(this, regex.digits, repeat);
  },

  /**
   * Method to validate the presence of letters
   *
   * @param {number} repeat - count of required letters
   */
  letters: function letters(repeat) {
    return _process.call(this, regex.letters, repeat);
  },

  /**
   * Method to validate the presence of uppercase letters
   *
   * @param {number} repeat - count of required uppercase letters
   */
  uppercase: function uppercase(repeat) {
    if (repeat && repeat > 1) {
      let characterIndex = 0;
      let upperCaseLetters = 0;

      while ((upperCaseLetters < repeat) && (characterIndex < this.password.length)) {
        const currentLetter = this.password.charAt(characterIndex);
        if (currentLetter !== currentLetter.toLowerCase()) {
          upperCaseLetters++;
        }
        characterIndex++;
      }

      return (upperCaseLetters === repeat) === this.positive;
    }
    return (this.password !== this.password.toLowerCase()) === this.positive;
  },

  /**
   * Method to validate the presence of lowercase letters
   *
   * @param {number} repeat - count of required lowercase letters
   */
  lowercase: function lowercase(repeat) {
    if (repeat && repeat > 1) {
      let characterIndex = 0;
      let lowerCaseLetters = 0;

      while ((lowerCaseLetters < repeat) && (characterIndex < this.password.length)) {
        const currentLetter = this.password.charAt(characterIndex);
        if (currentLetter !== currentLetter.toUpperCase()) {
          lowerCaseLetters++;
        }
        characterIndex++;
      }

      return (lowerCaseLetters === repeat) === this.positive;
    }
    return (this.password !== this.password.toUpperCase()) === this.positive;
  },

  /**
   * Method to validate the presence of symbols
   *
   * @param {number} repeat - count of required symbols
   */
  symbols: function symbols(repeat) {
    return _process.call(this, regex.symbols, repeat);
  },

  /**
   * Method to validate the presence of space
   *
   * @param {number} repeat - count of required spaces
   */
  spaces: function spaces(repeat) {
    return _process.call(this, regex.spaces, repeat);
  },

  /**
   * Method to provide pre-defined values for password
   *
   * @param {array} list - list of values allowed
   */
  oneOf: function oneOf(list) {
    return list.indexOf(this.password) >= 0 === this.positive;
  }
};

var error = constants.error;

/**
 * Validates that a number is a valid length (positive number)
 *
 * @private
 * @param {number} num - Number to validate
 */
function _validateLength(num) {
  const len = Number(num);
  if (isNaN(len) || !Number.isInteger(len) || len < 1) {
    throw new Error(error.length);
  }
}

/**
 * Tests a validation and return the result
 *
 * @private
 * @param {string} property - Property to validate
 * @return {boolean} Boolean value indicting the validity
 *           of the password against the property
 */
function _isPasswordValidFor(property) {
  return lib[property.method].apply(this, property.arguments);
}

/**
 * Registers the properties of a password-validation schema object
 *
 * @private
 * @param {string} func - Property name
 * @param {array} args - arguments for the func property
 */
function _register(func, args) {
  // Add property to the schema
  this.properties.push({ method: func, arguments: args });
  return this;
}

class PasswordValidator {
  /**
   * Creates a password-validator schema
   *
   * @constructor
   */
  constructor() {
    this.properties = [];
  }

  /**
   * Method to validate the password against schema
   *
   * @param {string} pwd - password to valdiate
   * @param {object} options - optional options to configure validation
   * @param {boolean} [options.list] - asks for a list of validation
   *           failures instead of just true/false
   * @return {boolean|array} Boolean value indicting the validity
   *           of the password as per schema, if 'options.list'
   *           is not set. Otherwise, it returns an array of
   *           property names which failed validations
   */
  validate(pwd, options) {
    this.list = Boolean(options && options.list);
    this.password = String(pwd);

    this.positive = true;

    if (this.list) {
      return this.properties.reduce((errorList, property) => {
        // Applies all validations defined in lib one by one
        if (!_isPasswordValidFor.call(this, property)) {
          // If the validation for a property fails,
          // add it to the error list
          return errorList.concat(property.method);
        }
        return errorList;
      }, []);
    }
    return this.properties.every(_isPasswordValidFor.bind(this));
  }

  /**
   * Rule to mandate the presence of letters in the password
   *
   * @param {number} [count] - minimum number of letters required
   */
  letters(count) {
    count && _validateLength(count);
    return _register.call(this, 'letters', arguments);
  }

  /**
   * Rule to mandate the presence of digits in the password
   *
   * @param {number} [count] - minimum number of digits required
   */
  digits(count) {
    count && _validateLength(count);
    return _register.call(this, 'digits', arguments);
  }

  /**
   * Rule to mandate the presence of symbols in the password
   *
   * @param {number} [count] - minimum number of symbols required
   */
  symbols(count) {
    count && _validateLength(count);
    return _register.call(this, 'symbols', arguments);
  }

  /**
   * Rule to specify a minimum length of the password
   *
   * @param {number} num - minimum length
   */
  min(num) {
    _validateLength(num);
    return _register.call(this, 'min', arguments);
  }

  /**
   * Rule to specify a maximum length of the password
   *
   * @param {number} num - maximum length
   */
  max(num) {
    _validateLength(num);
    return _register.call(this, 'max', arguments);
  }

  /**
   * Rule to mandate the presence of lowercase letters in the password
   *
   * @param {number} [count] - minimum number of lowercase letters required
   */
  lowercase(count) {
    count && _validateLength(count);
    return _register.call(this, 'lowercase', arguments);
  }

  /**
   * Rule to mandate the presence of uppercase letters in the password
   *
   * @param {number} [count] - minimum number of uppercase letters required
   */
  uppercase(count) {
    count && _validateLength(count);
    return _register.call(this, 'uppercase', arguments);
  }

  /**
   * Rule to mandate the presence of space in the password
   * It can be used along with 'not' to not allow spaces
   * in the password
   *
   * @param {number} [count] - minimum number of spaces required
   */
  spaces(count) {
    count && _validateLength(count);
    return _register.call(this, 'spaces', arguments);
  }

  /**
   * Rule to invert the effects of 'not'
   * Apart from that, 'has' is also used
   * to make the api readable and chainable
   */
  has() {
    return _register.call(this, 'has', arguments);
  }

  /**
   * Rule to invert the next applied rules.
   * All the rules applied after 'not' will have opposite effect,
   * until 'has' rule is applied
   */
  not() {
    return _register.call(this, 'not', arguments);
  }

  /**
   * Rule to invert the effects of 'not'
   * Apart from that, 'is' is also used
   * to make the api readable and chainable
   */
  is() {
    return _register.call(this, 'is', arguments);
  }

  /**
   * Rule to whitelist words to be used as password
   *
   * @param {array} list - list of values allowed
   */
  oneOf() {
    return _register.call(this, 'oneOf', arguments);
  }
}

var src = PasswordValidator;

const passwordSchema = new src()
  .is()
  .min(8) // Minimum length 8
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has(/([\d`~\!@#\$%\^\&\*\(\)\-_\=\+\[\{\}\]\\\|;:'",<.>\/\?€£¥₹§±].*){1,}/); // Must contain at least 1 digit or symbol
// Taken from combining https://github.com/tarunbatra/password-validator/blob/40184970e4f65efa8aed7a64185a011a3b5d0e54/src/constants.js#L9
const validateNewPassword = (password) => {
  const errors = passwordSchema.validate(password, { list: true });
  const message = getErrorMessage(errors, password);
  return message;
};
const Valid = () => (h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 12 12", fill: "none" },
  h("path", { d: "M6 0C2.688 0 0 2.688 0 6C0 9.312 2.688 12 6 12C9.312 12 12 9.312 12 6C12 2.688 9.312 0 6 0ZM4.8 9L1.8 6L2.646 5.154L4.8 7.302L9.354 2.748L10.2 3.6L4.8 9Z", fill: "#259053" })));
const Invalid = () => (h("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
  h("path", { d: "M6 0C2.688 0 0 2.688 0 6C0 9.312 2.688 12 6 12C9.312 12 12 9.312 12 6C12 2.688 9.312 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.754 3.348L4.8 7.302L3.246 5.754L2.4 6.6L4.8 9L9.6 4.2L8.754 3.348Z", fill: "#555555" })));
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
const style$1 = {
  Base: {
    fontSize: "var(--sl-font-size-small)",
  },
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
  ValidationItemValid: {
    ...baseItem,
    color: "var(--sl-color-success-600)",
  },
  ValidationItemInvalid: { ...baseItem },
};
const sheet$1 = createStyleSheet(style$1);
const styleString$1 = sheet$1.toString();
const getErrorMessage = (errorKeys, password) => {
  if (!errorKeys.length && password)
    return (h("div", { class: sheet$1.classes.ValidationItemValid, style: { paddingBottom: "var(--sl-spacing-x-large)" } },
      h("style", { type: "text/css" }, styleString$1),
      h(Valid, null),
      " ",
      h("span", null, "Password has met all requirements")));
  return (h("div", { class: sheet$1.classes.Base },
    h("style", { type: "text/css" }, styleString$1),
    "Password must meet the following requirements:",
    h("ul", { class: sheet$1.classes.ValidationList }, Object.keys(validationMessages).map((errorKey) => errorKeys.includes(errorKey) ? (h("li", { class: sheet$1.classes.ValidationItemInvalid },
      h(Invalid, null),
      " ",
      h("span", null, validationMessages[errorKey]))) : (h("li", { class: sheet$1.classes.ValidationItemValid },
      h(Valid, null),
      " ",
      h("span", null, validationMessages[errorKey])))))));
};

const style = {
  InputContainer: {
    "& > :not(:last-child)": {
      "margin-bottom": "20px",
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
const sheet = createStyleSheet(style);
const styleString = sheet.toString();
function PortalResetPasswordView(props) {
  var _a, _b;
  const { states, callbacks } = props;
  return (h("div", { class: sheet.classes.InputContainer },
    h("style", { type: "text/css" },
      vanillaStyle,
      styleString),
    h("sl-input", Object.assign({ exportparts: "label: input-label", type: "password", name: "/password", label: states.content.fieldLabel || "Password", required: true, validationError: ({ value }) => {
        if (!value) {
          return "Cannot be empty";
        }
      } }, (((_a = states.validationErrors) === null || _a === void 0 ? void 0 : _a.password)
      ? {
        class: sheet.classes.ErrorStyle,
        helpText: ((_b = states.validationErrors) === null || _b === void 0 ? void 0 : _b.password) || "Cannot be empty",
      }
      : []), { onInput: (input) => states.enableValidation && callbacks.onInput(input) })),
    states.dynamicValidation));
}

const CONTEXT_NAME = "sq:validation-state";
function usePasswordField(props) {
  const validationState = d(CONTEXT_NAME);
  const [dynamicValidation, setDynamicValidation] = useState("");
  function onInput(input) {
    const validation = validateNewPassword(input.target.value);
    setDynamicValidation(validation);
  }
  return {
    states: {
      enableValidation: props.enableValidation,
      dynamicValidation,
      validationErrors: validationState === null || validationState === void 0 ? void 0 : validationState.validationErrors,
      content: {
        fieldLabel: props.fieldLabel,
      },
    },
    callbacks: {
      onInput,
    },
  };
}

let PortalPasswordField = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * @uiName Label for password field
     */
    this.fieldLabel = "Password";
    /**
     * @uiName Enable live password validation
     */
    this.enableValidation = true;
    h$1(this);
  }
  disconnectedCallback() { }
  render() {
    const { states, callbacks } = jn()
      ? usePasswordFieldDemo(this)
      : usePasswordField(this);
    return h(PortalResetPasswordView, { states: states, callbacks: callbacks });
  }
};
function usePasswordFieldDemo(props) {
  var _a, _b, _c, _d, _e, _f, _g;
  const [dynamicValidation, setDynamicValidation] = useState("");
  const [lastValidated, setLastValidated] = useState("");
  if (props.demoData && lastValidated != ((_a = props === null || props === void 0 ? void 0 : props.demoData) === null || _a === void 0 ? void 0 : _a.initValue)) {
    const validation = validateNewPassword(((_b = props === null || props === void 0 ? void 0 : props.demoData) === null || _b === void 0 ? void 0 : _b.initValue) || "");
    setDynamicValidation(((_c = props === null || props === void 0 ? void 0 : props.demoData) === null || _c === void 0 ? void 0 : _c.initValue) === "" ? "" : validation);
    setLastValidated((_d = props === null || props === void 0 ? void 0 : props.demoData) === null || _d === void 0 ? void 0 : _d.initValue);
  }
  function onInput(input) {
    const validation = validateNewPassword(input.target.value);
    setDynamicValidation(validation);
  }
  return cjs({
    states: {
      enableValidation: true,
      dynamicValidation,
      validationErrors: ((_f = (_e = props === null || props === void 0 ? void 0 : props.demoData) === null || _e === void 0 ? void 0 : _e.states) === null || _f === void 0 ? void 0 : _f.validationErrors) || {},
      content: {
        fieldLabel: "Password",
      },
    },
    callbacks: {
      onInput,
    },
  }, ((_g = props === null || props === void 0 ? void 0 : props.demoData) === null || _g === void 0 ? void 0 : _g.states) || {}, { arrayMerge: (_, a) => a });
}

export { PortalPasswordField as sqm_password_field };
