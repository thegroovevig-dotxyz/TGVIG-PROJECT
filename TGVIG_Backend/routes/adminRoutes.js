const router = require("express").Router();
const ctrl = require("../controllers/adminController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


// 🚗 DRIVER APPROVAL
router.post("/driver/approve", auth, admin, ctrl.approveDriver);
router.post("/driver/reject", auth, admin, ctrl.rejectDriver);


// 🏨 PROPERTY APPROVAL
router.post("/property/approve", auth, admin, ctrl.approveProperty);
router.post("/property/reject", auth, admin, ctrl.rejectProperty);


// 🤝 PARTNER APPROVAL
router.post("/partner/approve", auth, admin, ctrl.approvePartner);
router.post("/partner/reject", auth, admin, ctrl.rejectPartner);


// 📊 DASHBOARD SUMMARY
router.get("/summary", auth, admin, ctrl.getSystemSummary);

module.exports = router;