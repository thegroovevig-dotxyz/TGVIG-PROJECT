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
    </div>
  );
}

export default Sidebar;