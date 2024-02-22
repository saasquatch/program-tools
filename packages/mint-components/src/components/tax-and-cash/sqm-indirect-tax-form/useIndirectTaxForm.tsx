import {
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useRef, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import JSONPointer from "jsonpointer";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useParentValue, useSetParent } from "../../../utils/useParentState";
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
  connectImpactConnection: {
    id: string;
    accountId: string;
    impactConnection: {
      connectionStatus: "NOT_CONNECTED" | "CONNECTED";
      publisher: {
        requiredTaxDocumentType: TaxDocumentType | null;
      };
    } | null;
  };
};
const CONNECT_PARTNER = gql`
  mutation connectImpactConnection($vars: ImpactPartnerInput!) {
    connectImpactConnection(impactPartnerInput: $vars) {
      id
      accountId
      impactConnection {
        connectionStatus
        publisher {
          requiredTaxDocumentType
          connectionStatus
        }
      }
    }
  }
`;

function getOption(countries: TaxCountry[] | undefined, countryCode: string) {
  console.log({ countries, countryCode });
  if (!countries) return;

  if (countries.find((c) => c.impactCountryCode === countryCode)) {
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
    const _option = getOption(
      _countries?.impactPartnerCountries?.data,
      userForm.countryCode
    );
    setOption(_option);
  }, [userForm, _countries]);

  useEffect(() => {
    const user = userData?.user;
    if (!user) return;

    if (user.impactConnection?.publisher) {
      setFormState({
        province: user.impactConnection.publisher.indirectTaxSubdivision,
        subRegion: user.impactConnection.publisher.indirectTaxSubdivision,
        hasQst: !!user.impactConnection.publisher.additionalTaxId,
        qstNumber: user.impactConnection.publisher.additionalTaxId,
        hasSubRegionTaxNumber:
          !!user.impactConnection.publisher.withholdingTaxNumber,
        subRegionTaxNumber:
          user.impactConnection.publisher.withholdingTaxNumber,
        selectedRegion: user.impactConnection.publisher.indirectTaxCountry,
        indirectTaxNumber: user.impactConnection.publisher.indirectTaxId,
      });
    } else {
      setFormState({
        selectedRegion: user?.countryCode || userForm?.countryCode,
      });
    }
  }, [userData, userForm]);

  const onFormChange = (field: string, e: CustomEvent) => {
    const value = e.detail?.item?.__value;
    if (!value) console.error("Could not detect select change");
    setFormState((p) => ({ ...p, [field]: value }));
  };

  const getImpactCountryCode = (countryCode: string) => {
    return _countries?.impactPartnerCountries?.data?.find(
      (c) => c.countryCode === countryCode
    )?.impactCountryCode;
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
          : formData.selectedRegion ===
            getImpactCountryCode(userForm?.countryCode)
          ? "SAME_COUNTRY"
          : "DIFFERENT_COUNTRY";

      const fields = {
        indirectTaxOption: taxOption,
        indirectTaxCountry: formData.selectedRegion, // TODO: May need formatting
        indirectTaxSubdivision: formData.province || formData.subRegion,
        indirectTaxId: formData.indirectTaxNumber,
        additionalTaxId: formData.qstNumber,
        withholdingTaxCountry:
          option !== "notRegistered" &&
          formState.selectedRegion === "SPAIN" &&
          formState.hasSubRegionTaxNumber
            ? "SPAIN"
            : undefined,
        withholdingTaxNumber: formData.subRegionTaxNumber,
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
        (result as ConnectPartnerResult).connectImpactConnection
          ?.impactConnection?.publisher?.requiredTaxDocumentType
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
      isPartner: false,
      // isPartner: !!userData?.user?.impactPartner,
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
      countries: _countries?.impactPartnerCountries?.data,
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
