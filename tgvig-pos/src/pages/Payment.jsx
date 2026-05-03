import API from "../api/axios";
import { useCart } from "../context/CartContext";

function Payment() {
  const { cart, total, clearCart } = useCart();

  const pay = async () => {
    try {
      await API.post("/checkout", {
        items: cart,
        total,
      });

      clearCart();

      alert("Payment successful");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Payment</h2>

      <p>Total: R{total}</p>

      <button onClick={pay}>Pay Now</button>
    </div>
  );
}

export default Payment;