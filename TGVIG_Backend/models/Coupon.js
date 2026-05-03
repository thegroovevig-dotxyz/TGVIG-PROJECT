const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: String,
    title: String,
    description: String,

    discountType: {
      type: String,
      enum: ["PERCENT", "FIXED", "FREE_ITEM"],
    },

    value: Number,

    expiryDate: Date,

    usageLimit: { type: Number, default: 1 },
    usedCount: { type: Number, default: 0 },

    active: { type: Boolean, default: true },

    qrCode: String, // generated
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);