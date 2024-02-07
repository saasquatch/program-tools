import {
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useRef, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import JSONPointer from "jsonpointer";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import {
  useParent,
  useParentValue,
  useSetParent,
} from "../../../utils/useParentState";
import {
  COUNTRIES_NAMESPACE,
  CountriesQuery,
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { IndirectTaxForm } from "./sqm-indirect-tax-form";
import { INDIRECT_TAX_COUNTRIES } from "../countries";
import { INDIRECT_TAX_PROVINCES } from "../provinces";

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
    } else if (
      INDIRECT_TAX_COUNTRIES.find((c) => c.countryCode === countryCode)
    ) {
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
  const user = useUserIdentity();
  const setStep = useSetParent<string>(TAX_CONTEXT_NAMESPACE);
  const context = useParentValue<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);

  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({});
  const [upsertUser] = useMutation(UPSERT_USER);

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

      const nextStep = defaultDocumentType
        ? `/3/${defaultDocumentType}`
        : `/submitted`;

      setStep(context.overrideNextStep || nextStep);
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
    states: {
      hideSteps: context.hideSteps,
      disabled: loading || countriesLoading,
      loading: loading || countriesLoading,
      isPartner: userData?.user?.customFields?.__taxIsPartner,
      errors,
      formState: {
        checked: option,
      },
    },
    callbacks: {
      onBack,
      onSubmit,
      onChange: setOption,
    },
    data: {
      countries: INDIRECT_TAX_COUNTRIES,
      provinces: INDIRECT_TAX_PROVINCES,
    },
    text: props.getTextProps(),
    refs: {
      formRef,
    },
    slotProps: {
      formState: { ...formState, errors },
    },
  };
}

export type UseIndirectTaxFormResult = ReturnType<typeof useIndirectTaxForm>;
