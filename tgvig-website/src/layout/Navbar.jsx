import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #9b6c6c" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/menu">Menu</Link> |{" "}
      <Link to="/promotions">Promotions</Link> |{" "}
      <Link to="/cart">Cart</Link> |{" "}
      <Link to="/wallet">Wallet</Link> |{" "}
      <Link to="/profile">Profile</Link>

      <div style={{ float: "right" }}>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>
              {user.firstName}
            </span>
            <button onClick={() => {
              logout();
              navigate("/login");
            }}>
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