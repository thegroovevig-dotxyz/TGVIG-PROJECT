import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart } = useCart();

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

      
    </div>
  );
}

export default Cart;