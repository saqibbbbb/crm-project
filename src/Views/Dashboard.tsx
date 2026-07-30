import { useEffect, useState } from "react";
import { getCustomers } from "../Services/customerService";
import { getSalesOrders } from "../Services/salesOrderService";
import { IconUsers, IconOrders, IconRupee } from "../Components/Common/Icons";
import type { Customer, SalesOrder } from "../types";

const Dashboard = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<SalesOrder[]>([]);

  useEffect(() => {
    setCustomers(getCustomers());
    setOrders(getSalesOrders());
  }, []);

  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.totalAmount || 0), 0);

  const stats = [
    {
      label: "Total Customers",
      value: customers.length,
      hint: `${activeCustomers} active`,
      Icon: IconUsers,
      accent: "from-slate-500/15 to-slate-500/5 text-slate-600 dark:text-slate-400",
    },
    {
      label: "Sales Orders",
      value: orders.length,
      hint: "all time",
      Icon: IconOrders,
      accent: "from-teal-500/15 to-teal-500/5 text-teal-600 dark:text-teal-400",
    },
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      hint: "from all orders",
      Icon: IconRupee,
      accent: "from-amber-500/15 to-amber-500/5 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm text-zinc-500">
        Welcome back — here's a quick look at your CRM.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass p-5 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                {stat.label}
              </span>
              <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.accent} flex items-center justify-center`}>
                <stat.Icon className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 leading-none">{stat.value}</div>
            <div className="text-xs text-zinc-500 mt-2">{stat.hint}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl">
        <div className="px-5 py-4 border-b border-white/50 dark:border-white/10">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Recent Customers</h3>
        </div>

        {customers.length === 0 ? (
          <p className="px-5 py-8 text-sm text-zinc-500 text-center">No customers yet.</p>
        ) : (
          <ul className="divide-y divide-white/40 dark:divide-white/10">
            {customers.slice(-5).reverse().map((c) => (
              <li
                key={c.id}
                className="px-5 py-3.5 flex items-center justify-between text-sm hover:bg-white/30 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-500/20 to-slate-700/20 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-medium shrink-0">
                    {c.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-zinc-800 dark:text-zinc-200 truncate">{c.name}</p>
                    <p className="text-zinc-500 text-xs truncate mt-0.5">{c.company}</p>
                  </div>
                </div>
                <span className="text-xs capitalize text-zinc-500 shrink-0 ml-3">
                  {c.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
