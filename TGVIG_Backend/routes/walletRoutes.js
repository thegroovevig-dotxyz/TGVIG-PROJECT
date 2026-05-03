const router = require("express").Router();
const ctrl = require("../controllers/walletController");

router.post("/topup", ctrl.topUp);
router.post("/webhook", ctrl.webhook);

module.exports = router;