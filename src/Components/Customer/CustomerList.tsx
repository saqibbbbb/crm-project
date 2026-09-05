import { useAuth } from "../../Context/AuthContext";
import type { Customer, CustomerStatus } from "../../types";

const statusStyles: Record<CustomerStatus, string> = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  lead: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  inactive: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
};

const StatusBadge = ({ status }: { status: CustomerStatus }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs capitalize ${
      statusStyles[status] || statusStyles.inactive
    }`}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-current" />
    {status}
  </span>
);

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

const CustomerList = ({ customers, onEdit, onDelete }: CustomerListProps) => {
  const user = useAuth();
  const canDelete = user?.role === "admin";

  if (!customers.length)
    return (
      <div className="glass-subtle rounded-2xl py-12 text-center">
        <p className="text-sm text-zinc-500">No customers found.</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1.5">Add your first customer using the form above.</p>
      </div>
    );

  return (
    <div className="glass rounded-2xl overflow-hidden overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/50 dark:border-white/10 bg-white/25 dark:bg-white/[3%] text-left text-zinc-500">
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
              className="border-b border-white/40 dark:border-white/10 last:border-b-0 text-zinc-800 dark:text-zinc-200 hover:bg-white/30 dark:hover:bg-white/5 transition-colors"
            >
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-500/20 to-slate-700/20 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-medium shrink-0">
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
                    className="btn-ghost px-2.5 py-1.5 rounded-lg text-xs text-zinc-600 dark:text-zinc-300"
                  >
                    Edit
                  </button>
                  {canDelete && (
                    <button
                      onClick={() => onDelete(c.id)}
                      className="btn-ghost px-2.5 py-1.5 rounded-lg text-xs text-red-600 dark:text-red-400"
                    >
                      Delete
                    </button>
                  )}
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
