const router = require("express").Router();
const ctrl = require("../controllers/paymentController");

// 💳 INITIATE PAYMENT (protected)
router.post("/topup", require("../middleware/auth"), ctrl.topUp);

// 🔔 WEBHOOK (PUBLIC - NO AUTH)
router.post("/webhook/peach", ctrl.peachWebhook);

module.exports = router;