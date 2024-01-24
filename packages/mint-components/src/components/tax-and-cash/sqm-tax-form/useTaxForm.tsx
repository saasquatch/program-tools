import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "@saasquatch/universal-hooks";
import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/useTaxAndCash";
import { TaxForm } from "./sqm-tax-form";
import {
  setUserIdentity,
  useQuery,
  useRegisterWithEmailAndPasswordMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import jsonpointer from "jsonpointer";
import { gql } from "graphql-request";

// returns either error message if invalid or undefined if valid
export type ValidationErrorFunction = (input: {
  control;
  key: string;
  value;
}) => string | undefined;

export type FormState = {
  loading?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  countryCode?: string;
  currency?: string;
  participantType?: string;
  allowBankingCollection?: boolean;
  errors?: any;
  error?: string;
};

export type ValidationErrors = {
  [key: string]: string;
};

export type InitialData = {
  [key: string]: string;
};

const GET_USER = gql`
  query {
    viewer {
      ... on User {
        firstName
        lastName
        email
        countryCode
        customFields
      }
    }
  }
`;

export function useTaxForm(props: TaxForm) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>({});

  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);

  /**** DEMO DATA */

  const id = "zach.harrison@referralsaasquatch.com";
  const accountId = id;
  const programId = "klip-referral-program";

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a74miwdpofztj",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };

  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiemFjaC5oYXJyaXNvbkByZWZlcnJhbHNhYXNxdWF0Y2guY29tIiwiYWNjb3VudElkIjoiemFjaC5oYXJyaXNvbkByZWZlcnJhbHNhYXNxdWF0Y2guY29tIn19.Wi8Vd5r64g5n8VNhiY-v5cqFcLwGxPG3Wi3dVSfkFZI",
    });
    // return () => {
    //   window.widgetIdent = undefined;
    //   setUserIdentity(undefined);
    // };
  }, []);
  /*** */

  const user = useUserIdentity();

  const { data, loading } = useQuery(GET_USER, {
    id: user?.id,
    accountId: user?.accountId,
  });

  useEffect(() => {
    console.log({ data });
    const user = data?.viewer;
    if (!user) return;

    setFormState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      countryCode: user.countryCode,
      currency: user.customFields?.currency,
    });
  }, [data]);

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
    let errors: Record<string, string> = {};

    console.log({ formControls });
    formControls?.forEach((control) => {
      if (!control.name) return;

      const key = control.name;
      const value = control.value;

      jsonpointer.set(formData, key, value);
      console.log({ formData });
      // required validation
      if (control.required && !value) {
        jsonpointer.set(errors, key, props.requiredFieldErrorMessage);
      }
      // custom validation
      if (typeof control.validationError === "function") {
        const validate = control.validationError as ValidationErrorFunction;
        const validationError = validate({ control, key, value });
        if (validationError) jsonpointer.set(errors, key, validationError);
      }
    });

    if (Object.keys(errors).length) {
      setFormState({ ...formState, loading: false, error: "", errors });
      // early return for validation errors
      return;
    }

    setFormState({
      ...formState,
      loading: true,
      error: "",
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

    setStep("/2");
  }

  return {
    step: step,
    setStep: setStep,
    onSubmit,
    loading,
    text: {
      ...props,
    },
    refs: {
      formRef,
    },
    formState: { ...formState },
  };
}
