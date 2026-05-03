const router = require("express").Router();
const ctrl = require("../controllers/couponController");

router.post("/", ctrl.createCoupon);
router.get("/", ctrl.getCoupons);
router.delete("/:id", ctrl.deleteCoupon);

module.exports = router;