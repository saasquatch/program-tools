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
  USER_INFO_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { FormState } from "../sqm-user-info-form/useUserInfoForm";
import { IndirectTaxForm } from "./sqm-indirect-tax-form";

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
    if (!userData?.user) return;
    const { countryCode, customFields } = userData.user;

    if (customFields?.__taxProvince || customFields?.__taxIndirectTaxNumber) {
      setOption("hstCanada");
    } else if (customFields?.__taxCountry || customFields?.__taxVatNumber) {
      setOption("otherRegion");
    } else {
      if (countryCode === "CA") {
        setOption("hstCanada");
        // TODO: Check against list of countries from backend
      } else if (countryCode) {
        setOption("otherRegion");
      } else {
        setOption("notRegistered");
      }
    }

    setFormState({
      province: userData?.user?.customFields?.__taxProvince,
      vatNumber: userData?.user?.customFields?.__taxVatNumber,
      countryCode: userData?.user?.customFields?.__taxCountry || countryCode,
      indirectTaxNumber: userData?.user?.customFields?.__taxIndirectTaxNumber,
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
      // TODO: Confirm these mappings
      let defaultDocumentType: string;
      if (formData.selectedRegion === "US") {
        if (
          userData?.user?.customFields?.participantType === "businessEntity"
        ) {
          defaultDocumentType = "W8-BEN-E";
        } else if (
          userData?.user?.customFields?.participantType ===
          "individualParticipant"
        ) {
          defaultDocumentType = "W8-BEN";
        }
      }

      if (userData.user.countryCode === "US") {
        defaultDocumentType = "W9";
      }

      const customFields = {
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
