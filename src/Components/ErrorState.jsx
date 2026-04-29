const ErrorState = ({ message, onRetry }) => {
  return (
    // Keep the error view direct and actionable so recovery is obvious.
    <div
      className="flex min-h-96 flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-rose-300 bg-rose-50 px-6 py-14 text-center dark:border-rose-900/70 dark:bg-rose-950/30"
      role="alert"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-500/10 text-3xl text-rose-600 dark:text-rose-300">
        !
      </div>
      <h2 className="mt-6 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
        Something went wrong
      </h2>
      <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-300">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-7 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
        aria-label="Retry loading users"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorState;
