import { useLocale } from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { DateTime } from "luxon";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useSetParent } from "../../../utils/useParentState";
import { vatLabels } from "../countries";
import {
  ImpactPublisher,
  TaxContext,
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  UserQuery,
  USER_QUERY_NAMESPACE,
} from "../sqm-tax-and-cash/data";
import {
  INDIRECT_TAX_PROVINCES,
  INDIRECT_TAX_SPAIN_REGIONS,
} from "../subregions";
import { taxTypeToName } from "../utils";
import { TaxAndCashDashboard } from "./sqm-tax-and-cash-dashboard";
import { TaxAndCashDashboardProps } from "./sqm-tax-and-cash-dashboard-view";

function getExpiresSoon(submissionDate: number, expiryDate: number) {
  if (!submissionDate || !expiryDate) return false;
  return (
    DateTime.fromMillis(expiryDate).diff(
      DateTime.fromMillis(submissionDate),
      "days"
    )?.days <= 30
  );
}

function getCountryName(countryCode: string, locale: string) {
  if (!countryCode) return undefined;

  // @ts-ignore: DisplayNames exists on Intl
  return new Intl.DisplayNames([locale.replace("_", "-")], {
    type: "region",
    // @ts-ignore: Bad DisplayNames type (has to be array)
  }).of([countryCode]);
}

function getSubRegionName(regionCode: string) {
  // Impact adds an underscore to CANARYISLANDS, so requires a hardcoded check
  if (regionCode === "CANARY_ISLANDS") {
    return INDIRECT_TAX_SPAIN_REGIONS.find(
      (r) => r.regionCode === "CANARYISLANDS"
    )?.displayName;
  }

  const regions = [...INDIRECT_TAX_PROVINCES, ...INDIRECT_TAX_SPAIN_REGIONS];
  return regions.find((r) => r.regionCode === regionCode)?.displayName;
}

function getIndirectTaxType(taxInformation: ImpactPublisher["taxInformation"]) {
  const regions = [...INDIRECT_TAX_PROVINCES, ...INDIRECT_TAX_SPAIN_REGIONS];
  if (taxInformation?.indirectTaxRegion) {
    const standardRegion = taxInformation.indirectTaxRegion.replace("_", "");
    const taxType = regions.find(
      (r) => r.regionCode === standardRegion
    )?.taxType;

    if (taxType) return taxType;
  }

  // Spain regions only have VAT type
  if (taxInformation?.withholdingTaxCountryCode) return "VAT";
  if (taxInformation?.indirectTaxCountryCode) {
    return vatLabels[taxInformation.indirectTaxCountryCode] || "Indirect Tax";
  }

  return "Indirect Tax";
}

export const useTaxAndCashDashboard = (
  props: TaxAndCashDashboard
): Omit<TaxAndCashDashboardProps, "slots"> => {
  const setStep = useSetParent(TAX_CONTEXT_NAMESPACE);
  const setContext = useSetParent<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);

  const locale = useLocale();

  useEffect(() => {
    // Clear override context once on submitted
    setContext({});
  }, []);

  const {
    data,
    loading,
    errors: userError,
  } = useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);

  const publisher = data?.user?.impactConnection?.publisher;
  const documentType = publisher?.currentTaxDocument?.type;
  const submissionDate = publisher?.currentTaxDocument?.dateCreated;

  const dateSubmitted = submissionDate
    ? DateTime.fromMillis(submissionDate).toFormat("LLL dd, yyyy")
    : undefined;

  const expiryDate = DateTime.now().plus({ days: 30 }).toMillis();
  const dateExpired = DateTime.fromMillis(expiryDate).toFormat("LLL dd, yyyy");

  const expiresSoon = getExpiresSoon(expiryDate, submissionDate);

  const onNewDocumentClick = () => {
    setContext({
      overrideNextStep: "/dashboard",
      overrideBackStep: "/dashboard",
      hideSteps: true,
    });

    setStep(`/3`);
  };

  const onEditPayoutInfo = () => {
    setContext({
      overrideNextStep: "/dashboard",
      overrideBackStep: "/dashboard",
      hideSteps: true,
    });

    setStep("/4");
  };

  const provinceName = INDIRECT_TAX_PROVINCES.find(
    (p) => p.regionCode === publisher?.taxInformation?.indirectTaxRegion
  )?.displayName;

  return {
    states: {
      dateSubmitted,
      dateExpired,
      documentType,
      canEditPayoutInfo: publisher?.brandedSignup,
      documentTypeString: taxTypeToName(documentType),
      status: publisher?.currentTaxDocument?.status,
      subRegion: getSubRegionName(publisher?.taxInformation?.indirectTaxRegion),
      subRegionTaxNumber: publisher?.taxInformation?.withholdingTaxId,
      qstNumber: publisher?.taxInformation?.additionalTaxId,
      indirectTaxType: getIndirectTaxType(publisher?.taxInformation),
      indirectTaxNumber: publisher?.taxInformation?.indirectTaxId,
      isBusinessEntity: publisher?.requiredTaxDocumentType === "W8BENE",
      province: provinceName,
      country: getCountryName(
        publisher?.taxInformation?.indirectTaxCountryCode,
        locale
      ),
      notRegistered: !publisher?.taxInformation?.indirectTaxId,
      noFormNeeded: !documentType,
      expiresSoon,
      disabled: loading,
      loading,
      loadingError: !!userError?.message,
    },
    callbacks: {
      onClick: onNewDocumentClick,
      onEditPayoutInfo,
    },
    text: props.getTextProps(),
  };
};

export type UseTaxAndCashDashboardResult = ReturnType<
  typeof useTaxAndCashDashboard
>;
