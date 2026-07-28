import { useState } from "react";
import { loginUser } from "../../Services/authService";
import ThemeToggle from "../Common/ThemeToggle";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    const user = loginUser(username, password);

    if (!user) {
      setError("Invalid credentials");
      return;
    }

    // temporary token
    onLogin("jwt.fake.token");
  };

  const inputClass =
    "w-full p-2.5 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4 relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm p-8 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-100 dark:bg-zinc-900">
        <div className="w-9 h-9 rounded-md bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 flex items-center justify-center font-bold mb-5">
          C
        </div>

        <h2 className="text-xl font-semibold mb-1.5 text-zinc-900 dark:text-zinc-100">Welcome back</h2>
        <p className="text-sm text-zinc-500 mb-6">Sign in to your CRM account</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label>
            <span className="text-xs text-zinc-500 mb-1.5 block">Username</span>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
            />
          </label>

          <label>
            <span className="text-xs text-zinc-500 mb-1.5 block">Password</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </label>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-500/10 rounded-md px-3 py-2.5">
              {error}
            </p>
          )}

          <button className="mt-1 p-2.5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-white transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
