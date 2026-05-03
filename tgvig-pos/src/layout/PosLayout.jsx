import { Outlet, useNavigate } from "react-router-dom";

function PosLayout() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const logo = localStorage.getItem("clubLogo"); // 👈 admin saved logo URL

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <header
        style={{
          padding: "10px",
          background: "#eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* LEFT */}
        <h3 style={{ margin: 0 }}>POS SYSTEM</h3>

        {/* CENTER LOGO */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {logo ? (
            <img
              src={logo}
              alt="Club Logo"
              style={{ height: "40px", objectFit: "contain" }}
            />
          ) : (
            <span>No Logo</span>
          )}
        </div>

        {/* RIGHT */}
        <button onClick={logout}>
          Logout
        </button>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default PosLayout;