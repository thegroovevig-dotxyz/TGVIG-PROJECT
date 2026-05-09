import { Link, useNavigate } from "react-router-dom";
import { authService } from "../auth/authService";

function Navbar() {
  const navigate = useNavigate();

  const user = authService.getUser();

  const logout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #9b6c6c" }}>
      <Link to="/app">Home</Link> |{" "}
      <Link to="/app/menu">Menu</Link> |{" "}
      <Link to="/app/promotions">Promotions</Link> |{" "}
      <Link to="/app/cart">Cart</Link> |{" "}
      <Link to="/app/wallet">Wallet</Link> |{" "}
      <Link to="/app/profile">Profile</Link>

      <div style={{ float: "right" }}>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>
              {user.firstName}
            </span>

            <button onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;