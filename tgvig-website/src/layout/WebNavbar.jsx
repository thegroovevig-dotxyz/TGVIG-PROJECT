import { Link, useNavigate } from "react-router-dom";
import { authService } from "../auth/authService";

function WebNavbar() {
  const navigate = useNavigate();
  const user = authService.getUser();

  return (
    <nav style={{ padding: "15px", borderBottom: "1px solid #ccc", position: "relative" }}>

      {/* CENTER LOGO */}
      <div style={{ textAlign: "center" }}>
        <img
          src="/logo.png"
          alt="logo"
          style={{ width: "120px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </div>

      {/* LINKS */}
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <Link to="/">About</Link> |{" "}
        <Link to="/webRewards">Rewards</Link> |{" "}
        <Link to="/benefits">Benefits</Link> |{" "}
        <Link to="/venues">Venues</Link>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ position: "absolute", right: "20px", top: "20px" }}>
        {user ? (
          <button onClick={() => navigate("/home")}>Dashboard</button>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Join Free</button>
          </>
        )}
      </div>

    </nav>
  );
}

export default WebNavbar;