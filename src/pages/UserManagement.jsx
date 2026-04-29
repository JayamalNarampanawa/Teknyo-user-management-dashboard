import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
//Importing Components
import ErrorState from "../Components/ErrorState";
import LoadingState from "../Components/LoadingState";
import Pagination from "../Components/Pagination";
import SearchBar from "../Components/SearchBar";
import UserModal from "../Components/UserModal";
import UserTable from '../Components/UserTable';
import { getUsers } from '../services/userService';

const PAGE_SIZE = 5;

const usersReducer = (state, action) => {
  // Keep the loading, success, and error states together so the page stays easy to follow.
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        loading: true,
        error: '',
      };
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
  const isMountedRef = useRef(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUsers = async () => {
    dispatch({ type: 'loading' });

    const minLoadingDuration = new Promise((resolve) => {
      window.setTimeout(resolve, 3500);
    });

    try {
      const [data] = await Promise.all([getUsers(), minLoadingDuration]);

      if (isMountedRef.current) {
        dispatch({ type: 'success', payload: data });
      }
    } catch (err) {
      if (isMountedRef.current) {
        dispatch({
          type: 'error',
          payload: err instanceof Error ? err.message : 'Failed to load users. Please try again.',
        });
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    void loadUsers();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const debounceId = window.setTimeout(() => {
      setSearchTerm(searchInput);
    }, 250);

    return () => window.clearTimeout(debounceId);
  }, [searchInput]);

  const handleSearchChange = (value) => {
    // Reset paging whenever the filter changes so results always start from the first match.
    setSearchInput(value);
    setCurrentPage(1);
  };

  const filteredUsers = useMemo(
    () =>
      users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase().trim())),
    [searchTerm, users]
  );

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((leftUser, rightUser) => {
      const comparison = leftUser.name.localeCompare(rightUser.name, undefined, {
        sensitivity: 'base',
      });

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredUsers, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / PAGE_SIZE));
  // Clamp the page number so the UI does not drift past the last available page.
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedUsers = sortedUsers.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE
  );

  const displayedCount = sortedUsers.length;
  const totalUsers = users.length;
  const visibleStart = displayedCount === 0 ? 0 : (safeCurrentPage - 1) * PAGE_SIZE + 1;
  const visibleEnd = Math.min(safeCurrentPage * PAGE_SIZE, displayedCount);

  const toggleSort = () => {
    setCurrentPage(1);
    setSortDirection((currentDirection) => (currentDirection === 'asc' ? 'desc' : 'asc'));
  };

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
            value={searchInput}
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
            onRetry={loadUsers}
          />
        ) : sortedUsers.length === 0 ? (
          <div className="flex min-h-88 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900/40 sm:px-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-blue-500/10 text-3xl text-blue-600 dark:text-blue-300">
              ◌
            </div>
            <h2 className="mt-6 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
              No users found
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
              Try a different search term or clear the filter to restore the full list.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {visibleStart}-{visibleEnd} of {displayedCount} results
              </p>
              <button
                type="button"
                onClick={toggleSort}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-300"
                aria-label={`Sort users by name ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
              >
                Name {sortDirection === 'asc' ? 'A-Z' : 'Z-A'}
                <span aria-hidden="true">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              </button>
            </div>

            <UserTable
              users={paginatedUsers}
              onViewUser={setSelectedUser}
              sortDirection={sortDirection}
              onSortName={toggleSort}
            />

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