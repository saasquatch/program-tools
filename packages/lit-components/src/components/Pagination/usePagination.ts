import { useState } from '@saasquatch/universal-hooks';
import { PaginationProps } from './Pagination';

export function usePagination(props: PaginationProps) {
  const [page, setPage] = useState(Number(props.currentPage) || 1);
  const totalPages = Number(props.totalPages) || 1;

  function goToPage(p: number) {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
      const event = new CustomEvent('sq:page-change', {
        bubbles: true,
        composed: true,
        detail: { page: p },
      });
      document.dispatchEvent(event);
    }
  }

  function nextPage() {
    goToPage(page + 1);
  }

  function prevPage() {
    goToPage(page - 1);
  }

  return {
    page,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    hasPrev: page > 1,
    hasNext: page < totalPages,
  };
}

export function useDemoPagination(_props: PaginationProps): ReturnType<typeof usePagination> {
  const [page, setPage] = useState(1);
  const totalPages = 5;

  function goToPage(nextPage: number) {
    if (nextPage >= 1 && nextPage <= totalPages) {
      setPage(nextPage);
    }
  }

  function nextPage() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  function prevPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  return {
    page,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    hasPrev: page > 1,
    hasNext: page < totalPages,
  };
}
