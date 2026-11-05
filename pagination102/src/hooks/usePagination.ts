import { useState } from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

// Reusable hook that keeps pagination calculations out of the UI.
export default function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: PaginationProps) {
  const safeTotalItems = Number.isFinite(totalItems) ? Math.max(0, Math.floor(totalItems)) : 0;
  const safeItemsPerPage = Number.isFinite(itemsPerPage) ? Math.max(1, Math.floor(itemsPerPage)) : 10;
  const totalPages = Math.max(1, Math.ceil(safeTotalItems / safeItemsPerPage));

  const [page, setCurrentPage] = useState(initialPage);
  const currentPage = Math.min(Math.max(1, Number.isFinite(page) ? Math.floor(page) : 1), totalPages);

  // endIndex is exclusive so it can be used directly with array.slice().
  const startIndex = (currentPage - 1) * safeItemsPerPage;
  const endIndex = Math.min(startIndex + safeItemsPerPage, safeTotalItems);
  const itemsOnCurrentPage = endIndex - startIndex;

  const setPage = (pageNumber: number) => {
    if (!Number.isFinite(pageNumber)) return;
    setCurrentPage(Math.min(Math.max(1, Math.floor(pageNumber)), totalPages));
  };

  const nextPage = () => setPage(currentPage + 1);
  const prevPage = () => setPage(currentPage - 1);
  const canNextPage = currentPage < totalPages;
  const canPrevPage = currentPage > 1;

  return {
    currentPage, totalPages, startIndex, endIndex, itemsOnCurrentPage,
    setPage, nextPage, prevPage, canNextPage, canPrevPage,
  };
}
