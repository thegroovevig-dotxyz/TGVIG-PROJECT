import { useNavigate } from "react-router-dom";
import { authService } from "../auth/authService";

function Navbar() {
  const navigate = useNavigate();
  const user = authService.getUser();

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <button onClick={() => navigate("/home")}>Home</button>
      <button onClick={() => navigate("/home/cart")}>Cart</button>
      <button onClick={() => navigate("/home/profile")}>Profile</button>

      <div style={{ float: "right" }}>
        {user ? (
          <button onClick={() => authService.logout()}>
            Logout
          </button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;