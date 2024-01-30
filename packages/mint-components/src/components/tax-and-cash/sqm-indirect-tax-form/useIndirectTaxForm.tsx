import {
  useMutation,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useRef, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import JSONPointer from "jsonpointer";
import { useParent, useParentValue } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  USER_INFO_NAMESPACE,
} from "../sqm-tax-and-cash/useTaxAndCash";
import { FormState } from "../sqm-user-info-form/useUserInfoForm";
import { optional } from "../../../utilities";

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
  const [upsertUser, upsertUserResponse] = useMutation(UPSERT_USER);
  const [step, setStep] = useParent(TAX_CONTEXT_NAMESPACE);
  const userFormData = useParentValue<FormState>(USER_INFO_NAMESPACE);
  const user = useUserIdentity();

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
      setErrors({ taxDetails: true });
      return;
    }

    let formData: Record<string, string> = { taxOption: option };
    let validationErrors: Record<string, string> = {};

    const controls = event.target.getFormControls();
    const optionMapping = {
      hstCanada: ["province", "indirectTaxNumber"],
      otherRegion: ["selectedRegion", "vatNumber"],
      notRegistered: [],
    };
    const relevantFields = optionMapping[option];
    controls.forEach((control) => {
      if (!control.name || !control.id) return;
      if (!relevantFields.includes(control.id)) return;

      const key = control.name;
      const value = control.value;
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

    const { currency, participantType, ...userData } = userFormData;

    try {
      // Backend request
      await upsertUser({
        userInput: {
          id: user.id,
          accountId: user.accountId,
          ...userData,
          customFields: {
            currency,
            participantType,
            ...optional("__taxOption", formData.taxOption),
            ...optional("__taxProvince", formData.province),
            ...optional("__taxCountry", formData.selectedRegion),
            ...optional("__taxVatNumber", formData.vatNumber),
            ...optional("__taxIndirectTaxNumber", formData.indirectTaxNumber),
          },
        },
      });

      setStep("/3/W9");
    } catch (e) {
      setErrors({ general: true });
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
    onChange: setOption,
    formRef,
  };
}
