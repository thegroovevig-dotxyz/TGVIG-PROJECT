const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },

  licenseNumber: String,
  licenseExpiry: Date,

  vehicle: {
    make: String,
    model: String,
    year: Number,
    color: String,
    plateNumber: String
  },

  documents: {
    license: String,
    idDocument: String,
    vehicleRegistration: String
  },

  isOnline: { type: Boolean, default: false },

  currentLocation: {
    lat: Number,
    lng: Number
  },

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED", "SUSPENDED"],
    default: "PENDING"
  },

  rating: { type: Number, default: 5 },

  totalTrips: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Driver", driverSchema);