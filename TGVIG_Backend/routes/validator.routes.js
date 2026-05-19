const router = require("express").Router();

const ctrl = require("../controllers/validator.controller");

router.post("/VALIDATE-QR", ctrl.VALIDATE_QR);
router.post("/CHECK-IN", ctrl.CHECK_IN);
router.post("/CHECK-OUT", ctrl.CHECK_OUT);

module.exports = router;