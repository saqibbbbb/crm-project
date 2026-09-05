import { NextResponse, type NextRequest } from "next/server";
import { dbConnect } from "../../../../lib/mongodb";
import { User } from "../../../../models/User";
import { verifyPassword, signToken, AUTH_COOKIE_NAME, AUTH_COOKIE_MAX_AGE } from "../../../../lib/auth";
import { loginSchema } from "../../../../lib/validation";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const { username, password } = parsed.data;

  await dbConnect();
  const user = await User.findOne({ username: username.toLowerCase() });

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const token = signToken({ sub: user.id, username: user.username, role: user.role });

  const response = NextResponse.json({
    user: { username: user.username, role: user.role },
  });

  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE,
  });

  return response;
}
