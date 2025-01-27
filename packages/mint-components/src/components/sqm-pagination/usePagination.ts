import { useParentValue } from "@saasquatch/component-boilerplate";
import {
  PaginationContext,
  REFERRAL_CODES_PAGINATION_CONTEXT,
} from "../sqm-referral-codes/useReferralCodes";
import { intl } from "../../global/global";
import { Pagination } from "./sqm-pagination";

export function usePagination(props: Pagination) {
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
          defaultMessage: props.paginationText,
        },
        {
          currentPage,
          totalPages,
        }
      ),
    },
  };
}
