const Member = require("../models/Member");
const Transaction = require("../models/Transaction");

const POINT_RATE = 10; // R10 = 1 point
const POINT_VALUE = 1;  // 1 point = R1

// 🧠 MAIN ENTRY: CALL AFTER EVERY PURCHASE / TOPUP
exports.processLoyalty = async ({
  memberId,
  amount = 0,
  method = "CASH", // CASH | WALLET | POINTS
  type = "PURCHASE", // PURCHASE | TOPUP | REDEEM
  promotion = null
}) => {

  const member = await Member.findById(memberId);
  if (!member) throw new Error("Member not found");

  const now = new Date();
  const monthKey = `${now.getFullYear()}-${now.getMonth()}`;

  // =========================
  // 1. MONTHLY RESET CHECK
  // =========================
  if (member.lastResetMonth !== monthKey) {
    member.monthlySpent = 0;
    member.lastResetMonth = monthKey;
  }

  // =========================
  // 2. WALLET LOGIC
  // =========================
  if (method === "WALLET") {
    if (member.walletBalance < amount) {
      throw new Error("Insufficient wallet balance");
    }
    member.walletBalance -= amount;
  }

  // =========================
  // 3. POINTS CALCULATION
  // =========================
  let pointsEarned = 0;
  let pointsSpent = 0;

  if (type === "PURCHASE") {
    pointsEarned = Math.floor(amount / POINT_RATE);
    member.pointsBalance += pointsEarned;
  }

  if (method === "POINTS") {
    pointsSpent = Math.floor(amount / POINT_VALUE);
    if (member.pointsBalance < pointsSpent) {
      throw new Error("Insufficient points");
    }
    member.pointsBalance -= pointsSpent;
  }

  // =========================
  // 4. MONTHLY SPEND TRACKING
  // =========================
  if (type === "PURCHASE") {
    member.monthlySpent += amount;
    member.lifetimeSpend = (member.lifetimeSpend || 0) + amount;
  }

  // =========================
  // 5. MONTHLY UNLOCK RULE
  // =========================
  const UNLOCK_THRESHOLD = 750;

  member.isUnlocked = member.monthlySpent >= UNLOCK_THRESHOLD;

  // =========================
  // 6. TIER SYSTEM
  // =========================
  const spend = member.lifetimeSpend;

  if (spend >= 10000) {
    member.tier = "BLACK";
  } else if (spend >= 3000) {
    member.tier = "DIAMOND";
  } else if (spend >= 750) {
    member.tier = "PLATINUM";
  } else {
    member.tier = "GOLD";
  }

  // =========================
  // 7. PROMOTION HOOK (OPTIONAL)
  // =========================
  if (promotion?.type === "POINTS_BONUS") {
    member.pointsBalance += promotion.value;
    pointsEarned += promotion.value;
  }

  // =========================
  // 8. SAVE MEMBER
  // =========================
  await member.save();

  // =========================
  // 9. CREATE TRANSACTION (SOURCE OF TRUTH)
  // =========================
  const transaction = await Transaction.create({
    memberId,
    amount,
    method,
    type,
    pointsEarned,
    promotionId: promotion?._id || null,
    createdAt: now
  });

  return {
    member,
    transaction,
    pointsEarned,
    pointsSpent
  };
};