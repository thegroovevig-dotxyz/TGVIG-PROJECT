const Booking = require("../models/Booking");
const ParkingSession = require("../models/ParkingSession");

// ==========================================
// VALIDATE QR
// ==========================================
exports.VALIDATE_QR = async (req, res) => {
  try {
    const { qrToken, type } = req.body;
    const allBookings = await Booking.find();

console.log("ALL BOOKINGS:", allBookings);
console.log("TOKEN RECEIVED:", qrToken);

    if (!qrToken || !type) {
      return res.status(400).json({
        success: false,
        message: "Missing qrToken or type",
      });
    }

    let record = null;

    // ================= PROPERTY =================
    if (type === "PROPERTY") {

      record = await Booking.findOne({ qrToken });

      if (!record) {
        return res.status(404).json({
          success: false,
          message: "BOOKING NOT FOUND",
        });
      }

      if (record.status === "COMPLETED") {
        return res.status(400).json({
          success: false,
          message: "Already completed booking",
        });
      }
    }

    // ================= PARKING =================
    if (type === "PARKING") {

      record = await ParkingSession.findOne({ qrToken });

      if (!record) {
        return res.status(404).json({
          success: false,
          message: "PARKING SESSION NOT FOUND",
        });
      }

      if (record.status === "COMPLETED") {
        return res.status(400).json({
          success: false,
          message: "Already completed session",
        });
      }
    }

    return res.json({
      success: true,
      type,
      record,
    });

  } catch (err) {

    console.log("VALIDATE_QR ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================================
// CHECK IN
// ==========================================
exports.CHECK_IN = async (req, res) => {
  try {

    const { qrToken, type } = req.body;

    let record = null;

    // ================= PROPERTY =================
    if (type === "PROPERTY") {

      record = await Booking.findOne({ qrToken });

      if (!record) {
        return res.status(404).json({
          success: false,
          message: "BOOKING NOT FOUND",
        });
      }

      record.status = "CHECKED_IN";
      record.checkIn = new Date();
    }

    // ================= PARKING =================
    if (type === "PARKING") {

      record = await ParkingSession.findOne({ qrToken });

      if (!record) {
        return res.status(404).json({
          success: false,
          message: "PARKING SESSION NOT FOUND",
        });
      }

      record.status = "ACTIVE";
      record.startTime = new Date();
    }

    await record.save();

    return res.json({
      success: true,
      record,
    });

  } catch (err) {

    console.log("CHECK_IN ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================================
// CHECK OUT
// ==========================================
exports.CHECK_OUT = async (req, res) => {
  try {

    const { qrToken, type } = req.body;

    let record = null;

    // ================= PROPERTY =================
    if (type === "PROPERTY") {

      record = await Booking.findOne({ qrToken });

      if (!record) {
        return res.status(404).json({
          success: false,
          message: "BOOKING NOT FOUND",
        });
      }

      record.status = "COMPLETED";
      record.checkOut = new Date();
    }

    // ================= PARKING =================
    if (type === "PARKING") {

      record = await ParkingSession.findOne({ qrToken });

      if (!record) {
        return res.status(404).json({
          success: false,
          message: "PARKING SESSION NOT FOUND",
        });
      }

      record.status = "COMPLETED";
      record.endTime = new Date();
    }

    await record.save();

    return res.json({
      success: true,
      record,
    });

  } catch (err) {

    console.log("CHECK_OUT ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};