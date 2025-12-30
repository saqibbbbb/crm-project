const ProtectedLayout = ({ onLogout, children }) => {
  return (
    <div>
      <header className="p-4 border-b flex justify-between">
        <h1 className="font-bold">CRM</h1>
        <button onClick={onLogout} className="border px-3 py-1 rounded">
          Logout
        </button>
      </header>

      <main className="p-5">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
