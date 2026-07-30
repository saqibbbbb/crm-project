import users from "../navigation.json";
import type { NavUser } from "../types";

export const loginUser = (username: string, password: string): NavUser | undefined => {
  return users.find(
    (u) => u.username === username.trim() && u.password === password
  );
};
