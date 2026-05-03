import { useState } from "react";
import { login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

function PasswordLogin() {
  const [membershipNo, setMembershipNo] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ membershipNo, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>LOGIN WITH PASSWORD</h2>

      <input
        placeholder="Membership Number"
        value={membershipNo}
        onChange={(e) => setMembershipNo(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default PasswordLogin;