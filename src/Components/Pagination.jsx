const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = [];
  const visibleCount = 5;
  // Center the visible page window around the active page whenever possible.
  const startPage = Math.max(1, currentPage - Math.floor(visibleCount / 2));
  const endPage = Math.min(totalPages, startPage + visibleCount - 1);
  const adjustedStart = Math.max(1, endPage - visibleCount + 1);

  for (let page = adjustedStart; page <= endPage; page += 1) {
    pageNumbers.push(page);
  }

  return (
    <nav
      className="flex flex-col items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70 sm:flex-row"
      aria-label="Pagination"
    >
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Page <span className="font-semibold text-slate-900 dark:text-white">{currentPage}</span> of{' '}
        <span className="font-semibold text-slate-900 dark:text-white">{totalPages}</span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <PaginationButton
          label="Prev"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {adjustedStart > 1 && (
          <PageChip page={1} active={currentPage === 1} onPageChange={onPageChange} />
        )}

        {adjustedStart > 2 && <Ellipsis />}

        {pageNumbers.map((page) => (
          <PageChip key={page} page={page} active={currentPage === page} onPageChange={onPageChange} />
        ))}

        {endPage < totalPages - 1 && <Ellipsis />}

        {endPage < totalPages && (
          <PageChip page={totalPages} active={currentPage === totalPages} onPageChange={onPageChange} />
        )}

        <PaginationButton
          label="Next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </div>
    </nav>
  );
};

const PaginationButton = ({ label, onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-600"
  >
    {label}
  </button>
);

const PageChip = ({ page, active, onPageChange }) => (
  <button
    type="button"
    onClick={() => onPageChange(page)}
    className={`min-w-11 rounded-full px-4 py-2 text-sm font-semibold transition ${
      active
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
        : 'border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
    }`}
    aria-current={active ? 'page' : undefined}
  >
    {page}
  </button>
);

const Ellipsis = () => <span className="px-2 text-slate-400">…</span>;

export default Pagination;
