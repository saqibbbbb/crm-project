import type { SalesOrder } from "../../types";

interface SalesOrderListProps {
  orders: SalesOrder[];
}

const SalesOrderList = ({ orders }: SalesOrderListProps) => {
  if (!orders.length)
    return (
      <div className="glass-subtle rounded-2xl py-12 text-center">
        <p className="text-sm text-zinc-500">No sales orders yet.</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1.5">Create one using the form above.</p>
      </div>
    );

  return (
    <ul className="glass rounded-2xl divide-y divide-white/40 dark:divide-white/10 overflow-hidden">
      {orders.map((o) => (
        <li
          key={o.id}
          className="px-5 py-4 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-white/30 dark:hover:bg-white/5 transition-colors flex items-center justify-between gap-4"
        >
          <div className="min-w-0">
            <p className="truncate">
              <span className="text-zinc-900 dark:text-zinc-100 font-medium">{o.orderNumber}</span>
              <span className="text-zinc-500"> · {o.productName}</span>
            </p>
            <p className="text-xs text-zinc-500 mt-1">Qty {o.quantity}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs capitalize bg-teal-500/10 border border-teal-500/20 text-teal-700 dark:text-teal-400">
              {o.status}
            </span>
            <span className="text-base text-zinc-900 dark:text-zinc-100 font-semibold">₹{o.totalAmount}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SalesOrderList;
