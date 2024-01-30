import { DateTime } from "luxon";
import { useParent, useParentValue } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  USER_INFO_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/useTaxAndCash";

export const useTaxDocumentSubmitted = (props: any) => {
  const [step, setStep] = useParent(TAX_CONTEXT_NAMESPACE);

  const userData = useParentValue<UserQuery>(USER_INFO_NAMESPACE);

  // TODO: Fetch document status from backend

  const dateSubmitted = Date.now();

  return {
    states: {
      dateSubmitted:
        DateTime.fromMillis(dateSubmitted).toFormat("LLL dd, yyyy"),
      documentType: "W9" as const,
      status: "NOT_VERIFIED",
      dateExpired: DateTime.fromMillis(dateSubmitted).toFormat("LLL dd, yyyy"),
      expiresSoon: false,
    },
    callbacks: {
      // Need a way to redirect to the document type select form
      onClick: () => setStep("/3"),
    },
    text: props,
  };
};
