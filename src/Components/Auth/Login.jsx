import { useState } from "react";
import { loginUser } from "../../Services/authService";

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

  return (
    <div className="max-w-sm mx-auto mt-20 p-5 border rounded">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />

        <button className="p-2 border rounded">Login</button>
      </form>

      {error && <p className="mt-3 text-red-500">{error}</p>}
    </div>
  );
};

export default Login;
