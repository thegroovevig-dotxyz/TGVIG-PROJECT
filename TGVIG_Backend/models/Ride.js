const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  },

  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver"
  },

  pickup: {
    address: String,
    lat: Number,
    lng: Number
  },

  dropoff: {
    address: String,
    lat: Number,
    lng: Number
  },

  status: {
    type: String,
    enum: [
      "REQUESTED",
      "ACCEPTED",
      "ARRIVED",
      "STARTED",
      "COMPLETED",
      "CANCELLED"
    ],
    default: "REQUESTED"
  },

  price: Number,

  distanceKm: Number,

  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID", "FAILED"],
    default: "PENDING"
  }

}, { timestamps: true });

module.exports = mongoose.model("Ride", rideSchema);