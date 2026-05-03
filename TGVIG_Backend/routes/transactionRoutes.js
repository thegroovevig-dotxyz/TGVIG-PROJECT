const router = require("express").Router();
const ctrl = require("../controllers/transactionController");

router.get("/", ctrl.getTransactions);
router.get("/:memberId", ctrl.getMemberTransactions);

module.exports = router;