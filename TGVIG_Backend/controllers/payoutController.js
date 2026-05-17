const Transaction = require("../models/Transaction");

// 💸 GET PENDING PAYOUTS
exports.getPendingPayouts = async (req, res) => {
  try {

    const payouts = await Transaction.find({
      status: "SUCCESS",
      partnerPayout: { $gt: 0 },
      payoutStatus: "PENDING"
    });

    res.json({
      success: true,
      payouts
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }
};


// 📊 GET ALL PAYOUTS
exports.getAllPayouts = async (req, res) => {
  try {

    const payouts = await Transaction.find();

    res.json({
      success: true,
      payouts
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }
};


// 📊 GET MY PAYOUTS
exports.getMyPayouts = async (req, res) => {
  try {

    const userId = req.user._id;

    const payouts = await Transaction.find({
      $or: [
        { driverId: userId },
        { partnerId: userId }
      ]
    });

    res.json({
      success: true,
      payouts
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }
};


// 💸 MARK PAID
exports.markPaid = async (req, res) => {
  try {

    const { transactionId } = req.body;

    const tx = await Transaction.findById(transactionId);

    if (!tx) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    tx.payoutStatus = "PAID";

    await tx.save();

    res.json({
      success: true,
      tx
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }
};