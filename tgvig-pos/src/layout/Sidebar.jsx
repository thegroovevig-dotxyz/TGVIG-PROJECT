import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: 200,
        background: "#111",
        color: "white",
        padding: 10,
      }}
    >
      <h4>POS MENU</h4>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
        <li><Link to="/member">Member</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;