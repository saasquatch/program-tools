import { useState } from "@saasquatch/universal-hooks";

export function usePagination(pageVars: { limit: number; offset: number }) {
  const [pageState, setPageState] = useState({
    limit: pageVars.limit,
    offset: pageVars.offset,
  });
  const { offset, limit } = pageState;

  const calcOffset = (limit: number, page: number) => limit * page;
  const calcPage = (offset: number, limit: number) =>
    Math.ceil(offset / limit) || 0;
  const calcPageCount = (totalCount: number, limit: number) =>
    Math.ceil(totalCount / limit) || 0;

  const setLimit = (newLimit: number) => {
    const newPage = calcPage(offset, newLimit);
    const newOffset = calcOffset(newLimit, newPage);
    setPageState({
      ...pageState,
      limit: newLimit,
      offset: newOffset,
    });
  };

  // page numbering starts at 0
  const setCurrentPage = (newPage: number) => {
    let newOffset = calcOffset(newPage, limit);
    setPageState((pageState) => ({
      ...pageState,
      offset: newOffset,
    }));
  };

  // there are no safety guards here for invalid inputs
  function calculatePagination(count: number, totalCount: number) {
    const currentPage = calcPage(offset, limit);
    const pageCount = calcPageCount(totalCount, limit);

    const rangeOnPage: string =
      count === 0
        ? "0"
        : count > 1
        ? `${offset + 1}-${offset + count}`
        : `${offset + 1}`;
    const pageProgress: string = `${rangeOnPage} of ${totalCount}`;

    return { currentPage, pageCount, rangeOnPage, pageProgress };
  }

  return {
    limit,
    setLimit,
    offset,
    setCurrentPage,
    calculatePagination,
  };
}
