import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * Simple client-side pagination control.
 * Usage: const { pageItems, ...paginationProps } = usePagination(items, 10);
 *        <Pagination {...paginationProps} />
 */
const Pagination = ({ page, totalPages, onPageChange, totalItems, pageSize }) => {
  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between px-2 py-3 text-sm text-gray-600">
      <span>
        Showing {start}–{end} of {totalItems}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FaChevronLeft className="text-xs" />
        </button>
        <span className="px-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FaChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
