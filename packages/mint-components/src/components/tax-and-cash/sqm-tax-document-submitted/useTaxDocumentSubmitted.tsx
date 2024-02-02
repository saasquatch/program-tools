import { DateTime } from "luxon";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useSetParent } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { TaxDocumentType } from "./sqm-tax-document-submitted-view";

export function getDocumentType(user): TaxDocumentType {
  if (!user) return;
  if (user.countryCode === "US") return "W9";
  if (user.customFields.participantType === "individualParticipant")
    return "W8-BEN";
  return "W8-BEN-E";
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

export const useTaxDocumentSubmitted = (props: any) => {
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
      status: "NOT_VERIFIED",
      // AL: todo handle noTaxDocument submitted case
      noTaxDocument: false,
      dateExpired,
      expiresSoon,
      disabled: false,
      loading,
    },
    callbacks: {
      onClick: () => setStep(`/3/${documentType}`),
    },
    text: props,
  };
};
