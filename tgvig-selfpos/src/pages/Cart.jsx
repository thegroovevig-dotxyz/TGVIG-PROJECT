import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Scanner from "../components/Scanner";

function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("WALLET");
  const [pin, setPin] = useState("");

  // 🔥 NEW STATES (ADDED ONLY)
  const [scanMode, setScanMode] = useState(false);
  const [approved, setApproved] = useState(false);

  const total = cart.reduce((sum, item) => {
    const itemTotal =
      item.total || (item.price * item.quantity) || 0;

    return sum + Number(itemTotal);
  }, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>CART</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div>
              <b>{item.name}</b>

              {item.size && <span> ({item.size})</span>}

              <p>
                R{item.price} x {item.quantity} = R{item.total}
              </p>
            </div>

            <button onClick={() => removeFromCart(item._id)}>
              Remove
            </button>
          </div>
        ))
      )}

      <h3>Total: R{total}</h3>

      {/* PAYMENT */}
      <div style={{ marginTop: "20px" }}>
        <h4>Payment Method</h4>

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="WALLET">Wallet</option>
          <option value="POINTS">Points</option>
        </select>
      </div>

      {/* PIN */}
      <div style={{ marginTop: "10px" }}>
        <input
          type="password"
          placeholder="Enter Member PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
      </div>

      {/* 🔥 NEW: CARD SCAN BUTTON */}
      <div style={{ marginTop: "15px" }}>
        <button onClick={() => setScanMode(true)}>
          Scan Card (Pay)
        </button>
      </div>

      {/* 🔥 NEW: SCANNER ALWAYS ACTIVE WHEN OPEN */}
      {scanMode && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div style={{ width: "300px", background: "#fff", padding: 10 }}>
            <Scanner
              onScan={(code) => {
                setPin(code);       // auto-fill PIN
                setApproved(true);  // mark approved
                setScanMode(false); // close scanner
              }}
            />
          </div>
        </div>
      )}

      {/* CHECKOUT */}
      <button
        disabled={cart.length === 0 || !pin || !approved}
        onClick={() =>
          navigate("/checkout", {
            state: {
              cart,
              total,
              paymentMethod,
              pin,
            },
          })
        }
      >
        Checkout
      </button>
    </div>
  );
}

export default Cart;