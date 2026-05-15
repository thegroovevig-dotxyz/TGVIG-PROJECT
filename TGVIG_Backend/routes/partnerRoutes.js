const router = require("express").Router();
const ctrl = require("../controllers/partnerController");
const auth = require("../middleware/auth");

// 🤝 REGISTER PARTNER
router.post("/register", auth, ctrl.registerPartner);

// 🤝 MY PROFILE
router.get("/me", auth, ctrl.getMyPartner);

// 🤝 UPDATE BUSINESS
router.put("/update", auth, ctrl.updatePartner);

module.exports = router;