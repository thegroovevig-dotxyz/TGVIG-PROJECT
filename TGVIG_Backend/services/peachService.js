const axios = require("axios");
const Member = require("../models/Member");
const Transaction = require("../models/Transaction");

// 🧠 CREATE PAYMENT REQUEST (INITIATE TOPUP)
exports.createPayment = async ({ memberId, amount }) => {
  const paymentRequest = {
    amount: amount,
    currency: "ZAR",
    merchantReference: `TGVIG-${Date.now()}`,
    callbackUrl: "http://localhost:5000/api/wallet/webhook",
  };

  // 👉 CALL PEACH API (FAKE STRUCTURE HERE)
  const response = await axios.post(
    "https://test.oppwa.com/v1/payments",
    paymentRequest,
    {
      headers: {
        Authorization: "Bearer YOUR_PEACH_TOKEN"
      }
    }
  );

  return response.data;
};