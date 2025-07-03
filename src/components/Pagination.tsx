import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const pages = [];
    const showPages = 5; // Show up to 5 page numbers

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(totalPages, startPage + showPages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      {/* Previous button */}
      {hasPreviousPage ? (
        <Link
          href={`/blog?page=${currentPage - 1}`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                     bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg 
                     hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 
                     transition-colors"
        >
          <span className="mr-2">←</span>
          Previous
        </Link>
      ) : (
        <span
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 
                         bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                         rounded-lg cursor-not-allowed"
        >
          <span className="mr-2">←</span>
          Previous
        </span>
      )}

      {/* Page numbers */}
      <div className="hidden sm:flex items-center gap-1">
        {/* Show first page and ellipsis if needed */}
        {pageNumbers[0] > 1 && (
          <>
            <Link
              href="/blog?page=1"
              className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium 
                         text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border 
                         border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 
                         dark:hover:bg-gray-700 transition-colors"
            >
              1
            </Link>
            {pageNumbers[0] > 2 && (
              <span
                className="inline-flex items-center justify-center w-10 h-10 text-sm 
                               text-gray-500 dark:text-gray-400"
              >
                ...
              </span>
            )}
          </>
        )}

        {/* Current page range */}
        {pageNumbers.map((page) => (
          <Link
            key={page}
            href={`/blog?page=${page}`}
            className={`inline-flex items-center justify-center w-10 h-10 text-sm font-medium 
                       border rounded-lg transition-colors ${
                         page === currentPage
                           ? 'text-white bg-blue-600 border-blue-600 hover:bg-blue-700'
                           : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                       }`}
          >
            {page}
          </Link>
        ))}

        {/* Show last page and ellipsis if needed */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span
                className="inline-flex items-center justify-center w-10 h-10 text-sm 
                               text-gray-500 dark:text-gray-400"
              >
                ...
              </span>
            )}
            <Link
              href={`/blog?page=${totalPages}`}
              className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium 
                         text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border 
                         border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 
                         dark:hover:bg-gray-700 transition-colors"
            >
              {totalPages}
            </Link>
          </>
        )}
      </div>

      {/* Mobile page indicator */}
      <div className="sm:hidden flex items-center text-sm text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </div>

      {/* Next button */}
      {hasNextPage ? (
        <Link
          href={`/blog?page=${currentPage + 1}`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                     bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg 
                     hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 
                     transition-colors"
        >
          Next
          <span className="ml-2">→</span>
        </Link>
      ) : (
        <span
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 
                         bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                         rounded-lg cursor-not-allowed"
        >
          Next
          <span className="ml-2">→</span>
        </span>
      )}
    </nav>
  );
}
