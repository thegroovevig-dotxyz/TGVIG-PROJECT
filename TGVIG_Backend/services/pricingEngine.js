const Menu = require("../models/Menu");
const Promotion = require("../models/Promotion");

// 🧠 MAIN PRICE CALCULATOR
exports.calculatePrice = async ({
  menuId,
  items,
  clubId,
  currentTime = new Date()
}) => {

  // =========================
  // 1. GET MENU
  // =========================
  const menu = await Menu.findById(menuId);
  if (!menu) throw new Error("Menu not found");

  let baseTotal = 0;

  // =========================
  // 2. CALCULATE BASE MENU PRICE
  // =========================
  for (let orderItem of items) {
    const menuItem = menu.items.find(
      (i) => i.name === orderItem.name
    );

    if (!menuItem) continue;

    baseTotal += menuItem.priceCash * orderItem.quantity;
  }

  // =========================
  // 3. GET ACTIVE PROMOTIONS
  // =========================
  const promotions = await Promotion.find({
    clubId,
    isActive: true,
    startTime: { $lte: currentTime },
    endTime: { $gte: currentTime }
  });

  let discount = 0;
  let bonusPoints = 0;

  // =========================
  // 4. APPLY PROMOTIONS
  // =========================
  for (let promo of promotions) {

    // 💸 PERCENT DISCOUNT
    if (promo.discountType === "PERCENT") {
      discount += (baseTotal * promo.value) / 100;
    }

    // 💸 FIXED DISCOUNT
    if (promo.discountType === "FIXED") {
      discount += promo.value;
    }

    // 🎯 BONUS POINTS PROMO
    if (promo.discountType === "POINTS_BONUS") {
      bonusPoints += promo.value;
    }
  }

  // =========================
  // 5. FINAL PRICE
  // =========================
  let finalPrice = baseTotal - discount;

  if (finalPrice < 0) finalPrice = 0;

  // =========================
  // 6. RETURN STRUCTURE
  // =========================
  return {
    baseTotal,
    discount,
    finalPrice,
    bonusPoints
  };
};