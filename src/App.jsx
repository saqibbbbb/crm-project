import { useEffect, useState } from "react";
import Login from "./components/auth/Login";
import Dashboard from "./Pages/Dashboard";
import ProtectedLayout from "./Components/Layout/ProtectedLayout";
import { getToken, setToken, removeToken } from "./Utils/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (getToken()) setIsAuthenticated(true);
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
      <Dashboard />
    </ProtectedLayout>
  );
}

export default App;
