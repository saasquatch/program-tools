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
import { TaxDocumentSubmitted } from "./sqm-tax-document-submitted";
import { TaxDocumentSubmittedProps } from "./sqm-tax-document-submitted-view";
import { useLocale } from "@saasquatch/component-boilerplate";

function getExpiresSoon(submissionDate: number, expiryDate: number) {
  if (!submissionDate || !expiryDate) return false;
  return (
    DateTime.fromMillis(expiryDate).diff(
      DateTime.fromMillis(submissionDate),
      "days"
    )?.days <= 30
  );
}

export const useTaxDocumentSubmitted = (
  props: TaxDocumentSubmitted
): TaxDocumentSubmittedProps => {
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

  // TODO: Fetch document status from backend

  const documentType = publisher?.currentTaxDocument?.type;
  const submissionDate = DateTime.now().toMillis();
  const dateSubmitted =
    DateTime.fromMillis(submissionDate).toFormat("LLL dd, yyyy");

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

  const onEditIndirectTax = () => {
    setContext({
      overrideNextStep: "/submitted",
      overrideBackStep: "/submitted",
      hideSteps: true,
    });
    setStep("/2");
  };

  const provinceName = INDIRECT_TAX_PROVINCES.find(
    (p) => p.provinceCode === publisher?.indirectTaxSubdivision
  )?.displayName;

  return {
    states: {
      dateSubmitted,
      documentType,
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
    callbacks: {
      onClick: onNewDocumentClick,
      onEditIndirectTax: onEditIndirectTax,
    },
    text: props.getTextProps(),
  };
};

export type UseTaxDocumentSubmittedResult = ReturnType<
  typeof useTaxDocumentSubmitted
>;
