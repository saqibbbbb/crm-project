import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse, type NextRequest } from "next/server";
import type { UserRole } from "../models/User";

const JWT_EXPIRES_IN = "8h";
const SALT_ROUNDS = 10;

export const AUTH_COOKIE_NAME = "crm_token";

export interface AuthTokenPayload {
  sub: string;
  username: string;
  role: UserRole;
}

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set. Add it to .env.local");
  }
  return secret;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, getSecret(), { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, getSecret()) as AuthTokenPayload;
  } catch {
    return null;
  }
}

export function getAuthUser(request: NextRequest): AuthTokenPayload | null {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export const AUTH_COOKIE_MAX_AGE = 8 * 60 * 60; // 8 hours, matches JWT_EXPIRES_IN

export function requireRole(user: AuthTokenPayload | null, roles: UserRole[]): boolean {
  return !!user && roles.includes(user.role);
}

/**
 * Route-handler guard: returns the authenticated user, or a ready-to-return
 * NextResponse (401/403) when the caller isn't authorized. API routes are
 * the enforcement boundary since bcrypt/jsonwebtoken need the Node runtime,
 * not Next.js edge middleware.
 */
export function authorize(
  request: NextRequest,
  roles?: UserRole[]
): { user: AuthTokenPayload } | { response: NextResponse } {
  const user = getAuthUser(request);
  if (!user) {
    return { response: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) };
  }
  if (roles && !requireRole(user, roles)) {
    return { response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { user };
}
