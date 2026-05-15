const Transaction = require("../models/Transaction");
const Driver = require("../models/Driver");
const Partner = require("../models/Partner");


// 💸 CALCULATE DRIVER / PARTNER PAYOUTS
exports.calculatePayouts = async () => {
  try {

    const payouts = await Transaction.find({
      status: "SUCCESS",
      payoutStatus: "PENDING"
    });

    return payouts;

  } catch (err) {
    throw new Error(err.message);
  }
};


// 💸 GET SINGLE PAYOUT SUMMARY
exports.getPayoutSummary = async ({ userId, role }) => {
  try {

    let query = {
      status: "SUCCESS",
      payoutStatus: "PENDING"
    };

    if (role === "DRIVER") {
      query.driverId = userId;
    }

    if (role === "PARTNER") {
      query.partnerId = userId;
    }

    const payouts = await Transaction.find(query);

    const total = payouts.reduce(
      (sum, tx) => sum + (tx.partnerPayout || 0),
      0
    );

    return {
      total,
      count: payouts.length,
      payouts
    };

  } catch (err) {
    throw new Error(err.message);
  }
};


// 💸 MARK PAYOUT AS PAID
exports.markAsPaid = async ({ transactionId }) => {
  try {

    const tx = await Transaction.findById(transactionId);

    if (!tx) {
      throw new Error("Transaction not found");
    }

    tx.payoutStatus = "PAID";
    tx.paidAt = new Date();

    await tx.save();

    return tx;

  } catch (err) {
    throw new Error(err.message);
  }
};