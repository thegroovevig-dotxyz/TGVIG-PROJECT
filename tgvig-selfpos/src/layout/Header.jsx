import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div
      style={{
        background: "#111",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h3>SELF POS</h3>

      <div>
        <span style={{ marginRight: "15px" }}>
          {user?.name}
        </span>

        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/cart")}>Cart</button>
        <button onClick={() => navigate("/POS")}>Profile</button>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;