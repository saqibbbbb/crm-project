import { useState } from "react";
import users from "../../navigation.json";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setMessage("Login successful");
    } else {
      setMessage("Invalid username or password");
    }
  };

  return (
    <div className="w-75 mx-auto mt-25 p-5 border border-gray-300 rounded-[5px] text-center">
      <h2 className="text-lg font-semibold mb-4">Login</h2>

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="p-2 border border-gray-400 cursor-pointer rounded hover:bg-gray-100"
        >
          Login
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Login;
