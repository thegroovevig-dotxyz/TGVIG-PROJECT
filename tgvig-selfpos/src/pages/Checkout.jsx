import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>CHECKOUT</h2>

      <p>Total: R{total}</p>

      <button onClick={() => navigate("/payment")}>
        Proceed to Payment
      </button>
    </div>
  );
}

export default Checkout;