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
