import { useState } from "react";
import { login } from "./authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });

      const user = res.user;
      const token = res.token;

      console.log("USER:", user);

      // ADMIN ONLY CHECK
if (user.role !== "ADMIN") {
  alert("Access denied");
  return;
}

      // store session
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // redirect
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;