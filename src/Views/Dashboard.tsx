import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { getDashboardStats, type DashboardStats } from "../Services/dashboardService";
import { IconUsers, IconOrders, IconRupee } from "../Components/Common/Icons";

const STATUS_COLORS: Record<string, string> = {
  lead: "#f59e0b",
  active: "#10b981",
  inactive: "#71717a",
  created: "#0ea5e9",
  processing: "#f59e0b",
  shipped: "#8b5cf6",
  delivered: "#10b981",
  cancelled: "#ef4444",
};

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load dashboard"));
  }, []);

  if (error) {
    return (
      <p className="text-sm text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
        {error}
      </p>
    );
  }

  if (!stats) {
    return <div className="glass-subtle rounded-2xl py-12 text-center text-sm text-zinc-500">Loading...</div>;
  }

  const activeCustomers = stats.customersByStatus.find((s) => s.status === "active")?.count ?? 0;

  const cards = [
    {
      label: "Total Customers",
      value: stats.totalCustomers.toLocaleString("en-IN"),
      hint: `${activeCustomers} active`,
      Icon: IconUsers,
      accent: "from-slate-500/15 to-slate-500/5 text-slate-600 dark:text-slate-400",
    },
    {
      label: "Sales Orders",
      value: stats.totalOrders.toLocaleString("en-IN"),
      hint: "all time",
      Icon: IconOrders,
      accent: "from-teal-500/15 to-teal-500/5 text-teal-600 dark:text-teal-400",
    },
    {
      label: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
      hint: "excludes cancelled orders",
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
        {cards.map((stat) => (
          <div key={stat.label} className="glass p-5 rounded-2xl">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={stats.revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, "Revenue"]}
                contentStyle={{ borderRadius: 12, fontSize: 12 }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#0f172a" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-5">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Orders by Status</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={stats.ordersByStatus}
                dataKey="count"
                nameKey="status"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {stats.ordersByStatus.map((entry) => (
                  <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? "#71717a"} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Customers by Status</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.customersByStatus.map((s) => (
            <div key={s.status} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/30 dark:bg-white/5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: STATUS_COLORS[s.status] ?? "#71717a" }}
              />
              <span className="text-sm capitalize text-zinc-700 dark:text-zinc-300">{s.status}</span>
              <span className="ml-auto text-sm font-semibold text-zinc-900 dark:text-zinc-100">{s.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
