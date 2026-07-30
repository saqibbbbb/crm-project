"use client";

import { useEffect, useState } from "react";
import Login from "./Components/Auth/Login";
import ProtectedLayout from "./Components/Layout/ProtectedLayout";
import Dashboard from "./Views/Dashboard";
import Customer from "./Views/Customers";
import SalesOrder from "./Views/SalesOrder";
import { getToken, setToken, removeToken } from "./Utils/auth";
import type { ActivePage } from "./types";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");

  useEffect(() => {
    if (getToken()) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  return (
    <ProtectedLayout
      onLogout={logout}
      activePage={activePage}
      setActivePage={setActivePage}
    >
      {activePage === "dashboard" && <Dashboard />}
      {activePage === "customers" && <Customer />}
      {activePage === "salesOrders" && <SalesOrder />}
    </ProtectedLayout>
  );
}

export default App;
