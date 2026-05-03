const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema(
  {
    // 🏢 RELATION
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true
    },

    // 🏷️ BASIC INFO
    title: String,
    description: String,
    image: String,
banner: String,
items: ["Burger", "Beer Bucket", "Vodka Special"],
    type: {
      type: [String],
      default: [],
      enum: ["RUSH_HOUR", "EVENT"],
      required: true
    },

    // 💰 DISCOUNT / REWARD
    discountType: {
      type: String,
      enum: ["PERCENT", "FIXED", "POINTS_BONUS"]
    },

    value: Number, // e.g. 10 (%) or 50 (currency/points)

    // ⏱️ TIME CONTROL
    startTime: Date,
    endTime: Date,

    // 🎟️ EVENT SPECIFIC
    eventDate: Date, // used if type = EVENT

    // 📊 STATUS
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Promotion", promotionSchema);