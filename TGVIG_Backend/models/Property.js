const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  },

  type: {
    type: String,
    enum: ["HOTEL", "GUESTHOUSE", "LODGE", "RESORT"]
  },

  name: String,

  location: {
    address: String,
    lat: Number,
    lng: Number
  },

  rooms: {
    total: Number,
    available: Number
  },

  pricePerNight: Number,

  amenities: [String],

  images: [String],

  status: {
    type: String,
    enum: ["PENDING", "ACTIVE", "SUSPENDED"],
    default: "PENDING"
  }

}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);