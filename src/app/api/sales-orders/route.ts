import { NextResponse, type NextRequest } from "next/server";
import { dbConnect } from "../../../lib/mongodb";
import { SalesOrder } from "../../../models/SalesOrder";
import { Customer } from "../../../models/Customer";
import { authorize } from "../../../lib/auth";
import { salesOrderSchema } from "../../../lib/validation";

function toDto(doc: InstanceType<typeof SalesOrder>) {
  return {
    id: doc.id,
    orderNumber: doc.orderNumber,
    customerId: doc.customerId.toString(),
    productName: doc.productName,
    quantity: doc.quantity,
    totalAmount: doc.totalAmount,
    status: doc.status,
    createdAt: doc.createdAt.toISOString(),
  };
}

const ORDER_STATUSES = ["created", "processing", "shipped", "delivered", "cancelled"];

export async function GET(request: NextRequest) {
  const auth = authorize(request);
  if ("response" in auth) return auth.response;

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const status = searchParams.get("status");
  const customerId = searchParams.get("customerId");
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 10));

  const filter: Record<string, unknown> = {};
  if (status && ORDER_STATUSES.includes(status)) {
    filter.status = status;
  }
  if (customerId) {
    filter.customerId = customerId;
  }
  if (q) {
    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ orderNumber: regex }, { productName: regex }];
  }

  const [docs, total] = await Promise.all([
    SalesOrder.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    SalesOrder.countDocuments(filter),
  ]);

  return NextResponse.json({
    data: docs.map(toDto),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
  });
}

export async function POST(request: NextRequest) {
  const auth = authorize(request);
  if ("response" in auth) return auth.response;

  const body = await request.json().catch(() => null);
  const parsed = salesOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  await dbConnect();

  const customerExists = await Customer.exists({ _id: parsed.data.customerId });
  if (!customerExists) {
    return NextResponse.json({ error: "Customer not found" }, { status: 400 });
  }

  const orderNumber = `SO-${Date.now().toString(36).toUpperCase()}`;
  const doc = await SalesOrder.create({
    ...parsed.data,
    orderNumber,
    createdBy: auth.user.sub,
  });

  return NextResponse.json({ data: toDto(doc) }, { status: 201 });
}
