const router = require("express").Router();
const ctrl = require("../controllers/checkoutController");

router.post("/", ctrl.checkout);

module.exports = router;