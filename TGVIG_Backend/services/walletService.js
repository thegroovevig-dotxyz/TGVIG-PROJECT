const Member = require("../models/Member");
const Transaction = require("../models/Transaction");

// 🔻 DEBIT WALLET (POS PURCHASE)
exports.debitWallet = async ({ memberId, amount, clubId, items = [] }) => {
  const member = await Member.findById(memberId);

  if (!member) throw new Error("Member not found");

  if (member.walletBalance < amount) {
    throw new Error("Insufficient wallet balance");
  }

  member.walletBalance -= amount;
  await member.save();

  const transaction = await Transaction.create({
    memberId,
    clubId,
    type: "PURCHASE",
    amount,
    method: "WALLET",
    items,
    reference: "TXN-" + Date.now()
  });

  return { member, transaction };
};

// 🔺 TOPUP WALLET
exports.topupWallet = async ({ memberId, amount, clubId }) => {
  const member = await Member.findById(memberId);

  if (!member) throw new Error("Member not found");

  member.walletBalance += amount;
  await member.save();

  const transaction = await Transaction.create({
    memberId,
    clubId,
    type: "TOPUP",
    amount,
    method: "CASH",
    reference: "TOP-" + Date.now()
  });

  return { member, transaction };
};

// 🎁 REDEEM POINTS
exports.redeemPoints = async ({ memberId, points, clubId }) => {
  const member = await Member.findById(memberId);

  if (!member) throw new Error("Member not found");

  if (member.pointsBalance < points) {
    throw new Error("Insufficient points");
  }

  member.pointsBalance -= points;
  await member.save();

  const transaction = await Transaction.create({
    memberId,
    clubId,
    type: "REDEEM",
    amount: 0,
    method: "POINTS",
    pointsEarned: -points,
    reference: "RDM-" + Date.now()
  });

  return { member, transaction };
};