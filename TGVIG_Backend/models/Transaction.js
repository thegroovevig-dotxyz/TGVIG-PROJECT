const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    // 👤 WHO
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true
    },

    // 🏢 WHERE
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true
    },

    // 🧾 WHAT TYPE
    type: {
      type: String,
      enum: ["PURCHASE", "TOPUP", "REDEEM"],
      required: true
    },

    // 💰 MONEY
    amount: {
      type: Number,
      required: true
    },

    method: {
      type: String,
      enum: ["CASH", "WALLET", "POINTS"],
      required: true
    },

    // 🍔 ITEMS (FOR PURCHASES)
    items: [
      {
        name: String,
        priceCash: Number,
        pricePoints: Number,
        quantity: Number
      }
    ],

    // 🎯 LOYALTY
    pointsEarned: {
      type: Number,
      default: 0
    },

    reference: {
    type: String,
    unique: true   // 🔐 prevents duplicate payments
  },

    // 🎉 PROMOTION LINK
    promotionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Promotion"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);