import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "./authService";

function PropertyLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await authService.login({ email, password });

      const user = res.user;

      if (user.role !== "PARTNER") {
        alert("Not a property account");
        return;
      }

      navigate("/partner/bookings");

    } catch (err) {
      console.log(err);
      alert("Property login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>🏨 Property Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login as Property</button>

      <p>
        New business?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/register/property")}
        >
          Register here
        </span>
      </p>
    </form>
  );
}

export default PropertyLogin;