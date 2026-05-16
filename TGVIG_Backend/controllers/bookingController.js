const Booking = require("../models/Booking");
const transactionService = require("../services/transactionService");

// 🏨 CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {

    const memberId = req.user._id;

    const {
      propertyId,
      checkIn,
      checkOut,
      guests,
      totalPrice
    } = req.body;

    const booking = await Booking.create({
      memberId,
      propertyId,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      status: "PENDING"
    });

    res.json({
      success: true,
      booking
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// 💳 PAY BOOKING
exports.payBooking = async (req, res) => {
  try {

    const memberId = req.user._id;
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    const result =
      await transactionService.processTransaction({
        memberId,
        amount: booking.totalPrice,
        type: "BOOKING",
        method: "WALLET",
        bookingId
      });

    booking.status = "CONFIRMED";
    booking.paymentStatus = "PAID";

    await booking.save();

    res.json({
      success: true,
      result
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    res.json([]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};