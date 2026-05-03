const router = require("express").Router();
const ctrl = require("../controllers/webContentController");

router.get("/:section", ctrl.getSection);
router.post("/:section", ctrl.saveSection);
router.delete("/:section", ctrl.deleteSection);

module.exports = router;