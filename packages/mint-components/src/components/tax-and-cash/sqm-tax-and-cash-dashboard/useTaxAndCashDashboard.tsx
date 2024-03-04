import { h } from "@stencil/core";
import { useEffect } from "@saasquatch/universal-hooks";
import { DateTime } from "luxon";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useParent, useSetParent } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { INDIRECT_TAX_PROVINCES } from "../subregions";
import { TaxAndCashDashboard } from "./sqm-tax-and-cash-dashboard";
import { TaxAndCashDashboardProps } from "./sqm-tax-and-cash-dashboard-view";
import { useLocale } from "@saasquatch/component-boilerplate";
import { NextPayout } from "../sqm-payout-details-card/PayoutDetailsCard.stories";
import { taxTypeToName } from "../utils";

function getExpiresSoon(submissionDate: number, expiryDate: number) {
  if (!submissionDate || !expiryDate) return false;
  return (
    DateTime.fromMillis(expiryDate).diff(
      DateTime.fromMillis(submissionDate),
      "days"
    )?.days <= 30
  );
}

export const useTaxAndCashDashboard = (
  props: TaxAndCashDashboard
): TaxAndCashDashboardProps => {
  const setStep = useSetParent(TAX_CONTEXT_NAMESPACE);
  const [context, setContext] = useParent<TaxContext>(
    TAX_FORM_CONTEXT_NAMESPACE
  );

  const locale = useLocale();

  useEffect(() => {
    // Clear override context once on submitted
    setContext({});
  }, []);

  const { data, loading } =
    useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);

  const publisher = data?.user?.impactConnection?.publisher;
  const documentType = publisher?.currentTaxDocument?.type;
  const submissionDate = publisher?.currentTaxDocument?.dateCreated;

  console.log({ publisher });

  const dateSubmitted = submissionDate
    ? DateTime.fromMillis(submissionDate).toFormat("LLL dd, yyyy")
    : undefined;

  const expiryDate = DateTime.now().plus({ days: 30 }).toMillis();
  const dateExpired = DateTime.fromMillis(expiryDate).toFormat("LLL dd, yyyy");

  const expiresSoon = getExpiresSoon(expiryDate, submissionDate);

  const onNewDocumentClick = () => {
    setContext({
      overrideNextStep: "/submitted",
      overrideBackStep: "/submitted",
      hideSteps: true,
    });

    setStep(`/3`);
  };

  const onEditPayoutInfo = () => {
    setContext({
      overrideNextStep: "/submitted",
      overrideBackStep: "/submitted",
      hideSteps: true,
    });

    setStep("/4");
  };

  const provinceName = INDIRECT_TAX_PROVINCES.find(
    (p) => p.provinceCode === publisher?.indirectTaxSubdivision
  )?.displayName;

  return {
    states: {
      dateSubmitted,
      dateExpired,
      documentType,
      documentTypeString: taxTypeToName(documentType),
      status: publisher?.currentTaxDocument?.status,
      //AL TODO ADD SUB-REGION
      subRegion: "",
      // AL TODO: subRegionTaxNumber
      subRegionTaxNumber: 0,
      // AL TODO: qstNumber
      qstNumber: 0,
      indirectTaxType: data?.user.customFields?.__indirectTaxType,
      indirectTaxNumber: data?.user?.customFields?.__indirectTaxNumber,
      isBusinessEntity: publisher?.requiredTaxDocumentType === "W8BENE",
      province: provinceName,
      country: publisher?.indirectTaxCountry
        ? // @ts-ignore: DisplayNames does exist on Intl
          new Intl.DisplayNames([locale.replaceAll("_", "-")], {
            type: "language",
            // @ts-ignore: Bad DisplayNames type (has to be array)
          }).of([publisher.indirectTaxCountry])
        : undefined,
      notRegistered: publisher?.indirectTaxOption === "NO_TAX",
      noFormNeeded: !documentType,
      expiresSoon,
      disabled: loading,
      loading,
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
