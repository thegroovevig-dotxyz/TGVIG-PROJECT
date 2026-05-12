import { useState } from "react";
import { login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import Scanner from "../components/Scanner";
import useSettings from "../hooks/useSettings";


function Login() {
  const [membershipNo, setMembershipNo] = useState("");
  const [password, setPassword] = useState("");
  const [scanMode, setScanMode] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({
        membershipNo,
        password
      });

      const user = res.data.user;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      // redirect based on role (POS system safe)
      if (user.role === "admin") navigate("/dashboard");
      else navigate("/pos");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const settings = useSettings();

  return (
    <div style={{ padding: "20px" }}>
      <h2>POS LOGIN</h2>

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

{/* CAMERA SCANNER */}
<div
  style={{
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.6)", // dark overlay
    zIndex: 9999,
  }}
>
  <div
    style={{
      width: "280px",
      height: "280px",
      background: "#000",
      borderRadius: "12px",
      overflow: "hidden",
      position: "relative",
    }}
  >
    <Scanner
      onScan={(code) => {
        setMembershipNo(code);
        setScanMode(false);
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    />

    {/* close button */}
    <button
      onClick={() => setScanMode(false)}
      style={{
        position: "absolute",
        top: 5,
        right: 5,
        padding: "5px 8px",
        fontSize: "12px",
      }}
    >
      X
    </button>
  </div>
</div>

      {settings?.logo && (
  <img src={settings.logo} width="120" />
)}
    
    </div>
  );
}

export default Login;