const router = require("express").Router();
const ctrl = require("../controllers/rideController");
const auth = require("../middleware/auth");

// 🚕 REQUEST RIDE
router.post("/request", auth, ctrl.requestRide);

// 💳 PAY RIDE
router.post("/pay", auth, ctrl.payRide);

// 📋 MY RIDES
router.get("/my", auth, ctrl.getMyRides);

module.exports = router;