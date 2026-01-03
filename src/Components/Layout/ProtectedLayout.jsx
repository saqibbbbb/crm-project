import { Link } from "react-router-dom";

const ProtectedLayout = ({ onLogout, children }) => {
  return (
    <div>
      <header className="p-4 border-b flex justify-between items-center">
        <h1 className="font-bold">CRM</h1>

        <div className="flex gap-4 items-center">
          <Link to="/dashboard" className="border px-3 py-1 rounded">
            Dashboard
          </Link>

          <Link to="/customers" className="border px-3 py-1 rounded">
            Customers
          </Link>

          <button onClick={onLogout} className="border px-3 py-1 rounded">
            Logout
          </button>
        </div>
      </header>

      <main className="p-5">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
