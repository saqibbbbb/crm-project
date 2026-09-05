"use client";

import { useEffect, useState } from "react";
import Login from "./Components/Auth/Login";
import ProtectedLayout from "./Components/Layout/ProtectedLayout";
import Dashboard from "./Views/Dashboard";
import Customer from "./Views/Customers";
import SalesOrder from "./Views/SalesOrder";
import { getCurrentUser, logoutUser } from "./Services/authService";
import { AuthProvider } from "./Context/AuthContext";
import type { ActivePage, AuthUser } from "./types";

function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => setCheckingSession(false));
  }, []);

  const login = (loggedInUser: AuthUser) => {
    setUser(loggedInUser);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  if (checkingSession) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-zinc-500">Loading...</div>;
  }

  if (!user) {
    return <Login onLogin={login} />;
  }

  return (
    <AuthProvider value={user}>
      <ProtectedLayout onLogout={logout} activePage={activePage} setActivePage={setActivePage}>
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "customers" && <Customer />}
        {activePage === "salesOrders" && <SalesOrder />}
      </ProtectedLayout>
    </AuthProvider>
  );
}

export default App;
