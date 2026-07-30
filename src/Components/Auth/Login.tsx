import { useState, type FormEvent } from "react";
import { loginUser } from "../../Services/authService";
import ThemeToggle from "../Common/ThemeToggle";

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="glass-strong w-full max-w-sm p-8 rounded-2xl">
        <div className="w-9 h-9 rounded-md bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-[0_4px_12px_-2px_rgba(30,41,59,0.55)] flex items-center justify-center font-bold mb-5">
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
              className="glass-input rounded-xl p-2.5"
            />
          </label>

          <label>
            <span className="text-xs text-zinc-500 mb-1.5 block">Password</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input rounded-xl p-2.5"
            />
          </label>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
              {error}
            </p>
          )}

          <button className="btn-primary mt-1 p-2.5 rounded-xl text-sm">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
