import { NextResponse, type NextRequest } from "next/server";
import { dbConnect } from "../../../../lib/mongodb";
import { SalesOrder } from "../../../../models/SalesOrder";
import { authorize } from "../../../../lib/auth";
import { salesOrderUpdateSchema } from "../../../../lib/validation";

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

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = authorize(request);
  if ("response" in auth) return auth.response;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = salesOrderUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  await dbConnect();
  const doc = await SalesOrder.findByIdAndUpdate(id, parsed.data, { returnDocument: "after" });
  if (!doc) {
    return NextResponse.json({ error: "Sales order not found" }, { status: 404 });
  }

  return NextResponse.json({ data: toDto(doc) });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = authorize(request, ["admin"]);
  if ("response" in auth) return auth.response;

  const { id } = await params;
  await dbConnect();
  const doc = await SalesOrder.findByIdAndDelete(id);
  if (!doc) {
    return NextResponse.json({ error: "Sales order not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
