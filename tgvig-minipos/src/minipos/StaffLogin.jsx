import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function StaffLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
  try {
    const res = await API.post("/members/login", {
      email,
      password,
    });

    const user = res.data.user;

    if (user.role !== "STAFF") {
      return alert("STAFF ONLY");
    }

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", res.data.token);

    localStorage.setItem("deviceType", "MINI_POS");

    // OPTIONAL but important for MINI POS flow
    if (user.deviceId) {
      localStorage.setItem("deviceId", user.deviceId);
    }

    navigate("/minipos/scan-qr");
  } catch (err) {
    console.log(err);
    alert("Login failed");
  }
};

  return (
    <div style={{ padding: 20 }}>
      <h2>MINIPOS STAFF LOGIN</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default StaffLogin;