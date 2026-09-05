import { NextResponse, type NextRequest } from "next/server";
import { dbConnect } from "../../../../lib/mongodb";
import { Customer } from "../../../../models/Customer";
import { authorize } from "../../../../lib/auth";

export async function GET(request: NextRequest) {
  const auth = authorize(request);
  if ("response" in auth) return auth.response;

  await dbConnect();

  const docs = await Customer.find({}, "name company").sort({ name: 1 }).limit(2000);

  return NextResponse.json({
    data: docs.map((d) => ({ id: d.id, name: d.name, company: d.company })),
  });
}
