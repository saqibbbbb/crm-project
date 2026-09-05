import { NextResponse, type NextRequest } from "next/server";
import { dbConnect } from "../../../lib/mongodb";
import { Customer } from "../../../models/Customer";
import { SalesOrder } from "../../../models/SalesOrder";
import { authorize } from "../../../lib/auth";

export async function GET(request: NextRequest) {
  const auth = authorize(request);
  if ("response" in auth) return auth.response;

  await dbConnect();

  const [
    totalCustomers,
    customersByStatus,
    totalOrders,
    revenueAgg,
    ordersByStatus,
    revenueByMonth,
  ] = await Promise.all([
    Customer.countDocuments(),
    Customer.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    SalesOrder.countDocuments(),
    SalesOrder.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]),
    SalesOrder.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    SalesOrder.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          revenue: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      { $limit: 12 },
    ]),
  ]);

  return NextResponse.json({
    totalCustomers,
    totalOrders,
    totalRevenue: revenueAgg[0]?.total ?? 0,
    customersByStatus: customersByStatus.map((s) => ({ status: s._id, count: s.count })),
    ordersByStatus: ordersByStatus.map((s) => ({ status: s._id, count: s.count })),
    revenueByMonth: revenueByMonth.map((r) => ({
      month: `${r._id.year}-${String(r._id.month).padStart(2, "0")}`,
      revenue: r.revenue,
      orders: r.orders,
    })),
  });
}
