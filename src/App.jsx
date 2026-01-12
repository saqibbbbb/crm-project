import { useEffect, useState } from "react";
import Login from "./Components/Auth/Login";
import ProtectedLayout from "./Components/Layout/ProtectedLayout";
import Dashboard from "./Pages/Dashboard";
import Customer from "./Pages/Customers";
import SalesOrder from "./Pages/SalesOrder";
import { getToken, setToken, removeToken } from "./Utils/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    if (getToken()) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
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
    <ProtectedLayout onLogout={logout}>
      {/* Simple navigation */}
      <div className="mb-6 flex gap-4">
        <button
          className="border px-3 py-1 rounded"
          onClick={() => setActivePage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className="border px-3 py-1 rounded"
          onClick={() => setActivePage("customers")}
        >
          Customers
        </button>

        <button
          className="border px-3 py-1 rounded"
          onClick={() => setActivePage("salesOrders")}
        >
          Sales Orders
        </button>
      </div>

      {activePage === "dashboard" && <Dashboard />}
      {activePage === "customers" && <Customer />}
      {activePage === "salesOrders" && <SalesOrder />}
    </ProtectedLayout>
  );
}

export default App;
