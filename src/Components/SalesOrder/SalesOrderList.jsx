const SalesOrderList = ({ orders }) => {
  if (!orders.length)
    return (
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg py-12 text-center">
        <p className="text-sm text-zinc-500">No sales orders yet.</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1.5">Create one using the form above.</p>
      </div>
    );

  return (
    <ul className="border border-zinc-200 dark:border-zinc-800 rounded-lg divide-y divide-zinc-200 dark:divide-zinc-800 overflow-hidden">
      {orders.map((o) => (
        <li
          key={o.id}
          className="px-5 py-4 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-colors flex items-center justify-between gap-4"
        >
          <div className="min-w-0">
            <p className="truncate">
              <span className="text-zinc-900 dark:text-zinc-100 font-medium">{o.orderNumber}</span>
              <span className="text-zinc-500"> · {o.productName}</span>
            </p>
            <p className="text-xs text-zinc-500 mt-1">Qty {o.quantity}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs capitalize bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
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
