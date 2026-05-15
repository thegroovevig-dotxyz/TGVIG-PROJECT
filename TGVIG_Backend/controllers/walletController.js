const Member = require("../models/Member");
const Transaction = require("../models/Transaction");



// 💰 GET MEMBER WALLET BALANCE
exports.getBalance = async (req, res) => {

  try {

    const member = await Member.findById(
      req.user.id
    );

    if (!member) {
      return res.status(404).json({
        message: "Member not found"
      });
    }

    res.json({
      walletBalance: member.walletBalance,
      pointsBalance: member.pointsBalance
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Failed to get balance"
    });
  }
};



// 💰 CREDIT WALLET
exports.creditWallet = async (req, res) => {

  try {

    const {
      memberId,
      amount,
      clubId
    } = req.body;

    const member =
      await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        message: "Member not found"
      });
    }

    member.walletBalance += Number(amount);

    await member.save();



    // 🧾 TRANSACTION LOG
    const transaction =
      await Transaction.create({

        memberId,
        clubId,

        type: "TOPUP",

        amount,

        method: "CASH",

        reference:
          "CRD-" + Date.now()
      });



    res.json({
      success: true,
      member,
      transaction
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Wallet credit failed"
    });
  }
};



// 💰 DEBIT WALLET
exports.debitWallet = async (req, res) => {

  try {

    const {
      memberId,
      amount,
      clubId,
      items = []
    } = req.body;



    const member =
      await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        message: "Member not found"
      });
    }



    // 🚫 INSUFFICIENT BALANCE
    if (
      member.walletBalance <
      Number(amount)
    ) {
      return res.status(400).json({
        message:
          "Insufficient wallet balance"
      });
    }



    // 💸 SUBTRACT
    member.walletBalance -= Number(amount);

    await member.save();



    // 🧾 TRANSACTION
    const transaction =
      await Transaction.create({

        memberId,
        clubId,

        type: "PURCHASE",

        amount,

        method: "WALLET",

        items,

        reference:
          "DBT-" + Date.now()
      });



    res.json({
      success: true,
      member,
      transaction
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Wallet debit failed"
    });
  }
};