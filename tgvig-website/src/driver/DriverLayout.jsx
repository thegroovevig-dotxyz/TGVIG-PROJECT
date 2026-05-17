import { Link, Outlet } from "react-router-dom";

export default function DriverLayout() {
  return (
    <div style={{ display: "flex" }}>

      {/* SIDEBAR */}
      <div style={{ width: "220px", borderRight: "1px solid #ccc", padding: "10px" }}>
        <h3>🚗 Driver</h3>

        <ul>
          <li><Link to="">Dashboard</Link></li>
          <li><Link to="rides">My Rides</Link></li>
          <li><Link to="earnings">Earnings</Link></li>
          <li><Link to="profile">Profile</Link></li>
        </ul>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
}