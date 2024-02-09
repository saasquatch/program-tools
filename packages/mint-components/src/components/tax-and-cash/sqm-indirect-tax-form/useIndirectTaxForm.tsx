import {
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useRef, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import JSONPointer from "jsonpointer";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useParentValue, useSetParent } from "../../../utils/useParentState";
import { INDIRECT_TAX_COUNTRIES } from "../countries";
import {
  INDIRECT_TAX_PROVINCES,
  INDIRECT_TAX_SPAIN_REGIONS,
} from "../subregions";
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
import { IndirectDetailsSlotViewProps } from "../sqm-user-info-form/small-views/IndirectTaxDetailsView";

function getOption(user: UserQuery["user"]) {
  if (!user) return;
  const { countryCode, customFields } = user;

  if (customFields?.__taxOption) return customFields.__taxOption;
  if (customFields?.participantType === "individualParticipant")
    return "notRegistered";
  if (customFields?.__taxCountry) {
    return "otherRegion";
  } else {
    if (INDIRECT_TAX_COUNTRIES.find((c) => c.countryCode === countryCode)) {
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
  const [formState, setFormState] = useState<Record<string, any>>({});
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

    const defaultCountryCode = INDIRECT_TAX_COUNTRIES.find(
      (c) => c.countryCode === user.countryCode
    )
      ? user.countryCode
      : undefined;

    setFormState({
      province: user.customFields?.__taxProvince,
      subRegion: user.customFields?.__taxSubRegion,
      hasQst: !!user.customFields?.__taxQstNumber,
      qstNumber: user.customFields?.__taxQstNumber,
      hasSubRegionTaxNumber: !!user.customFields?.__taxSubRegionTaxNumber,
      subRegionTaxNumber: user.customFields?.__taxSubRegionTaxNumber,
      selectedRegion: user.customFields?.__taxCountry || defaultCountryCode,
      indirectTaxNumber: user.customFields?.__taxIndirectTaxNumber,
    });
  }, [userData]);

  const onFormChange = (field: string, e: CustomEvent) => {
    const value = e.detail?.item?.__value;
    if (!value) console.error("Could not detect select change");
    setFormState((p) => ({ ...p, [field]: value }));
  };

  const onSubmit = async (event: any) => {
    if (!option) {
      setErrors({ taxDetails: true });
      return;
    }

    let formData: Record<string, string> = { taxOption: option };
    let validationErrors: Record<string, string> = {};

    const controls = event.target.getFormControls();

    controls.forEach((control) => {
      if (!control.name || !control.id) return;
      if (option === "notRegistered") return; // Don't include fields for notRegistered option

      const key = control.name;
      const value = control.value;
      JSONPointer.set(formData, key, value);

      console.log({ control, value });
      if (control.required && !value) {
        JSONPointer.set(validationErrors, key, true);
      }
    });

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) {
      return;
    }

    // @ts-ignore
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
        __taxSubRegion: formData.subRegion || null,
        __taxSubRegionTaxNumber: formData.subRegionTaxNumber || null,
        __taxQstNumber: formData.qstNumber || null,
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
    setStep(context.overrideBackStep || "/1");
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
      onFormChange,
      onChange: setOption,
      onQstToggle: () => setFormState((p) => ({ ...p, hasQst: !p.hasQst })),
      onSpainToggle: () =>
        setFormState((p) => ({
          ...p,
          hasSubRegionTaxNumber: !p.hasSubRegionTaxNumber,
        })),
    },
    data: {
      esRegions: INDIRECT_TAX_SPAIN_REGIONS,
      countries: INDIRECT_TAX_COUNTRIES,
      provinces: INDIRECT_TAX_PROVINCES,
    },
    text: props.getTextProps(),
    refs: {
      formRef,
    },
    slotProps: {
      formState: {
        ...formState,
        errors,
      } as IndirectDetailsSlotViewProps["states"]["formState"],
    },
  };
}

export type UseIndirectTaxFormResult = ReturnType<typeof useIndirectTaxForm>;
