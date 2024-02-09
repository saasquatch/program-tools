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
import {
  TaxDocumentSubmittedProps,
  TaxDocumentType,
} from "./sqm-tax-document-submitted-view";
import { TaxDocumentSubmitted } from "./sqm-tax-document-submitted";
import { useEditProfile } from "../../sqm-edit-profile/useEditProfile";
import { useEffect } from "@saasquatch/universal-hooks";
import { INDIRECT_TAX_PROVINCES } from "../subregions";

export function getDocumentType(user): TaxDocumentType {
  if (!user) return;
  if (user.countryCode === "US") return "W9";
  if (user.customFields.__taxCountry === "US") {
    if (user.customFields.participantType === "individualParticipant")
      return "W8-BEN";
    else if (user.customFields.participantType === "businessEntity")
      return "W8-BEN-E";
  }
}

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

  useEffect(() => {
    // Clear override context once on submitted
    setContext({});
  }, []);

  const { data, loading } =
    useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);

  console.log("submitted", { data, loading });

  // TODO: Fetch document status from backend

  const submissionDate = DateTime.now().toMillis();
  const dateSubmitted =
    DateTime.fromMillis(submissionDate).toFormat("LLL dd, yyyy");

  const expiryDate = DateTime.now().plus({ days: 30 }).toMillis();
  const dateExpired = DateTime.fromMillis(expiryDate).toFormat("LLL dd, yyyy");

  const expiresSoon = getExpiresSoon(expiryDate, submissionDate);

  console.log({
    dateSubmitted,
    dateExpired,
    expiresSoon,
    diff: DateTime.fromMillis(submissionDate).diff(
      DateTime.fromMillis(expiryDate)
    ),
  });

  const documentType = getDocumentType(
    data?.user
  )?.toUpperCase() as TaxDocumentType;

  console.log({ documentType });

  const onNewDocumentClick = () => {
    setContext({
      overrideNextStep: "/submitted",
      overrideBackStep: "/submitted",
      hideSteps: true,
    });

    if (documentType) setStep(`/3/${documentType}`);
    else setStep("/3b");
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
    (p) => p.provinceCode === data?.user?.customFields?.__taxProvince
  )?.displayName;

  return {
    states: {
      dateSubmitted,
      documentType,

      // TODO: Hook up to API
      status: documentType ? "NOT_VERIFIED" : undefined,

      indirectTaxNumber: data?.user?.customFields?.__indirectTaxNumber,
      //AL: TODO hook up isBusinessEntity up to hooks
      isBusinessEntity: true,
      province: provinceName,
      // @ts-ignore: DisplayNames does exist on Intl
      country: new Intl.DisplayNames(["en"], { type: "region" }).of([
        data?.user?.customFields?.__taxCountry,
      ]),
      notRegistered: data?.user?.customFields?.__taxOption === "notRegistered",
      noFormNeeded: !documentType,
      dateExpired,
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
