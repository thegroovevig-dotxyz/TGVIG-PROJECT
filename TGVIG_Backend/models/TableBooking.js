const mongoose = require("mongoose");

const tableBookingSchema = new mongoose.Schema(
  {
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },

    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },

    tier: {
      type: String,
      enum: ["STANDARD", "VIP", "VVIP"],
      required: true,
    },

    numberOfTables: {
      type: Number,
      required: true,
    },

    pricePerTable: Number,

    totalAmount: Number,

    paymentMethod: {
      type: String,
      enum: ["WALLET"],
      default: "WALLET",
    },

    totalTables: {
      type: Number,
      default: 0,
    },

    soldTables: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
    },

    couponCode: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("TableBooking", tableBookingSchema);