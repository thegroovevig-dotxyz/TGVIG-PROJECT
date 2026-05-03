const router = require("express").Router();
const ctrl = require("../controllers/clubController");

router.post("/", ctrl.createClub);
router.get("/", ctrl.getClubs);
router.get("/:id", ctrl.getClub);
router.delete("/:id", ctrl.deleteClub);

module.exports = router;