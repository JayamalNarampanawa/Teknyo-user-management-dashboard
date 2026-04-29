const LoadingState = () => {
  const skeletons = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className="space-y-4 animate-pulse">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="h-24 rounded-3xl bg-slate-200/80 dark:bg-slate-800" />
        <div className="h-24 rounded-3xl bg-slate-200/80 dark:bg-slate-800" />
        <div className="h-24 rounded-3xl bg-slate-200/80 dark:bg-slate-800" />
        <div className="h-24 rounded-3xl bg-slate-200/80 dark:bg-slate-800" />
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="hidden border-b border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900 md:block">
          <div className="grid grid-cols-5 gap-4">
            {skeletons.map((item) => (
              <div key={item} className="h-4 rounded-full bg-slate-200 dark:bg-slate-700" />
            ))}
          </div>
        </div>

        <div className="space-y-4 p-4 sm:p-6">
          {skeletons.map((item) => (
            <div key={item} className="rounded-[1.25rem] border border-slate-200 p-4 dark:border-slate-800">
              <div className="grid gap-4 md:grid-cols-5">
                <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-9 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
