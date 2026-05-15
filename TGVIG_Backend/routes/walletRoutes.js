const router = require("express").Router();
const ctrl = require("../controllers/walletController");
const auth = require("../middleware/auth");

// 💰 GET BALANCE
router.get("/balance", auth, ctrl.getBalance);

// 💰 INTERNAL TOPUP (ADMIN OR CASH ONLY)
router.post("/credit", auth, ctrl.creditWallet);

// 💰 DEBIT (ALL PAYMENTS INSIDE SYSTEM)
router.post("/debit", auth, ctrl.debitWallet);


module.exports = router;