import { useState } from "react";
import { authService } from "../auth/authService";
import { useNavigate } from "react-router-dom";
import useSettings from "../hooks/useSettings";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });

      const user = res.user;

      console.log("USER:", user);

      if (user.role === "admin") {
  navigate("/home");
} else if (user.role === "MEMBER") {
  navigate("/home");
} else {
  alert("Access denied");
}

  

    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

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