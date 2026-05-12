import { useCart } from "../context/CartContext";
import { checkout } from "../api/checkout.api";
import { useNavigate } from "react-router-dom";

function Payment() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handlePayment = async () => {
    try {
      await checkout({
        memberId: user._id,
        items: cart,
        paymentMethod: "wallet",
      });

      clearCart();

      navigate("/success");
    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }
  };

  return (
    <div>
      <h2>PAYMENT</h2>

      <button onClick={handlePayment}>
        Pay with Wallet
      </button>
    </div>
  );
}

export default Payment;