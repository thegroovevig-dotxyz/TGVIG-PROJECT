const router = require("express").Router();
const ctrl = require("../controllers/webContentController");
const webContentController = require("../controllers/webContentController");

// GET section


// SAVE section
router.post("/:section", ctrl.saveSection);

// DELETE section
router.delete("/:section", ctrl.deleteSection);

router.get("/:section", webContentController.getContent);
router.post("/:section", webContentController.saveContent);

module.exports = router;