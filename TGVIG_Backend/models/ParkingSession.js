const mongoose = require("mongoose");

const parkingSessionSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  },

  parkingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parking"
  },

  vehiclePlate: String,

  startTime: Date,
  endTime: Date,

  totalCost: Number,

  status: {
    type: String,
    enum: ["ACTIVE", "COMPLETED", "CANCELLED"],
    default: "ACTIVE"
  }

}, { timestamps: true });

module.exports = mongoose.model("ParkingSession", parkingSessionSchema);