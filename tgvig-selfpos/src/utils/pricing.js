export const applyDiscount = (total, discount = 0) => {
  return total - (total * discount) / 100;
};

export const calculatePoints = (amount) => {
  // 1 point per R10
  return Math.floor(amount / 10);
};

export const pointsToMoney = (points) => {
  // 100 points = R10
  return (points / 100) * 10;
};