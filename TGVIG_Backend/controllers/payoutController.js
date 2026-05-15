const Transaction = require("../models/Transaction");
const Driver = require("../models/Driver");
const Partner = require("../models/Partner");

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
    res.status(500).json({
      message: err.message
    });
  }
};


// 💸 MARK PAYOUT AS PAID
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
      message: "Payout marked as paid"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// 📊 GET ALL PAYOUTS (ADMIN)
exports.getAllPayouts = async (req, res) => {
  try {

    const payouts =
      await payoutService.calculatePayouts();

    res.json({
      success: true,
      payouts
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// 📊 GET MY PAYOUTS (DRIVER / PARTNER)
exports.getMyPayouts = async (req, res) => {
  try {

    const userId = req.user._id;
    const role = req.user.role;

    const result =
      await payoutService.getPayoutSummary({
        userId,
        role
      });

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// 💸 MARK PAID (ADMIN ONLY)
exports.markPaid = async (req, res) => {
  try {

    const { transactionId } = req.body;

    const tx =
      await payoutService.markAsPaid({
        transactionId
      });

    res.json({
      success: true,
      tx
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};