import { useMutation, useQuery } from "@saasquatch/component-boilerplate";
import { useRef, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import JSONPointer from "jsonpointer";
import { useParent, useParentValue } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  USER_INFO_NAMESPACE,
} from "../sqm-tax-and-cash/useTaxAndCash";

const GET_COUNTRIES = gql`
  query getCurrencies {
    countries(limit: 1000) {
      data {
        countryCode
        displayName
      }
    }
  }
`;

const UPSERT_USER = gql`
  mutation ($userInput: UserInput!) {
    upsertUser(userInput: $userInput) {
      firstName
      lastName
    }
  }
`;

export function useIndirectTaxForm(props: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useParent(TAX_CONTEXT_NAMESPACE);
  const userFormData = useParentValue(USER_INFO_NAMESPACE);
  const [upsertUser, upsertUserResponse] = useMutation(UPSERT_USER);

  // from step 1
  console.log({ userFormData });

  const [option, setOption] = useState<
    "hstCanada" | "otherRegion" | "notRegistered"
  >(null);
  const [errors, setErrors] = useState({});

  const { data: _countries, loading: countriesLoading } = useQuery(
    GET_COUNTRIES,
    {}
  );
  const countries = _countries?.countries.data;

  const onSubmit = async (event: any) => {
    if (!option) {
      setErrors({ taxOption: true });
      return;
    }

    let formData: Record<string, string> = { taxOption: option };
    let validationErrors: Record<string, string> = {};

    const controls = event.target.getFormControls();
    const optionFields = ["hstCanada", "otherRegion", "notRegistered"];
    controls.forEach((control) => {
      if (!control.name || optionFields.includes(control.name)) return;

      const key = control.name;
      const value = control.value;
      console.log({ key, value });
      JSONPointer.set(formData, key, value);

      if (control.required && !value) {
        JSONPointer.set(validationErrors, key, { status: "invalid" });
      }
    });

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // Backend request
      setStep("/3/W9");
    } catch (e) {
      setErrors({ graphqlError: true });
    } finally {
      setLoading(false);
    }
  };

  const onBack = () => {
    setStep("/1");
  };

  return {
    loading: loading || countriesLoading,
    countries,
    text: props,
    errors,
    onBack,
    onSubmit,
    submitDisabled: !option,
    option,
    setOption,
    formRef,
  };
}
