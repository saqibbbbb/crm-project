import { NextResponse, type NextRequest } from "next/server";
import { dbConnect } from "../../../lib/mongodb";
import { Customer } from "../../../models/Customer";
import { authorize } from "../../../lib/auth";
import { customerSchema } from "../../../lib/validation";

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

export async function GET(request: NextRequest) {
  const auth = authorize(request);
  if ("response" in auth) return auth.response;

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const status = searchParams.get("status");
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 10));

  const filter: Record<string, unknown> = {};
  if (status && ["lead", "active", "inactive"].includes(status)) {
    filter.status = status;
  }
  if (q) {
    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ name: regex }, { email: regex }, { company: regex }];
  }

  const [docs, total] = await Promise.all([
    Customer.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Customer.countDocuments(filter),
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
  const parsed = customerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  await dbConnect();
  const doc = await Customer.create({ ...parsed.data, createdBy: auth.user.sub });

  return NextResponse.json({ data: toDto(doc) }, { status: 201 });
}
