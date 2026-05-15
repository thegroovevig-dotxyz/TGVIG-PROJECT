const router = require("express").Router();
const ctrl = require("../controllers/bookingController");
const auth = require("../middleware/auth");

// 🏨 CREATE BOOKING
router.post("/create", auth, ctrl.createBooking);

// 💳 PAY BOOKING
router.post("/pay", auth, ctrl.payBooking);

// 📋 MY BOOKINGS
router.get("/my", auth, ctrl.getMyBookings);

module.exports = router;