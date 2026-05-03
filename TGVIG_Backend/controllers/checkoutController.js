const pricingEngine = require("../services/pricingEngine");
const loyaltyEngine = require("../services/loyaltyEngine");
const Transaction = require("../models/Transaction");
const Promotion = require("../models/Promotion");
const Menu = require("../models/Menu");
const QRCode = require("qrcode");
const { sendNotification } = require("../services/notificationService");

// 🧠 MAIN CHECKOUT FUNCTION
exports.checkout = async (req, res) => {
  try {
    const {
      memberId,
      clubId,
      menuId,
      items,
      method, // CASH | WALLET | POINTS
      promotionId
    } = req.body;

    // =========================
    // 1. GET PROMOTION (optional)
    // =========================
    let promotion = null;

    if (promotionId) {
      promotion = await Promotion.findById(promotionId);
    }

    // =========================
    // 2. CALCULATE PRICE
    // =========================
    const priceData = await pricingEngine.calculatePrice({
      menuId,
      items,
      clubId
    });

    const finalPrice = priceData.finalPrice;

    // =========================
    // 3. APPLY PAYMENT METHOD
    // =========================
    let paymentAmount = finalPrice;

    if (method === "POINTS") {
      paymentAmount = finalPrice; // points handled in loyalty engine
    }

    // =========================
    // 4. LOYALTY ENGINE (wallet + points)
    // =========================
    const loyaltyResult = await loyaltyEngine.processLoyalty({
      memberId,
      amount: paymentAmount,
      method,
      type: "PURCHASE",
      promotion
    });

    // =========================
    // 5. CREATE TRANSACTION
    // =========================
    const transaction = await Transaction.create({
      memberId,
      clubId,
      type: "PURCHASE",
      amount: finalPrice,
      method,
      items,
      pointsEarned: loyaltyResult.pointsEarned,
      promotionId: promotion?._id || null
    });

    // =========================
    // 6. RESPONSE
    // =========================
    res.json({
      success: true,
      finalPrice,
      pointsEarned: loyaltyResult.pointsEarned,
      walletBalance: loyaltyResult.member.walletBalance,
      pointsBalance: loyaltyResult.member.pointsBalance,
      transaction
    });

    const qr = await QRCode.toDataURL("COUPON-" + Date.now());

    await sendNotification("purchase", "coupon", member, {
  finalPrice,
      pointsEarned: loyaltyResult.pointsEarned,
      walletBalance: loyaltyResult.member.walletBalance,
      pointsBalance: loyaltyResult.member.pointsBalance,
      rewardsEarned: loyaltyResult.member.rewardsEarned,
      transaction,
      status: "CONFIRMED",
      couponCode: `PURCHASE-${Date.now()}`,
      qr,
      code: coupon.code,
  expiry: coupon.expiryDate,
});

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};