import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "./authService";

function DriverLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await authService.login({ email, password });

      const user = res.user;

      if (user.role !== "DRIVER") {
        alert("Not a driver account");
        return;
      }

      navigate("/driver/rides");

    } catch (err) {
      console.log(err);
      alert("Driver login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>🚗 Driver Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login as Driver</button>

      <p>
        New driver?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/register/driver")}
        >
          Register here
        </span>
      </p>
    </form>
  );
}

export default DriverLogin;