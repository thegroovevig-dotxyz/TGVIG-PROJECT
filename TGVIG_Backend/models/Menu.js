const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },

  name: String,

  type: {
    type: String,
    enum: ["REGULAR", "SPECIAL"],
    default: "REGULAR",
  },

  price: {
    single: { type: Number, default: 0 },
    x4: { type: Number, default: 0 },
    x6: { type: Number, default: 0 },
  },

  rewards: {
    points: { type: Number, default: 0 },
    itemReward: { type: String, default: "" },
    discount: { type: Number, default: 0 },
  },
  tier: {
  type: String,
  enum: ["GOLD", "SILVER", "BLACK"],
  default: "GOLD",
},

assignedDevices: [
  {
    type: {
      type: String,
      enum: ["POS", "SELF_POS", "WEB"],
    },
    deviceId: String,
  },
],

  image: String,

  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Menu", menuSchema);