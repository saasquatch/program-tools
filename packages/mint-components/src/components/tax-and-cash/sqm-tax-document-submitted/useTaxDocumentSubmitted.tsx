import { DateTime } from "luxon";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useSetParent } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import {
  TaxDocumentSubmittedProps,
  TaxDocumentType,
} from "./sqm-tax-document-submitted-view";
import { TaxDocumentSubmitted } from "./sqm-tax-document-submitted";

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

  const documentType = getDocumentType(data?.user);

  return {
    states: {
      dateSubmitted,
      documentType,

      // TODO: Hook up to API
      status: documentType ? "NOT_VERIFIED" : undefined,

      indirectTaxNumber: data.user?.customFields?.__indirectTaxNumber,
      province: data.user?.customFields?.__taxProvince,
      // @ts-ignore: DisplayNames does exist on Intl
      country: new Intl.DisplayNames(["en"], { type: "region" }).of([
        data.user?.customFields?.__taxCountry,
      ]),
      noFormNeeded: !documentType,
      dateExpired,
      expiresSoon,
      disabled: loading,
      loading,
    },
    callbacks: {
      onClick: () => setStep(`/3/${documentType}`),
      onEditIndirectTax: () => setStep("/2"),
    },
    text: props.getTextProps(),
  };
};

export type UseTaxDocumentSubmittedResult = ReturnType<
  typeof useTaxDocumentSubmitted
>;
