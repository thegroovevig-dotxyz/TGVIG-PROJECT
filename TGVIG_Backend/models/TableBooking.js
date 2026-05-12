const mongoose = require("mongoose");

const tableInventorySchema = new mongoose.Schema(
  {
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },

    tier: {
      type: String,
      enum: ["STANDARD", "VIP", "VVIP"],
      required: true,
    },

    totalTables: {
      type: Number,
      required: true,
    },

    soldTables: {
      type: Number,
      default: 0,
    },

    tables: [
  {
    number: Number
  }
],

    pricePerTable: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TableInventory", tableInventorySchema);