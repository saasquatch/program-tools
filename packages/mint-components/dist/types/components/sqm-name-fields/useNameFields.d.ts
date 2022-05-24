import { NameFields } from "./sqm-name-fields";
declare type ValidationErrors = {
  [key: string]: string;
};
export declare function useNameFields(props: NameFields): {
  states: {
    validationErrors: ValidationErrors;
    content: {
      lastNameLabel: string;
      firstNameLabel: string;
    };
  };
};
export {};
