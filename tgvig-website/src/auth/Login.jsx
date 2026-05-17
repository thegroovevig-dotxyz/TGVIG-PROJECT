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

    const user = res.user;

    if (!user) {
      alert("No user returned");
      return;
    }

    // ROLE ROUTING
    if (user.role === "MEMBER") {
      navigate("/home");
    }

    if (user.role === "DRIVER") {
      navigate("/driver/rides");
    }

    if (user.role === "PARTNER") {
      navigate("/partner/bookings");
    }

   
  } catch (err) {
    console.log(err);
    alert("Login failed");
  }
};

  const settings = useSettings();

return (
  <form onSubmit={handleLogin}>

    {/* LOGO */}
    {settings?.logo && (
      <img
        src={settings.logo}
        alt="logo"
        style={{
          width: "120px",
          marginBottom: "20px"
        }}
      />
    )}

    {/* EMAIL */}
    <input
      placeholder="Email"
      onChange={(e) =>
        setEmail(e.target.value)
      }
    />

    {/* PASSWORD */}
    <input
      type="password"
      placeholder="Password"
      onChange={(e) =>
        setPassword(e.target.value)
      }
    />

    {/* LOGIN */}
    <button type="submit">
      Login
    </button>

    {/* MEMBER REGISTER */}
    <button
      type="button"
      onClick={() => navigate("/register")}
    >
      Join Free
    </button>

    <hr />

    {/* DRIVER */}
    <p>
      New driver?
    </p>

    <button
      type="button"
      onClick={() =>
        navigate("/register/driver")
      }
    >
      Create Driver Account
    </button>

    <br />
    <br />

    {/* PROPERTY */}
    <p>
      Own a hotel, lodge or parking business?
    </p>

    <button
      type="button"
      onClick={() =>
        navigate("/register/property")
      }
    >
      Register Property Business
    </button>

  </form>
);
}

      
export default Login;