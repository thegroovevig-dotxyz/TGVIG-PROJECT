const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  },

  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  },

  checkIn: Date,
  checkOut: Date,

  guests: Number,

  totalPrice: Number,

  status: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "CHECKED_IN", "COMPLETED", "CANCELLED"],
    default: "PENDING"
  },

  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID", "FAILED"],
    default: "PENDING"
  }

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);