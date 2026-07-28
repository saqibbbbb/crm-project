const statusStyles = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  lead: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  inactive: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs capitalize ${
      statusStyles[status] || statusStyles.inactive
    }`}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-current" />
    {status}
  </span>
);

const CustomerList = ({ customers, onEdit, onDelete }) => {
  if (!customers.length)
    return (
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg py-12 text-center">
        <p className="text-sm text-zinc-500">No customers found.</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1.5">Add your first customer using the form above.</p>
      </div>
    );

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-left text-zinc-500">
            <th className="px-5 py-3 font-medium text-xs uppercase tracking-wide">Name</th>
            <th className="px-5 py-3 font-medium text-xs uppercase tracking-wide">Company</th>
            <th className="px-5 py-3 font-medium text-xs uppercase tracking-wide">Email</th>
            <th className="px-5 py-3 font-medium text-xs uppercase tracking-wide">Status</th>
            <th className="px-5 py-3 font-medium text-xs uppercase tracking-wide text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr
              key={c.id}
              className="border-b border-zinc-200 dark:border-zinc-800 last:border-b-0 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-colors"
            >
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center text-xs font-medium shrink-0">
                    {c.name?.charAt(0).toUpperCase()}
                  </div>
                  {c.name}
                </div>
              </td>
              <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-400">{c.company}</td>
              <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-400">{c.email}</td>
              <td className="px-5 py-3.5">
                <StatusBadge status={c.status} />
              </td>
              <td className="px-5 py-3.5">
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => onEdit(c)}
                    className="px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(c.id)}
                    className="px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs text-red-600 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
