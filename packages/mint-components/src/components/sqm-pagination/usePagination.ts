import { useParentValue } from "@saasquatch/component-boilerplate";
import {
  PaginationContext,
  REFERRAL_CODES_PAGINATION_CONTEXT,
} from "../sqm-referral-codes/useReferralCodes";
import { intl } from "../../global/global";

export function usePagination() {
  const context = useParentValue<PaginationContext>(
    REFERRAL_CODES_PAGINATION_CONTEXT
  );

  const currentPage = context.states.currentPage + 1;
  const totalPages = context.states?.pageCount;

  return {
    states: {
      currentPage,
      totalPages,
      loading: context.states.loading,
    },
    callbacks: {
      onNext: () =>
        context.callbacks?.setCurrentPage(context.states?.currentPage + 1),
      onPrev: () =>
        context.callbacks?.setCurrentPage(context.states?.currentPage - 1),
    },
    text: {
      paginationText: intl.formatMessage(
        {
          id: `paginationText`,
          defaultMessage: this.paginationText,
        },
        {
          currentPage,
          totalPages,
        }
      ),
    },
  };
}
