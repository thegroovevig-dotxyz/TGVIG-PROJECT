import { useState } from "react";
import { login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import useSettings from "../hooks/useSettings";


function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });

      const user = res.data.user;

      console.log("USER:", user);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.pin) {
        localStorage.setItem("pin", user.pin);
      }

      // role routing
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "pos") {
        navigate("/pos");
      } else {
        alert("Access denied");
      }

      // safe callback
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess(user);
      }

    } catch (err) {
      console.log(err);
      alert("Invalid login");
    }
  };

  const settings = useSettings();

  return (
    <div>
      <h2>POS Login</h2>

      <form onSubmit={handleLogin}>
        <input
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


  {/* 🔥 LOGO FROM ADMIN */}
  {settings?.logo && (
    <img
      src={settings.logo}
      alt="logo"
      style={{ width: "120px", marginBottom: "20px" }}
    />
  )}



    </div>
  );
}

export default Login;