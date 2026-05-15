const router = require("express").Router();
const ctrl = require("../controllers/parkingController");
const auth = require("../middleware/auth");

// 🅿️ START PARKING
router.post("/start", auth, ctrl.startParking);

// 🅿️ END PARKING + PAY
router.post("/end", auth, ctrl.endParking);

// 📋 MY SESSIONS
router.get("/my", auth, ctrl.getMyParking);

module.exports = router;