import { useState } from "react";
import { login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import useSettings from "../hooks/useSettings";


function Login() {
  const [membershipNo, setMembershipNo] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 200,
      },
      false
    );

    scanner.render((text) => {
      onScan(text);
    });

    return () => scanner.clear();
  }, []);

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
      else navigate("/selfpos");

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

{/* ALWAYS ON CAMERA SCANNER */}
<div style={{ width: "250px", height: "250px" }}>
  <Scanner
  onScan={(code) => setMembershipNo(code)}
  controls={false}

  />
</div>

      {settings?.logo && (
  <img src={settings.logo} width="120" />
)}
    
    </div>
  );
}

export default Login;