import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("WALLET");
  const [pin, setPin] = useState("");

  // ✅ FIX PRICE STRUCTURE
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price?.single || 0),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>CART</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item) => (
          <div key={item._id}>
            {item.name} - R{item.price?.single}

            <button onClick={() => removeFromCart(item._id)}>
              Remove
            </button>
          </div>
        ))
      )}

      <h3>Total: R{total}</h3>

      {/* 🔥 PAYMENT METHOD */}
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

      {/* 🔐 PIN */}
      <div style={{ marginTop: "10px" }}>
        <input
          type="password"
          placeholder="Enter Member PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
      </div>

      {/* 🚀 CHECKOUT */}
      <button
        disabled={cart.length === 0 || !pin}
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