const UserTable = ({ users, onViewUser }) => {
  return (
    <div>
      <div className="hidden overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              <tr>
                <th className="px-5 py-4 font-semibold">Name</th>
                <th className="px-5 py-4 font-semibold">Email</th>
                <th className="px-5 py-4 font-semibold">Phone</th>
                <th className="px-5 py-4 font-semibold">Company</th>
                <th className="px-5 py-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {users.map((user) => (
                <tr key={user.id} className="transition hover:bg-slate-50/90 dark:hover:bg-slate-900/70">
                  <td className="px-5 py-4 font-medium text-slate-950 dark:text-white">{user.name}</td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{user.email}</td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{user.phone}</td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{user.company.name}</td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => onViewUser(user)}
                      className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-200"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <article
            key={user.id}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-950 dark:text-white">{user.name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{user.company.name}</p>
              </div>

              <button
                type="button"
                onClick={() => onViewUser(user)}
                className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-600 dark:bg-white dark:text-slate-950"
              >
                View
              </button>
            </div>

            <dl className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-900/70">
                <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">Email</dt>
                <dd className="mt-1 break-words">{user.email}</dd>
              </div>
              <div className="rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-900/70">
                <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">Phone</dt>
                <dd className="mt-1 break-words">{user.phone}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
