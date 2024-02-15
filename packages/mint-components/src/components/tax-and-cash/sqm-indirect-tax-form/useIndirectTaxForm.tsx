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
  COUNTRIES_NAMESPACE,
  CountriesQuery,
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  TaxCountry,
  TaxDocumentType,
  USER_FORM_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserFormContext,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { IndirectDetailsSlotViewProps } from "../sqm-user-info-form/small-views/IndirectTaxDetailsView";
import {
  INDIRECT_TAX_PROVINCES,
  INDIRECT_TAX_SPAIN_REGIONS,
} from "../subregions";
import { IndirectTaxForm } from "./sqm-indirect-tax-form";

type ConnectPartnerResult = {
  connectImpactPartner: {
    id: string;
    accountId: string;
    impactPartner: {
      connectionStatus: "NOT_CONNECTED" | "CONNECTED";
      requiredTaxDocumentType: TaxDocumentType | null;
    } | null;
  };
};
const CONNECT_PARTNER = gql`
  mutation connectImpactPartner($vars: ImpactPartnerInput!) {
    connectImpactPartner(impactPartnerInput: $vars) {
      id
      accountId
      impactPartner {
        requiredTaxDocumentType
        connectionStatus
      }
    }
  }
`;

function getOption(participantType: string, countryCode: string) {
  if (participantType === "individualParticipant") return "notRegistered";
  if (INDIRECT_TAX_COUNTRIES.find((c) => c.countryCode === countryCode)) {
    return "otherRegion";
  } else {
    return "notRegistered";
  }
}

export function useIndirectTaxForm(props: IndirectTaxForm) {
  const user = useUserIdentity();
  const setStep = useSetParent<string>(TAX_CONTEXT_NAMESPACE);
  const context = useParentValue<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);

  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<Record<string, any>>({});

  const [
    connectImpactPartner,
    { loading: connectLoading, errors: connectErrors },
  ] = useMutation<ConnectPartnerResult>(CONNECT_PARTNER);
  const userForm = useParentValue<UserFormContext>(USER_FORM_CONTEXT_NAMESPACE);
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

    const _option = getOption(userForm.participantType, userForm.countryCode);
    setOption(_option);

    const defaultCountryCode = INDIRECT_TAX_COUNTRIES.find(
      (c) => c.countryCode === userForm.countryCode
    )
      ? userForm.countryCode
      : undefined;

    if (user.impactPartner) {
      setFormState({
        province: user.impactPartner?.indirectTaxSubdivision,
        subRegion: user.impactPartner?.indirectTaxSubdivision,
        hasQst: !!user.impactPartner?.additionalTaxId,
        qstNumber: user.impactPartner?.additionalTaxId,
        hasSubRegionTaxNumber: !!user.impactPartner?.withholdingTaxNumber,
        subRegionTaxNumber: user.impactPartner?.withholdingTaxNumber,
        selectedRegion: user.impactPartner?.indirectTaxCountry,
        indirectTaxNumber: user.impactPartner?.indirectTaxNumber,
      });
    } else {
      setFormState({ selectedRegion: user?.countryCode });
    }
  }, [userData, userForm]);

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

      if (control.required && !value) {
        JSONPointer.set(validationErrors, key, true);
      }
    });

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) {
      return;
    }

    setLoading(true);
    try {
      const taxOption =
        option === "notRegistered"
          ? "NO_TAX"
          : formData.selectedRegion === userForm?.countryCode
          ? "SAME_COUNTRY"
          : "DIFFERENT_COUNTRY";

      const fields = {
        indirectTaxOption: taxOption,
        indirectTaxCountry: formData.selectedRegion, // TODO: May need formatting
        indirectTaxSubdivision: formData.province || formData.subRegion,
        indirectTaxId: formData.indirectTaxNumber,
        additionalTaxId: formData.qstNumber,
        withholdingTaxCountry:
          option !== "notRegistered" && formState.hasSubRegionTaxNumber
            ? "SPAIN"
            : undefined,
        withholdingTaxNumber: formData.subRegionTaxNumber,
        organizationType: "OTHER", // TODO: Eventually know what to pass here
      };

      const result = await connectImpactPartner({
        vars: {
          userId: user.id,
          accountId: user.accountId,
          firstName: userForm.firstName,
          lastName: userForm.lastName,
          country: userForm.countryCode, // TODO: May need formatting
          currency: userForm.currency,
          ...fields,
        },
      });
      if (!result || (result as Error)?.message) throw new Error();

      await refetch();

      if (
        (result as ConnectPartnerResult).connectImpactPartner?.impactPartner
          ?.requiredTaxDocumentType
      ) {
        setStep("/3");
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
    setStep(context.overrideBackStep || "/1");
  };

  return {
    states: {
      hideSteps: context.hideSteps,
      disabled: loading || countriesLoading || connectLoading,
      loading: loading || connectLoading || countriesLoading,
      isPartner: !!userData?.user?.impactPartner,
      formState: {
        checked: option,
        errors,
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
      // TODO: Confirm
      esRegions: INDIRECT_TAX_SPAIN_REGIONS,
      countries: INDIRECT_TAX_COUNTRIES as TaxCountry[],
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
