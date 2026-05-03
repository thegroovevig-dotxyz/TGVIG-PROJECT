const Transaction = require("../models/Transaction");

// GET all transactions (admin)
exports.getTransactions = async (req, res) => {
  const data = await Transaction.find()
    .populate("memberId clubId promotionId")
    .sort({ createdAt: -1 });

  res.json(data);
};

// GET member transactions
exports.getMemberTransactions = async (req, res) => {
  const data = await Transaction.find({
    memberId: req.params.memberId
  });

  res.json(data);
};

exports.updateTransactionStatus = async (req, res) => {
  const tx = await Transaction.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(tx);
};