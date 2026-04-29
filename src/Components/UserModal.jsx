import { useEffect } from 'react';

const UserModal = ({ user, onClose }) => {
  useEffect(() => {
    if (!user) return undefined;

    const handleEscape = (event) => {
      // Let users close the dialog quickly with the Escape key.
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose, user]);

  if (!user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      {/* Clicking the overlay closes the modal, while clicks inside stay in place. */}
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-4xl border border-white/10 bg-white p-6 shadow-2xl shadow-slate-950/40 dark:border-slate-700 dark:bg-slate-950 sm:p-8"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`user-modal-${user.id}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-600 dark:text-blue-300">
              User details
            </p>
            <h2
              id={`user-modal-${user.id}`}
              className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white"
            >
              {user.name}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{user.company.name}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <InfoCard label="Username" value={user.username} />
          <InfoCard label="Email" value={user.email} />
          <InfoCard label="Phone" value={user.phone} />
          <InfoCard label="Website" value={user.website} />
          <InfoCard
            label="Address"
            value={`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
            fullWidth
          />
          <InfoCard label="Company" value={user.company.name} />
          <InfoCard label="Catchphrase" value={user.company.catchPhrase} fullWidth />
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value, fullWidth = false }) => (
  // Small cards keep each detail easy to scan without overwhelming the modal.
  <div
    className={`rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900 ${
      fullWidth ? 'sm:col-span-2' : ''
    }`}
  >
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
      {label}
    </p>
    <p className="mt-2 text-sm leading-6 text-slate-800 dark:text-slate-100">{value}</p>
  </div>
);

export default UserModal;
