const router = require("express").Router();
const ctrl = require("../controllers/promotionController");

router.post("/", ctrl.createPromotion);
router.get("/", ctrl.getPromotions);

module.exports = router;