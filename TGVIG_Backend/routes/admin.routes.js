const express = require("express");
const router = express.Router();

const Member = require("../models/Member");
const Transaction = require("../models/Transaction");

router.get("/stats", async (req, res) => {
  try {
    const members = await Member.countDocuments();
    const transactions = await Transaction.countDocuments();

    const revenueData = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const revenue = revenueData[0]?.total || 0;

    res.json({
      members,
      transactions,
      revenue,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;