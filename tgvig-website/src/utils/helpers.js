export const formatCurrency = (amount) => {
  return `R ${Number(amount || 0).toFixed(2)}`;
};

export const calculateTotal = (items = []) => {
  return items.reduce((sum, item) => sum + (item.price || 0), 0);
};

export const generateOrderId = () => {
  return "ORD-" + Date.now();
};

export const isEmpty = (value) => {
  return !value || value.length === 0;
};