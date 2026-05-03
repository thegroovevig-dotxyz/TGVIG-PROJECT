const Member = require("../models/Member");
const Transaction = require("../models/Transaction");

// 🔔 PEACH WEBHOOK (NO AUTH - BUT SECURED LOGIC)
exports.peachWebhook = async (req, res) => {
  try {
    const {
      memberId,
      amount,
      status,
      reference
    } = req.body;

    // =========================
    // 1. VERIFY PAYMENT SUCCESS
    // =========================
    if (status !== "SUCCESS") {
      return res.status(200).json({ message: "Payment ignored" });
    }

    // =========================
    // 2. CHECK DUPLICATE TRANSACTION
    // =========================
    const existing = await Transaction.findOne({ reference });

    if (existing) {
      return res.status(200).json({ message: "Duplicate ignored" });
    }

    // =========================
    // 3. FIND MEMBER
    // =========================
    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // =========================
    // 4. UPDATE WALLET SAFELY
    // =========================
    member.walletBalance += Number(amount);
    await member.save();

    // =========================
    // 5. CREATE TRANSACTION
    // =========================
    await Transaction.create({
      memberId,
      type: "TOPUP",
      amount,
      method: "PEACH",
      reference
    });

    res.status(200).json({ success: true });

  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ message: "Webhook failed" });
  }
};