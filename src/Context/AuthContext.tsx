/* eslint-disable react-refresh/only-export-components -- context object + hook intentionally live together */
import { createContext, useContext } from "react";
import type { AuthUser } from "../types";

export const AuthContext = createContext<AuthUser | null>(null);

export const AuthProvider = AuthContext.Provider;

export const useAuth = () => useContext(AuthContext);
