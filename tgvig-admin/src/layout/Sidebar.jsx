import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      width: "200px",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: "10px",
      borderRight: "1px solid #ccc"
    }}>
      <h3>Admin</h3>

      <Link to="/dashboard">Dashboard</Link>
<Link to="/members">Members</Link>
<Link to="/clubs">Clubs</Link>
<Link to="/menu">Menu</Link>
<Link to="/promotions">Promotions</Link>
<Link to="/blogs">Blogs</Link>
<Link to="/transactions">Transactions</Link>
<Link to="/analytics">Analytics</Link>
<Link to="/staff">Staff Management</Link>
<Link to="/table-bookings">Table Bookings</Link>
<Link to="/events">Event Tickets</Link>
<Link to="/card-designer">Card Designer</Link>
<Link to="/devices">Devices</Link>
<Link to="/device-blogs">POS Blogs</Link>
<Link to="/notifications">Notifications</Link>
<Link to="/coupons">Coupons</Link>
<Link to="/webfront">Web Front</Link>
 <Link to="/taxi">Taxi (VIG)</Link>
      <Link to="/drivers">Drivers</Link>
      <Link to="/rides">Ride Management</Link>
      <Link to="/properties">Hotels & Lodges</Link>
      <Link to="/bookings">Bookings</Link>
      <Link to="/partners">Partners</Link>
      <Link to="/parking">Parking System</Link>
      <Link to="/parking-sessions">Sessions</Link>
      <Link to="/payouts">Payouts</Link>
      <Link to="/wallet">Wallet</Link>
      <Link to="/payments">Payments</Link>
      <Link to="/admin/drivers">Driver Approvals</Link>
      <Link to="/admin/properties">Property Approvals</Link>
      <Link to="/admin/partners">Partner Approvals</Link>
    </div>
  );
}

export default Sidebar;