import { useEffect } from "@saasquatch/universal-hooks";
import { DateTime } from "luxon";
import { useParentValue, useSetParent } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserQueryState,
} from "../sqm-tax-and-cash/useTaxAndCash";
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

  const { refetch, data, loading } =
    useParentValue<UserQueryState>(USER_QUERY_NAMESPACE);

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

  useEffect(() => {
    refetch();
  }, []);

  return {
    states: {
      dateSubmitted,
      documentType,
      status: "NOT_VERIFIED",
      dateExpired,
      expiresSoon,
      loading,
    },
    callbacks: {
      onClick: () => setStep(`/3/${documentType}`),
    },
    text: props,
  };
};
