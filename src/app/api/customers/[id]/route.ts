import { NextResponse, type NextRequest } from "next/server";
import { dbConnect } from "../../../../lib/mongodb";
import { Customer } from "../../../../models/Customer";
import { SalesOrder } from "../../../../models/SalesOrder";
import { authorize } from "../../../../lib/auth";
import { customerUpdateSchema } from "../../../../lib/validation";

function toDto(doc: InstanceType<typeof Customer>) {
  return {
    id: doc.id,
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    company: doc.company,
    status: doc.status,
    createdAt: doc.createdAt.toISOString(),
  };
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = authorize(request);
  if ("response" in auth) return auth.response;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = customerUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  await dbConnect();
  const doc = await Customer.findByIdAndUpdate(id, parsed.data, { returnDocument: "after" });
  if (!doc) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  return NextResponse.json({ data: toDto(doc) });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = authorize(request, ["admin"]);
  if ("response" in auth) return auth.response;

  const { id } = await params;
  await dbConnect();

  const ordersCount = await SalesOrder.countDocuments({ customerId: id });
  if (ordersCount > 0) {
    return NextResponse.json(
      { error: `Cannot delete: ${ordersCount} sales order(s) reference this customer` },
      { status: 409 }
    );
  }

  const doc = await Customer.findByIdAndDelete(id);
  if (!doc) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
