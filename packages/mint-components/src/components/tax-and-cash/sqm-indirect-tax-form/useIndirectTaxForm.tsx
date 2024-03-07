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
  COUNTRIES_QUERY_NAMESPACE,
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
  createImpactConnection: {
    id: string;
    accountId: string;
    impactConnection: {
      connected: boolean;
      publisher: {
        requiredTaxDocumentType: TaxDocumentType | null;
      };
    } | null;
  };
};
type ImpactConnectionInput = {
  user: {
    id: string;
    accountId: string;
  };
  firstName: string;
  lastName: string;
  countryCode: string;
  currency: string;
  indirectTaxCountryCode?: string;
  indirectTaxRegion?: string;
  indirectTaxId?: string;
  additionalTaxId?: string;
  withholdingTaxId?: string;
};

const CONNECT_PARTNER = gql`
  mutation createImpactConnection($vars: ImpactConnectionInput!) {
    createImpactConnection(impactConnectionInput: $vars) {
      id
      accountId
      impactConnection {
        connected
        publisher {
          requiredTaxDocumentType
        }
      }
    }
  }
`;

function getOption(countries: TaxCountry[] | undefined, countryCode: string) {
  if (!countries) return;

  if (countries.find((c) => c.countryCode === countryCode)) {
    return "otherRegion";
  } else {
    return "notRegistered";
  }
}

export function useIndirectTaxForm(props: IndirectTaxForm) {
  const user = useUserIdentity();

  const formRef = useRef<HTMLFormElement>(null);

  const context = useParentValue<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);
  const setStep = useSetParent<string>(TAX_CONTEXT_NAMESPACE);

  const [
    connectImpactPartner,
    { loading: connectLoading, errors: connectErrors },
  ] = useMutation<ConnectPartnerResult>(CONNECT_PARTNER);
  const userForm = useParentValue<UserFormContext>(USER_FORM_CONTEXT_NAMESPACE);
  const { data: userData, refetch } =
    useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);
  const { data: _countries, loading: countriesLoading } =
    useParentQueryValue<CountriesQuery>(COUNTRIES_QUERY_NAMESPACE);

  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState({});
  const [countrySearch, setCountrySearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(
    _countries?.impactPayoutCountries?.data || []
  );

  const [option, setOption] = useState<
    "hstCanada" | "otherRegion" | "notRegistered"
  >(null);

  useEffect(() => {
    const _option = getOption(
      _countries?.impactPayoutCountries?.data,
      userForm.countryCode
    );
    setOption(_option);
  }, [userForm, _countries]);

  useEffect(() => {
    if (countrySearch.trim() === "") {
      setFilteredCountries(_countries?.impactPayoutCountries?.data || []);
    } else {
      setFilteredCountries(
        _countries?.impactPayoutCountries?.data.filter((c) =>
          c.displayName.toLowerCase().includes(countrySearch.toLowerCase())
        ) || []
      );
    }
  }, [countrySearch, _countries?.impactPayoutCountries?.data]);

  useEffect(() => {
    const user = userData?.user;
    if (!user) return;

    if (user.impactConnection?.publisher) {
      setFormState({
        province: user.impactConnection.publisher.indirectTaxSubdivision,
        subRegion: user.impactConnection.publisher.indirectTaxSubdivision,
        hasQst:
          !!user.impactConnection.publisher.taxInformation.additionalTaxId,
        qstNumber:
          user.impactConnection.publisher.taxInformation.additionalTaxId,
        hasSubRegionTaxNumber:
          !!user.impactConnection.publisher.taxInformation.withholdingTaxId,
        subRegionTaxNumber:
          user.impactConnection.publisher.taxInformation.withholdingTaxId,
        selectedRegion:
          user.impactConnection.publisher.taxInformation.indirectTaxCountryCode,
        indirectTaxNumber:
          user.impactConnection.publisher.taxInformation.indirectTaxId,
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
      const result = await connectImpactPartner({
        vars: {
          user: {
            id: user.id,
            accountId: user.accountId,
          },
          firstName: userForm.firstName,
          lastName: userForm.lastName,
          countryCode: userForm.countryCode,
          currency: userForm.currency,
          indirectTaxCountryCode: formData.selectedRegion,
          indirectTaxRegion: formData.province || formData.subRegion,
          indirectTaxId: formData.indirectTaxNumber,
          additionalTaxId: formData.qstNumber,
          withholdingTaxId: formData.subRegionTaxNumber,
        } as ImpactConnectionInput,
      });
      if (!result || (result as Error)?.message) throw new Error();

      await refetch();

      if (
        (result as ConnectPartnerResult).createImpactConnection
          ?.impactConnection?.publisher?.requiredTaxDocumentType
      ) {
        // Go to docusign form
        setStep("/3");
      } else {
        // Go to banking information form
        setStep("/4");
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
      isPartner: !!userData?.user?.impactConnection?.publisher,
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
      setCountrySearch,
      onQstToggle: () => setFormState((p) => ({ ...p, hasQst: !p.hasQst })),
      onSpainToggle: () =>
        setFormState((p) => ({
          ...p,
          hasSubRegionTaxNumber: !p.hasSubRegionTaxNumber,
        })),
    },
    data: {
      esRegions: INDIRECT_TAX_SPAIN_REGIONS,
      countries: filteredCountries,
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
