import { useEffect } from "@saasquatch/universal-hooks";
import { DateTime } from "luxon";
import { useParentValue, useSetParent } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserQuery,
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

export const useTaxDocumentSubmitted = (props: any) => {
  const setStep = useSetParent(TAX_CONTEXT_NAMESPACE);

  const { refetch, data, loading } =
    useParentValue<UserQueryState>(USER_QUERY_NAMESPACE);

  console.log("submitted", { data, loading });

  // TODO: Fetch document status from backend

  const dateSubmitted = Date.now();

  const documentType = getDocumentType(data?.user);

  useEffect(() => {
    refetch();
  }, []);

  return {
    states: {
      dateSubmitted:
        DateTime.fromMillis(dateSubmitted).toFormat("LLL dd, yyyy"),
      documentType,
      status: "NOT_VERIFIED",
      dateExpired: DateTime.fromMillis(dateSubmitted).toFormat("LLL dd, yyyy"),
      expiresSoon: false,
      disabled: false,
      loading,
    },
    callbacks: {
      // Need a way to redirect to the document type select form
      onClick: () => setStep("/3"),
    },
    text: props,
  };
};
