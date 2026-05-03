export const formatCurrency = (amount) => {
  return `R ${Number(amount || 0).toFixed(2)}`;
};

export const generateReceiptNo = () => {
  return "RCP-" + Date.now();
};

export const safeNumber = (value) => {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};