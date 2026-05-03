import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const vat = subTotal * 0.15;
  const total = subTotal + vat;

  return (
    <div>
      <h2>Cart</h2>

      {cart.map((item) => (
        <div key={item._id}>
          {item.name} - R{item.price}
          <button onClick={() => removeFromCart(item._id)}>
            Remove
          </button>
        </div>
      ))}

      <hr />

      <p>Subtotal: R{subTotal.toFixed(2)}</p>
      <p>VAT (15%): R{vat.toFixed(2)}</p>

      <h3>Total: R{total.toFixed(2)}</h3>

      <button onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;