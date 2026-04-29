const ErrorState = ({ message, onRetry }) => {
  return (
    // Keep the error view direct and actionable so recovery is obvious.
    <div className="flex min-h-[24rem] flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-rose-300 bg-rose-50 px-6 py-12 text-center dark:border-rose-900/70 dark:bg-rose-950/30">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-2xl text-rose-600 dark:text-rose-300">
        !
      </div>
      <h2 className="mt-5 text-xl font-semibold text-slate-950 dark:text-white">Something went wrong</h2>
      <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-300">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorState;
