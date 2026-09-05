import type { AuthUser } from "../types";

async function parseJson(response: Response) {
  return response.json().catch(() => ({}));
}

export const loginUser = async (username: string, password: string): Promise<AuthUser> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const body = await parseJson(response);
  if (!response.ok) {
    throw new Error(body.error ?? "Login failed");
  }

  return body.user as AuthUser;
};

export const logoutUser = async (): Promise<void> => {
  await fetch("/api/auth/logout", { method: "POST" });
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const response = await fetch("/api/auth/me");
  if (!response.ok) return null;
  const body = await parseJson(response);
  return body.user ?? null;
};
