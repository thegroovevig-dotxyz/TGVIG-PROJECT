const axios = require("axios");

const Member = require("../models/Member");
const Transaction = require("../models/Transaction");



// 💳 INITIATE PEACH PAYMENT
exports.topUp = async (req, res) => {

  try {

    const {
      amount
    } = req.body;



    // 🔐 MEMBER FROM AUTH
    const memberId = req.user.id;



    // 🔎 FIND MEMBER
    const member =
      await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        message: "Member not found"
      });
    }



    // 🧾 UNIQUE REFERENCE
    const reference =
      "TOPUP-" + Date.now();



    // 💳 PEACH PAYMENT REQUEST
    const paymentData = {

      amount,

      currency: "ZAR",

      merchantReference: reference,

      customer: {
        email: member.email
      },

      callbackUrl:
        "http://localhost:5000/api/payments/webhook/peach"
    };



    // 🚀 SEND TO PEACH
    const response = await axios.post(

      "https://test.oppwa.com/v1/payments",

      paymentData,

      {
        headers: {
          Authorization:
            `Bearer ${process.env.PEACH_TOKEN}`
        }
      }
    );



    res.json({
      success: true,
      payment: response.data,
      reference
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Payment initiation failed"
    });
  }
};



// 🔔 PEACH WEBHOOK
exports.peachWebhook = async (req, res) => {

  try {

    const {
      memberId,
      amount,
      status,
      reference
    } = req.body;



    // 🚫 IGNORE FAILED PAYMENTS
    if (status !== "SUCCESS") {

      return res.status(200).json({
        message: "Ignored"
      });
    }



    // 🚫 DUPLICATE CHECK
    const existing =
      await Transaction.findOne({
        reference
      });

    if (existing) {

      return res.status(200).json({
        message: "Duplicate ignored"
      });
    }



    // 👤 FIND MEMBER
    const member =
      await Member.findById(memberId);

    if (!member) {

      return res.status(404).json({
        message: "Member not found"
      });
    }



    // 💰 CREDIT WALLET
    member.walletBalance +=
      Number(amount);

    await member.save();



    // 🧾 TRANSACTION LOG
    await Transaction.create({

      memberId,

      type: "TOPUP",

      amount,

      method: "PEACH",

      reference
    });



    res.json({
      success: true
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Webhook failed"
    });
  }
};