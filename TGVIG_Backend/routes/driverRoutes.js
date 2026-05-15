const router = require("express").Router();
const ctrl = require("../controllers/driverController");
const auth = require("../middleware/auth");

// 🚗 REGISTER DRIVER
router.post("/register", auth, ctrl.registerDriver);

// 🚗 UPDATE STATUS (ONLINE/OFFLINE)
router.patch("/status", auth, ctrl.updateStatus);

// 🚗 PROFILE
router.get("/me", auth, ctrl.getMyProfile);

// 🚗 ALL DRIVERS (ADMIN VIEW OPTIONAL)
router.get("/", auth, ctrl.getDrivers);

module.exports = router;