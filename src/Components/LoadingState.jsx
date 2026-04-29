const LoadingState = () => {
  const metricCards = [
    { label: 'Users', width: 'w-16' },
    { label: 'Matching', width: 'w-12' },
    { label: 'Page', width: 'w-10' },
  ];

  const rows = Array.from({ length: 4 }, (_, index) => index);

  return (
    <div className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white px-4 py-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950 sm:px-6 sm:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent_28%)]" />
      <div className="absolute -right-16 top-8 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl motion-safe:animate-[pulse_3s_ease-in-out_infinite]" />
      <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl motion-safe:animate-[pulse_4s_ease-in-out_infinite]" />

      <div className="relative space-y-8">
        <div className="grid gap-4 lg:grid-cols-[1.3fr,0.9fr]">
          <div className="rounded-[1.75rem] border border-slate-200/70 bg-white/85 p-6 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                <div className="h-8 w-8 rounded-full border-2 border-current border-t-transparent motion-safe:animate-spin" />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-300">
                  Loading dashboard
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  Preparing your user workspace
                </h2>
                <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Fetching records, shaping the table, and syncing the interface so everything is ready in a moment.
                </p>
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="h-full w-2/3 rounded-full bg-linear-to-r from-blue-600 via-cyan-500 to-sky-400 motion-safe:animate-[loadingBar_1.8s_ease-in-out_infinite]" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {metricCards.map((card, index) => (
              <div
                key={card.label}
                className="rounded-3xl border border-slate-200/70 bg-white/85 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60"
                style={{ animationDelay: `${index * 140}ms` }}
              >
                <div className="h-3 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className={`mt-4 h-7 ${card.width} rounded-full bg-slate-200 dark:bg-slate-700`} />
                <div className="mt-4 h-2 w-24 rounded-full bg-linear-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 motion-safe:animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
          <div className="border-b border-slate-200/70 px-5 py-4 dark:border-slate-800">
            <div className="grid grid-cols-5 gap-4">
              {rows.map((item) => (
                <div key={item} className="h-4 rounded-full bg-slate-200 dark:bg-slate-700 motion-safe:animate-pulse" />
              ))}
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-6">
            {rows.map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40"
                style={{ animationDelay: `${item * 120}ms` }}
              >
                <div className="grid gap-4 md:grid-cols-5">
                  <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-700 motion-safe:animate-pulse" />
                  <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-700 motion-safe:animate-pulse [animation-delay:120ms]" />
                  <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-700 motion-safe:animate-pulse [animation-delay:240ms]" />
                  <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-700 motion-safe:animate-pulse [animation-delay:360ms]" />
                  <div className="h-9 w-24 rounded-full bg-slate-200 dark:bg-slate-700 motion-safe:animate-pulse [animation-delay:480ms]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
