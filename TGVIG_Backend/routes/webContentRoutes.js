const router = require("express").Router();
const ctrl = require("../controllers/webContentController");

// GET section
router.get("/:section", ctrl.getSection);

// SAVE section
router.post("/:section", ctrl.saveSection);

// DELETE section
router.delete("/:section", ctrl.deleteSection);

module.exports = router;