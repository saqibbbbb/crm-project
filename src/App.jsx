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
