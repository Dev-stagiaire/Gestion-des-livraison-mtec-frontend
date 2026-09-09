interface PaginationProps{
    count: number;
    offset: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
    handleNext: () => void;
    handlePrev: () => void;
}

const Pagination = ({count, offset, limit, hasNext, hasPrev, handlePrev, handleNext}: PaginationProps) => {
  return (
    <nav aria-label="Pagination">
        {/* dark:text-white */}
        <ul className="relative flex justify-center gap-3 text-gray-900">
            <li>
            <button
                type='button'
                onClick={handlePrev}
                disabled={!hasPrev}
                // dark:border-gray-700 dark:hover:bg-gray-800
                className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
                aria-label="Previous page"
            >
                <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                >
                <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                />
                </svg>
            </button>
            </li>

            <li className="text-sm/8 font-medium tracking-widest text-gray-700">{`${Math.floor((offset / limit) + 1)}/${Math.ceil(count/limit)}`}</li>

            <li>
            <button
                onClick={handleNext}
                disabled={!hasNext}
                // dark:border-gray-700 dark:hover:bg-gray-800
                className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180 "
                aria-label="Next page"
            >
                <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                >
                <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                />
                </svg>
            </button>
            </li>
        </ul>
    </nav>
  )
}

export default Pagination
