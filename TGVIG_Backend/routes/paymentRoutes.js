const router = require("express").Router();
const ctrl = require("../controllers/paymentController");
const auth = require("../middleware/auth");

// 💳 INITIATE PEACH TOPUP
router.post("/topup", auth, ctrl.topUp);

// 🔔 PEACH WEBHOOK (PUBLIC)
router.post("/webhook/peach", ctrl.peachWebhook);

module.exports = router;