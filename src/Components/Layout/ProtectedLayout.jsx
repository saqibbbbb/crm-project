import { useState } from "react";
import {
  IconDashboard,
  IconUsers,
  IconOrders,
  IconLogout,
  IconChevronLeft,
} from "../Common/Icons";
import ThemeToggle from "../Common/ThemeToggle";

const navItems = [
  { key: "dashboard", label: "Dashboard", Icon: IconDashboard },
  { key: "customers", label: "Customers", Icon: IconUsers },
  { key: "salesOrders", label: "Sales Orders", Icon: IconOrders },
];

const ProtectedLayout = ({ onLogout, activePage, setActivePage, children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const currentLabel =
    navItems.find((item) => item.key === activePage)?.label ?? "Dashboard";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 flex">
      <aside
        className={`shrink-0 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between h-screen sticky top-0 transition-[width] duration-200 ease-in-out ${
          collapsed ? "w-[68px]" : "w-60"
        }`}
      >
        <div>
          <div
            className={`h-16 flex items-center border-b border-zinc-200 dark:border-zinc-800 ${
              collapsed ? "justify-center px-0" : "justify-between px-6"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-md bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 flex items-center justify-center font-bold text-sm shrink-0">
                C
              </div>
              {!collapsed && (
                <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 truncate">
                  CRM
                </span>
              )}
            </div>

            {!collapsed && (
              <button
                onClick={() => setCollapsed(true)}
                title="Collapse sidebar"
                className="p-1 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shrink-0"
              >
                <IconChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          <nav className="p-4 flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activePage === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActivePage(item.key)}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-left transition-colors ${
                    collapsed ? "justify-center" : ""
                  } ${
                    isActive
                      ? "bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 font-medium"
                      : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  <item.Icon className="w-[18px] h-[18px] shrink-0" />
                  {!collapsed && item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-1.5">
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              title="Expand sidebar"
              className="w-full flex items-center justify-center px-3 py-2.5 rounded-md text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <IconChevronLeft className="w-[18px] h-[18px] shrink-0 rotate-180" />
            </button>
          )}

          <button
            onClick={onLogout}
            title={collapsed ? "Logout" : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <IconLogout className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="h-16 px-8 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{currentLabel}</h1>
          <ThemeToggle />
        </header>

        <main className="px-8 py-8 max-w-6xl">{children}</main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
