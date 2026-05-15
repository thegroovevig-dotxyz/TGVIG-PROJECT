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
      ref: "Club"
    },

    // 🔗 SERVICE REFERENCES
    rideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride"
    },

    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking"
    },

    parkingSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingSession"
    },

    // 🧾 TRANSACTION TYPE
    type: {
      type: String,
      enum: [
        "PURCHASE",
        "TOPUP",
        "REDEEM",
        "RIDE",
        "BOOKING",
        "PARKING",
        "PAYOUT",
        "REFUND"
      ],
      required: true
    },

    // 💰 MONEY
    amount: {
      type: Number,
      required: true
    },

    // 💳 PAYMENT METHOD
    method: {
      type: String,
      enum: [
        "CASH",
        "WALLET",
        "POINTS",
        "CARD",
        "EFT",
        "ONLINE"
      ],
      required: true
    },

    // 🖥️ SOURCE
    source: {
      type: String,
      enum: [
        "WEBSITE",
        "MOBILE-APP",
        "POS",
        "MINI_POS",
        "SELF_POS",
        "ADMIN"
      ],
      default: "WEB"
    },

    // 🍔 ITEMS
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

    // 💸 PLATFORM SPLITS
    platformFee: {
      type: Number,
      default: 0
    },

    partnerPayout: {
      type: Number,
      default: 0
    },

    payoutStatus: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING"
    },

    // 🔐 PAYMENT REFERENCE
    reference: {
      type: String,
      unique: true
    },

    paymentGatewayRef: String,

    // 🎉 PROMOTION
    promotionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Promotion"
    },

    // 📍 STATUS
    status: {
      type: String,
      enum: [
        "PENDING",
        "SUCCESS",
        "FAILED",
        "CANCELLED",
        "REFUNDED"
      ],
      default: "PENDING"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);