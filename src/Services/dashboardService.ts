export interface DashboardStats {
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
  customersByStatus: { status: string; count: number }[];
  ordersByStatus: { status: string; count: number }[];
  revenueByMonth: { month: string; revenue: number; orders: number }[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch("/api/dashboard");
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error ?? "Failed to load dashboard stats");
  return body as DashboardStats;
};
