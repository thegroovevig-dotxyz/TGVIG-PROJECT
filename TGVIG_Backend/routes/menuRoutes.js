const router = require("express").Router();
const ctrl = require("../controllers/menuController");

router.post("/", ctrl.createMenu);
router.get("/:clubId", ctrl.getMenus);
router.put("/:id", ctrl.updateMenu);
router.delete("/:id", ctrl.deleteMenu);
router.get("/", ctrl.getMenusByDevice);
module.exports = router;