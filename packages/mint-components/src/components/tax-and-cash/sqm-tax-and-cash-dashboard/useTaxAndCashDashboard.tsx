import { useLocale } from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { DateTime } from "luxon";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useSetParent } from "../../../utils/useParentState";
import { NextPayout } from "../sqm-payout-details-card/PayoutDetailsCard.stories";
import {
  ImpactPublisher,
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import {
  INDIRECT_TAX_PROVINCES,
  INDIRECT_TAX_SPAIN_REGIONS,
} from "../subregions";
import { taxTypeToName } from "../utils";
import { TaxAndCashDashboard } from "./sqm-tax-and-cash-dashboard";
import { TaxAndCashDashboardProps } from "./sqm-tax-and-cash-dashboard-view";
import { vatLabels } from "../countries";
import { P } from "../../../global/mixins";

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
  const regions = [...INDIRECT_TAX_PROVINCES, ...INDIRECT_TAX_SPAIN_REGIONS];
  return regions.find((r) => r.regionCode === regionCode)?.displayName;
}

function getIndirectTaxType(taxInformation: ImpactPublisher["taxInformation"]) {
  const regions = [...INDIRECT_TAX_PROVINCES, ...INDIRECT_TAX_SPAIN_REGIONS];
  if (taxInformation?.indirectTaxRegion) {
    return regions.find(
      (r) => r.regionCode === taxInformation?.indirectTaxRegion
    )?.taxType;
  }

  // Spain regions only have VAT type
  if (taxInformation?.withholdingTaxCountryCode) return "VAT";
  if (taxInformation?.indirectTaxCountryCode) {
    return vatLabels[taxInformation.indirectTaxCountryCode] || "Indirect Tax";
  }
}

export const useTaxAndCashDashboard = (
  props: TaxAndCashDashboard
): TaxAndCashDashboardProps => {
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
    slots: {
      // TODO: Replace this story once we have hooks for payment details card
      payoutDetailsCardSlot: <NextPayout />,
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
