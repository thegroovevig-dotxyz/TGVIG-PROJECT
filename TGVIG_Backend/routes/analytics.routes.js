const express = require("express");
const router = express.Router();

const Transaction = require("../models/Transaction");
const Member = require("../models/Member");

//
// 💰 TOTAL SALES
//
router.get("/sales", async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.json({ total: result[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//
// 💳 TOTAL WALLET BALANCE
//
router.get("/wallet", async (req, res) => {
  try {
    const result = await Member.aggregate([
      { $group: { _id: null, total: { $sum: "$wallet" } } }
    ]);

    res.json({ total: result[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;