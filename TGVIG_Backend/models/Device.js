const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    name: String,
    type: String, // POS / SELFPOS / MINIPOS
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true
    },

 assignedStaffId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Member",
},


    status: {
      type: String,
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);