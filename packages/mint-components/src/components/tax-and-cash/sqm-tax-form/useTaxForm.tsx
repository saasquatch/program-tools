import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "@saasquatch/universal-hooks";
import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/useTaxAndCash";
import { TaxForm } from "./sqm-tax-form";
import { useRegisterWithEmailAndPasswordMutation } from "@saasquatch/component-boilerplate";
import jsonpointer from "jsonpointer";

// returns either error message if invalid or undefined if valid
export type ValidationErrorFunction = (input: {
  control;
  key: string;
  value;
}) => string | undefined;

export type FormState = {
  error?: string;
  validationErrors?: ValidationErrors;
  loading?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  initialData?: InitialData;
};

export type ValidationErrors = {
  [key: string]: string;
};

export type InitialData = {
  [key: string]: string;
};

export function useTaxForm(props: TaxForm) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({});

  const [request, { loading, errors, data }] =
    useRegisterWithEmailAndPasswordMutation();

  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);

  // const inputFunction = useCallback((e) => {

  //   const name = e.target?.type?.toLowerCase();
  //   if (name !== "tel") return;
  //   const asYouType = new AsYouType("US");
  //   e.target.value = asYouType.input(e.target.value);
  // }, []);

  // useEffect(() => {
  //   if (!formRef.current) return;
  //   const form = formRef.current;
  //   form.addEventListener("sl-input", inputFunction);
  //   return () => {
  //     form.removeEventListener("sl-input", inputFunction);
  //   };
  // }, [formRef.current]);

  // let errorMessage = "";
  // if (errors?.response?.["error"]) {
  //   errorMessage = props.networkErrorMessage;
  // } else if (errors?.message && !errors?.response?.errors.length) {
  //   errorMessage = props.networkErrorMessage;
  // } else {
  //   errorMessage =
  //     errors?.response?.errors?.[0]?.extensions?.message ||
  //     errors?.response?.errors?.[0]?.message ||
  //     formState?.error;
  // }

  async function onSubmit(event: any) {
    let formControls = event.target.getFormControls();

    let formData: Record<string, any> = {};
    let validationErrors: Record<string, string> = {};
    formControls?.forEach((control) => {
      if (!control.name) return;

      const key = control.name;
      const value = control.value;

      jsonpointer.set(formData, key, value);
      // required validation
      if (control.required && !value) {
        jsonpointer.set(validationErrors, key, props.requiredFieldErrorMessage);
      }
      // custom validation
      if (typeof control.validationError === "function") {
        const validate = control.validationError as ValidationErrorFunction;
        const validationError = validate({ control, key, value });
        if (validationError)
          jsonpointer.set(validationErrors, key, validationError);
      }
    });

    if (Object.keys(validationErrors).length) {
      setFormState({ loading: false, error: "", validationErrors });
      // early return for validation errors
      return;
    }

    console.log({ formData });

    setFormState({
      loading: true,
      error: "",
      validationErrors: {},
    });
    const { email, password } = formData;
    delete formData.email;
    delete formData.password;
    delete formData.confirmPassword;
    formData = { ...formData };

    const variables = {
      email,
      password,
      formData,
    };
    // try {
    //   const result = await request(variables);
    //   if (result instanceof Error) {
    //     throw result;
    //   }
    //   setFormState({
    //     loading: false,
    //     error: "",
    //     validationErrors: {},
    //   });
    // } catch (error) {
    //   setFormState({
    //     loading: false,
    //     error: props.networkErrorMessage,
    //     validationErrors: {},
    //   });
    // }
  }

  return {
    step: step,
    setStep: setStep,
    onSubmit,
    text: {
      ...props,
    },
    refs: {
      formRef,
    },
  };
}
