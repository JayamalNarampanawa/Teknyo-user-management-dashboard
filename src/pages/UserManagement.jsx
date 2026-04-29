import { useEffect, useMemo, useReducer, useState } from 'react';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import UserModal from '../components/UserModal';
import UserTable from '../components/UserTable';
import { getUsers } from '../services/userService';

const PAGE_SIZE = 5;

const usersReducer = (state, action) => {
  // Keep the loading, success, and error states together so the page stays easy to follow.
  switch (action.type) {
    case 'success':
      return {
        users: action.payload,
        loading: false,
        error: '',
      };
    case 'error':
      return {
        users: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const UserManagement = () => {
  const [{ users, loading, error }, dispatch] = useReducer(usersReducer, {
    users: [],
    loading: true,
    error: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Guard against setting state after unmount if the request finishes late.
    let isMounted = true;

    void getUsers()
      .then((data) => {
        if (isMounted) {
          dispatch({ type: 'success', payload: data });
        }
      })
      .catch((err) => {
        if (isMounted) {
          dispatch({
            type: 'error',
            payload: err instanceof Error ? err.message : 'Failed to load users. Please try again.',
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearchChange = (value) => {
    // Reset paging whenever the filter changes so results always start from the first match.
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const filteredUsers = useMemo(
    () =>
      users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase().trim())),
    [searchTerm, users]
  );

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  // Clamp the page number so the UI does not drift past the last available page.
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedUsers = filteredUsers.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE
  );

  const displayedCount = filteredUsers.length;
  const totalUsers = users.length;
  const visibleStart = displayedCount === 0 ? 0 : (safeCurrentPage - 1) * PAGE_SIZE + 1;
  const visibleEnd = Math.min(safeCurrentPage * PAGE_SIZE, displayedCount);

  return (
    <div className="space-y-6">
      <section className="rounded-4xl border border-white/60 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/70 dark:shadow-[0_24px_80px_rgba(2,6,23,0.35)] sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 dark:text-blue-300">
              Dashboard
            </p>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                User Management
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
                Browse the Teknyo user directory, search by name, and inspect full contact details
                in a polished modal view.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-136">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Total users
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{totalUsers}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Matching
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                {displayedCount}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Page
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                {safeCurrentPage}/{totalPages}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-xl">
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search users by name..."
          />
        </div>
      </section>

      <section className="rounded-4xl border border-white/70 bg-white/85 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/75 sm:p-6">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={() => {
              dispatch({ type: 'success', payload: [] });
              void getUsers()
                .then((data) => dispatch({ type: 'success', payload: data }))
                .catch((err) =>
                  dispatch({
                    type: 'error',
                    payload:
                      err instanceof Error ? err.message : 'Failed to load users. Please try again.',
                  })
                );
            }}
          />
        ) : filteredUsers.length === 0 ? (
          <div className="flex min-h-88 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900/40">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl text-blue-600 dark:text-blue-300">
              ↯
            </div>
            <h2 className="mt-5 text-xl font-semibold text-slate-950 dark:text-white">
              No users found
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
              Try a different search term or clear the filter to restore the full list.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {visibleStart}-{visibleEnd} of {displayedCount} results
              </p>
              <p>Page {safeCurrentPage}</p>
            </div>

            <UserTable users={paginatedUsers} onViewUser={setSelectedUser} />

            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </section>

      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

export default UserManagement;