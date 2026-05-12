import { useCart } from "../context/CartContext";
import { checkout } from "../api/checkout.api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  

  const handleCheckout = async () => {
    if (cart.length === 0) return;
if (location.state.paymentType === "DEPOSIT") {
  amount = deposit;
} else {
  amount = totalPrice;
}
    setLoading(true);

    try {
      const payload = {
        items: cart,
        total,
      };

      const res = await checkout(payload);

      clearCart();

      navigate("/orders");

      alert("Order successful");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert("Checkout failed");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CHECKOUT</h2>

      <h3>Total: R {total}</h3>

      <button
        onClick={handleCheckout}
        disabled={loading || cart.length === 0}
      >
        {loading ? "Processing..." : "Confirm Order"}
      </button>
    </div>
  );
}

export default Checkout;