import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Restore the last theme choice first, then fall back to the device preference.
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    // Update local storage and the document class together so the theme change feels immediate.
    setIsDarkMode((current) => {
      const nextTheme = !current;
      window.localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', nextTheme);
      return nextTheme;
    });
  };

  const linkClass = ({ isActive }) =>
    [
      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
      isActive
        ? 'bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-400/30'
        : 'text-slate-300 hover:bg-white/5 hover:text-white',
    ].join(' ');

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100">
      <div className="flex min-h-screen">
        {/* Mobile sidebar stays off-canvas until the user opens it. */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-white/10 bg-slate-950/95 px-5 py-6 text-white shadow-2xl shadow-slate-950/40 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300/80">
                Teknyo
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
            </div>

            <button
              type="button"
              className="rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/15 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation"
            >
              ✕
            </button>
          </div>

          <nav className="mt-10 space-y-2">
            <NavLink to="/users" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-blue-200">
                U
              </span>
              <span>User Management</span>
            </NavLink>
          </nav>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="font-medium text-white">Assessment ready</p>
            <p className="mt-2 leading-6">
              Responsive layout, search, pagination, modal details, router support, and dark mode.
            </p>
          </div>
        </aside>

        {/* Dark overlay closes the drawer when the user clicks outside it. */}
        <div
          className={`fixed inset-0 z-30 bg-slate-950/60 transition-opacity lg:hidden ${sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />

        <div className="flex min-h-screen flex-1 flex-col lg:pl-72">
          {/* The header keeps the main controls visible while the content scrolls. */}
          <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open navigation"
                >
                  ☰
                </button>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
                    Teknyo
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">User Management</p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <span>{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
                <span className="text-base">{isDarkMode ? '☀' : '☾'}</span>
              </button>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {/* Routed page content renders here inside the shared dashboard shell. */}
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;