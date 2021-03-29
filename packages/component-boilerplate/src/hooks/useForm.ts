import { useEffect, useReducer } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import debugFn from "debug";
import jsonpointer from "jsonpointer";
import { useMutation } from "./graphql/useMutation";
import { useLazyQuery } from "./graphql/useLazyQuery";
export const debug = debugFn("sq:useForm");

const GET_FORM = gql`
  query($key: String!) {
    form(key: $key) {
      schema
      initialData {
        initialData
        isEnabled
        isEnabledErrorMessage
      }
    }
  }
`;

const SUBMIT_FORM = gql`
  mutation($formSubmissionInput: FormSubmissionInput!) {
    submitForm(formSubmissionInput: $formSubmissionInput) {
      success
      results {
        ... on FormHandlerSubmissionResult {
          formHandler {
            name
            endpointUrl
            integration {
              name
            }
          }
          result
        }
        ... on FormHandlerError {
          formHandler {
            name
            endpointUrl
            integration {
              name
            }
          }
          errorType
          error
          errorCode
        }
      }
    }
  }
`;

const VALIDATE_FORM = gql`
  query($formValidationInput: FormValidationInput!) {
    validateForm(formValidationInput: $formValidationInput) {
      valid
      results {
        ... on FormHandlerValidationResult {
          formHandler {
            name
            endpointUrl
            integration {
              name
            }
          }
          result
        }
        ... on FormHandlerError {
          formHandler {
            name
            endpointUrl
            integration {
              name
            }
          }
          errorType
          error
          errorCode
        }
      }
    }
  }
`;

type UseFormProps = {
  formKey: string;
  formRef: HTMLFormElement;
  setInitialData?: (htmlForm?: HTMLFormElement, initialData?: unknown) => void;
};

type FormState = {
  validating: boolean;
  valid: boolean;
  enabled: boolean;
  disabledMessage: string;
  error: string;
  formData: object;
};

// type ValidateFormResult = {
//   data?: {
//     validateForm: {
//       valid: boolean;
//       results: [];
//     };
//   };
//   errors?: [{ message: string }];
// };

export function useForm(props: UseFormProps) {
  const { formKey, formRef } = props;

  const variables = {
    key: formKey,
  };

  const [getForm, { data, loading: loadingForm }] = useLazyQuery(GET_FORM);
  const [submit, { data: submitData }] = useMutation(SUBMIT_FORM);
  const [validate, { data: validationData }] = useLazyQuery(VALIDATE_FORM);

  const initialState = {
    enabled: false,
    disabledMessage: "",
    validating: false,
    valid: true,
    validationMessage: "",
    error: "",
    formData: {},
  };

  const [formState, setFormState] = useReducer<FormState, Partial<FormState>>(
    (state, next) => ({
      ...state,
      ...next,
    }),
    initialState
  );

  const {
    enabled,
    disabledMessage,
    validating,
    valid,
    error,
    formData,
  } = formState;

  useEffect(() => {
    getForm(variables);
  }, []);

  useEffect(() => {
    async function setInitialData(htmlForm, initialData) {
      const inputs = htmlForm.elements;

      const formContent = new FormData(htmlForm);

      debug({ htmlForm, formContent });
      formContent?.forEach((value, key) => {
        debug({ value, key, inputs });
        const input = inputs.namedItem(key) as HTMLInputElement;

        try {
          if (input.type == "checkbox") {
            input.checked = jsonpointer.get(initialData, key);
          } else {
            input.value = jsonpointer.get(initialData, key) || "";
          }
        } catch (error) {
          debug("no initialData found for key", key);
        }
      });
    }
    function initialize() {
      setFormState({
        enabled: data?.form.initialData?.isEnabled,
        disabledMessage: data?.form?.initialData?.isEnabledErrorMessage,
      });
      const htmlForm = formRef;

      if (!htmlForm) return;

      const initialData = data?.form?.initialData?.initialData;

      props.setInitialData !== undefined
        ? props.setInitialData(htmlForm, initialData)
        : setInitialData(htmlForm, initialData);
    }
    if (!loadingForm && data) initialize();
  }, [loadingForm]);

  useEffect(() => {
    if (!!validationData) {
      setFormState({
        validating: false,
        valid: validationData?.validateForm?.valid || false,
      });

      if (validationData?.validateForm?.valid) {
        submit({
          formSubmissionInput: { key: formKey, formData },
        });
      }
    }
  }, [validationData?.validateForm?.valid]);

  function getSubmissionErrors(): Array<SubmissionError> {
    if (!submitData) return [];

    const submissionResults = submitData.submitForm.results;

    return (
      submissionResults?.map((error) => {
        // salesforce errors
        const messages = error.result?.results
          ?.flatMap((res) => !res.success && res.message)
          .filter((message) => message);

        // fatal errors
        const errors = error.result?.results
          ?.flatMap(
            (res) =>
              !res.success && {
                error: res.error,
                errorType: res.errorType,
                errorCode: res.errorCode,
              }
          )
          .filter(({ error }) => error);

        return {
          integration: error.formHandler?.integration?.name,
          formHandler: error.formHandler?.name,
          messages,
          errors,
        };
      }) || []
    );
  }

  function getValidationErrors(): ValidationErrors {
    const validationErrors =
      validationData?.validateForm?.results[0]?.result?.errors;

    function getErrorAtPath(path: string) {
      return validationErrors?.filter((result) => {
        const instanceLocation = result.instanceLocation.substring(1);
        return instanceLocation === path;
      });
    }

    function getSubErrorsAtPath(path: string) {
      return validationErrors?.filter((result: ValidationError) => {
        const instanceLocation = result.instanceLocation.substring(1);
        return instanceLocation.startsWith(`${path}`);
      });
    }

    return {
      getErrorAtPath,
      getSubErrorsAtPath,
      hasSubErrors: (path) => getSubErrorsAtPath(path)?.length > 0,
    };
  }

  async function validateForm(formData) {
    await validate({
      formValidationInput: {
        key: formKey,
        formData,
      },
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    setFormState({ validating: true });
    const form = e.target;
    debug("submit form", form);
    const data = new FormData(form);

    let formData = {};

    //@ts-ignore
    for (var pair of data.entries()) {
      jsonpointer.set(formData, pair[0], pair[1]);
    }

    setFormState({ formData });

    await validateForm(formData);
  }

  return {
    states: {
      enabled,
      disabledMessage,
      loading: loadingForm,
      validating,
      valid,
      error,
    },
    data: {
      formKey,
      validationData,
      submitData,
      schema: data?.form?.schema,
    },
    callbacks: {
      handleSubmit,
      validateForm,
      setFormState,
      getValidationErrors,
      getSubmissionErrors,
    },
  };
}

interface ValidationErrors {
  getErrorAtPath(path: string): ValidationError[];
  getSubErrorsAtPath(path: string): ValidationError[];
  // TODO: implement ajv-i18n for translatable errors
  // getHumanizedErrorAtPath(path: string): string;
  hasSubErrors(path: string): boolean;
}

type ValidationError = {
  error: string;
  keywordLocation: string;
  instanceLocation: string;
};

type SubmissionError = {
  formHandler: string;
  integration: string;
  messages: string[];
};

export type UseFormViewProps = ReturnType<typeof useForm>;
