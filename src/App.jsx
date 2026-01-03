import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Components/Auth/Login";
import ProtectedLayout from "./Components/Layout/ProtectedLayout";
import Dashboard from "./Pages/Dashboard";
import Customer from "./Pages/Customers";
import { getToken, setToken, removeToken } from "./Utils/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customer />} />
      </Routes>
    </ProtectedLayout>
  );
}

export default App;
