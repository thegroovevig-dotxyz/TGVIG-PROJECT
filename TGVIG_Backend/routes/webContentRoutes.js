const router = require("express").Router();
const ctrl = require("../controllers/webContentController");
const {
  getPageContent
} = require("../controllers/webcontent.controller");


// GET section


// SAVE section
router.post("/:section", ctrl.saveSection);

// DELETE section
router.delete("/:section", ctrl.deleteSection);

router.get("/:page", getPageContent);

module.exports = router;