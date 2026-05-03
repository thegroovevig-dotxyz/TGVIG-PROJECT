export const applyDiscount = (price, discount = 0) => {
  return price - (price * discount) / 100;
};

export const calculateCartTotal = (cart = [], promo = null) => {
  let total = cart.reduce((sum, item) => sum + item.price, 0);

  if (promo?.discount) {
    total = applyDiscount(total, promo.discount);
  }

  return total;
};

export const calculatePointsEarned = (amount) => {
  // 1 point per R10 spent
  return Math.floor(amount / 10);
};

export const redeemPointsValue = (points) => {
  // 100 points = R10
  return (points / 100) * 10;
};