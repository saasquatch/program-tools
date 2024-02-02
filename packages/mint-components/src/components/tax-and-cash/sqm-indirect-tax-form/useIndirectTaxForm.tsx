import {
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useRef, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import JSONPointer from "jsonpointer";
import { optional } from "../../../utilities";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useParent, useParentValue } from "../../../utils/useParentState";
import {
  COUNTRIES_NAMESPACE,
  CountriesQuery,
  TAX_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { IndirectTaxForm } from "./sqm-indirect-tax-form";
import { getDocumentType } from "../sqm-tax-document-submitted/useTaxDocumentSubmitted";

function getOption(user: UserQuery["user"]) {
  if (!user) return;
  const { countryCode, customFields } = user;

  if (customFields?.__taxProvince || customFields?.__taxIndirectTaxNumber) {
    return "hstCanada";
  } else if (customFields?.__taxCountry || customFields?.__taxVatNumber) {
    return "otherRegion";
  } else {
    if (countryCode === "CA") {
      return "hstCanada";
      // TODO: Check against list of countries from backend
    } else if (countryCode) {
      return "otherRegion";
    } else {
      return "notRegistered";
    }
  }
}

const UPSERT_USER = gql`
  mutation ($userInput: UserInput!) {
    upsertUser(userInput: $userInput) {
      firstName
      lastName
    }
  }
`;

export function useIndirectTaxForm(props: IndirectTaxForm) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({});
  const [upsertUser] = useMutation(UPSERT_USER);
  const [_, setStep] = useParent(TAX_CONTEXT_NAMESPACE);
  const user = useUserIdentity();

  const { data: userData, refetch } =
    useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);
  const { data: _countries, loading: countriesLoading } =
    useParentQueryValue<CountriesQuery>(COUNTRIES_NAMESPACE);

  const [option, setOption] = useState<
    "hstCanada" | "otherRegion" | "notRegistered"
  >(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const user = userData?.user;
    if (!user) return;

    const _option = getOption(user);
    setOption(_option);

    setFormState({
      province: user.customFields?.__taxProvince,
      vatNumber: user.customFields?.__taxVatNumber,
      countryCode: user.customFields?.__taxCountry || user.countryCode,
      indirectTaxNumber: user.customFields?.__taxIndirectTaxNumber,
    });
  }, [userData]);

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
        JSONPointer.set(validationErrors, key, true);
      }
    });

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      let defaultDocumentType: string;
      if (userData?.user?.countryCode === "US") defaultDocumentType = "W9";
      if (formData.selectedRegion === "US") {
        if (
          userData?.user.customFields.participantType ===
          "individualParticipant"
        )
          defaultDocumentType = "W8-BEN";
        else if (
          userData?.user.customFields.participantType === "businessEntity"
        )
          defaultDocumentType = "W8-BEN-E";
      }

      const customFields = {
        __taxOption: option,
        __taxDocumentType: defaultDocumentType || null,
        __taxProvince: formData.province || null,
        __taxCountry: formData.selectedRegion || null,
        __taxVatNumber: formData.vatNumber || null,
        __taxIndirectTaxNumber: formData.indirectTaxNumber || null,
      };

      console.log({ formData, customFields });

      // Backend request
      await upsertUser({
        userInput: {
          id: user.id,
          accountId: user.accountId,
          customFields,
        },
      });
      await refetch();

      if (defaultDocumentType) {
        setStep(`/3/${defaultDocumentType}`);
      } else {
        setStep("/submitted");
      }
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
    text: {
      ...props,
      error: {
        generalTitle: props.generalErrorTitle,
        generalDescription: props.generalErrorDescription,
        taxDetails: props.taxDetailsError,
      },
    },
    errors,
    onBack,
    onSubmit,
    // submitDisabled: !option,
    submitDisabled: false,
    option,
    onChange: setOption,
    formRef,
    formState,
  };
}
