const router = require("express").Router();
const ctrl = require("../controllers/webContentController");




// GET section
router.get("/:section", ctrl.getContent);

// SAVE / UPDATE section
router.post("/:section", ctrl.saveContent);

// DELETE section
router.delete("/:section", ctrl.deleteSection);

module.exports = router;