export const calculateSubtotal = (cart) => {
  return cart.reduce((sum, item) => {
    return sum + (item.price || 0);
  }, 0);
};

// 🟡 SIMPLE DISCOUNT SYSTEM (extend later for VIP/promos)
export const applyDiscount = (total, discountPercent = 0) => {
  return total - (total * discountPercent) / 100;
};

// 🔥 FINAL POS TOTAL CALCULATOR
export const calculateTotal = (cart, discountPercent = 0) => {
  const subtotal = calculateSubtotal(cart);
  return applyDiscount(subtotal, discountPercent);
};