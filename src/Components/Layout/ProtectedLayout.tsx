import { useState, type ReactNode } from "react";
import {
  IconDashboard,
  IconUsers,
  IconOrders,
  IconLogout,
} from "../Common/Icons";
import ThemeToggle from "../Common/ThemeToggle";
import { useAuth } from "../../Context/AuthContext";
import type { ActivePage } from "../../types";

const navItems: { key: ActivePage; label: string; Icon: typeof IconDashboard }[] = [
  { key: "dashboard", label: "Dashboard", Icon: IconDashboard },
  { key: "customers", label: "Customers", Icon: IconUsers },
  { key: "salesOrders", label: "Sales Orders", Icon: IconOrders },
];

interface ProtectedLayoutProps {
  onLogout: () => void;
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  children: ReactNode;
}

const ProtectedLayout = ({ onLogout, activePage, setActivePage, children }: ProtectedLayoutProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const user = useAuth();

  const currentLabel =
    navItems.find((item) => item.key === activePage)?.label ?? "Dashboard";

  return (
    <div className="min-h-screen text-zinc-800 dark:text-zinc-200 flex gap-4 p-4">
      {/* Reserves layout space so the hover-expanding sidebar never reflows the page */}
      <div className="w-[68px] shrink-0" aria-hidden="true" />

      <aside
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        className={`glass-strong fixed top-4 left-4 z-20 rounded-2xl flex flex-col justify-between h-[calc(100vh-2rem)] transition-[width] duration-200 ease-in-out ${
          collapsed ? "w-[68px]" : "w-60"
        }`}
      >
        <div>
          <div
            className={`h-16 flex items-center border-b border-white/50 dark:border-white/10 ${
              collapsed ? "justify-center px-0" : "justify-between px-6"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-[0_4px_12px_-2px_rgba(30,41,59,0.55)] flex items-center justify-center font-bold text-sm shrink-0">
                C
              </div>
              {!collapsed && (
                <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 truncate">
                  CRM
                </span>
              )}
            </div>
          </div>

          <nav className="p-4 flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activePage === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActivePage(item.key)}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-colors ${
                    collapsed ? "justify-center" : ""
                  } ${
                    isActive
                      ? "bg-gradient-to-r from-slate-700 to-slate-900 text-white font-medium shadow-[0_8px_20px_-6px_rgba(30,41,59,0.5)]"
                      : "text-zinc-500 dark:text-zinc-400 hover:bg-white/50 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  <item.Icon className="w-[18px] h-[18px] shrink-0" />
                  {!collapsed && item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/50 dark:border-white/10 flex flex-col gap-1.5">
          <button
            onClick={onLogout}
            title={collapsed ? "Logout" : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-500 dark:text-zinc-400 hover:bg-white/50 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <IconLogout className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col gap-4">
        <header className="glass-subtle h-16 px-8 rounded-2xl flex items-center justify-between sticky top-4 z-10">
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{currentLabel}</h1>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-xs text-zinc-500">
                {user.username} <span className="capitalize">({user.role.replace("_", " ")})</span>
              </span>
            )}
            <ThemeToggle />
          </div>
        </header>

        <main className="w-full pb-4">{children}</main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
