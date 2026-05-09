import { useState } from "react";
import { authService } from "./authService";
import { useNavigate } from "react-router-dom";
import useSettings from "../hooks/useSettings";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await authService.login({
  email,
  password,
});

    console.log("LOGIN SUCCESS:", res);

    navigate("/app")

  } catch (err) {
    console.log(err);
    alert("Login failed");
  }
}

  const settings = useSettings();

  return (
    <form onSubmit={handleLogin}>

 {/*  LOGO FROM ADMIN SETTINGS */}
      {settings?.logo && (
        <img
          src={settings.logo}
          alt="logo"
          style={{ width: "120px", marginBottom: "20px" }}
        />
      )}

      <input onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>

<button
  type="button"
  onClick={() => navigate("/register")}
>
  Register
</button>

    </form>
  );
}

      
export default Login;