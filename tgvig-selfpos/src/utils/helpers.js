export const formatCurrency = (amount) => {
  return `R ${Number(amount || 0).toFixed(2)}`;
};

export const calculateTotal = (cart = []) => {
  return cart.reduce((sum, item) => sum + (item.price || 0), 0);
};

export const isEmpty = (arr) => {
  return !arr || arr.length === 0;
};

export const generateOrderId = () => {
  return "SP-" + Date.now();
};