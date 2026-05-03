const Member = require("../models/Member");
const Transaction = require("../models/Transaction");
const axios = require("axios");
const { sendNotification } = require("../services/notificationService");

// 💳 TOP UP
const topUp = async (req, res) => {
  try {
    const { memberId, amount } = req.body;

    const reference = `TGVIG-${Date.now()}`;

    res.json({
      success: true,
      reference
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔔 WEBHOOK
const webhook = async (req, res) => {
  try {
    const { memberId, amount, status, reference } = req.body;

    if (status !== "SUCCESS") {
      return res.status(200).json({ message: "ignored" });
    }

    const existing = await Transaction.findOne({ reference });

    if (existing) {
      return res.status(200).json({ message: "duplicate" });
    }

    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({ message: "not found" });
    }

    member.walletBalance += Number(amount);
    await member.save();

    await Transaction.create({
      memberId,
      type: "TOPUP",
      amount,
      method: "PEACH",
      reference
    });

    await sendNotification("topup", member, {
      membershipNo,
  amount,
  pointsEarned: member.pointsEarned,
      walletBalance: member.walletBalance,
      pointsBalance: member.pointsBalance,
});

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 IMPORTANT EXPORT (THIS FIXES YOUR ERROR)
module.exports = {
  topUp,
  webhook
};