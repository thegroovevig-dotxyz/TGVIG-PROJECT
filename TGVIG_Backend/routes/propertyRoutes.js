const router = require("express").Router();
const ctrl = require("../controllers/propertyController");
const auth = require("../middleware/auth");

// 🏨 REGISTER PROPERTY
router.post("/register", auth, ctrl.registerProperty);

// 🏨 ALL ACTIVE PROPERTIES
router.get("/", ctrl.getProperties);

// 🏨 SINGLE PROPERTY
router.get("/:id", ctrl.getProperty);

// 🏨 MY PROPERTIES (PARTNER)
router.get("/my/list", auth, ctrl.getMyProperties);

module.exports = router;