import {
  useLocale,
  useMutation,
  useParent,
  useParentQueryValue,
  useParentValue,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import JSONPointer from "jsonpointer";
import {
  CountriesQuery,
  COUNTRIES_QUERY_NAMESPACE,
  TaxContext,
  TaxCountry,
  TaxDocumentType,
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  UserFormContext,
  UserQuery,
  USER_FORM_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
} from "../sqm-tax-and-cash/data";
import { IndirectDetailsSlotViewProps } from "../sqm-user-info-form/small-views/IndirectTaxDetailsView";
import {
  INDIRECT_TAX_PROVINCES,
  INDIRECT_TAX_SPAIN_REGIONS,
} from "../subregions";
import { getCountryObj, validTaxDocument } from "../utils";
import { IndirectTaxForm } from "./sqm-indirect-tax-form";

type ConnectPartnerResult = {
  createImpactConnection: {
    success: boolean;
    validationErrors: { field: string; message: string }[];
    user: {
      id: string;
      accountId: string;
      impactConnection: {
        connected: boolean;
        publisher: {
          brandedSignup: boolean;
          requiredTaxDocumentType: TaxDocumentType | null;
          currentTaxDocument: null | CurrentTaxDocument;
        };
      } | null;
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
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phoneNumber?: string;
  phoneNumberCountryCode?: string;
  indirectTaxCountryCode?: string;
  indirectTaxRegion?: string;
  indirectTaxId?: string;
  additionalTaxId?: string;
  withholdingTaxId?: string;
};

const CONNECT_PARTNER = gql`
  mutation createImpactConnection($vars: ImpactConnectionInput!) {
    createImpactConnection(impactConnectionInput: $vars) {
      success
      validationErrors {
        field
        message
      }
      user {
        id
        accountId
        impactConnection {
          connected
          publisher {
            brandedSignup
            requiredTaxDocumentType
            currentTaxDocument {
              type
              status
            }
          }
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
  const locale = useLocale();

  const formRef = useRef<HTMLFormElement>(null);

  const context = useParentValue<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);
  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);

  const [
    connectImpactPartner,
    { loading: connectLoading, errors: connectErrors },
  ] = useMutation<ConnectPartnerResult>(CONNECT_PARTNER);
  const userForm = useParentValue<UserFormContext>(USER_FORM_CONTEXT_NAMESPACE);
  const {
    data: userData,
    refetch,
    errors: userError,
  } = useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);
  const { data: _countriesRes, loading: countriesLoading } =
    useParentQueryValue<CountriesQuery>(COUNTRIES_QUERY_NAMESPACE);

  const intlLocale = locale?.replace("_", "-") || "en";

  const _countries = useMemo(
    () =>
      _countriesRes?.impactPayoutCountries?.data?.map((country) =>
        getCountryObj({ countryCode: country.countryCode, locale: intlLocale })
      ),
    [_countriesRes?.impactPayoutCountries?.data]
  );

  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState({});
  const [countrySearch, setCountrySearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(_countries || []);

  const [option, setOption] = useState<
    "hstCanada" | "otherRegion" | "notRegistered"
  >("notRegistered");

  const publisher = userData?.user?.impactConnection?.publisher;

  useEffect(() => {
    if (!publisher?.taxInformation?.indirectTaxCountryCode) return;

    const _option = getOption(
      _countries,
      publisher.taxInformation.indirectTaxCountryCode
    );
    setOption(_option);
  }, [publisher, _countries]);

  useEffect(() => {
    if (countrySearch.trim() === "") {
      setFilteredCountries(_countries || []);
    } else {
      setFilteredCountries(
        _countries?.filter((c) =>
          c.displayName.toLowerCase().includes(countrySearch.toLowerCase())
        ) || []
      );
    }
  }, [countrySearch, _countries]);

  useEffect(() => {
    const user = userData?.user;
    if (!user) return;

    if (user.impactConnection?.publisher?.taxInformation) {
      setFormState({
        province:
          user.impactConnection.publisher.taxInformation.indirectTaxRegion,
        subRegion:
          user.impactConnection.publisher.taxInformation.indirectTaxRegion,
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
      const vars = {
        user: {
          id: user.id,
          accountId: user.accountId,
        },
        firstName: userForm.firstName,
        lastName: userForm.lastName,
        countryCode: userForm.countryCode,
        currency: userForm.currency,
        address: userForm.address,
        city: userForm.city,
        state: userForm.state,
        postalCode: userForm.postalCode,
        phoneNumber: userForm.phoneNumber,
        phoneNumberCountryCode: userForm.phoneNumberCountryCode,
        indirectTaxCountryCode: formData.selectedRegion,
        indirectTaxRegion: formData.province || formData.subRegion,
        indirectTaxId: formData.indirectTaxNumber,
        additionalTaxId: formData.qstNumber,
        withholdingTaxId: formData.subRegionTaxNumber,
      } as ImpactConnectionInput;

      const result = await connectImpactPartner({
        vars,
      });

      if (!result || (result as Error)?.message) throw new Error();
      if (!(result as ConnectPartnerResult).createImpactConnection?.success) {
        // Output backend errors to console for now
        console.error(
          "Failed to create Impact connection: ",
          (result as ConnectPartnerResult).createImpactConnection
            .validationErrors
        );

        throw new Error();
      }

      await refetch();

      const resultPublisher = (result as ConnectPartnerResult)
        .createImpactConnection?.user?.impactConnection?.publisher;

      const hasValidCurrentDocument =
        validTaxDocument(resultPublisher?.requiredTaxDocumentType) &&
        resultPublisher?.currentTaxDocument;

      if (
        resultPublisher?.requiredTaxDocumentType &&
        !hasValidCurrentDocument
      ) {
        // Go to docusign form
        setStep("/3");
      } else {
        if (resultPublisher?.brandedSignup) {
          // Go to banking information form
          setStep("/4");
        } else {
          // Go right to the dashboard
          setStep("/dashboard");
        }
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
      step: step?.replace("/", ""),
      hideSteps: context.hideSteps,
      disabled: loading || countriesLoading || connectLoading,
      loading: loading || connectLoading || countriesLoading,
      isPartner: !!userData?.user?.impactConnection?.publisher,
      loadingError: !!userError?.message,
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
      allCountries: _countries,
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
