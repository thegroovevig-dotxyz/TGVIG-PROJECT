const router = require("express").Router();
const ctrl = require("../controllers/webContentController");

router.get("/:section", ctrl.getContent);
router.post("/:section", ctrl.saveContent);
router.delete("/:section", ctrl.deleteSection);

module.exports = router;