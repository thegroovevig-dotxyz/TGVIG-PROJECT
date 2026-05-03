import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ➕ add item
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  // ❌ remove item
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  // 🧹 clear cart after payment
  const clearCart = () => {
    setCart([]);
  };

  // 💰 total calculation
  const total = cart.reduce((sum, item) => {
    return sum + (item.price || 0);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);