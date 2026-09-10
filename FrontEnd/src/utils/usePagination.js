import { useMemo, useState } from "react";

/**
 * Client-side pagination hook.
 * @param {Array} items - full list of items
 * @param {number} pageSize - items per page
 */
export default function usePagination(items = [], pageSize = 10) {
  const [page, setPage] = useState(1);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Clamp page if the list shrinks (e.g. after delete)
  const safePage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, safePage, pageSize]);

  return {
    pageItems,
    page: safePage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange: setPage,
  };
}
