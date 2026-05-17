import { Link, Outlet } from "react-router-dom";

export default function PartnerLayout() {
  return (
    <div style={{ display: "flex" }}>

      {/* SIDEBAR */}
      <div style={{ width: "240px", borderRight: "1px solid #ccc", padding: "10px" }}>
        <h3>🏨 Partner Portal</h3>

        <ul>
          <li><Link to="">Dashboard</Link></li>
          <li><Link to="bookings">Bookings</Link></li>
          <li><Link to="parking">Parking Sessions</Link></li>
          <li><Link to="pos">Mini POS</Link></li>
          <li><Link to="payouts">Payouts</Link></li>
        </ul>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
}