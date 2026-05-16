const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  },

  name: String,

  location: {
    address: String,
    lat: Number,
    lng: Number
  },

  totalSpots: Number,
  availableSpots: Number,

  pricePerHour: Number,

  services: {
    carWash: Boolean,
    valet: Boolean
  },

  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE"
  }

}, { timestamps: true });

module.exports = mongoose.model("Parking", parkingSchema);