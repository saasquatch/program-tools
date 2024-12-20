import { useParentValue } from "@saasquatch/component-boilerplate";
import {
  PaginationContext,
  REFERRAL_CODES_PAGINATION_CONTEXT,
} from "../sqm-referral-codes/useReferralCodes";

export function usePagination() {
  const context = useParentValue<PaginationContext>(
    REFERRAL_CODES_PAGINATION_CONTEXT
  );

  return {
    ...context,
  };
}
