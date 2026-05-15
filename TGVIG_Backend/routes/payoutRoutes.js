const router = require("express").Router();
const ctrl = require("../controllers/payoutController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// 📊 ALL PAYOUTS (ADMIN)
router.get("/all", auth, admin, ctrl.getAllPayouts);

// 📊 MY PAYOUTS
router.get("/me", auth, ctrl.getMyPayouts);

// 💸 MARK AS PAID
router.post("/mark-paid", auth, admin, ctrl.markPaid);

module.exports = router;