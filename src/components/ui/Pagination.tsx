import React from "react";
import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Always show the first page
        i === totalPages || // Always show the last page
        (i >= currentPage - 2 && i <= currentPage + 2) // Show nearby pages
      ) {
        pages.push(
          <Link
            key={i}
            href={`?page=${i}`} // Update URL with the correct page number
            className={`px-3 py-1 rounded-md ${
              i === currentPage ? "bg-black text-white" : "bg-gray-200 text-black"
            }`}
          >
            {i}
          </Link>
        );
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        pages.push(
          <span key={i} className="px-2">
            ...
          </span>
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link href={`?page=${currentPage - 1}`} className="px-3 py-1 border rounded-md">
          ←
        </Link>
      )}

      {/* Page Numbers */}
      {renderPageNumbers()}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link href={`?page=${currentPage + 1}`} className="px-3 py-1 border rounded-md">
          →
        </Link>
      )}
    </div>
  );
};

export default Pagination;
